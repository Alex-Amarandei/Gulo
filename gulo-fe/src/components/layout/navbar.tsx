import Link from "next/link";

export default function Navbar() {
	return (
		<ul>
			<li>Navbar</li>
			<li>
				<Link href="/analytics">Analytics Page</Link>
			</li>
			<li>
				<Link href="/">Overview Page</Link>
			</li>
			<li>
				<Link href="/reports">Reports Page</Link>
			</li>
		</ul>
	);
}
