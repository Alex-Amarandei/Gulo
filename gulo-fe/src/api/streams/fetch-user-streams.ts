import GET_STREAMS_QUERY from '@/constants/get-streams-query';
import WAGMI_CONFIG, { SABLIER_SUBGRAPH_ENDPOINTS } from '@/utils/configs';
import { uppercaseAlias } from '@/utils/formats';
import { getAccount } from '@wagmi/core';

export const fetchUserStreams = async () => {
  const { address, chain } = getAccount(WAGMI_CONFIG);

  const variables = {
    recipient: address,
    sender: address,
  };

  const endpoint = SABLIER_SUBGRAPH_ENDPOINTS[chain?.id ?? 1];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_STREAMS_QUERY,
      variables,
    }),
  });

  const data = await response.json();
  return data.data ? uppercaseAlias(data.data.streams) : [];
};
