import Content from '@/components/templates/content';
import Footer from '@/components/templates/footer';
import Header from '@/components/templates/header';
import WagmiProviderWrapper from '@/components/contexts/wagmi';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gulo - Streamlining Sablier',
  description: 'Gulo - the all-in-one place for Sablier analytics'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/branding/favicon.ico" />
      <body>
        <WagmiProviderWrapper>
          <Header />
          <Content children={children} />
          <Footer />
        </WagmiProviderWrapper>
      </body>
    </html>
  );
}
