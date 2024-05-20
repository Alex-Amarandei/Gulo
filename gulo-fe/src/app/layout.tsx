import type { Metadata } from "next";
import "@/styles/globals.css";
import WagmiProviderWrapper from "@/components/wagmi/wrapper";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
	title: "Gulo - Streamlining Sablier",
	description: "Gulo - the all-in-one place for Sablier analytics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<link rel="icon" href="/images/branding/favicon.ico" />
			<body>
				<WagmiProviderWrapper>
					<Header />
					{children}
					<Footer />
				</WagmiProviderWrapper>
			</body>
		</html>
	);
}
