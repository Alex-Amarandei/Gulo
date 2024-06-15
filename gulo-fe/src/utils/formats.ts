import { DIVISOR_1_E_18, MOCK_JSON_WITH_IMAGE_FIELD_BASE64 } from '@/constants/miscellaneous';
import { Stream, StreamData } from '@/interfaces/stream';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { Address } from 'viem';

import { Maybe } from './data';

export function formatDecimals(number: BigNumber, fixed = 0): string {
  if (fixed > 0) {
    return number.toFixed(fixed).toString();
  }
  return number.toString();
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function formatNftDetails(data: string): string {
  const infoBase64 = data.replace('data:application/json;base64,', '') ?? MOCK_JSON_WITH_IMAGE_FIELD_BASE64;
  const infoBase64Decoded = JSON.parse(Buffer.from(infoBase64, 'base64').toString('utf-8'));
  const nftDetailsBase64 = infoBase64Decoded['image'];

  return nftDetailsBase64;
}

export function rebase(x: BigNumber): BigNumber {
  return x.dividedBy(DIVISOR_1_E_18);
}

export function rebaseStream(stream: StreamData): Stream {
  return {
    ...stream,
    segments: stream.segments.map(segment => {
      return {
        ...segment,
        amount: rebase(BigNumber(segment.amount)),
        endAmount: rebase(BigNumber(segment.endAmount)),
        startAmount: rebase(BigNumber(segment.startAmount)),
        exponent: BigInt(rebase(BigNumber(Number(segment.exponent))).toString()),
      };
    }),
    cliffAmount: rebase(BigNumber(stream.cliffAmount)),
    depositAmount: rebase(BigNumber(stream.depositAmount)),
    intactAmount: rebase(BigNumber(stream.intactAmount)),
    withdrawnAmount: rebase(BigNumber(stream.withdrawnAmount)),
    color: '',
    isSelected: true,
  };
}

export function formatValueForLabel(value: string | number): number {
  return value.toString().endsWith('%') ? parseFloat(value.toString().slice(0, -1)) : parseFloat(value.toString());
}

export function getShorthandTick(tickValue: number) {
  if (Math.abs(tickValue) >= 1_000_000_000) {
    return (tickValue / 1_000_000_000).toFixed(2).toString() + 'B';
  } else if (Math.abs(tickValue) >= 1_000_000) {
    return (tickValue / 1_000_000).toFixed(2).toString() + 'M';
  } else if (Math.abs(tickValue) >= 1_000) {
    return (tickValue / 1_000).toFixed(2).toString() + 'K';
  } else {
    return Number(tickValue).toFixed(2).toString();
  }
}

export function getCancelability(stream: Stream, short = true): string {
  const dateFormat = short ? 'LLL dd, y' : 'LLL dd, y HH:mm:ss';
  return stream.canceled
    ? `Canceled on ${format(new Date(Number(stream.canceledTime + '000')), dateFormat)}`
    : stream.cancelable
      ? 'Cancelable'
      : 'Non-Cancelable';
}

export function formatUsdAmount(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function uppercaseAlias(streams: StreamData[]): StreamData[] {
  return streams.map(stream => {
    return {
      ...stream,
      alias: stream.alias.toUpperCase(),
    };
  });
}

export function getFileName(address: Maybe<Address>, downloadType: string): string {
  const fileName = address ?? 'response';
  const extension = downloadType.toLowerCase();
  return `${fileName}.${extension}`;
}

export function getCacheKey(chainId: number, key: string): string {
  return `streams/${chainId}/${key}.json`;
}

export function getSablierSearchByChainIdAndAddress(chainId: number, address: string): string {
  return `https://app.sablier.com/?t=search&c=${chainId}&s=${address}&r=${address}`;
}
