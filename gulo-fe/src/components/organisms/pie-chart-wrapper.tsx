import { renderCustomizedLabel } from '@/components/atoms/chart-elements/label';
import { CustomTooltip } from '@/components/atoms/chart-elements/tooltip';
import { COLOR_PALETTES, NO_APPLICABLE_STREAMS } from '@/constants/miscellaneous';
import { ChartWrapperProps } from '@/interfaces/props';
import { getColorVariation, getPieChartStreamData, getRandomIndex } from '@/utils/data';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function PieChartWrapper({ streams, startTime }: ChartWrapperProps) {
  const data = getPieChartStreamData(streams, startTime);
  const selectedPalette = COLOR_PALETTES[getRandomIndex(COLOR_PALETTES.length)];

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
        {data.length === 0 ? (
          <Pie
            data={[{ alias: NO_APPLICABLE_STREAMS, amount: 1 }]}
            cx='50%'
            cy='50%'
            innerRadius={'50%'}
            outerRadius={'100%'}
            dataKey='amount'
            strokeWidth={0}>
            <Cell
              key='empty-cell'
              fill='#f1f5f9'
              opacity={0.25}
              strokeWidth={0}
              style={{
                filter: `drop-shadow(2px 2px 7px #02111A)`,
                outline: 'none',
              }}
            />
          </Pie>
        ) : (
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={'50%'}
            outerRadius={'100%'}
            dataKey='amount'
            labelLine={false}
            label={renderCustomizedLabel}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColorVariation(selectedPalette)}
                strokeWidth={0}
                style={{
                  filter: `drop-shadow(2px 2px 7px #02111A)`,
                  outline: 'none',
                }}
              />
            ))}
          </Pie>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
