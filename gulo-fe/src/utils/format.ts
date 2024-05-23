import { DIVISOR_1_E_18, MOCK_JSON_WITH_IMAGE_FIELD_BASE64 } from '@/constants/miscellaneous/misc';
import BigNumber from 'bignumber.js';

export function formatDecimals(number: string): string {
  return BigNumber(number).dividedBy(DIVISOR_1_E_18).toString();
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
