'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import { Stream, StreamContextType } from '@/interfaces/stream';
import { Maybe } from '@/utils/data';

const StreamContext = createContext<Maybe<StreamContextType>>(undefined);

export const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<Stream[]>([]);
  const [streamNftMap, setStreamNftMap] = useState<Record<string, string>>({});

  return (
    <StreamContext.Provider
      value={{ streams, setStreams, selectedStreams, setSelectedStreams, streamNftMap, setStreamNftMap }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStreams = () => {
  const context = useContext(StreamContext);

  if (!context) {
    throw new Error('useStreams must be used within a StreamProvider');
  }

  return context;
};
