export type TierKey = 'spark' | 'catalyst' | 'architect' | 'sovereign' | 'apex' | 'consul';
export type ConsulBand = 'A' | 'B' | 'C' | 'D';
export type MarketTier = 'core' | 'developed' | 'emerging' | 'frontier' | 'blocked';

export const TIERS = {
  spark:     { label: 'Spark',     first: .04,  repeat: .015, floor: 2,   cap: 40,  minScore: 0,  minGMV: 0 },
  catalyst:  { label: 'Catalyst',  first: .055, repeat: .02,  floor: 2.5, cap: 55,  minScore: 40, minGMV: 2500 },
  architect: { label: 'Architect', first: .07,  repeat: .025, floor: 3,   cap: 70,  minScore: 55, minGMV: 8000 },
  sovereign: { label: 'Sovereign', first: .085, repeat: .03,  floor: 3.5, cap: 85,  minScore: 70, minGMV: 25000 },
  apex:      { label: 'Apex',      first: .10,  repeat: .035, floor: 4,   cap: 100, minScore: 85, minGMV: 60000 },
  consul:    { label: 'Consul',    first: .10,  repeat: .035, floor: 4,   cap: 100, minScore: 90, minGMV: 90000 },
} as const;

export const CATALOG = {
  '2-Step Pro':      { 5000: 29, 10000: 55, 25000: 134, 50000: 224, 100000: 422, 200000: 844 },
  '2-Step Standard': { 5000: 34, 10000: 63, 25000: 168, 50000: 285, 100000: 522 },
  '2-Step Flex':     { 5000: 32, 10000: 59, 25000: 159, 50000: 269, 100000: 499 },
  '1-Step Flex':     { 5000: 66, 10000: 99, 25000: 211, 50000: 313, 100000: 533 },
  Zero:              { 5000: 60, 10000: 88, 25000: 188, 50000: 244, 100000: 444, 200000: 888 },
} as const;

export type Model = keyof typeof CATALOG;

export const CONSUL_BANDS: Record<ConsulBand, { salary: number; royaltyBase: number }> = {
  A: { salary: 800,  royaltyBase: 0.012 },
  B: { salary: 1200, royaltyBase: 0.012 },
  C: { salary: 1800, royaltyBase: 0.010 },
  D: { salary: 2200, royaltyBase: 0.010 },
};

export const MARKET_FACTOR: Record<MarketTier, number> = {
  core: 1.15,
  developed: 1.00,
  emerging: 0.90,
  frontier: 0.75,
  blocked: 0,
};

const CORE = new Set(['US', 'GB', 'CA', 'AU', 'DE', 'NL', 'CH', 'SE', 'SG', 'AE']);
const DEVELOPED = new Set(['FR', 'IT', 'ES', 'IE', 'AT', 'BE', 'DK', 'NO', 'FI', 'JP', 'KR', 'NZ', 'IL', 'HK']);
const EMERGING = new Set(['BR', 'MX', 'IN', 'ID', 'PH', 'NG', 'ZA', 'TR', 'PL', 'CZ', 'RO', 'TH', 'VN', 'CO', 'AR', 'CL', 'EG', 'KE']);

export function marketTier(country: string): MarketTier {
  const iso = country.toUpperCase();
  if (CORE.has(iso)) return 'core';
  if (DEVELOPED.has(iso)) return 'developed';
  if (EMERGING.has(iso)) return 'emerging';
  return 'frontier';
}

export function sizeFactor(qualifiedNet: number): number {
  if (qualifiedNet >= 400) return 1.20;
  if (qualifiedNet >= 200) return 1.10;
  if (qualifiedNet >= 100) return 1.00;
  if (qualifiedNet >= 50) return 0.95;
  return 0.85;
}

export function qualifiedNet(input: {
  listPrice: number;
  discount: number;
  refunds?: number;
  chargebacks?: number;
}) {
  return Math.max(
    0,
    input.listPrice * (1 - input.discount) - (input.refunds ?? 0) - (input.chargebacks ?? 0)
  );
}

export function commission(input: {
  qualifiedNet: number;
  rate: number;
  floor: number;
  cap: number;
}) {
  const raw = input.qualifiedNet * input.rate;
  const floored = Math.max(raw, input.floor);
  const capped = Math.min(floored, input.cap);
  return Math.min(capped, input.qualifiedNet * 0.12);
}

export function getTier(score: number, gmv: number): TierKey {
  const order: TierKey[] = ['consul', 'apex', 'sovereign', 'architect', 'catalyst'];
  for (const key of order) {
    const t = TIERS[key];
    if (score >= t.minScore && gmv >= t.minGMV) return key;
  }
  return 'spark';
}

export function qualityAdjustment(flags: {
  fundedRate: number;
  firmFundedRate: number;
  firstPayoutRate: number;
  firmFirstPayoutRate: number;
  refundChargebackRate: number;
}) {
  if (flags.refundChargebackRate > 0.08) return { adjustment: -2, freeze: true };
  if (flags.refundChargebackRate > 0.04) return { adjustment: -1, freeze: false };
  let adjustment = 0;
  if (flags.fundedRate >= flags.firmFundedRate * 1.25) adjustment += 1;
  if (flags.firstPayoutRate >= flags.firmFirstPayoutRate * 1.25) adjustment += 0.5;
  return { adjustment, freeze: false };
}

export function consulRoyalty(input: {
  band: ConsulBand;
  saleCountry: string;
  qualifiedNet: number;
  isFirstPurchase: boolean;
  originatedByConsul: boolean;
  isPersonalLink: boolean;
}) {
  const region = marketTier(input.saleCountry);
  const size = sizeFactor(input.qualifiedNet);
  const base = CONSUL_BANDS[input.band].royaltyBase;

  if (
    !input.isFirstPurchase ||
    !input.originatedByConsul ||
    input.isPersonalLink ||
    input.qualifiedNet <= 0 ||
    MARKET_FACTOR[region] === 0
  ) {
    return { payable: false, rate: 0, amount: 0, region, size, base };
  }

  const rate = Math.min(0.018, Math.max(0.007, base * MARKET_FACTOR[region] * size));
  return {
    payable: true,
    rate,
    amount: input.qualifiedNet * rate,
    region,
    size,
    base,
  };
}

export function capMonthlyRoyalty(salary: number, rawRoyalty: number) {
  return Math.min(rawRoyalty, salary * 1.5);
}
