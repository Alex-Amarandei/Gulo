import { Dispatch, SetStateAction } from 'react';

import Stream from '@/interfaces/stream';

export interface StreamInfo extends Stream {
  color: string;
  isSelected: boolean;
}

export interface StreamContextType {
  streams: StreamInfo[];
  setStreams: Dispatch<SetStateAction<StreamInfo[]>>;
  selectedStreams: StreamInfo[];
  setSelectedStreams: Dispatch<SetStateAction<StreamInfo[]>>;
  streamNftMap: Record<string, string>;
  setStreamNftMap: Dispatch<SetStateAction<Record<string, string>>>;
}
