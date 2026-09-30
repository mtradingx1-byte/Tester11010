export type TierKey='spark'|'catalyst'|'architect'|'sovereign'|'apex'|'consul';
export const TIERS = {
  spark:{label:'Spark',first:.04,repeat:.015,floor:2,cap:40,minScore:0,minGMV:0},
  catalyst:{label:'Catalyst',first:.055,repeat:.02,floor:2.5,cap:55,minScore:40,minGMV:2500},
  architect:{label:'Architect',first:.07,repeat:.025,floor:3,cap:70,minScore:55,minGMV:8000},
  sovereign:{label:'Sovereign',first:.085,repeat:.03,floor:3.5,cap:85,minScore:70,minGMV:25000},
  apex:{label:'Apex',first:.10,repeat:.035,floor:4,cap:100,minScore:85,minGMV:60000},
  consul:{label:'Consul',first:.10,repeat:.035,floor:4,cap:100,minScore:90,minGMV:90000},
} as const;
export const CATALOG = {
  '2-Step Pro':{5000:29,10000:55,25000:134,50000:224,100000:422,200000:844},
  '2-Step Standard':{5000:34,10000:63,25000:168,50000:285,100000:522},
  '2-Step Flex':{5000:32,10000:59,25000:159,50000:269,100000:499},
  '1-Step Flex':{5000:66,10000:99,25000:211,50000:313,100000:533},
  Zero:{5000:60,10000:88,25000:188,50000:244,100000:444,200000:888}
} as const;
export type Model=keyof typeof CATALOG;
export function qualifiedNet(input:{listPrice:number;discount:number;refunds?:number;chargebacks?:number}){return Math.max(0,input.listPrice*(1-input.discount)-(input.refunds??0)-(input.chargebacks??0));}
export function commission(input:{qualifiedNet:number;rate:number;floor:number;cap:number}){
  const raw=input.qualifiedNet*input.rate;
  const floored=Math.max(raw,input.floor);
  const capped=Math.min(floored,input.cap);
  const hardCeiling=input.qualifiedNet*.12;
  return Math.min(capped,hardCeiling);
}
export function getTier(score:number,gmv:number):TierKey{
  if(score>=85&&gmv>=60000) return 'apex';
  if(score>=70&&gmv>=25000) return 'sovereign';
  if(score>=55&&gmv>=8000) return 'architect';
  if(score>=40&&gmv>=2500) return 'catalyst';
  return 'spark';
}
export function qualityAdjustment(flags:{fundedRate:number;firmFundedRate:number;firstPayoutRate:number;firmFirstPayoutRate:number;refundChargebackRate:number}){
  if(flags.refundChargebackRate>0.08) return {adjustment:-1,freeze:true};
  if(flags.refundChargebackRate>0.04) return {adjustment:-2,freeze:false};
  let adjustment=0;
  if(flags.fundedRate>=flags.firmFundedRate*1.25) adjustment+=1;
  if(flags.firstPayoutRate>=flags.firmFirstPayoutRate*1.25) adjustment+=.5;
  return {adjustment,freeze:false};
}
