"use client";
import AnalyticsWidget from "@/components/widgets/analytics";
import BalanceWidget from "@/components/widgets/balance";
import StreamsWidget from "@/components/widgets/streams/streamWidget";

export default function Home() {
	return (
		<main>
			<StreamsWidget />
			<BalanceWidget />
			<AnalyticsWidget />
		</main>
	);
}
