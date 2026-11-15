/* Norte quick simulation — relative capital-accumulation adapter, 2026-11-06.
   M27 source is unchanged. coordinateOrigin=0 is elapsed-year zero, NOT customer age.
   No withdrawals/mortality/tax/product/suitability inference. Source float-loop limitation
   and pinned source hash documented in source receipt. */
window.NorteQuickModel=(()=>{
  'use strict';
  const source='M27 2026-08.4 — relatieve opbouw';
  const assumptions=Object.freeze({inflation:2,savingsRate:.86,stockNominal:6.59,bondNominal:3.02,costsIncluded:false,taxesIncluded:false});
  const calculate=(input)=>{
    const M=window.NortePlanbron?.M27;if(!M)return {ok:false,error:'De berekening is niet beschikbaar. Probeer opnieuw.'};
    const {years,monthly=0,lump=0,target=null,strategy='neutraal',real=false}=input||{};
    if(!Number.isInteger(years)||years<1||years>40)return {ok:false,error:'Kies een termijn van 1 tot 40 jaar.'};
    if(!Number.isFinite(monthly)||monthly<0||monthly>100000)return {ok:false,error:'Vul een maandbedrag tussen € 0 en € 100.000 in.'};
    if(!Number.isFinite(lump)||lump<0||lump>10000000)return {ok:false,error:'Vul een startbedrag tussen € 0 en € 10.000.000 in.'};
    if(target!==null&&(!Number.isFinite(target)||target<=0||target>10000000))return {ok:false,error:'Vul een doelbedrag tussen € 1 en € 10.000.000 in.'};
    if(!M.VOLG.includes(strategy))return {ok:false,error:'Kies een beschikbare rekenaanpak.'};
    if(target===null&&monthly===0&&lump===0)return {ok:false,error:'Vul een maandbedrag of een startbedrag in.'};
    try{
      const d={id:'verkenning',soort:'zelf',termijn_leeftijd:years,maand:monthly,eenmalig:lump,bestemming:'sparen'};
      if(target!==null)d.doelbedrag=target;
      const scenario={leeftijd:0,doelen:[d]};const anchor=M.anker(scenario);const result=M.stand(scenario,anchor,strategy);const goal=result.doelen[0];
      const discount=y=>real?Math.pow(1.02,y):1;
      const points=goal.punten.filter(p=>p[0]<=years+1e-8).map(p=>({year:p[0],value:p[1]/discount(p[0]),contributed:lump+goal.maand_exact*12*p[0]}));
      const phases=goal.glijpad.map((p,i)=>({from:p[0],to:goal.glijpad[i+1]?.[0]??years,strategy:p[1]}));
      const rawDraw=result.terugval;
      const output={ok:true,years,monthly:goal.maand,monthlyExact:goal.maand_exact,lump,target,value:goal.doel_bedrag/discount(years),contributed:lump+goal.maand_exact*12*years,points,phases,drawdown:rawDraw?{amount:rawDraw.bedrag,fraction:rawDraw.fractie,from:rawDraw.piek_leeftijd,to:rawDraw.dal_leeftijd}:null,assumptions:{...assumptions},source,coordinateOrigin:0,personalProfile:false,real:!!real};
      if(!Number.isFinite(output.value)||points.some(p=>!Number.isFinite(p.value)))return {ok:false,error:'Deze invoer kon niet worden berekend.'};
      return output;
    }catch(e){return {ok:false,error:'Deze invoer kon niet worden berekend. Controleer uw bedragen en termijn.'};}
  };
  // Existing V12 cash comparison, not M27's ambiguously named "sparen" mix.
  function calculateSavings(input){
    const {years,monthly=0,lump=0,real=false}=input||{};
    const valid=calculate({years,monthly,lump,strategy:'sparen',real:false});
    if(!valid.ok)return valid;
    const E=window.NortePlanbron.PlanEngine,previous=E.S0();
    // Cash motor's internal minimum-coordinate18 is only a loop offset. No customer age.
    // The savings-only path contains no mortality, asset or withdrawal calculations.
    try{
      E.setStart(18); const P=E.initial();P.goals=[{id:'verkenning',horizon:18+years,monthly,lump,destination:'sparen',phases:[{profile:'sparen',end:18+years}]}];
      const r=E.computeMotor(P,{savings:'all',savingsRate:.86});const g=r.goals[0];
      const discount=y=>real?Math.pow(1.02,y):1;
      const points=g.points.filter(p=>p[0]<=18+years+1e-8).map(p=>({year:p[0]-18,value:p[1]/discount(p[0]-18),contributed:lump+monthly*12*(p[0]-18)}));
      return {...valid,monthly,monthlyExact:monthly,value:g.atGoal/discount(years),contributed:lump+monthly*12*years,points,phases:[],drawdown:null,source:'V12 spaarvergelijking — vaste 0,86 %',coordinateOrigin:0,real:!!real};
    }catch(e){return {ok:false,error:'De spaarvergelijking kon niet worden berekend.'};}
    finally{E.setStart(previous);}
  }
  return Object.freeze({calculate,calculateSavings,source,assumptions});
})();
