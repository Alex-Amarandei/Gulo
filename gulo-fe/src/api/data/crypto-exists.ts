import { getCacheFromS3, saveCacheToS3 } from '@/api/aws/s3/s3-cache';
import { format } from 'date-fns';
import dotenv from 'dotenv';
import { toast } from 'sonner';

dotenv.config();

const CACHE_KEY = 'crypto-cache.json';
let cache: Record<string, boolean> = {};

(async () => {
  cache = await getCacheFromS3(CACHE_KEY);
})();

export async function getPriceForTicker(symbol: string): Promise<{ exists: boolean; price: number | null }> {
  const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
  const adjustedSymbol = symbol === 'WETH' ? 'ETH' : symbol;
  const today = format(new Date(), 'yyyy-MM-dd');

  if (cache[adjustedSymbol] !== undefined) {
    toast.success(`Token found in cache: ${adjustedSymbol} exists: ${cache[adjustedSymbol]}`);
    return { exists: cache[adjustedSymbol], price: null };
  }

  const ticker = `X:${adjustedSymbol}USD`;
  console.log('Fetching price for ticker:', ticker);

  try {
    const response = await fetch(
      `https://api.polygon.io/v1/open-close/crypto/${adjustedSymbol}/USD/${today}?adjusted=true&apiKey=${POLYGON_API_KEY}`,
    );
    const data = await response.json();

    const exists =
      data.status === 'OK' &&
      data &&
      data.openTrades &&
      data.openTrades.length > 0 &&
      data.closingTrades &&
      data.closingTrades.length > 0;
    const price = exists ? Number(data.close) : null;

    cache[adjustedSymbol] = exists;
    await saveCacheToS3(CACHE_KEY, cache); // Save updated cache to S3

    console.log(cache);
    return { exists, price };
  } catch (error) {
    console.error(`Error fetching price for ticker ${ticker}:`, error);
    cache[adjustedSymbol] = false;
    await saveCacheToS3(CACHE_KEY, cache); // Save updated cache to S3

    return { exists: false, price: null };
  }
}
