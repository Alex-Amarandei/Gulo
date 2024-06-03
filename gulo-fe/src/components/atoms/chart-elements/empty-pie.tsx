import { NO_APPLICABLE_STREAMS } from '@/constants/miscellaneous';
import { Cell, Pie } from 'recharts';

export default function EmptyPie() {
  return (
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
  );
}
