import { useEffect, useState } from 'react';

import { getGraphData } from '@/api/cache/cache-graph';
import GraphToolbar from '@/components/molecules/content/graph-toolbar';
import { GRAPH_OPTIONS } from '@/constants/graph';
import Graph, { Edge, Node } from 'react-vis-network-graph';

import { GraphInfoModal } from '../modals/graph-info-modal';

export const StreamGraph = ({ chainId }: { chainId: number }) => {
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [isClient, setIsClient] = useState(false);
  const [options, setOptions] = useState(GRAPH_OPTIONS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [componentInfo, setComponentInfo] = useState<{
    largestComponent: number;
    componentCount: number;
    singleNodeComponents: number;
    topThreeComponents: any[];
    averageDegree: number;
    density: number;
    diameter: number;
    topThreeInfluentialNodes: { id: string; degreeCentrality: number }[];
    topThreePageRankNodes: { id: string; pageRank: number }[];
  }>({
    largestComponent: 0,
    componentCount: 0,
    singleNodeComponents: 0,
    topThreeComponents: [],
    averageDegree: 0,
    density: 0,
    diameter: 0,
    topThreeInfluentialNodes: [],
    topThreePageRankNodes: [],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      getGraphData().then(graphData => {
        setGraph({ nodes: graphData.nodes, edges: graphData.edges });

        // Update component info
        setComponentInfo({
          largestComponent: graphData.topThreeComponents[0].length,
          componentCount: graphData.components.length,
          singleNodeComponents: graphData.singleNodeComponents,
          topThreeComponents: graphData.topThreeComponents,
          averageDegree: graphData.averageDegree,
          density: graphData.density,
          diameter: graphData.diameter,
          topThreeInfluentialNodes: graphData.topThreeInfluentialNodes,
          topThreePageRankNodes: graphData.topThreePageRankNodes,
        });

        // Disable physics after 5 seconds
        setTimeout(() => {
          setOptions(prevOptions => ({
            ...prevOptions,
            physics: {
              ...prevOptions.physics,
              enabled: false,
            },
          }));
        }, 5000);
      });
    }
  }, [isClient]);

  const enablePhysics = () => {
    setOptions(prevOptions => ({
      ...prevOptions,
      physics: {
        ...prevOptions.physics,
        enabled: true,
      },
    }));
  };

  const disablePhysics = () => {
    setOptions(prevOptions => ({
      ...prevOptions,
      physics: {
        ...prevOptions.physics,
        enabled: false,
      },
    }));
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <div className='relative min-h-[90vh] min-w-full focus:ring-0 focus:ring-transparent focus:outline-none'>
      <GraphToolbar enablePhysics={enablePhysics} disablePhysics={disablePhysics} openModal={openModal} />
      <Graph graph={graph} options={options} style={{ height: '1000px', outline: 'none', border: 'none' }} />
      {modalIsOpen && <GraphInfoModal onClose={closeModal} componentInfo={componentInfo} chainId={chainId} />}
    </div>
  );
};
