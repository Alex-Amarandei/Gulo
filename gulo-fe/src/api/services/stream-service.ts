import { getCacheFromS3, saveCacheToS3 } from '@/api/cache/s3-cache';
import { fetchAllStreams } from '@/api/streams/fetch-all-streams';
import { delay } from '@/api/utils/delay';
import { GraphStream } from '@/interfaces/stream';
import WAGMI_CONFIG, { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import { getCacheKey } from '@/utils/formats';
import { getChainId } from '@wagmi/core';

export const getAllStreams = async (): Promise<GraphStream[]> => {
  await delay(1000);

  const chainId = getChainId(WAGMI_CONFIG);
  const endpoint = SABLIER_SUBGRAPH_ENDPOINTS[chainId];
  const cacheKey = getCacheKey(chainId, 'streams');
  const cachedData = await getCacheFromS3(cacheKey);

  let allStreams: GraphStream[] = [];
  let skip = 0;

  if (cachedData?.count) {
    allStreams = cachedData.streams || [];
    skip = cachedData.count;
  }

  let hasMore = true;
  while (hasMore) {
    const streams = await fetchAllStreams(endpoint, skip);
    if (streams.length === 0) {
      hasMore = false;
    } else {
      allStreams = [...allStreams, ...streams];
      skip += streams.length;
    }
  }

  const newCount = allStreams.length;
  if (newCount > (cachedData?.count || 0)) {
    await saveCacheToS3(cacheKey, { count: newCount, streams: allStreams });
  }

  return allStreams;
};
