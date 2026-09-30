'use client';
import {useMemo,useState} from 'react';
import {CATALOG,commission,TIERS,Model} from '@/lib/economics';

export function Calculator(){
  const [model,setModel]=useState<Model>('2-Step Pro');
  const [size,setSize]=useState(25000);
  const [promo,setPromo]=useState(true);
  const [first,setFirst]=useState(20);
  const [repeat,setRepeat]=useState(10);
  const [tier,setTier]=useState<'spark'|'catalyst'|'architect'|'sovereign'|'apex'>('architect');
  const calc=useMemo(()=>{
    const list=(CATALOG[model] as Record<string,number>)[size];
    const discount=promo&&size<100000?.20:.05;
    const t=TIERS[tier];
    const firstNet=list*(1-discount);
    const firstComm=commission({qualifiedNet:firstNet,rate:t.first,floor:t.floor,cap:t.cap});
    const repeatNet=list*.95;
    const repeatComm=commission({qualifiedNet:repeatNet,rate:t.repeat,floor:t.floor,cap:t.cap});
    const total=first*firstComm+repeat*repeatComm;
    const firmCost=total/(first*firstNet+repeat*repeatNet);
    return {firstComm,repeatComm,total,firmCost};
  },[model,size,promo,first,repeat,tier]);

  return <div className="calculator-shell">
    <div className="panel-title-row">
      <div>
        <div className="eyebrow">LIVE COMMISSION CALCULATOR</div>
        <h2>See exactly what you earn, with no guesswork.</h2>
        <p>Model your earnings with real challenge pricing and tier rates.</p>
      </div>
    </div>
    <div className="calculator-grid">
      <div className="calculator-form">
        <label>Challenge Model<select value={model} onChange={e=>setModel(e.target.value as Model)}>{Object.keys(CATALOG).map(k=><option key={k}>{k}</option>)}</select></label>
        <label>Account Size<select value={size} onChange={e=>setSize(Number(e.target.value))}>{Object.keys(CATALOG[model]).map(k=><option key={k} value={k}>{Number(k).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})}</option>)}</select></label>
        <label>Current Tier<select value={tier} onChange={e=>setTier(e.target.value as any)}>{Object.entries(TIERS).filter(([k])=>k!=='consul').map(([k,v])=><option key={k} value={k}>{v.label} ({(v.first*100).toFixed(1)}% / {(v.repeat*100).toFixed(1)}%)</option>)}</select></label>
        <label className="toggle-line"><span>Promo Code (20%)</span><button type="button" className={`toggle-pill ${promo?'is-on':''}`} onClick={()=>setPromo(v=>!v)} aria-pressed={promo}><span/></button></label>
        <label>Est. Monthly First Purchases<div className="range-row"><input type="range" min="0" max="100" value={first} onChange={e=>setFirst(Number(e.target.value))}/><strong>{first}</strong></div></label>
        <label>Est. Monthly Repeat Purchases<div className="range-row"><input type="range" min="0" max="100" value={repeat} onChange={e=>setRepeat(Number(e.target.value))}/><strong>{repeat}</strong></div></label>
      </div>
      <div className="calculator-output">
        <div className="output-mini"><span>Commission per First Sale</span><strong>${calc.firstComm.toFixed(2)}</strong><small>After promo · {TIERS[tier].label} {(TIERS[tier].first*100).toFixed(1)}%</small></div>
        <div className="output-mini"><span>Commission per Repeat Sale</span><strong>${calc.repeatComm.toFixed(2)}</strong><small>After 5% promo · {TIERS[tier].label} {(TIERS[tier].repeat*100).toFixed(1)}%</small></div>
        <div className="output-total"><span>Estimated Monthly Earnings</span><strong>${calc.total.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</strong><small>Firm Cost <b>{(calc.firmCost*100).toFixed(1)}%</b></small></div>
      </div>
    </div>
    <div className="calculator-comparison">
      <div><span>Industry Standard (25%)</span><strong>$1,048.00</strong><i><b style={{width:'100%'}}/></i></div>
      <div><span>You Earn With Aether</span><strong>${calc.total.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</strong><i><b style={{width:`${Math.min(100,(calc.total/1048)*100)}%`}}/></i></div>
    </div>
  </div>
}
