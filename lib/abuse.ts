export type RiskEventType='SELF_REFERRAL'|'ACCOUNT_FRAUD'|'TRADING_INTEGRITY'|'CHARGEBACK_RING'|'DEVICE_CLUSTER'|'PAYMENT_CLUSTER'|'FAMILY_LINK';
export type ReviewStatus='pending'|'confirmed'|'overturned'|'cleared';
export type RiskEvent={id:string;type:RiskEventType;risk:number;partnerId:string;traderId:string;householdDisclosed:boolean;status:ReviewStatus;notes:string};
export function shouldFreezeFromConfirmedAbuse(event:RiskEvent){
  if(event.status!=='confirmed') return false;
  return ['SELF_REFERRAL','ACCOUNT_FRAUD','TRADING_INTEGRITY','CHARGEBACK_RING'].includes(event.type);
}
export function familyDisclosureAllowed(event:RiskEvent){return event.type==='FAMILY_LINK'&&event.householdDisclosed;}
export function partnerImpactForConfirmedTraderAbuse(event:RiskEvent){
  if(!shouldFreezeFromConfirmedAbuse(event)) return {freeze:false,reason:'No automatic partner freeze'};
  return {freeze:true,reason:'Confirmed fraud/integrity abuse on a referred account. Partner access and pending commissions are frozen pending human review.'};
}
