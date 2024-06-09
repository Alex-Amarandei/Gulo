import { MouseEvent, useState } from 'react';

import { StreamModalProps } from '@/interfaces/props';
import { formatDecimals, getCancelability } from '@/utils/formats';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

export default function StreamModal({ stream, onClose }: StreamModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
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
      <div
        style={{ backgroundColor: `${stream.color}1A` }}
        className={`relative bg-clip-padding backdrop-filter backdrop-blur-sm text-slate-100 p-6 rounded-lg max-w-lg w-full drop-shadow-xl`}>
        <button
          className='absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors text-sablier'
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
        <h3 className='text-xl font-bold mb-2'>
          <a
            href={`https://app.sablier.com/stream/${stream.alias.toUpperCase()}`}
            target='_blank'
            rel='noopener noreferrer'
            className='sablier'
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
            <FontAwesomeIcon icon={faCopy} size='sm' className='sablier' />
          </button>
          {copiedText === stream.sender && <span className='ml-2 text-green-500'>Copied!</span>}
        </p>
        <p className='text-sm flex items-center'>
          <strong>Recipient: </strong> {stream.recipient}
          <button
            className='ml-2 p-1 rounded-full hover:text-gray-600 transition-colors'
            onClick={() => handleCopy(stream.recipient)}
            aria-label='Copy Recipient Address'>
            <FontAwesomeIcon icon={faCopy} size='sm' className='sablier' />
          </button>
          {copiedText === stream.recipient && <span className='ml-2 text-green-500'>Copied!</span>}
        </p>
        <p className='text-sm'>
          <strong>Deposited Amount:</strong> {formatDecimals(stream.depositAmount)} {stream.asset.symbol}
        </p>
        <p className='text-sm'>
          <strong>Withdrawn Amount:</strong> {formatDecimals(stream.withdrawnAmount)} {stream.asset.symbol}
        </p>
        {stream.canceled && (
          <p className='text-sm'>
            <strong>Streamed Amount: </strong>
            {formatDecimals(stream.intactAmount, 4)} {stream.asset.symbol}
          </p>
        )}
        <p className='text-sm'>
          <strong>Start Time:</strong> {format(new Date(Number(stream.startTime + '000')), 'LLL dd, y HH:mm:ss')}
        </p>
        {!stream.canceled && (
          <p className='text-sm'>
            <strong>End Time:</strong> {format(new Date(Number(stream.endTime + '000')), 'LLL dd, y HH:mm:ss')}
          </p>
        )}
        <p className='text-sm'>
          <strong>{getCancelability(stream, false)}</strong>
        </p>
        <img src={stream.nft} alt='SVG' className='w-full h-auto object-contain mt-4 rounded-2xl' />
      </div>
    </div>
  );
}
