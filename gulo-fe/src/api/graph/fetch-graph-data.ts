import { CachedGraphData } from '@/interfaces/graph';
import { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import { toast } from 'sonner';

export async function fetchGraphData(chainId: number): Promise<CachedGraphData | null> {
  const sablierEndpoint = SABLIER_SUBGRAPH_ENDPOINTS[chainId];
  const apiGatewayEndpoint = process.env.API_GATEWAY_ENDPOINT + '/graph';
  const urlParams = new URLSearchParams({
    chainId: chainId.toString(),
    endpoint: sablierEndpoint,
  }).toString();

  const urlWithParams = `${apiGatewayEndpoint}?${urlParams}`;

  try {
    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('There was a problem fetching the graph data. Please hang on for a minute! ⏱️');
      return null;
    }

    const data: CachedGraphData = await response.json();

    return data ?? null;
  } catch (error) {
    toast.error("Oops. That's on us. Please try again later. 🙏");
    return null;
  }
}
