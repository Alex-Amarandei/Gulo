'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Gulo',
  projectId: 'a6bc9e7c5a90b4c17dee323e0efc3683',
  chains: [mainnet, sepolia],
  ssr: true
});

export default config;
