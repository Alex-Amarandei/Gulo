import { DIVISOR_1_E_18, MOCK_JSON_WITH_IMAGE_FIELD_BASE64 } from '@/constants/miscellaneous';
import Stream from '@/interfaces/stream';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';

export function formatDecimals(number: string, fixed = 0): string {
  const formattedNumber = BigNumber(number).dividedBy(DIVISOR_1_E_18);
  if (fixed > 0) {
    return formattedNumber.toFixed(fixed).toString();
  }
  return formattedNumber.toString();
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
