import { GraphStream } from '@/interfaces/stream';
import { Edge, Node } from 'react-vis-network-graph';

export interface CachedStreamData {
  count: number;
  streams: GraphStream[];
}

export interface CachedGraphData {
  nodes: Node[];
  edges: Edge[];
  components?: Node[][];
  singleNodeComponents?: number;
  topThreeComponents?: Node[][];
  topThreeInfluentialNodes?: { id: string; degreeCentrality: number }[];
  topThreePageRankNodes?: { id: string; pageRank: number }[];
  averageDegree?: number;
  density?: number;
  diameter?: number;
}
