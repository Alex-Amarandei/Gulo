import GET_ALL_STREAMS_QUERY from '@/constants/get-all-streams-query';
import { GraphStream } from '@/interfaces/stream';

export const fetchAllStreams = async (endpoint: string, skip: number): Promise<GraphStream[]> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_ALL_STREAMS_QUERY,
      variables: { skip },
    }),
  });

  const data = await response.json();
  return data.data ? data.data.streams : [];
};
