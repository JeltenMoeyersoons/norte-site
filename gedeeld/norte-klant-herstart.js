/* Explicit reset of the standalone customer journey only. */
(()=>{'use strict';
const PLAN='norte-r30:klant-zelfstandig-20261107-01', OLD='norte-r30:klant-eenvoudig-20261107-01';
const EPOCH='norte-klant-herstart:v1', SEEN='norte-klant-herstart-gezien:v1', BACKUP='norte-klant-herstel:v1';
const epoch=()=>localStorage.getItem(EPOCH)||'';
let boot=epoch();
function ownedSession(){
 const keys=[];
 for(let i=0;i<sessionStorage.length;i++){
  const k=sessionStorage.key(i);
  if(k==='norte-bronflow-0611-v1'||k==='norte.sim.plancontext:v1'||k==='norte-simulatie-website-navigation-v1'||k.startsWith('norte-sim-overdracht:v2:')||[PLAN,OLD].some(p=>k.startsWith(p+':')))keys.push(k);
 }
 const ret='norte.klant.kennisretour:v1';
 try{const r=JSON.parse(sessionStorage.getItem(ret));if(r&&[PLAN,OLD].includes(r.skey))keys.push(ret)}catch{}
 const ret2='norte-retour:v1';
 try{const r=JSON.parse(sessionStorage.getItem(ret2));if(r&&['kennis','simulatie'].includes(r.van)&&/^\/(kennis|simulatie)\//.test(r.href||''))keys.push(ret2)}catch{}
 return [...new Set(keys)];
}
function clearSession(){ownedSession().forEach(k=>sessionStorage.removeItem(k));sessionStorage.setItem(SEEN,epoch());if(history.state?.norte)history.replaceState(null,'',location.pathname)}
function publicJourney(){try{if(new URL(document.referrer||location.href).pathname==='/makelaar.html')return false;return JSON.parse(sessionStorage.getItem('norte-simulatie-website-navigation-v1'))?.target!=='/makelaar.html'}catch{return true}}
try{
 const b=JSON.parse(localStorage.getItem(BACKUP));if(b&&b.expiresAt<Date.now())localStorage.removeItem(BACKUP);
 if(boot&&publicJourney()&&sessionStorage.getItem(SEEN)!==boot)clearSession();
}catch{}
function begin(){
 if(!publicJourney())return false;
 if(document.getElementById('norte-reset-dialog'))return false;
 const opener=document.activeElement, d=document.createElement('dialog');
 d.id='norte-reset-dialog';d.className='kc-help norte-reset';d.setAttribute('aria-labelledby','norte-reset-title');d.setAttribute('aria-describedby','norte-reset-copy');
 d.innerHTML='<h2 id="norte-reset-title">Opnieuw beginnen?</h2><p id="norte-reset-copy">Uw klantenplan en simulaties in deze browser worden leeggemaakt. Dit geldt ook voor andere open tabbladen.</p><p class="norte-reset-error" role="alert" hidden></p><div class="norte-reset-actions"><button type="button" data-reset-cancel>Annuleren</button><button type="button" data-reset-confirm>Leegmaken</button></div>';
 if(!document.getElementById('norte-reset-style')){
  const style=document.createElement('style');style.id='norte-reset-style';style.textContent='.norte-reset{box-sizing:border-box;position:fixed;inset:0;margin:auto;transform:none;width:600px;max-width:calc(100vw - 48px);max-height:calc(100svh - 48px);padding:40px;border:0;border-radius:14px;background:#F6F3EC;color:#14161A;box-shadow:0 20px 60px #0003;font:400 14px/1.7 Inter,Arial,sans-serif}.norte-reset::backdrop{background:#14161A99}.norte-reset h2{margin:0 0 24px;font:500 24px/1.25 Manrope,Arial,sans-serif;letter-spacing:-.035em}.norte-reset p{margin:0 0 28px}.norte-reset-actions{display:flex;justify-content:flex-end;align-items:center;gap:24px}.norte-reset button{min-height:48px;border:0;border-radius:10px;padding:0 24px;font:500 15px Inter,Arial,sans-serif;cursor:pointer}.norte-reset [data-reset-cancel]{background:transparent;color:#14161A}.norte-reset [data-reset-confirm]{background:#14161A;color:#F6F3EC}.norte-reset button:focus-visible{outline:2px solid #14161A;outline-offset:3px}.norte-reset-error{color:#803c36}';document.head.appendChild(style);
 }
 d.addEventListener('close',()=>{d.remove();opener?.focus?.()});
 d.querySelector('[data-reset-cancel]').onclick=()=>d.close();
 d.querySelector('[data-reset-confirm]').onclick=()=>reset(d);
 document.body.appendChild(d);d.showModal();d.querySelector('[data-reset-cancel]').focus();return false;
}
function failed(d){const e=d.querySelector('.norte-reset-error');e.hidden=false;e.textContent='Opnieuw beginnen lukt nu niet. Uw plan blijft bewaard.';}
function reset(d){
 const NP=window.NorteProject;
 if(!NP){failed(d);return false}
 const previous=[PLAN,PLAN+':project',EPOCH,BACKUP].map(k=>[k,localStorage.getItem(k)]);
 try{
  const session=Object.fromEntries(ownedSession().map(k=>[k,sessionStorage.getItem(k)]));
  localStorage.setItem(BACKUP,JSON.stringify({schema:'norte-klant-herstel/1',expiresAt:Date.now()+86400000,plan:previous[0][1],meta:previous[1][1],session}));
  const raw=JSON.stringify({v:1,k:{},fin:{},v02:false,pl:{goals:[],sub:'doelen',draft:'',dal:'',conf:null,hist:[],maand:'',jaren:{},bufM:'',klant:{fase:'situatie',sitOpen:'plan',n51start:1,n51mode:'inzet',n51max:1}}});
  const before=NP.readMeta(localStorage,PLAN);
  const meta={schema:'norte-project-meta/1',projectId:NP.nieuwProjectId(),revisie:Math.max(Date.now(),(before?.revisie||0)+1),opslagControle:NP.fnv32(raw),gewijzigdOp:new Date().toISOString()};
  localStorage.setItem(PLAN+':project',JSON.stringify(meta));
  localStorage.setItem(PLAN,raw);
  localStorage.setItem(EPOCH,meta.projectId);
  boot=meta.projectId;clearSession();
 }catch(err){
  for(const [k,v]of previous){try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch{}}
  failed(d);return false;
 }
 location.assign('/koers/#start');return true;
}
window.NorteKlantHerstart={begin,epoch:()=>boot,isCurrent:()=>epoch()===boot,accepts:h=>!epoch()||h?.journeyEpoch===epoch()};
addEventListener('storage',e=>{if(e.key===EPOCH&&publicJourney()&&epoch()!==boot){clearSession();location.replace('/koers/#start')}});
addEventListener('DOMContentLoaded',()=>{
 if(!location.pathname.startsWith('/simulatie/')||!publicJourney())return;
 const header=document.querySelector('header');if(!header)return;
 const b=document.createElement('button');b.type='button';b.className='quiet';b.textContent='Opnieuw beginnen';b.onclick=begin;header.insertBefore(b,header.querySelector('.site-return'));
});
})();
