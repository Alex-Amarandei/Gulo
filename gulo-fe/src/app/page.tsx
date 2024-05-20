"use client";

import { useEffect, useState } from "react";
import AnalyticsWidget from "@/components/widgets/analytics";
import BalanceWidget from "@/components/widgets/balance";
import StreamsWidget from "@/components/widgets/streams/streamWidget";
import fetchStreams from "@/api/fetchStreams";

export default function Home() {
	const [isStreamsCollapsed, setIsStreamsCollapsed] = useState(false);
	const [isAnalyticsCollapsed, setIsAnalyticsCollapsed] = useState(false);
	const [streams, setStreams] = useState<Stream[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchStreams();
			setStreams(data);
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="body-wrapper">
			<main className="flex justify-between space-x-4 p-4">
				<div className={`border p-2 transition-all duration-300 ${isStreamsCollapsed ? "w-16" : "w-1/3"}`}>
					<button className="text-white bg-gray-800 p-2 mb-2" onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
						{isStreamsCollapsed ? "Expand" : "Collapse"}
					</button>
					{!isStreamsCollapsed && !loading && <StreamsWidget streams={streams} />}
					{!isStreamsCollapsed && loading && <div>Loading...</div>}
				</div>

				<div className="border p-2 w-1/3">
					<BalanceWidget />
				</div>

				<div className={`border p-2 transition-all duration-300 ${isAnalyticsCollapsed ? "w-16" : "w-1/3"}`}>
					<button className="text-white bg-gray-800 p-2 mb-2" onClick={() => setIsAnalyticsCollapsed(!isAnalyticsCollapsed)}>
						{isAnalyticsCollapsed ? "Expand" : "Collapse"}
					</button>
					{!isAnalyticsCollapsed && <AnalyticsWidget />}
				</div>
			</main>
		</div>
	);
}
