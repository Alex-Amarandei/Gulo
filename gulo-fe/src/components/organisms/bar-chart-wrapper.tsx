import { COLOR_PALETTES, SABLIER_ORANGE } from '@/constants/miscellaneous';
import { ChartWrapperProps } from '@/interfaces/props';
import { getBarChartStreamData, getColorVariation, getRandomIndex } from '@/utils/data';
import { getShorthandTick } from '@/utils/formats';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function BarChartWrapper({ streams, startTime, endTime, increment }: ChartWrapperProps) {
  const data = getBarChartStreamData(streams, startTime, endTime, increment);
  const selectedPalette = COLOR_PALETTES[getRandomIndex(COLOR_PALETTES.length)];

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}>
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
          stroke={SABLIER_ORANGE}
          strokeWidth={4}
          strokeLinecap='round'
          strokeLinejoin='bevel'
          tick={{ fontSize: 12, fontWeight: 500 }}
          tickMargin={10}
        />
        <YAxis
          stroke={SABLIER_ORANGE}
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
          labelStyle={{ fontWeight: 500, fontSize: 24, textAlign: 'center' }}
          itemStyle={{ fontWeight: 500 }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          formatter={getShorthandTick}
        />
        {streams.map((stream, index) => (
          <Bar
            key={`bar-${index}`}
            dataKey={stream.alias.toUpperCase()}
            stroke={'rgba(0, 0, 0, 0)'}
            strokeWidth={2}
            fill={getColorVariation(selectedPalette)}
            stackId='a'
            style={{
              filter: `drop-shadow(0px 0px 2px #02111A)`,
              outline: 'none',
            }}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
