import { getCacheFromS3, saveCacheToS3 } from '@/api/cache/cache-streams';
import { fetchAllStreams } from '@/api/streams/fetch-all-streams';
import { GraphStream } from '@/interfaces/stream';
import WAGMI_CONFIG, { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import { getChainId } from '@wagmi/core';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getAllStreams = async (updateCount: (count: number) => void): Promise<GraphStream[]> => {
  await delay(1000);

  const chainId = getChainId(WAGMI_CONFIG);

  const endpoint = SABLIER_SUBGRAPH_ENDPOINTS[chainId];

  const cacheKey = `streams/${chainId}/streams.json`;
  const cachedData = await getCacheFromS3(cacheKey);
  let allStreams: GraphStream[] = [];
  let skip = 0;

  if (cachedData?.count) {
    allStreams = cachedData.streams || [];
    skip = cachedData.count;
    updateCount(allStreams.length);
  }

  let hasMore = true;
  while (hasMore) {
    const streams = await fetchAllStreams(endpoint, skip);
    if (streams.length === 0) {
      hasMore = false;
    } else {
      allStreams = [...allStreams, ...streams];
      skip += streams.length;
      updateCount(allStreams.length);
    }
  }

  const newCount = allStreams.length;
  if (newCount > (cachedData?.count || 0)) {
    await saveCacheToS3(cacheKey, { count: newCount, streams: allStreams });
  }

  return allStreams;
};

export default getAllStreams;
