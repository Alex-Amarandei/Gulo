import { renderCustomizedLabel } from '@/components/atoms/chart-elements/label';
import { CustomTooltip } from '@/components/atoms/chart-elements/tooltip';
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
        <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={'100%'}
          dataKey='amount'
          labelLine={false}
          label={renderCustomizedLabel}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColorVariation(index, streams.length)}
              stroke='#f1f5f9'
              strokeWidth={1}
              strokeOpacity={0.5}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
