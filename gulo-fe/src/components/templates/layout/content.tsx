import { StreamProvider } from '@/components/contexts/streams-context';
import Streams from '@/components/templates/streams';

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      <main className="flex flex-grow justify-between px-4">
        <Streams />
        {children}
      </main>
    </StreamProvider>
  );
}
