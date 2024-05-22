import DatePickerModal from '@/components/atoms/date-picker-modal';
import { useState } from 'react';

export default function Balance() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="balance-square">
      <div
        className="balance-rectangle-1 flex items-center justify-center text-center z-10 cursor-pointer"
        onClick={handleOpenModal}>
        <span className="datepicker bg-transparent text-white font-bold border-0 focus:border-0 text-center text-lg focus:ring-0">
          {date ? date.toLocaleString() : 'Select Date'}
        </span>
      </div>
      <div className="balance-rectangle-2 flex items-center justify-center text-center text-6xl text-slate-200">
        <strong>1234567.56</strong>
      </div>
      <div className="balance-rectangle-3"></div>
      {isModalOpen && <DatePickerModal date={date} onClose={handleCloseModal} onDateChange={setDate} />}
    </div>
  );
}
