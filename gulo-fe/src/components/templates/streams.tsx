'use client';

import { Suspense, useEffect, useState } from 'react';

import fetchNftDetails from '@/api/streams/fetch-nft-details';
import { fetchUserStreams } from '@/api/streams/fetch-user-streams';
import FilterButton from '@/components/atoms/buttons/filter-button';
import { useStreams } from '@/components/contexts/streams-context';
import StreamList from '@/components/molecules/content/stream-list';
import { Stream, StreamData } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { getNftColor } from '@/utils/data';
import {
  isCircular,
  selectAll,
  selectCancelable,
  selectIn,
  selectNonCancelable,
  selectNone,
  selectOut,
} from '@/utils/filters';
import { rebaseStream } from '@/utils/formats';
import { faAngleLeft, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccount } from '@wagmi/core';
import { usePathname } from 'next/navigation';

export default function Streams() {
  const currentRoute = usePathname();
  const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
  const { streams, setStreams, setSelectedStreams, streamNftMap, setStreamNftMap } = useStreams();
  const account = getAccount(WAGMI_CONFIG);

  useEffect(() => {
    const fetchData = async () => {
      const streams = await fetchUserStreams();
      const coloredStreams: Stream[] = await Promise.all(
        streams
          .filter((stream: StreamData) => !isCircular(stream))
          .map(async (stream: StreamData) => {
            const nft = await fetchNftDetails(stream);
            const color = getNftColor(nft);
            const rebasedStream = rebaseStream(stream);
            setStreamNftMap(prevState => ({ ...prevState, [stream.alias]: nft }));
            return {
              ...rebasedStream,
              color: color,
              isSelected: true,
            };
          }),
      );
      setStreams(coloredStreams);
      setSelectedStreams(coloredStreams);
    };

    fetchData();
  }, [account.isConnected, setStreams, setSelectedStreams, setStreamNftMap]);

  return (
    currentRoute !== '/graph' && (
      <div
        className={`rounded-lg overflow-auto p-4 transition-all duration-300 shadow-2xl h-[90vh] ${isStreamsCollapsed ? 'w-16' : 'w-1/3'} btn ${isStreamsCollapsed ? 'cursor-pointer z-50 absolute' : 'cursor-default'}`}
        onClick={() => {
          if (isStreamsCollapsed) {
            setIsStreamsCollapsed(false);
          }
        }}>
        <div className='flex justify-between items-center'>
          <button
            className=' text-sablier bg-gray-800 p-2 mb-2'
            onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
            <FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size='lg' />
          </button>
          {!isStreamsCollapsed && (
            <>
              <FilterButton
                first={'None'}
                second={'All'}
                onFirstClick={() => setSelectedStreams(selectNone(streams))}
                onSecondClick={() => setSelectedStreams(selectAll(streams))}
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
            <button className=' text-sablier bg-gray-800 p-2 mb-2'>
              <a href='https://app.sablier.com' target='_blank' rel='noopener noreferrer' className='sablier'>
                <FontAwesomeIcon icon={faExternalLinkAlt} className='lg' />
              </a>
            </button>
          )}
        </div>
        {!isStreamsCollapsed && (
          <div className='flex justify-between items-center'>
            {Object.keys(streamNftMap).length === streams.length ? (
              <Suspense fallback={<strong className='text-slate-100'>Loading...</strong>}>
                <StreamList streams={streams} />
              </Suspense>
            ) : (
              <strong className='text-slate-100'>Loading...</strong>
            )}
          </div>
        )}
      </div>
    )
  );
}
