import Stream, { Segment } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { hasCliff, hasNotStarted, isCanceled, isCircular, isIncoming, isLinear } from '@/utils/filters';
import { rebase } from '@/utils/formats';
import { getAccount } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { DateRange } from 'react-day-picker';

function getElapsedTimePercentage(s: Segment | Stream, startTime: string, timestamp: number): number {
  const elapsedTime = timestamp - Number(startTime);
  const duration = Number(s.endTime) - Number(startTime);

  return Math.min(elapsedTime / duration, 1);
}

function getCurrentSegmentAmountRebased(segment: Segment, timestamp: number): BigNumber {
  return BigNumber(getElapsedTimePercentage(segment, segment.startTime, timestamp))
    .exponentiatedBy(rebase(BigNumber(segment.exponent.toString())))
    .times(rebase(BigNumber(segment.amount)));
}

function getCurrentLinearAmountRebased(stream: Stream, timestamp: number): BigNumber {
  let startTime = stream.startTime;
  let amount = stream.intactAmount;

  if (hasCliff(stream)) {
    if (timestamp < Number(stream.cliffTime)) {
      return new BigNumber(0);
    }

    startTime = stream.cliffTime;
    amount = stream.cliffAmount;
  }

  return BigNumber(getElapsedTimePercentage(stream, startTime, timestamp)).times(rebase(BigNumber(amount)));
}

function getCurrentDynamicAmountRebased(
  stream: Stream,
  timestamp: number,
): { elapsedAmountRebased: BigNumber; exitSegmentIndex: number } {
  let elapsedAmount = new BigNumber(0);
  let exitSegmentIndex = -1;

  for (let i = 0; i < stream.segments.length; i++) {
    if (timestamp > Number(stream.segments[i].milestone)) {
      elapsedAmount = elapsedAmount.plus(BigNumber(stream.segments[i].endAmount));
    } else {
      exitSegmentIndex = i;
      break;
    }
  }

  return { elapsedAmountRebased: rebase(elapsedAmount), exitSegmentIndex };
}

function calculateElapsedAmountRebased(
  stream: Stream,
  timestamp: number,
): { elapsedAmountRebased: BigNumber; exitSegmentIndex: number | null } {
  if (isLinear(stream)) {
    return { elapsedAmountRebased: getCurrentLinearAmountRebased(stream, timestamp), exitSegmentIndex: null };
  }

  return getCurrentDynamicAmountRebased(stream, timestamp);
}

function getStreamedAmountRebased(stream: Stream, timestamp: number): BigNumber {
  let entitledAmountRebased = new BigNumber(0);
  const intactAmountRebased = rebase(BigNumber(stream.intactAmount));
  const { elapsedAmountRebased, exitSegmentIndex } = calculateElapsedAmountRebased(stream, timestamp);

  if (exitSegmentIndex === -1) {
    entitledAmountRebased = entitledAmountRebased.plus(intactAmountRebased);
    return entitledAmountRebased;
  }

  entitledAmountRebased = entitledAmountRebased.plus(elapsedAmountRebased);

  if (exitSegmentIndex === null) {
    return entitledAmountRebased;
  }

  const currentSegmentAmountRebased = getCurrentSegmentAmountRebased(stream.segments[exitSegmentIndex], timestamp);

  entitledAmountRebased = entitledAmountRebased.plus(currentSegmentAmountRebased);

  return entitledAmountRebased;
}

function getIncomingStreamBalance(stream: Stream, timestamp: number, timestampNow: number): BigNumber {
  let entitledAmountRebased = new BigNumber(0);

  const withdrawnAmountRebased = rebase(BigNumber(stream.withdrawnAmount));
  const selectedTimestamp = isCanceled(stream) ? Math.min(timestamp, Number(stream.canceledTime)) : timestamp;

  if (timestamp >= timestampNow) {
    entitledAmountRebased = entitledAmountRebased.minus(withdrawnAmountRebased);
  }

  entitledAmountRebased = entitledAmountRebased.plus(getStreamedAmountRebased(stream, selectedTimestamp));

  return entitledAmountRebased;
}

function getOutgoingStreamBalance(stream: Stream, timestamp: number): BigNumber {
  let entitledAmountRebased = new BigNumber(0);
  const intactAmountRebased = rebase(BigNumber(stream.intactAmount));

  if ((!isCanceled(stream) && !stream.cancelable) || (isCanceled(stream) && Number(stream.canceledTime) <= timestamp)) {
    entitledAmountRebased = entitledAmountRebased.minus(intactAmountRebased);
    return entitledAmountRebased;
  }

  entitledAmountRebased = entitledAmountRebased.minus(getStreamedAmountRebased(stream, timestamp));

  return entitledAmountRebased;
}

export default function getBalance(streams: Stream[], date: Date | undefined): string {
  let entitledAmountRebased = new BigNumber(0);
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

    entitledAmountRebased = entitledAmountRebased.plus(balance);
  });

  return entitledAmountRebased.toFixed(4).toString();
}

export function getStreamedAmountForDateRange(stream: Stream, dateRange: DateRange | undefined) {
  const startStreamedAmount = Number(getBalance([stream], dateRange?.from));
  const endStreamedAmount = Number(getBalance([stream], dateRange?.to));

  return endStreamedAmount - startStreamedAmount;
}

export function getRemainingAmount(stream: Stream): string {
  const intactAmountRebased = rebase(BigNumber(stream.intactAmount));
  const withdrawnAmountRebased = rebase(BigNumber(stream.withdrawnAmount));

  return intactAmountRebased.minus(withdrawnAmountRebased).toFixed(4).toString();
}
