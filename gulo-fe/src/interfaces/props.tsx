import { ReactNode } from 'react';

import { ChartType, Increment } from '@/constants/enums';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';

export interface StreamListProps {
  streams: Stream[];
}

export interface StreamInfoListProps {
  streams: StreamInfo[];
}

export interface StreamModalProps {
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
  setToCurrentDate?: boolean;
}

export interface InfoModalProps {
  onClose: () => void;
}

export interface ChartButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export interface StreamDataProps {
  streams: Stream[];
  startTime: Date | null;
  endTime: Date | null;
  increment: Increment;
}

export interface ChartProps {
  startTime: Date | null;
  endTime: Date | null;
  increment: Increment;
  chartType: ChartType;
}
