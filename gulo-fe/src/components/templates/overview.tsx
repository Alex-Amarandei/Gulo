'use client';

import { useStreams } from '@/components/contexts/streams-context';
import BalanceWidget from '@/components/organisms/balance';

export default function Overview() {
  const { streams } = useStreams();

  return (
    <div className="border p-2 w-2/3">
      <BalanceWidget />
    </div>
  );
}
