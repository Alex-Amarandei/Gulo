'use client';

import fetchNftDetails from '@/api/fetch-nft-details';
import fetchStreams from '@/api/fetch-streams';
import { useStreams } from '@/components/contexts/streams-context';
import StreamList from '@/components/molecules/content/stream-list';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function Streams() {
  const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
  const { streams, setStreams } = useStreams();

  useEffect(() => {
    const fetchData = async () => {
      const streams = await fetchStreams();
      const streamWithNftDetails: StreamInfo[] = await Promise.all(
        streams.map(async (stream: Stream) => ({
          ...stream,
          nft: await fetchNftDetails(stream)
        }))
      );
      setStreams(streamWithNftDetails);
    };

    fetchData();
  }, []);

  return (
    <div className={`border p-2 transition-all duration-300 ${isStreamsCollapsed ? 'w-16' : 'w-1/3'}`}>
      <button
        className="text-orange-600 bg-gray-800 p-2 mb-2"
        onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}
      >
        <FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size="lg" />
      </button>
      {!isStreamsCollapsed && <StreamList streams={streams} />}
    </div>
  );
}
