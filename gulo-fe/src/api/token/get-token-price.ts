import dotenv from 'dotenv';
import { toast } from 'sonner';

dotenv.config();

const API_GATEWAY_ENDPOINT = process.env.API_GATEWAY_ENDPOINT;

export const getTokenPrice = async (tokenTicker: string): Promise<number> => {
  if (['DAI', 'USDC', 'USDT'].includes(tokenTicker)) {
    return 1;
  }

  try {
    const response = await fetch(`${API_GATEWAY_ENDPOINT}/token/price?ticker=${tokenTicker}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch price for ${tokenTicker}: ${response.statusText}`);
    }

    const data: { price: number | string } = await response.json();
    return Number(data.price);
  } catch (error) {
    toast.error(
      "Uh oh! 😞 We couldn't get price data for all of your tokens right now. Please try refreshing the page or check back later. 🔄",
    );
    throw new Error('Failed to fetch token price');
  }
};
