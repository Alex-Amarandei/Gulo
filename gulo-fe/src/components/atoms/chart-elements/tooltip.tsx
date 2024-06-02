import { getShorthandTick } from '@/utils/data';
import { TooltipProps } from 'recharts';

export function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className='p-3 text-slate-100 bg-gray-800/75 border rounded-lg shadow-xl backdrop-blur-lg'>
      {payload.map((entry, index) => (
        <>
          <p key={`item-${index}`} className='my-2 text-xs sablier-orange font-bold underline text-center'>
            {entry.payload.alias.toUpperCase()}
          </p>
          <p key={`amount-${index}`} className='my-2 text-sm sablier-orange font-bold text-center'>
            {getShorthandTick(entry.payload.amount)}
          </p>
        </>
      ))}
    </div>
  );
}
