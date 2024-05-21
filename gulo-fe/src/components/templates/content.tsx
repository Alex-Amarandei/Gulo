import Streams from '@/components/templates/streams';
import { StreamProvider } from '../contexts/streams-context';

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      <div className="body-wrapper">
        <main className="flex justify-between space-x-4 p-4">
          <Streams />
          {children}
        </main>
      </div>
    </StreamProvider>
  );
}
