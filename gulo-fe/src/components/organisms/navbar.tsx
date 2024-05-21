import ConnectWallet from '@/components/molecules/header/connect-wallet';
import Logo from '@/components/molecules/header/logo';
import Navigation from '@/components/molecules/header/navigation';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-800">
      <Logo />
      <Navigation />
      <ConnectWallet />
    </div>
  );
}
