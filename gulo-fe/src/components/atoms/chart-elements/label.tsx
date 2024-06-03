import { RADIAN } from '@/constants/miscellaneous';
import { formatValueForLabel } from '@/utils/formats';

export function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: string | number;
  cy: string | number;
  midAngle: string | number;
  innerRadius: string | number;
  outerRadius: string | number;
  percent: string | number;
  _: string | number;
}) {
  const cxNumber = formatValueForLabel(cx);
  const cyNumber = formatValueForLabel(cy);
  const midAngleNumber = formatValueForLabel(midAngle);
  const innerRadiusNumber = formatValueForLabel(innerRadius);
  const outerRadiusNumber = formatValueForLabel(outerRadius);
  const percentNumber = formatValueForLabel(percent);

  const radius = innerRadiusNumber + (outerRadiusNumber - innerRadiusNumber) * 0.5;
  const x = cxNumber + radius * Math.cos(-midAngleNumber * RADIAN);
  const y = cyNumber + radius * Math.sin(-midAngleNumber * RADIAN);

  const value = (percentNumber * 100).toFixed(0);

  if (value === '0') {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cxNumber ? 'start' : 'end'}
      dominantBaseline='central'
      className='font-bold font-xl'
      style={{
        filter: `drop-shadow(1px 1px 1px #02111A)`,
      }}>
      {`${value}%`}
    </text>
  );
}
