'use client';

import { ChangeEvent, useState } from 'react';

import ToolButton from '@/components/atoms/buttons/tool-button';
import { useStreams } from '@/components/contexts/streams-context';
import DatePickerModal from '@/components/molecules/modals/date-picker-modal';
import DateRangePickerModal from '@/components/molecules/modals/date-range-picker-modal';
import { StreamsTable } from '@/components/organisms/reports/streams-table';
import { BalanceType } from '@/constants/enums';
import { nowWithZeroSeconds, oneMonthBefore } from '@/utils/data';
import { filterNonCircular } from '@/utils/filters';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

export default function ReportsPage() {
  const now = nowWithZeroSeconds();

  const { selectedStreams } = useStreams();
  const [balanceType, setBalanceType] = useState(BalanceType.Actual);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(now);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneMonthBefore(now),
    to: now,
  });

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setDateRange(dateRange);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  };

  const handleBalanceTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBalanceType(event.target.value as BalanceType);
  };

  const toggleStartModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className='flex flex-grow flex-col gap-10 h-[90vh] w-2/3 rounded-lg p-4 ml-12 overflow-auto'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
          <ToolButton onClick={toggleStartModal}>
            {balanceType === BalanceType.Actual && dateRange && dateRange.from && dateRange.to
              ? `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`
              : balanceType === BalanceType.Forecast && date
                ? format(date, 'LLL dd, y HH:mm:ss')
                : 'Select Date'}
          </ToolButton>
          <ToolButton>
            <select
              value={balanceType}
              onChange={handleBalanceTypeChange}
              className='bg-transparent border-none focus:ring-0 focus:ring-transparent py-0 cursor-pointer'>
              {Object.values(BalanceType).map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </ToolButton>
        </div>
        <div className='flex gap-4'>
          <ToolButton>Download</ToolButton>
          <ToolButton>Email</ToolButton>
        </div>
      </div>
      <StreamsTable
        balanceType={balanceType}
        streams={filterNonCircular(selectedStreams)}
        dateRange={dateRange}
        date={date}
      />
      {isModalOpen && balanceType === BalanceType.Actual && (
        <DateRangePickerModal date={dateRange} onClose={toggleStartModal} onDateChange={handleDateRangeChange} />
      )}
      {isModalOpen && balanceType === BalanceType.Forecast && (
        <DatePickerModal date={date} onClose={toggleStartModal} onDateChange={handleDateChange} setToCurrentDate />
      )}
    </div>
  );
}
