import tokenUriAbi from "@/constants/abi/sablier";
import Stream from "@/interfaces/stream";
import { useReadContract } from "wagmi";

const mockJsonWithImageFieldBase64 = "eyJpbWFnZSI6ICIifQ=="; // {"image":""}

export default function fetchNftDetails(stream: Stream) {
	const { data: name } = useReadContract({
		abi: tokenUriAbi,
		address: stream.contract.address,
		functionName: "tokenURI",
		chainId: Number(stream.chainId),
		args: [stream.tokenId],
	});

	const infoBase64 = name?.replace("data:application/json;base64,", "") ?? mockJsonWithImageFieldBase64;
	const infoBase64Decoded = JSON.parse(Buffer.from(infoBase64, "base64").toString("utf-8"));
	const nftDetailsBase64 = infoBase64Decoded["image"];

	return nftDetailsBase64;
}
