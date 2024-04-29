interface Asset {
	id: string;
	address: string;
	chainId: string;
	decimals: number;
	name: string;
	symbol: string;
}

interface Batch {
	id: string;
	label: string;
	size: number;
}

interface Contract {
	id: string;
	address: string;
	category: string;
	version: string;
}

interface Segment {
	id: string;
	position: number;
	amount: string;
	exponent: number;
	milestone: string;
	endTime: string;
	startTime: string;
	startAmount: string;
	endAmount: string;
}

interface Stream {
	id: string;
	tokenId: string;
	subgraphId: string;
	chainId: string;
	alias: string;
	category: string;
	funder: string;
	sender: string;
	recipient: string;
	hash: string;
	timestamp: string;
	depositAmount: string;
	startTime: string;
	endTime: string;
	cliff: string;
	cliffTime: string;
	cliffAmount: string;
	cancelable: boolean;
	renounceTime: string;
	canceled: boolean;
	canceledTime: string;
	withdrawnAmount: string;
	intactAmount: string;
	position: string;
	proxied: boolean;
	proxender: string;
	transferable: boolean;
	version: string;
	asset: Asset;
	batch: Batch;
	contract: Contract;
	segments: Segment[];
}
