import { renderCustomizedLabel } from '@/components/atoms/chart-elements/label';
import { CustomTooltip } from '@/components/atoms/chart-elements/tooltip';
import { SABLIER_ORANGE } from '@/constants/miscellaneous';
import { ChartWrapperProps } from '@/interfaces/props';
import { getColorVariation, getPieChartStreamData } from '@/utils/data';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function PieChartWrapper({ streams, startTime }: ChartWrapperProps) {
  const data = getPieChartStreamData(streams, startTime);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}>
        <defs>
          {streams.map((_, index) => {
            const color = getColorVariation(SABLIER_ORANGE, index, streams.length);
            return (
              <linearGradient key={`gradientColor-${index}`} id={`gradientColor-${index}`} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={color} stopOpacity={0.8} />
                <stop offset='95%' stopColor={color} stopOpacity={0.5} />
              </linearGradient>
            );
          })}
        </defs>
        <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={'100%'}
          fill={SABLIER_ORANGE}
          dataKey='amount'
          labelLine={false}
          label={renderCustomizedLabel}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={`url(#gradientColor-${index})`} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
