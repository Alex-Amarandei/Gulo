import BigNumber from "bignumber.js";

const divisor = new BigNumber(1e18);

export function formatDecimals(number: string): string {
	return BigNumber(number).dividedBy(divisor).toString();
}

export function formatAddress(address: string): string {
	return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
