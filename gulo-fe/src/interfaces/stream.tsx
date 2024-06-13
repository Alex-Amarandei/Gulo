import { Dispatch, SetStateAction } from 'react';

import BigNumber from 'bignumber.js';
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

export interface SegmentData {
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

export interface StreamData {
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
  segments: SegmentData[];
  asset: Asset;
  batch: Batch;
  contract: Contract;
}

export interface Segment {
  id: string;
  position: bigint;
  amount: BigNumber;
  exponent: bigint;
  milestone: string;
  endTime: string;
  startTime: string;
  startAmount: BigNumber;
  endAmount: BigNumber;
}

export interface Stream {
  id: string;
  tokenId: bigint;
  subgraphId: string;
  chainId: bigint;
  alias: string;
  category: string;
  sender: string;
  recipient: string;
  depositAmount: BigNumber;
  intactAmount: BigNumber;
  startTime: string;
  endTime: string;
  cliffTime: string;
  cliffAmount: BigNumber;
  cancelable: boolean;
  canceled: boolean;
  canceledTime: string;
  withdrawnAmount: BigNumber;
  segments: Segment[];
  asset: Asset;
  batch: Batch;
  contract: Contract;
  color: string;
  isSelected: boolean;
  assetPrice: number;
}

export interface StreamContextType {
  streams: Stream[];
  setStreams: Dispatch<SetStateAction<Stream[]>>;
  selectedStreams: Stream[];
  setSelectedStreams: Dispatch<SetStateAction<Stream[]>>;
  streamNftMap: Record<string, string>;
  setStreamNftMap: Dispatch<SetStateAction<Record<string, string>>>;
}

export interface StreamActualRow {
  alias: string;
  asset: string;
  streamedAmount: string;
  from: string;
  to: string;
  color?: string;
}

export interface StreamForecastRow {
  alias: string;
  asset: string;
  currentAmount: string;
  forecastAmount: string;
  from: string;
  to: string;
  color?: string;
  sure?: boolean;
}
