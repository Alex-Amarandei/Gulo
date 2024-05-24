import { NavbarIconProps } from '@/interfaces/navbar-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarIcon(props: NavbarIconProps) {
  return (
    <Link href={props.href}>
      <Image
        src={props.src}
        alt={props.alt}
        width={40}
        height={40}
        className="transition-transform duration-300 hover:-translate-y-1"
      />
    </Link>
  );
}
