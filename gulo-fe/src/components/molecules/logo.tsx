import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2 flex-1 justify-start">
      <Image src="/images/branding/logo.png" alt="App Logo" width={40} height={40} className="cursor-default" />
      <span className="text-white text-xl font-bold cursor-default">Gulo</span>
    </div>
  );
};
