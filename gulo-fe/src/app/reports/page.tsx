'use client';

import { ChangeEvent, useState } from 'react';

import { downloadTable } from '@/api/reports/download-table';
import ToolButton from '@/components/atoms/buttons/tool-button';
import { useStreams } from '@/components/contexts/streams-context';
import DatePickerModal from '@/components/molecules/modals/date-picker-modal';
import DateRangePickerModal from '@/components/molecules/modals/date-range-picker-modal';
import { EmailInputModal } from '@/components/molecules/modals/email-input-modal';
import { StreamsTable } from '@/components/organisms/reports/streams-table';
import { BalanceType, DownloadType } from '@/constants/enums';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/ui/molecules/dropdown-menu';
import { Maybe, nowWithZeroSeconds, oneMonthBefore } from '@/utils/data';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

export default function ReportsPage() {
  const now = nowWithZeroSeconds();

  const { selectedStreams } = useStreams();
  const [email, setEmail] = useState<Maybe<string>>(undefined);
  const [balanceType, setBalanceType] = useState(BalanceType.Actual);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Maybe<Date>>(now);
  const [dateRange, setDateRange] = useState<Maybe<DateRange>>({
    from: oneMonthBefore(now),
    to: now,
  });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedDownloadType, setSelectedDownloadType] = useState<Maybe<DownloadType>>(DownloadType.JSON);

  const handleDateRangeChange = (dateRange: Maybe<DateRange>) => {
    setDateRange(dateRange);
  };

  const handleDateChange = (date: Maybe<Date>) => {
    setDate(date);
  };

  const handleBalanceTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBalanceType(event.target.value as BalanceType);
  };

  const toggleStartModal = () => setIsModalOpen(prev => !prev);

  const handleDownload = (type: DownloadType) => {
    downloadTable(selectedStreams, balanceType, date, dateRange, type);
  };

  const handleEmailDownload = (email: string) => {
    if (selectedDownloadType) {
      downloadTable(selectedStreams, balanceType, date, dateRange, selectedDownloadType, email);
    }
  };

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
          <div className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 mb-2 font-bold'>
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:ring-0 focus:outline-none focus:ring-transparent flex items-center'>
                {balanceType}
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg px-4 py-2 mb-2 font-bold border-none drop-shadow-xl'>
                <DropdownMenuLabel className='font-extrabold'>Select Balance Type</DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-sablier' />
                {Object.values(BalanceType).map(value => (
                  <DropdownMenuItem
                    onClick={() => handleBalanceTypeChange({ target: { value } } as ChangeEvent<HTMLSelectElement>)}
                    key={value}>
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 mb-2 font-bold'>
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:ring-0 focus:outline-none focus:ring-transparent flex items-center'>
                Download
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg px-4 py-2 mb-2 font-bold border-none drop-shadow-xl'>
                <DropdownMenuLabel className='font-extrabold'>Export Type</DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-sablier' />
                {Object.values(DownloadType).map(value => (
                  <DropdownMenuItem onClick={() => handleDownload(value)} key={value}>
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 mb-2 font-bold'>
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:ring-0 focus:outline-none focus:ring-transparent flex items-center'>
                Email
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg px-4 py-2 mb-2 font-bold border-none drop-shadow-xl'>
                <DropdownMenuLabel className='font-extrabold'>Export Type</DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-sablier' />
                {Object.values(DownloadType).map(value => (
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedDownloadType(value);
                      setIsEmailModalOpen(true);
                    }}
                    key={value}>
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <StreamsTable balanceType={balanceType} streams={selectedStreams} dateRange={dateRange} date={date} />
      {isModalOpen && balanceType === BalanceType.Actual && (
        <DateRangePickerModal date={dateRange} onClose={toggleStartModal} onDateChange={handleDateRangeChange} />
      )}
      {isModalOpen && balanceType === BalanceType.Forecast && (
        <DatePickerModal date={date} onClose={toggleStartModal} onDateChange={handleDateChange} setToCurrentDate />
      )}
      <EmailInputModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailDownload}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
}
