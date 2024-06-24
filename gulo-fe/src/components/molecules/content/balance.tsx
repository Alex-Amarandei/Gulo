'use client';

import { useEffect, useState } from 'react';

import DatePickerModal from '@/components/molecules/modals/date-picker-modal';
import { useStreams } from '@/components/templates/contexts/streams-context';
import getBalance from '@/utils/balances';
import { Maybe } from '@/utils/data';
import { formatBalance } from '@/utils/formats';
import { format } from 'date-fns';

export default function Balance() {
  const [date, setDate] = useState<Maybe<Date>>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedStreams } = useStreams();
  const [balance, setBalance] = useState('0.0000');
  const [timestampChosenManually, setTimestampChosenManually] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimestampChosenManually(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (date === undefined) {
      setTimestampChosenManually(false);
    }
  };

  useEffect(() => {
    if (timestampChosenManually) {
      setBalance(getBalance(selectedStreams, date));
      return;
    }

    const interval = setInterval(() => {
      setBalance(getBalance(selectedStreams, undefined));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedStreams, timestampChosenManually, date]);

  const { integerPart, decimalPart } = formatBalance(balance);

  return (
    <div className='balance-square'>
      <div
        className='balance-rectangle-1 flex items-center justify-center text-center z-10 cursor-pointer transition-transform duration-300 hover:-translate-y-1'
        onClick={handleOpenModal}>
        <span className='bg-transparent text-white font-bold border-0 focus:border-0 text-center text-lg focus:ring-0'>
          {date ? format(date, 'LLL dd, y HH:mm:ss') : 'NOW'}
        </span>
      </div>
      <div className='balance-rectangle-2 flex items-center justify-center text-slate-100'>
        <div className='flex items-end'>
          <div className='flex items-center'>
            <strong className='text-6xl'>{integerPart}</strong>
          </div>
          <div className='flex items-end'>
            <strong className='text-3xl'>.{decimalPart}</strong>
          </div>
        </div>
      </div>
      <div className='balance-rectangle-3 flex items-center justify-center text-center text-lg text-slate-100'>
        <strong>USD</strong>
      </div>
      {isModalOpen && <DatePickerModal date={date} onClose={handleCloseModal} onDateChange={setDate} />}
    </div>
  );
}
