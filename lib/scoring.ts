export type PartnerMetrics={qualifiedGMV:number;fundedRate:number;firstPayoutRate:number;integrityRate:number;averageOrderValue:number;activeWeeks:number;firmFundedRate:number;firmFirstPayoutRate:number;firmAOV:number};
function ratioScore(actual:number,baseline:number,weight:number){
  const r=baseline>0?actual/baseline:0;
  const points=r<=0?0:Math.min(100,30+Math.max(0, r-0.5)*80);
  return points/100*weight;
}
export function partnerScore(m:PartnerMetrics){
  const gmv = Math.min(100,(m.qualifiedGMV/60000)*100)*.30;
  const funded = ratioScore(m.fundedRate,m.firmFundedRate,.20);
  const payout = ratioScore(m.firstPayoutRate,m.firmFirstPayoutRate,.15);
  const integrity = Math.max(0,Math.min(100,m.integrityRate))*0.20;
  const mix = Math.min(100,(m.averageOrderValue/m.firmAOV)*70)*.10;
  const consistency = Math.min(100,(m.activeWeeks/13)*100)*.05;
  return Math.round((gmv+funded+payout+integrity+mix+consistency)*10)/10;
}
