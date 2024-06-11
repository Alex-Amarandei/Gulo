import { Maybe } from '@/utils/data';
import { Address } from 'viem';

export default function areAddressesEqual(
  address1: Maybe<Address | string>,
  address2: Maybe<Address | string>,
): boolean {
  if (!address1 || !address2) return false;

  return address1.toLowerCase() === address2.toLowerCase();
}
