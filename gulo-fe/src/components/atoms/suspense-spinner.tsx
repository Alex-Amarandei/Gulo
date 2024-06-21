import { Spinner } from '@chakra-ui/react';

export const SuspenseSpinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
      <Spinner size='xl' color='white' />
    </div>
  );
};
