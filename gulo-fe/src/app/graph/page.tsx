'use client';

import { StreamGraph } from '@/components/organisms/graph/stream-graph';
import { toast } from 'sonner';
import { useChainId } from 'wagmi';

export default function GraphPage() {
  const chainId = useChainId();

  toast.info(
    `Please allow the page to load for up to 1 minute, if the graph is not shown immediately. 🕒 
     Alternatively, you can try refreshing the page. 🔄`,
  );

  return (
    <div className='min-h-[90vh] min-w-full focus:ring-0 focus:ring-transparent focus:outline-none'>
      <StreamGraph chainId={chainId} />
    </div>
  );
}
