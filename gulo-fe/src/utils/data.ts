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

export function getPieChartStreamData(streams: Stream[], startTime: Date | null) {
  const results: { alias: string; amount: number }[] = [];
  const timestampInMilliseconds = startTime !== null ? startTime.getTime() : 0;

  streams.forEach(stream => {
    results.push({
      alias: stream.alias,
      amount: Number(getBalance([stream], new Date(timestampInMilliseconds))),
    });
  });

  return results;
}

function interpolateColor(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
  factor: number,
): { r: number; g: number; b: number } {
  const r = Math.round(color1.r + factor * (color2.r - color1.r));
  const g = Math.round(color1.g + factor * (color2.g - color1.g));
  const b = Math.round(color1.b + factor * (color2.b - color1.b));
  return { r, g, b };
}

export function getColorVariation(palette: {
  start: { r: number; g: number; b: number };
  end: { r: number; g: number; b: number };
}): string {
  const { r, g, b } = interpolateColor(palette.start, palette.end, getRandomNumber());
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function getRandomNumber() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
}

export function getRandomIndex(length: number) {
  return Math.floor(getRandomNumber() * length);
}
