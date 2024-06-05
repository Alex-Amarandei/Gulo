import { RADIAN } from '@/constants/miscellaneous';
import { formatValueForLabel } from '@/utils/formats';

export function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  alias,
}: {
  cx: string | number;
  cy: string | number;
  midAngle: string | number;
  innerRadius: string | number;
  outerRadius: string | number;
  percent: string | number;
  alias: string;
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
    <g>
      <text
        x={x}
        y={y - 10}
        fill='white'
        textAnchor='middle'
        dominantBaseline='central'
        className='font-bold font-xl'
        style={{
          filter: `drop-shadow(1px 1px 1px #02111A)`,
        }}>
        {`${value}%`}
      </text>
      <text
        x={x}
        y={y + 10}
        fill='white'
        textAnchor='middle'
        dominantBaseline='central'
        className='font-bold font-sm'
        style={{
          filter: `drop-shadow(1px 1px 1px #02111A)`,
        }}>
        {alias.toUpperCase()}
      </text>
    </g>
  );
}
