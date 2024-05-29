'use client';

import { ReactNode } from 'react';

import WAGMI_CONFIG from '@/utils/configs';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const WagmiProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          theme={darkTheme({
            accentColor: '#f77725',
            accentColorForeground: '#1F2937',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiProviderWrapper;
