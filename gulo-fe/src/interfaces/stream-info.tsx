import Stream from '@/interfaces/stream';

export interface StreamInfo extends Stream {
  nft: string;
}

export interface StreamContextType {
  streams: StreamInfo[];
  setStreams: React.Dispatch<React.SetStateAction<StreamInfo[]>>;
  selectedStreams: StreamInfo[];
  setSelectedStreams: React.Dispatch<React.SetStateAction<StreamInfo[]>>;
}
