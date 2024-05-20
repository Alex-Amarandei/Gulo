"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AnalyticsWidget from "@/components/widgets/analytics";
import BalanceWidget from "@/components/widgets/balance";
import StreamsWidget from "@/components/widgets/streams/streamWidget";
import fetchStreams from "@/api/fetchStreams";
import Stream from "@/interfaces/stream";

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
					<button className="text-orange-600 bg-gray-800 p-2 mb-2" onClick={() => setIsStreamsCollapsed(!isStreamsCollapsed)}>
						<FontAwesomeIcon icon={isStreamsCollapsed ? faAngleRight : faAngleLeft} size="lg" />
					</button>
					{!isStreamsCollapsed && !loading && <StreamsWidget streams={streams} />}
					{!isStreamsCollapsed && loading && <div>Loading...</div>}
				</div>

				<div className="border p-2 w-1/3">
					<BalanceWidget />
				</div>

				<div className={`border p-2 transition-all duration-300 ${isAnalyticsCollapsed ? "w-16" : "w-1/3"}`}>
					<button className="text-orange-600 bg-gray-800 p-2 mb-2" onClick={() => setIsAnalyticsCollapsed(!isAnalyticsCollapsed)}>
						<FontAwesomeIcon icon={isAnalyticsCollapsed ? faAngleLeft : faAngleRight} size="lg" />
					</button>
					{!isAnalyticsCollapsed && <AnalyticsWidget />}
				</div>
			</main>
		</div>
	);
}
