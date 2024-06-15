'use client';

import { useEffect } from 'react';

import { getAllStreams } from '@/api/services/stream-service';
import { StreamGraph } from '@/components/molecules/content/graph';
import { toast } from 'sonner';
import { useChainId } from 'wagmi';

export default function GraphPage() {
  const chainId = useChainId();

  useEffect(() => {
    if (chainId) {
      getAllStreams().then(() => {
        toast.success('Streams loaded successfully, please refresh the page if no visible updates occurred.');
      });
    }
  }, [chainId]);

  return (
    <div className='min-h-[90vh] min-w-full focus:ring-0 focus:ring-transparent focus:outline-none'>
      <StreamGraph chainId={chainId} />
    </div>
  );
}
