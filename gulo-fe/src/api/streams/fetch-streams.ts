import GET_STREAMS_QUERY from '@/constants/queries/get-streams-query';
import WAGMI_CONFIG from '@/utils/wagmi-config';
import { getAccount } from '@wagmi/core';

const fetchStreams = async () => {
  const address = getAccount(WAGMI_CONFIG).address;

  const variables = {
    first: 31,
    skip: 0,
    recipient: address,
    sender: address,
    subgraphId: '1000000000',
  };

  const response = await fetch('https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-sepolia/', {
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
