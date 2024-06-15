import { getCachedStreams } from '@/api/cache/cache-streams';
import { getCacheFromS3, saveCacheToS3 } from '@/api/cache/s3-cache';
import { delay } from '@/api/utils/delay';
import { CachedGraphData } from '@/interfaces/graph';
import { GraphStream } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { getCacheKey } from '@/utils/formats';
import { findConnectedComponents } from '@/utils/graph/connected';
import { getChainId } from '@wagmi/core';
import { Edge, Node } from 'react-vis-network-graph';

const calculateShortestPaths = (nodes: Node[], edges: Edge[]): number[][] => {
  const numNodes = nodes.length;
  const distances: number[][] = Array.from({ length: numNodes }, () => Array(numNodes).fill(Infinity));

  // Create a map to get node index
  const nodeIndexMap = new Map<string, number>();
  nodes.forEach((node, index) => {
    nodeIndexMap.set(String(node.id), index);
    distances[index][index] = 0; // Distance to itself is 0
  });

  edges.forEach(edge => {
    const fromIndex = nodeIndexMap.get(String(edge.from))!;
    const toIndex = nodeIndexMap.get(String(edge.to))!;
    distances[fromIndex][toIndex] = 1; // Assuming all edges have equal weight
    distances[toIndex][fromIndex] = 1; // For undirected graph
  });

  // Floyd-Warshall Algorithm
  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (distances[i][j] > distances[i][k] + distances[k][j]) {
          distances[i][j] = distances[i][k] + distances[k][j];
        }
      }
    }
  }

  return distances;
};

const calculateLongestPath = (distances: number[][]): number => {
  let longestPath = 0;
  const numNodes = distances.length;

  for (let i = 0; i < numNodes; i++) {
    for (let j = 0; j < numNodes; j++) {
      if (distances[i][j] !== Infinity && distances[i][j] > longestPath) {
        longestPath = distances[i][j];
      }
    }
  }

  return longestPath;
};

const calculateNodeMetrics = (nodes: Node[], distances: number[][]) => {
  const nodeMetrics = new Map<string, { degreeCentrality: number; closenessCentrality: number }>();

  // Initialize node metrics
  nodes.forEach(node => {
    nodeMetrics.set(String(node.id), { degreeCentrality: 0, closenessCentrality: 0 });
  });

  // Calculate degree centrality
  distances.forEach((row, i) => {
    const nodeId = String(nodes[i].id);
    row.forEach((distance, j) => {
      if (distance === 1) {
        nodeMetrics.get(nodeId)!.degreeCentrality += 1;
      }
    });
  });

  // Calculate closeness centrality
  nodes.forEach((node, i) => {
    const sumDistances = distances[i].reduce((sum, distance) => sum + (distance !== Infinity ? distance : 0), 0);
    const reachableNodes = distances[i].filter(distance => distance !== Infinity).length;
    const closenessCentrality = reachableNodes > 1 ? (reachableNodes - 1) / sumDistances : 0;

    nodeMetrics.get(String(node.id))!.closenessCentrality = closenessCentrality;
  });

  return nodeMetrics;
};

const calculatePageRank = (nodes: Node[], edges: Edge[], d = 0.85, iterations = 100): Map<string, number> => {
  const pageRank = new Map<string, number>();
  const numNodes = nodes.length;
  const outDegree = new Map<string, number>();

  // Initialize PageRank values and out-degree counts
  nodes.forEach(node => {
    pageRank.set(String(node.id), 1 / numNodes);
    outDegree.set(String(node.id), 0);
  });

  edges.forEach(edge => {
    const from = String(edge.from);
    outDegree.set(from, (outDegree.get(from) || 0) + 1);
  });

  // PageRank iterations
  for (let i = 0; i < iterations; i++) {
    const newPageRank = new Map<string, number>();

    nodes.forEach(node => {
      let rankSum = 0;
      edges.forEach(edge => {
        if (String(edge.to) === String(node.id)) {
          rankSum += (pageRank.get(String(edge.from)) || 0) / (outDegree.get(String(edge.from)) || 1);
        }
      });
      newPageRank.set(String(node.id), (1 - d) / numNodes + d * rankSum);
    });

    newPageRank.forEach((rank, id) => {
      pageRank.set(id, rank);
    });
  }

  return pageRank;
};

const processGraphData = (streams: GraphStream[]): CachedGraphData => {
  const nodes: Map<string, Node> = new Map();
  const edges: Set<string> = new Set();
  const selfLoopNodes = new Set<string>();

  streams.forEach(stream => {
    if (!nodes.has(String(stream.sender))) {
      nodes.set(String(stream.sender), {
        id: String(stream.sender),
        label: String(stream.sender),
        title: String(stream.sender),
      });
    }
    if (!nodes.has(String(stream.recipient))) {
      nodes.set(String(stream.recipient), {
        id: String(stream.recipient),
        label: String(stream.recipient),
        title: String(stream.recipient),
      });
    }

    const edgeId = `${stream.sender}-${stream.recipient}`;
    if (!edges.has(edgeId)) {
      edges.add(edgeId);
    }

    // Detect self-loops
    if (stream.sender === stream.recipient) {
      selfLoopNodes.add(String(stream.sender));
    }
  });

  const uniqueNodes = Array.from(nodes.values());
  const uniqueEdges: Edge[] = Array.from(edges).map(edge => {
    const [from, to] = edge.split('-');
    return { from: String(from), to: String(to) };
  });

  const distances = calculateShortestPaths(uniqueNodes, uniqueEdges);
  const components = findConnectedComponents(uniqueNodes, uniqueEdges);
  const singleNodeComponents = components.filter(component => component.length === 1).length;
  const topThreeComponents = components.sort((a, b) => b.length - a.length).slice(0, 3);

  const averageDegree = uniqueEdges.length / uniqueNodes.length;
  const density = uniqueEdges.length / (uniqueNodes.length * (uniqueNodes.length - 1));
  const longestPath = calculateLongestPath(distances);

  // Calculate node metrics
  const nodeMetrics = calculateNodeMetrics(uniqueNodes, distances);

  // Calculate PageRank
  const pageRank = calculatePageRank(uniqueNodes, uniqueEdges);

  // Add node metrics to tooltips
  uniqueNodes.forEach(node => {
    const metrics = nodeMetrics.get(String(node.id));
    node.title += `<br>Degree Centrality: ${metrics!.degreeCentrality}`;
    node.title += `<br>Closeness Centrality: ${metrics!.closenessCentrality.toFixed(10)}`;
    node.title += `<br>PageRank: ${pageRank.get(String(node.id))!.toFixed(4)}`;
  });

  // Identify top three most influential nodes by degree centrality
  const topThreeInfluentialNodes = uniqueNodes
    .map(node => ({
      id: String(node.id),
      degreeCentrality: nodeMetrics.get(String(node.id))!.degreeCentrality,
    }))
    .sort((a, b) => b.degreeCentrality - a.degreeCentrality)
    .slice(0, 3);

  // Identify top three nodes by PageRank
  const topThreePageRankNodes = uniqueNodes
    .map(node => ({
      id: String(node.id),
      pageRank: pageRank.get(String(node.id))!,
    }))
    .sort((a, b) => b.pageRank - a.pageRank)
    .slice(0, 3);

  return {
    nodes: uniqueNodes,
    edges: uniqueEdges,
    components,
    singleNodeComponents,
    topThreeComponents,
    topThreeInfluentialNodes,
    topThreePageRankNodes,
    averageDegree,
    density,
    diameter: longestPath,
  };
};

export const getGraphData = async (): Promise<CachedGraphData> => {
  await delay(1000);

  const chainId = getChainId(WAGMI_CONFIG);
  const cacheKey = getCacheKey(chainId, 'graph');
  const { streams, hasNewStreams } = await getCachedStreams();

  if (hasNewStreams) {
    const graphData = processGraphData(streams);
    await saveCacheToS3(cacheKey, graphData);
    return graphData;
  } else {
    const cachedGraphData = (await getCacheFromS3(cacheKey)) as CachedGraphData;
    if (!cachedGraphData || cachedGraphData.nodes === undefined) {
      const graphData = processGraphData(streams);
      await saveCacheToS3(cacheKey, graphData);
      return graphData;
    }

    return cachedGraphData;
  }
};
