'use client';
import {motion} from 'framer-motion';

const tiers=[
  ['Spark','Access','4.0% / 1.5%','/assets/tiers/06-tier-spark.png'],
  ['Catalyst','Prove','5.5% / 2.0%','/assets/tiers/07-tier-catalyst.png'],
  ['Architect','Build','7.0% / 2.5%','/assets/tiers/08-tier-architect.png'],
  ['Sovereign','Scale','8.5% / 3.0%','/assets/tiers/09-tier-sovereign.png'],
  ['Apex','Elite','10.0% / 3.5%','/assets/tiers/10-tier-apex.png'],
  ['Consul','Country Desk','Salary + Royalty','/assets/tiers/11-tier-consul.png']
] as const;

export function TierPath({compact=false}:{compact?:boolean}){
  return <div className={compact ? 'tier-path-grid tier-path-grid--compact':'tier-path-grid'}>
    {tiers.map(([name,caption,rate,image],i)=><motion.div key={name} className="tier-tile" whileHover={{y:-3}}>
      <div className="tier-art-wrap">
        <img src={image} alt={name} className="tier-art" />
        {i<tiers.length-1 && <img src="/assets/tiers/12-tier-arrow.png" alt="" className="tier-arrow" />}
      </div>
      <div className="tier-name">{name}</div>
      <div className="tier-caption">{caption}</div>
      {!compact && <div className="tier-rate">{rate}</div>}
    </motion.div>)}
  </div>
}
