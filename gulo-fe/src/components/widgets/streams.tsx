import "client-only";
import { useEffect, useState } from "react";
import StreamList from "./stream-list";

export default function StreamsWidget() {
	const [streams, setStreams] = useState<Stream[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-sepolia/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query,
					variables,
				}),
			});

			const data = await response.json();
			setStreams(data.data.streams);
			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <StreamList streams={streams} />;
}

const query = `
query getStreams_BySender_Or_ByRecipient($first: Int!, $skip: Int!, $recipient: Bytes!, $sender: Bytes!, $subgraphId: BigInt!) {
  streams(
    first: $first
    skip: $skip
    orderBy: subgraphId
    orderDirection: desc
    where: {
      or: [
        {and: [{sender: $sender}, {subgraphId_lt: $subgraphId}]}, 
        {and: [{proxender: $sender}, {subgraphId_lt: $subgraphId}]}, 
        {and: [{recipient: $recipient}, {subgraphId_lt: $subgraphId}]}
      ]
    }
  ) {
    id
    tokenId
    subgraphId
    chainId
    alias
    category
    funder
    sender
    recipient
    hash
    timestamp
    depositAmount
    startTime
    endTime
    cliff
    cliffTime
    cliffAmount
    cancelable
    renounceTime
    canceled
    canceledTime
    withdrawnAmount
    intactAmount
    position
    proxied
    proxender
    transferable
    version
	asset {
      id
      address
      chainId
      decimals
      name
      symbol
    }
    batch {
      id
      label
      size
    }
    contract {
      id
      address
      category
      version
    }
    segments {
      id
      position
      amount
      exponent
      milestone
      endTime
      startTime
      startAmount
      endAmount
    }
  }
}`;

const variables = {
	first: 31,
	skip: 0,
	recipient: "0x3744fafa69a3236dd18bc3870c8da708d9f6906e",
	sender: "0x3744fafa69a3236dd18bc3870c8da708d9f6906e",
	subgraphId: "1000000000",
};
