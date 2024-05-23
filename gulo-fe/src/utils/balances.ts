import { Segment } from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import WAGMI_CONFIG from '@/utils/configs';
import { rebase } from '@/utils/formats';
import { getAccount } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { Address } from 'viem';

function getCurrentSegmentAmount(segment: Segment, timestamp: number): BigNumber {
  const elapsedTime = timestamp - Number(segment.startTime);
  const segmentDuration = Number(segment.endTime) - Number(segment.startTime);

  const x = elapsedTime / segmentDuration;

  return BigNumber(x)
    .exponentiatedBy(rebase(BigNumber(segment.exponent.toString())))
    .times(rebase(BigNumber(segment.amount)));
}

export function isCircular(stream: StreamInfo): boolean {
  return stream.sender === stream.recipient;
}

function isOutgoing(stream: StreamInfo, address: Address | undefined): boolean {
  return stream.sender === address && !isCircular(stream);
}

function calculateElapsedAmount(
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

  const elapsedAmountRebased = rebase(elapsedAmount);

  return { elapsedAmountRebased, exitSegmentIndex };
}

export default function getBalance(streams: StreamInfo[]): string {
  let entitledAmount = new BigNumber(0);
  const address = getAccount(WAGMI_CONFIG).address;
  const timestamp = Math.floor(new Date().getTime() / 1000);

  streams.forEach(stream => {
    const remainingAmountRebased = rebase(BigNumber(stream.depositAmount).minus(BigNumber(stream.withdrawnAmount)));
    if (remainingAmountRebased.isEqualTo(0) || (isOutgoing(stream, address) && !stream.cancelable)) {
      return;
    }

    if (isCircular(stream) && stream.cancelable) {
      entitledAmount = entitledAmount.plus(remainingAmountRebased);
      return;
    }

    const { elapsedAmountRebased, exitSegmentIndex } = calculateElapsedAmount(stream, timestamp);

    if (exitSegmentIndex === -1) {
      entitledAmount = entitledAmount.plus(remainingAmountRebased);
      return;
    }

    if (isOutgoing(stream, address) && stream.cancelable) {
      entitledAmount = entitledAmount.plus(rebase(BigNumber(stream.depositAmount)).minus(elapsedAmountRebased));
      return;
    }

    const currentSegmentAmountRebased = getCurrentSegmentAmount(stream.segments[exitSegmentIndex], timestamp);

    entitledAmount = entitledAmount
      .plus(elapsedAmountRebased)
      .plus(currentSegmentAmountRebased)
      .minus(rebase(BigNumber(stream.withdrawnAmount)));
  });

  return entitledAmount.toFixed(4).toString();
}
