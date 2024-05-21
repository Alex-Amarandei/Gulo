import { Logo } from '@/components/molecules/header/logo';
import { Navigation } from '@/components/molecules/header/navigation';
import { ConnectWallet } from '../molecules/header/connect-wallet';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-800">
      <Logo />
      <Navigation />
      <ConnectWallet />
    </div>
  );
};

export default Navbar;
