import FormatDecimals from "@/utils/convert";

interface StreamListProps {
	streams: Stream[];
}

export default function StreamList({ streams }: StreamListProps) {
	return (
		<div>
			{streams.map((stream) => (
				<div key={stream.id}>
					<ul>
						<li>Currency: {stream.asset.symbol}</li>
						<li>Withdrawable Amount: {FormatDecimals(stream.intactAmount)}</li>
						<li>Total Amount: {FormatDecimals(stream.depositAmount)}</li>
						<li>Is Cancelable: {stream.cancelable ? "Yes" : "No"}</li>
					</ul>
				</div>
			))}
		</div>
	);
}
