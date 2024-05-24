'use client';

import NavbarIcon from '@/components/atoms/navbar-icon';
import { NavbarIconPathsByRoute } from '@/constants/navbar-icons';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const currentRoute = usePathname();
  const icons = NavbarIconPathsByRoute[currentRoute] || NavbarIconPathsByRoute['/'];

  return (
    <nav className="flex-1 flex justify-center">
      <div className="flex space-x-6">
        <NavbarIcon href="/analytics" src={icons.analytics} alt="Analytics Page Icon" />
        <NavbarIcon href="/" src={icons.overview} alt="Overview Page Icon" />
        <NavbarIcon href="/reports" src={icons.reports} alt="Reports Page Icon" />
      </div>
    </nav>
  );
}
