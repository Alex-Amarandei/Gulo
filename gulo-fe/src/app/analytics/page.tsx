'use client';

import { ChangeEvent, useState } from 'react';

import ChartButton from '@/components/atoms/buttons/chart-button';
import DatePickerModal from '@/components/molecules/modals/date-picker-modal';
import Chart from '@/components/templates/charts';
import { ChartType, Increment } from '@/constants/enums';
import { INCREMENT_LIMITS } from '@/constants/miscellaneous';
import { nowWithZeroSeconds, oneMonthFrom } from '@/utils/data';
import { toast } from 'sonner';

export default function Analytics() {
  const now = nowWithZeroSeconds();

  const [startTime, setStartTime] = useState<Date | undefined>(now);
  const [endTime, setEndTime] = useState<Date | undefined>(oneMonthFrom(now));
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [increment, setIncrement] = useState(Increment.Day);
  const [chartType, setChartType] = useState<ChartType>(ChartType.Line);

  const toggleStartModal = () => setIsStartModalOpen(prev => !prev);
  const toggleEndModal = () => setIsEndModalOpen(prev => !prev);

  const handleIncrementChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (startTime && endTime && !isTimeDifferenceValid(startTime, endTime, event.target.value as Increment)) {
      toast.error('The difference between start time and end time exceeds the limit for the selected increment.');
      return;
    }
    setIncrement(event.target.value as Increment);
  };

  const handleChartTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value as ChartType);
  };

  const isTimeDifferenceValid = (start: Date, end: Date, potentialIncrement: Increment) => {
    const diffInSeconds = (end.getTime() - start.getTime()) / 1000;
    return diffInSeconds <= INCREMENT_LIMITS[potentialIncrement];
  };

  const handleStartTimeChange = (date: Date | undefined) => {
    if (chartType === ChartType.Pie) {
      setStartTime(date);
      return;
    }

    if (date && endTime && date > endTime) {
      toast.error('Start time cannot be after end time.');
    } else if (date && endTime && !isTimeDifferenceValid(date, endTime, increment)) {
      toast.error('The difference between start time and end time exceeds the limit for the selected increment.');
    } else {
      setStartTime(date);
    }
  };

  const handleEndTimeChange = (date: Date | undefined) => {
    if (date && startTime && date < startTime) {
      toast.error('End time cannot be before start time.');
    } else if (date && startTime && !isTimeDifferenceValid(startTime, date, increment)) {
      toast.error('The difference between start time and end time exceeds the limit for the selected increment.');
    } else {
      setEndTime(date);
    }
  };

  return (
    <div className='flex flex-grow flex-col h-[90vh] w-2/3 rounded-lg p-4 ml-12'>
      <div className='flex justify-between items-center'>
        <ChartButton onClick={toggleStartModal}>
          {startTime
            ? startTime.toLocaleString('en-US')
            : chartType === ChartType.Pie
              ? 'Select Date and Time'
              : 'Select Start Time'}
        </ChartButton>
        {chartType !== ChartType.Pie && (
          <ChartButton onClick={toggleEndModal}>
            {endTime ? endTime.toLocaleString('en-US') : 'Select End Time'}
          </ChartButton>
        )}
        {chartType !== ChartType.Pie && (
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
        )}
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
      <Chart startTime={startTime} endTime={endTime} increment={increment} chartType={chartType} />
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
