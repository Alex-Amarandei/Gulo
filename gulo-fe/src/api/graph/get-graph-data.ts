import { fetchGraphData } from '@/api/graph/fetch-graph-data';
import { EMPTY_GRAPH_DATA } from '@/constants/graph';

export async function getGraphData(chainId: number) {
  const data = await fetchGraphData(chainId);

  if (data !== null) {
    return data;
  }

  return EMPTY_GRAPH_DATA;
}
