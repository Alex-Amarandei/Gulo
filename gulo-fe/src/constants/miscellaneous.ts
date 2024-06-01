// {"image":""}
import { Increment } from '@/constants/enums';
import BigNumber from 'bignumber.js';

export const DIVISOR_1_E_18 = new BigNumber(1e18);
export const MOCK_JSON_WITH_IMAGE_FIELD_BASE64 = 'eyJpbWFnZSI6ICIifQ=='; // {"image":""}

export const INCREMENT_LIMITS: Record<Increment, number> = {
  [Increment.Second]: 2 * 60, // 2 minutes in seconds
  [Increment.Minute]: 2 * 60 * 60, // 2 hours in seconds
  [Increment.Hour]: 5 * 24 * 60 * 60, // 5 days in seconds
  [Increment.Day]: 4 * 30 * 24 * 60 * 60, // 4 months in seconds
  [Increment.Week]: 2 * 365 * 24 * 60 * 60, // 2 years in seconds
  [Increment.Month]: 10 * 365 * 24 * 60 * 60, // 2 years in seconds
};
