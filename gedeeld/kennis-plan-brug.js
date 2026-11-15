/* Norte 49.2 · kennis ↔ plan. Laadt na norte-project.js en vóór kennis/js/app.js.
 * Levert NorteKennisPlanAdapter.status(). Bij een klik op de bestaande, enige planvervolgroute (a[data-plan]) wordt
 * de terugweg vastgelegd (adres, scrollpositie, focus) én, alleen voor de plan-relevante oefening 'tijd', de waarden
 * die de bezoeker zelf instelde, met herkomst. Standaardwaarden en het Mila-voorbeeld gaan mee als 'voorbeeld' en worden
 * in het plan nooit als eigen keuze gebruikt. Kosten-, koopkracht- en rendementsoefeningen en testscores gaan niet mee.
 * Het plan vraagt eerst een expliciete klantkeuze voor er iets wordt toegevoegd. Geen extra knop of route in het artikel. */
(function () {
  'use strict';
  var NP = window.NorteProject; if (!NP) return;
  var SKEY = 'norte.kennis.overlay.sessie';
  var STD = { 'inleg.maand': '200', 'inleg.jaren': '20', 'doel.doel': '40.000', 'doel.jaren': '15' };
  var MILA = { 'inleg.maand': '50', 'inleg.jaren': '18', 'doel.jaren': '18' };
  var geld = function (v) { var n = Number(String(v).replace(/\s/g, '').replace(/\./g, '').replace(',', '.')); return isFinite(n) ? n : null; };
  window.NorteKennisPlanAdapter = { status: function () { try { var s = NP.planSummary(window.localStorage, 'norte-r30:klantreis-k49'); return s.heeftPlan === null ? null : { heeftPlan: s.heeftPlan, doelen: s.doelen.length }; } catch (e) { return null; } } };
  // Plan → kennis → hetzelfde plan. Alleen lezen; de ontvangende klantlaag verbruikt haar snapshot.
  // Dit is navigatie, geen a[data-plan]-vervolg en geen overdracht van oefeninvoer.
  function klantreisRetour() {
    try { var r=JSON.parse(sessionStorage.getItem('norte.klantreis.retour')||'null'); if(!r||!/^norte-r30:klantreis-k49(?:-sim-(?:groei|inkomen|iemand|ander|fiscaal|algemeen))?$/.test(r.sleutel)||!Number.isFinite(r.op)||Date.now()-r.op<0||Date.now()-r.op>=6*3600*1000)return null;
      var u=new URL(r.href,location.href);if(u.origin!==location.origin||!['/klantreis/','/klantreis/Klantreis.dc.html','/klantreis/Plan.dc.html'].includes(u.pathname)||u.username||u.password)return null;return u.href;
    }catch(e){return null;}
  }
  window.NorteKennisPlanAdapter.simRetour = function () { var k=klantreisRetour(); if(k){try{if(new URL(k).pathname!=='/klantreis/Plan.dc.html')return k;}catch{}}
    try { var r = JSON.parse(window.sessionStorage.getItem('norte.sim.kennisretour:v1') || 'null'); if (!r || !Number.isFinite(r.op) || Date.now() - r.op >= 6 * 3600 * 1000 || typeof r.goal !== 'string' || typeof r.step !== 'string') return null; return window.location.origin + '/simulatie/?terug=kennis'; } catch (e) { return null; }
  };
  window.NorteKennisPlanAdapter.planRetour = function () { var k=klantreisRetour(); if(k)return k;
    try {
      var r = JSON.parse(window.sessionStorage.getItem('norte.klant.kennisretour:v1') || 'null');
      if (!r || typeof r.skey !== 'string' || !/^norte-r30:klant-[a-z0-9_-]{1,100}$/i.test(r.skey)) return null;
      if (!r.klant || typeof r.klant !== 'object' || !Number.isFinite(r.op)) return null;
      var age = Date.now() - r.op;
      if (age < 0 || age >= 6 * 3600 * 1000 || typeof r.planHref !== 'string' || r.planHref.length > 250) return null;
      var url = new URL(r.planHref, window.location.href);
      if (!/^https?:$/.test(url.protocol) || url.origin !== window.location.origin || url.username || url.password || url.pathname !== '/ontwerp/klantflow/' || url.hash) return null;
      var keys = Array.from(url.searchParams.keys());
      if (keys.length && (keys.length !== 1 || keys[0] !== 'v' || !/^[a-f0-9]{6,64}$/i.test(url.searchParams.get('v') || ''))) return null;
      return url.href;
    } catch (e) { return null; }
  };
  var eigenNu = {}, bezoek = String(Date.now()) + Math.random();
  document.addEventListener('input', function(e) {
    var el=e.target.closest && e.target.closest('[data-sim="tijd"]'); if(!el)return;
    var veld=e.target.closest('[data-k]');if(!veld)return;
    var scope=el.dataset.context?'tijd-'+el.dataset.context:'tijd';var mode=el.querySelector('input[name="'+scope+'-modus"]:checked')?.value||'inleg';
    var input=veld.querySelector('input[inputmode="decimal"]');if(!input)return;
    (eigenNu[scope]||(eigenNu[scope]={}))[mode+'.'+veld.dataset.k]=e.target.type==='range'?e.target.value:input.value;
  }, true);
  function invoer() {
    var open=document.querySelector('dialog[open]'); var el=Array.from((open||document).querySelectorAll('[data-sim="tijd"]')).find(function(x){return x.getClientRects().length;}); if (!el) return null;
    var ctx = el.getAttribute('data-context') || '', scope = ctx ? 'tijd-' + ctx : 'tijd', S = {};
    try { S = JSON.parse(window.sessionStorage.getItem(SKEY) || '{}') || {}; } catch (e) { S = {}; }
    var st = Object.assign({}, eigenNu[scope] || {}), modus = el.querySelector('input[name="'+scope+'-modus"]:checked')?.value === 'doel' ? 'doel' : 'inleg', mila = ctx === 'mila', gekozen = {}, voorbeeld = {};
    (modus === 'doel' ? ['doel', 'jaren'] : ['maand', 'jaren']).forEach(function (k) {
      var key = modus + '.' + k, raw = st[key], eigen = raw != null && !(mila && MILA[key] === raw);
      var v = geld(raw != null ? raw : STD[key]); if (v === null) return;
      (eigen ? gekozen : voorbeeld)[k] = { waarde: k === 'jaren' ? Math.round(v) : v, herkomst: eigen ? 'klant' : 'voorbeeld' };
    });
    if (!gekozen.maand && !gekozen.doel) return null; // alleen een termijn of alleen voorbeelden: niets om als doel voor te stellen
    var h = document.querySelector('#laag-kop') || document.querySelector('#main h1') || document.querySelector('main h1') || document.querySelector('h1');
    return { bron: 'kennis', sim: 'tijd', context: ctx || null, id: ('kennis-' + scope + '-' + NP.fnv32(JSON.stringify(gekozen))).toLowerCase().replace(/[^a-z0-9-]/g, ''), artikel: h ? h.textContent.replace(/\s+/g, ' ').trim() : '', gekozen: gekozen, voorbeeld: voorbeeld };
  }
  // De kennisreis kan na een oefening eerst één verhaal openen. Alleen de eigen
  // planrelevante invoer volgt de werkelijk gekozen vervolgroute.
  var PENDING = 'norte-kennis-vervolg:v1';
  var here = function () { return location.pathname + location.search + location.hash; };
  function candidate() {
    try { var x = JSON.parse(sessionStorage.getItem(PENDING) || 'null'); return x && x.bezoek === bezoek && x.volgende === here() && Date.now() - x.op < 6 * 3600 * 1000 ? x.invoer : null; } catch (e) { return null; }
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a.vervolg:not([data-plan])') : null;
    if (!a) return;
    var inv = invoer() || candidate(), url;
    try { url = new URL(a.href, location.href); } catch (e2) { return; }
    if (url.origin !== location.origin || url.pathname.indexOf('/kennis/') !== 0) return;
    try {
      if (inv) sessionStorage.setItem(PENDING, JSON.stringify({ bezoek: bezoek, invoer: inv, volgende: url.pathname + url.search + url.hash, op: Date.now() }));
      else sessionStorage.removeItem(PENDING);
    } catch (e3) { /* geen overdracht als sessieopslag ontbreekt */ }
  }, true);

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-plan]') : null; if (!a) return;
    var h = document.querySelector('#laag-kop') || document.querySelector('#main h1') || document.querySelector('main h1') || document.querySelector('h1');
    if (!a.id) a.id = 'plan-vervolg';
    NP.writeReturn(window.sessionStorage, { van: 'kennis', titel: ((h && h.textContent) || document.title || '').replace(/\s+/g, ' ').trim(), href: location.pathname + location.search + location.hash, y: window.scrollY || 0, focus: a.id, invoer: invoer() || candidate() });
  }, true);
  // Terug uit het plan: dezelfde plek en focus op de vervolgroute, nadat de kennisapp haar pagina tekende.
  var r = NP.consumeReturn(window.sessionStorage);
  if (r && r.van === 'kennis' && r.href === location.pathname + location.search + location.hash) {
    var herstel = function (n) { var t = document.querySelector('a[data-plan]'); if (!t && n < 20) return setTimeout(function () { herstel(n + 1); }, 50); if (t && r.focus && !t.id) t.id = r.focus; window.scrollTo(0, r.y || 0); if (t) try { t.focus({ preventScroll: true }); } catch (e2) { /* niets */ } };
    window.addEventListener('load', function () { setTimeout(function () { herstel(0); }, 0); });
  }
})();
