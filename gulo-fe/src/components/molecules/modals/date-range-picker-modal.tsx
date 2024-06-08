import { MouseEvent } from 'react';

import { DateRangePickerModalProps } from '@/interfaces/props';
import { DatePickerWithRange } from '@/lib/ui/organisms/date-range-picker';

export default function DateRangePickerModal({ date, onClose, onDateChange }: DateRangePickerModalProps) {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-gray-800 text-slate-100 p-6 rounded-lg max-w-sm w-full'>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors'
          onClick={onClose}
          aria-label='Close'>
          <svg className='w-6 h-6' fill='none' stroke='#F77725' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <div className='flex items-center space-x-2 mr-5'>
          <div className='flex-grow'>
            <DatePickerWithRange date={date} onDateChange={date => onDateChange(date)} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
