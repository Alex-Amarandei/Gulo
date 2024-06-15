import { MouseEvent } from 'react';

import { GraphInfoModalProps } from '@/interfaces/props';
import { getSablierSearchByChainIdAndAddress } from '@/utils/formats';

export function GraphInfoModal({ onClose, componentInfo, chainId }: GraphInfoModalProps) {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-opacity-80 bg-gray-800 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-gradient-to-br from-gray-600/80 to-gray-700/20 bg-clip-padding backdrop-filter backdrop-blur-lg p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl'>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors text-sablier'
          onClick={onClose}
          aria-label='Close'>
          <svg
            className='w-6 h-6 text-sablier'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <h2 className='text-3xl font-semibold text-center mb-6 text-slate-100'>Stream Network Information</h2>
        <div className='space-y-6 text-slate-100'>
          <div>
            <h3 className='text-lg font-bold'>Stream Clusters</h3>
            <p className='text-sm text-gray-300 italic'>
              Clusters represent groups of users interconnected by streams.
            </p>
            <ul className='list-decimal list-inside'>
              {componentInfo.topThreeComponents.map((component, index) => (
                <li key={index}>
                  <span className='text-sablier font-bold'>{component.length}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Cluster Count</h3>
            <p className='text-sm text-gray-300 italic'>
              The total number of clusters in the network, indicating the overall structure and fragmentation.
            </p>
            <p>
              Count: <span className='text-sablier font-bold'>{componentInfo.componentCount}</span>
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Average Connections</h3>
            <p className='text-sm text-gray-300 italic'>
              The average number of streams per user, showing the general level of user interaction.
            </p>
            <p>
              Average: <span className='text-sablier font-bold'>{componentInfo.averageDegree.toFixed(2)}</span>
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Network Density</h3>
            <p className='text-sm text-gray-300 italic'>
              The ratio between the existent connections compared to the total possible.
            </p>
            <p>
              Density: <span className='text-sablier font-bold'>{componentInfo.density.toFixed(4)}%</span>
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Savings Management Users</h3>
            <p className='text-sm text-gray-300 italic'>
              Users that only have self-streams, usually for limiting the access to their savings.
            </p>
            <p>
              Users: <span className='text-sablier font-bold'>{componentInfo.singleNodeComponents}</span>
            </p>
          </div>

          <div>
            <h3 className='text-lg font-bold'>Longest Stream Chain</h3>
            <p className='text-sm text-gray-300 italic'>
              The longest chain of consecutive streams, showing the maximum reach within the network.
            </p>
            <p>
              Longest: <span className='text-sablier font-bold'>{componentInfo.diameter}</span>
            </p>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Most Influential Nodes</h3>
            <p className='text-sm text-gray-300 italic'>Users with the most streams in the network.</p>
            <ul className='list-decimal list-inside'>
              {componentInfo.topThreeInfluentialNodes.map((node, index) => (
                <li key={index}>
                  <a
                    href={getSablierSearchByChainIdAndAddress(chainId, node.id)}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <span className='hover:underline hover:text-sablier'>{node.id}</span>
                    {': '}
                  </a>
                  <span className='text-sablier font-bold'>{node.degreeCentrality}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Top Nodes by PageRank</h3>
            <p className='text-sm text-gray-300 italic'>
              PageRank sorts users by considering both the number and the importance of their connections.
            </p>
            <ul className='list-decimal list-inside'>
              {componentInfo.topThreePageRankNodes.map((node, index) => (
                <li key={index}>
                  <a
                    href={getSablierSearchByChainIdAndAddress(chainId, node.id)}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <span className='hover:underline hover:text-sablier'>{node.id}</span>
                    {': '}
                  </a>
                  <span className='text-sablier font-bold'>{node.pageRank.toFixed(4)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
