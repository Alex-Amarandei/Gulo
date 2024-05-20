"use client";

import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/utils/wagmi/config";
import { ReactNode } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

const WagmiProviderWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider coolMode>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default WagmiProviderWrapper;
