'use client';

import BuyMeACoffeeModal from '@/components/atoms/buy-me-a-coffee-modal';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function BuyMeACoffeeButton() {
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
        <FontAwesomeIcon icon={faCoffee} size="xl" className="sablier-orange" />
      </div>
      {isModalOpen && <BuyMeACoffeeModal onClose={handleCloseModal} />}
    </>
  );
}
