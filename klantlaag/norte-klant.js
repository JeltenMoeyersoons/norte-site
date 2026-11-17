/* Norte klantlaag (10-11-2026) — gedeeld door startpagina, klantenstart, kennis en de flow.
 * Cookies (na de film, drie soorten, niets vooraf aangevinkt), kop (Afspraak maken, Mijn plan),
 * contact met een adviseur (vooraf ingevuld, Wijzig toont vorm en kantoor), bewaren (e-mail of persoonlijke code),
 * Mijn plan openen met code. Testversie: er wordt niets verstuurd; alleen deze browser bewaart. */
(function () {
  'use strict';
  if (window.NorteKlant) return;
  var IN_FRAME = (function () { try { return window.top !== window; } catch (e) { return true; } })();
  var K = 'norte-klant:';
  var lees = function (n) { try { return JSON.parse(localStorage.getItem(K + n) || 'null'); } catch (e) { return null; } };
  var zet = function (n, v) { try { localStorage.setItem(K + n, JSON.stringify(v)); } catch (e) { /* niets */ } };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[m]; }); };
  var rm = function () { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  var JAAR = new Date().getFullYear();

  // leeftijd onthouden zodra de klant ze ingeeft (voor het geboortejaar van de code)
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t || t.tagName !== 'INPUT') return;
    var lab = t.id && document.querySelector('label[for="' + t.id + '"]'), txt = (lab && lab.textContent) || t.getAttribute('aria-label') || '';
    if (/Hoe oud bent u/i.test(txt)) { var v = parseInt(t.value, 10); if (v > 15 && v < 100) { try { sessionStorage.setItem(K + 'leeftijd', String(v)); } catch (e2) { /* niets */ } } }
  }, true);
  var leeftijd = function () { try { return parseInt(sessionStorage.getItem(K + 'leeftijd') || '', 10) || null; } catch (e) { return null; } };

  /* ---------- symbolen voor de persoonlijke code ---------- */
  var SYM = [['vuurtoren', 'Vuurtoren', 'M10 21l1-12h2l1 12M9 9h6M10 6h4l-1-3h-2zM6 5L4 4M18 5l2-1M6 8H3M18 8h3'], ['eik', 'Eik', 'M12 21v-6M12 15c-4 0-6-2-6-5a6 6 0 0 1 12 0c0 3-2 5-6 5z'], ['zeilboot', 'Zeilboot', 'M4 18h16l-2 3H6zM12 3v13M12 4l6 11h-6M12 7l-5 8h5'], ['ster', 'Ster', 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.3l6-.7z'], ['berg', 'Berg', 'M3 20l6-10 4 6 3-4 5 8z'], ['golf', 'Golf', 'M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0'], ['zon', 'Zon', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2'], ['maan', 'Maan', 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z'], ['sleutel', 'Sleutel', 'M8 15a4 4 0 1 1 3-6.6L21 8v3h-2v2h-2v2h-3.4A4 4 0 0 1 8 15z'], ['kompas', 'Kompas', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z'], ['huis', 'Huis', 'M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6'], ['brug', 'Brug', 'M2 17h20M4 17v-4M20 17v-4M2 13c4-5 16-5 20 0M8 17v-6M16 17v-6M12 17v-7']];
  var symSvg = function (id) { var s = SYM.filter(function (x) { return x[0] === id; })[0]; return s ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + s[2] + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>' : ''; };
  var symNaam = function (id) { var s = SYM.filter(function (x) { return x[0] === id; })[0]; return s ? s[1] : ''; };

  /* ---------- zijpaneel ---------- */
  var P = null, opener = null, sluitCb = null, generatie = 0, inertGemaakt = [];
  function paneel() {
    if (P) return P;
    var d = document.createElement('div'); d.className = 'nkl nkl-dek'; d.addEventListener('click', sluit);
    var p = document.createElement('aside'); p.className = 'nkl nkl-pan'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-modal', 'true'); p.setAttribute('aria-labelledby', 'nkl-t'); p.hidden = true;
    p.innerHTML = '<div class="nkl-ph"><h2 id="nkl-t" tabindex="-1"></h2><button type="button" class="nkl-x" aria-label="Sluiten">×</button></div><div class="nkl-pb"></div><div class="nkl-pf"></div>';
    p.querySelector('.nkl-x').addEventListener('click', sluit);
    p.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); sluit(); return; }
      if (e.key !== 'Tab') return;
      var items = Array.from(p.querySelectorAll('button, input, textarea, select, a[href]')).filter(function (n) { return !n.disabled && n.tabIndex >= 0 && n.getClientRects().length; });
      if (!items.length) return;
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey ? i <= 0 : i === items.length - 1) {
        e.preventDefault(); (e.shiftKey ? items[items.length - 1] : items[0]).focus();
      }
    });
    document.body.appendChild(d); document.body.appendChild(p);
    P = { d: d, p: p, t: p.querySelector('#nkl-t'), b: p.querySelector('.nkl-pb'), f: p.querySelector('.nkl-pf') };
    return P;
  }
  function open(titel, cb) {
    var x = paneel(), g = ++generatie;
    if (!x.p.classList.contains('open') && !x.p.contains(document.activeElement)) opener = document.activeElement;
    sluitCb = cb || null;
    x.t.textContent = titel; x.p.hidden = false;
    Array.from(document.body.children).forEach(function (n) {
      if (n !== x.p && n !== x.d && !n.inert && n.getClientRects().length) { n.inert = true; inertGemaakt.push(n); }
    });
    x.d.classList.add('open'); x.p.classList.add('open');
    requestAnimationFrame(function () { if (g === generatie && !x.p.contains(document.activeElement)) x.t.focus({preventScroll:true}); });
    return x;
  }
  function sluit() {
    if (!P || !P.p.classList.contains('open')) return;
    var g = ++generatie;
    P.d.classList.remove('open'); P.p.classList.remove('open');
    setTimeout(function () { if (g === generatie) P.p.hidden = true; }, rm() ? 0 : 260);
    inertGemaakt.forEach(function (n) { n.inert = false; }); inertGemaakt = [];
    var cb = sluitCb; sluitCb = null;
    if (opener && opener.isConnected) opener.focus({preventScroll:true});
    if (cb) cb();
  }

  /* ---------- contact met een adviseur (ronde 47: sluitend, kaal) ---------- */
  var KANT = [{ n: 'Familie Kapitaal', p: 'Wichelen', pc: 9260 }, { n: 'Testkantoor Oost', p: 'Aalst', pc: 9300 }, { n: 'Testkantoor Noord', p: 'Gent', pc: 9000 }, { n: 'Testkantoor Zuid', p: 'Leuven', pc: 3000 }];
  var CTX = {
    algemeen: { t: 'Afspraak maken', rec: 'kantoor' },
    kop: { t: 'Afspraak maken', rec: 'kantoor', plan: true },
    simkop: { t: 'Afspraak maken', rec: 'tel' },
    sim: { t: 'Vraag raad', rec: 'tel', plan: true },
    profiel: { t: 'Uw profiel, even afgetoetst', rec: 'tel', plan: true },
    fis: { t: 'Uw fiscaal plafond', rec: 'tel', plan: true },
    plan: { t: 'Uw plan bespreken', rec: 'kantoor', plan: true },
    oplossing: { t: 'Uw plan bespreken', rec: 'kantoor', plan: true },
    kennis: { t: 'Voor uw situatie', rec: 'tel' }
  };
  var VORM = { kantoor: 'Op kantoor', tel: 'Telefoon', video: 'Video' };
  var C = {};
  function via() { try { var v = sessionStorage.getItem(K + 'via'); return v !== null && /^\d$/.test(v) && KANT[+v] ? +v : null; } catch (e) { return null; } }
  function afstand(pc, k) { var d = Math.abs(pc - k.pc); return pc === k.pc ? 2 : Math.max(3, Math.round(d / 7 + (Math.floor(pc / 1000) !== Math.floor(k.pc / 1000) ? 40 : 0))); }
  function kantoren() { var pc = parseInt(C.pc, 10); if (!(pc >= 1000 && pc <= 9999)) return []; return KANT.map(function (k, i) { return { i: i, km: afstand(pc, k) }; }).sort(function (a, b) { return a.km - b.km; }).slice(0, 2); }
  function slotsVoor() { return C.k === 'tel' ? ['Voormiddag', 'Namiddag', 'Avond'] : ['9:00', '11:00', '14:00', '16:30']; }
  var DAGN = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
  /* fictieve agenda van het kantoor: vrije momenten per dag, tot zes weken vooruit (wordt later de echte agenda) */
  var MAANDN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  function hsh(t) { var x = 0; for (var i = 0; i < t.length; i++) x = (x * 31 + t.charCodeAt(i)) >>> 0; return x; }
  function maandag(off) { var d = new Date(); d.setHours(12, 0, 0, 0); var w = d.getDay() || 7; d.setDate(d.getDate() - w + 1 + off * 7); return d; }
  function dagLabel(d) { return DAGN[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth() + 1); }
  function voorbij(d) { var m = new Date(); m.setHours(0, 0, 0, 0); m.setDate(m.getDate() + 1); return d < m; }
  function minWk() { var v = maandag(0); v.setDate(v.getDate() + 4); return voorbij(v) ? 1 : 0; }
  function vrij(d) { var morgen = new Date(); morgen.setHours(0, 0, 0, 0); morgen.setDate(morgen.getDate() + 1); if (d < morgen) return []; var k = String(C.kant === null || C.kant === undefined ? 0 : C.kant), h = hsh(k + d.toDateString()); if (h % 5 === 0) return []; var alle = slotsVoor(); return alle.filter(function (s, i) { return ((h >> (i + 2)) & 3) !== 0; }); }
  var ANDER = 'Het kantoor stelt een moment voor';
  function zetSlot() { C.slot = C.dag === 'ander' ? ANDER : (C.dag && C.uur ? C.dag + ' · ' + C.uur : null); }
  function fout(n) { return C.fout && C.fout[n] ? '<span class="nkl-ferr" id="nkl-e-' + n + '">' + C.fout[n] + '</span>' : ''; }
  function veld(id, n, lab, type, waarde, ph, extra) { var f = C.fout && C.fout[n]; return '<div class="nkl-f2"><label for="' + id + '">' + lab + '</label><input id="' + id + '" data-v="' + n + '" class="nkl-in' + (f ? ' fout' : '') + '" type="' + type + '" value="' + esc(waarde || '') + '" placeholder="' + ph + '"' + (extra || '') + (f ? ' aria-invalid="true" aria-describedby="nkl-e-' + n + '"' : '') + '>' + fout(n) + '</div>'; }
  function delen() { try { return (window.NorteKlantPlan && window.NorteKlantPlan()) || ''; } catch (e) { return ''; } }
  function contactTeken(focusSel) {
    var x = P, k = C.kant === null ? null : KANT[C.kant];
    if (C.klaar) {
      statusTeken(aanvraag(), true);
    } else {
      var h = (['plan', 'oplossing'].indexOf(C.ctx) < 0 ? '<p class="nkl-trust">Een onafhankelijk makelaar: geen eigen producten, wel de keuze uit meerdere verzekeraars en beheerders. Het eerste gesprek is kosteloos.</p>' : '') + overHtml() + '<p class="nkl-vr">Hoe?</p><div class="nkl-seg3" role="radiogroup" aria-label="Contactvorm">' + ['kantoor', 'tel', 'video'].map(function (v) { return '<button type="button" role="radio" data-k="' + v + '" aria-checked="' + (C.k === v) + '">' + VORM[v] + '</button>'; }).join('') + '</div>';
      if (C.kant !== null && !C.kies && C.viaKant) h += '<div class="nkl-gek"><span>' + esc(k.n) + ' · ' + esc(k.p) + '</span><button type="button" class="nkl-l" data-a="wijzig">Wijzig</button></div>';
      else {
        h += veld('nkl-pc', 'pc', 'Uw postcode', 'text', C.pc, '9260', ' inputmode="numeric" maxlength="4" autocomplete="postal-code"');
        var ks = kantoren(); if (ks.length) h += '<div class="nkl-lijst" role="radiogroup" aria-label="Kantoren">' + ks.map(function (q) { var kk = KANT[q.i]; return '<button type="button" class="nkl-kant" role="radio" data-kant="' + q.i + '" aria-checked="' + (C.kant === q.i) + '"><span><b>' + esc(kk.n) + '</b><small>' + esc(kk.p) + '</small></span><span class="km">' + q.km + ' km</span></button>'; }).join('') + '</div>';
        h += fout('kant');
      }
      if ((C.wk || 0) < minWk()) C.wk = minWk(); var wk = C.wk, ma = maandag(wk), vr = new Date(ma); vr.setDate(ma.getDate() + 4);
      var kop = ma.getMonth() === vr.getMonth() ? ma.getDate() + ' – ' + vr.getDate() + ' ' + MAANDN[vr.getMonth()] : ma.getDate() + ' ' + MAANDN[ma.getMonth()].slice(0, 3) + ' – ' + vr.getDate() + ' ' + MAANDN[vr.getMonth()].slice(0, 3);
      h += '<p class="nkl-vr">Wanneer?</p><div class="nkl-kal"><div class="nkl-kalk"><button type="button" class="nkl-wk" data-wk="-1" aria-label="Vorige week"' + (wk <= minWk() ? ' disabled' : '') + '>‹</button><span aria-live="polite">' + kop + '</span><button type="button" class="nkl-wk" data-wk="1" aria-label="Volgende week"' + (wk >= 5 ? ' disabled' : '') + '>›</button></div><div class="nkl-dagen" role="group" aria-label="Dag">';
      for (var di = 0; di < 5; di++) { var dd = new Date(ma); dd.setDate(ma.getDate() + di); var lab = dagLabel(dd), vv = vrij(dd), dl = lab.split(' '); h += '<button type="button" class="nkl-dag' + (voorbij(dd) ? ' nkl-voor' : '') + '" data-dag="' + lab + '" data-di="' + di + '" aria-pressed="' + (C.dag === lab) + '"' + (vv.length ? '' : ' disabled aria-label="' + lab + (voorbij(dd) ? ', voorbij' : ', geen vrij moment') + '"') + '><span>' + dl[0] + '</span><b>' + dl[1] + '</b><small>' + (vv.length ? vv.length + ' vrij' : voorbij(dd) ? '&nbsp;' : 'volzet') + '</small></button>'; }
      h += '</div></div>';
      if (C.dag && C.dag !== 'ander') h += '<div class="nkl-slots" role="group" aria-label="Moment">' + (C.vrij || []).map(function (s) { return '<button type="button" class="nkl-slot" data-uur="' + s + '" aria-pressed="' + (C.uur === s) + '">' + s + '</button>'; }).join('') + '</div>';
      h += '<label class="nkl-ander"><input type="checkbox" data-dag="ander"' + (C.dag === 'ander' ? ' checked' : '') + '> Geen passend moment? Laat het kantoor een voorstel doen.</label>' + fout('slot');
      h += veld('nkl-naam', 'naam', 'Uw naam', 'text', C.naam, 'Voornaam en naam', ' autocomplete="name"');
      h += C.k === 'tel' ? veld('nkl-tel', 'tel', 'Uw telefoonnummer', 'tel', C.tel, '0470 12 34 56', ' inputmode="tel" autocomplete="tel"') : veld('nkl-mail', 'mail', 'Uw e-mailadres', 'email', C.mail, 'naam@voorbeeld.be', ' autocomplete="email"');
      if (CTX[C.ctx] && CTX[C.ctx].plan && C.planBeschikbaar) h += '<div class="nkl-mee"><button type="button" class="nkl-sw" role="switch" data-mee="1" aria-checked="' + !!C.mee + '" aria-labelledby="nkl-mee-l"></button><span id="nkl-mee-l">Mijn plan meesturen<small>' + (C.mee ? 'Aan' : 'Uit tenzij u het aanzet') + '</small></span></div>'
        + '<button type="button" class="nkl-l nkl-wat" data-a="wat" aria-expanded="' + !!C.wat + '">Wat ziet het kantoor?</button>' + (C.wat ? '<div class="nkl-open">Altijd: uw naam, ' + (C.k === 'tel' ? 'telefoonnummer' : 'e-mailadres') + ' en het gekozen moment.<br>Met uw plan: ook uw doelen, inleg en profiel.<br>Nooit: uw pincode.</div>' : '');
      x.b.innerHTML = h;
      x.f.innerHTML = '<button type="button" class="nkl-go" data-a="go">' + (C.wijzig ? 'Vraag een ander moment' : 'Bewaar proefaanvraag') + '</button><p class="nkl-note">Vrijblijvend · Testversie: er wordt niets verstuurd.</p>';
    }
    if (focusSel) { var f = x.p.querySelector(focusSel); if (f) { f.focus(); if (f.setSelectionRange && f.type === 'text') { var l = f.value.length; try { f.setSelectionRange(l, l); } catch (e) { /* niets */ } } } }
  }
  function controle() {
    var f = {};
    if (C.kant === null) f.kant = 'Kies een kantoor.' + (kantoren().length ? '' : ' Vul eerst uw postcode in.');
    if (!C.slot) f.slot = C.dag ? 'Kies een moment op die dag.' : 'Kies een dag.';
    if (!String(C.naam || '').trim()) f.naam = 'Vul uw naam in.';
    if (C.k === 'tel') { if (String(C.tel || '').replace(/\D/g, '').length < 9) f.tel = 'Vul uw telefoonnummer in.'; }
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(C.mail || '').trim())) f.mail = 'Vul uw e-mailadres in.';
    return f;
  }
  function contactKlik(e) {
    if (!P || P.p.dataset.modus !== 'contact') return;
    var t = e.target, el;
    if (!P.p.contains(t)) return;
    if ((el = t.closest('[data-k]'))) { C.k = el.getAttribute('data-k'); C.uur = null; if (C.dag !== 'ander') C.dag = null; zetSlot(); C.fout = {}; contactTeken('[data-k="' + C.k + '"]'); return; }
    if ((el = t.closest('[data-kant]'))) { C.kant = +el.getAttribute('data-kant'); if (C.dag !== 'ander') { C.dag = null; C.uur = null; zetSlot(); } if (C.fout) delete C.fout.kant; contactTeken('.nkl-kant[data-kant="' + C.kant + '"]'); return; }
    if ((el = t.closest('[data-wk]'))) { C.wk = Math.max(minWk(), Math.min(5, (C.wk || 0) + Number(el.getAttribute('data-wk')))); contactTeken('[data-wk="' + el.getAttribute('data-wk') + '"]'); return; }
    if ((el = t.closest('[data-di]'))) { var d0 = maandag(C.wk || 0); d0.setDate(d0.getDate() + Number(el.getAttribute('data-di'))); C.vrij = vrij(d0); }
    if ((el = t.closest('[data-dag]'))) { var dg = el.getAttribute('data-dag'); C.dag = (dg === 'ander' && C.dag === 'ander') ? null : dg; C.uur = null; zetSlot(); if (C.fout && C.slot) delete C.fout.slot; contactTeken(C.dag && C.dag !== 'ander' ? '.nkl-slot' : '[data-dag="' + dg + '"]'); return; }
    if ((el = t.closest('[data-uur]'))) { C.uur = el.getAttribute('data-uur'); zetSlot(); if (C.fout) delete C.fout.slot; contactTeken('[data-uur="' + C.uur + '"]'); return; }
    if ((el = t.closest('[data-mee]'))) { C.mee = C.planBeschikbaar && !C.mee; contactTeken('[data-mee]'); return; }
    if ((el = t.closest('[data-a]'))) {
      var a = el.getAttribute('data-a');
      if (a === 'over') { C.vraag = (C.vraag ? C.vraag + ' ' : '') + C.over; C.over = ''; contactTeken('#nkl-vraag'); return; }
      if (a === 'wijzig') { C.kies = true; contactTeken('#nkl-pc'); }
      else if (a === 'wat') { C.wat = !C.wat; contactTeken('[data-a=wat]'); }
      else if (a === 'go') { if (C.klaar) return; C.fout = controle(); var ks = Object.keys(C.fout); if (ks.length) { var eerste = { kant: '#nkl-pc', slot: C.dag ? '.nkl-slot' : '.nkl-dag', naam: '#nkl-naam', mail: '#nkl-mail', tel: '#nkl-tel' }[ks[0]]; contactTeken(eerste); return; } if (!aanvraagZet()) { P.f.insertAdjacentHTML('beforeend', '<p role="alert">Uw proefaanvraag kon niet worden bewaard. Probeer opnieuw.</p>'); return; }
        C.klaar = true; contactTeken('[data-s=sluit]'); }
      else if (a === 'sluit') sluit();
    }
  }
  document.addEventListener('input', function (e) {
    if (!P || P.p.dataset.modus !== 'contact' || !P.p.contains(e.target)) return;
    var n = e.target.getAttribute('data-v'); if (!n) return;
    C[n] = e.target.value;
    if (C.fout && C.fout[n]) { delete C.fout[n]; e.target.classList.remove('fout'); var er = document.getElementById('nkl-e-' + n); if (er) er.remove(); }
    if (n === 'pc') { var ks = kantoren(), oud = C.kant; C.kant = ks.length ? ks[0].i : null; if (oud !== C.kant && C.dag !== 'ander') { C.dag = null; C.uur = null; zetSlot(); } if (ks.length && C.fout) delete C.fout.kant; contactTeken('#nkl-pc'); }
  });
  function deelMetKantoor(simulatie, stukken) {
    var x = open('Deel met uw adviseur');
    x.p.dataset.modus = 'contact-informatie';
    x.f.textContent = '';
    var k = simulatie.k || {};
    var aanvraag = crypto.randomUUID();
    var form = document.createElement('form');
    form.id = 'nkl-kantoor-aanvraag';
    form.innerHTML = '<div class="nkl-f2"><label for="nkl-ontvanger">Kantoor</label>'
      + '<select class="nkl-in" id="nkl-ontvanger" name="kantoor" required>'
      + '<option value="">Kies uw kantoor</option><option value="familie-kapitaal">Familie Kapitaal · Wichelen</option></select></div>'
      + veld('nkl-deel-voornaam', 'voornaam', 'Voornaam', 'text', k.voornaam, '', ' name="voornaam" maxlength="100" autocomplete="given-name" required')
      + veld('nkl-deel-achternaam', 'achternaam', 'Achternaam', 'text', k.achternaam, '', ' name="achternaam" maxlength="100" autocomplete="family-name" required')
      + veld('nkl-deel-mail', 'email', 'E-mailadres', 'email', k.email, '', ' name="email" maxlength="254" autocomplete="email" required')
      + veld('nkl-deel-tel', 'tel', 'Telefoon (optioneel)', 'tel', k.tel, '', ' name="tel" maxlength="40" autocomplete="tel"')
      + (Array.isArray(stukken) && stukken.length ? '<details><summary>Documenten om bij de hand te houden</summary><ul>'
        + stukken.map(function (stuk) { return '<li>' + esc(stuk) + '</li>'; }).join('') + '</ul></details>' : '')
      + '<label class="nkl-ander"><input name="deel" type="checkbox" required> Ik deel mijn ingevulde gegevens en simulatie met Familie Kapitaal.</label>'
      + '<p class="nkl-note"><a class="nkl-l" href="/privacy.html#delen-met-kantoor" target="_blank" rel="noopener">Privacy bij het delen</a></p>'
      + '<p class="nkl-note" role="alert" data-melding></p>';
    x.b.replaceChildren(form);
    var knop = document.createElement('button');
    knop.type = 'submit';
    knop.className = 'nkl-go';
    knop.setAttribute('form', form.id);
    knop.textContent = 'Verstuur naar mijn kantoor';
    x.f.append(knop);
    var bezig = false;
    form.addEventListener('submit', async function (evt) {
      evt.preventDefault();
      if (bezig || !form.reportValidity()) return;
      var values = Object.fromEntries(new FormData(form));
      var melding = form.querySelector('[data-melding]');
      melding.textContent = '';
      bezig = true;
      knop.disabled = true;
      knop.textContent = 'Versturen…';
      try {
        var response = await fetch('https://nortetestkantorendaxdudhj-aanmelden.functions.fnc.nl-ams.scw.cloud/overdracht/v1', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ aanvraag: aanvraag, kantoor: values.kantoor, toestemming: 'familiekapitaal-2026-11-v1',
            contact: { voornaam: values.voornaam, achternaam: values.achternaam, email: values.email, tel: values.tel },
            simulatie: simulatie })
        });
        var result = await response.json();
        if (response.status === 409) aanvraag = crypto.randomUUID();
        if (!response.ok || !result.ontvangen) throw new Error(result.melding || 'Verzenden lukt nu niet. Probeer opnieuw.');
        if (!form.isConnected || !x.p.classList.contains('open')) return;
        x.t.textContent = 'Ontvangen door Familie Kapitaal';
        x.b.innerHTML = '<p role="status">Uw adviseur kan uw simulatie openen en contact met u opnemen.</p>';
        x.f.innerHTML = '<button type="button" class="nkl-go">Sluiten</button>';
        x.f.firstElementChild.addEventListener('click', sluit);
        x.t.focus();
      } catch (error) {
        if (!form.isConnected) return;
        melding.textContent = error instanceof TypeError ? 'Verzenden lukt nu niet. Probeer opnieuw.' : error.message;
        bezig = false;
        knop.disabled = false;
        knop.textContent = 'Opnieuw versturen';
      }
    });
  }
  function contact(context, stukken) {
    var snapshot = window.NorteKlantDossier && window.NorteKlantDossier();
    if (snapshot && (snapshot.pl.goals.length || context === 'fis')) {
      deelMetKantoor(snapshot, stukken);
      return;
    }

    if (context === 'fis') {
      var fiscaal = open('Laat uw fiscale ruimte nakijken');
      var onderwerp = encodeURIComponent('Aanvraag fiscale controle via Norte');
      var bericht = encodeURIComponent('Dag, ik wil mijn fiscale mogelijkheden laten nakijken. Hoe kan ik mijn documenten veilig aan uw kantoor bezorgen?');
      fiscaal.p.dataset.modus = 'contact-informatie';
      fiscaal.b.innerHTML = '<p class="nkl-waarom">Vraag Familie Kapitaal om uw fiscale ruimte te berekenen en af te spreken hoe u uw documenten bezorgt.</p>'
        + (Array.isArray(stukken) && stukken.length ? '<h3>Houd dit bij de hand</h3><ul>' + stukken.map(function (stuk) { return '<li>' + esc(stuk) + '</li>'; }).join('') + '</ul>' : '');
      fiscaal.f.innerHTML = '<a class="nkl-go" style="display:grid;place-items:center;text-decoration:none" href="mailto:jelten@norte.be?subject=' + onderwerp + '&amp;body=' + bericht + '">Open e-mailconcept</a>'
        + '<p class="nkl-note">Verstuur het bericht vanuit uw mailprogramma. Houd uw fiscale documenten bij tot u weet hoe u ze veilig kunt bezorgen.</p>';
      return;
    }
    var x = open('Contact');
    x.p.dataset.modus = 'contact-informatie';
    x.b.innerHTML = '<p class="nkl-waarom">Online een afspraak maken kan binnenkort. Heeft u een vraag over Norte? Mail ons op <a href="mailto:jelten@norte.be">jelten@norte.be</a>.</p>';
    x.f.innerHTML = '<button type="button" class="nkl-l2">Sluiten</button>';
    x.f.querySelector('button').addEventListener('click', sluit);
  }

  /* ---------- bewaren en terugvinden: e-mail + pincode (ronde 33) ---------- */
  var B = {};
  function bewaard() { return lees('bewaard'); }
  var MAILRE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  function pinVeld(id, lab) { return '<div class="nkl-f"><label for="' + id + '">' + lab + '</label><input id="' + id + '" class="nkl-in nkl-pin4" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="new-password" placeholder="4 cijfers"></div>'; }
  function bewaarTeken(focusSel) {
    var x = P;
    if (B.stap === 'ok') {
      x.b.innerHTML = '<div class="nkl-ok" role="status"><b>Bewaard op dit toestel</b>Met uw e-mailadres en pincode opent u ' + (B.plan ? 'uw plan' : 'uw simulatie') + ' opnieuw via Mijn plan. Dit werkt in deze browser.</div>';
      x.f.innerHTML = '<button type="button" class="nkl-go" data-b="klaar">Verder</button><p class="nkl-note">Uw gegevens blijven in deze browser.</p>';
    } else {
      x.b.innerHTML = '<p class="nkl-waarom">Zo opent u ' + (B.plan ? 'het' : 'ze') + ' later opnieuw via Mijn plan in deze browser.</p><div class="nkl-f"><label for="nkl-bm">Uw e-mailadres</label><input id="nkl-bm" class="nkl-in" type="email" autocomplete="email" placeholder="naam@voorbeeld.be" value="' + esc(B.mail || '') + '"></div>'
        + '<div style="margin-top:10px">' + pinVeld('nkl-pin', 'Kies een pincode') + '</div>'
        + '<p class="nkl-fout" id="nkl-fout" role="alert"></p>'
        + '<button type="button" class="nkl-l nkl-wat" data-b="wie" aria-expanded="' + !!B.wie + '">Wie ziet dit?</button>' + (B.wie ? '<div class="nkl-open">Alleen u. Een kantoor ziet uw plan pas als u het zelf meestuurt.</div>' : '');
      x.f.innerHTML = '<button type="button" class="nkl-go" data-b="bewaar">Bewaren</button><button type="button" class="nkl-l" data-b="niet" style="align-self:center">Nu niet</button>';
    }
    if (focusSel) { var f = x.p.querySelector(focusSel); if (f) f.focus(); }
  }
  function bewaarKlik(e) {
    if (!P || P.p.dataset.modus !== 'bewaar') return;
    var el = e.target.closest('[data-b]'); if (!el) return;
    var a = el.getAttribute('data-b'), fout = function (m) { var f = document.getElementById('nkl-fout'); if (f) f.textContent = m; };
    if (a === 'niet' || a === 'klaar') { sluit(); return; }
    if (a === 'wie') { B.wie = !B.wie; el.setAttribute('aria-expanded', String(B.wie)); var o = el.nextElementSibling; if (o && o.classList.contains('nkl-open')) o.remove(); if (B.wie) el.insertAdjacentHTML('afterend', '<div class="nkl-open">Alleen u. Een kantoor ziet uw plan pas als u het zelf meestuurt.</div>'); return; }
    if (a === 'bewaar') {
      var m = ((document.getElementById('nkl-bm') || {}).value || '').trim(), pin = ((document.getElementById('nkl-pin') || {}).value || '').trim();
      B.mail = m;
      if (!MAILRE.test(m)) { fout('Vul een geldig e-mailadres in.'); return; }
      if (!/^\d{4}$/.test(pin)) { fout('Kies een pincode van vier cijfers.'); return; }
      zet('bewaard', { mail: m.toLowerCase(), pin: pin, nieuws: !!(document.getElementById('nkl-nieuws') || {}).checked, nieuwsTekst: 'r73', t: Date.now() });
      B.stap = 'ok'; bewaarTeken('[data-b=klaar]'); kopBijwerken();
    }
  }
  function bewaar(opt) {
    opt = opt || {}; zet('bewaar-gevraagd', 1);
    B = { stap: 'in', plan: !!opt.plan };
    var x = open(opt.plan ? 'Bewaar uw plan' : 'Bewaar uw simulatie', opt.na); x.p.dataset.modus = 'bewaar'; bewaarTeken();
  }
  function moetVragen() { return !bewaard() && !lees('bewaar-gevraagd'); }

  var M = { pog: 0 };
  function maskeer(m) { var d = String(m || '').split('@'); return d.length === 2 ? d[0].charAt(0) + '•••@' + d[1] : ''; }
  function mijnTeken(focusSel) {
    var x = P, geblokt = M.tot && Date.now() < M.tot, bw = bewaard();
    x.b.innerHTML = (bw ? '<p class="nkl-waarom">Bewaard bij ' + esc(maskeer(bw.mail)) + '</p><input id="nkl-mm" type="hidden" value="' + esc(bw.mail) + '">' : '<div class="nkl-f"><label for="nkl-mm">Uw e-mailadres</label><input id="nkl-mm" class="nkl-in" type="email" autocomplete="email" placeholder="naam@voorbeeld.be" value="' + esc(M.mail || '') + '"></div>')
      + '<div style="margin-top:10px">' + pinVeld('nkl-mpin', 'Uw pincode') + '</div>'
      + '<p class="nkl-fout" id="nkl-mfout" role="alert">' + (geblokt ? 'Te veel pogingen. Probeer het over enkele minuten opnieuw.' : esc(M.fout || '')) + '</p>'
      + '<button type="button" class="nkl-l" data-m="vergeten" style="font-size:14px;color:var(--nk-steun)">Pincode vergeten?</button>';
    x.f.innerHTML = '<button type="button" class="nkl-go" data-m="open"' + (geblokt ? ' disabled' : '') + '>Openen</button>' + (bw ? '<p class="nkl-note">Niet uw plan? <a href="/ontwerp/klantreis-preview-09-11/?leeg=1">Begin een nieuw plan</a></p>' : '');
    if (focusSel) { var f = x.p.querySelector(focusSel); if (f) f.focus(); }
  }
  function mijnKlik(e) {
    if (!P || P.p.dataset.modus !== 'mijn') return;
    var el = e.target.closest('[data-m]'); if (!el) return;
    var a = el.getAttribute('data-m'), f = document.getElementById('nkl-mfout'), m = ((document.getElementById('nkl-mm') || {}).value || '').trim();
    M.mail = m;
    if (a === 'vergeten') { if (f) f.textContent = MAILRE.test(m) ? 'Een pincode voor een plan in deze browser kan niet per e-mail worden hersteld.' : 'Vul eerst uw e-mailadres in.'; return; }
    if (a === 'open') {
      if (M.tot && Date.now() < M.tot) return;
      var pin = ((document.getElementById('nkl-mpin') || {}).value || '').trim(), b = bewaard();
      if (b && b.mail === m.toLowerCase() && b.pin === pin) { location.assign('/ontwerp/klantreis-preview-09-11/?mijnplan=1'); return; }
      M.pog++; if (M.pog >= 3) { M.tot = Date.now() + 5 * 60 * 1000; M.pog = 0; M.fout = ''; } else M.fout = 'E-mailadres of pincode klopt niet.';
      mijnTeken('#nkl-mpin');
    }
  }
  function mijnPlan() { var x = open('Uw plan openen'); x.p.dataset.modus = 'mijn'; M.fout = ''; mijnTeken(bewaard() ? '#nkl-mpin' : '#nkl-mm'); }

  document.addEventListener('click', function (e) { contactKlik(e); bewaarKlik(e); mijnKlik(e); });
  document.addEventListener('keydown', function (e) { if (e.key !== 'Enter' || !P || P.p.hidden) return; var id = e.target && e.target.id; if (id === 'nkl-mpin' || id === 'nkl-mm') { e.preventDefault(); var b = P.p.querySelector('[data-m=open]'); if (b) b.click(); } });

  /* ---------- cookies ---------- */
  var KEUZE = lees('toestemming');
  function cookieBewaar(meten, marketing) { KEUZE = { meten: !!meten, marketing: !!marketing, t: Date.now() }; zet('toestemming', KEUZE); var b = document.querySelector('.nkl-cookie'); if (b) { b.classList.remove('in'); setTimeout(function () { b.remove(); }, rm() ? 0 : 220); } }
  function cookieBalk() {
    if (IN_FRAME || KEUZE || document.querySelector('.nkl-cookie')) return;
    var b = document.createElement('div'); b.className = 'nkl nkl-cookie'; b.setAttribute('role', 'region'); b.setAttribute('aria-label', 'Cookies');
    b.innerHTML = '<p><b>Cookies</b>Nodig om de site te laten werken. Met uw toestemming ook om te meten en voor advertenties.</p><div class="k"><button type="button" class="nkl-l" data-c="zelf">Zelf kiezen</button><button type="button" class="nkl-b" data-c="nee">Weigeren</button><button type="button" class="nkl-b" data-c="ja">Aanvaarden</button></div>';
    b.addEventListener('click', function (e) { var t = e.target.closest('[data-c]'); if (!t) return; var c = t.getAttribute('data-c'); if (c === 'nee') cookieBewaar(false, false); else if (c === 'ja') cookieBewaar(true, true); else cookieKeuze(); });
    document.body.appendChild(b); requestAnimationFrame(function () { requestAnimationFrame(function () { b.classList.add('in'); }); });
  }
  function cookieKeuze() {
    var k = KEUZE || { meten: false, marketing: false }, st = { meten: !!k.meten, marketing: !!k.marketing };
    var bk = document.querySelector('.nkl-cookie'); if (bk) bk.style.visibility = 'hidden';
    var x = open('Cookies', function () { var b2 = document.querySelector('.nkl-cookie'); if (b2) b2.style.visibility = ''; }); x.p.dataset.modus = 'cookies';
    var rij = function (id, t, s, on, vast) { return '<div class="nkl-rij"><span><b>' + t + '</b><small>' + s + '</small></span><span class="s"><button type="button" class="nkl-sw" role="switch" aria-label="' + t + '" aria-checked="' + on + '"' + (vast ? ' disabled' : ' data-sw="' + id + '"') + '></button></span></div>'; };
    var teken = function () {
      x.b.innerHTML = rij('nodig', 'Noodzakelijk', 'Om de site te laten werken en uw plan te bewaren als u dat vraagt. Altijd aan.', true, true) + rij('meten', 'Meten', 'Hoe bezoekers de site gebruiken, om ze te verbeteren.', st.meten) + rij('marketing', 'Marketing', 'Advertenties op LinkedIn, Facebook en Instagram.', st.marketing);
      x.f.innerHTML = '<button type="button" class="nkl-go" data-cs="1">Keuze bewaren</button>';
    };
    teken();
    x.p.onclick = function (e) {
      if (x.p.dataset.modus !== 'cookies') return;
      var s = e.target.closest('[data-sw]'); if (s) { var id = s.getAttribute('data-sw'); st[id] = !st[id]; s.setAttribute('aria-checked', String(st[id])); return; }
      if (e.target.closest('[data-cs]')) { cookieBewaar(st.meten, st.marketing); sluit(); }
    };
  }
  function voetLink() {
    if (IN_FRAME) return;
    var f = document.querySelector('.site-footer > div');
    if (!f) return;
    f.querySelectorAll('a').forEach(function (a) { if (/lege preview/i.test(a.textContent)) a.style.display = 'none'; });
    if (f.querySelector('.nkl-cv')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'nkl-cv';
    b.textContent = 'Cookie-instellingen';
    b.setAttribute('aria-haspopup', 'dialog');
    b.addEventListener('click', cookieKeuze);
    f.appendChild(b);
  }

  /* ---------- kop van de klantenzijde ---------- */
  function kopBijwerken() {
    var a = document.querySelector('.shell-actions'); if (!a || IN_FRAME) return;
    if (!a.querySelector('.nkl-afspr')) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'nkl-kop nkl-afspr';
      b.textContent = afsprLabel();
      b.setAttribute('aria-haspopup', 'dialog');
      b.addEventListener('click', function () { contact('algemeen'); });
      a.insertBefore(b, a.querySelector('.my-plan'));
    }
    kopAfspraak(); mijnPlanLinks();
  }
  function pensioenZin() {
    if (IN_FRAME || !/\/koers\//.test(location.pathname)) return;
    document.querySelectorAll('a[href*="doel=inkomen"]').forEach(function (l) { var sp = l.querySelector('span'); if (sp && !sp.querySelector('.nkl-bijv')) { var m = document.createElement('small'); m.className = 'nkl-bijv'; m.textContent = 'Bijvoorbeeld bij uw pensioen'; sp.appendChild(m); } });
  }
  /* campagne 'Hoeveel is genoeg?': in de eerste inkomensstap een herkenbare kop en de cursor in het gewenste bedrag */
  function campagne() {
    if (IN_FRAME) return;
    try { var c = new URLSearchParams(location.search).get('campagne'); if (c) sessionStorage.setItem(K + 'campagne', c); c = sessionStorage.getItem(K + 'campagne'); } catch (e) { return; }
    var w = document.getElementById('qa-wens'), h = document.getElementById('topic-h');
    document.querySelectorAll('.nkl-kicker').forEach(function (x) { if (!w || x.nextElementSibling !== h) x.remove(); });
    if (c !== 'genoeg' || !w || !h) return;
    if (!h.previousElementSibling || !h.previousElementSibling.classList.contains('nkl-kicker')) { var k = document.createElement('p'); k.className = 'nkl-kicker'; k.textContent = 'Hoeveel is genoeg? · Uw pensioen aanvullen'; h.parentNode.insertBefore(k, h); }
    if (!w._nklF) { w._nklF = true; setTimeout(function () { try { w.focus({ preventScroll: true }); } catch (e) { w.focus(); } }, 300); }
  }
  /* bedragen uit een artikel (bv. de pensioenkloof) vullen de eerste velden van de simulatie in; de klant past ze zelf aan */
  function invul() {
    if (IN_FRAME) return; var q = new URLSearchParams(location.search), w = {};
    try { w = JSON.parse(sessionStorage.getItem(K + 'invul') || '{}') || {}; if (q.get('wens') || q.get('leeftijd')) { if (q.get('wens')) w.wens = q.get('wens'); if (q.get('leeftijd')) w.leeftijd = q.get('leeftijd'); sessionStorage.setItem(K + 'invul', JSON.stringify(w)); } } catch (e) { return; }
    var zet1 = function (id, v, k) { var i = document.getElementById(id); if (!i || !v || i.value) return; var d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value'); d.set.call(i, String(v)); i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })); delete w[k]; try { sessionStorage.setItem(K + 'invul', JSON.stringify(w)); } catch (e) { /* niets */ } };
    zet1('qa-age', w.leeftijd, 'leeftijd'); zet1('qa-wens', w.wens, 'wens');
  }
  function mijnPlanLinks() {
    pensioenZin(); campagne(); invul();
    var heeft = !!bewaard();
    document.querySelectorAll('.my-plan').forEach(function (mp) {
      var zichtbaar = heeft || mp.dataset.alwaysVisible === 'true';
      if (mp.hidden === zichtbaar) mp.hidden = !zichtbaar; var d = zichtbaar ? '' : 'none'; if (mp.style.display !== d) mp.style.display = d; if (mp.classList.contains('nkl-aan') !== heeft) mp.classList.toggle('nkl-aan', heeft);
      if (!mp._nkl && mp.dataset.planRoute !== 'actueel') { mp._nkl = true; mp.addEventListener('click', function (e) { e.preventDefault(); mijnPlan(); }); }
    });
  }

  /* ---------- kennis: kleine uitnodiging bij artikels over een persoonlijke keuze ---------- */
  var KEUZEART = { profiel: 1, pensioensparen: 1, risico: 1 };
  function kennisLink() {
    if (IN_FRAME || !/\/kennis\//.test(location.pathname)) return;
    var m = /#\/(?:artikel|leren\/les)\/([a-z0-9-]+)/.exec(location.hash);
    document.querySelectorAll('.nkl-sub').forEach(function (x) { if (!m || x.dataset.id !== m[1]) x.remove(); });
    if (!m || !KEUZEART[m[1]]) return;
    var art = document.querySelector('article') || document.querySelector('main'); if (!art || art.querySelector('.nkl-sub')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'nkl-sub'; b.dataset.id = m[1]; b.innerHTML = '<i aria-hidden="true">FK</i><u>Bespreken met een makelaar</u>';
    b.addEventListener('click', function () { contact('kennis'); }); art.appendChild(b);
  }


  /* ---------- brug: een kort moment tussen twee stappen, in de stijl van de introzinnen (ronde 35) ---------- */
  function brug(zinnen, opt) {
    opt = opt || {};
    var vorigB = 0; try { vorigB = Number(sessionStorage.getItem(K + 'brug-t') || 0); } catch (e) { /* niets */ }
    if (IN_FRAME || !zinnen || !zinnen.length || (!opt.door && Date.now() - vorigB < 20000)) { if (opt.na) opt.na(); return; }
    try { sessionStorage.setItem(K + 'brug-t', String(Date.now())); } catch (e) { /* niets */ }
    var o = document.createElement('div'); o.className = 'nkl-brug'; o.setAttribute('role', 'status'); o.setAttribute('aria-live', 'polite');
    o.innerHTML = zinnen.map(function (z, i) { return '<p class="' + (i === zinnen.length - 1 ? 'slot' : '') + '">' + esc(z) + '</p>'; }).join('');
    document.body.appendChild(o);
    var ps = o.querySelectorAll('p'), klaar = false, timers = [];
    var einde = function () {
      if (klaar) return; klaar = true; timers.forEach(clearTimeout);
      if (opt.door) { try { sessionStorage.setItem(K + 'brug-door', zinnen[zinnen.length - 1]); } catch (e) { /* niets */ } if (opt.na) opt.na(); return; }
      o.classList.add('uit'); setTimeout(function () { o.remove(); }, rm() ? 0 : 420); if (opt.na) opt.na();
    };
    o.addEventListener('click', einde); document.addEventListener('keydown', function k(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', k); einde(); } });
    requestAnimationFrame(function () { o.classList.add('in'); });
    if (rm()) { ps[ps.length - 1].classList.add('aan'); timers.push(setTimeout(einde, 1600)); return; }
    var t = 350; ps.forEach(function (p, i) {
      timers.push(setTimeout(function () { ps.forEach(function (q) { q.classList.remove('aan'); }); p.classList.add('aan'); }, t));
      t += i === ps.length - 1 ? 1700 : 1500;
    });
    timers.push(setTimeout(einde, t));
  }
  // stille zin op de plek zelf: verschijnt, blijft even staan, vervaagt en sluit
  function zin(anker, tekst, opt) {
    opt = opt || {};
    if (IN_FRAME || !anker) return null;
    var w = document.createElement('div'); w.className = 'nkl-zin'; w.setAttribute('role', 'status');
    w.innerHTML = '<div><p>' + esc(tekst) + '</p></div>';
    anker.insertAdjacentElement(opt.plaats || 'afterend', w);
    if (opt.direct) { w.classList.add('direct', 'aan'); return w; }
    requestAnimationFrame(function () { requestAnimationFrame(function () { w.classList.add('aan'); }); });
    if (!opt.blijf) setTimeout(function () { w.classList.remove('aan'); setTimeout(function () { w.remove(); }, rm() ? 0 : 800); }, opt.duur || 6500);
    return w;
  }
  // na een paginawissel: de laatste zin blijft even staan en vervaagt dan
  function brugAankomst() {
    var z = null; try { z = sessionStorage.getItem(K + 'brug-door'); sessionStorage.removeItem(K + 'brug-door'); } catch (e) { /* niets */ }
    if (!z || IN_FRAME) return;
    var o = document.createElement('div'); o.className = 'nkl-brug in'; o.innerHTML = '<p class="slot aan">' + esc(z) + '</p>';
    (document.body || document.documentElement).appendChild(o);
    setTimeout(function () { o.classList.add('uit'); setTimeout(function () { o.remove(); }, rm() ? 0 : 520); }, rm() ? 300 : 900);
  }
  if (document.body) brugAankomst(); else document.addEventListener('DOMContentLoaded', brugAankomst);
  /* ---------- start ---------- */
  function welkomTerug() {
    try { localStorage.setItem(K + 'laatst', String(Date.now())); } catch (e) { /* niets */ }
    var main = document.getElementById('main');
    if (IN_FRAME || !main || !document.querySelector('.shell-actions') || !bewaard()) { document.querySelectorAll('.nkl-welkom').forEach(function (x) { x.remove(); }); return; }
    if (location.hash && location.hash !== '#start') { document.querySelectorAll('.nkl-welkom').forEach(function (x) { x.remove(); }); return; }
    var taak = main.querySelector('.client-start .task'), h1 = taak && taak.querySelector('h1');
    if (!h1 || taak.querySelector('.nkl-welkom')) return;
    var w = document.createElement('div'); w.className = 'nkl nkl-welkom';
    w.innerHTML = '<p><b>Welkom terug.</b> Uw plan staat klaar.</p><button type="button" class="nkl-wb"><span class="t">Verder met uw plan</span><span class="p" aria-hidden="true">→</span></button>';
    w.querySelector('button').addEventListener('click', mijnPlan);
    taak.insertBefore(w, h1);
  }
  /* Herkenbare kantoornaam bij een simulatie via Familie Kapitaal. */
  function afzender() {
    if (!location.pathname.endsWith('/Klantreis.dc.html')) return;
    if (new URLSearchParams(location.search).get('kantoor') !== 'familie-kapitaal') return;
    var kop = document.querySelector('header.top .who');
    if (!kop || kop.querySelector('.nkl-fk-naam')) return;
    var naam = document.createElement('span');
    naam.className = 'nkl-fk-naam';
    naam.textContent = 'Familie Kapitaal';
    kop.appendChild(naam);
  }
  function start() {
    if (IN_FRAME) return;
    welkomTerug(); afzender();
    kopBijwerken(); mijnPlanLinks(); voetLink(); kennisLink();
    var rl = document.querySelector('.route-layer');
    if (rl) { // startpagina: de cookievraag pas na de film
      var kijk = function () { if (!rl.hidden) { cookieBalk(); return true; } return false; };
      if (!kijk()) { var mo = new MutationObserver(function () { if (kijk()) mo.disconnect(); }); mo.observe(rl, { attributes: true, attributeFilter: ['hidden'] }); }
    } else setTimeout(cookieBalk, 900);
    var t = null; new MutationObserver(function () { clearTimeout(t); t = setTimeout(function () { kopBijwerken(); mijnPlanLinks(); voetLink(); kennisLink(); welkomTerug(); afzender(); }, 120); }).observe(document.body, { childList: true, subtree: true });
    addEventListener('hashchange', function () { setTimeout(kennisLink, 200); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  /* ---------- delen (ronde 53): doorsturen zonder gegevens · meekijken met een leeslink ---------- */
  function deelKnoppen(url, titel) {
    var tekst = titel + ' ' + url;
    return '<div class="nkl-f"><label for="nkl-dl">Link</label><input id="nkl-dl" class="nkl-in" readonly value="' + esc(url) + '"></div>'
      + '<div class="nkl-deelk"><button type="button" class="nkl-b" data-d="kopie">Kopieer de link</button>'
      + '<a class="nkl-b" href="https://wa.me/?text=' + encodeURIComponent(tekst) + '" target="_blank" rel="noopener">WhatsApp</a>'
      + '<a class="nkl-b" href="mailto:?subject=' + encodeURIComponent(titel) + '&body=' + encodeURIComponent(tekst) + '">E-mail</a></div>'
      + '<p class="nkl-gek" id="nkl-dok" role="status"></p>';
  }
  function kopieer() { var i = document.getElementById('nkl-dl'), ok = document.getElementById('nkl-dok'); if (!i) return; i.select(); var gelukt = false; try { if (navigator.clipboard) { navigator.clipboard.writeText(i.value); gelukt = true; } else gelukt = document.execCommand('copy'); } catch (e) { gelukt = false; } if (ok) ok.textContent = gelukt ? 'Gekopieerd.' : 'Selecteer de link en kopieer hem.'; }
  /* doorsturen zonder gegevens: een artikel of een lege simulatie */
  function deel(o) {
    o = o || {}; var url = o.url || location.href, titel = o.titel || document.title;
    var x = open(o.kop || 'Doorsturen'); x.p.dataset.modus = 'deel';
    x.b.innerHTML = '<p class="nkl-waarom">' + esc(o.zin || 'U stuurt alleen de link door. Er gaan geen gegevens van u mee.') + '</p>' + deelKnoppen(url, titel);
    x.f.innerHTML = '<button type="button" class="nkl-l2" data-d="klaar">Sluiten</button>';
  }
  /* meekijken: een leeslink naar een momentopname van het plan, die u kunt intrekken */
  var D = {};
  function links() { return lees('delen') || []; }
  function deelTeken() {
    var x = P, l = links().filter(function (d) { return !d.uit; });
    var lijst = l.length ? '<p class="nkl-vr">Actieve leeslinks</p><ul class="nkl-dlst">' + l.map(function (d) { return '<li><span><b>' + esc(d.voor || 'Leeslink') + '</b><small>Gedeeld op ' + new Date(d.t).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long' }) + '</small></span><button type="button" class="nkl-l" data-d="uit" data-tk="' + d.tk + '">Intrekken</button></li>'; }).join('') + '</ul>' : '';
    if (D.nieuw) {
      var url = location.origin + '/meekijken/?t=' + D.nieuw;
      x.b.innerHTML = '<div class="nkl-ok" role="status"><b>Leeslink gemaakt</b>Wie deze link opent, ziet uw ' + (D.soort === 'sim' ? 'simulatie' : 'plan') + ' zoals ' + (D.soort === 'sim' ? 'ze' : 'het') + ' nu is, zonder iets te kunnen wijzigen.</div>' + deelKnoppen(url, D.soort === 'sim' ? 'Mijn simulatie op Norte' : 'Mijn plan op Norte') + lijst;
      x.f.innerHTML = '<button type="button" class="nkl-l2" data-d="klaar">Klaar</button><p class="nkl-note">Testversie: de link werkt alleen in deze browser.</p>';
      return;
    }
    x.b.innerHTML = '<p class="nkl-waarom">Uw partner ziet uw ' + (D.soort === 'sim' ? 'simulatie met uw cijfers' : 'plan zoals het nu is') + ', maar kan niets wijzigen. U kunt de link altijd intrekken.</p>'
      + '<div class="nkl-f"><label for="nkl-dvoor">Voor wie? <span class="nkl-opt">(optioneel)</span></label><input id="nkl-dvoor" class="nkl-in" autocomplete="off" placeholder="Bijvoorbeeld: Marlies" value="' + esc(D.voor || '') + '"></div>'
      + '<p class="nkl-let">Wie de link heeft, ziet ook de namen en bedragen in uw ' + (D.soort === 'sim' ? 'simulatie' : 'plan, bijvoorbeeld die van uw kinderen') + '.</p>' + lijst;
    x.f.innerHTML = '<button type="button" class="nkl-go" data-d="maak">Maak een leeslink</button><button type="button" class="nkl-l" data-d="klaar" style="align-self:center">Nu niet</button>';
  }
  function deelPlan() {
    var x = open('Plan tonen');
    x.p.dataset.modus = 'delen-informatie';
    x.b.innerHTML = '<p class="nkl-waarom">Een leeslink voor een ander toestel is nog niet beschikbaar. U kunt uw plan als pdf downloaden en het bestand zelf delen.</p>';
    x.f.innerHTML = '<button type="button" class="nkl-l2">Sluiten</button>';
    x.f.querySelector('button').addEventListener('click', sluit);
  }
  /* ronde 60 · bewaren of tonen: download voor uzelf, een leeslink voor uw partner (na een bewuste klik) */
  var BT = null;
  function bewaarTonen(o) {
    BT = o || {}; var pl = BT.soort === 'plan'; var x = open('Downloaden of delen'); x.p.dataset.modus = 'bt';
    /* ronde 63: wat u bewaart of toont staat bovenaan; twee duidelijke keuzes; één regel over wie uw cijfers ziet */
    var w = null; try { w = BT.wat ? BT.wat() : null; } catch (e) { w = null; }
    var ic = function (d) { return '<span class="nkl-btic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 16 16">' + d + '</svg></span>'; };
    var DL = '<path d="M8 2.5V10M5 7l3 3 3-3M3 13h10" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>';
    var PA = '<circle cx="5.5" cy="6" r="2.3" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="11" cy="6" r="2.3" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M1.5 13c.6-2.2 2.1-3.3 4-3.3s3.4 1.1 4 3.3M8.5 10.2c.7-.4 1.5-.5 2.5-.5 1.9 0 3.4 1.1 4 3.3" fill="none" stroke="currentColor" stroke-width="1.3"/>';
    var rij = function (d, icoon, titel, zin) { return '<button type="button" class="nkl-btr" data-d="' + d + '">' + ic(icoon) + '<span class="nkl-btt"><b>' + titel + '</b><span>' + zin + '</span></span><span class="nkl-btp" aria-hidden="true">→</span></button>'; };
    x.b.innerHTML = '<div class="nkl-bt2">'
      + '<p class="nkl-btnaam">' + esc((pl ? 'Uw plan' : 'Uw simulatie')
        + (w && w.t ? ': ' + w.t : '') + (w && w.v ? ' · ' + w.v : '')
        + (w && w.v && w.k && /\d{4}/.test(w.k) ? ' in ' + w.k.match(/\d{4}/)[0] : '')) + '</p>'
      + rij('bt-dl', DL, 'Download als pdf', 'Voor uzelf, om rustig na te lezen.')
      + (BT.pdfBestand ? rij('bt-partner', PA, 'Deel de pdf', 'Met uw partner of iemand anders.') : '')
      + '<p class="nkl-fout" data-pdf-status role="status"></p>'
      + '<p class="nkl-btpriv"><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>U deelt een kopie van uw ' + (pl ? 'plan' : 'simulatie') + ' als pdf.</p>'
      + '</div>';
    x.f.innerHTML = '<button type="button" class="nkl-l2" data-d="klaar">Sluiten</button>';
  }
  async function deelPdf(knop) {
    var opties = BT, paneel = P;
    if (!opties || !opties.pdfBestand || knop.disabled) return;
    var melding = paneel.b.querySelector('[data-pdf-status]');
    knop.disabled = true;
    melding.textContent = '';
    try {
      var bestand = opties.pdfBestand();
      if (!bestand) {
        melding.textContent = 'De pdf is nog niet beschikbaar.';
        return;
      }
      var inhoud = { files: [bestand] };
      if (!navigator.share || !navigator.canShare || !navigator.canShare(inhoud)) {
        opties.download();
        sluit();
        return;
      }
      await navigator.share(inhoud);
      if (P === paneel && BT === opties) sluit();
    } catch (fout) {
      if (fout.name !== 'AbortError') {
        melding.textContent = 'Delen lukt hier niet. Kies Download als pdf om het bestand zelf te delen.';
      }
    } finally {
      knop.disabled = false;
    }
  }
  function deelKlik(e) {
    if (!P || (P.p.dataset.modus !== 'deel' && P.p.dataset.modus !== 'meekijk' && P.p.dataset.modus !== 'bt')) return;
    var el = e.target.closest('[data-d]'); if (!el) return; var a = el.getAttribute('data-d');
    if (a === 'bt-dl') { var o = BT; sluit(); if (o && o.download) setTimeout(o.download, 60); return; }
    if (a === 'bt-partner') { deelPdf(el); return; }
    if (a === 'kopie') { kopieer(); return; }
    if (a === 'klaar') { sluit(); return; }
    if (a === 'maak') { var v = ((document.getElementById('nkl-dvoor') || {}).value || '').trim(), tk = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); var l = links(); l.push({ tk: tk, voor: v, t: Date.now(), snap: D.snap, uit: false }); zet('delen', l.slice(-12)); D.voor = v; D.nieuw = tk; deelTeken(); return; }
    if (a === 'uit') { var t2 = el.getAttribute('data-tk'), l2 = links(); l2.forEach(function (d) { if (d.tk === t2) { d.uit = true; d.snap = null; } }); zet('delen', l2); if (D.nieuw === t2) D.nieuw = null; deelTeken(); return; }
  }
  document.addEventListener('click', deelKlik);

  /* ---------- ronde 73: nieuwe uitleg ontvangen, ook zonder simulatie of plan ---------- */
  var NW = {}, ONDW = [['pensioen', 'Pensioen en fiscaal sparen'], ['beleggen', 'Beleggen uitgelegd'], ['kind', 'Sparen voor een kind']];
  function nieuwsTeken(focusSel) {
    var x = P, r = lees('nieuws');
    if (NW.stap === 'uit') {
      x.b.innerHTML = '<div class="nkl-ok" role="status"><b>Uitgeschreven</b>U krijgt geen nieuwe uitleg en verhalen meer. Uw e-mailadres is van dit toestel verwijderd.</div>';
      x.f.innerHTML = '<button type="button" class="nkl-go" data-n="klaar">Sluiten</button><button type="button" class="nkl-l" data-n="opnieuw" style="align-self:center">Opnieuw inschrijven</button><p class="nkl-note">Testversie: er wordt niets verstuurd.</p>';
    } else if (NW.stap === 'ok' || (r && !NW.stap)) {
      x.b.innerHTML = '<div class="nkl-ok" role="status"><b>Ingeschreven</b>U krijgt nieuwe uitleg en verhalen op ' + esc((r && r.mail) || NW.mail || '') + '. Elke e-mail heeft onderaan een link om uit te schrijven.</div>';
      x.f.innerHTML = '<button type="button" class="nkl-go" data-n="klaar">Sluiten</button><button type="button" class="nkl-l" data-n="uit" style="align-self:center">Uitschrijven</button><p class="nkl-note">Testversie: er wordt niets verstuurd.</p>';
    } else {
      x.b.innerHTML = '<p class="nkl-waarom">Nieuwe uitleg en echte verhalen van Norte, hoogstens één e-mail per maand. Los van een plan of afspraak.</p><div class="nkl-f"><label for="nkl-nm">Uw e-mailadres</label><input id="nkl-nm" class="nkl-in" type="email" autocomplete="email" placeholder="naam@voorbeeld.be" value="' + esc(NW.mail || '') + '"></div>'
        + '<fieldset class="nkl-ond"><legend>Waarover vooral? <span>(optioneel)</span></legend>' + ONDW.map(function (o) { return '<label class="nkl-chk"><input type="checkbox" data-ond="' + o[0] + '"' + ((NW.ond || []).indexOf(o[0]) > -1 ? ' checked' : '') + '> ' + o[1] + '</label>'; }).join('') + '</fieldset><p class="nkl-chkuit">Uw keuze bepaalt alleen welke artikels we sturen. Uitschrijven kan altijd, met één klik.</p><p class="nkl-fout" id="nkl-nfout" role="alert"></p>';
      x.f.innerHTML = '<button type="button" class="nkl-go" data-n="ja">Inschrijven</button><button type="button" class="nkl-l" data-n="niet" style="align-self:center">Nu niet</button><p class="nkl-note">Testversie: er wordt niets verstuurd.</p>';
    }
    if (focusSel) { var f = x.p.querySelector(focusSel); if (f) f.focus(); }
  }
  function nieuws() { location.assign('/op-de-hoogte.html'); }
  document.addEventListener('click', function (e) {
    if (!P || P.p.dataset.modus !== 'nieuws' || !P.p.contains(e.target)) return;
    var el = e.target.closest('[data-n]'); if (!el) return; var a = el.getAttribute('data-n');
    if (a === 'niet' || a === 'klaar') { sluit(); return; }
    if (a === 'uit') { try { localStorage.removeItem(K + 'nieuws'); } catch (e2) { /* niets */ } NW = { stap: 'uit' }; nieuwsTeken('[data-n=klaar]'); return; }
    if (a === 'opnieuw') { NW = {}; nieuwsTeken('#nkl-nm'); return; }
    if (a === 'ja') { var m = ((document.getElementById('nkl-nm') || {}).value || '').trim(); NW.mail = m; NW.ond = [].slice.call(P.p.querySelectorAll('[data-ond]')).filter(function (c) { return c.checked; }).map(function (c) { return c.getAttribute('data-ond'); });
      if (!MAILRE.test(m)) { var f = document.getElementById('nkl-nfout'); if (f) f.textContent = 'Vul een geldig e-mailadres in.'; var i = document.getElementById('nkl-nm'); if (i) i.focus(); return; }
      zet('nieuws', { mail: m.toLowerCase(), onderwerpen: NW.ond, tekst: 'r73', bron: location.pathname, t: Date.now() }); NW.stap = 'ok'; nieuwsTeken('[data-n=klaar]'); }
  });

  /* ---------- ronde 74: context, aanvraagstatus en terugkeer (lokaal; testversie, er wordt niets verstuurd) ---------- */
  function overHtml() {
    return (C.over ? '<div class="nkl-gek nkl-over"><span>' + esc(C.over) + '</span><button type="button" class="nkl-l" data-a="over">Wijzig</button></div>' : '')
      + '<div class="nkl-f nkl-bespreek"><label for="nkl-vraag">Wat wilt u bespreken? <small>(optioneel)</small></label><textarea id="nkl-vraag" class="nkl-in" data-v="vraag" rows="2" maxlength="400">' + esc(C.vraag || '') + '</textarea></div>';
  }
  // Alleen de fictieve aanvraagstatus. Contactgegevens, vraag, doelnamen en plan blijven uit deze opslag.
  function aanvraag() {
    var r = lees('aanvraag');
    if (!r || !VORM[r.k]) return null;
    if (r.demo === true && ['ontvangen', 'annulering', 'geannuleerd'].indexOf(r.st) >= 0) return r;
    if (r.fixture === true && ['bevestigd', 'gewijzigd', 'geannuleerd', 'gehad'].indexOf(r.st) >= 0) return r;
    return null;
  }
  function actief(r) { return r && ['ontvangen', 'bevestigd', 'gewijzigd', 'annulering'].indexOf(r.st) >= 0; }
  function aanvraagZet() {
    var record = { st: 'ontvangen', demo: true, wijziging: C.wijzig, slot: C.slot, ander: C.dag === 'ander', k: C.k, kant: C.kant, mee: !!C.mee, t: Date.now() };
    if (C.wijzig && C.vorig && C.vorig.fixture === true && ['bevestigd','gewijzigd'].includes(C.vorig.st)) {
      var vorig = C.vorig;
      record.vorig = {slot: vorig.slot, k: vorig.k, kant: vorig.kant, kantoor: vorig.kantoor};
    } else if (C.wijzig && C.vorig && C.vorig.vorig) record.vorig = C.vorig.vorig;
    return bewaarAanvraag(record);
  }
  function bewaarAanvraag(record) {
    try { localStorage.setItem(K + 'aanvraag', JSON.stringify(record)); kopAfspraak(); return true; }
    catch (e) { return false; }
  }
  function afsprLabel() { return 'Contact'; }
  function kopAfspraak() { document.querySelectorAll('.nkl-afspr, .nkl-kafspr, [data-pv74="afspraak"]').forEach(function (b) { if (b.textContent !== afsprLabel()) b.textContent = afsprLabel(); }); }
  var ST = { ctx: 'algemeen' };
  function statusTeken(r, direct) {
    if (!r) return;
    var x = P, bev = r.st === 'bevestigd' || r.st === 'gewijzigd';
    if (r.st === 'annulering') {
      x.p.dataset.modus = 'aanvraag'; x.t.textContent = 'Annulering gevraagd';
      x.b.innerHTML = '<p class="nkl-waarom">Fictieve annulering. Er is niets aan een kantoor doorgegeven.</p>';
      x.f.innerHTML = '<button type="button" class="nkl-l2" data-s="sluit">Sluiten</button>';
      return;
    }
    var kantoor = KANT[r.kant], naam = kantoor ? kantoor.n + ' · ' + kantoor.p : r.fixture ? r.kantoor || '' : '';
    x.p.dataset.modus = 'aanvraag';
    x.t.textContent = direct ? 'Proefaanvraag bewaard' : bev ? 'Uw afspraak' : 'Uw aanvraag';
    var slot = r.slot || (r.ander ? ANDER : '');
    var rijen = [[bev ? 'Afgesproken moment' : 'Gewenst moment', slot + (!bev && !r.ander ? ' · nog te bevestigen' : '')], ['Hoe', VORM[r.k]], ['Met', naam]];
    if (r.vorig) rijen.unshift(['Fictief bevestigd moment', (r.vorig.slot || '') + ' · ' + (VORM[r.vorig.k] || '')]);
    if (!bev) rijen.push(['Plan meesturen', r.mee ? 'Ja, bij een echte aanvraag' : 'Nee']);
    var uitleg = bev ? (r.st === 'gewijzigd' ? 'Het nieuwe moment is bevestigd. ' : '') + 'Neem uw plan erbij als u wilt.' :
      (r.wijziging ? 'U vroeg een ander moment. ' : '') + 'Bij een echte aanvraag bevestigt het kantoor uw moment of stelt het een ander voor.';
    x.b.innerHTML = '<p class="nkl-waarom" role="status">' + (r.fixture ? 'Fictief voorbeeld van een kantoorstatus.' : 'Deze proefaanvraag staat alleen in deze browser. Er is niets verstuurd of geboekt.') + '</p><div class="nkl-sam">' +
      rijen.map(function (q) { return '<span>' + q[0] + '</span><strong>' + esc(q[1]) + '</strong>'; }).join('') + '</div><p class="nkl-waarom">' + uitleg + '</p>';
    x.f.innerHTML = '<button type="button" class="nkl-l2" data-s="sluit">Sluiten</button><div class="nkl-status-act"><button type="button" class="nkl-l" data-s="ander">Ander moment vragen</button><button type="button" class="nkl-l" data-s="annuleer">' +
      (bev ? 'Annulering vragen' : 'Proefaanvraag annuleren') + '</button></div>';
  }
  function statusTonen(r, ctx) { ST.ctx = ctx || 'algemeen'; open('Uw aanvraag'); statusTeken(r, false); P.t.focus({preventScroll:true}); }
  document.addEventListener('click', function (e) {
    if (!P || P.p.dataset.modus !== 'aanvraag' || !P.p.contains(e.target)) return;
    var el = e.target.closest('[data-s]'); if (!el) return;
    var a = el.getAttribute('data-s'), r = aanvraag();
    if (a === 'sluit') { sluit(); return; }
    if (!actief(r) || r.st === 'annulering') return;
    if (a === 'ander') { contact(ST.ctx, { nieuw: true, wijzig: true, vorig: r }); return; }
    if (a === 'annuleer') {
      var bevestigd = r.st !== 'ontvangen';
      if (!bewaarAanvraag({st: bevestigd ? 'annulering' : 'geannuleerd', demo: true, k: r.k, kant: r.kant, t: Date.now()})) {
        P.b.insertAdjacentHTML('beforeend', '<p role="alert">De wijziging kon niet worden bewaard. Probeer opnieuw.</p>'); return;
      }
      P.t.textContent = bevestigd ? 'Annulering gevraagd' : 'Proefaanvraag geannuleerd';
      P.b.innerHTML = '<p class="nkl-waarom" role="status">' + (bevestigd ? 'Dit is een fictieve annulering. Er is niets aan een kantoor doorgegeven.' : 'U kunt opnieuw een gesprek aanvragen.') + '</p>';
      P.f.innerHTML = '<button type="button" class="nkl-l2" data-s="sluit">Sluiten</button>';
      P.f.querySelector('[data-s=sluit]').focus();
    }
  });
  window.NorteKlant = { afsprLabel: afsprLabel, nieuws: nieuws, brug: brug, zin: zin, contact: contact, bewaar: bewaar, moetVragen: moetVragen, bewaard: bewaard, mijnPlan: mijnPlan, cookies: cookieKeuze, sluit: sluit, deel: deel, deelPlan: deelPlan, bewaarTonen: bewaarTonen };
})();

/* ronde 58 · oplichten in het plan: wie een doel of een vergelijkingslijn aanwijst, ziet in de grafiek welk stuk daarbij hoort.
   Alleen met muis of trackpad, of met het toetsenbord. Werkt via één stijlregel, zodat het hertekenen van de grafiek het niet breekt. */
(function () {
  var fijn = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;
  var st = null;
  function regel(css) {
    if (!st) { st = document.createElement('style'); st.id = 'nkl-spot'; document.head.appendChild(st); }
    st.textContent = css || '';
  }
  function zacht(sel) { return sel + '{opacity:.22}'; }
  function voor(el) {
    if (!el) return '';
    var g = el.closest('.gr-item');
    if (g && g.dataset.id && g.dataset.id !== 'all') {
      var id = g.dataset.id.replace(/[^\w-]/g, '');
      return zacht('svg .goal-band:not([data-goal="' + id + '"]),svg .goal-marker:not([data-horizon="' + id + '"]),svg .sav-line,svg .pres-line') +
        'svg .main-line{opacity:.35}' +
        '#chart#chart .goal-band[data-goal="' + id + '"]{fill-opacity:.45!important;stroke-opacity:1!important}' +
        '.goalrow .gr-item:not([data-id="' + id + '"]):not([aria-checked="true"]){color:#6B6C6B}';
    }
    var s = el.closest('.pv5swr[aria-checked="true"]');
    if (s) {
      var lijn = s.dataset.action === 'pv4-k' ? 'pres-line' : s.dataset.action === 'pv4-s' ? 'sav-line' : '';
      if (!lijn) return '';
      return zacht('svg .goal-band,svg .goal-marker,svg .main-line,svg .' + (lijn === 'pres-line' ? 'sav-line' : 'pres-line')) +
        'svg .' + lijn + '{opacity:1}';
    }
    return '';
  }
  if (fijn) {
    document.addEventListener('pointerover', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') regel(voor(e.target)); });
    document.addEventListener('pointerout', function (e) { if (!e.relatedTarget || !voor(e.relatedTarget)) regel(''); });
  }
  document.addEventListener('focusin', function (e) { var t = e.target; regel(t.matches && t.matches(':focus-visible') ? voor(t) : ''); });
  document.addEventListener('focusout', function () { regel(''); });
  document.addEventListener('click', function () { setTimeout(function () { if (!document.querySelector('.gr-item:hover,.pv5swr:hover')) regel(''); }, 0); });
})();
