'use client';

import NavbarButton from '@/components/atoms/buttons/navbar-button';
import { NavbarButtonPathsByRoute } from '@/constants/navbar-icons';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const currentRoute = usePathname();
  const icons = NavbarButtonPathsByRoute[currentRoute] || NavbarButtonPathsByRoute['/'];

  return (
    <nav className='flex-1 flex justify-center'>
      <div className='flex space-x-6 py-2'>
        <NavbarButton href='/analytics' src={icons.analytics} alt='Analytics Page Icon' />
        <NavbarButton href='/' src={icons.overview} alt='Overview Page Icon' />
        <NavbarButton href='/reports' src={icons.reports} alt='Reports Page Icon' />
      </div>
    </nav>
  );
}
