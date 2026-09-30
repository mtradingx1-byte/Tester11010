'use client';

import Link from 'next/link';

export function TopNav() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: '#05090d',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{
        width: 'min(1600px, calc(100% - 32px))',
        margin: '0 auto',
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }}>
        <Link href="/partners" style={{ color: '#f0d294', fontWeight: 700, letterSpacing: '0.22em', fontSize: 14 }}>
          AETHER
        </Link>

        <nav style={{ display: 'flex', gap: 22 }}>
          <Link href="/partners" style={{ color: '#f0d294', fontSize: 13, fontWeight: 600 }}>Partners</Link>
          <Link href="/partners#tiers" style={{ color: '#9aa6b2', fontSize: 13, fontWeight: 600 }}>How It Works</Link>
          <Link href="/consul" style={{ color: '#9aa6b2', fontSize: 13, fontWeight: 600 }}>Consul</Link>
          <Link href="/app" style={{ color: '#9aa6b2', fontSize: 13, fontWeight: 600 }}>Dashboard</Link>
        </nav>

        <Link href="/partners/apply" style={{
          background: 'linear-gradient(180deg,#f2cf83,#c4963f)',
          color: '#17120b',
          fontSize: 12,
          fontWeight: 700,
          padding: '10px 16px',
          borderRadius: 8
        }}>
          Apply to Join →
        </Link>
      </div>
    </header>
  );
}
