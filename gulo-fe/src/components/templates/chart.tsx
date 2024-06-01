import { useStreams } from '@/components/contexts/streams-context';
import { ChartProps } from '@/interfaces/props';
import { getStreamData } from '@/utils/data';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Chart({ startTime, endTime, increment, chartType }: ChartProps) {
  const { selectedStreams } = useStreams();

  return (
    <div className='flex-grow m-1'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={500}
          height={300}
          data={getStreamData(selectedStreams, startTime, endTime, increment)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type='monotone' dataKey='amount' stroke='#8884d8' activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
