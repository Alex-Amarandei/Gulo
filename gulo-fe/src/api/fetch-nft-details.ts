import { tokenUriAbi } from '@/constants/abi/sablier';
import Stream from '@/interfaces/stream';
import { formatNftDetails } from '@/utils/convert/format';
import config from '@/utils/wagmi/config';
import { readContract } from '@wagmi/core';

export default async function fetchNftDetails(stream: Stream) {
  const result = await readContract(config, {
    abi: tokenUriAbi,
    address: stream.contract.address,
    functionName: 'tokenURI',
    args: [stream.tokenId]
  });

  return formatNftDetails(result ?? '');
}
