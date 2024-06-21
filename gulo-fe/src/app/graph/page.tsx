'use client';

import { StreamGraph } from '@/components/organisms/graph/stream-graph';
import { useChainId } from 'wagmi';

export default function GraphPage() {
  const chainId = useChainId();

  return (
    <div className='min-h-[90vh] min-w-full focus:ring-0 focus:ring-transparent focus:outline-none'>
      <StreamGraph chainId={chainId} />
    </div>
  );
}
