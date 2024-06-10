import { Address } from 'viem';

interface Asset {
  id: string;
  address: string;
  chainId: string;
  decimals: bigint;
  name: string;
  symbol: string;
}

interface Batch {
  id: string;
  label: string;
  size: bigint;
}

interface Contract {
  id: string;
  address: Address;
  category: string;
  version: string;
}

export interface Segment {
  id: string;
  position: bigint;
  amount: string;
  exponent: bigint;
  milestone: string;
  endTime: string;
  startTime: string;
  startAmount: string;
  endAmount: string;
}

interface Stream {
  id: string;
  tokenId: bigint;
  subgraphId: string;
  chainId: bigint;
  alias: string;
  category: string;
  sender: string;
  recipient: string;
  depositAmount: string;
  intactAmount: string;
  startTime: string;
  endTime: string;
  cliffTime: string;
  cliffAmount: string;
  cancelable: boolean;
  canceled: boolean;
  canceledTime: string;
  withdrawnAmount: string;
  segments: Segment[];
  asset: Asset;
  batch: Batch;
  contract: Contract;
}

export default Stream;
