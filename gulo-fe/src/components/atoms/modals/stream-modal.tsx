import { useState } from 'react';

import { StreamModalProps } from '@/interfaces/props';
import { formatDecimals } from '@/utils/formats';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StreamModal({ stream, onClose }: StreamModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div
      className='fixed inset-0 bg-opacity-90 bg-gray-900 flex items-center justify-center z-50'
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
        <h3 className='text-xl font-bold mb-2'>
          <a
            href={`https://app.sablier.com/stream/${stream.alias.toUpperCase()}`}
            target='_blank'
            rel='noopener noreferrer'
            className='sablier-orange'
            onClick={event => event.stopPropagation()}>
            <u>{stream.alias.toUpperCase()}</u>
          </a>
        </h3>
        <p className='text-sm flex items-center'>
          <strong>Sender: </strong> {stream.sender}
          <button
            className='ml-2 p-1 rounded-full hover:text-gray-600 transition-colors'
            onClick={() => handleCopy(stream.sender)}
            aria-label='Copy Sender Address'>
            <FontAwesomeIcon icon={faCopy} size='sm' className='sablier-orange' />
          </button>
          {copiedText === stream.sender && <span className='ml-2 text-green-500'>Copied!</span>}
        </p>
        <p className='text-sm flex items-center'>
          <strong>Recipient: </strong> {stream.recipient}
          <button
            className='ml-2 p-1 rounded-full hover:text-gray-600 transition-colors'
            onClick={() => handleCopy(stream.recipient)}
            aria-label='Copy Recipient Address'>
            <FontAwesomeIcon icon={faCopy} size='sm' className='sablier-orange' />
          </button>
          {copiedText === stream.recipient && <span className='ml-2 text-green-500'>Copied!</span>}
        </p>
        <p className='text-sm'>
          <strong>Deposited Amount:</strong> {formatDecimals(stream.depositAmount)} {stream.asset.symbol}
        </p>
        <p className='text-sm'>
          <strong>Withdrawn Amount:</strong> {formatDecimals(stream.withdrawnAmount)} {stream.asset.symbol}
        </p>
        <p className='text-sm'>
          <strong>Start Time:</strong> {new Date(Number(stream.startTime) * 1000).toLocaleString()}
        </p>
        <p className='text-sm'>
          <strong>End Time:</strong> {new Date(Number(stream.endTime) * 1000).toLocaleString()}
        </p>
        <p className='text-sm'>
          <strong>Is Cancelable:</strong> {stream.cancelable ? 'Yes' : 'No'}
        </p>
        <img src={stream.nft} alt='SVG' className='w-full h-auto object-contain mt-4 rounded-2xl' />
      </div>
    </div>
  );
}