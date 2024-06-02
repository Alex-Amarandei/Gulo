import { Increment } from '@/constants/enums';
import { INCREMENT_VALUE } from '@/constants/miscellaneous';
import Stream from '@/interfaces/stream';
import getBalance from '@/utils/balances';

function getSteps(startTime: Date | null, endTime: Date | null, increment: Increment) {
  if (startTime === null || endTime === null) {
    return [];
  }

  const steps = [];
  let currentTimestamp = startTime.getTime() / 1000;
  const endTimestamp = endTime.getTime() / 1000;

  while (currentTimestamp <= endTimestamp) {
    steps.push(currentTimestamp);
    currentTimestamp += INCREMENT_VALUE[increment];
  }

  return steps;
}

export function formatDate(timestamp: number, increment: Increment): string {
  const date = new Date(timestamp);

  switch (increment) {
    case Increment.Second:
      return date.toLocaleTimeString('en-US', { minute: '2-digit', second: '2-digit' });
    case Increment.Minute:
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    case Increment.Hour:
      return date.toLocaleString('en-US', { weekday: 'short', hour: '2-digit', hour12: false });
    case Increment.Day:
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    case Increment.Week:
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    case Increment.Month:
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    default:
      return date.toISOString();
  }
}

export function getShorthandTick(tickValue: number) {
  if (Math.abs(tickValue) > 1_000_000_000) {
    return (tickValue / 1_000_000_000).toFixed(2).toString() + 'B';
  } else if (Math.abs(tickValue) > 1_000_000) {
    return (tickValue / 1_000_000).toFixed(2).toString() + 'M';
  } else if (Math.abs(tickValue) > 1_000) {
    return (tickValue / 1_000).toFixed(2).toString() + 'K';
  } else {
    return tickValue.toString();
  }
}

export function getLineChartStreamData(
  streams: Stream[],
  startTime: Date | null,
  endTime: Date | null,
  increment: Increment,
) {
  const steps = getSteps(startTime, endTime, increment);

  return steps.map(timestamp => {
    const timestampInMilliseconds = timestamp * 1000;
    return {
      timestamp: formatDate(timestampInMilliseconds, increment),
      amount: Number(getBalance(streams, new Date(timestampInMilliseconds))),
    };
  });
}

export function getBarChartStreamData(
  streams: Stream[],
  startTime: Date | null,
  endTime: Date | null,
  increment: Increment,
) {
  const steps = getSteps(startTime, endTime, increment);

  return steps.map(timestamp => {
    const timestampInMilliseconds = timestamp * 1000;
    const result: { [key: string]: any } = {
      timestamp: formatDate(timestampInMilliseconds, increment),
    };

    streams.forEach(stream => {
      result[stream.alias.toUpperCase()] = Number(getBalance([stream], new Date(timestampInMilliseconds)));
    });

    return result;
  });
}

export function getColorVariation(baseColor: string, index: number, total: number): string {
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  const factor = (index + 1) / total;
  const newR = Math.min(255, Math.floor(r + (255 - r) * factor * 0.3));
  const newG = Math.min(255, Math.floor(g + (255 - g) * factor * 0.3));
  const newB = Math.min(255, Math.floor(b + (255 - b) * factor * 0.3));

  return `rgb(${newR}, ${newG}, ${newB})`;
}
