import { Segment } from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import WAGMI_CONFIG from '@/utils/configs';
import { isCircular, isOutgoing } from '@/utils/filters';
import { rebase } from '@/utils/formats';
import { getAccount } from '@wagmi/core';
import BigNumber from 'bignumber.js';

function getCurrentSegmentAmount(segment: Segment, timestamp_now: number): BigNumber {
  const elapsedTime = timestamp_now - Number(segment.startTime);
  const segmentDuration = Number(segment.endTime) - Number(segment.startTime);

  const x = elapsedTime / segmentDuration;

  return BigNumber(x)
    .exponentiatedBy(rebase(BigNumber(segment.exponent.toString())))
    .times(rebase(BigNumber(segment.amount)));
}

function calculateElapsedAmount(
  stream: StreamInfo,
  timestamp: number,
): { elapsedAmountRebased: BigNumber; exitSegmentIndex: number } {
  let elapsedAmount = new BigNumber(0);
  let exitSegmentIndex = -1;

  if (stream.segments.length === 0 || timestamp < Number(stream.segments[0].startTime)) {
    return { elapsedAmountRebased: new BigNumber(0), exitSegmentIndex };
  }

  for (let i = 0; i < stream.segments.length; i++) {
    if (timestamp > Number(stream.segments[i].milestone)) {
      elapsedAmount = elapsedAmount.plus(BigNumber(stream.segments[i].endAmount));
    } else {
      exitSegmentIndex = i;
      break;
    }
  }

  if (exitSegmentIndex === -1) {
    exitSegmentIndex = stream.segments.length;
  }

  const elapsedAmountRebased = rebase(elapsedAmount);

  return { elapsedAmountRebased, exitSegmentIndex };
}

export default function getBalance(streams: StreamInfo[], date: Date | null): string {
  let entitledAmount = new BigNumber(0);
  const address = getAccount(WAGMI_CONFIG).address;
  const timestamp_now = Math.floor(new Date().getTime() / 1000);
  console.log('NOW: ', timestamp_now);
  const selected_timestamp = date ? Math.floor(date.getTime() / 1000) : timestamp_now;
  console.log('Date: ', selected_timestamp);

  streams.forEach(stream => {
    const remainingAmountRebased = rebase(BigNumber(stream.depositAmount).minus(BigNumber(stream.withdrawnAmount)));
    if (remainingAmountRebased.isEqualTo(0) || (isOutgoing(stream, address) && !stream.cancelable)) {
      return;
    }

    if (isCircular(stream) && stream.cancelable) {
      entitledAmount = entitledAmount.plus(remainingAmountRebased);
      return;
    }

    const { elapsedAmountRebased, exitSegmentIndex } = calculateElapsedAmount(stream, selected_timestamp);

    if (exitSegmentIndex === -1) {
      return;
    }

    if (exitSegmentIndex === stream.segments.length) {
      entitledAmount = entitledAmount.plus(remainingAmountRebased);
      return;
    }

    if (isOutgoing(stream, address) && stream.cancelable) {
      entitledAmount = entitledAmount.plus(rebase(BigNumber(stream.depositAmount)).minus(elapsedAmountRebased));
      return;
    }

    const currentSegmentAmountRebased = getCurrentSegmentAmount(stream.segments[exitSegmentIndex], selected_timestamp);

    entitledAmount = entitledAmount.plus(elapsedAmountRebased).plus(currentSegmentAmountRebased);

    if (selected_timestamp >= timestamp_now) {
      // we do not subtract the withdrawn amount if the selected timestamp is in the past
      entitledAmount = entitledAmount.minus(rebase(BigNumber(stream.withdrawnAmount)));
    }
  });

  return entitledAmount.toFixed(4).toString();
}
