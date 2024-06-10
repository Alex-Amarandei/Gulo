import { HTMLAttributes, ReactNode } from 'react';

import { BalanceType, ChartType, Increment } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import { DateRange } from 'react-day-picker';

export interface StreamListProps {
  streams: Stream[];
}

export interface StreamListProps {
  streams: Stream[];
}

export interface StreamModalProps {
  stream: Stream;
  nft: string;
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

export interface DateRangePickerModalProps extends HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onClose: () => void;
  onDateChange: (date: DateRange | undefined) => void;
}

export interface InfoModalProps {
  onClose: () => void;
}

export interface ToolButtonProps {
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
  streams: Stream[];
}

export interface DateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export interface StreamsTableProps {
  date?: Date;
  dateRange?: DateRange;
  streams: Stream[];
  balanceType: BalanceType;
}
