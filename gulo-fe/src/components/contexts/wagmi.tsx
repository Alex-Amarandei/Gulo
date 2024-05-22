'use client';

import { ReactNode } from 'react';

import WAGMI_CONFIG from '@/utils/wagmi/config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const WagmiProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiProviderWrapper;
