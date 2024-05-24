'use client';

import fetchNftDetails from '@/api/streams/fetch-nft-details';
import fetchStreams from '@/api/streams/fetch-streams';
import FilterButton from '@/components//atoms/filter-button';
import { useStreams } from '@/components/contexts/streams-context';
import StreamList from '@/components/molecules/content/stream-list';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import WAGMI_CONFIG from '@/utils/configs';
import {
  selectAll,
  selectCancelable,
  selectCircular,
  selectIn,
  selectNonCancelable,
  selectNonCircular,
  selectNone,
  selectOut,
} from '@/utils/filters';
import { faAngleLeft, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccount } from '@wagmi/core';
import { Suspense, useEffect, useState } from 'react';

export default function Streams() {
  const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
  const { streams, setStreams } = useStreams();
  const { setSelectedStreams } = useStreams();
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
    <div
      className={`rounded-lg overflow-auto p-4 transition-all duration-300 shadow-2xl h-[90vh] ${isStreamsCollapsed ? 'w-16' : 'w-1/3'} btn ${isStreamsCollapsed ? 'cursor-pointer z-50 absolute' : 'cursor-default'}`}
      onClick={() => {
        if (isStreamsCollapsed) {
          setIsStreamsCollapsed(false);
        }
      }}>
      <div className="flex justify-between items-center">
        <button
          className="sablier-orange bg-gray-800 p-2 mb-2"
          onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
          <FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size="lg" />
        </button>
        {!isStreamsCollapsed && (
          <>
            <FilterButton
              first={'All'}
              second={'None'}
              onFirstClick={() => setSelectedStreams(selectAll(streams))}
              onSecondClick={() => setSelectedStreams(selectNone(streams))}
            />
            <FilterButton
              first={'Non-Self'}
              second={'Self'}
              onFirstClick={() => setSelectedStreams(selectNonCircular(streams))}
              onSecondClick={() => setSelectedStreams(selectCircular(streams))}
            />
            <FilterButton
              first={'In'}
              second={'Out'}
              onFirstClick={() => setSelectedStreams(selectIn(streams, account.address))}
              onSecondClick={() => setSelectedStreams(selectOut(streams, account.address))}
            />
            <FilterButton
              first={'Cancelable'}
              second={'Non-Cancelable'}
              onFirstClick={() => setSelectedStreams(selectCancelable(streams))}
              onSecondClick={() => setSelectedStreams(selectNonCancelable(streams))}
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
          <Suspense fallback={<strong>Loading...</strong>}>
            <StreamList streams={streams} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
