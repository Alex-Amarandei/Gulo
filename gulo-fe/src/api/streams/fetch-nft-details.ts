import { TOKEN_URI_ABI } from '@/constants/abis/sablier';
import Stream from '@/interfaces/stream';
import { formatNftDetails } from '@/utils/converters/format';
import WAGMI_CONFIG from '@/utils/wagmi/config';
import { readContract } from '@wagmi/core';

export default async function fetchNftDetails(stream: Stream) {
  const result = await readContract(WAGMI_CONFIG, {
    abi: TOKEN_URI_ABI,
    address: stream.contract.address,
    functionName: 'tokenURI',
    args: [stream.tokenId],
  });

  return formatNftDetails(result ?? '');
}
