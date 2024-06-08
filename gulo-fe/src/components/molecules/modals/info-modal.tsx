import { MouseEvent } from 'react';

import { InfoModalProps } from '@/interfaces/props';

export default function InfoModal({ onClose }: InfoModalProps) {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-opacity-90 bg-gray-800 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-orange-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-slate-100 p-6 rounded-lg max-w-lg w-full shadow-xl'>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors text-sablier '
          onClick={onClose}
          aria-label='Close'>
          <svg
            className='w-6 h-6 text-sablier '
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <h2 className='text-2xl font-bold text-center'>
          ⚙️ <u>WORK IN PROGRESS</u> 🏗️
        </h2>
        <br />
        <h3 className='text-xl font-semibold'>
          <u>Disclaimer</u>
        </h3>
        <p className='mt-2'>
          We only support DAI Streams now, but this will change very soon! Gulo is a one-dev effort to help streamline
          the adoption of Sablier and is ongoing development. Gulo does not store any kind of personal info and will be
          free-to-use. Feel free to support me if you feel like this is helpful! 🫡
        </p>
        <br />
        <h3 className='text-xl font-semibold'>
          <u>What is Gulo?</u>
        </h3>
        <p className='mt-2'>
          The core functionality of Gulo is to calculate the total amount of funds available for withdrawing from your
          Sablier Stream Portfolio at a certain moment in time.
        </p>
        <br />
        <h3 className='text-xl font-semibold'>
          <u>What Streams are Included?</u>
        </h3>
        <p className='mt-2'>
          You can select the streams to be included from the list on the left-hand side, which is populated once you
          connect your wallet. You can click away or use the predefined filters.
        </p>
        <br />
        <h3 className='text-xl font-semibold'>
          <u>What do &quot;Self&quot; and &quot;Non-Self&quot; mean?</u>
        </h3>
        <p className='mt-2'>
          &quot;Self&quot; signifies a circular stream, sent from you, to you. While this is peculiar in nature, it is
          an edge case to be considered. Some Sablier users use this kind of Streams to limit their access to savings.
        </p>
        <br />
        <h3 className='text-xl font-semibold'>
          <u>What else should I know?</u>
        </h3>
        <p className='mt-2'>
          One thing that must be taken into account is that for any dates in the past, the withdrawn amount from the
          stream is not subtracted from the amount shown, as Sablier does not offer any info on when withdrawals were
          made / how big they were.
        </p>
      </div>
    </div>
  );
}
