import { Suspense } from 'react';

import { DatePickerModalProps } from '@/interfaces/props';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerModal({
  date,
  onClose,
  onDateChange,
  setToCurrentDate = false,
}: DatePickerModalProps) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleNowButtonClick = () => {
    if (setToCurrentDate) {
      onDateChange(new Date());
    } else {
      onDateChange(null);
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
        <Suspense fallback={<strong>NOW</strong>}>
          <DatePicker
            placeholderText='Select Date and Time'
            selected={date}
            onChange={date => onDateChange(date)}
            showTimeSelect
            locale={'en-US'}
            dateFormat='Pp'
            className='bg-transparent text-slate-100 font-bold border-0 focus:border-0 text-center text-lg focus:ring-0'
          />
        </Suspense>
        <button
          className='sablier-orange drop-shadow-lg bg-gray-800 p-2 transition-transform duration-300 hover:-translate-y-1'
          onClick={handleNowButtonClick}>
          <strong>NOW</strong>
        </button>
      </div>
    </div>
  );
}
