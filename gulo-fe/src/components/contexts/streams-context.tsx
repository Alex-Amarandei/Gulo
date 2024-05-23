'use client';

import { StreamContextType, StreamInfo } from '@/interfaces/stream-info';
import { ReactNode, createContext, useContext, useState } from 'react';

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [streams, setStreams] = useState<StreamInfo[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<StreamInfo[]>([]);

  return (
    <StreamContext.Provider value={{ streams, setStreams, selectedStreams, setSelectedStreams }}>
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
