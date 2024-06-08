'use client';

import { useState } from 'react';

import ChartButton from '@/components/atoms/buttons/chart-button';
import DateRangePickerModal from '@/components/molecules/modals/date-range-picker-modal';
import { StreamsTable } from '@/components/organisms/reports/streams-table';
import { nowWithZeroSeconds, oneMonthBefore } from '@/utils/data';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

export default function ReportsPage() {
  const now = nowWithZeroSeconds();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: oneMonthBefore(now),
    to: now,
  });

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date);
  };

  const toggleStartModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className='flex flex-grow flex-col h-[90vh] w-2/3 rounded-lg p-4 ml-12'>
      <div className='flex justify-between items-center'>
        <ChartButton onClick={toggleStartModal}>
          {date && date.from && date.to
            ? `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`
            : 'Select Date Range'}
        </ChartButton>
        <div className='flex gap-4'>
          <ChartButton>Download</ChartButton>
          <ChartButton>Email</ChartButton>
        </div>
      </div>
      <StreamsTable />
      {isModalOpen && <DateRangePickerModal date={date} onClose={toggleStartModal} onDateChange={handleDateChange} />}
    </div>
  );
}
