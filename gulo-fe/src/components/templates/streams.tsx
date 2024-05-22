'use client';

import fetchNftDetails from '@/api/streams/fetch-nft-details';
import fetchStreams from '@/api/streams/fetch-streams';
import FilterButton from '@/components//atoms/filter-button';
import { useStreams } from '@/components/contexts/streams-context';
import StreamList from '@/components/molecules/content/stream-list';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import {
  filterFromMe,
  filterSelectAll,
  filterToMe,
  filterUncancelable,
  filterUnselectAll,
} from '@/utils/filters/stream-filters';
import WAGMI_CONFIG from '@/utils/wagmi/config';
import { faAngleLeft, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccount } from '@wagmi/core';
import { useEffect, useState } from 'react';

export default function Streams() {
  const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
  const { streams, setStreams } = useStreams();
  const { selectedStreams, setSelectedStreams } = useStreams();
  const account = getAccount(WAGMI_CONFIG);

  useEffect(() => {
    const fetchData = async () => {
      const streams = await fetchStreams();
      const streamWithNftDetails: StreamInfo[] = await Promise.all(
        streams.map(async (stream: Stream) => ({
          ...stream,
          nft: await fetchNftDetails(stream),
          isSelected: true,
        })),
      );
      setStreams(streamWithNftDetails);
      setSelectedStreams(streamWithNftDetails);
    };

    fetchData();
  }, [account.isConnected]);

  return (
    <div className={`p-2 transition-all duration-300 shadow-2xl ${isStreamsCollapsed ? 'w-16' : 'w-1/3'}`}>
      <div className="flex justify-between items-center">
        <button
          className="sablier-orange bg-gray-800 p-2 mb-2"
          onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
          <FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size="lg" />
        </button>
        {!isStreamsCollapsed && (
          <>
            {selectedStreams.length === streams.length ? (
              <FilterButton text="None" onClick={() => setSelectedStreams(filterUnselectAll(streams))} />
            ) : (
              <FilterButton text="All" onClick={() => setSelectedStreams(filterSelectAll(streams))} />
            )}
            <FilterButton text="Uncancelable" onClick={() => setSelectedStreams(filterUncancelable(streams))} />
            <FilterButton
              text="To Me"
              onClick={() => {
                if (!account.address) throw new Error('Please Connect Wallet first');
                setSelectedStreams(filterToMe(streams, account.address));
              }}
            />
            <FilterButton
              text="From Me"
              onClick={() => {
                if (!account.address) throw new Error('Please Connect Wallet first');
                setSelectedStreams(filterFromMe(streams, account.address));
              }}
            />
          </>
        )}
        {!isStreamsCollapsed && (
          <button className="sablier-orange bg-gray-800 p-2 mb-2">
            <a href="https://app.sablier.com" target="_blank" rel="noopener noreferrer" className="sablier-orange">
              <FontAwesomeIcon icon={faExternalLinkAlt} className="lg" />
            </a>
          </button>
        )}
      </div>
      {!isStreamsCollapsed && (
        <div className="flex justify-between items-center">
          <StreamList streams={streams} />
        </div>
      )}
    </div>
  );
}
