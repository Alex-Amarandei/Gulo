"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navbarIconMap: {
	[key: string]: {
		analytics: string;
		overview: string;
		reports: string;
	};
} = {
	"/analytics": {
		analytics: "/images/miscellaneous/analytics_on.png",
		overview: "/images/miscellaneous/overview_off.png",
		reports: "/images/miscellaneous/reports_off.png",
	},
	"/": {
		analytics: "/images/miscellaneous/analytics_off.png",
		overview: "/images/miscellaneous/overview_on.png",
		reports: "/images/miscellaneous/reports_off.png",
	},
	"/reports": {
		analytics: "/images/miscellaneous/analytics_off.png",
		overview: "/images/miscellaneous/overview_off.png",
		reports: "/images/miscellaneous/reports_on.png",
	},
};

const Navbar = () => {
	const currentPath = usePathname();
	const icons = navbarIconMap[currentPath] || navbarIconMap["/"];

	return (
		<div className="flex justify-between items-center p-3 bg-gray-800">
			{/* Left Section */}
			<div className="flex items-center space-x-2 flex-1 justify-start">
				<Image src="/images/branding/logo.png" alt="App Logo" width={40} height={40} className="cursor-default" />
				<span className="text-white text-xl font-bold cursor-default">Gulo</span>
			</div>

			{/* Middle Section */}
			<nav className="flex-1 flex justify-center">
				<div className="flex space-x-6">
					<Link href="/analytics">
						<Image
							src={icons.analytics}
							alt="Analytics Page Icon"
							width={30}
							height={30}
							className="transition-transform duration-300 hover:-translate-y-1"
						/>
					</Link>
					<Link href="/">
						<Image
							src={icons.overview}
							alt="Overview Page Icon"
							width={30}
							height={30}
							className="transition-transform duration-300 hover:-translate-y-1"
						/>
					</Link>
					<Link href="/reports">
						<Image
							src={icons.reports}
							alt="Reports Page Icon"
							width={30}
							height={30}
							className="transition-transform duration-300 hover:-translate-y-1"
						/>
					</Link>
				</div>
			</nav>

			{/* Right Section */}
			<div className="flex-1 flex justify-end">
				<ConnectButton />
			</div>
		</div>
	);
};

export default Navbar;
