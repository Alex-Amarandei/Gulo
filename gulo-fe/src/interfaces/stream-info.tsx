import { Dispatch, SetStateAction } from 'react';

import Stream from '@/interfaces/stream';

export interface StreamInfo extends Stream {
  nft: string;
  isSelected: boolean;
}

export interface StreamContextType {
  streams: StreamInfo[];
  setStreams: Dispatch<SetStateAction<StreamInfo[]>>;
  selectedStreams: StreamInfo[];
  setSelectedStreams: Dispatch<SetStateAction<StreamInfo[]>>;
}
