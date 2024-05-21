'use client';

import Stream from '@/interfaces/stream-interfaces';
import StreamList from './streamList';

interface StreamsWidgetProps {
  streams: Stream[];
}

const StreamsWidget = ({ streams }: StreamsWidgetProps) => {
  return <StreamList streams={streams} />;
};

export default StreamsWidget;
