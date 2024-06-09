import Stream, { Segment } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import {
  hasCliff,
  hasNotStarted,
  isCircularCancelable,
  isLinear,
  isOutgoingCancelable,
  isOutgoingNonCancelable,
} from '@/utils/filters';
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

export default function getBalance(streams: Stream[], date: Date | undefined): string {
  let entitledAmountRebased = new BigNumber(0);
  const address = getAccount(WAGMI_CONFIG).address;
  const timestampNow = Math.floor(new Date().getTime() / 1000);
  const selectedTimestamp = date ? Math.floor(date.getTime() / 1000) : timestampNow;

  streams.forEach(stream => {
    if (!['DAI', 'USDC', 'USDT'].includes(stream.asset.symbol)) {
      return;
    }

    if (hasNotStarted(stream, selectedTimestamp)) {
      return;
    }

    const intactAmountRebased = rebase(BigNumber(stream.intactAmount));
    const withdrawnAmountRebased = rebase(BigNumber(stream.withdrawnAmount));
    const remainingAmountRebased = intactAmountRebased.minus(withdrawnAmountRebased);

    if (remainingAmountRebased.isEqualTo(0) || isOutgoingNonCancelable(stream, address)) {
      return;
    }

    if (isCircularCancelable(stream)) {
      entitledAmountRebased = entitledAmountRebased.plus(remainingAmountRebased);
      return;
    }

    const { elapsedAmountRebased, exitSegmentIndex } = calculateElapsedAmountRebased(stream, selectedTimestamp);

    if (exitSegmentIndex === -1) {
      entitledAmountRebased = entitledAmountRebased.plus(remainingAmountRebased);
      return;
    }

    if (isOutgoingCancelable(stream, address)) {
      entitledAmountRebased = entitledAmountRebased.plus(intactAmountRebased).minus(elapsedAmountRebased);
      return;
    }

    entitledAmountRebased = entitledAmountRebased.plus(elapsedAmountRebased);

    const amountToSubtract = selectedTimestamp >= timestampNow ? withdrawnAmountRebased : 0;

    if (exitSegmentIndex === null) {
      entitledAmountRebased = entitledAmountRebased.minus(amountToSubtract);
      return;
    }

    const currentSegmentAmountRebased = getCurrentSegmentAmountRebased(
      stream.segments[exitSegmentIndex],
      selectedTimestamp,
    );

    entitledAmountRebased = entitledAmountRebased.plus(currentSegmentAmountRebased).minus(amountToSubtract);
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
