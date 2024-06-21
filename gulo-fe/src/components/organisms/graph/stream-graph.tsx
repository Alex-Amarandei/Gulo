import { Suspense, useEffect, useState } from 'react';

import { fetchGraphData } from '@/api/graph/fetch-graph-data';
import { SuspenseSpinner } from '@/components/atoms/suspense-spinner';
import { GraphToolbar } from '@/components/molecules/content/graph-toolbar';
import { GraphInfoModal } from '@/components/molecules/modals/graph-info-modal';
import { GRAPH_OPTIONS } from '@/constants/graph';
import Graph, { Edge, Node } from 'react-vis-network-graph';

export const StreamGraph = ({ chainId }: { chainId: number }) => {
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [isClient, setIsClient] = useState(false);
  const [options, setOptions] = useState(GRAPH_OPTIONS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [streamCount, setStreamCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchGraphData(chainId).then(graphData => {
        if (graphData) {
          setGraph({ nodes: graphData.nodes, edges: graphData.edges });
          setStreamCount(graphData.streamCount);

          setTimeout(() => {
            setOptions(prevOptions => ({
              ...prevOptions,
              physics: {
                ...prevOptions.physics,
                enabled: false,
              },
            }));
          }, 5000);
        }
      });
    }
  }, [isClient, chainId]);

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
    return null;
  }

  return (
    <div className='relative min-h-[90vh] min-w-full focus:ring-0 focus:ring-transparent focus:outline-none'>
      <Suspense fallback={<SuspenseSpinner />}>
        <GraphToolbar enablePhysics={enablePhysics} disablePhysics={disablePhysics} openModal={openModal} />
        <Graph graph={graph} options={options} style={{ height: '1000px', outline: 'none', border: 'none' }} />
        {modalIsOpen && <GraphInfoModal onClose={closeModal} streamCount={streamCount} chainId={chainId} />}
      </Suspense>
    </div>
  );
};
