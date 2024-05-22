import BigNumber from 'bignumber.js';

const divisor = new BigNumber(1e18);
const mockJsonWithImageFieldBase64 = 'eyJpbWFnZSI6ICIifQ=='; // {"image":""}

export function formatDecimals(number: string): string {
  return BigNumber(number).dividedBy(divisor).toString();
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function formatNftDetails(data: string): string {
  const infoBase64 = data.replace('data:application/json;base64,', '') ?? mockJsonWithImageFieldBase64;
  const infoBase64Decoded = JSON.parse(Buffer.from(infoBase64, 'base64').toString('utf-8'));
  const nftDetailsBase64 = infoBase64Decoded['image'];

  return nftDetailsBase64;
}
