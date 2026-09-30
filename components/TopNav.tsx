'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/partners', label: 'Partners' },
  { href: '/partners#tiers', label: 'How It Works' },
  { href: '/consul', label: 'Consul' },
  { href: '/app', label: 'Dashboard' },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link href="/partners" className="brand-lockup" aria-label="Aether">
          <span className="brand-mark">A</span>
          <span className="brand-name">AETHER</span>
        </Link>

        <nav className="site-nav__links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href === '/partners' && pathname === '/') ? 'is-active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="btn primary nav-cta" href="/partners/apply">
          Apply to Join →
        </Link>
      </div>
    </header>
  );
}
