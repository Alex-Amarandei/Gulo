import { Increment } from '@/constants/enums';
import { INCREMENT_VALUE } from '@/constants/miscellaneous';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
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
    const result: { [key: string]: number | string } = {
      timestamp: formatDate(timestampInMilliseconds, increment),
    };

    streams.forEach(stream => {
      result[stream.alias.toUpperCase()] = Number(getBalance([stream], new Date(timestampInMilliseconds)));
    });

    return result;
  });
}

export function getPieChartStreamData(streams: StreamInfo[], startTime: Date | null) {
  const results: { alias: string; amount: number; nft: string }[] = [];
  const timestampInMilliseconds = startTime !== null ? startTime.getTime() : 0;

  streams.forEach(stream => {
    results.push({
      alias: stream.alias,
      amount: Number(getBalance([stream], new Date(timestampInMilliseconds))),
      nft: stream.nft,
    });
  });

  return results;
}

export function getStopColorFromSVG(base64SVG: string): string {
  const svgContent = atob(base64SVG.split(',')[1]);
  const stopColorMatch = svgContent.match(/stop-color="([^"]+)"/);
  return stopColorMatch ? stopColorMatch[1] : 'rgba(255, 255, 255, 0.5)';
}
