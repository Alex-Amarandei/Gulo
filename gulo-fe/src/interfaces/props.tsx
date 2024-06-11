import { HTMLAttributes, ReactNode } from 'react';

import { BalanceType, ChartType, Increment } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import { Maybe } from '@/utils/data';
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
  date: Maybe<Date>;
  setToCurrentDate?: boolean;
  onClose: () => void;
  onDateChange: (date: Maybe<Date>) => void;
}

export interface DateRangePickerModalProps extends HTMLAttributes<HTMLDivElement> {
  date: Maybe<DateRange>;
  onClose: () => void;
  onDateChange: (date: Maybe<DateRange>) => void;
}

export interface InfoModalProps {
  onClose: () => void;
}

export interface ToolButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export interface StreamDataProps {
  endTime: Maybe<Date>;
  increment: Increment;
  startTime: Maybe<Date>;
  streams: Stream[];
}

export interface ChartProps {
  chartType: ChartType;
  endTime: Maybe<Date>;
  increment: Increment;
  startTime: Maybe<Date>;
}

export interface ChartWrapperProps {
  endTime: Maybe<Date>;
  increment: Increment;
  startTime: Maybe<Date>;
  streams: Stream[];
}

export interface DateTimePickerProps {
  date: Maybe<Date>;
  onDateChange: (date: Maybe<Date>) => void;
}

export interface StreamsTableProps {
  date?: Date;
  dateRange?: DateRange;
  streams: Stream[];
  balanceType: BalanceType;
}
