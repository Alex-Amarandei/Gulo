import GET_STREAMS_QUERY from '@/constants/get-streams-query';
import WAGMI_CONFIG, { getSablierSubgraphEndpoint } from '@/utils/configs';
import { getAccount } from '@wagmi/core';

const fetchStreams = async () => {
  const { address, chain } = getAccount(WAGMI_CONFIG);

  const variables = {
    first: 31,
    skip: 0,
    recipient: address,
    sender: address,
    subgraphId: '1000000000',
  };

  const endpoint = getSablierSubgraphEndpoint(chain);

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
  return data.data ? data.data.streams : [];
};

export default fetchStreams;
