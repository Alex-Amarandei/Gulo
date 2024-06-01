'use client';

import { useState } from 'react';

import ChartButton from '@/components/atoms/buttons/chart-button';
import DatePickerModal from '@/components/atoms/modals/date-picker-modal';
import { ChartType, Increment } from '@/constants/enums';
import { INCREMENT_LIMITS } from '@/constants/miscellaneous';
import { toast } from 'sonner';

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
    const newIncrement = event.target.value as Increment;

    if (endTime) {
      const newStartTime = new Date(endTime.getTime() - INCREMENT_LIMITS[newIncrement] * 1000);
      setStartTime(newStartTime);
    } else if (startTime) {
      const newEndTime = new Date(startTime.getTime() + INCREMENT_LIMITS[newIncrement] * 1000);
      setEndTime(newEndTime);
    }

    setIncrement(newIncrement);
  };

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value as ChartType);
  };

  const isTimeDifferenceValid = (start: Date, end: Date) => {
    const diffInSeconds = (end.getTime() - start.getTime()) / 1000;
    return diffInSeconds <= INCREMENT_LIMITS[increment as Increment];
  };

  const handleStartTimeChange = (date: Date | null) => {
    if (date && endTime && date > endTime) {
      toast.error('Start time cannot be after end time.');
    } else if (date && endTime && !isTimeDifferenceValid(date, endTime)) {
      toast.error('The difference between start time and end time exceeds the limit for the selected increment.');
    } else {
      setStartTime(date);
    }
  };

  const handleEndTimeChange = (date: Date | null) => {
    if (date && startTime && date < startTime) {
      toast.error('End time cannot be before start time.');
    } else if (date && startTime && !isTimeDifferenceValid(startTime, date)) {
      toast.error('The difference between start time and end time exceeds the limit for the selected increment.');
    } else {
      setEndTime(date);
    }
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
        <DatePickerModal
          date={startTime}
          onClose={toggleStartModal}
          onDateChange={handleStartTimeChange}
          setToCurrentDate
        />
      )}
      {isEndModalOpen && (
        <DatePickerModal date={endTime} onClose={toggleEndModal} onDateChange={handleEndTimeChange} setToCurrentDate />
      )}
    </div>
  );
}
