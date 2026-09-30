# Aether Partner Path — v0.1 Product Specification

## Positioning
A premium, meritocratic partner operating system for a FundingPips-style prop firm. The partner model pays only from net challenge fees; trader profit splits are outside the partner economics.

## Tier path
Spark → Catalyst → Architect → Sovereign → Apex → Consul.

Tier gates require both the rolling 90-day Partner Score band and trailing qualified GMV gate. Downgrade occurs if a gate is missed for 60 days.

## Ledger rules
- Attribution order: explicit partner code > referral link > campaign attribution.
- Attribution window: 30 days from the last qualifying click; explicit code always wins when used.
- Commission tier is frozen at order qualification time.
- Qualified net cash = cash collected - refunds - chargebacks.
- Commission = min(clamp(qualifiedNet × effectiveRate, floor, cap), qualifiedNet × 12%).
- Add-ons inherit parent order rate; resets are repeats.
- Repeat eligibility ends 90 days after the referred trader's first qualified purchase.
- No commission on trader rewards, refunded nth-payout fees, chargebacks, self-referrals or non-qualified cash.

## Anti-abuse policy
### Family members
Family members are allowed. Household relationships can be disclosed. Shared IP/device/payment signals are evidence for review, not automatic wrongdoing.

### Confirmed abuse
If a referred trader is confirmed to have committed fraud, deliberate trading-integrity abuse, self-referral, chargeback-ring activity or another material cheating violation, the referred account is actioned and the referring partner network is frozen: partner login, referral links/codes, pending commissions and new campaign creation can be suspended. Historical paid commissions are not retroactively clawed unless the specific ledger item is affected by a refund/chargeback or the final human compliance decision establishes fraud-linked proceeds.

### Linked family abuse
A family relationship alone does not implicate the partner. If a referred family member is confirmed to have cheated or committed fraud and the evidence establishes coordination or benefit through the referral network, the referring partner receives the same network freeze pending human review.

### Enforcement / appeals
Automated systems may flag, hold or route cases. Confirmed enforcement is a human decision. Only an authorized human compliance reviewer can overturn a confirmed enforcement decision; the override, evidence and rationale are written to AuditLog.

## Quality score
30 Qualified net GMV; 20 funded conversion vs firm baseline; 15 first-payout conversion vs firm baseline; 20 integrity; 10 mix quality; 5 consistency. Small samples are pulled toward the firm baseline until a minimum confidence threshold is met.

## Quality multipliers
+1.0pp next-month first rate if funded rate ≥ 1.25× firm baseline; +0.5pp if first-payout rate ≥ 1.25× firm baseline; -2.0pp if refund+chargeback >4%; freeze if >8%. Positive bonuses stack; negative integrity action overrides positive bonuses.

## Consul
One funded seat per ISO country. Activation requires country trailing-90-day partner-attributed net GMV ≥ $90k. Salary pauses if country GMV < $60k for 90 days. Bands: A $800, B $1,200, C $1,800, D $2,200. Royalty: 1.2% for A/B or 1.0% for C/D of first-purchase net GMV from partners personally originated by the Consul; 12-month origin window; no royalty on personal links or repeats; monthly royalty cap 1.5× salary. Quarterly MBO up to 15% of salary for compliance + partner quality.
