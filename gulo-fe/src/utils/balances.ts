import { Segment } from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
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

function getElapsedTimePercentage(s: Segment | StreamInfo, startTime: string, timestamp: number): number {
  const elapsedTime = timestamp - Number(startTime);
  const duration = Number(s.endTime) - Number(startTime);

  return elapsedTime / duration;
}

function getCurrentSegmentAmountRebased(segment: Segment, timestamp: number): BigNumber {
  return BigNumber(getElapsedTimePercentage(segment, segment.startTime, timestamp))
    .exponentiatedBy(rebase(BigNumber(segment.exponent.toString())))
    .times(rebase(BigNumber(segment.amount)));
}

function getCurrentLinearAmountRebased(stream: StreamInfo, timestamp: number): BigNumber {
  if (timestamp < Number(stream.startTime)) {
    return new BigNumber(0);
  }

  let startTime = stream.startTime;
  let amount = stream.depositAmount;

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
  stream: StreamInfo,
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
  stream: StreamInfo,
  timestamp: number,
): { elapsedAmountRebased: BigNumber; exitSegmentIndex: number | null } {
  if (isLinear(stream)) {
    return { elapsedAmountRebased: getCurrentLinearAmountRebased(stream, timestamp), exitSegmentIndex: null };
  }

  return getCurrentDynamicAmountRebased(stream, timestamp);
}

export default function getBalance(streams: StreamInfo[], date: Date | null): string {
  let entitledAmountRebased = new BigNumber(0);
  const address = getAccount(WAGMI_CONFIG).address;
  const timestampNow = Math.floor(new Date().getTime() / 1000);
  const selectedTimestamp = date ? Math.floor(date.getTime() / 1000) : timestampNow;

  streams.forEach(stream => {
    if (hasNotStarted(stream, selectedTimestamp)) {
      return;
    }

    const depositAmountRebased = rebase(BigNumber(stream.depositAmount));
    const withdrawnAmountRebased = rebase(BigNumber(stream.withdrawnAmount));
    const remainingAmountRebased = depositAmountRebased.minus(withdrawnAmountRebased);

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
      entitledAmountRebased = entitledAmountRebased.plus(depositAmountRebased).minus(elapsedAmountRebased);
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
