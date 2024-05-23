import { DIVISOR_1_E_18 } from '@/constants/miscellaneous/misc';
import { Segment } from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import BigNumber from 'bignumber.js';

function getCurrentSegmentAmount(segment: Segment, timestamp: number): BigNumber {
  const elapsedTime = timestamp - Number(segment.startTime);
  const segmentDuration = Number(segment.endTime) - Number(segment.startTime);

  const x = elapsedTime / segmentDuration;

  return BigNumber(x)
    .exponentiatedBy(BigNumber(segment.exponent.toString()).dividedBy(DIVISOR_1_E_18))
    .times(BigNumber(segment.amount));
}

export default function getBalance(streams: StreamInfo[]): string {
  let entitledAmount = new BigNumber(0);

  streams.forEach(stream => {
    const remainingAmount = BigNumber(stream.depositAmount).minus(BigNumber(stream.withdrawnAmount));

    if (remainingAmount.isEqualTo(BigNumber(0))) {
      return;
    }

    let exitSegmentIndex = -1;
    let elapsedAmount = new BigNumber(0);
    const timestamp = Math.floor(new Date().getTime() / 1000);

    for (let i = 0; i < stream.segments.length; i++) {
      if (timestamp > Number(stream.segments[i].milestone)) {
        elapsedAmount = elapsedAmount.plus(BigNumber(stream.segments[i].endAmount));
      } else {
        exitSegmentIndex = i;
        break;
      }
    }

    if (exitSegmentIndex === -1) {
      entitledAmount = entitledAmount.plus(remainingAmount);
      return;
    }

    entitledAmount = entitledAmount
      .plus(elapsedAmount)
      .plus(getCurrentSegmentAmount(stream.segments[exitSegmentIndex], timestamp))
      .minus(BigNumber(stream.withdrawnAmount));
  });

  return entitledAmount.dividedBy(DIVISOR_1_E_18).toFixed(8).toString();
}
