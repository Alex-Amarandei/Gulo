import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';

export interface StreamListProps {
  streams: Stream[];
}

export interface StreamInfoListProps {
  streams: StreamInfo[];
}

export interface ModalProps {
  stream: StreamInfo;
  onClose: () => void;
}
