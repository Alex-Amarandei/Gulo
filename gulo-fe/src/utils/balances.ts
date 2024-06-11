import { Segment, Stream } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { Maybe } from '@/utils/data';
import { hasCliff, hasNotStarted, isCanceled, isCircular, isIncoming, isLinear } from '@/utils/filters';
import { getAccount } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { DateRange } from 'react-day-picker';

function getElapsedTimePercentage(s: Segment | Stream, startTime: string, timestamp: number): number {
  const elapsedTime = timestamp - Number(startTime);
  const duration = Number(s.endTime) - Number(startTime);

  return Math.min(elapsedTime / duration, 1);
}

function getCurrentSegmentAmount(segment: Segment, timestamp: number): BigNumber {
  return BigNumber(getElapsedTimePercentage(segment, segment.startTime, timestamp))
    .exponentiatedBy(Number(segment.exponent))
    .times(segment.amount);
}

function getCurrentLinearAmount(stream: Stream, timestamp: number): BigNumber {
  let startTime = stream.startTime;
  let cliffAmount = BigNumber(0);

  if (hasCliff(stream)) {
    if (timestamp < Number(stream.cliffTime)) {
      return new BigNumber(0);
    }

    startTime = stream.cliffTime;
    cliffAmount = stream.cliffAmount;
  }

  return BigNumber(getElapsedTimePercentage(stream, startTime, timestamp))
    .times(stream.intactAmount.minus(cliffAmount))
    .plus(cliffAmount);
}

function getCurrentDynamicAmount(
  stream: Stream,
  timestamp: number,
): { elapsedAmount: BigNumber; exitSegmentIndex: number } {
  let elapsedAmount = new BigNumber(0);
  let exitSegmentIndex = -1;

  for (let i = 0; i < stream.segments.length; i++) {
    if (timestamp > Number(stream.segments[i].milestone)) {
      continue;
    } else {
      exitSegmentIndex = i;
      break;
    }
  }

  if (exitSegmentIndex > 0) {
    elapsedAmount = stream.segments[exitSegmentIndex - 1].endAmount;
  }

  if (exitSegmentIndex === -1) {
    elapsedAmount = stream.intactAmount;
  }

  return { elapsedAmount: elapsedAmount, exitSegmentIndex };
}

function calculateElapsedAmount(
  stream: Stream,
  timestamp: number,
): { elapsedAmount: BigNumber; exitSegmentIndex: number | null } {
  if (isLinear(stream)) {
    return { elapsedAmount: getCurrentLinearAmount(stream, timestamp), exitSegmentIndex: null };
  }

  return getCurrentDynamicAmount(stream, timestamp);
}

function getStreamedAmount(stream: Stream, timestamp: number): BigNumber {
  let entitledAmount = new BigNumber(0);
  const intactAmount = stream.intactAmount;
  const { elapsedAmount, exitSegmentIndex } = calculateElapsedAmount(stream, timestamp);

  if (exitSegmentIndex === -1) {
    entitledAmount = entitledAmount.plus(intactAmount);
    return entitledAmount;
  }

  entitledAmount = entitledAmount.plus(elapsedAmount);

  if (exitSegmentIndex === null) {
    return entitledAmount;
  }

  const currentSegmentAmount = getCurrentSegmentAmount(stream.segments[exitSegmentIndex], timestamp);

  entitledAmount = entitledAmount.plus(currentSegmentAmount);

  return entitledAmount;
}

function getIncomingStreamBalance(stream: Stream, timestamp: number, timestampNow: number): BigNumber {
  let entitledAmount = new BigNumber(0);

  const selectedTimestamp = isCanceled(stream) ? Math.min(timestamp, Number(stream.canceledTime)) : timestamp;

  if (timestamp >= timestampNow) {
    entitledAmount = entitledAmount.minus(stream.withdrawnAmount);
  }

  entitledAmount = entitledAmount.plus(getStreamedAmount(stream, selectedTimestamp));

  return entitledAmount;
}

function getOutgoingStreamBalance(stream: Stream, timestamp: number): BigNumber {
  let entitledAmount = new BigNumber(0);

  if ((!isCanceled(stream) && !stream.cancelable) || (isCanceled(stream) && Number(stream.canceledTime) <= timestamp)) {
    entitledAmount = entitledAmount.minus(stream.intactAmount);
    return entitledAmount;
  }

  entitledAmount = entitledAmount.minus(getStreamedAmount(stream, timestamp));

  return entitledAmount;
}

export default function getBalance(streams: Stream[], date: Maybe<Date>): string {
  let entitledAmount = new BigNumber(0);
  const address = getAccount(WAGMI_CONFIG).address;
  const timestampNow = Math.floor(new Date().getTime() / 1000);
  const timestamp = date ? Math.floor(date.getTime() / 1000) : timestampNow;

  streams.forEach(stream => {
    if (!['DAI', 'USDC', 'USDT'].includes(stream.asset.symbol)) {
      return;
    }

    if (hasNotStarted(stream, timestamp) || isCircular(stream)) {
      return;
    }

    const balance = isIncoming(stream, address)
      ? getIncomingStreamBalance(stream, timestamp, timestampNow)
      : getOutgoingStreamBalance(stream, timestamp);

    entitledAmount = entitledAmount.plus(balance);
  });

  return entitledAmount.toFixed(4).toString();
}

export function getStreamedAmountForDateRange(stream: Stream, dateRange: Maybe<DateRange>) {
  const startStreamedAmount = Number(getBalance([stream], dateRange?.from));
  const endStreamedAmount = Number(getBalance([stream], dateRange?.to));

  return endStreamedAmount - startStreamedAmount;
}

export function getRemainingAmount(stream: Stream): string {
  const address = getAccount(WAGMI_CONFIG).address;

  if (isIncoming(stream, address)) {
    return stream.intactAmount.minus(stream.withdrawnAmount).toFixed(4).toString();
  }

  return stream.intactAmount.times(-1).toFixed(4).toString();
}
