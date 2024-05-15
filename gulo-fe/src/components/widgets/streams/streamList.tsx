interface StreamListProps {
	streams: Stream[];
}

const StreamList = ({ streams }: StreamListProps) => {
	return (
		<div>
			{streams.map((stream) => (
				<div key={stream.id} className="p-4 border-b border-gray-200">
					<h3 className="text-lg font-bold">{stream.alias}</h3>
					<p>
						<strong>Sender:</strong> {stream.sender}
					</p>
					<p>
						<strong>Recipient:</strong> {stream.recipient}
					</p>
					<p>
						<strong>Deposit Amount:</strong> {stream.depositAmount}
					</p>
					<p>
						<strong>Start Time:</strong> {new Date(Number(stream.startTime) * 1000).toLocaleString()}
					</p>
					<p>
						<strong>End Time:</strong> {new Date(Number(stream.endTime) * 1000).toLocaleString()}
					</p>
					<p>
						<strong>Withdrawn Amount:</strong> {stream.withdrawnAmount}
					</p>
					<p>
						<strong>Intact Amount:</strong> {stream.intactAmount}
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
