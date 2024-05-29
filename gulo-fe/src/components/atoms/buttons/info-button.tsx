'use client';

import InfoModal from '@/components/atoms/modals/info-modal';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function InfoButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-gray-800 sablier-orange info-button rounded-full p-4 z-50 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
        onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faInfoCircle} size="2xl" />
      </div>
      {isModalOpen && <InfoModal onClose={handleCloseModal} />}
    </>
  );
}
