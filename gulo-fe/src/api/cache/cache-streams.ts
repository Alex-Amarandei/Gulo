import { getCacheFromS3, saveCacheToS3 } from '@/api/cache/s3-cache';
import { fetchAllStreams } from '@/api/streams/fetch-all-streams';
import { delay } from '@/api/utils/delay';
import { CachedStreamData } from '@/interfaces/graph';
import { GraphStream } from '@/interfaces/stream';
import WAGMI_CONFIG, { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import { getCacheKey } from '@/utils/formats';
import { getChainId } from '@wagmi/core';

export const getCachedStreams = async (): Promise<{ streams: GraphStream[]; hasNewStreams: boolean }> => {
  await delay(1000);

  const chainId = getChainId(WAGMI_CONFIG);
  const endpoint = SABLIER_SUBGRAPH_ENDPOINTS[chainId];
  const cacheKey = getCacheKey(chainId, 'streams');
  const cachedData = (await getCacheFromS3(cacheKey)) as CachedStreamData;

  let allStreams: GraphStream[] = cachedData ? cachedData.streams : [];
  let skip = cachedData ? cachedData.count : 0;

  let hasMore = true;
  let hasNewStreams = false;

  while (hasMore) {
    const currentSkip = Math.min(skip, 5000);
    const streams = await fetchAllStreams(endpoint, currentSkip);

    if (streams.length === 0) {
      hasMore = false;
    } else {
      if (currentSkip === 5000) {
        const difference = 5000 + streams.length - cachedData.streams.length;

        if (difference > 0) {
          allStreams = [...allStreams, ...streams.slice(streams.length - difference, streams.length)];
        }
        break;
      } else {
        allStreams = [...allStreams, ...streams];
        skip += streams.length;
      }
      hasNewStreams = true;
    }
  }

  if (hasNewStreams) {
    await saveCacheToS3(cacheKey, { count: allStreams.length, streams: allStreams });
  }

  return { streams: allStreams, hasNewStreams };
};
