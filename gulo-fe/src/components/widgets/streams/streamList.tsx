import formatDecimals from "@/utils/convert";

interface StreamListProps {
	streams: Stream[];
}

const formatAddress = (address: string): string => {
	return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

const StreamList = ({ streams }: StreamListProps) => {
	return (
		<div className="overflow-auto text-white p-4">
			{streams.map((stream) => (
				<div
					key={stream.id}
					className="flex items-center p-4 mb-6 bg-gradient-to-br from-gray-700 to-gray-800 bg-opacity-90 rounded-lg shadow-2xl"
				>
					<input type="checkbox" className="h-6 w-6 text-gray-800 border-gray-600 checked:ring-gray-800 focus:ring-gray-800" />
					<div className="flex-grow border-l-4 border-gray-600 mx-4 pl-6">
						<h3 className="text-lg font-bold mb-2">{stream.alias}</h3>
						<p className="text-sm">
							<strong>Sender:</strong> {formatAddress(stream.sender)}
						</p>
						<p className="text-sm">
							<strong>Recipient:</strong> {formatAddress(stream.recipient)}
						</p>
						<p className="text-sm">
							<strong>Deposit Amount:</strong> {formatDecimals(stream.depositAmount)}
						</p>
						<p className="text-sm">
							<strong>Withdrawn Amount:</strong> {formatDecimals(stream.withdrawnAmount)}
						</p>
						<p className="text-sm">
							<strong>Start Time:</strong> {new Date(Number(stream.startTime) * 1000).toLocaleString()}
						</p>
						<p className="text-sm">
							<strong>End Time:</strong> {new Date(Number(stream.endTime) * 1000).toLocaleString()}
						</p>
						<p className="text-sm">
							<strong>Cancelable:</strong> {stream.cancelable ? "Yes" : "No"}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default StreamList;
