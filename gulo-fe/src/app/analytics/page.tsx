'use client';

import { useState } from 'react';

import ChartButton from '@/components/atoms/buttons/chart-button';
import DatePickerModal from '@/components/atoms/modals/date-picker-modal';
import { ChartType, Increment } from '@/constants/enums';

export default function Analytics() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [increment, setIncrement] = useState(Increment.Minute.toString());
  const [chartType, setChartType] = useState<ChartType>(ChartType.Line);

  const toggleStartModal = () => setIsStartModalOpen(prev => !prev);
  const toggleEndModal = () => setIsEndModalOpen(prev => !prev);
  const handleIncrementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIncrement(event.target.value);
  };
  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value as ChartType);
  };

  return (
    <div className='flex flex-col h-[90vh] w-2/3 rounded-lg p-4'>
      <div className='flex justify-between items-center'>
        <ChartButton onClick={toggleStartModal}>
          {startTime ? startTime.toLocaleString() : 'Select Start Time'}
        </ChartButton>
        <ChartButton onClick={toggleEndModal}>{endTime ? endTime.toLocaleString() : 'Select End Time'}</ChartButton>
        <ChartButton>
          <select
            value={increment}
            onChange={handleIncrementChange}
            className='bg-transparent border-none focus:ring-0 focus:ring-transparent py-0 cursor-pointer'>
            {Object.values(Increment).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </ChartButton>
        <ChartButton>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className='bg-transparent border-none focus:ring-0 focus:ring-transparent py-0 cursor-pointer'>
            {Object.values(ChartType).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </ChartButton>
      </div>
      <div className='flex-grow border m-1'>Rectangle Area</div>
      {isStartModalOpen && (
        <DatePickerModal date={startTime} onClose={toggleStartModal} onDateChange={setStartTime} setToCurrentDate />
      )}
      {isEndModalOpen && (
        <DatePickerModal date={endTime} onClose={toggleEndModal} onDateChange={setEndTime} setToCurrentDate />
      )}
    </div>
  );
}
