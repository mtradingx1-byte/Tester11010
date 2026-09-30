'use client';
import Link from 'next/link';
import { BarChart3, ShieldCheck, MapPin, Users, AlertTriangle, ArrowRight, Crown, Gauge, BriefcaseBusiness } from 'lucide-react';
import { Calculator } from '@/components/Calculator';
import { ScoreOrb } from '@/components/ScoreOrb';
import { TierPath } from '@/components/TierPath';

const proof = [
  ['Meritocratic Progression','6 tiers, real career path',BarChart3],
  ['Quality Over Volume','Score based, not just sales',Gauge],
  ['Transparent Economics','Paid from net challenge fees',ShieldCheck],
  ['Country Leadership','Invite only Consul seats',MapPin],
  ['Built In Fraud Protection','Keep the ecosystem fair',BriefcaseBusiness],
] as const;

const bars = [18,32,26,44,52,30,60,48,66,72,58,80,48,38,62,74,52,70,46,58,80,62,72,84,56,66,74,88];

function MiniDashboard(){
  return <div className="ref-dashboard">
    <aside className="ref-side">
      <div className="ref-side__mark">A</div>
      {['Dashboard','Earnings','Analytics','Academy','Leaderboard','Resources'].map((x,i)=><div key={x} className={`ref-side__item ${i===0?'active':''}`}><span>{['◈','◫','▥','◇','◌','□'][i]}</span>{x}</div>)}
    </aside>
    <div className="ref-dash-main">
      <div className="ref-dash-top">
        <div><div className="eyebrow">PARTNER DASHBOARD</div><div className="ref-dash-title">Architect</div><small>Net Tier: Sovereign</small></div>
        <div className="ref-score-mini"><ScoreOrb score={72}/></div>
        <div className="ref-next"><strong>$8,000 / $25,000 GMV</strong><div className="ref-line"><i style={{width:'72%'}}/></div><span>How the score works →</span></div>
      </div>
      <div className="ref-kpis">
        {[
          ['$4,892','300 Earnings','+12%'],
          ['$1,120','Pending','3 orders'],
          ['42','Qualified Sales','+27%'],
          ['28%','Funded Rate','vs 12% firm'],
          ['9.1%','First Payout Rate','vs 5.4% firm'],
          ['2.3%','Refund/Chargeback','vs 2.5% firm'],
        ].map(([a,b,c])=><div key={b}><strong>{a}</strong><span>{b}</span><em>{c}</em></div>)}
      </div>
      <div className="ref-dash-bottom">
        <div className="ref-chart">
          <div className="ref-chart__head"><strong>Earnings Overview</strong><span>Last 30 days⌄</span></div>
          <div className="ref-bars">{bars.map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>
          <div className="ref-chart__dates"><span>1 Aug</span><span>8 Aug</span><span>15 Aug</span><span>22 Aug</span><span>30 Aug</span></div>
        </div>
        <div className="ref-actions"><strong>Quick Actions</strong>{['Create Campaign Link','View Commission Ledger','Request Payout','Access Partner Kit'].map(x=><button key={x}>{x}<ArrowRight size={10}/></button>)}</div>
      </div>
    </div>
  </div>;
}

export default function Partners(){
  return <main className="partners-page">
    <div className="preview-strip">AETHER PARTNER PATH · BUILD PREVIEW</div>
    <section className="reference-hero">
      <div className="reference-hero__left">
        <div className="reference-hero__copy">
          <div className="eyebrow">AETHER PARTNER PATH</div>
          <h1>Stop optimizing<br/>for volume.<br/><span>Start a partner<br/>career built on quality.</span></h1>
          <p>A meritocratic partner operating system for a new class of traders, creators and institutions. Paid from net challenge fees. Trader profits stay outside the partner model.</p>
          <div className="hero-buttons"><Link href="/partners/apply" className="btn primary">Apply Now <ArrowRight size={13}/></Link><a href="#tiers" className="btn secondary">Explore the Path <ArrowRight size={13}/></a></div>
        </div>
        <img src="/assets/reference/hero-stage-approved-crop.png" className="hero-stage-approved" alt="Aether Partner Path progression"/>
        <section className="proof-strip">{proof.map(([title,sub,Icon])=><div className="proof-card" key={title}><span className="proof-icon"><Icon size={14}/></span><div><strong>{title}</strong><small>{sub}</small></div></div>)}</section>
      </div>
      <MiniDashboard/>
    </section>


    <section className="reference-grid reference-grid--middle">
      <div className="panel ref-calculator"><Calculator/></div>
      <div className="panel ref-score">
        <div className="panel-heading"><div><div className="eyebrow">PARTNER SCORE BREAKDOWN</div><h2>Partner Score Breakdown</h2><p>A 0–100 score that rewards quality, not just volume.</p></div></div>
        <div className="score-main"><ScoreOrb score={72}/><div className="score-metrics">{[['Net GMV (30%)','24 / 30',80],['Funded Conversion (20%)','14 / 20',70],['First Payout Conversion (15%)','11 / 15',73],['Integrity (20%)','16 / 20',80],['Mix Quality (10%)','5 / 10',50],['Consistency (5%)','2 / 5',40]].map(([a,b,w])=><div key={a}><span>{a}</span><i><b style={{width:`${w}%`}}/></i><strong>{b}</strong></div>)}</div></div>
        <div className="score-note">Updated daily · Rolling 90 days · Compared to firm baseline</div>
      </div>
      <div className="panel ref-consul">
        <div className="panel-heading"><div><div className="eyebrow">CONSUL PROGRAMME</div><h2>Consul Programme</h2><p>One country. One seat. A real business development role.</p></div></div>
        <div className="consul-body"><img src="/assets/reference/consul-globe-approved-crop.png" alt="Country globe"/><div className="consul-points"><div><Crown size={14}/><span><strong>Monthly Salary</strong><small>$800 – $2,200</small></span></div><div><MapPin size={14}/><span><strong>Partner-Originated Royalty</strong><small>Scales by sale region and ticket size · capped at 1.5× salary</small></span></div><div><Gauge size={14}/><span><strong>Quarterly MBO</strong><small>Up to 15% of salary</small></span></div><div><BriefcaseBusiness size={14}/><span><strong>Exclusive Country Seat</strong><small>Only 1 funded seat per country</small></span></div><div><ShieldCheck size={14}/><span><strong>Full Partner Support</strong><small>Recruit, develop, grow</small></span></div></div></div>
        <Link href="/consul" className="btn primary btn-wide">View Country Map <ArrowRight size={13}/></Link>
      </div>
    </section>

    <section id="tiers" className="reference-grid reference-grid--bottom">
      <div className="panel ref-tier"><div className="panel-heading"><div><div className="eyebrow">TIER PROGRESSION</div><h2>Tier Progression</h2><p>A clear path. Higher quality. Greater opportunity.</p></div></div><TierPath compact/></div>
      <div className="panel ref-fraud"><div className="panel-heading"><div><div className="eyebrow">FRAUD PROTECTION</div><h2>Fraud Protection</h2><p>A fair ecosystem for serious partners.</p></div></div><div className="fraud-items"><div><ShieldCheck size={15}/><span><strong>Advanced Detection</strong><small>Behavioural · device · payment analysis</small></span></div><div><Users size={15}/><span><strong>Family Members Allowed</strong><small>Clear disclosure, no issue</small></span></div><div><AlertTriangle size={15}/><span><strong>Strict Enforcement</strong><small>Confirmed abuse can freeze the network</small></span></div></div><img className="fraud-art-approved" src="/assets/reference/fraud-shield-approved-crop.png" alt="Fraud shield"/></div>
      <div className="panel ref-admin"><div className="admin-head"><div><div className="eyebrow">ADMIN CONSOLE (PREVIEW)</div><h2>Admin Console <span>(Preview)</span></h2><p>Full control, full transparency.</p></div><span className="date-pill">Last 30 days⌄</span></div><div className="admin-tabs"><span>Economics</span><span>Partner Management</span><span className="active">Fraud &amp; Risk</span><span>Consul Seats</span><span>Score Settings</span></div><div className="admin-main"><div><h3>Fraud &amp; Risk Monitoring</h3><div className="admin-summary"><span>AI Flags <b>12</b></span><span>Under Review <b>4</b></span><span>Actioned <b>8</b></span></div><div className="admin-table"><div><span>ID</span><span>Type</span><span>Partner</span><span>Trader</span><span>Risk Score</span><span>Status</span></div><div><span>#A1284</span><span>Multi-account</span><span>PTR-428</span><span>TR-9912</span><em>96</em><b>Frozen</b></div><div><span>#A1253</span><span>Payment abuse</span><span>PTR-317</span><span>TR-8821</span><em>88</em><i>Under review</i></div></div></div></div></div>
    </section>
  </main>
}
