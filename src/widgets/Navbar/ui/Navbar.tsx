import Link from 'next/link';

import MiniLogo from '@/shared/MiniLogo/MiniLogo';
import { NavUserMenu } from '@/features/Nav/NavUserMenu';
import { NavMakeStory } from '@/features/Nav/NavMakeStory';

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
