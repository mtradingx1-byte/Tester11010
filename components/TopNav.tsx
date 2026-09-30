'use client';
import Link from 'next/link';

export function TopNav(){
  return <header className="site-nav">
    <div className="site-nav__inner">
      <Link href="/partners" className="brand-lockup" aria-label="Aether Partner Path">
        <img src="/assets/brand/aether-logo-horizontal.png" alt="Aether" />
      </Link>
      <nav className="site-nav__links" aria-label="Primary navigation">
        <Link href="/partners">Partners</Link>
        <a href="/partners#how">How It Works</a>
        <a href="/partners#calculator">Consul</a>
        <a href="/partners#faq">Resources</a>
      </nav>
      <Link className="nav-primary" href="/partners/apply">Apply to Join <span aria-hidden="true">→</span></Link>
    </div>
  </header>
}
