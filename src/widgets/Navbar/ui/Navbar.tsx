import Link from 'next/link';
import MiniLogo from '@/shared/MiniLogo/MiniLogo';
import NavUserMenu from './NavUserMenu/NavUserMenu';

import NavMakeStory from './NavMakeStory';

import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="mainNav">
      <MiniLogo withSecret className="mainNavLogo" />
      <Link href="/">Играть</Link>
      <Link href="/forum">Форум</Link>
      <NavMakeStory />
      <NavUserMenu />
    </nav>
  );
}
