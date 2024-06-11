import { MouseEvent, useRef } from 'react';

import { EmailInputModalProps } from '@/interfaces/props';
import { toast } from 'sonner';

export const EmailInputModal = ({ isOpen, onClose, onSubmit, email, setEmail }: EmailInputModalProps) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event?: MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const email = emailRef.current?.value ?? '';
    if (validateEmail(email)) {
      onSubmit(email);
      setEmail(email);
      onClose();
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-opacity-90 bg-gray-800 flex items-center justify-center z-50'
      onClick={handleOverlayClick}>
      <div className='relative bg-orange-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-slate-100 p-6 rounded-lg max-w-lg w-full shadow-xl'>
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
        <h2 className='text-2xl font-bold text-center'>Enter your email</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className='flex items-center justify-center mt-4'>
            <input
              type='email'
              ref={emailRef}
              className='w-full p-2 rounded-lg mb-4 font-bold text-gray-800 bg-gradient-to-br from-slate-100 to-slate-200 focus:outline-none focus:border-none focus:ring-2 focus:ring-sablier'
              placeholder='your-email@example.com'
              style={{ fontStyle: 'normal' }}
              defaultValue={email ?? undefined}
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button
              type='submit'
              className='text-slate-100 bg-sablier rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 drop-shadow-lg border-none'>
              <strong>Submit</strong>
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        input::placeholder {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
