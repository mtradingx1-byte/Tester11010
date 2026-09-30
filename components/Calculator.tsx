'use client';
import { useMemo, useState } from 'react';
import {
  CATALOG, CONSUL_BANDS, ConsulBand, Model, TIERS,
  commission, consulRoyalty, marketTier,
} from '@/lib/economics';

const REGIONS = ['GB','US','DE','AE','BR','IN','NG','PH','JP','KE'];

export function Calculator() {
  const [model, setModel] = useState<Model>('2-Step Pro');
  const [size, setSize] = useState(25000);
  const [promo, setPromo] = useState(true);
  const [first, setFirst] = useState(20);
  const [repeat, setRepeat] = useState(10);
  const [tier, setTier] = useState<'spark'|'catalyst'|'architect'|'sovereign'|'apex'>('architect');
  const [saleCountry, setSaleCountry] = useState('GB');
  const [band, setBand] = useState<ConsulBand>('B');

  const calc = useMemo(() => {
    const list = (CATALOG[model] as Record<number, number>)[size];
    const discount = promo && size < 100000 ? 0.20 : 0.05;
    const t = TIERS[tier];
    const firstNet = list * (1 - discount);
    const firstComm = commission({ qualifiedNet: firstNet, rate: t.first, floor: t.floor, cap: t.cap });
    const repeatNet = list * 0.95;
    const repeatComm = commission({ qualifiedNet: repeatNet, rate: t.repeat, floor: t.floor, cap: t.cap });
    const total = first * firstComm + repeat * repeatComm;
    const netVolume = first * firstNet + repeat * repeatNet;
    const royalty = consulRoyalty({
      band, saleCountry, qualifiedNet: firstNet,
      isFirstPurchase: true, originatedByConsul: true, isPersonalLink: false,
    });
    const monthlyRoyalty = first * royalty.amount;
    return {
      firstNet, firstComm, repeatComm, total, netVolume,
      firmCost: netVolume ? total / netVolume : 0,
      industry: netVolume * 0.25,
      royalty, monthlyRoyalty, market: marketTier(saleCountry),
    };
  }, [model, size, promo, first, repeat, tier, saleCountry, band]);

  return (
    <div className="calculator-shell">
      <div className="panel-title-row">
        <div>
          <div className="eyebrow">LIVE COMMISSION CALCULATOR</div>
          <h2>See exactly what you earn, with no guesswork.</h2>
          <p>Partner commission plus Consul royalty by sale region and ticket size.</p>
        </div>
      </div>
      <div className="calculator-grid">
        <div className="calculator-form">
          <label>Challenge Model
            <select value={model} onChange={e => setModel(e.target.value as Model)}>
              {Object.keys(CATALOG).map(k => <option key={k}>{k}</option>)}
            </select>
          </label>
          <label>Account Size
            <select value={size} onChange={e => setSize(Number(e.target.value))}>
              {Object.keys(CATALOG[model]).map(k => (
                <option key={k} value={k}>
                  {Number(k).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                </option>
              ))}
            </select>
          </label>
          <label>Current Tier
            <select value={tier} onChange={e => setTier(e.target.value as any)}>
              {Object.entries(TIERS).filter(([k]) => k !== 'consul').map(([k, v]) => (
                <option key={k} value={k}>{v.label} ({(v.first * 100).toFixed(1)}% / {(v.repeat * 100).toFixed(1)}%)</option>
              ))}
            </select>
          </label>
          <label>Sale Region
            <select value={saleCountry} onChange={e => setSaleCountry(e.target.value)}>
              {REGIONS.map(c => <option key={c} value={c}>{c} · {marketTier(c)}</option>)}
            </select>
          </label>
          <label>Consul Band
            <select value={band} onChange={e => setBand(e.target.value as ConsulBand)}>
              {Object.entries(CONSUL_BANDS).map(([k, v]) => (
                <option key={k} value={k}>Band {k} · {(v.royaltyBase * 100).toFixed(1)}% base</option>
              ))}
            </select>
          </label>
          <label className="toggle-line">
            <span>Promo Code (20%)</span>
            <button type="button" className={`toggle-pill ${promo ? 'is-on' : ''}`} onClick={() => setPromo(v => !v)} aria-pressed={promo}><span /></button>
          </label>
          <label>Est. Monthly First Purchases
            <div className="range-row"><input type="range" min="0" max="100" value={first} onChange={e => setFirst(Number(e.target.value))} /><strong>{first}</strong></div>
          </label>
          <label>Est. Monthly Repeat Purchases
            <div className="range-row"><input type="range" min="0" max="100" value={repeat} onChange={e => setRepeat(Number(e.target.value))} /><strong>{repeat}</strong></div>
          </label>
        </div>
        <div className="calculator-output">
          <div className="output-mini"><span>Commission per First Sale</span><strong>${calc.firstComm.toFixed(2)}</strong><small>{TIERS[tier].label} · {(TIERS[tier].first * 100).toFixed(1)}%</small></div>
          <div className="output-mini"><span>Commission per Repeat Sale</span><strong>${calc.repeatComm.toFixed(2)}</strong><small>No Consul royalty on repeats</small></div>
          <div className="output-mini">
            <span>Consul Royalty / First Sale</span>
            <strong>${calc.royalty.amount.toFixed(2)}</strong>
            <small>{(calc.royalty.rate * 100).toFixed(2)}% · {saleCountry} {calc.market} · size {calc.royalty.size.toFixed(2)}x</small>
          </div>
          <div className="output-total">
            <span>Estimated Monthly Partner Earnings</span>
            <strong>${calc.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            <small>Firm cost {(calc.firmCost * 100).toFixed(1)}% · Consul royalty ${calc.monthlyRoyalty.toFixed(2)}/mo before cap</small>
          </div>
        </div>
      </div>
      <div className="calculator-comparison">
        <div><span>Industry Standard (25%)</span><strong>${calc.industry.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><i><b style={{ width: '100%' }} /></i></div>
        <div><span>You Earn With Aether</span><strong>${calc.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><i><b style={{ width: `${Math.min(100, calc.industry ? (calc.total / calc.industry) * 100 : 0)}%` }} /></i></div>
      </div>
    </div>
  );
}
