import { ChartWrapperProps } from '@/interfaces/props';
import { getLineChartStreamData, getShorthandTick } from '@/utils/data';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function LineChartWrapper({ streams, startTime, endTime, increment }: ChartWrapperProps) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        height={200}
        data={getLineChartStreamData(streams, startTime, endTime, increment)}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}>
        <defs>
          <linearGradient id='gradientColor' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#f77725' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#f77725' stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray='4 4'
          stroke='#f1f5f9'
          strokeWidth={2}
          strokeLinecap='round'
          strokeOpacity={0.1}
          strokeLinejoin='bevel'
        />
        <XAxis
          dataKey='timestamp'
          stroke='#f77725'
          strokeWidth={4}
          strokeLinecap='round'
          strokeLinejoin='bevel'
          tick={{ fontSize: 12, fontWeight: 500 }}
          tickFormatter={getShorthandTick}
          tickMargin={10}
        />
        <YAxis
          stroke='#f77725'
          strokeWidth={4}
          strokeLinecap='round'
          strokeLinejoin='bevel'
          tick={{ fontSize: 12, fontWeight: 500 }}
          tickFormatter={getShorthandTick}
          tickMargin={10}
        />
        <Tooltip
          contentStyle={{
            color: '#f1f5f9',
            fontWeight: 500,
            backgroundColor: '#1F2937',
            border: '1px solid #f1f5f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px 0 rgba(255, 255, 255, 0.1)',
          }}
          formatter={getShorthandTick}
        />
        <Area
          type='monotone'
          dataKey='amount'
          stroke='#f77725'
          strokeWidth={3}
          fill='url(#gradientColor)'
          dot={{ stroke: '#f77725', strokeWidth: 1, fill: '#1F2937', r: 4, fillOpacity: 1 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
