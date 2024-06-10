// {"image":""}
import { Increment } from '@/constants/enums';
import BigNumber from 'bignumber.js';

export const RADIAN = Math.PI / 180;
export const SABLIER_ORANGE = '#f77725';
export const DIVISOR_1_E_18 = new BigNumber(1e18);
export const MOCK_JSON_WITH_IMAGE_FIELD_BASE64 = 'eyJpbWFnZSI6ICIifQ=='; // {"image":""}

export const INCREMENT_LIMITS: Record<Increment, number> = {
  [Increment.Second]: 60, // 1 minute in seconds
  [Increment.Minute]: 3_600, // 1 hour in seconds
  [Increment.Hour]: 216_000, // 2.5 days in seconds
  [Increment.Day]: 5_184_000, // 2 months in seconds
  [Increment.Week]: 31_536_000, // 1 year in seconds
  [Increment.Month]: 157_680_000, // 5 years in seconds
};

export const INCREMENT_VALUE: Record<Increment, number> = {
  [Increment.Second]: 1,
  [Increment.Minute]: 60,
  [Increment.Hour]: 3_600,
  [Increment.Day]: 86_400,
  [Increment.Week]: 604_800,
  [Increment.Month]: 2_592_000,
};

export const COLOR_PALETTES = [
  { start: { r: 15, g: 135, b: 210 }, end: { r: 250, g: 191, b: 82 } },
  { start: { r: 11, g: 98, b: 153 }, end: { r: 247, g: 119, b: 37 } },
  { start: { r: 241, g: 245, b: 249 }, end: { r: 247, g: 119, b: 37 } },
];

export const NO_POSITIVE_BALANCE_STREAMS = 'No Positive Balance Streams';
export const NO_NEGATIVE_BALANCE_STREAMS = 'No Negative Balance Streams';
export const NO_APPLICABLE_STREAMS = [NO_POSITIVE_BALANCE_STREAMS, NO_NEGATIVE_BALANCE_STREAMS];
