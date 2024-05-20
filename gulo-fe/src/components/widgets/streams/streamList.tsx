import formatDecimals from "@/utils/convert";

interface StreamListProps {
	streams: Stream[];
}

const formatAddress = (address: string): string => {
	return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

const StreamList = ({ streams }: StreamListProps) => {
	return (
		<div className="h-96 overflow-auto">
			{streams.map((stream) => (
				<div key={stream.id} className="p-4 border-b border-gray-200">
					<h3 className="text-lg font-bold">{stream.alias}</h3>
					<p>
						<strong>Sender:</strong> {formatAddress(stream.sender)}
					</p>
					<p>
						<strong>Recipient:</strong> {formatAddress(stream.recipient)}
					</p>
					<p>
						<strong>Deposit Amount:</strong> {formatDecimals(stream.depositAmount)}
					</p>
					<p>
						<strong>Withdrawn Amount:</strong> {formatDecimals(stream.withdrawnAmount)}
					</p>
					<p>
						<strong>Start Time:</strong> {new Date(Number(stream.startTime) * 1000).toLocaleString()}
					</p>
					<p>
						<strong>End Time:</strong> {new Date(Number(stream.endTime) * 1000).toLocaleString()}
					</p>
					<p>
						<strong>Cancelable:</strong> {stream.cancelable ? "Yes" : "No"}
					</p>
				</div>
			))}
		</div>
	);
};

export default StreamList;
