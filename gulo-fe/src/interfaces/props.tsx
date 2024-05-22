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

export interface FilterButtonProps {
  text: string;
  onClick: () => void;
}

export interface DatePickerModalProps {
  initialDate: Date | null;
  onClose: () => void;
  onDateChange: (date: Date | null) => void;
}
