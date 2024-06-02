import { useStreams } from '@/components/contexts/streams-context';
import BarChartWrapper from '@/components/organisms/bar-chart-wrapper';
import LineChartWrapper from '@/components/organisms/line-chart-wrapper';
import PieChartWrapper from '@/components/organisms/pie-chart-wrapper';
import { ChartType } from '@/constants/enums';
import { ChartProps } from '@/interfaces/props';

export default function Chart({ startTime, endTime, increment, chartType }: ChartProps) {
  const { selectedStreams } = useStreams();

  const renderChart = () => {
    switch (chartType) {
      case ChartType.Line:
        return (
          <LineChartWrapper startTime={startTime} endTime={endTime} increment={increment} streams={selectedStreams} />
        );
      case ChartType.Bar:
        return (
          <BarChartWrapper startTime={startTime} endTime={endTime} increment={increment} streams={selectedStreams} />
        );
      case ChartType.Pie:
        return (
          <PieChartWrapper startTime={startTime} endTime={endTime} increment={increment} streams={selectedStreams} />
        );
      default:
        return null;
    }
  };

  return <div className='flex-grow m-1'>{renderChart()}</div>;
}
