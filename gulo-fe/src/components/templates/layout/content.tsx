import { ReactNode } from 'react';

import { StreamProvider } from '@/components/templates/contexts/streams-context';
import Streams from '@/components/templates/streams';

export default function Content({ children }: { children: ReactNode }) {
  return (
    <StreamProvider>
      <main className='flex flex-grow justify-between px-4'>
        <Streams />
        {children}
      </main>
    </StreamProvider>
  );
}
