import { TOKEN_URI_ABI } from '@/constants/sablier';
import { StreamData } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { formatNftDetails } from '@/utils/formats';
import { readContract } from '@wagmi/core';

export default async function fetchNftDetails(stream: StreamData) {
  const result = await readContract(WAGMI_CONFIG, {
    abi: TOKEN_URI_ABI,
    address: stream.contract.address,
    functionName: 'tokenURI',
    args: [stream.tokenId],
  });

  return formatNftDetails(result ?? '');
}
