import Streams from '@/components/templates/streams';

import { StreamProvider } from '../../contexts/streams-context';

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      <main className="flex flex-grow justify-between">
        <Streams />
        {children}
      </main>
    </StreamProvider>
  );
}
