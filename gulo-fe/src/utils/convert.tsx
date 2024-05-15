import BigNumber from "bignumber.js";

const divisor = new BigNumber(1e18);

export default function formatDecimals(number: string): string {
	return BigNumber(number).dividedBy(divisor).toString();
}
