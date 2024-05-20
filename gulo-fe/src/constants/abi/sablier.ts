const tokenUriAbi = [
	{
		type: "function",
		name: "tokenURI",
		inputs: [{ name: "streamId", type: "uint256", internalType: "uint256" }],
		outputs: [{ name: "uri", type: "string", internalType: "string" }],
		stateMutability: "view",
	},
] as const;

export default tokenUriAbi;
