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
  date: Date | undefined;
  setToCurrentDate?: boolean;
  onClose: () => void;
  onDateChange: (date: Date | undefined) => void;
}

export interface InfoModalProps {
  onClose: () => void;
}

export interface ChartButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export interface StreamDataProps {
  endTime: Date | undefined;
  increment: Increment;
  startTime: Date | undefined;
  streams: Stream[];
}

export interface ChartProps {
  chartType: ChartType;
  endTime: Date | undefined;
  increment: Increment;
  startTime: Date | undefined;
}

export interface ChartWrapperProps {
  endTime: Date | undefined;
  increment: Increment;
  startTime: Date | undefined;
  streams: StreamInfo[];
}

export interface DateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}
