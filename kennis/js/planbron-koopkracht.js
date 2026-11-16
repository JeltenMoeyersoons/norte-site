/* Norte-planbron, educatieve uitsnede voor Norte Kennis (4 november 2026). Rendementsaanname bijgewerkt in 2026-11.1.
   Bron (read-only): actuele-klantflow/KlantflowComfort047648caeb.dc.html
   sha256 047648caeb259cc21d339079c96b730a12fbdd6ddb8c64bd83970a0cfd441978.
   Letterlijk overgenomen tekenbereiken (Unicode-tekens, Python str-index) van die bron, in deze volgorde:
     [594482, 594662)  MARKET (vlak marktpad van de maandmotor)
     [596528, 620873)  CRISES, PlanEngine en PlanJourney
     [760978, 793882)  M27 (rekenkern), B26-constanten, Bron27 en B27_PROFIELEN
   Daarna één educatieve adapter: dezelfde vertaling plan → rekenkern als BRIDGE.reken in de bron
   (vrije doelen; zonder dossier, fiscaal sparen of klantstand), met een fictief voorbeelddoel.
   Buiten metRekenkern() blijft BRIDGE leeg, zodat de koopkrachtlijn exact rekent zoals voorheen. */
window.NortePlanbron = (function () {
// 2026-11.1 · Geannualiseerde Amerikaanse aandelenramingen, omgerekend naar een eurobasis.
// Horizon 2026, 10 jaar: 6,39%. Damodaran 1-1-2026: 8,41% verwacht en 3,95% USD-basis.
// ECB AAA, 10 jaar, 31-12-2025: 2,9480486243%. De twee risicopremies wegen elk 50%.
const NORTE_AANDELEN_NOMINAAL = 0.029480486243 + ((0.0639 - 0.0395) + (0.0841 - 0.0395)) / 2;

let BRIDGE = null;
const MARKET = { aandelen: new Array(1200).fill(0), obligaties: new Array(1200).fill(0) }; // A-K2: geen eigen marktpad in de maandmotor; het marktverloop zit in de rekenkernreeks
const CRISES={dotcom:{v:'Lange daling',n:'Dotcomcrash',j:'2000–2002',a:45,o:0,m:30,t:'Lange, geleidelijke daling van aandelen. Obligaties dalen niet mee.'},krediet:{v:'Diepe daling',n:'Financiële crisis',j:'2007–2009',a:50,o:0,m:17,t:'Diepe daling van aandelen in anderhalf jaar. Obligaties dalen niet mee.'},corona:{v:'Snelle schok',n:'Coronacrisis',j:'2020',a:30,o:0,m:2,t:'Zeer snelle daling van aandelen in enkele weken.'},oekraine:{v:'Aandelen en obligaties samen',n:'Oorlog in Oekraïne en rentestijging',j:'2022',a:20,o:15,m:10,t:'Aandelen én obligaties dalen samen door de snelle rentestijging.'},brexit:{v:'Korte schok',n:'Brexit-referendum',j:'2016',a:8,o:0,m:1,t:'Korte schok op aandelen; voor een wereldwijde spreiding beperkt.'},handel:{v:'Daling over één kwartaal',n:'Handelsoorlog',j:'2018',a:15,o:0,m:3,t:'Daling van aandelen over één kwartaal door handelsspanningen.'}};
const CRISIS_ORDE=['krediet','dotcom','corona','oekraine','handel','brexit'];
const PlanEngine=(()=>{
 let START=40;const S0=()=>START;const setStart=a=>{START=Math.max(18,Math.min(89,Math.round(a||40)));};
 const ORDER=['sparen','defensief','neutraal','dynamisch','agressief'];const capProfile=(p,cap)=>!cap||ORDER.indexOf(p)<=ORDER.indexOf(cap)?p:cap;
 const MIX={sparen:0,defensief:.3,neutraal:.5,dynamisch:.8,agressief:1};
 const clone=x=>JSON.parse(JSON.stringify(x));
 const initial=()=>({version:1,goals:[],scenario:{market:'basis',shockAge:START+7,shock:30,extraReturn:2,entry:0,ongoing:0,inflation:2,death:false,deathAge:START+15,cover:0,income:false,incomeGoal:'',incomeStart:START+15,incomeEnd:START+25,incomeMonthly:500,indexIncome:false,pause:false,pauseStart:START+5,pauseEnd:START+7},assets:[],savingsRate:.86,real:false});
 const defaultPhases=(h,cap)=>{const p=[];let prev;for(let age=S0();age<h;age++){const left=h-age,profile=capProfile(left<3?'sparen':left<8?'defensief':left<15?'neutraal':left<25?'dynamisch':'agressief',cap);if(profile!==prev){p.push({profile,end:h});if(p.length>1)p[p.length-2].end=age;prev=profile;}}return p;};
 const isDefault=g=>g.approach!=='eigen';
 function horizon(g,h){const eigen=g.approach==='eigen'&&Array.isArray(g.phases)&&g.phases.length;g.horizon=Math.max(S0()+1,Math.min(90,Math.round(h)));if(!eigen){g.phases=[];g.approach='norte';}else{g.phases=g.phases.filter((p,i)=>i===0||g.phases[i-1].end<g.horizon);g.phases[g.phases.length-1].end=g.horizon;}g.incomeEnd=Math.max(g.horizon+1,g.incomeEnd||0);}
 function splitPhase(g,index){const p=g.phases[index],start=index?g.phases[index-1].end:S0();if(!p||p.end-start<2)return false;const end=p.end;p.end=Math.floor((start+end)/2);g.phases.splice(index+1,0,{profile:p.profile,end});g.approach='eigen';return true;}
 function mergePhase(g,index){if(g.phases.length<2||!g.phases[index])return false;if(index>0)g.phases[index-1].end=g.phases[index].end;g.phases.splice(index,1);g.approach='eigen';return true;}
 function phaseBounds(g,index){return {min:(index?g.phases[index-1].end:S0())+1,max:index===g.phases.length-1?90:g.phases[index+1].end-1};}
 function setPhase(g,index,kind,value){
  const p=g.phases[index];if(!p)return false;
  if(kind==='profile'){if(!(value in MIX))return false;p.profile=value;g.approach='eigen';return true;}
  if(kind!=='end'||!Number.isFinite(Number(value)))return false;
  const bounds=phaseBounds(g,index),end=Math.max(bounds.min,Math.min(bounds.max,Math.round(Number(value))));g.approach='eigen';
  if(index===g.phases.length-1)horizon(g,end);else p.end=end;return true;
 }
 function assetAt(a,age,s){const years=Math.max(0,age-S0()),pension=a.type==='groepsverzekering',growth=1+(a.growth||0)/100,stop=pension?Math.min(age,a.availableAge||67,s.death?s.deathAge:90):age,months=Math.max(0,Math.round((stop-S0())*12)),rate=Math.pow(growth,1/12);let value=(a.value-(a.allocated||0))*Math.pow(growth,pension?Math.max(0,stop-S0()):years);if(pension&&(a.monthly||0)){value+=(a.monthly||0)*(Math.abs(rate-1)<1e-10?months:(Math.pow(rate,months)-1)/(rate-1));}value-=a.debt||0;const category=pension?(s.death&&age>=s.deathAge?'contract':age>=(a.availableAge||67)?'voorwaarden':'later'):a.liquidity==='nu'||(a.liquidity==='later'&&age>=a.availableAge)?'vrij':a.liquidity==='later'?'later':'vast';return {value,category,available:category==='vrij',gross:pension,unmodeledDeath:pension&&s.death&&age>=s.deathAge};}
 const profile=(g,a)=>g.phases.find(p=>a<p.end-1e-7)?.profile||'sparen';
 function computeMotor(plan,options={}){
  const s=options.noScenario?{...initial().scenario,inflation:plan.scenario.inflation}:plan.scenario;
  const end=Math.min(Math.max(95,...plan.goals.map(g=>g.destination==='inkomen'?(g.incomeEnd||0)+2:0)),Math.max(S0()+10,65,plan.extraEnd||0,...plan.goals.map(g=>Math.max(g.horizon+3,g.destination==='inkomen'?g.incomeEnd:0)),s.income?s.incomeEnd+2:0,s.death?s.deathAge+3:0,...plan.assets.map(a=>a.availableAge||S0())));
  const totals=[],gs=plan.goals.map(g=>({id:g.id,points:[],atGoal:0,paid:0,paidReal:0,shortfall:0,firstShortfall:null,contributed:g.lump,contributedAtGoal:g.lump}));
  const savingsOnly=g=>options.savings==='all'||options.savings===g.id;
  let balances=plan.goals.map(g=>g.lump*(1-(savingsOnly(g)||g.existingReserve?0:s.entry)/100)),reserve=0;
  for(let m=0;m<=(end-S0())*12;m++){
   const age=S0()+m/12,prev=age-1/12;
   if(m>0){
    if(s.death&&Math.round((s.deathAge-S0())*12)===m)reserve+=s.cover;
    reserve*=Math.pow(1+plan.savingsRate/100,1/12);
    plan.goals.forEach((g,i)=>{
     let p=profile(g,prev),saving=options.savings==='all'||options.savings===g.id||p==='sparen';
     if(prev>=g.horizon)p='sparen',saving=true;
     const w=MIX[p],r=saving?(savingsOnly(g)?options.savingsRate??plan.savingsRate:plan.savingsRate)/100:w*NORTE_AANDELEN_NOMINAAL+(1-w)*.0302;
     const swing=saving?0:w*MARKET.aandelen[m-1]+(1-w)*MARKET.obligaties[m-1];
     const optimistic=!saving&&s.market==='optimistisch'?s.extraReturn/100:0;
     balances[i]*=Math.exp((Math.log(1+r)+Math.log(1+optimistic)-(savingsOnly(g)?0:s.ongoing)/100)/12+swing);
     if(!saving&&s.market==='stress')balances[i]*=crisisF(s,m,w);
     if(prev<g.horizon-1e-7&&!(s.death&&age>=s.deathAge)&&!(s.pause&&prev>=s.pauseStart&&prev<s.pauseEnd)&&!(g.pause&&prev>=g.pauseStart&&prev<g.pauseEnd)){
      balances[i]+=g.monthly*(1-(savingsOnly(g)?0:s.entry)/100);gs[i].contributed+=g.monthly;
     }
     if(g.extra&&m===Math.round((g.extraAge-S0())*12)&&age<=g.horizon&&!(s.death&&age>=s.deathAge)){balances[i]+=g.extraAmount*(1-(savingsOnly(g)?0:s.entry)/100);gs[i].contributed+=g.extraAmount;}
     let need=0;
     if(g.destination==='inkomen'&&prev>=g.horizon-1e-7&&prev<g.incomeEnd)need+=g.income*Math.pow(1+s.inflation/100,prev-g.horizon);
     if(s.income&&s.incomeGoal===g.id&&prev>=s.incomeStart-1e-7&&prev<s.incomeEnd)need+=s.incomeMonthly*(s.indexIncome?Math.pow(1+s.inflation/100,prev-s.incomeStart):1);
     const paid=Math.min(need,balances[i]);balances[i]-=paid;gs[i].paid+=paid;gs[i].paidReal+=paid/Math.pow(1+s.inflation/100,age-S0());gs[i].shortfall+=need-paid;
     if(need-paid>.01&&gs[i].firstShortfall===null)gs[i].firstShortfall=age;
    });
   }
   // Keep before/after observations at the same age so a payout remains a vertical cashflow.
   const snapshot=()=>{const discount=plan.real?Math.pow(1+s.inflation/100,age-S0()):1;let liquid=reserve,locked=0,later=0,conditional=0;
    const assets=plan.assets.map(a=>{const item=assetAt(a,age,s);if(item.available)liquid+=item.value;else{locked+=item.value;if(item.category==='later')later+=item.value;else conditional+=item.value;}return {...item,id:a.id,value:item.value/discount};});
    const values=balances.map(v=>v/discount),paid=gs.map(g=>plan.real?g.paidReal:g.paid);gs.forEach((g,i)=>g.points.push([age,values[i]]));totals.push({age,values,paid,contributed:gs.map(g=>g.contributed),total:values.reduce((a,b)=>a+b,0)+reserve/discount,reserve:reserve/discount,liquid:liquid/discount,locked:locked/discount,later:later/discount,conditional:conditional/discount,assets});};
   snapshot();
   let payout=false;plan.goals.forEach((g,i)=>{if(m===Math.round((g.horizon-S0())*12)){gs[i].atGoal=balances[i]/(plan.real?Math.pow(1+s.inflation/100,age-S0()):1);gs[i].contributedAtGoal=gs[i].contributed;if(g.destination==='uitbetaling'){gs[i].paid+=balances[i];gs[i].paidReal+=balances[i]/Math.pow(1+s.inflation/100,age-S0());balances[i]=0;payout=true;}}});
   if(payout)snapshot();
  }
  return {end,totals,goals:gs};
 }
 const INFL=2; // inflatie van de rekenkern (M27 INFLATIE 0.02)
 const AANNAMEN='PROTO-AANNAMEN v1 (26-10-2026)'; // zie AANNAMEN-MAPPING.md; vervangpunt: de rekenkern (REKENBRON) kent deze parameters nog niet
 const waardeOp=(p,l)=>{if(!p||!p.length)return 0;if(l<=p[0][0])return p[0][1];for(let i=1;i<p.length;i++)if(l<=p[i][0]){const a=p[i-1],b=p[i];const t=(l-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*t;}return p[p.length-1][1];};
 const phasesVan=(d,g)=>{const gp=(d&&d.glijpad)||[];if(!gp.length)return [{profile:(d&&d.eerste_profiel)||'sparen',end:g.horizon}];return gp.map((w,k)=>({profile:w[1],end:k+1<gp.length?gp[k+1][0]:g.horizon}));};
 // Eén rekenbetekenis per uitkomst:
 //  - bewaard plan en voorstel zonder verkenning = de Norte-rekenkern (BRIDGE.reken), letterlijk gelijk aan stap 04;
 //  - een verkenning (eigen aanpak per doel, marktverloop, kosten, tijdelijke opname, inlegpauze, extra storting, andere inflatie bij opnames)
 //    = de V12-maandmotor, GEIJKT op de rekenkernreeks: per doel en per maand geldt verkenning = rekenkern × (maandmotor met verkenning ÷ maandmotor zonder verkenning).
 //    Zonder verkenning is die factor 1, dus nooit een onzichtbare basismismatch (A-K1). De maandmotor heeft geen eigen marktpad (A-K2).
 //  - spaarvergelijking = V12-spaarrekening met vaste rente op dezelfde inleg en opnames; koopkracht = gedeelde inflatie (A-K3).
 /* 40 · maandfactor van een (illustratieve) crisis op het belegde deel; w = aandelendeel. Eigen daling = de bestaande eenmalige schok. */
 function crisisF(s,m,w){const m0=Math.round((s.shockAge-S0())*12);const C=s.crisis&&s.crisis!=='eigen'?CRISES[s.crisis]:null;if(!C)return m===m0?1-(s.shock||0)/100*w:1;if(m<m0||m>=m0+C.m)return 1;const fa=Math.pow(1-C.a/100,1/C.m),fo=Math.pow(1-(C.o||0)/100,1/C.m);return Math.max(0,1-w*(1-fa)-(w>0?(1-w)*(1-fo):0));}
 const motorPlan=(plan,ds,gs,basis,s)=>{const p=clone(plan);p.real=false;p.scenario=basis?{...initial().scenario,inflation:INFL}:{...s};delete p.scenario.stand;
  p.goals.forEach((g,i)=>{const d=ds[i];const eigen=g.approach==='eigen'&&Array.isArray(g.phases)&&g.phases.length;g.phases=basis||!eigen?phasesVan(d,g):g.phases;g.monthly=gs[i].maand;g.lump=g.lump||0;
   if(g.destination==='inkomen'){const opn=d?d.opname_maand||0:0,eind=d?d.staart_eind_leeftijd||g.horizon+1:g.horizon+1;g.income=basis||!g.incomeEigen?opn:(g.income||0);g.incomeEnd=basis||!g.incomeEigen?eind:(g.incomeEnd||eind);}
   if(basis){g.extra=false;g.pause=false;}});return p;};
 function compute(plan,options={}){
  const S=S0(),s=options.noScenario?{...initial().scenario,inflation:plan.scenario.inflation}:plan.scenario,infl=Number.isFinite(s.inflation)?s.inflation:INFL,sav=g=>options.savings==='all'||options.savings===g.id;
  const rk=BRIDGE&&BRIDGE.reken?BRIDGE.reken(plan.goals,s.stand||null):null;
  const ds=plan.goals.map(g=>rk&&rk.ok?(rk.data.doelen.find(x=>x.pid===g.id)||null):null);
  const gs=plan.goals.map((g,i)=>({id:g.id,points:[],atGoal:0,paid:0,paidReal:0,shortfall:0,firstShortfall:null,contributed:g.lump,contributedAtGoal:g.lump,phases:g.approach==='eigen'&&g.phases&&g.phases.length?g.phases:phasesVan(ds[i],g),maand:ds[i]?ds[i].maand:(g.monthly||0),maandExact:ds[i]?ds[i].maand_exact:(g.monthly||0),opname:ds[i]?ds[i].opname_maand||0:0,opnameEind:ds[i]?ds[i].staart_eind_leeftijd:null,doelbedrag:ds[i]?ds[i].doel_bedrag:null,ok:!!ds[i],reden:rk&&!rk.ok?rk.reden||'':'',eigen:g.approach==='eigen'}));
  const heeftInkomen=plan.goals.some(g=>g.destination==='inkomen');
  const verk=plan.goals.some(g=>(g.approach==='eigen'&&g.phases&&g.phases.length)||g.extra||g.pause||(g.destination==='inkomen'&&g.incomeEigen))||s.market!=='basis'||!!s.entry||!!s.ongoing||!!s.income||!!s.pause||!!s.death||(heeftInkomen&&infl!==INFL);
  const redenen=[];if(plan.goals.some(g=>g.approach==='eigen'&&g.phases&&g.phases.length))redenen.push('eigen aanpak per doel');if(plan.goals.some(g=>g.extra))redenen.push('extra storting');if(plan.goals.some(g=>g.pause)||s.pause)redenen.push('inlegpauze');if(plan.goals.some(g=>g.destination==='inkomen'&&g.incomeEigen))redenen.push('eigen opname');if(s.market!=='basis')redenen.push(s.market==='stress'?(s.crisis&&s.crisis!=='eigen'&&CRISES[s.crisis]?'illustratieve stress ('+CRISES[s.crisis].n.toLowerCase()+')':'marktstress'):'gunstiger markt');if(s.entry||s.ongoing)redenen.push('kosten');if(s.income)redenen.push('tijdelijke opname');if(s.death)redenen.push('overlijden');if(heeftInkomen&&infl!==INFL)redenen.push('inflatie '+infl+' % bij opnames');
  let rB=null,rS=null;if(verk&&rk&&rk.ok){rB=computeMotor(motorPlan(plan,ds,gs,true,s),{});rS=computeMotor(motorPlan(plan,ds,gs,false,s),{});}
  const end=Math.min(Math.max(95,...plan.goals.map(g=>g.destination==='inkomen'?(g.incomeEnd||0)+2:0)),Math.max(S+10,65,plan.extraEnd||0,...plan.goals.map((g,i)=>Math.max(g.horizon+3,ds[i]&&ds[i].staart==='afbouw'?ds[i].staart_eind_leeftijd||0:0,g.destination==='inkomen'?g.incomeEnd||0:0)),s.income?s.incomeEnd+2:0,s.death?s.deathAge+3:0,...plan.assets.map(a=>a.availableAge||S)));
  const totals=[],rate=(options.savingsRate??plan.savingsRate)/100,spaar=plan.goals.map(g=>sav(g)?g.lump:null),dep=plan.goals.map(()=>false);let reserve=0;const disc=age=>plan.real?Math.pow(1+infl/100,age-S):1;
  const motorAt=(r,age,after)=>r?E_at(r,age,after):null;
  for(let m=0;m<=(end-S)*12;m++){
   const age=S+m/12,prev=age-1/12;
   if(m>0){if(s.death&&Math.round((s.deathAge-S)*12)===m)reserve+=s.cover||0;reserve*=Math.pow(1+plan.savingsRate/100,1/12);
    plan.goals.forEach((g,i)=>{const d=ds[i];if(!d)return;const pauze=(s.pause&&prev>=s.pauseStart&&prev<s.pauseEnd)||(g.pause&&prev>=g.pauseStart&&prev<g.pauseEnd);const inleg=prev<g.horizon-1e-7&&!(s.death&&age>=s.deathAge)&&!pauze;if(inleg&&!rS)gs[i].contributed+=gs[i].maand;
     let opname=0;if(g.destination==='inkomen'&&Number.isFinite(g.incomeMonthly)){if(prev>=g.horizon-1e-7&&prev<(g.incomeEnd||g.horizon+1)-1e-7&&!(s.death&&prev>=s.deathAge))opname=g.incomeMonthly*Math.pow(1+(g.incomeIndexed===false?0:infl)/100,prev-g.horizon);}else if(d.staart==='afbouw'&&prev>=d.doel_leeftijd-1e-7&&prev<d.staart_eind_leeftijd)opname=(d.opname_maand||0)*Math.pow(1+infl/100,prev-d.doel_leeftijd);/* Y1: de vergelijking gebruikt exact de afgesproken opname *//* A-K3: ook de spaarvergelijking indexeert opnames met de gedeelde inflatie */
     if(spaar[i]!==null){spaar[i]*=Math.pow(1+rate,1/12);if(inleg)spaar[i]+=gs[i].maand;if(g.extra&&m===Math.round((g.extraAge-S)*12)&&age<=g.horizon)spaar[i]+=g.extraAmount||0;const paid=Math.min(opname,spaar[i]);spaar[i]-=paid;gs[i].paid+=paid;gs[i].paidReal+=paid/Math.pow(1+infl/100,age-S);gs[i].shortfall+=opname-paid;if(opname-paid>.01&&gs[i].firstShortfall===null)gs[i].firstShortfall=age;}
     else if(opname&&!rS){gs[i].paid+=opname;gs[i].paidReal+=opname/Math.pow(1+infl/100,age-S);}});}
   const balanceAt=(i,after)=>{const d=ds[i];if(!d)return 0;const g=plan.goals[i];if(spaar[i]!==null)return (d.staart==='uitbetaling'&&Math.abs(age-g.horizon)<1e-6&&after)?0:Math.max(0,spaar[i]);
    let M=(d.staart==='uitbetaling'&&Math.abs(age-g.horizon)<1e-6)?(after?0:d.doel_bedrag):Math.max(0,waardeOp(d.punten,age));
    if(rS){const b=motorAt(rB,age,after),v=motorAt(rS,age,after);const vb=b?b.values[i]:0,vs=v?v.values[i]:0;if(vs<=1&&vb>1)dep[i]=true;else if(vs>1)dep[i]=false;M=vb>1?M*vs/vb:(dep[i]?0:Math.max(0,M+(vs-vb)));/* A-K1: na uitputting door de verkenning blijft het saldo 0, ook als de maandmotor-basis zelf leegloopt */}
    return M;};
   const snapshot=(after)=>{const discount=disc(age);let liquid=reserve,locked=0,later=0,conditional=0;
    const assets=plan.assets.filter(a=>Number.isFinite(a.value)).map(a=>{const item=assetAt(a,age,s);if(item.available)liquid+=item.value;else{locked+=item.value;if(item.category==='later')later+=item.value;else conditional+=item.value;}return {...item,id:a.id,value:item.value/discount};});
    const values=plan.goals.map((g,i)=>balanceAt(i,after)/discount);let paid=gs.map(g=>plan.real?g.paidReal:g.paid),contributed=gs.map(g=>g.contributed);
    if(rS){const v=motorAt(rS,age,after);if(v){paid=plan.goals.map((g,i)=>spaar[i]!==null?paid[i]:(plan.real?v.paid[i]/discount:v.paid[i]));contributed=v.contributed;}}
    gs.forEach((g,i)=>g.points.push([age,values[i]]));totals.push({age,values,paid,contributed,total:values.reduce((a,b)=>a+b,0)+reserve/discount,reserve:reserve/discount,liquid:liquid/discount,locked:locked/discount,later:later/discount,conditional:conditional/discount,assets});};
   snapshot(false);
   let payout=false;plan.goals.forEach((g,i)=>{if(m===Math.round((g.horizon-S)*12)&&ds[i]){const bal=balanceAt(i,false);gs[i].atGoal=bal/disc(age);gs[i].contributedAtGoal=rS?(motorAt(rS,age,false)||{contributed:gs.map(x=>x.contributed)}).contributed[i]:gs[i].contributed;if(ds[i].staart==='uitbetaling'){if(spaar[i]!==null){gs[i].paid+=bal;gs[i].paidReal+=bal/Math.pow(1+infl/100,age-S);spaar[i]=0;}payout=true;}}});
   if(payout)snapshot(true);
  }
  if(rS)rS.goals.forEach((g,i)=>{if(spaar[i]===null){gs[i].paid=g.paid;gs[i].paidReal=g.paidReal;gs[i].shortfall=g.shortfall;gs[i].firstShortfall=g.firstShortfall;gs[i].contributed=g.contributed;}});
  /* Y1 (37): één afgesproken maandopname per doel. De groei in de opnamefase volgt de rekenkernreeks van datzelfde doel (die met haar eigen berekende opname rekent); daarna geldt de afgesproken opname. Na de rekenkernperiode: spaarrente, zoals de maandmotor na de doeldatum. Kosten, markt en overlijden werken op dezelfde maandstappen. Wat overblijft blijft staan, ook na de eindleeftijd. Benadering (geen tweede rekenmodel, geen nieuw rendement). */
 plan.goals.forEach((g,i)=>{const d=ds[i];if(!d||spaar[i]!==null||g.destination!=='inkomen'||!Number.isFinite(g.incomeMonthly))return;const st=g.horizon,eind=Math.max(st+1/12,g.incomeEnd||st+1),ix=g.incomeIndexed===false?0:infl,ref=a=>Math.max(0,waardeOp(d.punten,a)),refW=a=>d.staart==='afbouw'&&a>=d.doel_leeftijd-1e-7&&a<d.staart_eind_leeftijd?(d.opname_maand||0)*Math.pow(1+INFL/100,a-d.doel_leeftijd):0;const mixOp=a=>{let p='sparen';for(const w of (d.afbouw_glijpad||[]))if(w[0]<=a+1e-9)p=w[1];return MIX[p]||0;},ref0=ref(st),mShock=Math.round((s.shockAge-S)*12);let bal=null,last=null,paid=0,short=0,first=null,lastGr=null;for(const pt of totals){const a=pt.age;if(a<st-1e-7)continue;if(bal===null){bal=pt.values[i]*disc(a);last=a;}else if(a>last+1e-9){const dt=a-last,a0=last,r0=ref(a0);let gr;if(a0<d.staart_eind_leeftijd-1e-7&&r0>Math.max(.01,ref0*.02)){gr=(ref(a)+refW(a0)*dt*12)/r0;lastGr=Math.pow(gr,1/dt);}else gr=a0<d.staart_eind_leeftijd-1e-7&&lastGr!==null?Math.pow(lastGr,dt):Math.pow(1+plan.savingsRate/100,dt);const mx=mixOp(a0);gr*=Math.exp(-(s.ongoing||0)/100*dt);if(s.market==='optimistisch'&&mx>0)gr*=Math.pow(1+(s.extraReturn||0)/100,dt);bal=Math.max(0,bal*gr);if(s.market==='stress')bal*=crisisF(s,Math.round((a-S)*12),mx);const need=(s.death&&a0>=s.deathAge-1e-7)||a0>=eind-1e-7?0:g.incomeMonthly*Math.pow(1+ix/100,a0-st)*dt*12,out=Math.min(bal,need);bal-=out;paid+=out;short+=need-out;if(need-out>.01&&first===null)first=a;last=a;}const v=bal/disc(a);pt.total+=v-pt.values[i];pt.values[i]=v;if(pt.paid)pt.paid[i]=paid/disc(a);}gs[i].points=totals.map(p=>[p.age,p.values[i]]);gs[i].paid=paid;gs[i].shortfall=short;gs[i].firstShortfall=first;gs[i].opnameRk=d.opname_maand||0;gs[i].opname=g.incomeMonthly;gs[i].opnameEind=g.incomeEnd;gs[i].incomeIndexed=g.incomeIndexed!==false;});
 return {end,totals,goals:gs,rekenkern:!!(rk&&rk.ok),reden:rk&&!rk.ok?rk.reden||'':'',aannamen:verk,redenen,versie:AANNAMEN};
 }
 const E_at=(r,age,after=true)=>{const points=r.totals.filter(p=>Math.abs(p.age-age)<1e-6);return points.length?(after?points.at(-1):points[0]):r.totals.find(p=>p.age>=age)||r.totals.at(-1);};
 const at=(r,age,after=true)=>{const points=r.totals.filter(p=>Math.abs(p.age-age)<1e-6);return points.length?(after?points.at(-1):points[0]):r.totals.find(p=>p.age>=age)||r.totals.at(-1);};
 return {MIX,ORDER,initial,clone,defaultPhases,isDefault,splitPhase,mergePhase,phaseBounds,setPhase,assetAt,at,horizon,profile,compute,computeMotor,setStart,S0,INFL,waardeOp,AANNAMEN};
})();


/* Additional prototype semantics. No tax rates, product eligibility or contract return assumptions. */
const PlanJourney=(()=>{
 const copy=x=>JSON.parse(JSON.stringify(x));
 const fiscalExample=()=>[]; // geen fictieve contracten: bestaande contracten komen uit het dossier
 function enrich(p){p=copy(p);p.fiscal??=fiscalExample();p.planRevision??=1;const S=PlanEngine.S0();for(const g of p.goals){for(const [k,v] of Object.entries({extraAmount:10000,extraAge:Math.min(S+5,g.horizon),pauseStart:S+5,pauseEnd:S+7}))g[k]??=v;}return p;}
 function clean(p){const out=enrich(p),inflation=out.scenario.inflation;out.scenario={...PlanEngine.initial().scenario,inflation};return out;}
 function fiscalAt(plan,age){return plan.fiscal.map(f=>({...f,premiums:f.paid+Math.max(0,Math.round((Math.min(age,f.stopAge,plan.scenario.death?plan.scenario.deathAge:90)-PlanEngine.S0())*12))*f.monthly}));}
 // Same contribution dates and scheduled withdrawals as the plan; each contribution preserves its own purchasing power.
 function preservation(plan){
  const E=PlanEngine,S=E.S0(),sc=plan.scenario,res=E.compute(plan),end=res.end,infl=Number.isFinite(sc.inflation)?sc.inflation:E.INFL,rate=Math.pow(1+infl/100,1/12),balance=plan.goals.map(g=>g.lump),paid=balance.map(()=>0),totals=[],goals=plan.goals.map(g=>({id:g.id,atGoal:0}));
  for(let m=0;m<=(end-S)*12;m++){
   const age=S+m/12,prev=age-1/12,discount=plan.real?Math.pow(1+infl/100,age-S):1;
   if(m>0)plan.goals.forEach((g,i)=>{const rg=res.goals[i];balance[i]*=rate;if(prev<g.horizon-1e-7&&!(sc.death&&age>=sc.deathAge))balance[i]+=rg.maand;
    let withdrawal=0;if(g.destination==='inkomen'&&rg.opnameEind&&prev>=g.horizon-1e-7&&prev<rg.opnameEind&&!(sc.death&&prev>=sc.deathAge))withdrawal+=rg.opname*Math.pow(1+(g.incomeIndexed===false?0:infl)/100,prev-g.horizon);
    balance[i]=Math.max(0,balance[i]-withdrawal);paid[i]+=withdrawal;});
   const snapshot=()=>totals.push({age,values:balance.map(v=>v/discount),total:balance.reduce((a,b)=>a+b,0)/discount,paid:paid.map(v=>v/discount)});snapshot();
   let payout=false;plan.goals.forEach((g,i)=>{if(m===Math.round((g.horizon-S)*12)){goals[i].atGoal=balance[i]/discount;if(g.destination==='uitbetaling'){paid[i]+=balance[i];balance[i]=0;payout=true;}}});if(payout)snapshot();
  }return {end,totals,goals};
 }
 function changes(base,draft){const a=enrich(base),b=enrich(draft);return b.goals.filter(g=>JSON.stringify(g)!==JSON.stringify(a.goals.find(x=>x.id===g.id))).map(g=>g.id);}
 function adopt(base,draft){const out=copy(base);out.goals=copy(draft.goals);out.planRevision=(base.planRevision||1)+1;return out;}
 function protectionGap(p){if(!p||![p.tax,p.liquid,p.extraCover].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0))return null;return Math.max(0,p.tax-p.liquid-p.extraCover);}
 function handoff(confirmed,discussion,wishes){return {kind:'Norte ontwerp — geen productkeuze',planRevision:confirmed.planRevision,goals:confirmed.goals.map(g=>({id:g.id,name:g.name,purpose:g.purpose,horizon:g.horizon,destination:g.destination,monthly:g.monthly,lump:g.lump,extraContribution:g.extra?{amount:g.extraAmount,age:g.extraAge}:null,contributionPause:g.pause?{start:g.pauseStart,end:g.pauseEnd}:null,income:g.destination==='inkomen'?{monthly:g.incomeMonthly,endAge:g.incomeEnd,indexed:g.incomeIndexed!==false,agreed:!!g.incomeFixed}:null,phases:copy(g.phases)})),fiscal:copy(confirmed.fiscal),otherAssets:copy(confirmed.assets),contactBeforeSwitch:!!confirmed.contactBeforeSwitch,discussion:copy(discussion),wishes:copy(wishes),limits:['Fiscale contractwaarden en rechten nog te onderbouwen','Geen erfbelastingmotor of externe verzending','Geen automatische garantie- of dekkingswens']};}
 return {copy,enrich,clean,fiscalExample,fiscalAt,preservation,changes,adopt,protectionGap,handoff};
})();


const M27 = (() => {
  // ---- marktveronderstellingen (VERSIE 2026-11.1) ----
  const INFLATIE = 0.02;
  const nom = (r) => (1.0 + r) * (1.0 + INFLATIE) - 1.0;
  const MV = { inflatie: INFLATIE, aandelen: NORTE_AANDELEN_NOMINAAL, obligaties: nom(0.010), gm: 90.0, gs: 9.5 };
  const MAX_LEEFTIJD = 110, SPAARRENTE = 0.0086, POT_JAREN = 3, MND = 12, STAP = 0.06, GESPREKSPUNT = 0.045;
  const MIX = { sparen: 0.00, defensief: 0.30, neutraal: 0.50, dynamisch: 0.80, agressief: 1.00 };
  const VOLG = ['sparen', 'defensief', 'neutraal', 'dynamisch', 'agressief'];
  const idx = (p) => VOLG.indexOf(p);
  // Python round(): half-even; round(x, n): correct afgerond op de decimale waarde
  const rint = (x) => { const f = Math.floor(x); const d = x - f; if (d > 0.5) return f + 1; if (d < 0.5) return f; return f % 2 === 0 ? f : f + 1; };
  const rnd = (x, n) => { const s = Math.pow(10, n); const y = x * s; if (Math.abs(y - Math.trunc(y)) === 0.5) return rint(y) / s; return Number(x.toFixed(n)); };
  // Python sum() over floats (CPython ≥ 3.12): Neumaier-gecompenseerde som — nodig voor exacte gelijkheid (bv. een totaal dat op ,5 eindigt)
  const pySum = (arr) => { let f = 0.0, c = 0.0; for (const x of arr) { const t = f + x; if (Math.abs(f) >= Math.abs(x)) c += (f - t) + x; else c += (x - t) + f; f = t; } if (c && Number.isFinite(c)) f += c; return f; };
  const rendement = (mix) => mix * MV.aandelen + (1 - mix) * MV.obligaties;
  const overleving = (l, j) => { if (j <= 0) return 1.0; if (l + j > MAX_LEEFTIJD) return 0.0; return Math.exp(-Math.exp((l - MV.gm) / MV.gs) * (Math.exp(j / MV.gs) - 1.0)); };

  // ---- doelrisico ----
  const horizonPassend = (j) => { if (j === null || j === undefined || j <= 0) return 'sparen'; if (j < 3) return 'sparen'; if (j < 8) return 'defensief'; if (j < 15) return 'neutraal'; if (j < 25) return 'dynamisch'; return 'agressief'; };
  const horizonAlloc = (j, app) => { const p = horizonPassend(j); return idx(p) <= idx(app) ? p : app; };
  // ctx = { staffel: bool (termijnstaffel_zonder_keuze), planMax: profiel | null (zet_plan_maximum) } — als_planeigenschap = { staffel:false, planMax:null }
  const allocatieOp = (rest, volle, app, ctx) => {
    if (ctx.staffel) return horizonAlloc(rest, app);
    const aanbevolen = horizonPassend(volle);
    if (idx(app) <= idx(aanbevolen)) return horizonAlloc(rest, app);
    if (ctx.planMax != null && idx(app) <= idx(ctx.planMax)) return horizonAlloc(rest, app);
    if (rest === null || rest === undefined) return 'sparen';
    const cap = rest >= 8 ? 'agressief' : rest >= 5 ? 'dynamisch' : rest >= 3 ? 'neutraal' : rest >= 1.5 ? 'defensief' : 'sparen';
    const hoogste = idx(cap) <= idx(app) ? cap : app; const bestaand = horizonAlloc(rest, app);
    return idx(hoogste) >= idx(bestaand) ? hoogste : bestaand;
  };
  const planMaximum = (jaren) => { if (!jaren.length) return null; let b = jaren.map(horizonPassend)[0]; jaren.map(horizonPassend).forEach((p) => { if (idx(p) > idx(b)) b = p; }); return b; };

  // ---- levenslijn: glijpad van één doel (doel zonder eigen opnameperiodes) ----
  const doelGlijpad = (doelL, start, app, ctx) => { const pts = []; let vorige = null; const volle = Math.max(0.0, doelL - start);
    for (let j = start; j < doelL; j++) { const a = allocatieOp(Math.max(0.0, doelL - j), volle, app, ctx); if (a !== vorige) { pts.push([j, a]); vorige = a; } } return pts; };
  const profielOp = (gp, l, terug) => { let p = terug; for (const [wl, wp] of gp) if (l >= wl) p = wp; return p; };

  // ---- opname ----
  // periodes: [{van, tot, maand|null}]
  const duurCache = new Map();
  const gewogenDuur = (l, per) => {
    if (!per.length) return 0.0;
    const key = l + '|' + per.map((p) => p.van + ',' + p.tot + ',' + (p.maand == null ? '' : p.maand)).join(';');
    const c = duurCache.get(key); if (c !== undefined) return c;
    const bekend = per.filter((p) => p.maand).map((p) => p.maand); const std = bekend.length ? pySum(bekend) / bekend.length : 1.0;
    let som = 0.0, gew = 0.0;
    for (const p of per) { const start = Math.max(l, p.van); const n = rint((p.tot - start) * MND); if (n <= 0) continue; const basis = p.maand ? p.maand : std;
      for (let k = 0; k < n; k++) { const t = start + k / MND + 1 / (2 * MND) - l; if (t < 0) continue;
        const w = basis * Math.pow(1.0 + MV.inflatie, t) * overleving(l, t) / Math.pow(1.0 + MV.obligaties, t); som += w; gew += w * t; } }
    const r = som > 0 ? gew / som : 0.0; if (duurCache.size > 200000) duurCache.clear(); duurCache.set(key, r); return r;
  };
  const opnameProfiel = (l, per, app) => horizonAlloc(gewogenDuur(l, per), app);
  const metBedragen = (per, schaal) => per.map((p) => ({ van: p.van, tot: p.tot, maand: rint(p.maand != null ? p.maand : schaal) }));
  const maandOp = (per, l, schaal) => { for (const p of per) if (p.van <= l && l < p.tot) return p.maand != null ? p.maand : schaal; return 0.0; };
  const opnamesInVenster = (per, vanaf, jaren, startL, schaal) => { let som = 0.0; const stap = 1.0 / MND; const n = rint(jaren * MND);
    for (let k = 0; k < n; k++) { const j = vanaf + k * stap; const m = maandOp(per, j, schaal); if (m) som += m * Math.pow(1.0 + MV.inflatie, j - startL); } return som; };
  const simulatie = (kapitaal, per, schaal, app) => {
    if (!per.length) return kapitaal;
    const gewogen = metBedragen(per, schaal); const start = per[0].van, eind = per[per.length - 1].tot;
    let pot = 0.0, belegd = kapitaal; const rPot = rendement(MIX.sparen); let j = start; let vorig = null;
    while (j < eind - 1e-9) {
      const nz = Math.trunc(j); if (nz !== vorig) { vorig = nz; const saldo = pot + belegd; const doelPot = opnamesInVenster(per, j, POT_JAREN, start, schaal); pot = Math.min(saldo, doelPot); belegd = saldo - pot; }
      const nu = maandOp(per, j, schaal) * Math.pow(1.0 + MV.inflatie, j - start); const bedrag = nu * MND * STAP; const uit = Math.min(pot, bedrag); pot -= uit; belegd -= bedrag - uit;
      if (pot + belegd <= 0) return pot + belegd;
      const prof = opnameProfiel(j, gewogen, app); const rB = rendement(MIX[prof]);
      pot *= Math.pow(1 + rPot, STAP); belegd *= Math.pow(1 + rB, STAP); j += STAP;
    }
    return pot + belegd;
  };
  const opnameMaand = (kapitaal, per, app) => { if (kapitaal <= 0 || !per.length) return 0; const jaren = Math.max(1, per[per.length - 1].tot - per[0].van);
    let laag = 0.0, hoog = kapitaal / (jaren * MND) * 3.0;
    for (let i = 0; i < 40; i++) { const mid = (laag + hoog) / 2; const rest = simulatie(kapitaal, per, mid, app); if (rest > 0) laag = mid; else hoog = mid; }
    return rint((laag + hoog) / 2); };

  // ---- representatief_pad ----
  const DPJ = 261, BLOK_JAREN = 25, BLOK = BLOK_JAREN * DPJ, RASTER = 5;
  const SEG = {
    aandelen: [['dotcom-daling', 2.60, 0.52, 0.014], ['dotcom-herstel', 7.75, 2.05, 0.009], ['crisis-val', 9.17, 0.48, 0.022], ['crisis-herstel', 13.50, 2.15, 0.011], ['rustige-groei', 20.10, 1.75, 0.008], ['corona-val', 20.196, 0.66, 0.030], ['corona-herstel', 21.30, 1.55, 0.012], ['doorgroei', 22.00, 1.10, 0.008], ['renteschok-val', 22.75, 0.82, 0.013], ['renteschok-herstel', 25.00, 1.35, 0.009]],
    obligaties: [['rentedaling', 7.75, 1.28, 0.0035], ['vlucht-naar-kwaliteit', 9.17, 1.08, 0.005], ['lage-rente', 20.10, 1.20, 0.003], ['corona-schok', 20.35, 0.985, 0.006], ['vlak', 22.00, 1.005, 0.0025], ['renteschok-val', 22.85, 0.80, 0.006], ['renteschok-herstel', 25.00, 1.06, 0.003]],
    cash: [['geldmarkt-vlak', 25.00, 1.28, 0.0002]],
  };
  const EPISODES = [['dotcom', 0.0, 2.60], ['financiele-crisis', 7.75, 9.17], ['corona', 20.10, 20.196], ['renteschok', 22.00, 22.85]];
  const dag = (jaren) => rint(jaren * DPJ);
  // sha256 (synchroon) — voor de vaste segment-seeds en de scenario-identiteit
  const sha256 = (str) => { const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    const bytes = []; const u = unescape(encodeURIComponent(str)); for (let i = 0; i < u.length; i++) bytes.push(u.charCodeAt(i));
    const l = bytes.length * 8; bytes.push(0x80); while (bytes.length % 64 !== 56) bytes.push(0); for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (l >>> (i * 8)) & 0xff);
    let h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]; const w = new Array(64); const ror = (x, n) => (x >>> n) | (x << (32 - n));
    for (let o = 0; o < bytes.length; o += 64) { for (let i = 0; i < 16; i++) w[i] = (bytes[o + 4 * i] << 24) | (bytes[o + 4 * i + 1] << 16) | (bytes[o + 4 * i + 2] << 8) | bytes[o + 4 * i + 3];
      for (let i = 16; i < 64; i++) { const s0 = ror(w[i - 15], 7) ^ ror(w[i - 15], 18) ^ (w[i - 15] >>> 3); const s1 = ror(w[i - 2], 17) ^ ror(w[i - 2], 19) ^ (w[i - 2] >>> 10); w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0; }
      let [a, b, c, d, e, f, g, hh] = h;
      for (let i = 0; i < 64; i++) { const S1 = ror(e, 6) ^ ror(e, 11) ^ ror(e, 25); const ch = (e & f) ^ (~e & g); const t1 = (hh + S1 + ch + K[i] + w[i]) | 0; const S0 = ror(a, 2) ^ ror(a, 13) ^ ror(a, 22); const mj = (a & b) ^ (a & c) ^ (b & c); const t2 = (S0 + mj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; }
      h = [(h[0] + a) | 0, (h[1] + b) | 0, (h[2] + c) | 0, (h[3] + d) | 0, (h[4] + e) | 0, (h[5] + f) | 0, (h[6] + g) | 0, (h[7] + hh) | 0]; }
    return h.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join(''); };
  const ruis = (seed, n) => { let t = (seed & 0x7FFFFFFF) || 7; const uit = new Array(n); for (let i = 0; i < n; i++) { t = (Math.imul(t, 1103515245) + 12345) & 0x7FFFFFFF; uit[i] = t / 0x3FFFFFFF - 1.0; } return uit; };
  const logr = {};
  const dagLog = (activum) => { if (logr[activum]) return logr[activum]; const uit = []; let vorigE = 0;
    SEG[activum].forEach(([naam, eindJ, factor, amp], i) => { const einde = dag(eindJ); const n = einde - vorigE; if (n <= 0) return;
      const hx = sha256(activum + ':' + i + ':' + naam); const seed = parseInt(hx.slice(8, 16), 16) & 0x7FFFFFFF; const z = ruis(seed, n);
      const som = pySum(z); const drift = (Math.log(factor) - amp * som) / n; for (let k = 0; k < n; k++) uit.push(drift + amp * z[k]); vorigE = einde; });
    if (uit.length !== BLOK) throw new Error('blok'); logr[activum] = Float64Array.from(uit); return logr[activum]; };
  let _dallen = null, _dal = null, _piek = null;
  const dalDagen = () => { if (_dallen) return _dallen; const s = new Set();
    for (const act of ['aandelen', 'obligaties']) { const lr = dagLog(act); const cum = [0.0]; for (let i = 0; i < lr.length; i++) cum.push(cum[cum.length - 1] + lr[i]);
      for (const [naam, van, tot] of EPISODES) { if (act === 'obligaties' && naam !== 'renteschok') continue; const a = dag(van), b = dag(tot); let best = a; for (let d = a; d <= b; d++) if (cum[d] < cum[best]) best = d; s.add(best); } }
    _dallen = Array.from(s).sort((x, y) => x - y); return _dallen; };
  const diepste = () => { if (_dal !== null) return; const lr = dagLog('aandelen'); let cum = 0, piek = 0, diep = 0, dal = 0, piekDag = 0, bestePiek = 0;
    for (let d = 0; d < lr.length; d++) { cum += lr[d]; if (cum > piek) { piek = cum; piekDag = d + 1; } if (cum - piek < diep) { diep = cum - piek; dal = d + 1; bestePiek = piekDag; } } _dal = dal; _piek = bestePiek; };
  // NB: _diepste_dal_dag gebruikt piek = max(piek, cum) en dezelfde strikte vergelijking — identiek aan de lus hierboven
  const ankerVenster = (piekOffset) => { diepste(); const duur = (_dal - _piek) / DPJ; return [piekOffset - duur - 0.5, piekOffset + 0.5]; };
  const verschuivingVoorPiek = (piekOffset) => { diepste(); const pd = dag(Math.max(0.0, piekOffset)); return (((_dal - pd) % BLOK) + BLOK) % BLOK; };
  const blokDag = (d, v) => (((d + v) % BLOK) + BLOK) % BLOK;
  const raster = (n, v) => { const s = new Set(); for (let d = 0; d <= n; d += RASTER) s.add(d); for (let d = 0; d <= n; d += DPJ) s.add(d); for (let d = DPJ; d <= n; d += DPJ) s.add(d - 1); s.add(n);
    for (const dal of dalDagen()) { const eerste = (((dal - v) % BLOK) + BLOK) % BLOK; for (let h = 0; h <= Math.floor(n / BLOK); h++) { const d = eerste + h * BLOK; if (d >= 0 && d <= n) s.add(d); } }
    return Array.from(s).sort((a, b) => a - b); };
  const cumIndex = (mixen, v, cash) => { const nJ = mixen.length, n = nJ * DPJ; const A = dagLog('aandelen'), R = dagLog(cash ? 'cash' : 'obligaties'); const cum = new Float64Array(n + 1);
    for (let d = 0; d < n; d++) { const m = mixen[Math.min(Math.floor(d / DPJ), nJ - 1)]; const b = blokDag(d, v); cum[d + 1] = cum[d] + m * A[b] + (1.0 - m) * R[b]; } return cum; };
  const afwijkingsfactoren = (mixen, v, cash) => { const nJ = mixen.length; if (!nJ) return [[0.0, 1.0]]; const n = nJ * DPJ; const cum = cumIndex(mixen, v, cash); const trend = cum[n] / n;
    return raster(n, v).map((d) => [d / DPJ, Math.exp(cum[d] - trend * d)]); };
  const terugvalIndex = (mixen, v, drift, gewicht, cash, venster) => {
    const nJ = mixen.length; if (!nJ) return [0.0, 0.0, 0.0]; const n = nJ * DPJ; const cum = cumIndex(mixen, v, cash); const trend = cum[n] / n;
    const gewOp = (d) => { if (!gewicht || !gewicht.length) return 1.0; const j = d / DPJ; const i = Math.min(Math.trunc(j), gewicht.length - 1); const vo = Math.min(i + 1, gewicht.length - 1); const t = j - i; return gewicht[i] * (1 - t) + gewicht[vo] * t; };
    const dc = [0.0]; if (drift && drift.length) drift.forEach((r) => dc.push(dc[dc.length - 1] + r));
    let van = 0, tot = n; if (venster) { van = Math.max(0, Math.min(n, dag(venster[0]))); tot = Math.max(van, Math.min(n, dag(venster[1]))); }
    let besteKost = 0.0, beste = [0.0, 0, 0], piekLog = -Infinity, piekDag = 0;
    for (let d = van; d <= tot; d++) { let dr = 0.0; if (drift && drift.length) { const jv = Math.min(Math.floor(d / DPJ), drift.length - 1); dr = dc[Math.min(Math.floor(d / DPJ), dc.length - 1)] + drift[jv] * ((d % DPJ) / DPJ); }
      const stand = cum[d] - trend * d + dr; if (stand > piekLog) { piekLog = stand; piekDag = d; } const fr = 1.0 - Math.exp(stand - piekLog); const kost = fr * gewOp(piekDag); if (kost > besteKost) { besteKost = kost; beste = [fr, piekDag, d]; } }
    return [beste[0], beste[1] / DPJ, beste[2] / DPJ]; };
  const episodeBij = (offset, v) => { const d = rint(offset * DPJ) + v; const bj = (((d % BLOK) + BLOK) % BLOK) / DPJ; for (const [naam, van, tot] of EPISODES) if (van - 0.1 <= bj && bj <= tot + 0.4) return naam; return null; };

  // ---- reflectie_reeksen ----
  // doel: { id, leeftijd (doelleeftijd), eenheid: 'maand'|'bedrag', per_maand, bedrag, gedrag }
  const kalibreer = (L, doelL, app, eenmalig, perMaand, doelBedrag, ctx) => {
    const gp = doelGlijpad(doelL, L, app, ctx); const jaren = Math.max(1, doelL - L); const eerste = gp.length ? gp[0][1] : allocatieOp(jaren, jaren, app, ctx);
    const groei = (j) => rendement(MIX[profielOp(gp, j, eerste)]);
    const opbouw = (maand, start) => { let w = start; let j = L; while (j < doelL - 1e-9) { w *= Math.pow(1 + groei(j), STAP); w += maand * MND * STAP; j += STAP; } return w; };
    const s0 = eenmalig || 0;
    if (doelBedrag === null || doelBedrag === undefined) { const m = perMaand || 0; return [m, rint(opbouw(m, s0))]; }
    const basis = opbouw(0.0, s0); const eenh = opbouw(1.0, s0) - basis; const m = eenh > 0 ? Math.max(0.0, (doelBedrag - basis) / eenh) : 0.0;
    let db = doelBedrag; if (m === 0.0) db = Math.max(doelBedrag, rint(basis)); return [m, db];
  };
  const kalibreerDoel = (L, d, app, eenmalig, ctx) => kalibreer(L, d.leeftijd, app, eenmalig, d.eenheid === 'maand' ? d.per_maand : null, d.eenheid !== 'maand' ? Math.trunc(d.bedrag || 0) : null, ctx);
  const piekOffset = (L, specs, app, ctx) => {
    if (!specs.length) return 0.0; const eind = Math.max(...specs.map((s) => s.doel_eind)); const bl = new Array(Math.max(1, eind - L + 1)).fill(0.0);
    for (const s of specs) { const d = s.doel; const gp = doelGlijpad(d.leeftijd, L, app, ctx); const jaren = Math.max(1, d.leeftijd - L); const eerste = gp.length ? gp[0][1] : allocatieOp(jaren, jaren, app, ctx);
      const [maand, db] = kalibreerDoel(L, d, app, s.eenmalig || 0, ctx); let w = s.eenmalig || 0;
      for (let j = L; j <= eind; j++) { const i = j - L;
        if (j < d.leeftijd) { const p = profielOp(gp, j, eerste); bl[i] += w * MIX[p]; const r = rendement(MIX[p]); w = w * (1 + r) + maand * MND; }
        else if (s.staart === 'afbouw' && j < s.doel_eind) { const duur = Math.max(1, s.doel_eind - d.leeftijd); const saldo = db * Math.max(0.0, 1.0 - (j - d.leeftijd) / duur); const per = [{ van: d.leeftijd, tot: s.doel_eind, maand: null }]; const p = opnameProfiel(j, per, app); bl[i] += saldo * MIX[p]; } } }
    let piek = 0; for (let i = 1; i < bl.length; i++) if (bl[i] > bl[piek]) piek = i; return piek; };
  const segFactoren = (mixen, startOffset, v) => afwijkingsfactoren(mixen, v + startOffset * DPJ, false);
  const doelreeks = (L, d, app, eenmalig, staart, eindL, v, ctx) => {
    const jaren = Math.max(1, d.leeftijd - L); const gp = doelGlijpad(d.leeftijd, L, app, ctx); const eerste = gp.length ? gp[0][1] : allocatieOp(jaren, jaren, app, ctx);
    const groei = (j) => rendement(MIX[profielOp(gp, j, eerste)]); const s0 = eenmalig || 0;
    const [maand, db] = kalibreerDoel(L, d, app, eenmalig, ctx);
    const mixO = []; for (let j = L; j < d.leeftijd; j++) mixO.push(MIX[profielOp(gp, j, eerste)]);
    const fac = segFactoren(mixO, 0, v); const pts = []; let w = s0, vo = 0.0;
    for (let k = 0; k < fac.length - 1; k++) { const [off, f] = fac[k]; const dt = off - vo; if (dt > 0) { w *= Math.pow(1 + groei(L + vo), dt); w += maand * MND * dt; } vo = off; pts.push([rnd(L + off, 3), rint(w * f)]); }
    pts.push([d.leeftijd, db]);
    let opM = 0, opPct = 0.0, afGp = [], opPer = [], staartEind; const dg = 1.0 / DPJ;
    if (staart === 'uitbetaling') { staartEind = Math.min(eindL, d.leeftijd + 3); pts.push([rnd(d.leeftijd + dg, 3), 0]); if (staartEind > d.leeftijd) pts.push([staartEind, 0]); }
    else if (staart === 'afbouw') {
      const per = [{ van: d.leeftijd, tot: eindL, maand: null }]; staartEind = Math.max(...per.map((p) => p.tot));
      const schaal = opnameMaand(db, per, app); const opg = metBedragen(per, schaal); opPer = opg.map((p) => [p.van, p.tot, Math.trunc(p.maand || 0)]); opM = opPer.length ? opPer[0][2] : 0;
      const profs = []; for (let j = d.leeftijd; j < staartEind; j++) profs.push(opnameProfiel(j, opg, app));
      profs.forEach((p, i) => { const j = d.leeftijd + i; if (!afGp.length || afGp[afGp.length - 1][1] !== p) afGp.push([j, p]); });
      const sf = segFactoren(profs.map((p) => MIX[p]), d.leeftijd - L, v);
      let pot = 0.0, bel = db; const rPot = rendement(MIX.sparen); let vo2 = 0.0, vn = null;
      for (let k = 1; k < sf.length; k++) { const [off, f] = sf[k]; const dt = off - vo2; const j = d.leeftijd + vo2; const nz = Math.trunc(j);
        if (nz !== vn) { vn = nz; const saldo = pot + bel; pot = Math.min(saldo, opnamesInVenster(per, j, POT_JAREN, d.leeftijd, schaal)); bel = saldo - pot; }
        const nu = maandOp(per, j, schaal) * Math.pow(1.0 + MV.inflatie, j - d.leeftijd); const bedrag = nu * MND * dt; const uit = Math.min(pot, bedrag); pot -= uit; bel -= bedrag - uit; vo2 = off;
        if (pot + bel <= 0) { pts.push([rnd(d.leeftijd + off, 3), 0]); break; }
        const zicht = pot + bel * f; pts.push([rnd(d.leeftijd + off, 3), rint(Math.max(0.0, zicht))]);
        const p = opnameProfiel(j, opg, app); const rB = rendement(MIX[p]); pot *= Math.pow(1 + rPot, dt); bel *= Math.pow(1 + rB, dt); }
      if (pts.length && pts[pts.length - 1][0] < staartEind) pts.push([staartEind, pts[pts.length - 1][1]]);
      if (pts.length && per.every((p) => p.maand == null)) pts[pts.length - 1] = [pts[pts.length - 1][0], 0];
      opPct = db ? (opM * MND) / db : 0.0;
    } else { staartEind = eindL; for (let j = d.leeftijd + 1; j <= staartEind; j++) pts.push([j, rint(db * Math.pow(1.0 + SPAARRENTE, j - d.leeftijd))]); }
    return { id: d.id, gedrag: d.gedrag, staart, doel_leeftijd: d.leeftijd, doel_bedrag: db, eenmalig: Math.trunc(s0), maand: rint(maand), maand_exact: maand, eerste_profiel: eerste, glijpad: gp, punten: pts, staart_eind_leeftijd: staartEind,
      opname_maand: opM, opname_pct: opPct, opname_gesprekspunt: opPct > GESPREKSPUNT, afbouw_glijpad: afGp, opname_periodes: opPer };
  };
  const waardeOp = (r, l) => { const p = r.punten; if (l <= p[0][0]) return p[0][1]; for (let i = 1; i < p.length; i++) if (l <= p[i][0]) { const a = p[i - 1], b = p[i]; const t = (l - a[0]) / ((b[0] - a[0]) || 1); return a[1] + (b[1] - a[1]) * t; } return p[p.length - 1][1]; };
  const potOp = (r, l) => { if (r.staart !== 'afbouw' || l < r.doel_leeftijd) return 0.0; if (l > r.staart_eind_leeftijd) return 0.0; const m = r.opname_maand || 0.0; if (m <= 0) return 0.0;
    const rest = Math.max(0.0, r.staart_eind_leeftijd - l); const j = Math.min(POT_JAREN, rest); return m * 12.0 * j * Math.pow(1.0 + MV.inflatie, Math.max(0.0, l - r.doel_leeftijd)); };
  const terugval = (rs, L, E, v, venster) => {
    if (!rs.length) return null;
    const belegd = (j) => { let s = 0.0; for (const r of rs) { if (r.staart === 'vlak' && j > r.doel_leeftijd) continue; if (j > r.staart_eind_leeftijd) continue; s += Math.max(0.0, waardeOp(r, j) - potOp(r, j)); } return s; };
    const mixOp = (j) => { let t = 0.0, n = 0.0; for (const r of rs) { const w = waardeOp(r, j); if (w <= 0) continue; if (r.staart === 'vlak' && j > r.doel_leeftijd) continue; let p;
      if (j < r.doel_leeftijd) p = profielOp(r.glijpad, j, r.eerste_profiel); else if (r.afbouw_glijpad.length && j <= r.staart_eind_leeftijd) p = profielOp(r.afbouw_glijpad, j, 'sparen'); else continue; t += w * MIX[p]; n += w; } return n > 0 ? t / n : 0.0; };
    let eb = L; for (let j = L; j <= E; j++) if (belegd(j) > 1.0) eb = j + 1;
    const jaren = []; for (let j = L; j < Math.max(L + 1, Math.min(eb, E)); j++) jaren.push(j);
    const mixen = jaren.map(mixOp); const drift = mixen.map((m) => Math.log(1.0 + rendement(m))); const gew = jaren.map((j) => belegd(j)); const alles = mixen.every((m) => m <= 1e-9);
    const [fr, po, dof] = terugvalIndex(mixen, v, drift, gew, alles, venster);
    if (fr <= 0.001) return null; const pl = L + po; const b = belegd(pl);
    return { bedrag: rint(fr * b), pct: rnd(fr, 4), piek_leeftijd: rnd(pl, 2), dal_leeftijd: rnd(L + dof, 2), duur_jaren: rnd(dof - po, 2), belegd_op_piek: rint(b), mix_op_piek: rnd(mixOp(Math.trunc(pl)), 3), episode: episodeBij(dof, v) };
  };
  const totaal = (rs, L, E) => { const s = new Set([L, E]); rs.forEach((r) => r.punten.forEach(([l]) => { if (L - 1e-9 <= l && l <= E + 1e-9) s.add(l); }));
    const off = Array.from(s).sort((a, b) => a - b); const pts = off.map((j) => [rnd(j, 3), rint(pySum(rs.map((r) => waardeOp(r, j))))]);
    const mk = rs.map((r) => [r.doel_leeftijd, r.staart === 'uitbetaling' ? 'uitbetaald' : r.staart === 'afbouw' ? 'afbouw' : 'bereikt', r.id]); return { punten: pts, markeringen: mk }; };

  // ---- adapter: scenario → (anker, vijf standen) — gereconstrueerd uit het orakel (generatiescript niet aangeleverd) ----
  const STAART = { sparen: 'vlak', uitbetaling: 'uitbetaling', afbouw: 'afbouw' };
  const pyJson = (v) => { if (v === null || v === undefined) return 'null'; if (typeof v === 'number') return Number.isInteger(v) ? String(v) : (Number.isFinite(v) ? (String(v).indexOf('.') < 0 && String(v).indexOf('e') < 0 ? String(v) + '.0' : String(v)) : 'NaN'); if (typeof v === 'string') return JSON.stringify(v).replace(/[\u007f-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')); if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (Array.isArray(v)) return '[' + v.map(pyJson).join(', ') + ']'; return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ': ' + pyJson(v[k])).join(', ') + '}'; };
  const scenarioId = (sc) => sha256(pyJson(sc)).slice(0, 16);
  const eindVan = (sc) => { const ds = sc.doelen; if (ds.some((d) => d.bestemming === 'afbouw')) return Math.max(90, ...ds.filter((d) => d.bestemming === 'afbouw').map((d) => d.opname_tot || 90)); return Math.max(sc.leeftijd + 20, Math.max(...ds.map((d) => d.termijn_leeftijd)) + 3); };
  const doelVan = (d) => ({ id: d.id, leeftijd: d.termijn_leeftijd, eenheid: d.doelbedrag != null ? 'bedrag' : 'maand', per_maand: d.doelbedrag != null ? null : d.maand, bedrag: d.doelbedrag != null ? d.doelbedrag : null, gedrag: d.bestemming === 'afbouw' ? 'opname' : 'behouden' });
  // minEind (weergave): een langere horizon voor doelen die nog geen inleg hebben; verandert geen doelreeks, geen anker en geen terugval (die stoppen op de laatste termijn), alleen hoe ver een spaarstaart doorloopt. Bij afbouw blijft de regel 90, tenzij in 03 uitdrukkelijk een andere eindleeftijd gekozen is (34h).
  const anker = (sc, minEind) => { const L = sc.leeftijd, E0 = eindVan(sc); const E = sc.doelen.some((d) => d.bestemming === 'afbouw') ? E0 : Math.max(E0, minEind || 0); const jaren = sc.doelen.map((d) => d.termijn_leeftijd - L); const ms = planMaximum(jaren);
    const specs = sc.doelen.map((d) => ({ doel: doelVan(d), eenmalig: d.eenmalig, staart: STAART[d.bestemming], doel_eind: d.bestemming === 'afbouw' ? (d.opname_tot || E) : d.termijn_leeftijd }));
    const po = piekOffset(L, specs, ms, { staffel: false, planMax: null }); return { modelstand: ms, eind: E, piek_offset: po, verschuiving_dagen: verschuivingVoorPiek(po), meetvenster: ankerVenster(po), basis: ms }; };
  const stand = (sc, an, p) => { const L = sc.leeftijd, E = an.eind; const ctx = { staffel: false, planMax: planMaximum(sc.doelen.map((d) => d.termijn_leeftijd - L)) };
    const rs = sc.doelen.map((d) => doelreeks(L, doelVan(d), p, d.eenmalig, STAART[d.bestemming], d.bestemming === 'afbouw' && d.opname_tot ? d.opname_tot : E, an.verschuiving_dagen, ctx));
    const tot = totaal(rs, L, E); const tv = terugval(rs, L, E, an.verschuiving_dagen, an.meetvenster);
    // winst (gereconstrueerd, 55/55 gelijk): totaal op langste termijn + 2, plus wat al uitbetaald of opgenomen is, min de inleg
    const we = Math.max(...sc.doelen.map((d) => d.termijn_leeftijd)) + 2; let ont = 0, inleg = 0;
    rs.forEach((r) => { inleg += r.eenmalig + r.maand_exact * MND * (r.doel_leeftijd - L);
      if (r.staart === 'uitbetaling' && r.doel_leeftijd <= we) ont += r.doel_bedrag;
      if (r.staart === 'afbouw') for (let j = r.doel_leeftijd; j < Math.min(we, r.staart_eind_leeftijd); j++) ont += r.opname_maand * MND * Math.pow(1 + MV.inflatie, j - r.doel_leeftijd); });
    const tw = waardeOp({ punten: tot.punten }, we);
    return { doelen: rs, totaal: tot, terugval: tv ? { piek_leeftijd: tv.piek_leeftijd, dal_leeftijd: tv.dal_leeftijd, bedrag: tv.bedrag, fractie: tv.pct, basis: tv.belegd_op_piek, episode: tv.episode, bron: tv } : null, winst: { bedrag: rint(tw + ont - inleg), eind_leeftijd: we } }; };
  // ronde 32: dezelfde opnamekern in twee richtingen (app: inkomensverkenning.py — bereken_opname_maand en _benodigd_kapitaal via bisectie op de opnamesimulatie); geen eigen formule
  const benodigdKapitaal = (nominaal, per, app) => { const jaren = Math.max(1, per[per.length - 1].tot - per[0].van); let lo = 0.0, hi = Math.max(1.0, nominaal * MND * jaren * 2); const rest = (k) => simulatie(k, per, nominaal, app);
    while (rest(hi) <= 0 && hi < 1e10) hi *= 2; if (hi >= 1e10) return null; for (let i = 0; i < 45; i++) { const mid = (lo + hi) / 2; if (rest(mid) > 0) hi = mid; else lo = mid; } return hi; };
  return { anker, stand, scenarioId, eindVan, kalibreer, planMaximum, horizonPassend, VOLG, MIX, pyJson, sha256, rint, opnameMaand, simulatie, benodigdKapitaal, INFLATIE, waardeOp };
})();


// ===== ronde 27 · één gedeeld planbeeld en de reis 03–04, aangesloten op de rekenkern =====
// Rekenbron: M27, de getrouwe browserport van de zuivere Norte-rekenkern (11 modules). Geen eigen rendement, geen eigen dip, geen gladde lijn, geen lineaire opschaling.
// Eén modelbasis en één marktanker per invoerscenario, gedeeld over de verkende standen; een andere doelinvoer of bestemming is een eigen scenario met een eigen anker.
const B26_STANDEN = ['sparen', 'defensief', 'neutraal', 'dynamisch', 'agressief'];
const B26_KLEUR = [['#365C57', '#DEE4DC'], ['#6D6746', '#E3DFD5'], ['#6F5267', '#E3DDE0'], ['#4E5F7A', '#DEE1E8'], ['#7A5A3E', '#E8E0D6'], ['#4F6A4A', '#DFE5DB']]; /* V1 (36): de bestaande zes doelparen van het plan */
const B26_FIS = ['#5B4F86', '#E4E1EE']; /* V1 (36): fiscaal sparen als één gegroepeerde identiteit */
const B26_NAAM = { sparen: 'Sparen', defensief: 'Defensief', neutraal: 'Neutraal', dynamisch: 'Dynamisch', agressief: 'Agressief' };
// HORIZON_DREMPELS uit de productbron (levenscyclus/doelrisico.py): resterend < 3 Sparen, < 8 Defensief, < 15 Neutraal, < 25 Dynamisch, anders Agressief.
// Gebruikt voor de modelstand zolang de bron zelf geen 'modelstand' meelevert (adaptercontract punt 1).
const b26HorizonStand = (jaren) => jaren < 3 ? 'sparen' : jaren < 8 ? 'defensief' : jaren < 15 ? 'neutraal' : jaren < 25 ? 'dynamisch' : 'agressief';
const B26_UITLOOP = 3;
const b26klem = (n, a, b) => Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, n));
const b26zacht = (t) => 1 - Math.pow(1 - b26klem(t), 3);
const b26glad = (t) => { const k = b26klem(t); return k * k * (3 - 2 * k); };

class Bron27 {
  constructor() { this.cache = new Map(); }
  // invoer van het plan → scenario van de rekenkern (zelfde vorm als het controle-orakel; 'doelbedrag' alleen bij een gekozen einddoel)
  scenario(inv) { return { leeftijd: inv.leeftijd, doelen: inv.doelen.map((d) => { const o = { id: d.pid, soort: d.soort, termijn_leeftijd: d.termijn, maand: d.maand, eenmalig: d.eenmalig, bestemming: d.bestemming }; if (d.doelbedrag != null) o.doelbedrag = d.doelbedrag; if (d.bestemming === 'afbouw' && d.opnameTot != null && d.opnameTot !== 90) o.opname_tot = d.opnameTot; return o; }) }; }
  zoek(inv, stand, minEind) {
    if (!inv.doelen.length) return { ok: false, leeg: true, reden: '' };
    if (inv.doelen.some((d) => d.bestemming === 'afbouw' && d.termijn >= (d.opnameTot || 90))) return { ok: false, reden: inv.doelen.some((d) => d.bestemming === 'afbouw' && d.opnameTot) ? 'Het maandelijks opnemen start niet vóór de gekozen eindleeftijd.' : 'Maandelijks opnemen vanaf 90 jaar valt buiten de rekenhorizon van de rekenkern.' };
    const sc = this.scenario(inv); const k = M27.pyJson(sc) + '|' + (minEind || 0); let e = this.cache.get(k);
    if (!e) { try { e = { id: M27.scenarioId(sc), anker: M27.anker(sc, minEind), standen: {} }; } catch (err) { return { ok: false, reden: 'De rekenkern gaf voor deze invoer geen uitkomst.' }; } this.cache.set(k, e); if (this.cache.size > 80) this.cache.delete(this.cache.keys().next().value); }
    let st = e.standen[stand]; if (!st) { try { st = M27.stand(sc, e.anker, stand); } catch (err) { return { ok: false, reden: 'De rekenkern gaf voor deze invoer geen uitkomst.' }; } e.standen[stand] = st; }
    return { ok: true, sid: e.id + ':' + stand, scen: { id: e.id }, stand, data: { leeftijd: inv.leeftijd, eind: e.anker.eind, doelen: st.doelen.map((d) => Object.assign({}, d, { pid: d.id })), totaal: st.totaal }, terugval: st.terugval, gemeten: true, winst: st.winst, modelstand: e.anker.modelstand, anker: e.anker, profielen: B27_PROFIELEN };
  }
  // 40 · fiscaal sparen als gewone doelen op hetzelfde anker (marktpad) als de vrije doelen; de vrije doelen veranderen niet
  metFis(r0, invF, stand) {
    if (!r0 || !r0.ok || !r0.anker || !invF || !invF.doelen.length) return null;
    const scF = this.scenario(invF); const eind = Math.max(r0.anker.eind, ...invF.doelen.map((d) => d.termijn + B26_UITLOOP));
    const k = 'F|' + r0.sid + '|' + eind + '|' + M27.pyJson(scF); let st = this.cache.get(k);
    if (!st) { try { st = M27.stand(scF, Object.assign({}, r0.anker, { eind }), stand); } catch (err) { return null; } this.cache.set(k, st); if (this.cache.size > 80) this.cache.delete(this.cache.keys().next().value); }
    return { doelen: st.doelen.map((d) => Object.assign({}, d, { pid: d.id, fis: true })), totaal: st.totaal };
  }
}
const B27_PROFIELEN = { sparen: 0, defensief: 30, neutraal: 50, dynamisch: 80, agressief: 100 };

/* ── educatieve adapter (geen bronkopie): vertaling zoals BRIDGE.reken in de bron, alleen vrije doelen ── */
const BRON = new Bron27();
function metRekenkern(age0, stand, fn) {
  const reken = (goals, standOpt) => { const st2 = standOpt || stand; const doelen = goals.filter((g) => Number.isFinite(g.horizon) && g.horizon > age0).map((g) => ({ pid: g.id, soort: (g.rk || {}).soort || 'zelf', kid: null, termijn: Math.round(g.horizon), maand: g.doelbedrag != null ? 0 : Math.round(g.monthly || 0), eenmalig: Math.round(g.lump || 0), bestemming: g.destination === 'inkomen' ? 'afbouw' : (g.destination || 'sparen'), doelbedrag: g.doelbedrag != null ? g.doelbedrag : null, opnameTot: null }));
    if (!doelen.length) return { ok: false, reden: 'Nog geen doel met een termijn en een inleg.' };
    const minE2 = Math.max.apply(null, [age0 + 1].concat(doelen.map((d) => d.termijn))) + B26_UITLOOP;
    try { return BRON.zoek({ leeftijd: age0, doelen }, st2, minE2); } catch (e2) { return { ok: false, reden: 'De rekenkern kon dit voorbeeld niet berekenen.' }; } };
  const vorig = BRIDGE; BRIDGE = { reken }; try { return fn(); } finally { BRIDGE = vorig; }
}
return { PlanEngine, PlanJourney, M27, metRekenkern };
})();
