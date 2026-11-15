/* Norte Kennis, overlay-kandidaat (4 november 2026; inhoudsmapping eerste volledige editie 5 november 2026).
   Redactionele pagina als achtergrond; de leerlaag (‘De basis’) is een native <dialog> erboven.
   Statisch, geen bouwstap, geen netwerkverkeer. Sessiecontext in sessionStorage; langer onthouden
   alleen als de bezoeker dat zelf aanzet (localStorage). Rekenkern ongewijzigd. */
(() => {
'use strict';

/* ───── configuratie ───── */
const PLAN_URL = (window.NORTE_CONFIG && window.NORTE_CONFIG.planUrl) || '/ontwerp/klantflow/';
document.querySelector('[data-nav=plan]')?.setAttribute('href', PLAN_URL);
const C = window.NORTE_INHOUD, R = NorteRekenkern; // rekenkern.js declareert een globale const

/* ───── één gedeelde inhoudshiërarchie voor pagina én leerlaag ─────
   Rubriek = primaire plaats (content.hoofdstuk). De klantvraag is de ingang in de leerlaag. */
const RUBRIEKEN = [
  { id:'begin',      naam:'Basisprincipes',        vraag:'Waar begin ik?',               kern:'Sparen of beleggen, buffer, termijn en de spaarrekening' },
  { id:'bouwstenen', naam:'Bouwstenen',            vraag:'Waarin kan ik beleggen?',      kern:'Aandelen, obligaties, fondsen, indexen, verzekeringen en pensioensparen' },
  { id:'opbrengst',  naam:'Opbrengsten en kosten', vraag:'Wat kan mijn geld opbrengen?', kern:'Rendement, groei, kosten, belasting, inflatie en de aannames van een berekening' },
  { id:'risico',     naam:'Risico’s',              vraag:'Wat kan er misgaan?',          kern:'Schommeling, dalingen, spreiding en concentratie' },
  { id:'samen',      naam:'Aanpak',                vraag:'Welke aanpak past bij mij?',   kern:'Profiel, ritme, sparen voor een kind en opvolgen' }
];
/* Eén rustig onderwerplabel per stuk. De vijf vragen zijn de canon en de groepskop; een tweede niveau alleen waar de groepscontext ontbreekt én het oriëntatie toevoegt. */
const SUB = { 'sparen-of-beleggen':'Sparen of beleggen', spaarrekening:'Spaarrekening', bouwstenen:'', lotus:'Aandelen', staatsbon:'Obligaties', verpakking:'Fondsen en verpakkingen',
  'actief-index':'Actief of index', 'tak21-tak23':'Verzekeringen', pensioensparen:'Pensioensparen', nijsmans:'Actief of index', ethias:'Verzekeringen',
  rendement:'Rendement', tijd:'Groei', kosten:'Kosten en belasting', buffett:'Kosten', koopkracht:'Inflatie', vastgoed:'Vastgoed',
  risico:'Schommeling', spreiding:'Spreiding', daling:'Dalingen', fortis:'Concentratie', nikkei:'Spreiding over landen', 'eerste-jaar':'Volhouden',
  profiel:'Profiel', instappen:'Eenmalig of regelmatig', kind:'Voor een kind', opvolgen:'Opvolgen', aannames:'Het plan lezen', 'rendement-simulatie':'Rendement in de simulatie', noorwegen:'Opvolgen', mila:'Voor een kind', "verbouwing":"Doel en termijn", "autopanne":"Spaarrente", "twee-verpakkingen":"Fondsen en verpakkingen", "extra-storting":"Pensioensparen", "twee-zussen":"Tijd en groei", "winkelkar":"Koopkracht", "twee-collegas":"Beleggersprofiel", "de-lijn":"Aannames" };
Object.assign(SUB, { "bedrijven-inflatie":"Aandelen en koopkracht", "colruyt-mede-eigenaar":"Mede-eigenaarschap", "avh-geduld":"Lange termijn" });
Object.assign(SUB, Object.fromEntries((window.NORTE_ACTUA || []).map(n => [n.id,n.sub])));
const LESVOLGORDE = ['sparen-of-beleggen', 'spaarrekening', 'bouwstenen', 'actief-index', 'verpakking', 'tak21-tak23', 'pensioensparen', 'langetermijnsparen', 'zelfstandigen',
  'rendement', 'tijd', 'kosten', 'belastingen', 'koopkracht', 'aannames', 'rendement-simulatie', 'spreiding', 'daling', 'termijn', 'profiel', 'instappen', 'kind', 'opvolgen'];
const FISCAAL = ['pensioensparen','langetermijnsparen','zelfstandigen'];
Object.assign(SUB,{verpakking:'Bank of verzekering', kosten:'Kosten', belastingen:'Fiscaliteit', langetermijnsparen:'Langetermijnsparen', zelfstandigen:'Pensioen als zelfstandige', belastingbrief:'Meerwaardebelasting', afbetaald:'Langetermijnsparen', 'twee-zaken':'Pensioen als zelfstandige'});
const BEGRIP_LES = { 'lopende-kosten':'rendement', volatiliteit:'spreiding', draagvermogen:'profiel' }; // begrippen waarvan de uitleg in een verhaal staat

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app'), dlg = $('#leerlaag'), paneel = $('#laag-paneel'), achtergrond = $('#achtergrond');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const eur = new Intl.NumberFormat('nl-BE', { style:'currency', currency:'EUR', maximumFractionDigits:0 });
const fE = v => eur.format(Math.round(v)).replace(/ /g, ' ').replace('-', '−');
const fN = v => new Intl.NumberFormat('nl-BE', { maximumFractionDigits:2 }).format(v);
const fP = v => fN(v).replace('-', '−') + '\u00a0%';
const art = id => C.artikels.find(a => a.id === id);
const rub = id => RUBRIEKEN.find(r => r.id === id);
const isLes = id => !!art(id) && art(id).soort === 'uitleg';
const lessenIn = rid => LESVOLGORDE.filter(id => art(id).hoofdstuk === rid);
/* label(id): onderwerp, of de vraag als het stuk zelf het overzicht van die vraag is. inGroep: groepskop noemt de vraag al. twee: vraag · onderwerp (alleen buiten groepscontext waar nodig). */
const label = (id, modus) => { const r = rub(art(id).hoofdstuk), s = SUB[id];
  if (modus === 'inGroep') return s; if (modus === 'twee') return s ? r.vraag + ' · ' + s : r.vraag; return s || r.vraag; };
const rubriekHTML = (id, alleenGroep = false) => { const r = rub(art(id).hoofdstuk), sub = alleenGroep ? '' : SUB[id];
  return `<span class="rubriek"><span class="rubriek-hoofd">${esc(r.naam)}</span>${sub ? `<span class="rubriek-sub">${esc(sub)}</span>` : ''}</span>`; };
const link = id => isLes(id) ? `#/leren/les/${id}` : `#/artikel/${id}`;
const plainWoorden = t => t.replace(/\{\{[^}]+\}\}|<[^>]+>|\[\[[^|\]]+\||\]\]/g, ' ').split(/\s+/).filter(Boolean).length;
const leestijd = a => Math.max(2, Math.round(plainWoorden(a.inleiding + ' ' + a.tekst) / 200 + (a.tekst.match(/\{\{(poll|sim):/g) || []).length * 0.5));

/* ───── toestand ───── */
const SKEY = 'norte.kennis.overlay.sessie', VKEY = 'norte.kennis.overlay.voortgang';
const lees = (k, o) => { try { return JSON.parse(o.getItem(k)); } catch { return null; } };
const S = Object.assign({ scroll:{}, lscroll:{}, sims:{}, polls:{}, lesGelezen:{}, checks:{}, bron:{}, achter:'#/' }, lees(SKEY, sessionStorage) || {});
let V = Object.assign({ aan:false, gelezen:{}, polls:{} }, lees(VKEY, localStorage) || {});
const bewaar = () => { try { sessionStorage.setItem(SKEY, JSON.stringify(S)); } catch {}
  try { if (V.aan) localStorage.setItem(VKEY, JSON.stringify(V)); else localStorage.removeItem(VKEY); } catch {} };
const lesGezien = id => !!(S.lesGelezen[id] || (V.aan && V.gelezen[id]));
const planStatus = () => { try { return window.NorteKennisPlanAdapter?.status?.() || null; } catch { return null; } };

/* ───── navigatie: interne links via pushState, één popstate-ingang ───── */
const route = h => { const [pad, qs] = (h ?? location.hash).replace(/^#\/?/, '').split('?'); return { delen:pad.split('/').filter(Boolean), q:new URLSearchParams(qs || '') }; };
const isLaagHash = h => route(h).delen[0] === 'leren';
let getoond = null, klikNav = false, tekent = false, opener = null, laagScrollY = 0, vorigWerkvlak = null;

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#/"]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault();
  const naar = normaliseer(a.getAttribute('href'));
  if (a.hasAttribute('data-artikeloverzicht')) S._herstelStart = true;
  if (a.dataset.kaart) S._focusNa = 'kaart-' + a.dataset.kaart;
  if (a.dataset.checkterug) S._focusNa = 'check-overzicht-' + a.dataset.checkterug;
  if (a.dataset.lesherkomst && isLes(a.dataset.lesherkomst)) { S._lesTerug = S.lscroll['#/leren/les/' + a.dataset.lesherkomst] || 0; S._focusNa = 'praktijk-' + a.dataset.lesherkomst; }
  if (a.dataset.lesterug && history.state?.checkVan) { S._lesTerug = history.state.checkVan.scroll; S._focusNa = 'check-start-' + a.dataset.lesterug; }
  ga(naar, a);
});
function normaliseer(h) { const r = route(h);
  if (r.delen[0] === 'artikel' && isLes(r.delen[1])) return `#/leren/les/${r.delen[1]}`;
  if (r.delen[0] === 'inhoud') return '#/leren';
  if (r.delen[0] === 'zoeken') return '#/';
  /* 3.4: de oude kennistest, de losse oefening en de uitdaging gaan op in de Kennischeck */
  if (r.delen[0] === 'leren' && ['uitdaging', 'kennis', 'check'].includes(r.delen[1])) { const oud = r.delen[1] === 'check' && r.delen[2] === 'obligaties' ? 'bouwstenen' : r.delen[2], d = kcDeel(oud); return '#/leren/kennischeck' + (d ? '/' + d.id + (r.delen[3] === 'uitleg' && !d.lc ? '/uitleg' : '') : ''); }
  return h; }
function ga(naar, bron) {
  const nuLaag = isLaagHash(location.hash), naarLaag = isLaagHash(naar);
  if (getoond && !nuLaag) { S.scroll[getoond] = scrollY; if (getoond === '#/' && bron) S.startBron = bronSleutel(bron); }
  if (nuLaag && dlg.open) S.lscroll[location.hash] = dlg.scrollTop;
  if (naar === location.hash) return;
  if (naarLaag) {
    if (!nuLaag) { opener = bron || document.activeElement; S.bron[location.hash || '#/'] = bronSleutel(opener); }
    const diepte = nuLaag ? ((history.state && history.state.laag) || 1) + 1 : 1;
    /* kennischeck: de les waaruit hij startte (met leesplek) reist mee door alle checkvragen en het resultaat, ook na herladen */
    const nu = route(location.hash).delen, na = route(naar).delen;
    const checkVan = nuLaag && na[1] === 'check' ? (nu[1] === 'les' ? { les:location.hash, scroll:dlg.scrollTop } : nu[1] === 'check' && nu[2] === na[2] ? history.state?.checkVan : null) : null;
    history.pushState({ laag:diepte, achter: nuLaag ? (history.state?.achter || S.achter) : (location.hash || '#/'), van: nuLaag ? location.hash : null, checkVan }, '', naar);
    S._klik = true;
  } else { klikNav = true; history.pushState({}, '', naar); }
  bewaar(); render();
}
addEventListener('popstate', () => { klikNav = false; render(); });
addEventListener('scroll', () => { if (getoond && !tekent && !dlg.open) S.scroll[getoond] = scrollY; }, { passive:true });
addEventListener('pagehide', () => { if (getoond && !dlg.open) S.scroll[getoond] = scrollY; bewaar(); });

/* sluiten: terug in de geschiedenis tot vóór de leerlaag, zodat terug/vooruit logisch blijft */
function sluitLaag() {
  if (!dlg.open) return;
  const k = (history.state && history.state.laag) || 0;
  if (k > 0) history.go(-k); else { history.replaceState({}, '', S.achter || '#/'); render(); }
}

function render() {
  const h = location.hash || '#/';
  const r = route(h), vorig = route(vorigWerkvlak || '#/');
  vorigWerkvlak = h;
  if (!S._klik && r.delen[0] === 'leren' && r.delen[1] === 'les' && vorig.delen[0] === 'artikel' && vorig.q.get('vanles') === r.delen[2] && PRAKTIJK[r.delen[2]]?.id === vorig.delen[1]) S._focusNa = 'praktijk-' + r.delen[2];
  if (r.delen[0] === 'artikel' && isLes(r.delen[1]) || r.delen[0] === 'inhoud' || r.delen[0] === 'zoeken' || r.delen[0] === 'leren' && ['uitdaging', 'kennis', 'check'].includes(r.delen[1])) { history.replaceState(history.state, '', normaliseer(h)); return render(); }
  if (isLaagHash(h)) {
    const achter = (history.state && history.state.achter) || S.achter || '#/';
    if (getoond !== achter) tekenAchtergrond(achter, true);
    tekenLaag(r);
  } else {
    const wasOpen = dlg.open; if (wasOpen) sluitVisueel();
    S.achter = h;
    if (getoond !== h) tekenAchtergrond(h, false);
    else if (wasOpen) { scrollTo(0, laagScrollY); terugNaarOpener(); }
  }
  bewaar();
}

/* ───── achtergrond: redactionele pagina ───── */
function tekenAchtergrond(h, onderLaag) {
  tekent = true;
  const { delen, q } = route(h), [a, b] = delen;
  let view, titel, actief = '';
  if (!a) { view = vStart(); titel = 'Kennis'; }
  else if (a === 'verhalen') { view = vVerhalen(q); titel = 'Alle verhalen'; setTimeout(() => { const zi = document.getElementById('kv-z'); if (zi && zi.value) kvFilter(); if (zi && q.get('zoek') === '1') zi.focus({ preventScroll: true }); }, 60); }
  else if (a === 'artikel' && art(b)) { view = vArtikel(art(b), q); titel = art(b).titel; }
  else { view = `<main id="main" class="wrap smal" tabindex="-1"><h1 class="doc-kop">Deze pagina bestaat niet</h1><p>De link is mogelijk verouderd. Op de kennisstart vindt u de verhalen en de ingang naar de leeromgeving.</p><p><a href="#/">Naar de kennisstart</a></p></main>`; titel = 'Niet gevonden'; }
  if (!onderLaag) document.title = titel + ' — Norte';
  $$('.hoofdnav a').forEach(n => n.dataset.nav === actief ? n.setAttribute('aria-current', 'page') : n.removeAttribute('aria-current'));
  app.innerHTML = view; getoond = h;
  naAchtergrond(delen, q);
  const herstelStart = !a && S._herstelStart; delete S._herstelStart;
  const herstel = (!klikNav || herstelStart) && S.scroll[h] != null, focusId = !onderLaag && S._focusNa; if (!onderLaag) delete S._focusNa;
  if (onderLaag) { scrollTo(0, S.scroll[h] || 0); laagScrollY = scrollY; tekent = false; return; }
  requestAnimationFrame(() => {
    if (herstelStart) { scrollTo(0, S.scroll[h] || 0); const b = S.startBron; const el = b && $$('a[href]', achtergrond).filter(x => x.getAttribute('href') === b.h)[b.i]; (el || $('#main'))?.focus({preventScroll:true}); }
    else if (focusId && document.getElementById(focusId)) document.getElementById(focusId).focus();
    else if (herstel) scrollTo(0, S.scroll[h]);
    else { scrollTo(0, 0); $('#main')?.focus({ preventScroll:true }); }
    klikNav = false; requestAnimationFrame(() => { tekent = false; });
  });
}

/* ───── leerlaag ───── */
function openVisueel(compact) {
  if (!dlg.open) {
    laagScrollY = scrollY; S.scroll[getoond] = scrollY;
    document.documentElement.classList.add('laag-open');
    dlg.classList.toggle('compact', compact);
    dlg.showModal();
    requestAnimationFrame(() => dlg.classList.add('binnen'));
  } else dlg.classList.toggle('compact', compact);
}
function sluitVisueel() {
  dlg.classList.remove('binnen', 'compact'); dlg.close();
  document.documentElement.classList.remove('laag-open');
  paneel.innerHTML = '';
}
/* opener ook terugvinden na herladen of browser-vooruit: dezelfde link (href + volgnummer) op de achterliggende pagina */
function bronSleutel(el) {
  const h = el && el.matches && el.matches('a[href]') && achtergrond.contains(el) ? el.getAttribute('href') : null;
  return h ? { h, i:$$('a[href]', achtergrond).filter(x => x.getAttribute('href') === h).indexOf(el) } : null;
}
function terugNaarOpener() {
  let o = opener; opener = null;
  const b = S.bron[getoond];
  if (!(o && document.contains(o)) && b) o = $$('a[href]', achtergrond).filter(x => x.getAttribute('href') === b.h)[b.i];
  if (o && document.contains(o)) o.focus({ preventScroll:true }); else $('#main')?.focus({ preventScroll:true });
  if (Math.abs(scrollY - laagScrollY) > 1) scrollTo(0, laagScrollY);
}
dlg.addEventListener('cancel', e => { e.preventDefault(); sluitLaag(); });
/* focus blijft binnen de laag: native modal laat Tab anders naar de browserbalk ontsnappen */
dlg.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const f = $$('a[href], button:not([disabled]), input:not([type=range]):not([disabled]), [tabindex]:not([tabindex="-1"])', dlg).filter(x => x.offsetParent !== null || x === document.activeElement);
  if (!f.length) return;
  const eerste = f[0], laatste = f[f.length - 1], nu = document.activeElement;
  if (e.shiftKey && (nu === eerste || !dlg.contains(nu) || nu.id === 'laag-kop')) { e.preventDefault(); laatste.focus(); }
  else if (!e.shiftKey && nu === laatste) { e.preventDefault(); eerste.focus(); }
});
dlg.addEventListener('click', e => { if (e.target === dlg) sluitLaag(); });
dlg.addEventListener('close', () => document.documentElement.classList.remove('laag-open'));

document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href^="#/"]')) window.__kvNav = true; }, true); // ronde 73: wie binnen Kennis doorklikt, krijgt een echte terugknop
function tekenLaag(r) {
  const [, soort, id] = r.delen;
  /* Balkgrammatica: links ‹ + bestemming = binnen de leeromgeving één niveau hoger; rechts × + bestemming = leeromgeving verlaten. */
  const van = route(history.state?.van || '').delen, vanLes = van[1] === 'les' && isLes(van[2]) ? van[2] : null;
  const isBegrip = soort === 'begrip' && C.begrippen[id];
  const isLesNu = soort === 'les' && isLes(id);
  openVisueel(!!isBegrip && !vanLes); // een begrip vanuit een les blijft binnen de volle laag; geen breedtesprong naar de pagina
  const plekHTML = (wat, pos) => `<p class="plek-tekst"><span class="plek-vraag">${esc(wat)}</span>${pos ? `<span class="plek-pos">${pos}</span>` : ''}</p>`;
  let inhoud, titel, links;
  if (isLesNu) {
    inhoud = vLes(art(id)); titel = art(id).titel;
    const p = plek(id);
    /* ronde 73: lesnummers en het leeroverzicht alleen wie bewust in de leeromgeving leest; een losse vraag is geen les */
    const inLeren = van[0] === 'leren' && !(INGEBED && routeVervolg(id)); // in de leesroute uit de flow geen lesnummers van de leeromgeving
    links = inLeren ? `<a href="#/leren" class="laag-terug" data-kaart="${id}">${ico.terug}<span>Leeroverzicht</span></a>${plekHTML(p.vraag, p.van > 1 ? `Les ${p.nr} van ${p.van}` : '')}` : ((history.state?.van || window.__kvNav) ? `<button type="button" class="laag-terug" data-terug>${ico.terug}<span>Terug</span></button>` : `<a href="#/" class="laag-terug">${ico.terug}<span>Kennis</span></a>`);
    S.laatste = id;
  } else if (isBegrip) {
    inhoud = vBegrip(id, vanLes); titel = C.begrippen[id].term;
    links = vanLes ? `<button type="button" class="laag-terug" data-terug>${ico.terug}<span>De les</span></button>` : `<span class="laag-naam">Begrip</span>`;
  } else if (soort === 'kennischeck') {
    inhoud = vKennischeck(r); titel = 'Kennischeck';
    const d = kcDeel(id);
    links = vanLes ? `<button type="button" class="laag-terug" data-terug>${ico.terug}<span>De les</span></button>${plekHTML('Kennischeck', d ? d.naam : '')}`
      : d ? `<a href="#/leren/kennischeck" class="laag-terug">${ico.terug}<span>Onderwerpen</span></a>${plekHTML('Kennischeck', d.naam)}`
      : `<a href="#/leren" class="laag-terug">${ico.terug}<span>Leeroverzicht</span></a>${plekHTML('Kennischeck', '')}`;
  } else { inhoud = vBasis(); titel = 'Leeromgeving'; links = `<span class="laag-naam">Leeromgeving</span>`; }
  const achterDeel = route((history.state && history.state.achter) || S.achter || '#/').delen[0];
  const [uitLang, uitKort] = achterDeel === 'artikel' ? ['Terug naar het artikel', 'Naar artikel'] : !achterDeel ? ['Terug naar de startpagina', 'Naar startpagina'] : ['Sluiten', 'Sluiten'];
  const simRetour = window.NorteKennisPlanAdapter?.simRetour?.() || null; const planRetour = simRetour || window.NorteKennisPlanAdapter?.planRetour?.() || null;
  const uitgang = planRetour
    ? `<a class="laag-sluit" href="${esc(planRetour)}" data-plan-retour>${ico.terug}<span class="uit-lang">${simRetour ? 'Terug naar uw simulatie' : 'Terug naar uw plan'}</span><span class="uit-kort">${simRetour ? 'Simulatie' : 'Uw plan'}</span></a>`
    : `<button type="button" class="laag-sluit" data-sluit aria-keyshortcuts="Escape">${ico.sluit}<span class="uit-lang">${uitLang}</span><span class="uit-kort">${uitKort}</span></button>`;
  paneel.innerHTML = `<div class="laag-balk">${links}${uitgang}</div>` + inhoud;
  document.title = titel + ' — Norte';
  dlg.classList.toggle('licht', soort === 'kennischeck');
  $$('.sim[data-sim]', paneel).forEach(bindSim);
  if (soort === 'kennischeck') bindKennischeck(r);
  $('[data-sluit]', paneel)?.addEventListener('click', sluitLaag);
  $('[data-terug]', paneel)?.addEventListener('click', () => history.back());
  if (isLesNu) { const anker = $('#les-vervolg', paneel);
    if (anker && 'IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { S.lesGelezen[id] = true; if (V.aan) V.gelezen[id] = new Date().toISOString().slice(0, 10); bewaar(); io.disconnect(); } }, { root:dlg }); io.observe(anker); } }
  /* Een bewuste leskeuze begint bij titel en context. Browser-terug/vooruit en de expliciete
     terugkeer vanuit uitleg of verhaal herstellen de eerdere leesplek. */
  const sc = S.lscroll[location.hash], klik = S._klik, lesTerug = S._lesTerug; delete S._klik; delete S._lesTerug;
  dlg.scrollTop = isLesNu && lesTerug != null ? lesTerug : sc != null && !klik ? sc : 0;
  const focusId = S._focusNa; delete S._focusNa;
  const doel = (focusId && document.getElementById(focusId)) || $('#laag-kop', paneel);
  doel?.focus({ preventScroll:true });
  if (doel && doel.id !== 'laag-kop') { const rr = doel.getBoundingClientRect(); if (rr.top < 80 || rr.bottom > innerHeight - 24) doel.scrollIntoView({ block:'center' }); }
}
document.addEventListener('toggle', e=>{ if(e.target.matches?.('[data-leer-fiscaal]')) { S.fiscaalOpen=e.target.open; bewaar(); } },true);
dlg.addEventListener('scroll', () => { if (dlg.open) S.lscroll[location.hash] = dlg.scrollTop; }, { passive:true });

/* Leeskaart: de vijf vragen met hun feitelijke lessen; verhalen rond hetzelfde onderwerp rustig erbij. */
const VERHAAL_NAAM = { lotus:'Lotus', staatsbon:'De staatsbon van 2023', buffett:'Buffetts weddenschap', vastgoed:'Een huurwoning als belegging', risico:'Een sterk bedrijf, een slechte dag', fortis:'Fortis 2008',
  nijsmans:'Tim Nijsmans over kosten', ethias:'Ethias 2008', nikkei:'Japan 1989', 'eerste-jaar':'Het eerste jaar van Sarah en Jonas', noorwegen:'Het Noorse oliefonds', mila:'Een pot voor Mila' };
const plek = id => { const rb = rub(art(id).hoofdstuk), ls = lessenIn(rb.id); return { vraag:rb.vraag, nr:ls.indexOf(id) + 1, van:ls.length, rb }; };
/* Korte lesnamen voor navigatie; de volledige kop blijft de titel van de les zelf. */
const KORT = { 'sparen-of-beleggen':'Sparen of beleggen', spaarrekening:'De spaarrekening', bouwstenen:'Aandelen, obligaties en fondsen', verpakking:'Belegging, fonds en verpakking',
  'actief-index':'Actief of een index', 'tak21-tak23':'Tak 21 en tak 23', pensioensparen:'Pensioensparen',
  rendement:'Rendement', tijd:'Tijd en groei', kosten:'Kosten en belasting', koopkracht:'Koopkracht', spreiding:'Risico en spreiding', daling:'Dalingen en herstel',
  profiel:'Uw beleggersprofiel', instappen:'Eenmalig of maandelijks', kind:'Beleggen voor een kind', opvolgen:'Opvolgen en opnemen', aannames:'Hoe het plan rekent', 'rendement-simulatie':'Rendement in de simulatie' };
/* Waarom een begrip naar deze les leidt: één korte reden in dezelfde link. */
const WAAROM = { 'sparen-of-beleggen':'Waarom uw termijn bepaalt of geld beter spaart of belegt.', bouwstenen:'Wat u bezit met een aandeel, een obligatie of een fonds.',
  verpakking:'Hoe belegging, fonds en verpakking van elkaar verschillen.', rendement:'Waaruit opbrengst bestaat en wat u ervan overhoudt.',
  tijd:'Hoe groei op groei werkt, en wat kosten daaraan doen.', koopkracht:'Waarom het bedrag van later niet het geld van vandaag is.',
  spreiding:'Wat spreiding wel en niet tegenhoudt.', profiel:'Hoe doel, termijn, financiële situatie en ervaring uw profiel bepalen.', instappen:'Wat eenmalig en gespreid instappen elk doen.',
  spaarrekening:'Hoe basisrente en getrouwheidspremie werken, en waarvoor de rekening dient.', 'actief-index':'Wat een index is, wat een beheerder probeert, en waar fondsen overlappen.',
  'tak21-tak23':'Wat een verzekeraar waarborgt, en wie het risico draagt.', pensioensparen:'Wat het belastingvoordeel oplevert en wat het later vraagt.',
  kosten:'Wat u betaalt bij instap, tijdens het beleggen en bij uitstap.', daling:'Hoe diep dalingen gaan, wat herstel vraagt, en het risico van niets doen.',
  kind:'Op wiens naam u spaart, en wat de termijn tot achttien betekent.', opvolgen:'Wanneer u herweegt, het plan herbekijkt of begint op te nemen.',
  aannames:'Welke uitgangspunten achter de plangrafiek zitten, en waar ze ophouden.',
  'rendement-simulatie':'Met welk rendement de simulatie rekent, en waarom het risico afneemt naarmate uw doel nadert.' };
Object.assign(SUB, { termijn:'Termijn en afbouw' }); Object.assign(KORT, { termijn:'Waarom het risico afbouwt' }); Object.assign(WAAROM, { termijn:'Waarom we rustiger beleggen naarmate uw doel nadert.' });
/* Verder lezen alleen bij echte voortgang: een les tot het einde gelezen, of een begonnen les waarin u verder dan het begin kwam. */
function hervat() {
  const l = S.laatste || (V.aan && V.laatste);
  if (!l || !isLes(l)) return null;
  if (!lesGezien(l)) return (S.lscroll['#/leren/les/' + l] || 0) > 400 ? l : null;
  const i = LESVOLGORDE.indexOf(l);
  return LESVOLGORDE.slice(i + 1).find(x => !lesGezien(x)) || null;
}
Object.assign(KORT,{verpakking:'Bank of verzekering', kosten:'Beleggingskosten', belastingen:'Belasting op sparen en beleggen', langetermijnsparen:'Langetermijnsparen', zelfstandigen:'VAPZ, POZ en IPT'});
Object.assign(WAAROM,{verpakking:'Wat de inhoud, begunstiging, kosten en voorwaarden voor uw geld veranderen.', kosten:'Wat u betaalt voor uw belegging en dienstverlening.', belastingen:'Welke belasting hoort bij welk moment?', langetermijnsparen:'Hoe fiscale ruimte, woonlening en contract samenhangen.', zelfstandigen:'Welke pensioenregelingen bij uw beroepsstatuut kunnen horen.'});
function vBasis() {
  const h = hervat();
  const lesLink = id => `<li><a id="kaart-${id}" href="#/leren/les/${id}"><span class="kaart-les">${esc(KORT[id])}</span>${id === h ? '<span class="kaart-stand is-verder">Verder lezen</span>' : lesGezien(id) ? '<span class="kaart-stand">Gelezen</span>' : ''}</a></li>`;
  const kaart = RUBRIEKEN.map(rb => { const basis=lessenIn(rb.id).filter(id=>!FISCAAL.includes(id));
    const fiscaal=rb.id==='bouwstenen' ? `<details class="leer-verdieping" data-leer-fiscaal ${(S.fiscaalOpen || FISCAAL.some(id=>S._focusNa==='kaart-'+id))?'open':''}><summary>Fiscaal sparen <span class="klein">Particulier en zelfstandig</span></summary><ol class="kaart-lessen">${FISCAAL.map(lesLink).join('')}</ol></details>` : '';
    const checks = rb.id === 'bouwstenen' ? `<a class="check-ingang" href="#/leren/kennischeck"><span class="check-ingang-actie">Kennischeck</span><span class="check-ingang-onderwerp">zeven beleggingsvormen</span><span aria-hidden="true">→</span></a>` : '';
    return `<li class="kaart-vraag"><div class="kaart-groep"><span class="rubriek"><span class="rubriek-hoofd">${esc(rb.naam)}</span></span><h2 class="kaart-titel">${esc(rb.vraag)}</h2></div><div class="kaart-inhoud"><ol class="kaart-lessen">${basis.map(lesLink).join('')}</ol>${fiscaal}<div class="kaart-checks">${checks}</div></div></li>`;
  }).join('');
  return `<div class="laag-binnen laag-kaart">
    <h1 id="laag-kop" tabindex="-1">Sparen en beleggen begrijpen</h1>
    <p class="laag-intro">Lessen, verhalen en korte oefeningen.</p>
    <ol class="kaart" aria-label="Vijf vragen en hun lessen">${kaart}</ol></div>`;
}
/* Eén inhoudelijk vervolg: les en verhaal horen samen. Een klantvraag eindigt in
   het echte leeroverzicht; enkele onderwerpen bieden daarna een eigen verkenning.
   Geen afspraakroute, automatische gegevensoverdracht of verplicht curriculum. */
const LES_ZIN = { koopkracht:'Een groter bedrag later is nog geen grotere koopkracht. Wat kunt u over twintig jaar nog kopen?',
  spaarrekening:'De buffer staat meestal op een spaarrekening. Hoe geeft die rekening eigenlijk rente?',
  bouwstenen:'Staat uw geld bij een bank, bent u mede-eigenaar of leent u het uit?',
  verpakking:'Dezelfde beleggingen, andere afspraken. Wat verandert er tussen bank en verzekering?',
  'actief-index':'Een beheerder die kiest, of een fonds dat een lijst volgt: wat is het verschil echt?',
  'tak21-tak23':'Wat belooft een verzekeraar bij tak 21, en wat niet bij tak 23?',
  pensioensparen:'Een belastingvoordeel nu, een eindbelasting later: hoe werkt pensioensparen?',
  rendement:'Waaruit bestaat de opbrengst van uw geld, en wat houdt u ervan over?',
  tijd:'Wat gebeurt er wanneer uw opbrengst zelf de tijd krijgt om mee te groeien?',
  kosten:'Wat aan kosten weggaat, groeit niet meer mee. Hoe ziet u de totale prijs?',
  spreiding:'Welke tegenvallers kunnen uw doel raken, en wat vangt spreiding op?',
  daling:'Hoe diep kan een daling gaan, en wanneer weegt ze het zwaarst?',
  profiel:'Doel, termijn, draagkracht en ervaring: wat bepaalt welke aanpak past?',
  instappen:'In één keer of elke maand: welk ritme houdt u vol?',
  kind:'Sparen voor een kind: van wie is het geld, en wanneer moet het er zijn?',
  opvolgen:'Een plan blijft niet vanzelf kloppen. Wanneer kijkt u opnieuw?',
  aannames:'De lijn in een plangrafiek rust op aannames. Waar komen ze vandaan, en waar houden ze op?',
  'rendement-simulatie':'Met welk rendement rekent de simulatie, en wat zit er niet in?' };
const zinNaar = id => LES_ZIN[id] || (C.artikels.find(x => x.vervolg.id === id) || { vervolg:{} }).vervolg.zin || '';
const laagVervolgHTML = (id, lbl, zin, gelezenVerhaal) => `<a class="vervolg" href="${link(id)}${gelezenVerhaal ? `?verhaal=${encodeURIComponent(gelezenVerhaal)}` : ''}"><span class="klein">${esc(lbl)}</span><span class="vervolg-titel">${esc(art(id).titel)}</span><span class="vervolg-zin">${esc(zin ?? zinNaar(id))}</span></a>`;
/* onder een artikel: soort en plek van de bestemming in het label, de reden van het artikel als zin */
const naarBasisHTML = (id, zin, vanVerhaal) => laagVervolgHTML(id, 'Verder begrijpen', zin, vanVerhaal); // het gelezen verhaal reist mee: de les biedt het niet opnieuw aan
const PRAKTIJK = {
  "sparen-of-beleggen": {
    "id": "verbouwing",
    "zin": "Wat betekent een betaaldeadline voor het risico dat u kunt nemen?"
  },
  "spaarrekening": {
    "id": "autopanne",
    "zin": "Wat een onverwachte opname met basisrente en getrouwheidspremie doet."
  },
  "bouwstenen": {
    "id": "staatsbon",
    "zin": "Hoe een lening aan de staat eruitziet voor een gewone spaarder."
  },
  "verpakking": {
    "id": "twee-verpakkingen",
    "zin": "Waarom vergelijkbare beleggingen toch andere afspraken kunnen hebben."
  },
  "actief-index": {
    "id": "nijsmans",
    "zin": "Wat een fondsbeheerder leerde over de prijs van het beheer."
  },
  "tak21-tak23": {
    "id": "ethias",
    "zin": "Wat er achter de belofte van een spaarverzekering zit."
  },
  "pensioensparen": {
    "id": "extra-storting",
    "zin": "Waarom het gekozen plafond de vermindering op uw hele storting verandert."
  },
  "rendement": {
    "id": "vastgoed",
    "zin": "Huurinkomsten, kosten en waardeverandering naast elkaar."
  },
  "tijd": {
    "id": "twee-zussen",
    "zin": "Meer stortingen én meer tijd: twee effecten die vaak door elkaar lopen."
  },
  "kosten": {
    "id": "buffett",
    "zin": "Wat een bekende weddenschap wel en niet bewijst over kosten."
  },
  "koopkracht": {
    "id": "winkelkar",
    "zin": "Een hoger saldo kan toch minder kopen."
  },
  "spreiding": {
    "id": "fortis",
    "zin": "Wat één vertrouwd aandeel voor een gezinsvermogen kon betekenen."
  },
  "daling": {
    "id": "risico",
    "zin": "Wat een scherpe beursdaling zegt over het bedrijf en over uw belegging."
  },
  "profiel": {
    "id": "twee-collegas",
    "zin": "Waarom doel en draagkracht meer zeggen dan dezelfde beleggingstip."
  },
  "instappen": {
    "id": "eerste-jaar",
    "zin": "Wat een slecht startjaar doet met een afspraak om maandelijks te beleggen."
  },
  "kind": {
    "id": "mila",
    "zin": "Welke keuzes schuilgaan achter een spaarpot voor een kleinkind."
  },
  "opvolgen": {
    "id": "noorwegen",
    "zin": "Welke afspraken achter het doorbeleggen van het Noorse fonds zaten."
  },
  "aannames": {
    "id": "de-lijn",
    "zin": "De vragen achter inflatie, kosten en het gekozen marktpad."
  }
};
Object.assign(PRAKTIJK,{
  belastingen:{id:'belastingbrief',zin:'Hoe een bankinhouding en uw uiteindelijke belasting kunnen verschillen.'},
  langetermijnsparen:{id:'afbetaald',zin:'Een afbetaalde woonlening maakt fiscale ruimte niet vanzelfsprekend.'},
  zelfstandigen:{id:'twee-zaken',zin:'Hetzelfde pensioendoel, een andere betaler en andere fiscale regels.'}
});
/* Bewust inhoudelijk vervolg per les/verhaalpaar. Geen doorschuiven op basis van cataloguspositie. */
const PAAR_VERVOLG = {
 'sparen-of-beleggen':'spaarrekening', spaarrekening:null, bouwstenen:'actief-index', 'actief-index':'verpakking',
 verpakking:'tak21-tak23', 'tak21-tak23':null, pensioensparen:'langetermijnsparen', langetermijnsparen:null, zelfstandigen:null,
 rendement:'tijd', tijd:'kosten', kosten:'belastingen', belastingen:'koopkracht', koopkracht:'aannames', aannames:'rendement-simulatie', 'rendement-simulatie':null,
 spreiding:'daling', daling:null, profiel:'instappen', instappen:null, kind:null, opvolgen:null
};
const lesNa = id => LESVOLGORDE[LESVOLGORDE.indexOf(id) + 1] || null;
const praktijkHerkomst = (a, q) => { const id = q.get('vanles'); return id && PRAKTIJK[id]?.id === a.id ? id : null; };
function praktijkHTML(id) { const p = PRAKTIJK[id], a = art(p.id);
  return `<a id="praktijk-${id}" class="vervolg vervolg-verhaal" href="#/artikel/${p.id}?vanles=${id}"><span class="klein">In de praktijk · Verhaal</span><span class="vervolg-titel">${esc(a.titel)}</span><span class="vervolg-zin">${esc(p.zin)}</span></a>`;
}
/* 3.4 · reeksen: verhaal → uitleg → korte kennischeck. Elke pagina sluit af met precies één vervolg.
   REEKS_LES stuurt een bedrijfsverhaal naar de les die het begrip uitlegt (in plaats van naar een volgend verhaal). */
const REEKS_LES = { lotus:{ type:'lezen', id:'bouwstenen', zin:'Lotus toonde wat een aandeel is. De les zet het naast een obligatie en een fonds.' } };
/* In de flow is het volgende stuk van uw leesroute het ene vervolg; het laatste stuk brengt u terug. */
function routeVervolg(id) {
  if (!INGEBED) return '';
  let R = null; try { R = JSON.parse(sessionStorage.getItem('norte-kennis:route') || 'null'); } catch (e) { R = null; }
  const st = (R && R.stukken) || [], i = st.findIndex(x => x.id === id); if (i < 0) return '';
  const waar = new URLSearchParams(location.search).get('terug') === 'plan' ? 'plan' : 'simulatie';
  return i < st.length - 1
    ? `<a class="vervolg" href="${esc(st[i + 1].href)}"><span class="klein">Uw leesroute · stuk ${i + 2} van ${st.length}</span><span class="vervolg-titel">${esc(st[i + 1].t)}</span><span class="vervolg-zin">${esc(String(st[i + 1].min))} min lezen</span></a>`
    : `<button type="button" class="vervolg ingebed-terug-blok" data-plan-retour><span class="klein">Uw leesroute · alle ${st.length} gelezen</span><span class="vervolg-titel">Terug naar uw ${waar}</span><span class="vervolg-zin">U gaat verder waar u was, met dezelfde invoer.</span></button>`;
}
function lesVervolg(a) {
  const rv = routeVervolg(a.id); if (rv) return rv;
  const v = route().q.get('verhaal');
  if (PRAKTIJK[a.id] && !(v && art(v))) return praktijkHTML(a.id);
  return naLesEnVerhaal(a.id);
}
function naLesEnVerhaal(id) {
  const p = plek(id), ls = lessenIn(p.rb.id), nu = route(), cid = kcBijLes(id, nu.q.get('verhaal') || (nu.delen[0] === 'artikel' ? nu.delen[1] : null));
  if (EIGEN_PLAN[id]) {
    const r = route(), mila = id === 'kind' && (
      (r.delen[0] === 'leren' && r.delen[1] === 'les' && r.delen[2] === 'kind' && r.q.get('verhaal') === 'mila') ||
      (r.delen[0] === 'artikel' && r.delen[1] === 'mila' && r.q.get('vanles') === 'kind'));
    return planHTML(EIGEN_PLAN[id].zin, EIGEN_PLAN[id].titel, mila, EIGEN_PLAN[id].doel);
  }
  if (cid) return checkUitnodigingHTML(cid);
  const volgend=PAAR_VERVOLG[id];
  if (volgend) return laagVervolgHTML(volgend, 'Verder begrijpen');
  return `<a class="vervolg" href="#/leren" data-kaart="${id}"><span class="klein">Leeroverzicht</span><span class="vervolg-titel">Kies uw volgende vraag</span><span class="vervolg-zin">Verder ontdekken, op uw eigen tempo.</span></a>`;
}
const vervolgHTML = (id, zin) => `<a class="vervolg" href="${link(id)}"><span class="klein">${esc(label(id))}</span><span class="vervolg-titel">${esc(art(id).titel)}</span><span class="vervolg-zin">${esc(zin)}</span></a>`;
const EIGEN_PLAN = {
  kind:{ titel:'Werk een doel voor uw kind uit', zin:'Een eigen plan: voor wie, voor wanneer en hoeveel opzij.' },
  aannames:{ titel:'Verken uw eigen plan', zin:'Uw doelen en inleg samen bekijken, met de aannames in beeld.' },
  langetermijnsparen:{ titel:'Verken fiscaal sparen voor uzelf', zin:'Wat uw fiscale ruimte kan opleveren, met uw eigen bedrag.', doel:'fiscaal' },
  zelfstandigen:{ titel:'Verken fiscaal sparen voor uzelf', zin:'Met uw eigen statuut en bedrag, zonder iets vast te leggen.', doel:'fiscaal' }
};
const heeftPreviewPlan = () => { try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i) || ''; if (/^norte-preview-20261109-r1.*klantreis-k49$/.test(k)) return true; } } catch (e) { /* niets */ } return false; };
const planHTML = (zin, titel = 'Reken het na met uw eigen bedrag', mila = false, doel = '') => { const heeft = heeftPreviewPlan(), url = heeft ? '/ontwerp/klantreis-preview-09-11/?mijnplan=1' : '/ontwerp/klantreis-preview-09-11/?leeg=1&doel=' + (doel || (mila ? 'iemand' : 'groei')), kop = heeft ? 'Verder met uw plan' : mila ? 'Werk een doel voor uw kleinkind uit' : titel; return `<a class="vervolg vervolg-plan" href="${url}" data-plan><span class="klein">Uw eigen cijfers</span><span class="vervolg-titel">${esc(kop)}</span><span class="vervolg-zin">${esc(heeft ? 'U gaat verder waar u was.' : zin)}</span></a><p class="klein plan-overgang-noot">Voorbereiding, geen persoonlijk advies. Voorbeeldbedragen worden niet overgenomen.</p>`; };
const bronHTML = a => (a.actualiteit ? `<p class="actualiteit klein">${esc(a.actualiteit)}</p>` : '') + disclosure('bron-' + a.id, 'Bronnen en rekenmethode', `<ul class="bronlijst">${a.bronnen.map(b => `<li>${b.url ? `<a href="${b.url}" target="_blank" rel="noopener">${esc(b.label)}</a>` : esc(b.label)}</li>`).join('')}</ul><p class="klein">Educatieve uitleg, geen persoonlijk advies. Bij berekeningen staan de aannames en beperkingen vermeld; bedragen zijn afgerond. Historische resultaten voorspellen geen toekomstige opbrengst.</p>`);
function vLes(a) {
  return `<article class="laag-binnen les">
    ${rubriekHTML(a.id)}
    <h1 id="laag-kop" tabindex="-1">${esc(a.titel)}</h1>
    <p class="intro">${esc(a.inleiding)}</p>
    ${beeldHTML(a.beeld)}
    <div class="lopend">
      <p class="les-kern">${esc(a.kernidee)}</p>
      ${tekst(a.tekst)}
      <footer class="artikel-voet">${bronHTML(a)}<div id="les-vervolg">${lesVervolg(a)}</div></footer>
    </div></article>`;
}
function vBegrip(id, vanLes) {
  const b = C.begrippen[id], les = isLes(b.artikel) ? b.artikel : BEGRIP_LES[id];
  const verder = les && les !== vanLes ? `<a class="begrip-verder" href="#/leren/les/${les}"><span class="klein">Verder begrijpen</span><span class="begrip-verder-titel">${esc(KORT[les])}</span><span class="begrip-waarom">${esc(WAAROM[les])}</span></a>` : '';
  return `<div class="laag-binnen begrip-kort">
    ${vanLes ? '<p class="begrip-soort">Begrip</p>' : ''}
    <h1 id="laag-kop" tabindex="-1">${esc(b.term)}</h1>
    <p class="begrip-betekenis">${esc(b.betekenis)}</p>
    ${verder}
  </div>`;
}

/* Vrijwillige oefening: één antwoord per ronde. Opnieuw oefenen start een nieuwe ronde;
   afgeronde onderwerpen blijven meetellen. Alleen sessionStorage, geen formele toets. */
/* ───── 3.4 · Kennischeck: vrije oefening in de leerlaag ─────
   Eerst kiezen, dan bewust controleren; daarna uitleg bij het gekozen antwoord. Een begrip dat nog
   niet zat, komt terug in een andere situatie. Geen score, geen ervaringsvragen. De antwoorden
   blijven in deze browsersessie en worden nergens naartoe gestuurd of als dossierantwoord gebruikt:
   er bestaat bewust geen exportfunctie. Zeven beleggingsvormen: vragen, uitleg en bronnen uit kennisreis.js,
   leerfeedback uit kennischeck.js. Vijf onderwerpen bij de lessen: de bestaande situaties uit checks.js en redactie.js. */
const REIS = window.NORTE_KENNISREIS, KC = window.NORTE_KENNISCHECK, LESCHECK = window.NORTE_CHECKS || {};
const reisDeel = id => REIS.onderdelen.find(d => d.id === id);
/* de bestaande oefening bij de bouwstenenles staat in de bron onder de sleutel ‘obligaties’; hier heet ze naar de les, naast de beleggingsvorm ‘Obligaties’ */
const LC_BRON = { bouwstenen:'obligaties' }, LC_IDS = ['begin', 'bouwstenen', 'opbrengst', 'risico', 'aanpak'].filter(id => (LESCHECK[LC_BRON[id] || id] || {}).situaties);
const lcDeel = id => { if (!LC_IDS.includes(id)) return null; const c = LESCHECK[LC_BRON[id] || id];
  return { id, naam:c.naam, lc:c, vragen:c.situaties.map(x => [x.id, x.context, x.vraag, x.opties, x.juist, x.uitleg]) }; };
const kcDeel = id => reisDeel(id) || lcDeel(id);
/* leerinhoud bij één situatie: de zeven beleggingsvormen op volgorde, de vijf basisonderwerpen op de sleutel van de bestaande situatie */
const kcOe = (d, n) => (d.lc ? ((KC.lessen || {})[d.id] || []).find(x => x.id === d.vragen[n][0]) : (KC.begrippen[d.id] || [])[n]) || null;
const kcHer = (d, n) => (kcOe(d, n) || {}).her || null;
const kcLabel = (d, n) => d.lc ? d.lc.situaties[n].rij : KC.begrippen[d.id][n].label;
const kcUrl = (id, stap) => `#/leren/kennischeck${id ? '/' + id : ''}${stap ? '/' + stap : ''}`;
const kcSt = id => (S.kc ||= {})[id] ||= { rij:kcDeel(id).vragen.map((x, i) => 'v' + i), pos:0, kies:null, res:{}, hulp:false, klaar:false };
const kcLees = id => (S.kc || {})[id] || null; // lezen zonder een stand aan te maken
const kcItem = (d, key) => { const n = +key.slice(1);
  if (key[0] === 'h') { const h = kcHer(d, n); return { key, n, her:true, context:h.context, vraag:h.vraag, opties:h.opties, juist:h.juist, uitleg:h.uitleg }; }
  const q = d.vragen[n]; return { key, n, her:false, context:q[1], vraag:q[2], opties:q[3], juist:q[4], uitleg:q[5] }; };
/* stand per begrip: alleen een beschrijving voor de lezer, nooit een cijfer */
const KC_STAND = { meteen:'Wist u meteen', hulp:'Juist, na de uitleg vooraf', tweede:'Juist in een tweede situatie', aandacht:'Vraagt nog aandacht' };
function kcBegrip(d, n) { const st = kcLees(d.id), r = st && st.res['v' + n]; if (!r) return '';
  if (r.a === d.vragen[n][4]) return r.h ? 'hulp' : 'meteen';
  const her = kcHer(d, n), h = st.res['h' + n]; return !her ? 'aandacht' : !h ? '' : h.a === her.juist ? 'tweede' : 'aandacht'; }
const kcTid = { lotus:'aandelen', risico:'aandelen', 'colruyt-mede-eigenaar':'aandelen', staatsbon:'obligaties', nijsmans:'fondsen', buffett:'fondsen', ethias:'tak21', 'twee-verpakkingen':'tak23' };
/* welke kennischeck past na deze les: bij het verhaal dat de lezer net las, anders het eerste onderwerp dat nog open staat */
function kcBijLes(les, verhaal) { const ks = LC_IDS.filter(id => LESCHECK[LC_BRON[id] || id].les === les).concat(REIS.onderdelen.filter(d => KC.na[d.id] && KC.na[d.id].les === les).map(d => d.id)); if (!ks.length) return null;
  return (verhaal && ks.includes(kcTid[verhaal]) && kcTid[verhaal]) || ks.find(id => !(kcLees(id) || {}).klaar) || null; }
function checkUitnodigingHTML(tid) { const d = kcDeel(tid), st = kcLees(tid), bezig = st && !st.klaar && Object.keys(st.res).length;
  return `<a class="vervolg check-start" id="check-start-${tid}" href="${kcUrl(tid)}"><span class="klein">Korte kennischeck · ${d.vragen.length === 3 ? 'drie' : d.vragen.length} situaties</span><span class="vervolg-titel">${esc(d.naam)}: begrijpt u wat u las?</span><span class="vervolg-zin">${bezig ? 'U gaat verder waar u was.' : 'Na elk antwoord krijgt u uitleg. Voor uzelf, zonder score.'}</span></a>`; }
/* één passend vervolg na de check: eerst de uitleg bij wat nog aandacht vraagt, anders een verhaal dat het begrip toepast */
function kcVervolg(d) { const na = d.lc ? { les:d.lc.les } : KC.na[d.id] || {}, st = d.vragen.map((x, n) => kcBegrip(d, n)), n = st.indexOf('aandacht'), g = gelezen();
  if (n > -1) { const wat = kcLabel(d, n);
    return na.les && art(na.les) ? laagVervolgHTML(na.les, 'Lees de uitleg', `‘${wat}’ komt hier rustig aan bod, met een voorbeeld.`)
      : `<a class="vervolg" href="${kcUrl(d.id, 'uitleg')}"><span class="klein">Lees de uitleg</span><span class="vervolg-titel">${esc(d.kern)}</span><span class="vervolg-zin">${esc(`‘${wat}’ komt hier rustig aan bod.`)}</span></a>`; }
  if (d.lc && art(d.lc.verder)) return laagVervolgHTML(d.lc.verder, 'Verder begrijpen');
  const v = (na.verder || []).find(id => art(id) && !g.includes(id));
  if (v) return `<a class="vervolg vervolg-verhaal" href="#/artikel/${v}"><span class="klein">In de praktijk · Verhaal</span><span class="vervolg-titel">${esc(art(v).titel)}</span><span class="vervolg-zin">${esc((FEED.find(f => f.id === v) || {}).teaser || '')}</span></a>`;
  const volgend = REIS.onderdelen.find(x => x.id !== d.id && !(kcLees(x.id) || {}).klaar);
  return volgend ? `<a class="vervolg" href="${kcUrl(volgend.id)}"><span class="klein">Volgende kennischeck</span><span class="vervolg-titel">${esc(volgend.naam)}</span><span class="vervolg-zin">${esc(volgend.kern)}</span></a>`
    : `<a class="vervolg" href="#/leren"><span class="klein">Leeroverzicht</span><span class="vervolg-titel">Kies uw volgende vraag</span><span class="vervolg-zin">Verder ontdekken, op uw eigen tempo.</span></a>`; }
function vKennischeck(r) {
  const id = r.delen[2], d = kcDeel(id), stap = r.delen[3] || '';
  if (!d) return `<div class="laag-binnen reis kc"><h1 id="laag-kop" tabindex="-1">Kennischeck</h1><p class="reis-intro">Kies een onderwerp. Drie korte situaties; na elk antwoord krijgt u uitleg.</p>
    <div class="kc-groepen">${[['De basis', LC_IDS.map(lcDeel)]].concat(REIS.groepen.map((gr, i) => [gr, REIS.onderdelen.filter(x => x.groep === i)])).map(([gr, lijst], i) => `<section class="kc-groep" aria-labelledby="kc-g${i}"><h2 id="kc-g${i}">${esc(gr)}</h2><ul>${lijst.map(x => { const s = kcLees(x.id), stand = s && s.klaar ? 'Gedaan' : s && Object.keys(s.res).length ? 'Bezig' : ''; return `<li><a class="kc-thema" href="${kcUrl(x.id)}"><span class="kc-thema-n">${esc(x.naam)}</span>${stand ? `<span class="kc-thema-s">${stand}</span>` : ''}${pijl}</a></li>`; }).join('')}</ul></section>`).join('')}</div>
    <p class="reis-noot">Voor uzelf: geen beoordeling en geen beleggersprofiel. Uw antwoorden blijven tijdens dit bezoek in deze browser.</p>
    <p class="kc-uitn">Kreeg u een uitnodiging van uw kantoor? Open dan de link in die uitnodiging. Die bevraging staat los van deze oefening: wat u hier antwoordt, wordt daar niet overgenomen.</p></div>`;
  const st = kcSt(id), laag = d.naam.toLocaleLowerCase('nl-BE');
  if (stap === 'uitleg' && d.lc) return vKennischeck({ delen:r.delen.slice(0, 3), q:r.q });
  if (stap === 'uitleg') { const open = !st.klaar && st.rij[st.pos] && !st.res[st.rij[st.pos]]; if (open && !st.hulp) { st.hulp = true; bewaar(); }
    return `<article class="laag-binnen reis reis-uitleg kc"><span class="rubriek"><span class="rubriek-hoofd">Kennischeck</span><span class="rubriek-sub">${esc(d.naam)}</span></span><h1 id="laag-kop" tabindex="-1">${esc(d.kern)}</h1>${d.uitleg.map(([kop, p]) => `<section><h2>${esc(kop)}</h2><p>${esc(p)}</p></section>`).join('')}<p class="reis-bron"><a href="${d.bron}" target="_blank" rel="noopener">${esc(d.bronNaam)}</a>${d.bronExtra ? `<br><a href="${d.bronExtra}" target="_blank" rel="noopener">${esc(d.bronExtraNaam)}</a>` : ''}</p><a class="knop reis-knop" href="${kcUrl(id)}" data-kc-terug>${st.klaar ? 'Terug naar uw overzicht' : open ? 'Terug naar de vraag' : 'Verder met de kennischeck'}<span aria-hidden="true">→</span></a></article>`; }
  if (st.klaar) { const stand = d.vragen.map((x, n) => kcBegrip(d, n)), aandacht = stand.filter(x => x === 'aandacht').length;
    return `<div class="laag-binnen reis kc"><p class="kc-plek">Kennischeck · ${esc(d.naam)}</p><h1 id="laag-kop" tabindex="-1">${aandacht === 0 ? 'Dit begrijpt u.' : aandacht === 1 ? 'Eén begrip vraagt nog aandacht.' : `${aandacht === 2 ? 'Twee' : 'Drie'} begrippen vragen nog aandacht.`}</h1>
    <ul class="kc-rijen">${d.vragen.map((x, n) => `<li class="is-${stand[n]}"><span>${esc(kcLabel(d, n))}</span><span>${KC_STAND[stand[n]] || ''}</span></li>`).join('')}</ul>
    ${kcVervolg(d)}
    <p class="reis-noot">Voor uzelf. Dit overzicht is geen beoordeling, wordt niet doorgestuurd en telt niet als antwoord in een bevraging van een kantoor.</p>
    <button type="button" class="kc-opnieuw" data-kc-opnieuw>Opnieuw oefenen</button></div>`; }
  const it = kcItem(d, st.rij[st.pos]), res = st.res[it.key], opties = it.opties.map((o, j) => [j, o]).concat([[-1, 'Ik weet het nog niet']]), nu = res ? res.a : st.kies;
  const tab = nu == null ? opties[0][0] : nu;
  let fb = '';
  if (res) { const soort = res.a === it.juist ? 'juist' : res.a === -1 ? 'weet' : 'fout', oe = kcOe(d, it.n) || { fout:{}, vb:'' }, komtTerug = !it.her && soort !== 'juist' && !!kcHer(d, it.n);
    const kop = soort === 'juist' ? 'Juist.' : it.her ? (soort === 'weet' ? 'Goed dat u het zegt.' : 'Nog niet.') : soort === 'weet' ? 'Goed dat u het zegt.' : 'Net niet.';
    const a = !it.her && soort === 'fout' ? oe.fout[res.a] || oe.fout[it.opties[res.a]] || '' : '', b = !it.her && soort === 'weet' ? oe.vb : '', laatste = st.pos === st.rij.length - 1;
    fb = `<section class="check-uitleg" aria-labelledby="kc-fb"><h2 id="kc-fb" tabindex="-1">${kop}</h2>${a ? `<p>${esc(a)}</p>` : ''}<p>${esc(it.uitleg)}</p>${b ? `<p>${esc(b)}</p>` : ''}${komtTerug ? '<p class="kc-straks">Dit komt straks terug, in een andere situatie.</p>' : ''}</section>
    <div class="kc-acties"><button type="button" class="knop reis-knop" data-kc-verder>${laatste ? 'Rond af' : 'Volgende situatie'}<span aria-hidden="true">→</span></button></div>`; }
  return `<div class="laag-binnen reis reis-vraag kc"><p class="kc-plek">${esc(d.naam)} · ${st.pos + 1} van ${st.rij.length}${it.her ? ' · een andere situatie' : ''}</p><div class="kc-balk" aria-hidden="true"><i style="width:${Math.round((st.pos + (res ? 1 : 0)) / st.rij.length * 100)}%"></i></div>
    <div id="laag-kop" tabindex="-1"><p class="check-context">${esc(it.context)}</p><h1 class="check-vraag" id="kc-vraag">${esc(it.vraag)}</h1></div>
    <ul class="check-opties" role="radiogroup" aria-labelledby="kc-vraag">${opties.map(([j, o]) => `<li><button type="button" role="radio" class="check-optie${j === -1 ? ' weetniet' : ''}${res && j === it.juist ? ' klopt' : ''}" data-kc-k="${j}" aria-checked="${nu === j}" tabindex="${j === tab ? 0 : -1}"${res ? ' aria-disabled="true"' : ''}><span>${esc(o)}</span>${res && j === it.juist ? '<span class="check-tag">Zo zit het</span>' : '<span class="kc-m" aria-hidden="true"></span>'}</button></li>`).join('')}</ul>
    ${res ? fb : `<p class="kc-mis" id="kc-mis" role="status"></p><div class="kc-acties"><button type="button" class="knop reis-knop" data-kc-controleer>Controleer<span aria-hidden="true">→</span></button><a class="reis-hulp" href="${d.lc ? '#/leren/les/' + d.lc.les : kcUrl(id, 'uitleg')}" data-kc-hulp>${d.lc ? 'Eerst de uitleg lezen' : `Eerst ${esc(laag)} begrijpen`}</a></div>`}</div>`;
}
function bindKennischeck(r) {
  const id = r.delen[2], d = kcDeel(id); if (!d) return; const st = kcSt(id);
  const teken = focus => { const y = dlg.scrollTop; bewaar(); tekenLaag(route()); dlg.scrollTop = focus ? y : 0; (focus && $(focus, paneel) || $('#laag-kop', paneel))?.focus({ preventScroll:true }); };
  $('[data-kc-opnieuw]', paneel)?.addEventListener('click', () => { S.kc[id] = undefined; delete S.kc[id]; teken(); });
  $('[data-kc-terug]', paneel)?.addEventListener('click', e => { if (route(history.state?.van || '').delen.slice(0, 3).join('/') === `leren/kennischeck/${id}`) { e.preventDefault(); history.back(); } });
  if (r.delen[3] || st.klaar) return;
  const knoppen = $$('[data-kc-k]', paneel), it = kcItem(d, st.rij[st.pos]);
  const kies = (b, focus) => { if (st.res[it.key]) return; st.kies = +b.dataset.kcK; knoppen.forEach(x => { const aan = x === b; x.setAttribute('aria-checked', String(aan)); x.tabIndex = aan ? 0 : -1; }); const m = $('#kc-mis', paneel); if (m) m.textContent = ''; if (focus) b.focus(); bewaar(); };
  knoppen.forEach((b, i) => { b.addEventListener('click', () => kies(b, false));
    b.addEventListener('keydown', e => { const stap = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0; if (!stap) return; e.preventDefault(); const doel = knoppen[(i + stap + knoppen.length) % knoppen.length]; if (st.res[it.key]) doel.focus(); else kies(doel, true); }); });
  $('[data-kc-controleer]', paneel)?.addEventListener('click', () => {
    if (st.kies == null) { const m = $('#kc-mis', paneel); if (m) m.textContent = 'Kies eerst een antwoord. Weet u het niet? Kies dan ‘Ik weet het nog niet’.'; (knoppen.find(x => x.tabIndex === 0) || knoppen[0]).focus(); return; }
    st.res[it.key] = { a:st.kies, h:!!st.hulp }; if (!it.her && st.kies !== it.juist && kcHer(d, it.n)) st.rij.push('h' + it.n); st.kies = null; teken('#kc-fb'); const fbEl = $('#kc-fb', paneel); if (fbEl) { const rr = fbEl.getBoundingClientRect(); if (rr.bottom > innerHeight - 24) fbEl.scrollIntoView({ block:'center' }); } });
  $('[data-kc-hulp]', paneel)?.addEventListener('click', () => { st.hulp = true; bewaar(); });
  $('[data-kc-verder]', paneel)?.addEventListener('click', () => { st.pos += 1; st.hulp = false; if (st.pos >= st.rij.length) st.klaar = true; teken(); });
}
const ico = {
  chev:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>',
  sluit:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>',
  terug:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>'
};
const disclosure = (id, lbl, inhoud) => `<div class="disc"><button type="button" class="disc-knop" aria-expanded="false" aria-controls="${id}">${ico.chev}<span>${lbl}</span></button>
  <div class="disc-paneel" id="${id}" data-dicht><div class="disc-binnen">${inhoud}</div></div></div>`;
const tekst = html => html
  .replace(/<a\b[^>]*\bhref="#\/(?:artikel|leren\/les|verhalen)[^"]*"[^>]*>([\s\S]*?)<\/a>/g, '$1')
  .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (m, id, w) => `<a class="begrip" href="#/leren/begrip/${id}">${w}</a>`)
  .replace(/\{\{sim:(\w+)(?::([a-z0-9-]+))?\}\}/g, (m, id, context) => `<div class="sim" data-sim="${id}"${context ? ` data-context="${context}"` : ''}></div>`)
  .replace(/\s*\{\{poll:\w+\}\}\s*/g, '\n'); // kennisvragen voorlopig niet getoond; inhoud en opgeslagen antwoorden blijven
const staven = (rijen, opts = {}) => { const max = opts.max || Math.max(...rijen.map(r => Math.abs(r.v)), 1);
  return `<div class="staven">${rijen.map(r => `<div class="staaf-rij${r.cls ? ' ' + r.cls : ''}"><span class="staaf-label">${esc(r.l)}</span><span class="staaf" aria-hidden="true"><span style="width:${Math.max(0.5, Math.abs(r.v) / max * 100).toFixed(1)}%"></span></span><span class="staaf-waarde">${r.t}</span></div>`).join('')}</div>`; };
document.addEventListener('click', e => { const d = e.target.closest('.disc-knop'); if (d) { const open = d.getAttribute('aria-expanded') !== 'true'; d.setAttribute('aria-expanded', open); document.getElementById(d.getAttribute('aria-controls')).toggleAttribute('data-dicht', !open); } });

function beeldHTML(b, klein) {
  if (!b) return '';
  let inhoud = '';
  if (b.type === 'foto' || b.type === 'illustratie') return `<figure class="beeld beeld-foto"><img src="${b.src}" alt="${esc(b.alt)}" width="1600" height="1067"><figcaption>${esc(b.bijschrift)}${b.credit ? ` Foto: <a href="${b.credit.bron}" target="_blank" rel="noopener">${esc(b.credit.naam)}</a> · <a href="${b.credit.licentie}" target="_blank" rel="noopener">${esc(b.credit.label)}</a>. Uitsnede in de weergave.` : ''}</figcaption></figure>`;
  if (b.type === 'portret') return `<figure class="beeld beeld-portret"><img src="${b.src}" alt="${esc(b.alt)}" width="818" height="1090"><div class="portret-verhaal"><p class="portret-periode">De weddenschap · 2008–2017</p><p class="portret-kern">Het eerste jaar verloor Buffett terrein.<br>Tien jaar later won hij ruim.</p><p>Een verhaal over kosten, geduld en de grenzen van een vergelijking.</p></div><figcaption>${esc(b.bijschrift)}</figcaption></figure>`;
  if (b.type === 'termijn') inhoud = staven(b.rijen.map(([l, j]) => ({ l, v:j, t:`${fN(j)} jaar` })), { max:b.max });
  if (b.type === 'balken') inhoud = staven(b.rijen.map(([l, v, cls]) => ({ l, v, cls, t:b.eenheid === '€' ? fE(v) : fP(v) })));
  if (b.type === 'stroom') inhoud = `<ol class="stroom">${b.stappen.map(s => `<li>${esc(s)}</li>`).join('')}</ol><p class="stroom-noot">${esc(b.noot)}</p>`;
  if (b.type === 'tijdlijn') inhoud = `<ol class="tijdlijn">${b.punten.map(([t, d]) => `<li><span class="tl-tijd">${esc(t)}</span><span class="tl-wat">${esc(d)}</span></li>`).join('')}</ol>`;
  if (b.type === 'lagen') inhoud = `<div class="lagen">${b.lagen.map(([n, d], i) => `<div class="laag l${i}"><span class="laag-naam">${esc(n)}</span><span class="laag-wat">${esc(d)}</span></div>`).join('')}</div>`;
  if (b.type === 'bouwstenen') inhoud = `<dl class="bouwstenen-model"><div><dt>Spaargeld</dt><dd>Geld bij een bank</dd></div><div><dt>Aandeel</dt><dd>Mede-eigenaar</dd></div><div><dt>Obligatie</dt><dd>Geldschieter</dd></div><div><dt>Fonds</dt><dd>Een mand van beleggingen</dd></div></dl>`;
  if (b.type === 'rendement') inhoud = `<div class="rendement-model" aria-label="40 euro waardestijging plus 20 euro inkomsten is 60 euro opbrengst"><div><span>Waardestijging</span><strong>€ 40</strong></div><span class="reken-teken" aria-hidden="true">+</span><div><span>Inkomsten</span><strong>€ 20</strong></div><span class="reken-teken" aria-hidden="true">=</span><div><span>Opbrengst</span><strong>€ 60</strong></div></div>`;
  if (b.type === 'vergelijk') inhoud = `<div class="vergelijk">${b.kolommen.map(([n, items]) => `<div><p class="vg-naam">${esc(n)}</p><ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  if (b.type === 'reken') inhoud = rekenBeeld(b.id);
  return `<figure class="beeld beeld-data${klein ? ' klein' : ''}">${inhoud}<figcaption>${esc(b.bijschrift)}</figcaption></figure>`;
}
function rekenBeeld(id) {
  if (id === 'vroeg') { const rij = (naam, start) => { const j = 65 - start, w = R.pad({ start:0, maand:200, jaren:j, groei:4, kosten:0 }).at(-1); return [{ l:`${naam}, begint op ${start}: eigen inleg`, v:200 * 12 * j, t:fE(200 * 12 * j), cls:'zacht' }, { l:`${naam}: mogelijke waarde op 65`, v:w, t:fE(w) }]; };
    return staven([...rij('Lien', 30), ...rij('Tom', 40)]); }
  if (id === 'koopkracht') { const k = R.koopkracht([10000, ...Array(20).fill(10000)], 2).at(-1); return staven([{ l:'Op de rekening na 20 jaar', v:10000, t:fE(10000), cls:'zacht' }, { l:'Koopt nog zoveel als vandaag', v:k, t:fE(k) }]); }
  if (id === 'ritme') return staven([{ l:'Sofie: € 24.000 in één keer', v:10, t:'10 jaar gemiddeld belegd' }, { l:'Tom: € 200 per maand', v:5, t:'ongeveer 5 jaar gemiddeld', cls:'zacht' }], { max:10 });
  return '';
}

/* ───── LANDING ───── */
const tegel = (id, opts = {}) => { const a = art(id), l = label(id, 'inGroep');
  return `<a class="tegel ${opts.cls || ''}" href="${link(id)}">${opts.beeld || ''}${rubriekHTML(id)}<span class="tegel-titel">${esc(a.titel)}</span>${opts.tekst ? `<span class="tegel-tekst">${esc(opts.tekst)}</span>` : ''}</a>`; };
const module_ = (rid, inhoud, cls = '') => `<section class="module ${cls}" aria-labelledby="m-${rid}"><h2 class="module-kop" id="m-${rid}">${esc(rub(rid).vraag)}</h2>${inhoud}</section>`;
/* Redactionele verhalen met fotografie. Betekenisvolle cijferbeelden blijven in de nieuwsrij. */
const FEED = [
  {"id": "bedrijven-inflatie", "span": 7, "foto": "assets/verhaal-bedrijven-inflatie.svg", "illustratie": true, "teaser": "Duurdere boodschappen raken ook de bedrijven achter het winkelrek. Wat verandert er als u er mede-eigenaar van bent?"},
  {"id": "lotus", "span": 5, "foto": "assets/lotus.jpg", "pos":"50% 50%", "teaser": "Het speculaasje bij de koffie kent u. Maar wat bezit u als u een aandeel van de koekjesbakker koopt?"},
  {"id": "colruyt-mede-eigenaar", "span": 7, "foto": "assets/colruyt-kortrijk.jpg", "pos": "50% 74%", "teaser": "Een loon voor uw werk. En een stukje eigendom in het bedrijf. Colruyt-medewerkers kunnen al sinds 1987 die tweede rol opnemen."},
  { id:'nijsmans',    span:5, foto:'assets/verhaal-nijsmans.svg?v=b5046019', illustratie:true, teaser:'Tim Nijsmans begon met de koersen op teletekst. Als fondsbeheerder hield vooral de prijs van het beheer hem bezig.' },
  { id:'staatsbon',   span:7, foto:'assets/verhaal-staatsbon.svg?v=c72d079d', illustratie:true, teaser:'Spaarders leenden in 2023 massaal geld aan België. Wat kregen ze daarvoor terug?' },
  { id:'noorwegen',   span:5, foto:'assets/verhaal-noorwegen.svg?v=a3dede78', illustratie:true, teaser:'Noorwegen zette zijn olie-inkomsten in een fonds. In 2008 verloor het 23 procent, en kocht het meer aandelen dan ooit.' },
  { id:'risico', span:7, foto:art('risico').beeld.src, teaser:'Een sterk bedrijf kan een slechte beursdag hebben. Wat leert ASML over het verschil tussen een onderneming en haar koers?' },
  {"id": "twee-zussen", "span": 5, "foto": "assets/verhaal-twee-zussen.svg", "illustratie": true, "teaser": "Ellen begon tien jaar vroeger dan Griet. Wat doet dat met hun pensioenpot, en wat kan Griet zelf nog kiezen?"},
  { id:'vastgoed',    span:7, foto:'assets/vastgoed.jpg', pos:'50% 38%', teaser:'‘Stenen verliezen nooit hun waarde.’ Wat blijft er na alle kosten echt over?' },
  {"id": "winkelkar", "span": 5, "foto": "assets/verhaal-winkelkar.svg", "illustratie": true, "teaser": "Hilde en Marc bewaren € 10.000 voor een nieuw dak. Het bedrag blijft staan. Maar wat kan het later nog betalen?"},
  { id:'fortis',      span:7, foto:'assets/fortis.jpg',   pos:'50% 30%', teaser:'Voor veel Belgische families was Fortis het aandeel bij uitstek. In het najaar van 2008 verloren zij op enkele weken het grootste deel van die waarde.' },
  {"id": "twee-collegas", "span": 5, "foto": "assets/verhaal-twee-collegas.svg", "illustratie": true, "teaser": "Sanne en Pieter krijgen dezelfde bonus en dezelfde beleggingstip. Waarom past die tip niet bij allebei?"},
  {"id": "verbouwing", "span": 7, "foto": "assets/verhaal-verbouwing.svg", "illustratie": true, "teaser": "Over achttien maanden komt de aannemer. Is het verstandig om het geld voor de verbouwing intussen te beleggen?"},
  {"id": "autopanne", "span": 5, "foto": "assets/verhaal-autopanne.svg", "illustratie": true, "teaser": "Nadia haalt geld af één maand voor haar getrouwheidspremie verworven is. Wat kost dat aan rente?"},
  {"id": "twee-verpakkingen", "span": 7, "foto": "assets/verhaal-twee-verpakkingen.svg", "illustratie": true, "teaser": "Een bankfonds en een tak 23 beleggen in een vergelijkbare mix. Waarom maakt de verpakking dan toch verschil?"},
  {"id": "extra-storting", "span": 5, "foto": "assets/verhaal-extra-storting.svg", "illustratie": true, "teaser": "Dirk wil € 50 extra pensioensparen. Waarom kan hij daardoor minder belastingvoordeel krijgen?"},
  { id:'nikkei',      span:7, foto:'assets/verhaal-nikkei.svg?v=77d3eacd', illustratie:true, teaser:'In 1989 was de Japanse beurs groter dan de Amerikaanse. Het record van toen hield 34 jaar stand. Wat zegt dat over een wereldindex van vandaag?' },
  { id:'eerste-jaar', span:5, foto:'assets/verhaal-eerste-jaar.svg?v=3caca9ac', illustratie:true, teaser:'Sarah en Jonas beginnen in januari 2022 elke maand te beleggen. Dan komen de oorlog, de energiefactuur en een rood eerste jaar.' },
  { id:'ethias',      span:7, foto:'assets/verhaal-ethias.svg?v=7eeca97d', illustratie:true, teaser:'Klanten vroegen tegelijk hun geld terug uit een spaarverzekering. Wat staat er achter de belofte ‘gewaarborgd’?' },
  {"id": "de-lijn", "span": 5, "foto": "assets/verhaal-de-lijn.svg", "illustratie": true, "teaser": "Een lijn die precies op hun 65ste het doel raakt. Dries wil weten waarop die geruststellende grafiek steunt."},
  {"id": "belastingbrief", "span": 7, "foto": "assets/verhaal-belastingbrief.svg", "illustratie": true, "teaser": "Lena verkoopt aandelen met winst. Er wordt belasting ingehouden. Pas bij haar jaaroverzicht ziet ze waarom dat nog niet haar definitieve rekening is."},
  { id:'mila',        span:5, foto:'assets/verhaal-mila.svg?v=2373272f', illustratie:true, teaser:'Een oma en opa willen elke maand iets opzijzetten voor hun kleindochter. Op wiens naam, en voor wanneer?' },
  {"id": "afbetaald", "span": 7, "foto": "assets/verhaal-afbetaald.svg", "illustratie": true, "teaser": "Annelies betaalt haar woonlening af. Het maandbedrag komt vrij. Betekent dat ook dat ze nu fiscaal kan langetermijnsparen?"},
  {"id": "twee-zaken", "span": 5, "foto": "assets/verhaal-twee-zaken.svg", "illustratie": true, "teaser": "Sofie werkt op eigen naam. Karim heeft een vennootschap. Ze willen allebei een pensioenpot opbouwen, maar komen bij verschillende mogelijkheden uit."}
];
const BEELDEN = [
  { wat:'Colruyt-winkel, Kortrijk, 2008', wie:'Foto: LimoWreck, CC BY-SA 3.0. Origineel ongewijzigd; uitsnede in de weergave.', bron:'https://commons.wikimedia.org/wiki/File:Kortrijk_-_Colruyt_1.jpg', licentie:'https://creativecommons.org/licenses/by-sa/3.0/' },
  { wat:'Cijferbeelden in de nieuwsartikels', wie:'Eigen redactionele vectorbeelden van Norte, met gedateerde gegevens en bronduiding in de artikels.' },
  { wat:'ASML-campus, Veldhoven', wie:'Aangeleverd Norte-beeld.' },
  { wat:'Warren Buffett, 2015', wie:'Foto: USA International Trade Administration / Wikimedia Commons, publiek domein.', bron:'https://commons.wikimedia.org/wiki/File:Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_(cropped).jpg' },
  { wat:'Bij ‘Fortis 2008’: bankgebouw aan de Kunstberg (Montagne du Parc), Brussel, 2015', wie:'Foto: Fred Romero, CC BY 2.0. Verkleind, uitsnede op deze pagina. Archiefbeeld van 2015, geen beeld van de gebeurtenissen in 2008.', bron:'https://commons.wikimedia.org/wiki/File:Bruxelles_-_BNP_Paribas_Fortis.jpg', licentie:'https://creativecommons.org/licenses/by/2.0/' },
  { wat:'Bij ‘Lotus’: Lotus Biscoff-verpakking, 2024', wie:'Foto: François Nguyen, CC BY 2.0. Verkleind, uitsnede op deze pagina.', bron:'https://commons.wikimedia.org/wiki/File:Lotus_Biscoff.jpg', licentie:'https://creativecommons.org/licenses/by/2.0/' },
  { wat:'Bij ‘Een huurwoning als belegging’: woningen aan de Rue Raikem, Luik, 2019', wie:'Foto: Neoclassicism Enthusiast, CC BY-SA 4.0. Verkleind, uitsnede op deze pagina. Illustratief beeld, niet het pand uit de studie.', bron:'https://commons.wikimedia.org/wiki/File:Houses_on_the_Rue_Raikem,_in_Li%C3%A8ge_(Belgium).jpg', licentie:'https://creativecommons.org/licenses/by-sa/4.0/' }
];
function feedHTML() {
  const kaarten = FEED.map(f => { const a = art(f.id), l = label(f.id);
    const foto = window.NORTE_FOTOCOVERS?.[f.id];
    if (foto) f = { ...f, foto:foto.src, pos:foto.pos, illustratie:false };
    const cover = f.foto ? `<span class="feed-cover met-foto${f.illustratie ? ' is-illustratie' : ''}" aria-hidden="true"><img src="${f.foto}" alt="" width="1200" height="800" loading="lazy" decoding="async" style="object-position:${f.pos || '50% 50%'}"></span>`
      : `<span class="feed-cover is-jaar" aria-hidden="true"><span class="jaar-cijfer">${esc(f.jaar)}</span><span class="jaar-regel">${esc(f.jaarRegel)}</span></span>`;
    return `<a class="feed-stuk span-${f.span}" href="${link(f.id)}">${cover}${rubriekHTML(f.id)}<span class="feed-titel">${esc(a.titel)}</span><span class="feed-teaser">${esc(f.teaser)}</span></a>`; }).join('');
  const bronnen = `<ul class="beeld-lijst">${[...BEELDEN, ...(window.NORTE_FOTOBRONNEN || [])].map(b => `<li><span class="beeld-wat">${esc(b.wat)}</span> ${esc(b.wie)}${b.bron ? ` <a href="${b.bron}" target="_blank" rel="noopener">Bron</a>` : ''}${b.licentie ? ` · <a href="${b.licentie}" target="_blank" rel="noopener">Licentie</a>` : ''}</li>`).join('')}</ul>`;
  return `<section class="feed" aria-label="Verhalen">${kaarten}</section>
  <div class="beeldverantwoording">${disclosure('beeldbron', 'Beeldverantwoording', bronnen)}</div>`;
}
function actuaHTML() {
 const items=window.NORTE_ACTUA || [];
 return `<section class="actua" aria-labelledby="actua-kop"><div class="actua-kop"><h2 id="actua-kop">Uit het nieuws</h2><div class="actua-bediening"><button type="button" data-actua-richting="-1" aria-label="Vorige nieuwsartikels" aria-controls="actua-strook" disabled>←</button><button type="button" data-actua-richting="1" aria-label="Volgende nieuwsartikels" aria-controls="actua-strook">→</button></div></div><ul class="actua-strook" id="actua-strook">${items.map(n=>{const a=art(n.id), foto=window.NORTE_NIEUWSFOTOS?.[n.id];return `<li><a href="${link(n.id)}"><img src="${foto?.src || a.beeld.src}" width="1200" height="800" alt="" style="object-position:${foto?.pos || '50% 50%'}"><span class="actua-datum">${esc(n.datum)}</span>${rubriekHTML(n.id)}<span class="actua-titel">${esc(a.titel)}</span><span class="actua-teaser">${esc(a.teaser)}</span></a></li>`;}).join('')}</ul></section>`;
}
function soortL(a) { return a.soort === 'verhaal' && a.id !== 'van-plan-naar-oplossing' && a.id !== 'hoeveel-is-genoeg' ? 'Verhaal' : 'Uitleg'; }
/* ronde 48 · kennisstart: een leesroute (bij uw plan, of om te beginnen), daarna de vijf vragen met beeld */
const GELEZEN_K = 'norte-kennis:gelezen';
const gelezen = () => { try { return JSON.parse(localStorage.getItem(GELEZEN_K) || '[]'); } catch (e) { return []; } };
const merkGelezen = () => { const m = /#\/(?:artikel|leren\/les)\/([a-z0-9-]+)/.exec(location.hash); if (!m || !art(m[1])) return; try { const g = gelezen(); if (!g.includes(m[1])) { g.push(m[1]); localStorage.setItem(GELEZEN_K, JSON.stringify(g.slice(-80))); } } catch (e) { /* niets */ } };
addEventListener('hashchange', merkGelezen); merkGelezen();
const ROUTE_DOEL = { groei:'tijd', iemand:'kind', inkomen:'hoeveel-is-genoeg', ander:'sparen-of-beleggen', fiscaal:'pensioensparen' };
/* ronde 64 · leesroute: stuk 1 en 2 bij uw doelen (of dalingen), stuk 3 altijd hoe er gerekend wordt; nooit de volgende stap (die staat op het slotscherm) */
function bouwRoute(soorten, namen, plek) {
  const doel = soorten.filter(x => x !== 'fiscaal'); let r;
  if (!doel.length && soorten.includes('fiscaal')) r = ['pensioensparen', 'langetermijnsparen', 'belastingen'];
  else {
    // ronde 72: eerst de vraag die elk resultaat oproept (hoe komt dit bedrag tot stand?), dan wat bij uw doel hoort
    const reken = plek === 'plan' ? 'aannames' : 'rendement-simulatie';
    r = [reken, ...[...new Set(doel.map(x => ROUTE_DOEL[x] || 'sparen-of-beleggen'))].slice(0, 2)];
    if (r.length < 3) r.push(soorten.includes('fiscaal') ? 'pensioensparen' : doel[0] === 'inkomen' ? 'opvolgen' : 'daling');
  }
  r = [...new Set(r)].filter(id => art(id));
  ['daling', 'termijn', 'sparen-of-beleggen'].forEach(id => { if (r.length < 3 && !r.includes(id) && art(id)) r.push(id); });
  return { ids: r.slice(0, 3), namen, plek };
}
function planRoute() {
  const q = new URLSearchParams(location.search);
  if (q.get('ingebed') === '1') { // in de flow: alleen de simulatie of het plan van nu
    const ds = (q.get('doelen') || '').split(',').filter(Boolean); if (!ds.length) return null;
    return bouwRoute(ds, (q.get('namen') || '').split('|').map(x => x.trim()).filter(Boolean), q.get('terug') === 'plan' ? 'plan' : 'sim');
  }
  let best = null;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '', m = /^norte-preview-20261109-r1(?::s-([a-z0-9]{8,24}))?:klantreis-k49$/.exec(k); if (!m) continue;
      const o = JSON.parse(localStorage.getItem(k) || 'null'), gs = ((o && o.pl && o.pl.goals) || []).filter(g => g && !g.later); if (!gs.length || o.pl.kr !== 'plan') continue;
      const meta = JSON.parse(localStorage.getItem('norte-preview-20261109-r1' + (m[1] ? ':s-' + m[1] : '') + ':meta') || '{}') || {};
      const t = Number(meta.t) || 0; if (!best || t >= best.t) best = { t, gs };
    }
  } catch (e) { return null; }
  if (!best) return null;
  const soort = g => { const v = String(g.soort || g.doel || g.type || g.destination || '').toLowerCase(); if (g.k49fis || /fisc/.test(v)) return 'fiscaal'; if (/inkomen/.test(v)) return 'inkomen'; if (/iemand|kind/.test(v)) return 'iemand'; if (/groei/.test(v) || /vermogen/i.test(g.naam || '')) return 'groei'; return 'ander'; };
  return bouwRoute(best.gs.map(soort), best.gs.filter(g => !g.k49fis).map(g => String(g.naam || '').trim()).filter(Boolean), 'plan');
}
const VRAAG_BEELD = { begin:'assets/foto-autopanne.jpg', bouwstenen:'assets/foto-verpakkingen-papier.jpg', opbrengst:'assets/foto-twee-zussen.jpg', risico:'assets/foto-de-lijn.jpg', samen:'assets/foto-collegas-handen.jpg' };
const KORTT = { daling:'Wat als de markt daalt?', langetermijnsparen:'Wat levert langetermijnsparen op?', belastingen:'Wanneer betaalt u belasting?', 'hoeveel-is-genoeg':'Hoeveel hebt u later nodig?', tijd:'Waarom telt elk jaar?', kind:'Sparen voor een kind: op wiens naam?', 'van-plan-naar-oplossing':'Wat doet een makelaar?', 'sparen-of-beleggen':'Sparen of beleggen?', rendement:'Wat brengt uw geld op?', spreiding:'Wat kan er misgaan?', opvolgen:'Hoe volgt u een plan op?', pensioensparen:'Hoe werkt pensioensparen?', 'rendement-simulatie':'Met welk rendement rekent de simulatie?', aannames:'Hoe rekent uw plan?', termijn:'Waarom bouwen we het risico af?', koopkracht:'Wat is uw geld later nog waard?', kosten:'Wat gaat er nog af?', verpakking:'Bank of verzekering?' };
Object.assign(KORTT, { 'actief-index':'Actief of een index?' }); // korte vraagvorm zoals de andere stukken; past op één regel in de instapkaart
const kortT = a => KORTT[a.id] || a.titel.split(/[:?]/)[0];
const leerreisHTML = () => { const tot = LESVOLGORDE.filter(id => art(id)).length, n = LESVOLGORDE.filter(id => lesGezien(id)).length, h = n ? hervat() : null;
  const t = n ? `Verder in uw leerreis${h && KORT[h] ? `: ${esc(KORT[h])}` : ''}` : 'Liever stap voor stap?';
  const z = n ? `${n} van ${tot} lessen gelezen. U gaat verder waar u was.` : `De volledige leerreis: vijf vragen, ${tot} korte lessen en oefeningen. In uw eigen tempo.`;
  return `<a class="kv-leer" href="${n && h ? '#/leren/les/' + h : '#/leren'}"><span class="kv-lt"><b>${t}</b><span>${z}</span></span>${n ? `<span class="kv-lv" aria-hidden="true"><i style="width:${Math.round(n / tot * 100)}%"></i></span>` : ''}<span class="kv-lgo">${n ? 'Verder' : 'Open de leerreis'} <span aria-hidden="true">→</span></span></a>`; };
const opsom = l => l.length < 2 ? (l[0] || '') : l.slice(0, -1).join(', ') + ' en ' + l[l.length - 1];
/* ───── 3.4 · kennisstart ─────
   Eén opening (uw leesroute, of een vrije leesvoorkeur), het nieuws, en daaronder drie blokken
   met elk een eigen functie en vorm: klantvraag (taal), verdieping (werkvlak), verhaal (beeld). */
const INGEBED = new URLSearchParams(location.search).get('ingebed') === '1' && window.parent !== window;
const pijl = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/* Leesvoorkeur: alleen een keuze voor wat bovenaan staat. Geen kennis- of ervaringsgegeven,
   geen profiel; ze verbergt niets en wordt nergens anders gebruikt dan op deze pagina. */
const VOORKEUR_K = 'norte-kennis:voorkeur';
const VOORKEUREN = [['basis', 'De basis begrijpen'], ['verdiepen', 'Verder verdiepen'], ['ontdekken', 'Zelf ontdekken']];
const voorkeur = () => { try { const v = localStorage.getItem(VOORKEUR_K); return VOORKEUREN.some(x => x[0] === v) ? v : 'basis'; } catch { return 'basis'; } };
const START_ROUTE = { basis:['sparen-of-beleggen', 'rendement', 'spreiding'], verdiepen:['actief-index', 'kosten', 'belastingen'] };
const START_NAAM = { basis:'De basis', verdiepen:'Verdieping' };
const eersteZin = t => (String(t || '').match(/^.*?[.?!](?=\s|$)/) || [''])[0];
function vStart() {
  const EERST = { begin:'sparen-of-beleggen', bouwstenen:'bouwstenen', opbrengst:'rendement', risico:'spreiding', samen:'profiel' };
  const pr = planRoute(), g = gelezen(), vk = pr ? null : voorkeur();
  const ids = pr ? pr.ids : (START_ROUTE[vk] || []).filter(id => art(id));
  /* de route reist mee in het artikel: in de flow is het volgende stuk het ene vervolg */
  try { if (pr) sessionStorage.setItem('norte-kennis:route', JSON.stringify({ plek: pr.plek, stukken: ids.map(id => ({ id, t: kortT(art(id)), min: leestijd(art(id)), href: link(id) })) })); else sessionStorage.removeItem('norte-kennis:route'); } catch (e) { /* niets */ }
  const waar = pr ? (pr.plek === 'sim' ? 'Bij uw simulatie' : 'Bij uw plan') + (pr.namen.length ? ': ' + opsom(pr.namen.slice(0, 3)) : '') : 'Kennis · in gewone taal';
  const kop = pr ? (pr.plek === 'sim' ? 'Begrijp uw resultaat.' : 'Begrijp wat er achter uw plan zit.') : 'Sparen en beleggen begrijpen.';
  const belofte = pr ? 'Drie korte stukken: hoe er gerekend wordt, en wat bij uw doelen hoort.' : 'Korte uitleg en echte verhalen, zodat u zelf weet welke vragen u stelt.';
  /* 3.4.1: één vaste, rustige openingsfoto (pen op papier), zoals in 3.3.1; ze wisselt niet mee met het eerste stuk */
  const foto = 'assets/foto-de-lijn.jpg';
  /* 3.4.2 · instap als één geheel: de leesvoorkeur staat in de kaart die ze bestuurt. De drie varianten liggen
     op dezelfde plek in de kaart (en onder de kaart); alleen de gekozen is zichtbaar. Kaart, foto en nieuws
     krijgen daardoor hun hoogte van de inhoud zelf en verspringen niet. Een wissel tekent niets opnieuw. */
  const routeDeel = (lijst, naam, slot, klaar) => { const nG = lijst.filter(id => g.includes(id)).length, vg = lijst.find(id => !g.includes(id));
    return { kaart: vg
        ? `<p class="k4-kaart-stap">${naam ? naam + ' · stuk' : 'Stuk'} ${lijst.indexOf(vg) + 1} van ${lijst.length} · ${leestijd(art(vg))} min</p><h2 class="k4-kaart-vraag">${esc(kortT(art(vg)))}</h2><a class="k4-knop" href="${link(vg)}"><span>${nG ? 'Lees verder' : 'Begin met lezen'}</span>${pijl}</a>`
        : `<p class="k4-kaart-stap">${naam || klaar}</p><h2 class="k4-kaart-vraag">Alle drie gelezen.</h2>${slot}`,
      daarna: `<ol class="k4-daarna-lijst" aria-label="Daarna">${lijst.filter(id => id !== vg).map(id => { const a = art(id), ok = g.includes(id); return `<li class="k4-d${ok ? ' ok' : ''}"><a href="${link(id)}"><span class="k4-d-nr" aria-hidden="true">${ok ? '✓' : lijst.indexOf(id) + 1}</span><span class="k4-d-t">${esc(kortT(a))}</span><span class="k4-d-m">${ok ? 'Gelezen' : leestijd(a) + ' min'}</span></a></li>`; }).join('')}</ol>` }; };
  let delen;
  if (pr) delen = [['plan', routeDeel(ids, 'Uw leesroute', pr.plek === 'sim' ? `<a class="k4-knop" href="#terug" data-plan-retour><span>Terug naar uw simulatie</span>${pijl}</a>` : `<button type="button" class="k4-knop" onclick="window.NorteKlant&&NorteKlant.contact('plan')"><span>Bespreek uw plan</span>${pijl}</button>`)]];
  else { const check = `<a class="k4-knop" href="#/leren/kennischeck"><span>Doe een kennischeck</span>${pijl}</a>`, alle = C.artikels.filter(a => a.soort === 'verhaal' || a.soort === 'uitleg').length;
    delen = [['basis', routeDeel(START_ROUTE.basis.filter(id => art(id)), '', check, START_NAAM.basis)], ['verdiepen', routeDeel(START_ROUTE.verdiepen.filter(id => art(id)), '', check, START_NAAM.verdiepen)],
      ['ontdekken', { kaart: `<p class="k4-kaart-stap">Alle uitleg en verhalen · ${alle} stukken</p><h2 class="k4-kaart-vraag">Waar bent u naar op zoek?</h2><form class="k4-zoekform" role="search" data-k4-zoek><label class="k4-sr" for="k4-z">Zoek een onderwerp</label><input id="k4-z" type="search" placeholder="Zoek een onderwerp" autocomplete="off"><button type="submit" class="k4-knop"><span>Zoek</span>${pijl}</button></form>`,
        daarna: `<p class="k4-vb"><span class="k4-vb-l">Bijvoorbeeld</span>${[['pensioen', 'pensioen'], ['kosten', 'kosten'], ['kind', 'een kind']].map(([z, t]) => `<a class="k4-lees" href="#/verhalen?z=${z}">${t}</a>`).join('')}</p>` }]]; }
  const nu = pr ? 0 : Math.max(0, VOORKEUREN.findIndex(x => x[0] === vk));
  const keuze = pr ? '' : `<fieldset class="k4-vk"><legend id="k4-vk-l">Waar wilt u beginnen?</legend><div class="k4-vk-rij" role="radiogroup" aria-labelledby="k4-vk-l">${VOORKEUREN.map(([id, l]) => `<button type="button" class="k4-vk-o" role="radio" aria-checked="${id === vk}" tabindex="${id === vk ? 0 : -1}" data-k4-voorkeur="${id}"><span>${l.replace(/ (\S+)$/, '</span> <span>$1')}</span></button>`).join('')}<span class="k4-vk-lijn" aria-hidden="true"></span></div></fieldset>`;
  const stapel = soort => delen.map(([id, d], i) => `<div class="k4-deel" data-k4-deel="${id}"${i === nu ? '' : ' inert'}>${d[soort]}</div>`).join('');
  const kaart = `<div class="k4-kaart${pr ? '' : ' k4-kaart-keuze'}">${keuze}<div class="k4-stapel k4-panelen" data-k4-nu="${nu}">${stapel('kaart')}</div></div>`;
  const daarna = `<div class="k4-daarna k4-stapel" data-k4-nu="${nu}">${stapel('daarna')}</div>`;
  /* nieuws */
  const nieuws = (window.NORTE_ACTUA || []).filter(x => art(x.id)).slice(0, 3).map(x => { const a = art(x.id), f = (window.NORTE_NIEUWSFOTOS || {})[x.id] || {}; return { href: link(x.id), img: f.src || a.beeld.src || '', pos: f.pos || '50% 50%', meta: [x.sub, x.datum].filter(Boolean).join(' · '), t: a.titel, tz: a.teaser || a.inleiding || '' }; });
  const nieuwsHTML = nieuws.length ? `<section class="k4-sectie k4-wrap" aria-labelledby="k4-nieuws"><div class="k4-sectie-kop"><h2 class="k4-h2" id="k4-nieuws">Uit het nieuws</h2></div><div class="k4-nieuws">
    <a class="k4-n-groot" href="${nieuws[0].href}"><img src="${nieuws[0].img}" alt="" width="1200" height="675" style="object-position:${nieuws[0].pos}"><span class="k4-meta">${esc(nieuws[0].meta)}</span><span class="k4-t">${esc(nieuws[0].t)}</span><span class="k4-teaser">${esc(nieuws[0].tz)}</span></a>
    <div class="k4-n-lijst">${nieuws.slice(1).map(x => `<a class="k4-n-klein" href="${x.href}"><span class="k4-tx"><span class="k4-meta">${esc(x.meta)}</span><span class="k4-t">${esc(x.t)}</span></span><img src="${x.img}" alt="" width="296" height="222" loading="lazy" style="object-position:${x.pos}"></a>`).join('')}</div></div></section>` : '';
  /* klantvraag: opent meteen de uitleg */
  const vragenHTML = `<section class="k4-sectie k4-wrap" aria-labelledby="k4-vraag"><div class="k4-sectie-kop"><h2 class="k4-h2" id="k4-vraag">Met welke vraag zit u?</h2><a class="k4-lees" href="#/verhalen?zoek=1">Zoek een onderwerp</a></div>
    <div class="k4-vragen">${(C.hoofdstukken || []).filter(h => art(EERST[h.id])).map(h => `<a class="k4-vraag" href="#/leren/les/${EERST[h.id]}"><span class="k4-v-v">${esc(h.vraag)}</span><span class="k4-v-k">${esc(h.kort)}</span><span class="k4-v-n" aria-hidden="true">${pijl}</span></a>`).join('')}</div></section>`;
  /* verdieping: stap voor stap, met of zonder oefenen */
  const tot = LESVOLGORDE.filter(id => art(id)).length, gez = LESVOLGORDE.filter(id => lesGezien(id)).length, h = gez ? hervat() : null;
  const kcKlaar = REIS.onderdelen.filter(d => (S.kc || {})[d.id]?.klaar).length, kcBezig = REIS.onderdelen.find(d => { const s = (S.kc || {})[d.id]; return s && !s.klaar && Object.keys(s.res).length; });
  const diepHTML = `<section class="k4-sectie k4-wrap" aria-labelledby="k4-diep"><div class="k4-sectie-kop"><h2 class="k4-h2" id="k4-diep">Stap voor stap verdiepen</h2></div><div class="k4-diep">
    <div class="k4-diep-deel"><p class="k4-diep-soort">Leeromgeving</p><h3 class="k4-h3">${gez && h && KORT[h] ? `Verder met: ${esc(KORT[h])}` : 'Vijf vragen, in uw eigen tempo'}</h3><p class="k4-diep-z">${gez ? `${gez} van ${tot} lessen gelezen. ` : ''}Elke les legt één ding uit, met een voorbeeld en de bronnen erbij.</p><a class="k4-lees" href="${gez && h ? '#/leren/les/' + h : '#/leren'}"><span>${gez && h ? 'Lees verder' : 'Open de leeromgeving'}</span>${pijl}</a></div>
    <div class="k4-diep-deel"><p class="k4-diep-soort">Kennischeck</p><h3 class="k4-h3">${kcBezig ? `Verder met: ${esc(kcBezig.naam)}` : 'Begrijpt u wat u las?'}</h3><p class="k4-diep-z">${kcKlaar ? `${kcKlaar} van ${REIS.onderdelen.length} onderwerpen gedaan. ` : ''}Drie korte situaties per beleggingsvorm. Na elk antwoord krijgt u uitleg; er is geen score.</p><a class="k4-lees" href="${kcBezig ? '#/leren/kennischeck/' + kcBezig.id : '#/leren/kennischeck'}"><span>${kcBezig ? 'Ga verder' : 'Kies een onderwerp'}</span>${pijl}</a></div>
  </div></section>`;
  /* verhaal: echte bedrijven, met beeld */
  const MARKT = [['lotus', 'assets/lotus.jpg'], ['avh-geduld', ''], ['fortis', 'assets/fortis.jpg'], ['noorwegen', ''], ['nikkei', ''], ['buffett', 'assets/buffett-2015.jpg']];
  const markt = MARKT.filter(([id]) => art(id)).map(([id, src], i) => { const f = (window.NORTE_FOTOCOVERS || {})[id] || {}, fe = FEED.find(x => x.id === id) || {}; return `<a class="k4-m${i === 0 ? ' b1' : i === 1 ? ' b2' : ''}" href="${link(id)}"><img src="${f.src || src}" alt="" width="1200" height="800" loading="lazy" style="object-position:${f.pos || '50% 50%'}"><span class="k4-meta">${esc(SUB[id] || 'Verhaal')} · ${leestijd(art(id))} min</span><span class="k4-t">${esc(art(id).titel)}</span>${i < 2 ? `<span class="k4-teaser">${esc(fe.teaser || eersteZin(art(id).inleiding))}</span>` : ''}</a>`; }).join('');
  const bronnen = `<ul class="beeld-lijst">${[...BEELDEN, ...(window.NORTE_FOTOBRONNEN || [])].map(b => `<li><span class="beeld-wat">${esc(b.wat)}</span> ${esc(b.wie)}${b.bron ? ` <a href="${b.bron}" target="_blank" rel="noopener">Bron</a>` : ''}${b.licentie ? ` · <a href="${b.licentie}" target="_blank" rel="noopener">Licentie</a>` : ''}</li>`).join('')}</ul>`;
  const verhalenHTML = `<section class="k4-sectie k4-wrap" aria-labelledby="k4-markt"><div class="k4-sectie-kop"><h2 class="k4-h2" id="k4-markt">Echte bedrijven, echte jaren</h2><a class="k4-lees" href="#/verhalen"><span>Alle verhalen</span>${pijl}</a></div><p class="k4-sub">Wat u eigenlijk bezit als u belegt, en wat er gebeurde toen het tegenzat.</p><div class="k4-markt">${markt}</div><div class="beeldverantwoording k4-beeld">${disclosure('beeldbron', 'Beeldverantwoording', bronnen)}</div></section>`;
  /* de voorkeur bepaalt alleen de volgorde; alle drie de blokken blijven staan */
  const volgorde = vk === 'verdiepen' ? [diepHTML, vragenHTML, verhalenHTML] : vk === 'ontdekken' ? [verhalenHTML, vragenHTML, diepHTML] : [vragenHTML, verhalenHTML, diepHTML];
  return `<main id="main" tabindex="-1" class="k4" data-k4-voorkeur-nu="${vk || 'plan'}">
  <section class="k4-open" aria-labelledby="k4-h1"><div class="k4-open-grid">
    <div class="k4-open-tekst"><p class="k4-ctx">${esc(waar)}</p><h1 class="k4-h1" id="k4-h1">${kop}</h1><p class="k4-belofte">${belofte}</p></div>
    <div class="k4-open-foto"><img src="${foto}" alt="" width="1920" height="1442" style="object-position:50% 55%"></div>
    ${kaart}${daarna}
  </div></section>
  ${nieuwsHTML}${volgorde.join('')}
  <section class="k4-sectie k4-wrap" aria-label="Nieuwsbrief"><div class="k4-brief"><p class="k4-brief-t">Nieuwe uitleg en verhalen in uw mailbox?</p><button type="button" class="k4-knop-lijn" onclick="window.NorteKlant&&NorteKlant.nieuws()">Schrijf u in</button></div></section>
  </main>`;
}
/* leesvoorkeur kiezen: er wordt niets opnieuw getekend. De keuze zet alleen de toestand (welke variant zichtbaar is,
   waar het streepje staat, in welke volgorde de blokken onder het nieuws komen). Daardoor blijven focus, getypte
   zoektekst en leesplek vanzelf behouden, en kan een snelle reeks keuzes nooit een oude toestand achterlaten. */
const K4_VOLGORDE = { basis:['k4-vraag', 'k4-markt', 'k4-diep'], verdiepen:['k4-diep', 'k4-vraag', 'k4-markt'], ontdekken:['k4-markt', 'k4-vraag', 'k4-diep'] };
function k4Streep() { const rij = app.querySelector('.k4-vk-rij'), aan = rij && rij.querySelector('[aria-checked="true"]'); if (!aan || !rij.offsetWidth) return;
  rij.style.setProperty('--k4-x', aan.offsetLeft + 'px'); rij.style.setProperty('--k4-w', aan.offsetWidth + 'px'); rij.classList.add('is-gemeten'); }
function kiesVoorkeur(id, focus) {
  const i = VOORKEUREN.findIndex(x => x[0] === id), main = app.querySelector('main.k4'); if (i < 0 || !main || !main.querySelector('[data-k4-voorkeur]')) return;
  try { localStorage.setItem(VOORKEUR_K, id); } catch (e) { /* zonder opslag geldt de keuze voor dit bezoek */ }
  main.dataset.k4VoorkeurNu = id;
  main.querySelectorAll('[data-k4-voorkeur]').forEach(b => { const aan = b.dataset.k4Voorkeur === id; b.setAttribute('aria-checked', String(aan)); b.tabIndex = aan ? 0 : -1; if (aan && focus) b.focus({ preventScroll:true }); });
  main.querySelectorAll('[data-k4-nu]').forEach(x => { x.dataset.k4Nu = i; });
  main.querySelectorAll('[data-k4-deel]').forEach(x => x.toggleAttribute('inert', x.dataset.k4Deel !== id));
  k4Streep();
  const slot = main.lastElementChild; // de nieuwsbrief blijft onderaan; de drie blokken schuiven ervoor in de gekozen volgorde
  K4_VOLGORDE[id].forEach(k => { const sectie = main.querySelector(`:scope > section[aria-labelledby="${k}"]`); if (sectie) main.insertBefore(sectie, slot); });
}
if ('ResizeObserver' in window) new ResizeObserver(k4Streep).observe(app); // andere breedte of lettertype geladen: het streepje volgt
if (document.fonts && document.fonts.ready) document.fonts.ready.then(k4Streep);
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-k4-voorkeur]'); if (b && b.getAttribute('aria-checked') !== 'true') kiesVoorkeur(b.dataset.k4Voorkeur, true); });
document.addEventListener('keydown', e => { const b = e.target.closest && e.target.closest('[data-k4-voorkeur]'); if (!b) return;
  const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; if (!d) return;
  e.preventDefault(); const i = VOORKEUREN.findIndex(x => x[0] === b.dataset.k4Voorkeur); kiesVoorkeur(VOORKEUREN[(i + d + VOORKEUREN.length) % VOORKEUREN.length][0], true); });
document.addEventListener('submit', e => { const f = e.target.closest && e.target.closest('[data-k4-zoek]'); if (!f) return; e.preventDefault();
  const z = (f.querySelector('input').value || '').trim(); ga('#/verhalen?' + (z ? 'z=' + encodeURIComponent(z) : 'zoek=1'), f); });
function vVerhalen(q) {
  const z = (q.get('z') || '').trim().toLowerCase(), hf = q.get('h') || '';
  const EXTRA = { lotus:'assets/lotus.jpg', fortis:'assets/fortis.jpg', 'colruyt-mede-eigenaar':'assets/colruyt-kortrijk.jpg', vastgoed:'assets/vastgoed.jpg', risico:'assets/asml-campus.jpg' };
  const beeld = a => { const f = (window.NORTE_FOTOCOVERS || {})[a.id]; if (f) return [f.src, f.pos || '50% 50%']; const fe = FEED.find(x => x.id === a.id); if (fe && fe.foto && !/\.svg$/.test(fe.foto)) return [fe.foto, fe.pos || '50% 50%']; return EXTRA[a.id] ? [EXTRA[a.id], '50% 50%'] : null; };
  const alle = C.artikels.filter(a => a.soort === 'verhaal' || a.soort === 'uitleg');
  const sv = d => `<svg viewBox="0 0 40 40" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICO = { begin:sv('<circle cx="20" cy="20" r="13"/><path d="m25 15-3.5 8.5L15 25l3.5-8.5z"/>'), bouwstenen:sv('<rect x="8" y="22" width="10" height="10" rx="1.5"/><rect x="22" y="22" width="10" height="10" rx="1.5"/><rect x="15" y="9" width="10" height="10" rx="1.5"/>'), opbrengst:sv('<path d="M7 30h26"/><path d="m9 25 7-7 5 4 10-11"/><path d="M26 11h5v5"/>'), risico:sv('<path d="M6 22c4-8 7-8 10 0s6 8 10 0 6-8 8-4"/>'), samen:sv('<circle cx="15" cy="20" r="8"/><circle cx="25" cy="20" r="8"/>') };
  const H = (C.hoofdstukken || []);
  const chips = `<div class="kv-chips" role="group" aria-label="Kies een vraag"><button type="button" class="kv-chip" data-h="" aria-pressed="${!hf}">Alles</button>${H.map(h => `<button type="button" class="kv-chip" data-h="${h.id}" aria-pressed="${hf === h.id}">${esc(h.vraag)}</button>`).join('')}</div>`;
  const rij = a => { const b = beeld(a), t = (a.titel + ' ' + (a.inleiding || '') + ' ' + (SUB[a.id] || '') + ' ' + (a.kernidee || '') + ' ' + String(a.tekst || '').replace(/<[^>]+>|\[\[[^|\]]*\||\]\]|\{\{[^}]*\}\}/g, ' ')).toLowerCase().replace(/\s+/g, ' '), ok = (!z || t.includes(z)) && (!hf || a.hoofdstuk === hf);
    return `<a class="kv-hit" href="${link(a.id)}" data-t="${esc(t)}" data-h="${a.hoofdstuk}"${ok ? '' : ' hidden'}><span class="kv-hb${b ? '' : ' leeg'}"${b ? ` style="background-image:url('${b[0]}');background-position:${b[1]}"` : ''}>${b ? '' : (ICO[a.hoofdstuk] || '')}</span><span class="kv-ht"><small>${[...new Set([SUB[a.id], soortL(a)].filter(Boolean))].map(esc).join(' · ')} · ${leestijd(a)} min</small><b>${esc(a.titel)}</b></span></a>`; };
  const groepen = H.map(h => { const l = alle.filter(a => a.hoofdstuk === h.id); if (!l.length) return ''; return `<section class="kv-groep" data-g="${h.id}"><h2 class="kv-gk">${esc(h.vraag)} <span>${l.length}</span></h2><div class="kv-hits">${l.map(rij).join('')}</div></section>`; }).join('');
  return `<main id="main" tabindex="-1" class="kv kv2 kv3">
  <section class="kv-hero kv-zhero"><div class="wrap">
    <p class="kv-terug kv-terug-l"><a href="#/" data-artikeloverzicht>${ico.terug}<span>Kennisstart</span></a></p>
    <h1 class="kv-kop">Waar bent u naar op zoek?</h1>
    <form class="kv-zoekf kv-zgroot" role="search" onsubmit="return false"><label for="kv-z" class="sr">Zoek een onderwerp</label><input id="kv-z" type="search" placeholder="Bijvoorbeeld: pensioen, kosten, een kind, crisis" value="${esc(q.get('z') || '')}" autocomplete="off"></form>
    ${chips}
  </div></section>
  <div class="wrap kv-res"><p class="kv-tel" aria-live="polite">${alle.length} stukken</p>${groepen}<div class="kv-actua-z">${actuaHTML()}</div><p class="kv-geen" hidden>Niets gevonden. Probeer een ander woord, of <a href="#" onclick="event.preventDefault();window.NorteKlant&&NorteKlant.contact('kennis')">stel uw vraag aan een makelaar</a>.</p></div>
  </main>`;
}

/* ───── VERHAAL (redactionele artikelpagina) ───── */
function vArtikel(a, q) {
  const bijLes = Object.keys(PRAKTIJK).find(id => PRAKTIJK[id].id === a.id);
  const v = bijLes ? { type:'lezen', id:bijLes, zin:WAAROM[bijLes] } : REEKS_LES[a.id] || a.vervolg;
  const vanLes = praktijkHerkomst(a, q);
  const vervolg = routeVervolg(a.id) || (a.id === 'van-plan-naar-oplossing'
    ? '<button type="button" class="vervolg vervolg-gesprek kv-gesprek" data-gespreksartikel><span class="klein">Eerste gesprek</span><span class="vervolg-titel">Stel uw vraag</span><span class="vervolg-zin">Neem contact op met Norte.</span></button>'
    : vanLes
    ? naLesEnVerhaal(vanLes)
    : v.type === 'plannen' ? (a.id === 'hoeveel-is-genoeg' ? '' : planHTML(v.zin, v.titel, false, v.doel)) : isLes(v.id) ? naarBasisHTML(v.id, v.zin, a.id) : vervolgHTML(v.id, v.zin));
  return `<main id="main" tabindex="-1" class="artikel-main"><article class="artikel">
    <header class="wrap artikel-kop">
      ${vanLes ? `<a class="verhaal-terug" href="#/leren/les/${vanLes}" data-lesherkomst="${vanLes}">${ico.terug}<span>De les: ${esc(KORT[vanLes])}</span></a>` : `<a class="verhaal-terug" href="#/" data-artikeloverzicht>${ico.terug}<span>Alle artikels</span></a>`}
      ${rubriekHTML(a.id)}
      <h1 class="artikel-titel">${esc(a.titel)}</h1>
      <p class="intro">${esc(a.inleiding)}</p>
      <p class="meta">${a.publicatie?esc(a.publicatie)+' · ':''}${leestijd(a)} min lezen<button type="button" class="kv-deel" data-deelart="${a.id}"><svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 10V2.5M5 5.5 8 2.5l3 3M3 8.5v5h10v-5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Doorsturen</button></p>
    </header>
    <div class="wrap artikel-beeld">${beeldHTML(a.beeld)}</div>
    <div class="wrap lopend">
      ${tekst(a.tekst)}
      <footer class="artikel-voet">${bronHTML(a)}<div id="vervolg-anker">${vervolg}</div><nav class="artikel-retour" aria-label="Terug naar het artikeloverzicht"><a href="#/" data-artikeloverzicht>${ico.terug}<span>Terug naar alle artikels</span></a></nav></footer>
    </div></article></main>`;
}

document.addEventListener('click', (e) => {
  const actie = e.target.closest('[data-gespreksartikel]');
  if (!actie) return;
  if (window.parent !== window && document.documentElement.classList.contains('ingebed')) {
    window.parent.postMessage({norte: 'kennis-gesprek'}, location.origin);
  } else if (window.NorteKlant) {
    window.NorteKlant.contact('algemeen', {over: 'Artikel: Van plan naar oplossing'});
  }
});

/* ───── mini-verkenningen (rekenkern) ───── */
const SIMS = {
  /* tijd en kosten: dezelfde berekening als de plancurve (rekenkern M27 via js/planbron-koopkracht.js), met een fictief voorbeelddoel */
  tijd: { titel:'Wat doet een vast bedrag over de tijd?', modi:[['inleg', 'Wat levert mijn maandbedrag op?'], ['doel', 'Wat vraagt mijn doel per maand?']],
    velden:{ inleg:[{ k:'maand', label:'Per maand', soort:'geld', min:0, max:2000, stap:25, std:'200', na:'per maand' }, { k:'jaren', label:'Termijn', soort:'jaren', min:1, max:50, stap:1, std:'20', na:'jaar' }],
             doel:[{ k:'doel', label:'Doelbedrag', soort:'geld', min:1000, max:500000, stap:1000, std:'40.000' }, { k:'jaren', label:'Termijn', soort:'jaren', min:1, max:50, stap:1, std:'15', na:'jaar' }] },
    keuze:{ k:'aanpak', label:'Voorbeeldaanpak', opties:[['defensief', 'Defensief'], ['neutraal', 'Neutraal'], ['dynamisch', 'Dynamisch']], std:'neutraal' },
    reken(x, modus) { return { html:planTijdHTML(x, modus) }; } },
  kosten: { titel:'Wat doet één percentage kosten?', velden:{ _:[{ k:'kosten', label:'Jaarlijkse kosten', soort:'procent', min:0, max:3, stap:0.1, std:'1,7', na:'% per jaar' }] },
    reken(x) { return { html:planKostenHTML(x) }; } },
  /* Koopkracht behouden = PlanJourney.preservation uit de actuele klantflow (educatieve kopie, js/planbron-koopkracht.js):
     iedere storting groeit vanaf haar eigen datum mee met de inflatie, in euro's van dat latere jaar. Geen deflatie, geen nieuw rekenmodel. */
  koopkracht: { titel:'Hoeveel hebt u later nodig om evenveel te kunnen kopen?', velden:{ _:[{ k:'bedrag', label:'Bedrag vandaag', soort:'geld', min:1000, max:500000, stap:500, std:'10.000' }, { k:'jaren', label:'Over', soort:'jaren', min:1, max:40, stap:1, std:'20', na:'jaar' }, { k:'inflatie', label:'Jaarlijkse inflatie', soort:'procent', min:0, max:10, stap:0.25, std:'2', na:'% per jaar' }] },
    reken(x) { return { html:planKoopkrachtHTML(x) }; } },
  kloof: { eigen:true, velden:{ _:[] } },
  kloofwegen: { eigen:true, velden:{ _:[] } },
  spreiding: { titel:'Hoeveel weegt één bedrijf?', velden:{ _:[] }, keuze:{ k:'gewicht', label:'Deel van uw beleggingen in één bedrijf', opties:[['5', '5 %'], ['20', '20 %'], ['50', '50 %'], ['80', '80 %']], std:'20' },
    reken(x) { const g = +x.gewicht, eff = R.concentratie(g, 90);
      return { hoofd:['Uw beleggingen dalen met', fP(Math.abs(eff))], staven:[{ l:'Vóór, op € 50.000', v:50000, t:fE(50000), cls:'zacht' }, { l:'Na een daling van 90 % bij dat ene bedrijf', v:50000 * (1 + eff / 100), t:fE(50000 * (1 + eff / 100)) }],
        aanname:'Fictieve stresstest: één bedrijf daalt met 90 %, de andere beleggingen blijven gelijk. Geen reconstructie van Fortis. In een echte crisis kunnen meerdere posities tegelijk dalen. Geen profielscore of productadvies.' }; } }
};
function veldHTML(scope, f, waarde) {
  const v = waarde ?? f.std, n = R.lees(v, f.soort).v, id = `${scope}-${f.k}`;
  return `<div class="veld" data-k="${f.k}"><label class="veld-label" for="${id}">${f.label}</label>
    <div class="veld-rij"><input type="range" id="${id}-r" min="${f.min}" max="${f.max}" step="${f.stap}" value="${Number.isFinite(n) ? Math.min(f.max, Math.max(f.min, n)) : f.min}" aria-label="${f.label}, schuifregelaar" tabindex="-1">
    <span class="bedrag-veld">${f.soort === 'geld' ? '<span class="valuta">€</span>' : ''}<input id="${id}" inputmode="decimal" autocomplete="off" value="${esc(v)}" aria-describedby="${id}-f">${f.na ? `<span class="eenheid">${f.na}</span>` : ''}</span></div>
    <p class="veld-fout" id="${id}-f" aria-live="polite"></p></div>`;
}
const keuzeHTML = (scope, k, w) => `<fieldset class="segment"><legend class="veld-label">${k.label}</legend><div class="segment-rij">${k.opties.map(([v, l]) => `<label class="seg"><input type="radio" name="${scope}-${k.k}" value="${v}" ${String(w) === v ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>`;
function bindSim(el) {
  const id = el.dataset.sim, d = SIMS[id], context = el.dataset.context;
  /* Een concrete verhaalillustratie krijgt haar eigen invoer, met dezelfde
     bestaande bediening en rekenkern. Ze overschrijft geen andere verkenning. */
  const scope = context ? `${id}-${context}` : id, st = S.sims[scope] || (S.sims[scope] = {});
  if (d.eigen) { (id === 'kloofwegen' ? kloofWegen : kloofEigen)(el, st); return; }
  const kindVoorbeeld = id === 'tijd' && context === 'mila';
  if (kindVoorbeeld && st._modus == null) st._modus = 'inleg';
  if (kindVoorbeeld && st['inleg.maand'] == null) st['inleg.maand'] = '50';
  if (kindVoorbeeld && st['inleg.jaren'] == null) st['inleg.jaren'] = '18';
  if (kindVoorbeeld && st['doel.jaren'] == null) st['doel.jaren'] = '18';
  const modus = d.modi ? (st._modus || d.modi[0][0]) : '_', velden = d.velden[modus];
  if (d.keuze && st[d.keuze.k] == null) st[d.keuze.k] = d.keuze.std;
  (d.keuzes || []).forEach(k => { if (st[k.k] == null) st[k.k] = k.std; });
  el.innerHTML = `<section class="werkvlak" aria-labelledby="sim-${scope}-kop">
    <div class="werkvlak-kop"><h3 id="sim-${scope}-kop" class="werkvlak-titel">${kindVoorbeeld ? 'Maandelijks iets opzij voor een kind' : d.titel}</h3><span class="label-illustratie">Illustratie</span></div>
    ${d.modi ? `<fieldset class="segment modus"><legend class="sr">Vraag</legend><div class="segment-rij">${d.modi.map(([m, l]) => `<label class="seg"><input type="radio" name="${scope}-modus" value="${m}" ${m === modus ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>` : ''}
    <div class="sim-velden">${(d.keuzes || []).map(k => keuzeHTML(scope, k, st[k.k])).join('')}${velden.map(f => veldHTML(`${scope}-${modus}`, f, st[modus + '.' + f.k])).join('')}${d.keuze ? keuzeHTML(scope, d.keuze, st[d.keuze.k]) : ''}</div>
    <div class="sim-uit" aria-live="polite"></div></section>`;
  const uit = $('.sim-uit', el);
  const teken = () => {
    const x = {}; for (const f of velden) { const r = R.lees(st[modus + '.' + f.k] ?? f.std, f.soort); if (r.v === null || Number.isNaN(r.v) || r.v < f.min || r.v > f.max) { uit.innerHTML = '<p class="aanname">Vul een geldige waarde in om de uitkomst te zien.</p>'; return; } x[f.k] = r.v; }
    if (d.keuze) x[d.keuze.k] = st[d.keuze.k];
    (d.keuzes || []).forEach(k => { x[k.k] = st[k.k]; });
    uit.classList.remove('verouderd'); const r = d.reken(x, modus);
    uit.innerHTML = r.html ?? `<p class="sim-hoofd"><span>${r.hoofd[0]}</span><strong>${r.hoofd[1]}</strong></p>${staven(r.staven)}<p class="aanname">${r.aanname}</p>`;
  };
  velden.forEach(f => {
    const w = $(`.veld[data-k="${f.k}"]`, el), inp = $('input:not([type=range])', w), rng = $('input[type=range]', w), fout = $('.veld-fout', w);
    const check = toon => { const r = R.lees(inp.value, f.soort); let m = '';
      if (r.v === null) m = 'Vul een waarde in.'; else if (Number.isNaN(r.v)) m = r.uitleg; else if (r.v < f.min || r.v > f.max) m = `Kies tussen ${f.soort === 'geld' ? fE(f.min) + ' en ' + fE(f.max) : fN(f.min) + ' en ' + fN(f.max)}.`;
      if (toon || !m) { fout.textContent = toon ? m : ''; inp.toggleAttribute('aria-invalid', !!m && toon); } return m ? null : r.v; };
    inp.addEventListener('input', () => { st[modus + '.' + f.k] = inp.value; bewaar(); const v = check(false); if (v !== null) rng.value = v; teken(); });
    inp.addEventListener('blur', () => check(true));
    inp.addEventListener('keydown', e => { if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return; e.preventDefault();
      const cur = R.lees(inp.value, f.soort).v, b = Number.isFinite(cur) ? cur : +rng.value;
      const nv = Math.min(f.max, Math.max(f.min, Math.round((b + (e.key === 'ArrowUp' ? 1 : -1) * f.stap * (e.shiftKey ? 10 : 1)) * 100) / 100));
      rng.value = nv; rng.dispatchEvent(new Event('input')); });
    rng.addEventListener('input', () => { const v = +rng.value; inp.value = f.soort === 'geld' ? fN(v) : String(v).replace('.', ','); st[modus + '.' + f.k] = inp.value; bewaar(); fout.textContent = ''; inp.removeAttribute('aria-invalid'); teken(); });
  });
  if (d.keuze) $$(`input[name="${scope}-${d.keuze.k}"]`, el).forEach(r => r.addEventListener('change', () => { st[d.keuze.k] = r.value; bewaar(); teken(); }));
  (d.keuzes || []).forEach(k => $$(`input[name="${scope}-${k.k}"]`, el).forEach(r => r.addEventListener('change', () => { st[k.k] = r.value; bewaar(); teken(); })));
  if (d.modi) $$(`input[name="${scope}-modus"]`, el).forEach(r => r.addEventListener('change', () => { st._modus = r.value; bewaar(); bindSim(el); $(`input[name="${scope}-modus"][value="${r.value}"]`, el).focus(); }));
  teken();
}

/* ───── uitsneden uit het Norte-plan (js/planbron-koopkracht.js): bronfuncties ongewijzigd, fictief voorbeelddoel vanaf 40 jaar ───── */
const PLAN_S0 = 40, PB = () => window.NortePlanbron;
function planVoorbeeld(doel, scenario) { const E = PB().PlanEngine; E.setStart(PLAN_S0); const p = E.initial(); p.real = false; Object.assign(p.scenario, scenario || {});
  p.goals = [Object.assign({ id:'voorbeeld', name:'Voorbeeld', destination:'uitbetaling', monthly:0, lump:0, approach:'norte', phases:[], rk:{ soort:'zelf' } }, doel)]; return p; }
const planBereken = (p, stand) => PB().metRekenkern(PLAN_S0, stand, () => PB().PlanEngine.compute(p));
/* reeks tot en met de doeldatum, vóór de uitbetaling */
const planPunten = (r, jaren, waarde = t => t.total) => r.totals.filter(t => t.age < PLAN_S0 + jaren - 1e-9).map(t => [t.age - PLAN_S0, waarde(t)]).concat([[jaren, waarde(PB().PlanEngine.at(r, PLAN_S0 + jaren, false))]]);
function lijnGrafiek(jaren, reeksen, aria) {
  const W = 640, H = 240, L = 64, Rm = 12, T = 14, B = 30, max = Math.max(1, ...reeksen.flatMap(r => r.pts.map(q => q[1]))) * 1.08;
  const stap = [1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 250000, 500000].find(s => max / s <= 5) || 1000000;
  const X = t => L + t / jaren * (W - L - Rm), Y = v => T + (1 - v / max) * (H - T - B);
  const ticks = []; for (let v = 0; v <= max; v += stap) ticks.push(v);
  const jt = jaren <= 10 ? [0, jaren] : [0, Math.max(5, Math.round(jaren / 10) * 5), jaren];
  return `<svg class="kk-grafiek" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
    ${ticks.map(v => `<line x1="${L}" x2="${W - Rm}" y1="${Y(v)}" y2="${Y(v)}" class="kk-raster"/><text x="${L - 10}" y="${Y(v) + 4}" text-anchor="end" class="kk-as">${fE(v)}</text>`).join('')}
    ${jt.map(t => `<text x="${X(t)}" y="${H - 8}" text-anchor="${t ? (t === jaren ? 'end' : 'middle') : 'start'}" class="kk-as">${t ? 'over ' + t + ' jaar' : 'vandaag'}</text>`).join('')}
    ${reeksen.map(r => `<path d="${r.pts.map(([t, v], k) => `${k ? 'L' : 'M'}${X(t).toFixed(1)},${Y(v).toFixed(1)}`).join('')}" class="${r.cls}"/>`).join('')}</svg>`;
}
const sleutel = items => `<p class="kk-sleutel">${items.map(([cls, t]) => `<span><i class="kk-lijn ${cls}" aria-hidden="true"></i>${t}</span>`).join('')}</p>`;
const PLAN_AANNAME = 'Voorbeeld uit het Norte-plan, met rekenaannames van 6,59\u00a0% voor aandelen en 3,02\u00a0% voor obligaties per jaar, vóór kosten en belasting. De verdeling wordt rustiger richting het doel. Het model bevat voorbeeldschokken, geen voorspeld beursverloop. De werkelijke uitkomst kan lager zijn, ook lager dan uw inleg.';
function planKoopkrachtHTML(x) {
  if (!PB()) return '<p class="aanname">De koopkrachtfunctie van het plan is niet geladen.</p>';
  const p = planVoorbeeld({ horizon:PLAN_S0 + x.jaren, destination:null, lump:x.bedrag }, { inflation:x.inflatie });
  const res = PB().PlanJourney.preservation(p), pts = res.totals.filter(t => t.age <= PLAN_S0 + x.jaren + 1e-9).map(t => [t.age - PLAN_S0, t.total]), eind = pts.at(-1)[1];
  return `<p class="sim-hoofd"><span>Nodig over ${x.jaren} jaar om evenveel te kunnen kopen als met ${fE(x.bedrag)} vandaag</span><strong>${fE(eind)}</strong></p>
    ${sleutel([['behoud', 'Koopkracht behouden'], ['rekening', `Op de rekening, zonder rente: ${fE(x.bedrag)}`]])}
    ${lijnGrafiek(x.jaren, [{ pts:[[0, x.bedrag], [x.jaren, x.bedrag]], cls:'kk-rekening' }, { pts, cls:'kk-behoud' }], `Koopkracht behouden groeit van ${fE(x.bedrag)} naar ${fE(eind)} over ${x.jaren} jaar; op de rekening blijft ${fE(x.bedrag)}.`)}
    <p class="aanname">Koopkracht behouden is de lijn uit het Norte-plan: wat nodig is om het bedrag vanaf vandaag met ${fP(x.inflatie)} inflatie per jaar te laten meegroeien. Een referentie, geen verwacht rendement. Bedragen in euro’s van dat latere jaar; elk jaar dezelfde inflatie, terwijl die in werkelijkheid schommelt. Geen rente, kosten of belasting. De tekst hierboven kijkt andersom: wat een vast bedrag later nog koopt.</p>`;
}
function planTijdHTML(x, modus) {
  if (!PB()) return '<p class="aanname">De rekenkern van het plan is niet geladen.</p>';
  const doel = modus === 'doel', r = planBereken(planVoorbeeld(doel ? { horizon:PLAN_S0 + x.jaren, doelbedrag:x.doel } : { horizon:PLAN_S0 + x.jaren, monthly:x.maand }), x.aanpak);
  if (!r.rekenkern) return `<p class="aanname">${esc(r.reden || 'De rekenkern gaf voor deze invoer geen uitkomst.')}</p>`;
  const g = r.goals[0], waarde = PB().PlanEngine.at(r, PLAN_S0 + x.jaren, false).total, inleg = g.contributedAtGoal, naam = { defensief:'Defensief', neutraal:'Neutraal', dynamisch:'Dynamisch' }[x.aanpak];
  return `<p class="sim-hoofd"><span>${doel ? `Nodig per maand voor ${fE(x.doel)} over ${x.jaren} jaar` : `Mogelijke waarde na ${x.jaren} jaar`}</span><strong>${fE(doel ? g.maand : waarde)}</strong></p>
    ${sleutel([['plan', `Mogelijke waarde, aanpak ${naam}`], ['inleg', `Eigen inleg: ${fE(inleg)}`]])}
    ${lijnGrafiek(x.jaren, [{ pts:planPunten(r, x.jaren, t => t.contributed[0]), cls:'kk-inleg' }, { pts:planPunten(r, x.jaren), cls:'kk-plan' }], `Mogelijke waarde ${fE(waarde)} na ${x.jaren} jaar bij een eigen inleg van ${fE(inleg)}.`)}
    <p class="aanname">${PLAN_AANNAME} Inleg elke maand, zonder kosten of belasting; bedragen in euro’s van het jaar zelf. De voorbeeldaanpak is geen beleggersprofiel.</p>`;
}
/* pensioenkloof: gemiddeld wettelijk pensioen (PensionStat.be, netto, 2026) en dezelfde rekenkern als de simulatie */
const PENSIOEN = { werknemer:1565, zelfstandige:1231, ambtenaar:2521 };
const KLOOF_START = 67, KLOOF_EIND = 90;
const KLOOF_CACHE = {};
function kloofMaand(leeftijd, kloof, stand) {
  if (!PB() || kloof <= 0 || leeftijd >= KLOOF_START) return { m:0, kap:0 };
  const sl = leeftijd + '|' + Math.round(kloof) + '|' + stand; if (KLOOF_CACHE[sl]) return KLOOF_CACHE[sl];
  const rek = m => PB().metRekenkern(leeftijd, stand, () => { const E = PB().PlanEngine; E.setStart(leeftijd); const p = E.initial(); p.real = false; p.scenario.indexIncome = false;
    p.goals = [{ id:'kloof', name:'Pensioenkloof', destination:'inkomen', monthly:m, lump:0, approach:'norte', phases:[], rk:{ soort:'zelf' }, horizon:KLOOF_START, incomeMonthly:kloof, incomeEnd:KLOOF_EIND }]; return E.compute(p); }).goals[0];
  const per = Math.max(1, rek(100).atGoal / 100), est = kloof * 12 * (KLOOF_EIND - KLOOF_START) * 0.85 / per;
  let lo = est * 0.5, hi = est * 1.5, n = 0; while ((rek(hi).shortfall || 0) > 1 && n++ < 8) { lo = hi; hi *= 1.6; }
  for (let i = 0; i < 9; i++) { const mid = (lo + hi) / 2; if ((rek(mid).shortfall || 0) > 1) lo = mid; else hi = mid; }
  return (KLOOF_CACHE[sl] = { m:Math.ceil(hi / 5) * 5, kap:rek(hi).atGoal || 0 });
}
/* ronde 56 · pensioenkloof in drie tikken: statuut, woonsituatie, leefstijl. Geen invoer door de klant.
   Huur: gemiddelde huurprijs private markt Vlaanderen 2023 (Statistiek Vlaanderen, lopende contracten).
   Sober en ruimer: voorlopig 20 % onder en boven de gemiddelde levensstandaard van 65-plussers (geen Belgische bron per leefstijl). */
const KLOOF_LEEF = { sober:2060, nu:2580, ruim:3100 }, KLOOF_HUUR = 766;
const KLOOF_NAAM = { werknemer:'Werknemer', zelfstandige:'Zelfstandige', ambtenaar:'Ambtenaar' };
const kloofUrl = kl => `/ontwerp/klantreis-preview-09-11/?leeg=1&doel=inkomen&campagne=genoeg${kl > 0 ? `&wens=${encodeURIComponent(Math.round(kl))}` : ''}`;
function kloofSeg(naam, vraag, opties, st) {
  return `<p class="kloof2-vr" id="kloof2-v-${naam}">${vraag}</p><div class="kloof2-seg kloof2-seg${opties.length}" role="radiogroup" aria-labelledby="kloof2-v-${naam}">${opties.map(([w, l, k]) => `<button type="button" role="radio" data-g="${naam}" data-w="${w}" aria-checked="${st[naam] === w}">${l}${k ? `<small>${k}</small>` : ''}</button>`).join('')}</div>`;
}
function kloofEigen(el, st) {
  if (!KLOOF_NAAM[st.statuut]) st.statuut = 'werknemer'; if (!st.woon) st.woon = 'eigen'; if (!KLOOF_LEEF[st.leef]) st.leef = 'nu';
  el.innerHTML = `<section class="kloof2" aria-label="Uw pensioenkloof berekenen">
    ${kloofSeg('statuut', 'Hoe werkt u?', [['werknemer', 'Werknemer'], ['zelfstandige', 'Zelfstandige'], ['ambtenaar', 'Ambtenaar']], st)}
    ${kloofSeg('woon', 'Waar woont u later?', [['eigen', 'Eigen woning', 'afbetaald'], ['huur', 'Ik huur']], st)}
    ${kloofSeg('leef', 'Hoe wilt u leven?', [['sober', 'Sober'], ['nu', 'Zoals nu'], ['ruim', 'Ruimer']], st)}
    <div class="kloof2-uit" aria-live="polite"></div></section>`;
  const uit = $('.kloof2-uit', el);
  const teken = () => {
    const p = PENSIOEN[st.statuut], leef = KLOOF_LEEF[st.leef], huur = st.woon === 'huur' ? KLOOF_HUUR : 0, nodig = leef + huur, kloof = Math.max(0, nodig - p);
    S.kloof = { kloof, statuut:st.statuut, woon:st.woon };
    document.dispatchEvent(new CustomEvent('kloof:zet'));
    const pp = Math.round(Math.min(p, nodig) / nodig * 100), kp = 100 - pp;
    uit.innerHTML = `<p class="kloof2-res"><strong>${kloof > 0 ? fE(kloof) + ' per maand' : 'Geen kloof'}</strong><span>${kloof > 0 ? 'Zoveel komt u gemiddeld tekort, elke maand.' : 'Uw pensioen dekt dit gemiddeld.'}</span></p>
      <div class="kloof2-bar" aria-hidden="true"><i class="pen" style="width:${pp}%"></i><i class="kl" style="width:${kloof > 0 ? kp : 0}%"></i></div>
      <p class="kloof2-leg"><span><i class="pen"></i>Wettelijk pensioen</span><span><i class="kl"></i>Kloof</span></p>
      <dl class="kloof2-reken"><dt>Nodig om te leven</dt><dd>${fE(leef)}</dd>${huur ? `<dt>Huur</dt><dd>+ ${fE(huur)}</dd>` : ''}<dt>Wettelijk pensioen</dt><dd>− ${fE(p)}</dd><dt class="tot">Uw kloof</dt><dd class="tot">${fE(kloof)}</dd></dl>
      ${kloof > 0 ? `<button type="button" class="knop kloof2-cta" data-naarwegen>Zoek ${fE(kloof)} per maand<span aria-hidden="true">→</span></button>` : `<a class="knop kloof2-cta" href="${kloofUrl(0)}" data-plan>Maak uw eigen plan<span aria-hidden="true">→</span></a>`}
      <p class="kloof2-bron">Gemiddelden, geen advies. Bronnen onderaan het artikel.</p>`;
  };
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-g]');
    if (b) { st[b.dataset.g] = b.dataset.w; bewaar(); $$(`[data-g="${b.dataset.g}"]`, el).forEach(x => x.setAttribute('aria-checked', String(x === b))); teken(); return; }
    if (e.target.closest('[data-naarwegen]')) { const w = document.getElementById('kloof-wegen'); if (w) { const snel = matchMedia('(prefers-reduced-motion: reduce)').matches; w.scrollIntoView({ behavior:snel ? 'auto' : 'smooth', block:'start' }); w.focus({ preventScroll:true }); } }
  });
  teken();
}
/* het vervolg van hetzelfde artikel: de manieren om de kloof te dichten, met het eigen bedrag en statuut */
const KLOOF_WERK = {
  werknemer:['Aanvullend pensioen via uw werk', 'Als werknemer bouwt u vaak al iets op via een groepsverzekering. Vraag na hoeveel dat is: het kantoor kijkt graag mee.'],
  zelfstandige:['Aanvullend pensioen als zelfstandige', 'Het VAPZ, en met een vennootschap de IPT, bouwen extra pensioen op met belastingvoordeel.'],
  ambtenaar:['Aanvullend pensioen naast uw ambt', 'Uw wettelijk pensioen is hoger, maar vaak is er geen aanvullend pensioen via het werk. Fiscaal sparen weegt dan zwaarder.'] };
function kloofWegen(el) {
  const teken = () => {
    const k = S.kloof || { kloof:1015, statuut:'werknemer', woon:'eigen' }, w = KLOOF_WERK[k.statuut] || KLOOF_WERK.werknemer;
    el.innerHTML = `<section class="kloof-wegen" id="kloof-wegen" tabindex="-1" aria-labelledby="kloof-wegen-kop">
      <h2 id="kloof-wegen-kop">${k.kloof > 0 ? `Zo zoekt u ${fE(k.kloof)} per maand` : 'Wat de kloof kleiner maakt'}</h2>
      <p>Vier manieren. U hoeft ze niet allemaal te gebruiken: samen maken ze de kloof kleiner.</p>
      <ul class="kloof-wegen-lijst">
        <li><strong>Zelf opbouwen, met tijd</strong><span>Wie vroeg begint, zet per maand minder opzij, omdat de opbrengst zelf meegroeit. Hoeveel schommeling bij u past, bepaalt uw beleggersprofiel.</span></li>
        <li><strong>Fiscaal sparen</strong><span>Pensioensparen en langetermijnsparen geven een belastingvoordeel op een deel van wat u inlegt.</span></li>
        <li><strong>${w[0]}</strong><span>${w[1]}</span></li>
        <li><strong>Wat u al hebt</strong><span>${k.woon === 'huur' ? 'Spaargeld dat al opzij staat, maakt het bedrag dat u nog moet zoeken kleiner. Wie later toch koopt en afbetaalt, betaalt geen huur meer.' : 'Een afbetaalde woning en spaargeld dat al opzij staat, maken het bedrag dat u nog moet zoeken kleiner.'}</span></li>
      </ul>
      <div class="kloof-wegen-slot"><a class="knop" href="${kloofUrl(k.kloof)}" data-plan data-kloof>Reken uit wat u per maand opzij zet<span aria-hidden="true">→</span></a><span>Met uw leeftijd. Het bedrag staat al klaar.</span></div>
      <p class="klein plan-overgang-noot">Voorbereiding, geen persoonlijk advies.</p></section>`;
  };
  teken();
  const bij = () => { if (!el.isConnected) { document.removeEventListener('kloof:zet', bij); return; } teken(); };
  document.addEventListener('kloof:zet', bij);
  el.addEventListener('click', e => { if (e.target.closest('[data-kloofcontact]') && window.NorteKlant && NorteKlant.contact) NorteKlant.contact('kennis'); });
}
/* het vervolg onder het artikel neemt, na een bewuste klik, de eigen bedragen mee naar de echte simulatie */
function kloofPlanHTML(v) {
  const kl = () => Math.round((S.kloof && S.kloof.kloof) || 1015), url = () => `/ontwerp/klantreis-preview-09-11/?leeg=1&doel=inkomen&campagne=genoeg&wens=${encodeURIComponent(kl())}`;
  return `<a class="vervolg vervolg-plan" href="${url()}" data-plan data-kloof><span class="klein">Uw eigen cijfers</span><span class="vervolg-titel">${esc(v.titel)}</span><span class="vervolg-zin">Hoeveel u per maand opzijlegt, hangt af van uw leeftijd. Uw kloof staat al klaar.</span></a><p class="klein plan-overgang-noot">Voorbereiding, geen persoonlijk advies.</p>`;
}
document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('[data-kloof]'); if (!a) return; a.href = kloofUrl((S.kloof && S.kloof.kloof) || 0); }, true);
function planKostenHTML(x) {
  if (!PB()) return '<p class="aanname">De rekenkern van het plan is niet geladen.</p>';
  const J = 25, doel = { horizon:PLAN_S0 + J, lump:10000 }, basis = planBereken(planVoorbeeld(doel), 'neutraal'), met = planBereken(planVoorbeeld(doel, { ongoing:x.kosten }), 'neutraal');
  if (!basis.rekenkern) return `<p class="aanname">${esc(basis.reden || 'De rekenkern gaf voor deze invoer geen uitkomst.')}</p>`;
  const at = r => PB().PlanEngine.at(r, PLAN_S0 + J, false).total, a = at(basis), b = at(met);
  return `<p class="sim-hoofd"><span>Verschil na ${J} jaar</span><strong>${fE(a - b)}</strong></p>
    ${sleutel([['basis', `Basisplan zonder productkosten: ${fE(a)}`], ['plan', `Met ${fP(x.kosten)} lopende kosten: ${fE(b)}`]])}
    ${lijnGrafiek(J, [{ pts:planPunten(basis, J), cls:'kk-basis' }, { pts:planPunten(met, J), cls:'kk-plan' }], `Na ${J} jaar ${fE(a)} zonder en ${fE(b)} met ${fP(x.kosten)} lopende kosten.`)}
    <p class="aanname">Hetzelfde voorbeeldplan uit de rekenkern van het Norte-plan: € 10.000 eenmalig, ${J} jaar, aanpak Neutraal. Alleen de lopende kosten verschillen; ze worden, zoals in de kostenverkenning van het plan, elke maand op de waarde ingehouden. Geen instapkosten of belasting. Het model bevat voorbeeldschokken. Dit is een vergelijking onder dezelfde aannames, geen voorspelling van uw opbrengst.</p>`;
}

/* ───── na het tekenen van de achtergrond ───── */
function naAchtergrond(delen, q) {
  const [a, b] = delen;
  if (!a) k4Streep();
  $$('.sim[data-sim]', app).forEach(bindSim);
  const strook=$('#actua-strook',app);
  if(strook){const knoppen=$$('[data-actua-richting]',app),update=()=>{knoppen[0].disabled=strook.scrollLeft<2;knoppen[1].disabled=strook.scrollLeft+strook.clientWidth>=strook.scrollWidth-2;};
    knoppen.forEach(k=>k.addEventListener('click',()=>strook.scrollBy({left:+k.dataset.actuaRichting*(strook.firstElementChild.getBoundingClientRect().width+24),behavior:'auto'})));
    strook.addEventListener('scroll',update,{passive:true});requestAnimationFrame(update);
  }
  if (a === 'artikel') { const anker = $('#vervolg-anker');
    if (V.aan && anker && 'IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { V.gelezen[b] = new Date().toISOString().slice(0, 10); bewaar(); io.disconnect(); } }); io.observe(anker); } }
}

/* deeplink naar de leerlaag: eerst een achtergrondingang in de geschiedenis, zodat sluiten en terug logisch werken */
if (isLaagHash(location.hash) && !(history.state && history.state.laag)) {
  const doel = location.hash; history.replaceState({}, '', S.achter && !isLaagHash(S.achter) ? S.achter : '#/');
  delete S.bron[location.hash]; // geopend via een link van buiten: geen opener op de pagina, focus gaat naar de inhoud
  history.pushState({ laag:1, achter:location.hash || '#/' }, '', doel);
}
render();
})();

/* ronde 50: zoeken en filteren in alle verhalen, terwijl u typt */
const kvFilter = () => { const zi = document.getElementById('kv-z'); if (!zi) return; const z = zi.value.trim().toLowerCase(), hc = document.querySelector('.kv-chip[aria-pressed="true"]'), hf = hc ? hc.dataset.h : ''; let n = 0;
  document.querySelectorAll('.kv-hit').forEach(x => { const ok = (!z || (x.dataset.t || '').includes(z)) && (!hf || x.dataset.h === hf); x.hidden = !ok; if (ok) n++; });
  document.querySelectorAll('.kv-groep').forEach(g => { g.hidden = !g.querySelector('.kv-hit:not([hidden])'); });
  const t = document.querySelector('.kv-tel'); if (t) t.textContent = n + (n === 1 ? ' stuk' : ' stukken'); const g0 = document.querySelector('.kv-geen'); if (g0) g0.hidden = n > 0; const az = document.querySelector('.kv-actua-z'); if (az) az.hidden = !!(z || hf); };
document.addEventListener('input', e => { if (e.target.id === 'kv-z') kvFilter(); });
document.addEventListener('click', e => { const c = e.target.closest && e.target.closest('.kv-chip'); if (!c) return; document.querySelectorAll('.kv-chip').forEach(x => x.setAttribute('aria-pressed', String(x === c))); kvFilter(); });

/* ronde 53: een artikel doorsturen, zonder gegevens van de lezer */
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-deelart]'); if (!b) return; e.preventDefault(); e.stopPropagation(); const a = ((window.NORTE_INHOUD || {}).artikels || []).find(x => x.id === b.dataset.deelart); if (!a) return;
  const url = location.origin + '/kennis/#/artikel/' + a.id;
  if (navigator.share && matchMedia('(max-width:800px)').matches) { navigator.share({ title: a.titel, url }).catch(() => {}); return; }
  if (window.NorteKlant && NorteKlant.deel) NorteKlant.deel({ kop: 'Dit artikel doorsturen', titel: a.titel, url, zin: 'U stuurt alleen de link naar dit artikel door. Er gaan geen gegevens van u mee.' }); }, true);
