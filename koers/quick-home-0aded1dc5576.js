
window.NorteQuickHome={html:"<section id=\"quick-simulation-home\"><section class=\"intro\" aria-labelledby=\"titel\">\n    <h1 id=\"titel\">Wat kunt u opbouwen?</h1>\n    \n  </section>\n\u00a0\n  <section class=\"werkvlak\" id=\"app\">\n    <fieldset class=\"doelkeuze\" style=\"border:0;margin:0;padding:0\">\n      <legend class=\"vraag\" id=\"doelvraag\">Waarvoor?</legend>\n      <div class=\"doelen\" role=\"radiogroup\" aria-labelledby=\"doelvraag\">\n        <label class=\"doel\"><input type=\"radio\" name=\"doel\" value=\"kind\"><span class=\"rond\"></span><b>Voor een kind</b><span class=\"uitleg\">Studie, een eerste woning, een startkapitaal</span></label>\n        <label class=\"doel\"><input type=\"radio\" name=\"doel\" value=\"eigen\"><span class=\"rond\"></span><b>Een eigen doel</b><span class=\"uitleg\">U kiest zelf wat en wanneer</span></label>\n        <label class=\"doel\"><input type=\"radio\" name=\"doel\" value=\"fiscaal\"><span class=\"rond\"></span><b>Pensioensparen</b><span class=\"uitleg\">Belastingvoordeel verkennen, inkomstenjaar 2026</span></label>\n      </div>\n    </fieldset>\n\u00a0\n    <div class=\"uitklap\" id=\"uitklap\"><div><div id=\"werkplek\"></div></div></div>\n  </section></section>",cleanup:null,mount:function(host){if(this.cleanup)this.cleanup();this.cleanup=(function(){
'use strict';
var NU = new Date().getFullYear();
var OPSLAG_WERK = 'norte-snelle-simulatie:v3:werk';
var OPSLAG_VOORSTEL = 'norte-snelle-simulatie:v3:voorstel';
var STANDEN = ['sparen','defensief','neutraal','dynamisch','agressief'];
var STAND = {
  sparen:{naam:'Obligaties',pct:'0 % aandelen',kleur:'#C7CEB9',tekst:'#14161A'},
  defensief:{naam:'Defensief',pct:'30 % aandelen',kleur:'#A5B69B',tekst:'#14161A'},
  neutraal:{naam:'Neutraal',pct:'50 % aandelen',kleur:'#7E9675',tekst:'#14161A'},
  dynamisch:{naam:'Dynamisch',pct:'80 % aandelen',kleur:'#55724E',tekst:'#F4F1EA'},
  agressief:{naam:'Agressief',pct:'100 % aandelen',kleur:'#345538',tekst:'#F4F1EA'}
};
var DOEL = {
  kind:{naam:'Voor een kind',kort:'uw kind',band:'#DEE4DC',kleur:'#365C57',termijnVraag:'Wanneer heeft uw kind het nodig?',vb:{years:18,monthly:50,target:15000}},
  eigen:{naam:'Een eigen doel',kort:'uw eigen doel',band:'#E3DFD5',kleur:'#6D6746',termijnVraag:'Wanneer wilt u het bereiken?',vb:{years:10,monthly:150,target:25000}},
  fiscaal:{naam:'Pensioensparen',kort:'pensioensparen',band:'#E3DDE0',kleur:'#6F5267',vb:{storting:1050}}
};
var GRENS = {years:[1,40],monthly:[0,100000],lump:[0,10000000],target:[1,10000000],storting:[1,1350]};
 
/* ---------- toestand ---------- */
function nieuweToestand(){
  return {doel:null,transferId:null,richting:{v:'inleg',bron:'standaard'},velden:{},aanpak:{v:'neutraal',bron:'standaard'},vandaag:false,sparen:false,aanpakOpen:false,uitlegOpen:false,spaarInfoOpen:false,reviewOpen:false,afleesJaar:null};
}
var S = nieuweToestand();
function velden(doel){
  var vb = DOEL[doel].vb, v = {};
  if(doel==='fiscaal'){ v.storting={tekst:fmtGetal(vb.storting),bron:'voorbeeld',fout:null}; v.geboortejaar={tekst:'',bron:'leeg',fout:null}; return v; }
  v.years={tekst:String(vb.years),bron:'voorbeeld',fout:null};
  v.monthly={tekst:fmtGetal(vb.monthly),bron:'voorbeeld',fout:null};
  v.target={tekst:fmtGetal(vb.target),bron:'voorbeeld',fout:null};
  v.lump={tekst:'',bron:'leeg',fout:null};
  return v;
}
function bewaarWerk(){ try{ sessionStorage.setItem(OPSLAG_WERK, JSON.stringify({doel:S.doel,transferId:S.transferId,richting:S.richting,velden:S.velden,aanpak:S.aanpak,vandaag:S.vandaag,sparen:S.sparen,aanpakOpen:S.aanpakOpen,uitlegOpen:S.uitlegOpen,perDoel:S.perDoel||{}})); }catch(e){} }
function laadWerk(){ try{ var t=JSON.parse(sessionStorage.getItem(OPSLAG_WERK)||'null'); if(t && DOEL[t.doel]){ Object.assign(S,t); return true; } }catch(e){} return false; }
 
/* ---------- notatie ---------- */
function fmtGetal(n,dec){ return Number(n).toLocaleString('nl-BE',{minimumFractionDigits:dec||0,maximumFractionDigits:dec||0}); }
function eur(n,dec){ return '€ '+fmtGetal(n,dec); }
function eurCent(n){ return Math.round(n*100)%100 ? eur(n,2) : eur(n); }
function rond(v){ var a=Math.abs(v); var s = a<1000?10:a<100000?100:1000; return Math.round(v/s)*s; }
function parseBedrag(t){
  t=String(t||'').replace(/[€\s ]/g,'');
  if(!t) return null;
  if(/,\d{1,2}$/.test(t)) t=t.replace(/\./g,'').replace(',','.'); else t=t.replace(/[.,]/g,'');
  if(!/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}
function jaarTekst(j){ return j===0?'Nu':(j===1?'Over 1 jaar':'Over '+j+' jaar'); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
var CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
 
/* ---------- validatie ---------- */
function waarde(naam){ var f=S.velden[naam]; if(!f) return null; if(naam==='years'||naam==='geboortejaar'){ var t=String(f.tekst).trim(); if(!t) return null; return /^\d+$/.test(t)?Number(t):NaN; } return parseBedrag(f.tekst); }
function controleer(naam){
  var v=waarde(naam), g=GRENS[naam];
  if(naam==='lump'){ if(v===null) return null; if(isNaN(v)||v<g[0]||v>g[1]) return 'Vul een startbedrag van '+eur(0)+' tot '+eur(g[1])+' in, of laat het leeg.'; return null; }
  if(naam==='years'){ if(v===null) return 'Vul in over hoeveel jaar.'; if(isNaN(v)||v<1||v>40) return 'Kies een termijn van 1 tot 40 jaar.'; return null; }
  if(naam==='monthly'){ if(v===null) return 'Vul in hoeveel u per maand wilt inleggen.'; if(isNaN(v)||v<g[0]||v>g[1]) return 'Vul een bedrag van '+eur(0)+' tot '+eur(g[1])+' per maand in.'; return null; }
  if(naam==='target'){ if(v===null) return 'Vul het bedrag in dat u wilt bereiken.'; if(isNaN(v)||v<g[0]||v>g[1]) return 'Vul een doelbedrag tot '+eur(g[1])+' in.'; return null; }
  if(naam==='storting'){ if(v===null) return 'Vul in hoeveel u in 2026 wilt storten.'; if(isNaN(v)||v<1) return 'Vul een jaarbedrag van minstens '+eur(1)+' in.'; if(v>1350) return 'Voor 2026 telt maximaal € 1.350 mee voor belastingvermindering. Vul een bedrag tot € 1.350 in.'; return null; }
  if(naam==='geboortejaar'){ if(v===null) return null; if(isNaN(v)||v<1900||v>NU) return 'Vul een geboortejaar in, bijvoorbeeld 1985.'; if(NU-v<18) return 'Pensioensparen kan vanaf 18 jaar.'; if(v+64<NU) return 'Premies kunnen tot en met het jaar waarin u 64 wordt. Dat jaar ligt al achter u.'; return null; }
  return null;
}
function actieveVelden(){ if(S.doel==='fiscaal') return ['storting','geboortejaar']; return S.richting.v==='inleg'?['years','monthly','lump']:['years','target','lump']; }
function invoerGeldig(){
  var ok = actieveVelden().every(function(n){ return !controleer(n); });
  if(ok && S.doel!=='fiscaal' && S.richting.v==='inleg'){ if((waarde('monthly')||0)===0 && (waarde('lump')||0)===0) return false; }
  return ok;
}
function samenFout(){ return S.doel!=='fiscaal' && S.richting.v==='inleg' && !controleer('monthly') && !controleer('lump') && (waarde('monthly')||0)===0 && (waarde('lump')||0)===0; }
 
/* ---------- rekenen (uitsluitend via NorteQuickModel) ---------- */
var R = {laatste:null, fout:null};
function modelAanwezig(){ return !!(window.NorteQuickModel && typeof window.NorteQuickModel.calculate==='function'); }
function reken(){
  if(S.doel==='fiscaal'){ R.laatste=null; R.fout=null; rekenFiscaal(); return; }
  if(!modelAanwezig()){ R.laatste=null; R.fout='geenmodel'; return; }
  if(!invoerGeldig()) return; // laatste geldige uitkomst blijft, gemarkeerd als niet actueel
  var basis = {years:waarde('years'), monthly: S.richting.v==='inleg'?waarde('monthly'):0, lump:waarde('lump')||0, target: S.richting.v==='doel'?waarde('target'):null, strategy:S.aanpak.v};
  try{
    var nom = window.NorteQuickModel.calculate(Object.assign({},basis,{real:false}));
    if(!nom || !nom.ok){ R.fout=(nom&&nom.error)||'onbekend'; R.laatste=null; return; }
    // doelbedrag: in geld van vandaag tonen we dezelfde (nominaal benodigde) inleg, zodat het doelbedrag niet stil van betekenis wisselt
    var hoofd = !S.vandaag ? nom : window.NorteQuickModel.calculate(S.richting.v==='doel' ? {years:basis.years,monthly:nom.monthlyExact,lump:basis.lump,target:null,strategy:basis.strategy,real:true} : Object.assign({},basis,{real:true}));
    if(!hoofd || !hoofd.ok){ R.fout=(hoofd&&hoofd.error)||'onbekend'; R.laatste=null; return; }
    var spaar = null;
    if(S.sparen){
      var mBasis = S.richting.v==='doel' ? nom.monthlyExact : basis.monthly; // zelfde inleg als de gekozen aanpak
      spaar = window.NorteQuickModel.calculateSavings({years:basis.years,monthly:mBasis,lump:basis.lump,real:S.vandaag});
      if(!spaar || !spaar.ok) spaar = {ok:false,error:(spaar&&spaar.error)||'onbekend'};
    }
    R.laatste = {invoer:basis, nom:nom, hoofd:hoofd, spaar:spaar, richting:S.richting.v, vandaag:S.vandaag, doel:S.doel};
    R.fout = null;
  }catch(e){ R.fout = String(e&&e.message||e); R.laatste=null; }
}
 
/* ---------- opbouw van de werkplek ---------- */
var W = document.getElementById('werkplek');
function render(){
  if(!S.doel){ W.innerHTML=''; return; }
  W.innerHTML = '<div class="werk">'+ (S.doel==='fiscaal'?invoerFiscaal():invoerOpbouw()) + '<section class="resultaat" id="resultaat" aria-live="polite" aria-atomic="false"></section></div>';
  bindInvoer();
  renderResultaat();
}
function veldHTML(naam, o){
  var f=S.velden[naam], fout=f.fout;
  var tag = f.bron==='voorbeeld' ? '<span class="tag" id="tag-'+naam+'">Voorbeeld</span>' : (o.optioneel?'<span class="tag">Optioneel</span>':'');
  var help = o.hulp ? '<p class="hulp" id="hulp-'+naam+'">'+o.hulp+'</p>' : '';
  var desc = [fout?'fout-'+naam:'', o.hulp?'hulp-'+naam:'', f.bron==='voorbeeld'?'tag-'+naam:''].filter(Boolean).join(' ');
  var inp = '<input id="in-'+naam+'" data-veld="'+naam+'" inputmode="numeric" autocomplete="off" value="'+esc(f.tekst)+'"'+(o.placeholder?' placeholder="'+o.placeholder+'"':'')+(desc?' aria-describedby="'+desc+'"':'')+(fout?' aria-invalid="true"':'')+'>';
  var veld = '<div class="bedrag'+(o.groot?' groot':'')+'">'+(o.val?'<span class="val" aria-hidden="true">€</span>':'')+inp+(o.eh?'<span class="eh">'+o.eh+'</span>':'')+'</div>';
  if(o.stapper) veld = '<div class="stapper"><button type="button" class="knop-rond" data-stap="-1" aria-label="Eén jaar minder">−</button>'+veld+'<button type="button" class="knop-rond" data-stap="1" aria-label="Eén jaar meer">+</button></div>';
  return '<div class="veld'+(fout?' fout':'')+'"><div class="lab-rij"><label class="lab" for="in-'+naam+'">'+o.label+'</label>'+tag+'</div>'+veld+(fout?'<p class="foutregel" id="fout-'+naam+'">'+fout+'</p>':'')+help+'</div>';
}
function invoerOpbouw(){
  var d=DOEL[S.doel], inleg=S.richting.v==='inleg';
  var h = '<div class="invoer">';
  h += veldHTML('years',{label:d.termijnVraag,eh:'jaar',stapper:true});
  h += '<div class="tweestand-rij"><span class="lab" id="richting-lab">Rekenen vanuit</span><div class="tweestand" role="group" aria-labelledby="richting-lab"><button type="button" data-richting="inleg" aria-pressed="'+inleg+'">Mijn inleg</button><button type="button" data-richting="doel" aria-pressed="'+(!inleg)+'">Een doelbedrag</button></div></div>';
  h += inleg ? veldHTML('monthly',{label:'Hoeveel wilt u per maand inleggen?',val:true,eh:'per maand',groot:true})
             : veldHTML('target',{label:'Welk bedrag wilt u dan hebben?',val:true,groot:true});
  h += veldHTML('lump',{label:'Startbedrag nu, eenmalig',val:true,optioneel:true,placeholder:'Nog niet ingevuld'});
  h += aanpakHTML();
  h += '</div>';
  return h;
}
function aanpakHTML(){
  var h='', a=STAND[S.aanpak.v];
  h += '<div class="veld"><div class="compact"><div><p class="lab" id="aanpak-lab">Aanpak in dit rekenvoorbeeld</p><p>'+a.naam+'</p><p class="tag" id="aanpak-sub">Tot '+a.pct+(S.aanpak.bron==='standaard'?' · rekenvoorbeeld':'')+'</p><p class="hulp">Geen persoonlijk beleggersprofiel</p></div><button type="button" class="linkknop" id="aanpak-knop" aria-expanded="'+S.aanpakOpen+'" aria-controls="aanpak-paneel">'+(S.aanpakOpen?'Sluiten':'Wijzigen')+'</button></div>';
  h += '<div class="uitklap'+(S.aanpakOpen?' open':'')+'"><div id="aanpak-paneel"'+(S.aanpakOpen?'':' hidden')+'><p class="hulp">Dit is een rekenkeuze om het verschil te zien, geen advies en geen beleggersprofiel. Wat bij u past, bekijkt u later in uw plan. Het model verlaagt het aandelendeel naarmate uw termijn nadert.</p><fieldset class="aanpakken" aria-labelledby="aanpak-lab">';
  STANDEN.forEach(function(k){ var s=STAND[k]; h+='<label class="aanpak"><input type="radio" name="aanpak" value="'+k+'"'+(S.aanpak.v===k?' checked':'')+'><span class="rond"></span><span class="staal" style="background:'+s.kleur+'"></span>'+s.naam+'<span class="pct">tot '+s.pct+'</span></label>'; });
  h += '</fieldset></div></div></div>';
  return h;
}
function invoerFiscaal(){
  var h='<div class="invoer">';
  h+=veldHTML('storting',{label:'Hoeveel wilt u in 2026 storten?',val:true,eh:'per jaar',groot:true});
  h+='<section id="fiscaal-voordeel" aria-label="Mogelijke belastingvermindering"></section>';
  h+=veldHTML('geboortejaar',{label:'In welk jaar bent u geboren?',optioneel:true,placeholder:'Nog niet ingevuld',hulp:'Voor de termijn van uw opbouw.'});
  var gb=waarde('geboortejaar'),kan=gb!==null&&!controleer('geboortejaar')&&gb+64>NU;
  h+='<div id="fiscaal-aanpak"'+(kan?'':' hidden')+'>'+aanpakHTML()+'</div></div>';
  return h;
}

/* ---------- invoerbinding ---------- */
function bindInvoer(){
  W.querySelectorAll('input[data-veld]').forEach(function(inp){
    var naam=inp.dataset.veld;
    inp.addEventListener('input',function(){
      var f=S.velden[naam]; f.tekst=inp.value; f.bron = inp.value.trim()? 'gebruiker':'leeg';
      var tag=document.getElementById('tag-'+naam); if(tag && f.bron!=='voorbeeld'){ tag.remove(); inp.setAttribute('aria-describedby',(inp.getAttribute('aria-describedby')||'').replace('tag-'+naam,'').trim()); }
      if(f.fout && !controleer(naam)){ f.fout=null; zetFout(naam); }
      if(naam==='years'){ var hp=document.getElementById('hulp-years'); var y=waarde('years'); if(hp) hp.textContent = (y>=1&&y<=40)?'Rond '+(NU+y):' '; }
      opnieuw();
    });
    inp.addEventListener('blur',function(){
      var f=S.velden[naam]; f.fout=controleer(naam);
      if(!f.fout && (naam==='monthly'||naam==='lump') && samenFout()) { S.velden.monthly.fout='Vul een maandbedrag of een startbedrag in om iets op te bouwen.'; zetFout('monthly'); }
      if(!f.fout && naam!=='years' && naam!=='geboortejaar'){ var v=waarde(naam); if(v!==null && !isNaN(v)){ f.tekst=fmtGetal(v, v%1?2:0); inp.value=f.tekst; } }
      zetFout(naam); bewaarWerk();
    });
  });
  W.querySelectorAll('[data-stap]').forEach(function(b){ b.addEventListener('click',function(){
    var y=waarde('years'); if(y===null||isNaN(y)) y=DOEL[S.doel].vb.years; y=Math.max(1,Math.min(40,y+Number(b.dataset.stap)));
    var f=S.velden.years; f.tekst=String(y); f.bron='gebruiker'; f.fout=null;
    var inp=document.getElementById('in-years'); inp.value=f.tekst; var tag=document.getElementById('tag-years'); if(tag) tag.remove();
    var hp=document.getElementById('hulp-years'); if(hp) hp.textContent='Rond '+(NU+y); zetFout('years'); opnieuw();
  }); });
  W.querySelectorAll('[data-richting]').forEach(function(b){ b.addEventListener('click',function(){
    if(S.richting.v===b.dataset.richting) return; S.richting={v:b.dataset.richting,bron:'gebruiker'}; S.reviewOpen=false;
    reken(); render(); var nb=W.querySelector('[data-richting="'+S.richting.v+'"]'); if(nb) nb.focus(); bewaarWerk();
  }); });
  var ak=document.getElementById('aanpak-knop');
  if(ak) ak.addEventListener('click',function(){ S.aanpakOpen=!S.aanpakOpen; var p=document.getElementById('aanpak-paneel'); var u=p.parentNode;
    if(S.aanpakOpen){ p.hidden=false; requestAnimationFrame(function(){u.classList.add('open');}); } else { u.classList.remove('open'); setTimeout(function(){ if(!S.aanpakOpen) p.hidden=true; },parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--t-open'))||0); }
    ak.setAttribute('aria-expanded',S.aanpakOpen); ak.textContent=S.aanpakOpen?'Sluiten':'Wijzigen'; bewaarWerk(); });
  W.querySelectorAll('input[name="aanpak"]').forEach(function(r){ r.addEventListener('change',function(){
    S.aanpak={v:r.value,bron:'gebruiker'}; var a=STAND[r.value]; var sub=document.getElementById('aanpak-sub'); sub.previousElementSibling.textContent=a.naam; sub.textContent='Tot '+a.pct; opnieuw();
  }); });
}
function zetFout(naam){
  var inp=document.getElementById('in-'+naam); if(!inp) return; var veld=inp.closest('.veld'); var f=S.velden[naam];
  var oud=document.getElementById('fout-'+naam); if(oud) oud.remove();
  var ids=(inp.getAttribute('aria-describedby')||'').split(' ').filter(function(x){return x && x!=='fout-'+naam;});
  if(f.fout){ var p=document.createElement('p'); p.className='foutregel'; p.id='fout-'+naam; p.textContent=f.fout; var ref=veld.querySelector('.hulp'); veld.insertBefore(p, ref||null); ids.unshift('fout-'+naam); inp.setAttribute('aria-invalid','true'); veld.classList.add('fout'); }
  else { inp.removeAttribute('aria-invalid'); veld.classList.remove('fout'); }
  if(ids.length) inp.setAttribute('aria-describedby',ids.join(' ')); else inp.removeAttribute('aria-describedby');
}
var timer=null;
function opnieuw(){ clearTimeout(timer); timer=setTimeout(function(){ reken(); renderResultaat(); bewaarWerk(); },60); }
 
/* ---------- resultaat ---------- */
function renderResultaat(){
  var el=document.getElementById('resultaat'); if(!el) return;
  if(S.doel==='fiscaal'){ el.innerHTML=resultaatFiscaal(); bindResultaat(el); var F=R.fisc; if(F&&F.op&&F.op.ok) tekenOpbouw(F.op); return; }
  if(R.fout==='geenmodel'){ el.innerHTML='<div class="blokkade" role="alert"><strong>Het rekenvoorbeeld kan nu niet worden getoond.</strong><p style="margin:4px 0 0">De rekenmodule is niet geladen. Er wordt geen vervangend of geschat resultaat getoond. Laad de pagina opnieuw.</p></div>'; return; }
  if(R.fout){ el.innerHTML='<div class="blokkade" role="alert"><strong>Deze combinatie kon niet berekend worden.</strong><p style="margin:4px 0 0">Pas de termijn of het bedrag aan. Er wordt geen vervangend resultaat getoond.</p></div>'; return; }
  var L=R.laatste; if(!L){ el.innerHTML=''; return; }
  var oud = !invoerGeldig() || !zelfdeInvoer(L);
  var d=DOEL[L.doel]||DOEL[S.doel], h=L.hoofd, n=L.nom, y=L.invoer.years;
  var x='';
  var voorbeeld=actieveVelden().some(function(k){return S.velden[k]&&S.velden[k].bron==='voorbeeld';}); var waarWanneer = DOEL[L.doel].naam+' · '+y+' jaar'+(voorbeeld?' · Voorbeeld':'');
  x += '<p class="res-kop">'+waarWanneer+'</p>';
  if(L.richting==='inleg'){
    x += '<p class="res-waarde">Ongeveer '+eur(rond(h.value))+'</p>';
    x += '<p class="res-sub">'+(L.vandaag?'In geld van vandaag, dus omgerekend naar wat u er nu mee kunt kopen. ':'')+'U legt zelf '+eur(Math.round(n.contributed))+' in'+inlegUitleg(L)+'.</p>';
  } else {
    var m=Math.round(n.monthlyExact);
    if(m<=0){ x += '<p class="res-waarde">Geen maandinleg nodig</p><p class="res-sub">In dit voorbeeld haalt uw startbedrag van '+eur(L.invoer.lump)+' het doel van '+eur(L.invoer.target)+' al.</p>'; }
    else { x += '<p class="res-waarde">Ongeveer '+eur(m)+' per maand</p>';
      x += '<p class="res-sub">om '+eur(L.invoer.target)+' te bereiken, als bedrag op dat moment. U legt zelf ongeveer '+eur(rond(n.contributed))+' in'+(L.invoer.lump?', startbedrag inbegrepen':'')+'.</p>'; }
  }
  x += '<p class="nietactueel">Niet actueel: '+(invoerGeldig()?'wordt bijgewerkt…':'vul de invoer links aan of verbeter ze.')+'</p>';
  x += '<div class="werkbalk"><div class="tweestand-rij"><span class="lab" id="eenheid-lab">Bedragen</span><div class="tweestand" role="group" aria-labelledby="eenheid-lab"><button type="button" data-eenheid="0" aria-pressed="'+(!S.vandaag)+'">Op dat moment</button><button type="button" data-eenheid="1" aria-pressed="'+S.vandaag+'">In geld van vandaag</button></div></div>';
  x += '<div class="vergelijk"><button type="button" class="hoofd" id="sparen-knop" aria-pressed="'+S.sparen+'"><span class="vink" aria-hidden="true"></span>Vergelijk met een spaarrekening</button><button type="button" class="pijl" id="sparen-info" aria-expanded="'+S.spaarInfoOpen+'" aria-controls="spaar-pop" aria-label="Uitgangspunt bij de spaarrekening">'+CHEV+'</button></div></div>';
  x += '<div class="popover" id="spaar-pop"'+(S.spaarInfoOpen?'':' hidden')+'>De spaarrekening rekent met <strong>'+fmtGetal(n.assumptions.savingsRate,2)+' % spaarrente per jaar</strong>, een vast uitgangspunt van dit rekenmodel. U legt dan exact hetzelfde in'+(L.richting==='doel'?' (ongeveer '+eur(Math.round(n.monthlyExact))+' per maand)':'')+'.</div>';
  x += '<div class="grafiek-zone"><div class="aflees" id="aflees" aria-hidden="true"></div><div class="grafiek" id="grafiek" tabindex="0" role="slider" aria-label="Grafiek aflezen per jaar" aria-valuemin="0" aria-valuemax="'+y+'"></div><p class="sleutel" id="sleutel"></p></div>';
  x += duiding(L);
  x += vervolgHTML();
  el.innerHTML = x;
  el.classList.toggle('oud', oud);
  bindResultaat(el);
  tekenOpbouw(L);
}
function inlegUitleg(L){ var p=[]; if(L.invoer.monthly) p.push(eur(L.invoer.monthly)+' per maand'); if(L.invoer.lump) p.push(eur(L.invoer.lump)+' startbedrag'); return p.length?': '+p.join(' en '):''; }
function zelfdeInvoer(L){ var i=L.invoer; return i.years===waarde('years') && i.lump===(waarde('lump')||0) && L.richting===S.richting.v && (L.richting==='inleg'? i.monthly===waarde('monthly') : i.target===waarde('target')) && i.strategy===S.aanpak.v && L.vandaag===S.vandaag && L.doel===S.doel && (!!L.spaar)===S.sparen; }
function faseZin(ph, y){
  if(!ph||!ph.length) return '';
  return ph.map(function(p){ var a=Math.round(p.from), b=Math.round(Math.min(p.to,y)); return STAND[p.strategy].naam+' ('+(a===0?'nu':'jaar '+a)+' tot '+(b===y?'het einde':'jaar '+b)+')'; }).join(', ');
}
function duiding(L){
  var h=L.hoofd,a=h.assumptions;
  return '<div class="duiding"><p>Eén rekenpad, geen voorspelling. Uw belegging kan ook op de einddatum minder waard zijn. Kosten en belastingen zijn niet meegerekend.</p><button type="button" class="opener" id="uitleg-knop" aria-expanded="'+S.uitlegOpen+'" aria-controls="uitleg">Uitgangspunten '+CHEV+'</button><div class="detail" id="uitleg"'+(S.uitlegOpen?'':' hidden')+'><p>Het rekenpad gebruikt aandelen ('+fmtGetal(a.stockNominal,2)+' %) en obligaties ('+fmtGetal(a.bondNominal,2)+' %) met vaste rendementsaannames en schommelingen. De samenstelling verandert met de termijn: '+faseZin(h.phases,L.invoer.years)+'. Ook het vak Obligaties in deze modelcurve heeft risico; het is geen bankspaarrekening. Een spaarvergelijking gebruikt apart de bestaande spaarmotor met '+fmtGetal(a.savingsRate,2)+' % rente.</p><p>Koopkracht rekent met '+fmtGetal(a.inflation)+' % inflatie per jaar. Dit zijn modelaannames, geen producttarieven of beloften. Uw financiële situatie en passendheid zijn hier niet onderzocht.</p></div></div>';
}
function vervolgHTML(){return '<div class="vervolg"><button type="button" class="knop primair" id="mee-knop">Verder met dit doel</button></div>';}
function bindResultaat(el){
  el.querySelectorAll('[data-eenheid]').forEach(function(b){ b.addEventListener('click',function(){ var v=b.dataset.eenheid==='1'; if(v===S.vandaag) return; S.vandaag=v; reken(); renderResultaat(); var nb=document.querySelector('[data-eenheid="'+(v?1:0)+'"]'); if(nb) nb.focus(); bewaarWerk(); }); });
  var sk=document.getElementById('sparen-knop'); if(sk) sk.addEventListener('click',function(){ S.sparen=!S.sparen; reken(); renderResultaat(); document.getElementById('sparen-knop')?.focus(); bewaarWerk(); });
  var si=document.getElementById('sparen-info'); if(si){ si.addEventListener('click',function(){ S.spaarInfoOpen=!S.spaarInfoOpen; document.getElementById('spaar-pop').hidden=!S.spaarInfoOpen; si.setAttribute('aria-expanded',S.spaarInfoOpen); });
    si.addEventListener('keydown',function(e){ if(e.key==='Escape'&&S.spaarInfoOpen){ S.spaarInfoOpen=false; document.getElementById('spaar-pop').hidden=true; si.setAttribute('aria-expanded','false'); } }); }
  var uk=document.getElementById('uitleg-knop'); if(uk) uk.addEventListener('click',function(){ S.uitlegOpen=!S.uitlegOpen; document.getElementById('uitleg').hidden=!S.uitlegOpen; uk.setAttribute('aria-expanded',S.uitlegOpen); bewaarWerk(); });
  var mk=document.getElementById('mee-knop'); if(mk) mk.addEventListener('click',function(){clearTimeout(timer);reken(); if(!invoerGeldig()){actieveVelden().forEach(function(k){S.velden[k].fout=controleer(k);zetFout(k);});if(samenFout()){S.velden.monthly.fout='Vul een maandbedrag of startbedrag in.';zetFout('monthly');}var bad=W.querySelector('[aria-invalid="true"]');if(bad)bad.focus();return;} var transfer=payload();bewaarWerk();transfer.status='voorstel_niet_verwerkt';try{sessionStorage.setItem('norte-snelle-simulatie:v3:overdracht',JSON.stringify(transfer));}catch(e){var probleem=document.createElement('p');probleem.setAttribute('role','alert');probleem.textContent='Uw invoer kon niet worden klaargezet. Probeer opnieuw in deze browser.';mk.parentElement.appendChild(probleem);return;} location.assign(window.NORTE_QUICK_PLAN_URL||'/ontwerp/klantflow/?instap=snelle-simulatie'); });

}
 
/* ---------- overdracht (lokaal) ---------- */
function payload(){
  if(!S.transferId)S.transferId='norte-'+Date.now()+'-'+Math.random().toString(36).slice(2,9); var p={schema:'norte-snelle-simulatie/1',transferId:S.transferId,gemaakt:new Date().toISOString(),route:S.doel==='fiscaal'?'pensioensparen':'opbouw',
    gekozenDoorKlant:{doel:{waarde:S.doel,label:DOEL[S.doel].naam}},voorbeeldNietGekozen:{},aannames:{},illustratie:null,nogNietIngevuld:[]};
  var g=p.gekozenDoorKlant, vb=p.voorbeeldNietGekozen;
  function zet(naam,sleutel,eenheid){ var f=S.velden[naam]; if(!f) return; var v=waarde(naam); var item={waarde:(v===null||isNaN(v))?null:v,eenheid:eenheid};
    if(f.bron==='gebruiker' && item.waarde!==null && !controleer(naam)) g[sleutel]=item; else if(f.bron==='voorbeeld') vb[sleutel]=item; else p.nogNietIngevuld.push(sleutel); }
  if(S.doel==='fiscaal'){ zet('storting','jaarlijkseStorting','EUR per jaar, inkomstenjaar 2026'); zet('geboortejaar','geboortejaar','kalenderjaar');
    if(S.aanpak.bron==='gebruiker') g.aanpakRekenvoorbeeld={waarde:S.aanpak.v,betekenis:'rekenkeuze, geen beleggersprofiel'}; else vb.aanpakRekenvoorbeeld={waarde:S.aanpak.v,betekenis:'standaardvoorbeeld, geen beleggersprofiel'};
    p.aannames={regeling:'pensioensparen, belastingvermindering inkomstenjaar 2026',tot1050:{percentage:30,op:'storting'},van1050tot1350:{percentage:25,op:'hele storting'},maximumMeetellend:1350,persoonlijkRechtVastgesteld:false,vereist:['voldoende verschuldigde personenbelasting','contractvoorwaarden en looptijd'],eindbelasting:{percentage:8,grondslag:'verschilt per vorm (spaarfonds, tak 21, tak 23); niet berekend'}};
    var F=R.fisc;
    if(F && F.A!=null && !controleer('storting')){ var fb=fisc(F.A); p.illustratie={belastingvermindering:{soort:'theoretisch, per jaar, niet bij kapitaal opgeteld',bedrag:fb.bedrag,percentage:fb.pct,storting:F.A}}; }
    if(F && F.op && F.op.ok && !fiscOpOud()){ var n=F.op.nom; p.aannames.rekenmodel=Object.assign({},n.assumptions,{rekenbron:n.source,persoonlijkProfiel:false}); p.illustratie=p.illustratie||{}; p.illustratie.opbouw={soort:'rekenvoorbeeld, bruto: vóór productkosten en vóór eindbelasting, zonder belastingvermindering',totJaar:NU+F.op.invoer.years,termijnJaren:n.years,maandEquivalentVanJaarstorting:F.op.invoer.monthly,brutoWaardeNominaal:n.value,gestortNominaal:n.contributed,aanpakFases:n.phases,daling:n.drawdown,weergaveInGeldVanVandaag:S.vandaag}; }
    p.nogNietIngevuld.push('verschuldigde personenbelasting','bestaande contracten');
    return p; }
  zet('years','termijnJaren','jaar vanaf nu'); zet('lump','startbedrag','EUR eenmalig');
  if(S.richting.v==='inleg') zet('monthly','maandinleg','EUR per maand'); else zet('target','doelbedrag','EUR op doeldatum');
  if(S.richting.bron==='gebruiker') g.rekenrichting={waarde:S.richting.v}; else vb.rekenrichting={waarde:S.richting.v};
  if(S.aanpak.bron==='gebruiker') g.aanpakRekenvoorbeeld={waarde:S.aanpak.v,betekenis:'rekenkeuze, geen beleggersprofiel'}; else vb.aanpakRekenvoorbeeld={waarde:S.aanpak.v,betekenis:'standaardvoorbeeld, geen beleggersprofiel'};
  var L=R.laatste;
  if(L && L.nom && zelfdeInvoer(L)){ var n=L.nom; p.aannames=Object.assign({},n.assumptions,{rekenbron:n.source,persoonlijkProfiel:false});
    p.illustratie={soort:'rekenvoorbeeld, geen voorspelling',termijnJaren:n.years,waardeNominaal:n.value,ingelegdNominaal:n.contributed,maandinleg:L.richting==='doel'?n.monthlyExact:n.monthly,aanpakFases:n.phases,daling:n.drawdown,weergaveInGeldVanVandaag:S.vandaag}; }
  return p;
}
/* ---------- grafiek opbouw: tekent uitsluitend de punten van het rekenmodel ---------- */
var NS='http://www.w3.org/2000/svg';
function niceStap(max,n){ var r=max/n, m=Math.pow(10,Math.floor(Math.log10(r))); var c=[1,2,2.5,5,10]; for(var i=0;i<c.length;i++) if(c[i]*m>=r) return c[i]*m; return 10*m; }
function asLabel(v,smal){ if(smal && v>=1000) return '€ '+fmtGetal(v/1000,v%1000?1:0)+'k'; return eur(v); }
function puntOp(pts,j){ var b=pts[0],bd=1e9; for(var i=0;i<pts.length;i++){ var dd=Math.abs(pts[i].year-j); if(dd<bd){bd=dd;b=pts[i];} } return b; }
function tekenOpbouw(L){
  var box=document.getElementById('grafiek'); if(!box) return;
  var w=Math.max(280, Math.round(box.clientWidth||600)), smal=w<520;
  var h=smal?260:340, ml=smal?44:68, mr=smal?8:16, mt=16, band=24, mb=band+34;
  var pw=w-ml-mr, ph=h-mt-mb, y=L.invoer.years, H=L.hoofd, N=L.nom;
  var pts=H.points.filter(function(p){return p.year<=y+1e-9;});
  var npts=N.points.filter(function(p){return p.year<=y+1e-9;});
  var sp=(L.spaar&&L.spaar.ok)?L.spaar.points.filter(function(p){return p.year<=y+1e-9;}):null;
  var toonIn=!L.vandaag;
  var max=0; pts.forEach(function(p){max=Math.max(max,p.value);}); if(toonIn) npts.forEach(function(p){max=Math.max(max,p.contributed);}); if(sp) sp.forEach(function(p){max=Math.max(max,p.value);}); if(L.richting==='doel'&&L.invoer.target) if(!L.vandaag) max=Math.max(max,L.invoer.target);
  var st=niceStap(max||1,smal?3:4), ymax=Math.ceil((max*1.04)/st)*st||st;
  var X=function(j){return ml+pw*j/y;}, Y=function(v){return mt+ph*(1-v/ymax);};
  var s='<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true" focusable="false" font-family="Inter, Arial, sans-serif">';
  for(var v=0; v<=ymax+1e-6; v+=st){ s+='<line x1="'+ml+'" x2="'+(ml+pw)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="'+(v===0?'#C5C0B6':'#E4DFD5')+'" stroke-width="1"/>'; s+='<text x="'+(ml-8)+'" y="'+(Y(v)+4)+'" text-anchor="end" font-size="12" fill="#60615F">'+asLabel(v,smal)+'</text>'; }
  // daling (gebeurtenis, geen fout)
  var dd=H.drawdown;
  if(dd && dd.amount>0 && dd.to>dd.from){ s+='<rect x="'+X(dd.from)+'" y="'+mt+'" width="'+Math.max(2,X(Math.min(dd.to,y))-X(dd.from))+'" height="'+ph+'" fill="#14161A" opacity="0.05"/>'; }
  var d=DOEL[L.doel];
  var lijn=function(arr,key){ return arr.map(function(p,i){return (i?'L':'M')+X(p.year).toFixed(1)+' '+Y(p[key]).toFixed(1);}).join(''); };
  s+='<path d="'+lijn(pts,'value')+'L'+X(y)+' '+Y(0)+'L'+X(0)+' '+Y(0)+'Z" fill="'+d.band+'" opacity="0.85"/>';
  if(toonIn) s+='<path d="'+lijn(npts,'contributed')+'" fill="none" stroke="#60615F" stroke-width="1.5"/>';
  if(sp) s+='<path d="'+lijn(sp,'value')+'" fill="none" stroke="#9C8666" stroke-width="2.3" stroke-dasharray="7 5"/>';
  s+='<path d="'+lijn(pts,'value')+'" fill="none" stroke="#526754" stroke-width="2.8" stroke-linejoin="round"/>';
  if(dd && dd.amount>0){ var dx=X((dd.from+Math.min(dd.to,y))/2); var lbl='Terugval in het rekenpad'; var tw=lbl.length*6.6; var lx=Math.max(ml+tw/2, Math.min(ml+pw-tw/2,dx)); s+='<text x="'+lx+'" y="'+(mt+12)+'" text-anchor="middle" font-size="12" fill="#60615F">'+lbl+'</text>'; }
  if(L.richting==='doel'&&L.invoer.target&&!L.vandaag){ s+='<line x1="'+(X(y)-10)+'" x2="'+X(y)+'" y1="'+Y(L.invoer.target)+'" y2="'+Y(L.invoer.target)+'" stroke="'+d.kleur+'" stroke-width="2"/><circle cx="'+X(y)+'" cy="'+Y(L.invoer.target)+'" r="5" fill="#F6F3EC" stroke="'+d.kleur+'" stroke-width="2"/>'; var tl='Doel '+eur(L.invoer.target); s+='<text x="'+(X(y)-14)+'" y="'+(Y(L.invoer.target)-10)+'" text-anchor="end" font-size="12" font-weight="500" fill="'+d.kleur+'">'+tl+'</text>'; }
  // aanpakband
  var by=mt+ph+6, past=true;
  (H.phases||[]).forEach(function(p){ var a=X(Math.max(0,p.from)), b=X(Math.min(y,p.to)); if(b<=a) return; var sd=STAND[p.strategy]||STAND.neutraal; s+='<rect x="'+a+'" y="'+by+'" width="'+(b-a)+'" height="'+band+'" fill="'+sd.kleur+'"/>'; var nm=sd.naam; if((b-a)>nm.length*7+12) s+='<text x="'+((a+b)/2)+'" y="'+(by+16)+'" text-anchor="middle" font-size="12" fill="'+sd.tekst+'">'+nm+'</text>'; else past=false; });
  // x-as
  var stappen=[1,2,5,10], xs=stappen[stappen.length-1]; for(var i=0;i<stappen.length;i++){ if(y/stappen[i] <= (smal?4:7)){ xs=stappen[i]; break; } }
  var ticks=[0]; for(var t=xs;t<y;t+=xs) ticks.push(t); if(y-ticks[ticks.length-1] < xs*0.5 && ticks.length>1) ticks.pop(); ticks.push(y);
  ticks.forEach(function(t){ var tx=X(t); var anc=t===0?'start':(t===y?'end':'middle'); s+='<text x="'+tx+'" y="'+(by+band+18)+'" text-anchor="'+anc+'" font-size="12" fill="#60615F">'+(t===0?'Nu':(NU+t))+'</text>'; });
  // afleescursor
  s+='<g id="cursor"><line id="c-lijn" y1="'+mt+'" y2="'+(mt+ph)+'" stroke="#14161A" stroke-width="1"/><circle id="c-pt" r="5" fill="#526754" stroke="#F6F3EC" stroke-width="2"/></g>';
  s+='</svg>';
  box.innerHTML=s;
  var sl=document.getElementById('sleutel');
  var kz=[]; if(!past && H.phases) kz.push(faseZin(H.phases,y)+'.');
  kz.push(toonIn?'Dikke lijn: rekenpad. Dunne lijn: eigen inleg.':'Bedragen in koopkracht van vandaag. De nominale inleg is niet als lijn getekend.');
  if(sp) kz.push('Onderbroken lijn: hetzelfde bedrag op een spaarrekening.');
  if(L.spaar && !L.spaar.ok) kz.push('De spaarvergelijking kon niet berekend worden.');
  sl.textContent=kz.join(' ');
  if(S.afleesJaar===null || S.afleesJaar>y) S.afleesJaar=y;
  var zet=function(j){ j=Math.max(0,Math.min(y,j)); S.afleesJaar=j; var p=puntOp(pts,j), np=puntOp(npts,j), spp=sp?puntOp(sp,j):null;
    var cx=X(j); var cl=box.querySelector('#c-lijn'); cl.setAttribute('x1',cx); cl.setAttribute('x2',cx); var cp=box.querySelector('#c-pt'); cp.setAttribute('cx',cx); cp.setAttribute('cy',Y(p.value));
    var t='<span class="wanneer">'+jaarTekst(j)+'</span><span class="reeks"><span class="lijnstaal"></span>Waarde <b>'+eur(rond(p.value))+'</b></span>';
    if(toonIn) t+='<span class="reeks"><span class="lijnstaal in"></span>Ingelegd <b>'+eur(rond(np.contributed))+'</b></span>';
    if(spp) t+='<span class="reeks"><span class="lijnstaal sp"></span>Sparen <b>'+eur(rond(spp.value))+'</b></span>';
    document.getElementById('aflees').innerHTML=t;
    box.setAttribute('aria-valuenow',j); box.setAttribute('aria-valuetext',jaarTekst(j)+(j?', '+(NU+j):'')+': waarde '+eur(rond(p.value))+(toonIn?', ingelegd '+eur(rond(np.contributed)):'')+(spp?', sparen '+eur(rond(spp.value)):'')+(L.vandaag?', in geld van vandaag':''));
  };
  zet(S.afleesJaar);
  var naarJaar=function(e){ var r=box.getBoundingClientRect(); var sx=(e.clientX-r.left)*(w/r.width); return Math.round((sx-ml)/pw*y); };
  box.onpointermove=function(e){ box.parentElement.classList.add('leest'); zet(naarJaar(e)); }; box.onpointerleave=function(){if(document.activeElement!==box)box.parentElement.classList.remove('leest');}; box.onfocus=function(){box.parentElement.classList.add('leest');}; box.onblur=function(){box.parentElement.classList.remove('leest');};
  box.onpointerdown=function(e){ box.parentElement.classList.add('leest'); zet(naarJaar(e)); };
  box.onkeydown=function(e){ var k=e.key, j=S.afleesJaar; if(k==='ArrowRight'||k==='ArrowUp') j++; else if(k==='ArrowLeft'||k==='ArrowDown') j--; else if(k==='Home') j=0; else if(k==='End') j=y; else if(k==='PageUp') j+=5; else if(k==='PageDown') j-=5; else return; e.preventDefault(); zet(j); };
}
 
/* ---------- pensioensparen ---------- */
// Belastingvermindering 2026 (regels uit de bouwbrief, bevestigd door ROOT): tot € 1.050: 30 % van de storting; boven € 1.050 tot € 1.350: 25 % van de hele storting.
function fisc(A){ return A<=1050 ? {pct:30,bedrag:0.30*A} : {pct:25,bedrag:0.25*Math.min(A,1350)}; }
function rekenFiscaal(){
  var F=R.fisc||(R.fisc={});
  if(!controleer('storting')) F.A=waarde('storting');
  var gb=waarde('geboortejaar');
  if(gb===null){ F.op=null; return; }
  if(controleer('geboortejaar') || controleer('storting') || F.A==null) return; // laatste geldige opbouw blijft, gemarkeerd als niet actueel
  if(!modelAanwezig()){ F.op={ok:false,geenModel:true}; return; }
  var jaren=gb+64-NU;
  if(jaren<1){ F.op={ok:false,laatsteJaar:true,gb:gb,A:F.A}; return; }
  var y=Math.min(40,jaren), basis={years:y,monthly:F.A/12,lump:0,target:null,strategy:S.aanpak.v};
  try{
    var nom=window.NorteQuickModel.calculate(Object.assign({},basis,{real:false}));
    if(!nom||!nom.ok){ F.op={ok:false}; return; }
    var hoofd=S.vandaag?window.NorteQuickModel.calculate(Object.assign({},basis,{real:true})):nom;
    if(!hoofd||!hoofd.ok){ F.op={ok:false}; return; }
    F.op={ok:true,invoer:basis,nom:nom,hoofd:hoofd,spaar:null,richting:'inleg',vandaag:S.vandaag,doel:'fiscaal',gb:gb,A:F.A,afgekapt:jaren>40,t60:gb+60-NU};
  }catch(e){ F.op={ok:false}; }
}
function fiscOpOud(){ var F=R.fisc, o=F&&F.op; if(!o||!o.ok) return false; return !!controleer('storting') || !!controleer('geboortejaar') || o.A!==waarde('storting') || o.gb!==waarde('geboortejaar') || o.invoer.strategy!==S.aanpak.v || o.vandaag!==S.vandaag; }
function alternatief(A){
  if(A<1050) return 'Tot € 1.050 levert elke extra gestorte euro 30 cent vermindering op. Met € 1.050 is dat € 315.';
  if(A===1050) return 'Stort u meer dan € 1.050, dan geldt 25 % op het hele bedrag. Dat levert pas vanaf € 1.260 meer op dan € 315.';
  if(A<1260) return 'Ter vergelijking: een storting van € 1.050 geeft € 315. Dat is meer vermindering met minder storting.';
  if(A===1260) return 'Ter vergelijking: een storting van € 1.050 geeft evenveel, € 315.';
  if(A<1350) return 'Ter vergelijking: € 1.050 storten geeft € 315; € 1.350 storten geeft het maximum van € 337,50.';
  return 'Dit is het hoogste bedrag dat in 2026 meetelt.';
}
function resultaatFiscaal(){
  var F=R.fisc||{}, x='';
  if(F.A==null){ return '<div class="blok"><p class="res-kop">Belastingvermindering · inkomstenjaar 2026</p><p class="hulp">Vul een jaarbedrag in.</p></div>'+vervolgHTML(); }
  var A=F.A, f=fisc(A), stOud=!!controleer('storting');
  // 1. voordeel
  x+='<div class="blok'+(stOud?' oud':'')+'"><p class="res-kop">Mogelijke belastingvermindering</p>';
  x+='<p class="res-waarde m">'+eurCent(f.bedrag)+' voor 2026</p>';
  x+='<p class="res-sub">'+f.pct+' % van '+eur(A)+'. Vanaf 18 t/m het jaar waarin u 64 wordt, mits voldoende personenbelasting en de contractvoorwaarden. Geen rendement.</p>';
  if(A>1050)x+='<p class="hulp">'+alternatief(A)+'</p>';
  x+='<p class="nietactueel">Niet actueel: verbeter het bedrag links.</p></div>';
  var voordeel=document.getElementById('fiscaal-voordeel');if(voordeel)voordeel.innerHTML=x;x='';
  var gb=waarde('geboortejaar'),aanpak=document.getElementById('fiscaal-aanpak');if(aanpak)aanpak.hidden=!(gb!==null&&!controleer('geboortejaar')&&gb+64>NU);
  // 2. opbouw
  var o=F.op, oud=fiscOpOud();
  x+='<div class="blok'+(oud?' oud':'')+'"><p class="res-kop">Wat uw stortingen bruto kunnen opbouwen</p>';
  if(!o){ x+='<p class="res-sub">Vul uw geboortejaar in. Dan ziet u wat '+eur(A)+' per jaar kan opbouwen tot het jaar waarin u 64 wordt.</p></div>'; }
  else if(o.geenModel){ x+='<div class="blokkade" role="alert"><strong>De opbouw kan nu niet worden getoond.</strong><p style="margin:4px 0 0">De rekenmodule is niet geladen. Er wordt geen vervangend resultaat getoond.</p></div></div>'; }
  else if(o.laatsteJaar){ x+='<p class="res-sub">'+NU+' is uw laatste premiejaar. Daarom tonen we geen meerjarige opbouw. Een nieuw contract moet minstens tien jaar lopen; het contract en uw situatie bepalen uw recht.</p></div>'; }
  else if(!o.ok){ x+='<div class="blokkade" role="alert"><strong>Deze opbouw kon niet berekend worden.</strong><p style="margin:4px 0 0">Er wordt geen vervangend resultaat getoond.</p></div></div>'; }
  else {
    var n=o.nom, h=o.hoofd, y=o.invoer.years;
    x+='<p class="res-waarde">Ongeveer '+eur(rond(h.value))+' bruto</p>';
    x+='<p class="res-sub">'+(o.afgekapt?'Na 40 jaar, in '+(NU+40)+' (verder rekent dit voorbeeld niet)':'Tegen '+(NU+y)+', het jaar waarin u 64 wordt')+(o.vandaag?', in geld van vandaag':'')+'. Met '+eur(o.A)+' per jaar legt u zelf ongeveer '+eur(rond(n.contributed))+' in.</p><p class="kernbeperking">Bruto, vóór kosten en eindbelasting. Geen voorspelling; verlies is mogelijk.</p>';
    if(NU-o.gb>55)x+='<p class="late-start">Start u nu een nieuw contract? Dat moet minstens tien jaar lopen. Deze waarde op 64 jaar is dus geen fiscale eindwaarde of uitkering.</p>'; x+='<p class="nietactueel">Niet actueel: '+(invoerGeldig()?'wordt bijgewerkt…':'verbeter de invoer links.')+'</p>';
    x+='<div class="werkbalk"><div class="tweestand-rij"><span class="lab" id="eenheid-lab">Bedragen</span><div class="tweestand" role="group" aria-labelledby="eenheid-lab"><button type="button" data-eenheid="0" aria-pressed="'+(!S.vandaag)+'">Op dat moment</button><button type="button" data-eenheid="1" aria-pressed="'+S.vandaag+'">In geld van vandaag</button></div></div></div>';
    x+='<div class="grafiek-zone"><div class="aflees" id="aflees" aria-hidden="true"></div><div class="grafiek" id="grafiek" tabindex="0" role="slider" aria-label="Grafiek aflezen per jaar" aria-valuemin="0" aria-valuemax="'+y+'"></div><p class="sleutel" id="sleutel"></p></div>';
    var dd=h.drawdown, zin='Modelopbouw, geen waarde van een concreet fonds of verzekeringscontract.';

    x+='<p class="duiding">'+zin+'</p></div>';
  }
  // voorwaarden + bronnen
  x+='<p class="voorwaarden">Bij pensioensparen volgt normaal een eindheffing van 8 %. Het contract bepaalt wanneer en op welke basis. Ze is hier niet afgetrokken.</p>';
  var as=(o&&o.ok)?o.nom.assumptions:null;
  x+='<button type="button" class="opener" id="uitleg-knop" aria-expanded="'+S.uitlegOpen+'" aria-controls="uitleg">Aannames en bronnen '+CHEV+'</button><div class="detail" id="uitleg"'+(S.uitlegOpen?'':' hidden')+'><ul>'+
    (as?'<li>Opbouw: verwacht rendement per jaar vóór inflatie aandelen '+fmtGetal(as.stockNominal,2)+' %, obligaties '+fmtGetal(as.bondNominal,2)+' %, spaarrente '+fmtGetal(as.savingsRate,2)+' %; inflatie '+fmtGetal(as.inflation)+' %. Eén vast marktverloop met een tijdelijke daling. Aanpak: '+faseZin(o.hoofd.phases,o.invoer.years)+'. Het vak Obligaties is een modelbelegging, geen bankspaarrekening of garantie. Kosten en belastingen niet meegerekend.</li>':'')+
    '<li>Een pensioenspaarcontract moet minstens tien jaar lopen. De eindheffing valt normaal op 60 jaar, of bij een nieuwe start na 55 op de tiende contractverjaardag. De belastbare grondslag verschilt tussen fonds, tak 21 en tak 23; persoonlijke toepasbaarheid is hier niet vastgesteld.</li><li>De jaarstorting is voor de opbouw gelijk gespreid over de maanden. Hoe en wanneer u werkelijk stort, kan het resultaat veranderen.</li>'+
    '<li>Andere fiscale vormen, zoals langetermijnsparen, komen in uw plan aan bod.</li>'+
    '<li><a href="https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/belastingverminderingen/pensioensparen" rel="noopener">Wikifin — belastingvermindering voor pensioensparen</a></li><li><a href="https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/hoe-wordt-je-pensioensparen-belast" rel="noopener">Wikifin — hoe wordt pensioensparen belast?</a></li></ul></div>';
  x+=vervolgHTML();
  return x;
}
/* ---------- doelkeuze ---------- */
var uitklap=document.getElementById('uitklap');
document.querySelectorAll('input[name="doel"]').forEach(function(r){ r.addEventListener('change',function(){
  var vorigDoel=S.doel; if(vorigDoel===r.value) return;
  var drafts=S.perDoel||{}; if(S.doel){var snapshot=Object.assign({},S);delete snapshot.perDoel;drafts[S.doel]=JSON.parse(JSON.stringify(snapshot));} var gekozen=drafts[r.value]; S=gekozen?JSON.parse(JSON.stringify(gekozen)):nieuweToestand();S.perDoel=drafts;S.doel=r.value;if(!gekozen)S.velden=velden(r.value);S.reviewOpen=false; R.fisc=null;R.laatste=null;
  reken(); render(); uitklap.classList.add('open'); bewaarWerk();
  if(!vorigDoel && window.innerWidth<960){ var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches; setTimeout(function(){ var wk=W.querySelector('.werk'); if(wk) wk.scrollIntoView({block:'start',behavior:rm?'auto':'smooth'}); },230); }
}); });
var hersteld=laadWerk();
if(hersteld){ var ri=document.querySelector('input[name="doel"][value="'+S.doel+'"]'); if(ri) ri.checked=true; Object.keys(S.velden).forEach(function(k){ S.velden[k].fout=null; }); S.reviewOpen=false; reken(); render(); uitklap.classList.add('open'); }
var rt=null;function quickResize(){ clearTimeout(rt); rt=setTimeout(function(){ if(S.doel==='fiscaal'){ if(R.fisc&&R.fisc.op&&R.fisc.op.ok) tekenOpbouw(R.fisc.op); } else if(R.laatste) tekenOpbouw(R.laatste); },80); }window.addEventListener('resize',quickResize);
 
window.NorteSnelleSimulatie={exportPayload:payload,opslagSleutels:[OPSLAG_WERK,OPSLAG_VOORSTEL]};
return function(){clearTimeout(rt);window.removeEventListener('resize',quickResize);};
})();}};
