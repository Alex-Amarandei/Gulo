'use client';

import WAGMI_CONFIG from '@/utils/wagmi/config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
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
