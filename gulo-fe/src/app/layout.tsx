import { ReactNode } from 'react';

import WagmiProviderWrapper from '@/components/templates/contexts/wagmi';
import Content from '@/components/templates/layout/content';
import Footer from '@/components/templates/layout/footer';
import Header from '@/components/templates/layout/header';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Gulo - Streamlining Sablier',
  description: 'Gulo - the all-in-one place for Sablier analytics',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/images/branding/favicon.ico' />
      <body className='flex flex-col'>
        <Toaster richColors />
        <WagmiProviderWrapper>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </WagmiProviderWrapper>
      </body>
    </html>
  );
}
