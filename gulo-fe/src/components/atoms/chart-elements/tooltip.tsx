import { NO_APPLICABLE_STREAMS } from '@/constants/miscellaneous';
import { getShorthandTick } from '@/utils/formats';
import { TooltipProps } from 'recharts';

export function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  if (NO_APPLICABLE_STREAMS.includes(payload[0].payload.alias)) {
    return (
      <div className='p-3 text-slate-100 bg-gray-800/75 border rounded-lg shadow-xl backdrop-blur-lg'>
        <p key='empty-label' className='my-2 text-xl text-slate-100 font-bold text-center'>
          {payload[0].payload.alias}
        </p>
      </div>
    );
  }

  return (
    <div className='p-3 text-slate-100 bg-gray-800/75 border rounded-lg shadow-xl backdrop-blur-lg'>
      {payload.map((entry, index) => (
        <>
          <p key={`item-${index}`} className='my-2 text-xl text-slate-100 font-bold underline text-center'>
            {entry.payload.alias}
          </p>
          <p key={`amount-${index}`} className='my-2 text-md text-slate-100 font-bold text-center'>
            {entry.payload.isNegative ? '-' : ''}
            {getShorthandTick(entry.payload.amount)}
          </p>
        </>
      ))}
    </div>
  );
}
