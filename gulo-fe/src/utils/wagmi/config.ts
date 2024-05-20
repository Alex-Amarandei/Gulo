"use client";

import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

const config = getDefaultConfig({
	appName: "Gulo",
	projectId: "YOUR_PROJECT_ID",
	chains: [mainnet, sepolia],
	ssr: true,
});

export default config;
