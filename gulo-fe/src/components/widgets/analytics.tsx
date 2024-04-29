import Link from "next/link";
import EvolutionWidget from "./evolution";
import CompositionWidget from "./composition";

export default function AnalyticsWidget() {
	return (
		<div>
			<h1>AnalyticsWidget</h1>
			<Link href="/analytics">Analytics Page</Link>
			<EvolutionWidget />
			<CompositionWidget />
		</div>
	);
}
