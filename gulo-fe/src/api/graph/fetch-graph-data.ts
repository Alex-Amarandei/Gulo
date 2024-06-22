import { CachedGraphData } from '@/interfaces/graph';
import { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import dotenv from 'dotenv';
import { toast } from 'sonner';

dotenv.config();

export const fetchGraphData = (chainId: number): Promise<CachedGraphData | null> => {
  const sablierEndpoint = SABLIER_SUBGRAPH_ENDPOINTS[chainId];
  const apiGatewayEndpoint = process.env.API_GATEWAY_ENDPOINT + '/graph';
  const urlParams = new URLSearchParams({
    chainId: chainId.toString(),
    endpoint: sablierEndpoint,
  }).toString();

  const urlWithParams = `${apiGatewayEndpoint}?${urlParams}`;

  return fetch(urlWithParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        toast.error("Oops. This one's on us. Please try again later. 🙏");
        throw new Error('There was a problem fetching the graph data.');
      }
      return response.json();
    })
    .then(data => data as CachedGraphData);
};
