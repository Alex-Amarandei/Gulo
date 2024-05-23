'use client';

import DatePickerModal from '@/components/atoms/date-picker-modal';
import { useStreams } from '@/components/contexts/streams-context';
import getBalance from '@/utils/balances';
import { useEffect, useState } from 'react';

export default function Balance() {
  const [date, setDate] = useState<Date | null>(null);
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
    if (date === null) {
      setTimestampChosenManually(false);
    }
  };

  useEffect(() => {
    if (timestampChosenManually) {
      setBalance(getBalance(selectedStreams, date));
      return;
    }

    const interval = setInterval(() => {
      setBalance(getBalance(selectedStreams, null));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedStreams, timestampChosenManually, date]);

  return (
    <div className="balance-square">
      <div
        className="balance-rectangle-1 flex items-center justify-center text-center z-10 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        onClick={handleOpenModal}>
        <span className="datepicker bg-transparent text-white font-bold border-0 focus:border-0 text-center text-lg focus:ring-0">
          {date ? date.toLocaleString() : 'NOW'}
        </span>
      </div>
      <div className="balance-rectangle-2 flex items-center justify-center text-center text-6xl text-slate-100">
        <strong>{balance}</strong>
      </div>
      <div className="balance-rectangle-3 flex items-center justify-center text-center text-2xl text-slate-100">
        <strong>DAI / USD</strong>
      </div>
      {isModalOpen && <DatePickerModal date={date} onClose={handleCloseModal} onDateChange={setDate} />}
    </div>
  );
}
