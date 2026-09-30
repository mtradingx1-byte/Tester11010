'use client';
import {useState} from 'react';
import {AlertTriangle, CheckCircle2, SlidersHorizontal, LockKeyhole} from 'lucide-react';
import {commission,TIERS} from '@/lib/economics';

const riskRows=[
 ['98','Multi-account','PTR-4182','Same device cluster','Frozen'],
 ['92','Family abuse','PTR-2204','Linked payment method','Under review'],
 ['87','Trading integrity','PTR-7719','Correlated challenge pattern','Under review'],
 ['76','Self referral','PTR-3315','KYC + device match','Rejected']
];
export default function Admin(){
 const [apex,setApex]=useState(10); const [consuls,setConsuls]=useState(40);
 const stress=commission({qualifiedNet:55,rate:apex/100,floor:4,cap:100});
 const projected=(consuls*1200)+15000*stress;
 return <div className="mx-auto max-w-[1500px] px-6 py-10">
  <div className="mb-6"><div className="text-xs uppercase tracking-[.22em] text-[#c6a15b]">Admin console</div><h1 className="serif mt-1 text-5xl">Economics + risk cockpit.</h1><p className="mt-2 text-[#8b97a8]">Tune rates, simulate costs, review partner risk and manage Consul country seats.</p></div>
  <div className="grid gap-6 lg:grid-cols-2">
   <div className="card rounded-3xl p-6"><div className="flex items-center gap-2"><SlidersHorizontal size={18} className="text-[#c6a15b]"/><div className="font-semibold">Rate table</div></div><div className="mt-5 space-y-3">{Object.entries(TIERS).filter(([k])=>k!=='consul').map(([k,t])=><div key={k} className="grid grid-cols-[1fr_100px_100px] gap-3 rounded-xl border border-white/10 bg-black/15 p-3 text-sm"><span>{t.label}</span><span className="text-[#8b97a8]">First {(t.first*100).toFixed(1)}%</span><span className="text-[#8b97a8]">Repeat {(t.repeat*100).toFixed(1)}%</span></div>)}</div></div>
   <div className="card rounded-3xl p-6"><div className="flex items-center gap-2"><LockKeyhole size={18} className="text-[#c6a15b]"/><div className="font-semibold">Scenario simulator</div></div><div className="mt-5 grid gap-4"><label className="text-xs text-[#8b97a8]">Apex first-purchase rate<input type="range" min="10" max="12" step=".5" value={apex} onChange={e=>setApex(Number(e.target.value))} className="mt-2 w-full"/><span className="text-white">{apex.toFixed(1)}%</span></label><label className="text-xs text-[#8b97a8]">Consuls funded<input type="range" min="0" max="60" value={consuls} onChange={e=>setConsuls(Number(e.target.value))} className="mt-2 w-full"/><span className="text-white">{consuls}</span></label><div className="rounded-xl border border-[#3ee0c6]/20 bg-[#3ee0c6]/5 p-4"><div className="text-xs text-[#8b97a8]">Projected partner cost stress</div><div className="mt-1 text-3xl font-semibold text-[#3ee0c6]">${projected.toLocaleString(undefined,{maximumFractionDigits:0})}</div><div className="mt-1 text-xs text-[#8b97a8]">Illustrative scenario, not an accounting forecast.</div></div></div></div>
  </div>
  <div className="mt-6 grid gap-6 lg:grid-cols-3">
   <div className="card rounded-3xl p-6"><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#3ee0c6]"/><div className="font-semibold">Economics envelope</div></div><div className="mt-4 text-4xl font-semibold">9.7%</div><div className="mt-1 text-sm text-[#8b97a8]">partner cost / net GMV</div></div>
   <div className="card rounded-3xl p-6"><div className="flex items-center gap-2"><AlertTriangle size={18} className="text-[#c6a15b]"/><div className="font-semibold">Risk queue</div></div><div className="mt-4 text-4xl font-semibold">24</div><div className="mt-1 text-sm text-[#8b97a8]">flagged accounts under review</div></div>
   <div className="card rounded-3xl p-6"><div className="flex items-center gap-2"><LockKeyhole size={18} className="text-[#ff5a6a]"/><div className="font-semibold">Enforcement rule</div></div><div className="mt-4 text-sm leading-6 text-[#8b97a8]">Confirmed fraud or trading-integrity abuse can freeze both the referred account and referring partner. Appeals are human-review-only.</div></div>
  </div>
  <div className="mt-6 card rounded-3xl p-6"><div className="flex items-center justify-between"><div><div className="text-xs uppercase tracking-[.18em] text-[#8b97a8]">Fraud & abuse queue</div><div className="mt-1 text-xl font-semibold">Human review required for enforcement</div></div><div className="pill">24 flagged · 7 networks</div></div><div className="mt-5 overflow-auto"><table className="w-full text-left text-sm"><thead className="text-[#8b97a8]"><tr><th className="py-3">Risk</th><th>Type</th><th>Partner</th><th>Evidence</th><th>Status</th></tr></thead><tbody>{riskRows.map(r=><tr key={r[1]} className="border-t border-white/10"><td className="py-3 text-[#ff5a6a]">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td className="text-[#8b97a8]">{r[3]}</td><td><span className="rounded-full bg-white/5 px-2 py-1 text-xs">{r[4]}</span></td></tr>)}</tbody></table></div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-[#3ee0c6]/15 bg-[#3ee0c6]/5 p-3 text-xs text-[#8b97a8]"><b className="text-white">Family allowed.</b> Disclosure plus normal household signals do not trigger enforcement.</div><div className="rounded-xl border border-[#ff5a6a]/15 bg-[#ff5a6a]/5 p-3 text-xs text-[#8b97a8]"><b className="text-white">Confirmed abuse.</b> Freeze partner access and pending commissions across the linked network.</div><div className="rounded-xl border border-[#c6a15b]/15 bg-[#c6a15b]/5 p-3 text-xs text-[#8b97a8]"><b className="text-white">Appeal.</b> Only authorized human review can overturn an enforcement decision.</div></div></div>
 </div>
}
