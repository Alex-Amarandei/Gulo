import { Increment } from '@/constants/enums';
import { INCREMENT_VALUE } from '@/constants/miscellaneous';
import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import getBalance from '@/utils/balances';
import { format } from 'date-fns';

function getSteps(startTime: Date | undefined, endTime: Date | undefined, increment: Increment) {
  if (startTime === undefined || endTime === undefined) {
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
      return format(date, 'mm:ss');
    case Increment.Minute:
      return format(date, 'HH:mm');
    case Increment.Hour:
      return format(date, 'EEE HH:mm');
    case Increment.Day:
      return format(date, 'dd MMM');
    case Increment.Week:
      return format(date, 'dd MMM');
    case Increment.Month:
      return format(date, 'MMM yyyy');
    default:
      return date.toISOString();
  }
}

export function getLineChartStreamData(
  streams: Stream[],
  startTime: Date | undefined,
  endTime: Date | undefined,
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
  startTime: Date | undefined,
  endTime: Date | undefined,
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

export function getPieChartStreamData(streams: StreamInfo[], startTime: Date | undefined) {
  const positiveData: { alias: string; amount: number; color: string; isNegative: boolean }[] = [];
  const negativeData: { alias: string; amount: number; color: string; isNegative: boolean }[] = [];
  const timestampInMilliseconds = startTime !== undefined ? startTime.getTime() : 0;

  streams.forEach(stream => {
    const amount = Number(getBalance([stream], new Date(timestampInMilliseconds)));
    const entry = {
      alias: stream.alias,
      amount,
      color: stream.color,
      isNegative: false,
    };

    if (amount > 0) {
      positiveData.push(entry);
    } else if (amount < 0) {
      entry.amount = Math.abs(amount);
      entry.isNegative = true;
      negativeData.push(entry);
    }
  });

  return { positiveData, negativeData };
}

function getStopColorFromSVG(base64SVG: string): string {
  const svgContent = atob(base64SVG.split(',')[1]);
  const stopColorMatch = svgContent.match(/stop-color="([^"]+)"/);
  return stopColorMatch ? stopColorMatch[1] : 'rgba(255, 255, 255, 0.5)';
}

function getHexFromHsl(hsl: string, forceRemoveAlpha = true): string {
  const hslMatch = hsl.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,?\s*([\d.]+)?\)/);

  if (!hslMatch) {
    throw new Error('Invalid HSL format');
  }

  const [_, h, s, l, a] = hslMatch;

  const hValue = parseInt(h, 10);
  const sValue = parseFloat(s) / 100;
  const lValue = parseFloat(l) / 100;

  const c = (1 - Math.abs(2 * lValue - 1)) * sValue;
  const x = c * (1 - Math.abs(((hValue / 60) % 2) - 1));
  const m = lValue - c / 2;

  let [r, g, b] = [0, 0, 0];

  if (0 <= hValue && hValue < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= hValue && hValue < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= hValue && hValue < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= hValue && hValue < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= hValue && hValue < 300) {
    [r, g, b] = [x, 0, c];
  } else if (300 <= hValue && hValue < 360) {
    [r, g, b] = [c, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return (
    '#' +
    [r, g, b, a]
      .filter((value, index) => !forceRemoveAlpha || index !== 3)
      .map(value => value.toString(16))
      .map(string => (string.length === 1 ? '0' + string : string))
      .join('')
  );
}

export function getNftColor(base64SVG: string): string {
  return getHexFromHsl(getStopColorFromSVG(base64SVG));
}

export function nowWithZeroSeconds() {
  const nextMinute = new Date();
  nextMinute.setSeconds(0);
  return nextMinute;
}

export function oneMonthFrom(now: Date) {
  const oneMonthFromNow = new Date(now);
  oneMonthFromNow.setMonth(now.getMonth() + 1);
  return oneMonthFromNow;
}

export function oneMonthBefore(now: Date) {
  const oneMonthBeforeNow = new Date(now);
  oneMonthBeforeNow.setMonth(now.getMonth() - 1);
  return oneMonthBeforeNow;
}
