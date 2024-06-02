// {"image":""}
import { Increment } from '@/constants/enums';
import BigNumber from 'bignumber.js';

export const RADIAN = Math.PI / 180;
export const SABLIER_ORANGE = '#f77725';
export const DIVISOR_1_E_18 = new BigNumber(1e18);
export const MOCK_JSON_WITH_IMAGE_FIELD_BASE64 = 'eyJpbWFnZSI6ICIifQ=='; // {"image":""}

export const INCREMENT_LIMITS: Record<Increment, number> = {
  [Increment.Second]: 120, // 2 minutes in seconds
  [Increment.Minute]: 7_200, // 2 hours in seconds
  [Increment.Hour]: 432_000, // 5 days in seconds
  [Increment.Day]: 10_368_000, // 4 months in seconds
  [Increment.Week]: 63_072_000, // 2 years in seconds
  [Increment.Month]: 315_360_000, // 2 years in seconds
};

export const INCREMENT_VALUE: Record<Increment, number> = {
  [Increment.Second]: 1,
  [Increment.Minute]: 60,
  [Increment.Hour]: 3_600,
  [Increment.Day]: 86_400,
  [Increment.Week]: 604_800,
  [Increment.Month]: 2_592_000,
};
