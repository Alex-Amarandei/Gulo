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
import { faAngleLeft, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Streams() {
  const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
  const { streams, setStreams } = useStreams();
  const { selectedStreams, setSelectedStreams } = useStreams();
  const account = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      const streams = await fetchStreams(account.address ?? '0x');
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
  }, [account]);

  return (
    <div className={`border p-2 transition-all duration-300 ${isStreamsCollapsed ? 'w-16' : 'w-1/3'}`}>
      <div className="flex justify-between items-center">
        <button
          className="text-orange-600 bg-gray-800 p-2 mb-2"
          onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
          <FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size="lg" />
        </button>
        {selectedStreams.length === streams.length ? (
          <FilterButton text="None" onClick={() => setSelectedStreams(filterUnselectAll(streams))} />
        ) : (
          <FilterButton text="All" onClick={() => setSelectedStreams(filterSelectAll(streams))} />
        )}
        <FilterButton text="Uncancelable" onClick={() => setSelectedStreams(filterUncancelable(streams))} />
        <FilterButton text="To Me" onClick={() => setSelectedStreams(filterToMe(streams, account.address ?? '0x'))} />
        <FilterButton
          text="From Me"
          onClick={() => setSelectedStreams(filterFromMe(streams, account.address ?? '0x'))}
        />
        {!isStreamsCollapsed && (
          <button className="text-orange-600 bg-gray-800 p-2 mb-2">
            <a href="https://app.sablier.com" target="_blank" rel="noopener noreferrer" className="text-orange-600">
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
