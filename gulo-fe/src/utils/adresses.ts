import { Address } from 'viem';

export default function areAddressesEqual(
  address1: Address | string | undefined,
  address2: Address | string | undefined,
): boolean {
  if (!address1 || !address2) return false;

  return address1.toLowerCase() === address2.toLowerCase();
}
