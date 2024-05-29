'use client';

import { useState } from 'react';

import { InfoModalProps } from '@/interfaces/props';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BuyMeACoffeeModal({ onClose }: InfoModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const ethereumAddress = '0x3744fafA69a3236dd18Bc3870c8dA708D9f6906e';

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(ethereumAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className='fixed inset-0 bg-opacity-90 bg-gray-800 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-orange-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-slate-100 p-6 rounded-lg max-w-lg w-full shadow-xl'>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors sablier-orange'
          onClick={onClose}
          aria-label='Close'>
          <svg
            className='w-6 h-6 sablier-orange'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <h2 className='text-2xl font-bold text-center'>Buy Me a Coffee</h2>
        <br />
        <div className='flex items-center justify-center mt-4'>
          <span className='text-lg font-mono'>{ethereumAddress}</span>
          <button className='ml-2 p-1 rounded-full' onClick={handleCopyAddress} aria-label='Copy Ethereum Address'>
            <FontAwesomeIcon icon={faCopy} size='sm' className='sablier-orange' />
          </button>
        </div>
        {isCopied && <p className='text-green-500 text-center mt-2'>Address copied to clipboard!</p>}
      </div>
    </div>
  );
}
