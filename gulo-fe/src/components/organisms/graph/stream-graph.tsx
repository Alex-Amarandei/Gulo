import { useEffect, useState } from 'react';

import { fetchGraphData } from '@/api/graph/fetch-graph-data';
import { GraphToolbar } from '@/components/molecules/content/graph-toolbar';
import { GraphInfoModal } from '@/components/molecules/modals/graph-info-modal';
import { GRAPH_OPTIONS, OPTIMISED_GRAPH_OPTIONS } from '@/constants/graph';
import { Hourglass } from 'react-loader-spinner';
import Graph, { Edge, Node } from 'react-vis-network-graph';
import { toast } from 'sonner';

export const StreamGraph = ({ chainId }: { chainId: number }) => {
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [isClient, setIsClient] = useState(false);
  const [options, setOptions] = useState(GRAPH_OPTIONS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [streamCount, setStreamCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (options === OPTIMISED_GRAPH_OPTIONS) {
      toast.info('Oh oh, seems like we are in for a ride! 🎢 Optimizing graph settings... ⚙️');
    }
  }, [options]);

  useEffect(() => {
    if (isClient) {
      fetchGraphData(chainId)
        .then(graphData => {
          if (graphData) {
            setGraph({ nodes: graphData.nodes, edges: graphData.edges });
            setStreamCount(graphData.streamCount);

            if (graphData.streamCount > 10000) {
              setOptions(OPTIMISED_GRAPH_OPTIONS);
              toast.info('Oh oh, seems like we are in for a ride! 🎢 Optimizing graph settings... ⚙️');
            } else {
              setOptions(GRAPH_OPTIONS);
            }

            setTimeout(() => {
              setOptions(prevOptions => ({
                ...prevOptions,
                physics: {
                  ...prevOptions.physics,
                  enabled: false,
                },
              }));
            }, 5000);

            setLoading(false);

            toast.success(
              'Graph loaded! 🚀 Use the arrow keys and +/- signs to navigate. 🧭 Click and drag the nodes to interact. 🕹️',
            );
          }
        })
        .catch(() => {
          toast.error(
            'The Streams have overflown! 🌊 Just refresh the page, and we will take care of the cleaning! 🪣',
          );
          setLoading(false);
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
      {loading ? (
        <div className='flex flex-col justify-center items-center min-h-[90vh]'>
          <Hourglass
            height='15%'
            width='15%'
            colors={['#f77725', '#0b6197']}
            ariaLabel='hourglass-loading'
            wrapperStyle={{
              border: 'none',
            }}
            visible={true}
          />
          <p className='mt-4 text-lg font-semibold text-blue-500'>Gathering all of the Streams out there... ⏳</p>
        </div>
      ) : (
        <>
          <GraphToolbar enablePhysics={enablePhysics} disablePhysics={disablePhysics} openModal={openModal} />
          <Graph graph={graph} options={options} style={{ height: '1000px', outline: 'none', border: 'none' }} />
          {modalIsOpen && <GraphInfoModal onClose={closeModal} streamCount={streamCount} chainId={chainId} />}
        </>
      )}
    </div>
  );
};
