import query from "@/constants/query/getStreamsQuery";

const variables = {
	first: 31,
	skip: 0,
	recipient: "0x3744fafa69a3236dd18bc3870c8da708d9f6906e",
	sender: "0x3744fafa69a3236dd18bc3870c8da708d9f6906e",
	subgraphId: "1000000000",
};

const fetchStreams = async () => {
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
	return data.data.streams;
};

export default fetchStreams;
