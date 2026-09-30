# Aether Partner Path

A dark, meritocratic partner operating system for a FundingPips-style prop firm.

## Core economics
- Partners are paid from net challenge fees only, never from trader profit splits.
- Commission tier is frozen at order qualification time.
- Qualified net cash = cash collected - refunds - chargebacks.
- Commission = min(clamp(qualifiedNet * effectiveRate, floor, cap), qualifiedNet * 12%).
- Add-ons inherit the parent order rate. Resets are repeats.
- Repeats qualify only inside 90 days from a referred trader's first qualified purchase.
- 20% promo and partner code are mutually exclusive at checkout; links still attribute.

## Quality model
Partner Score is rolling 90 days: 30% qualified net GMV, 20% funded conversion vs firm baseline, 15% first-payout conversion, 20% integrity, 10% mix quality, 5% consistency.

## Anti-abuse policy
Family members are allowed when disclosed. Shared household/device/payment/IP signals are risk evidence, not automatic guilt. Confirmed self-referral, fraud, trading-integrity abuse or chargeback rings can freeze the referred account and referring partner, with pending commissions held. Only authorized human review can overturn enforcement. Every decision is written to AuditLog.

## Consul
One funded seat per ISO country. Activation at $90k trailing 90-day country-attributed net GMV; salary pauses below $60k for 90 days. Royalty applies only to first-purchase net GMV from partners the Consul personally originated and is capped at 1.5x monthly salary.

## Tuning
Adjust `lib/economics.ts`, `lib/scoring.ts`, and the admin scenario controls. PostgreSQL schema is in `prisma/schema.prisma`; demo seed is `scripts/seed.ts`.

## Run
```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```
