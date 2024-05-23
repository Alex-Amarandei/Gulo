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
  first: string;
  second: string;
  onFirstClick: () => void;
  onSecondClick: () => void;
}

export interface DatePickerModalProps {
  date: Date | null;
  onClose: () => void;
  onDateChange: (date: Date | null) => void;
}
