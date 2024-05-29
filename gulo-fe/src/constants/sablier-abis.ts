export const TOKEN_URI_ABI = [
  {
    type: 'function',
    name: 'tokenURI',
    stateMutability: 'view',
    inputs: [{ name: 'streamId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: 'uri', type: 'string', internalType: 'string' }],
  },
] as const;
