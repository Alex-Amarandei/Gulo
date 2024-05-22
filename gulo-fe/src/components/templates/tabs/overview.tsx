'use client';

import Balance from '@/components/organisms/balance';

export default function Overview() {
  return (
    <div className="flex flex-grow border p-2 w-2/3 items-center justify-center min-h-[90vh]">
      <Balance />
    </div>
  );
}
