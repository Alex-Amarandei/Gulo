import InfoButton from '@/components/atoms/info-button';
import WagmiProviderWrapper from '@/components/contexts/wagmi';
import Content from '@/components/templates/layout/content';
import Footer from '@/components/templates/layout/footer';
import Header from '@/components/templates/layout/header';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gulo - Streamlining Sablier',
  description: 'Gulo - the all-in-one place for Sablier analytics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/branding/favicon.ico" />
      <body className="flex flex-col">
        <WagmiProviderWrapper>
          <Header />
          <Content children={children} />
          <Footer />
          <InfoButton />
        </WagmiProviderWrapper>
      </body>
    </html>
  );
}
