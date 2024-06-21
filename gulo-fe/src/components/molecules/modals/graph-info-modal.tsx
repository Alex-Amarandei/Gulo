import { MouseEvent } from 'react';

import { GraphInfoModalProps } from '@/interfaces/props';

export function GraphInfoModal({ onClose, streamCount }: GraphInfoModalProps) {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-opacity-80 bg-gray-800 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-gradient-to-br from-gray-600/80 to-gray-700/20 bg-clip-padding backdrop-filter backdrop-blur-lg p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl'>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors text-sablier'
          onClick={onClose}
          aria-label='Close'>
          <svg
            className='w-6 h-6 text-sablier'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <h2 className='text-3xl font-semibold text-center mb-6 text-slate-100'>Stream Network Information</h2>
        <div className='space-y-6 text-slate-100'>
          <div>
            <h3 className='text-lg font-bold'>Stream Count</h3>
            <p className='text-sm text-gray-300 italic'>The total number of streams in the network.</p>
            <p>
              Count: <span className='text-sablier font-bold'>{streamCount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
