/* GEGENEREERD uit norte-project.mjs — niet met de hand bewerken. */
(function(){'use strict';
/* Norte-project 49 · overdracht simulatie → plan, projectbestand, retourcontext.
 * Bevat GEEN financiële rekenlogica: bedragen worden alleen gelezen, van eenheid en herkomst voorzien en gevalideerd.
 * De plancomponent (bron48-adapter) blijft het datamodel; dit is de transport- en bewaarlaag eromheen.
 * Opslag wordt altijd geïnjecteerd (localStorage/sessionStorage of een testdubbel). */

const VERSIE = '49.2';
const HANDOFF_SCHEMA = 'norte-sim-overdracht/2';
const PROJECT_SCHEMA = 'norte-project/1';
const META_SCHEMA = 'norte-project-meta/1';
const PLAN_SLEUTEL = (globalThis.__pvPfx || 'norte-preview-20261109-r1') + ':klantplan';
const H_PREFIX = (globalThis.__pvPfx || 'norte-preview-20261109-r1') + ':overdracht:';
const RET_KEY = (globalThis.__pvPfx || 'norte-preview-20261109-r1') + ':retour';
const META_SUFFIX = ':project';
const TAX = ['ps', 'lts', 'vapz', 'poz', 'ipt'];
const GEWOON = ['groei', 'inkomen', 'iemand', 'ander'];
const DOELEN = GEWOON.concat(TAX);
const NAMEN = { groei: 'Vermogensgroei', inkomen: 'Aanvullend inkomen', iemand: 'Sparen voor iemand anders', ander: 'Ander doel', ps: 'Pensioensparen', lts: 'Langetermijnsparen', vapz: 'VAPZ', poz: 'POZ', ipt: 'IPT' };
const BETALER = { ps: 'prive', lts: 'prive', vapz: 'prive', poz: 'prive', ipt: 'vennootschap' };
const STATUUT = { werknemer: 'werknemer', zelfstandig: 'zelfstandig', bedrijfsleider: 'bedrijfsleider', anders: 'onbekend' };
const RELATIE = { kind: 'kind', kleinkind: 'kleinkind', iemand: 'ander' };
const EENHEID = {
  termijn: 'jaar vanaf nu', doelLeeftijd: 'leeftijd ontvanger op doelmoment', startLeeftijd: 'leeftijd bij start inkomen', eindLeeftijd: 'leeftijd einde inkomen',
  maandinleg: 'EUR per maand', eenmalig: 'EUR eenmalig', doelbedrag: 'EUR op doelmoment', gewenstInkomen: 'EUR per maand inkomen bij start', jaarbijdrage: 'EUR per jaar, inkomstenjaar 2026'
};
const GRENS = { termijn: [1, 60], doelLeeftijd: [1, 110], startLeeftijd: [18, 110], eindLeeftijd: [19, 110], maandinleg: [0.01, 10000000], eenmalig: [0.01, 10000000], doelbedrag: [0.01, 10000000], gewenstInkomen: [0.01, 1000000], jaarbijdrage: [0.01, 1000000] };

/* Exact dezelfde getallezing als de simulatie (simulatie/app.js · number). */
const simGetal = (v) => (v === '' || v == null ? null : Number(String(v).replace(/\s/g, '').replace(',', '.')));
const pos = (v) => { const n = simGetal(v); return Number.isFinite(n) && n > 0 ? n : null; };

function fnv32(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
const willekeurig = (rand = Math.random) => Math.floor(rand() * 2 ** 32).toString(36) + Math.floor(rand() * 2 ** 32).toString(36);
const nieuwOverdrachtId = (goal, rand) => 'norte-' + String(goal).replace(/[^a-z]/g, '') + '-' + willekeurig(rand);
const nieuwProjectId = (rand) => 'np-' + willekeurig(rand);

/* ---------- simulatie → overdracht ---------- */
function buildHandoff({ goal, draft: d, fiscalStatus = null, transferId, uitkomst = null, now = Date.now() }) {
  if (!DOELEN.includes(goal)) throw Error('Onbekend doel');
  if (!d || typeof d !== 'object') throw Error('Geen simulatie');
  const gekozen = {}, context = {}, afgeleid = {}, verkenning = {}, nietOvergenomen = [];
  const kies = (k, waarde) => { if (waarde !== null && waarde !== undefined) gekozen[k] = { waarde, eenheid: EENHEID[k], herkomst: 'klant' }; };
  const h = { schema: HANDOFF_SCHEMA, versie: VERSIE, transferId, bron: 'simulatie-bronflow-0611', gemaaktOp: new Date(now).toISOString(), doel: goal, naam: NAMEN[goal], gekozen, context, afgeleid, verkenning, nietOvergenomen };
  if (TAX.includes(goal)) {
    h.betaler = BETALER[goal];
    const st = STATUUT[fiscalStatus || d.status] || null;
    if (st) h.statuut = { waarde: st, herkomst: 'klant' };
    if (d.example === false && pos(d.annual) !== null) kies('jaarbijdrage', pos(d.annual));
    else if (pos(d.annual) !== null) h.voorbeeld = { jaarbijdrage: { waarde: pos(d.annual), eenheid: EENHEID.jaarbijdrage, herkomst: 'voorbeeld' } };
    if (d.variant) verkenning.formule = { waarde: d.variant, herkomst: d.example === false ? 'klant' : 'simulatiestand' };
    if (d.rate !== '' && d.rate != null) { nietOvergenomen.push('voorbeeldtarief'); const vt = Number(String(d.rate).replace(',', '.')); if (Number.isFinite(vt) && vt >= 0 && vt <= 60) context.voorbeeldtarief = { waarde: vt, eenheid: '%', herkomst: 'voorbeeld' }; }
    if (d.existing) { context.lopendContract = d.existing; nietOvergenomen.push('lopend contract'); }
    if (pos(d.targetAge) !== null) context.bekijkLeeftijd = { waarde: pos(d.targetAge), eenheid: 'leeftijd' };
  } else {
    const intent = d.intent || 'contribution';
    h.richting = intent;
    if (goal === 'iemand') {
      h.ontvanger = { naam: String(d.name || '').trim().slice(0, 80), relatie: RELATIE[d.relation] || null, leeftijd: { waarde: simGetal(d.recipientAge), eenheid: 'jaar' } };
      kies('doelLeeftijd', pos(d.years));
    } else if (goal === 'inkomen') {
      if (d.startWhen === 'nu') gekozen.start = { waarde: 'nu', herkomst: 'klant' }; else kies('startLeeftijd', pos(d.startAge));
      kies('eindLeeftijd', pos(d.endAge));
    } else {
      if (goal === 'ander') h.naam = String(d.name || '').trim().slice(0, 80) || NAMEN.ander;
      kies('termijn', pos(d.years));
    }
    if (intent === 'income') { kies('gewenstInkomen', pos(d.wanted)); if (pos(d.monthly)) nietOvergenomen.push('vorige maandinleg'); }
    else if (intent === 'target') { kies('doelbedrag', pos(d.target)); if (pos(d.monthly)) nietOvergenomen.push('vorige maandinleg'); }
    else if (!(goal === 'inkomen' && d.startWhen === 'nu')) kies('maandinleg', pos(d.monthly));
    kies('eenmalig', pos(d.lump));
    if (d.funding && Number.isFinite(d.funding.monthly)) afgeleid.maandinleg = { waarde: d.funding.monthly, eenheid: EENHEID.maandinleg, herkomst: 'berekend', profiel: d.funding.profileAtSolve || null };
  }
  if (goal !== 'iemand' && pos(d.age) !== null) context.leeftijdNu = { waarde: pos(d.age), eenheid: 'jaar, afgerond (geen geboortedatum)', bron: 'simulatie', peildatum: h.gemaaktOp.slice(0, 10) };
  if (d.profile) { verkenning.profiel = d.profile; verkenning.profielHerkomst = d.profileOrigin || null; }
  if (d.feeling) { verkenning.gevoel = d.feeling; verkenning.gevoelVersie = d.reactionVersion || null; verkenning.dalingsbasis = d.reactionBasis || null; }
  if (uitkomst && Number.isFinite(uitkomst.waarde)) verkenning.rekenvoorbeeld = { waarde: uitkomst.waarde, eenheid: 'EUR op doelmoment', profiel: d.profile || null, bron: 'simulatie-bronflow-0611', peildatum: h.gemaaktOp.slice(0, 10) };
  if (uitkomst && Number.isFinite(uitkomst.inkomen)) verkenning.rekenvoorbeeld = Object.assign(verkenning.rekenvoorbeeld || { bron: 'simulatie-bronflow-0611', profiel: d.profile || null }, { inkomen: uitkomst.inkomen, inkomenEenheid: 'EUR per maand' });
  h.sig = fnv32(JSON.stringify([goal, h.naam, h.ontvanger || null, h.statuut || null, gekozen]));
  const v = validateHandoff(h);
  if (!v.ok) throw Error(v.error);
  return h;
}

function validateHandoff(h) {
  const nee = (error) => ({ ok: false, error });
  if (!h || h.schema !== HANDOFF_SCHEMA) return nee('Onbekend overdrachtformaat');
  if (typeof h.transferId !== 'string' || !/^norte-[a-z]+-[a-z0-9]{4,40}$/.test(h.transferId)) return nee('Ongeldige overdracht');
  if (!DOELEN.includes(h.doel)) return nee('Onbekend doel');
  for (const [k, x] of Object.entries(h.gekozen || {})) {
    if (k === 'start') { if (x.waarde !== 'nu') return nee('Ongeldige start'); continue; }
    if (!GRENS[k] || !x || x.eenheid !== EENHEID[k] || x.herkomst !== 'klant' || !Number.isFinite(x.waarde)) return nee('Ongeldige eenheid of waarde: ' + k);
    if (x.waarde < GRENS[k][0] || x.waarde > GRENS[k][1]) return nee('Waarde buiten bereik: ' + k);
    if (['termijn', 'doelLeeftijd', 'startLeeftijd', 'eindLeeftijd'].includes(k) && !Number.isInteger(x.waarde)) return nee('Geen geheel getal: ' + k);
  }
  const g = h.gekozen || {};
  if (h.voorbeeld) { const v = h.voorbeeld.jaarbijdrage; if (!TAX.includes(h.doel) || !v || v.herkomst !== 'voorbeeld' || !(v.waarde > 0 && v.waarde <= GRENS.jaarbijdrage[1])) return nee('Ongeldig voorbeeld'); if ('jaarbijdrage' in g) return nee('Voorbeeld én eigen bijdrage'); }
  if (TAX.includes(h.doel)) {
    if (['termijn', 'maandinleg', 'eenmalig', 'doelbedrag', 'gewenstInkomen'].some((k) => k in g)) return nee('Fiscale overdracht met gewone doelvelden');
    if (h.betaler !== BETALER[h.doel]) return nee('Betaler past niet bij de fiscale vorm');
  } else {
    if ('jaarbijdrage' in g) return nee('Gewoon doel met fiscale bijdrage');
    if (['maandinleg', 'doelbedrag', 'gewenstInkomen'].filter((k) => k in g).length > 1) return nee('Meer dan één rekenrichting');
    if (h.doel === 'iemand') { const o = h.ontvanger || {}; if (!o.naam || !o.relatie || !Number.isInteger(o.leeftijd && o.leeftijd.waarde) || o.leeftijd.waarde < 0 || o.leeftijd.waarde > 109) return nee('Ontvanger onvolledig'); if (g.doelLeeftijd && g.doelLeeftijd.waarde <= o.leeftijd.waarde) return nee('Doelleeftijd ligt niet na de huidige leeftijd'); }
    if (h.doel === 'inkomen' && g.startLeeftijd && g.eindLeeftijd && g.eindLeeftijd.waarde <= g.startLeeftijd.waarde) return nee('Einde inkomen ligt niet na de start');
  }
  return { ok: true };
}

/* Vertaling naar de velden van de bestaande plancomponent. Hele euro's: een niet-geheel bedrag wordt nooit stil afgerond. */
function planIntent(h) {
  const g = h.gekozen || {}, val = (k) => (g[k] ? g[k].waarde : null), precisie = [];
  // De plancomponent leest hier hele euro's (geldLive en f32.num laten de cijfers na de komma vallen). Zelfde gevolg, maar zichtbaar gemeld.
  const heel = (k, label) => { const v = val(k); if (v === null) return null; if (Number.isInteger(v)) return v; const naar = Math.floor(v); precisie.push({ veld: k, label, van: v, naar }); return naar; };
  if (TAX.includes(h.doel)) {
    // Fiscale jaarbijdrage: centen blijven de actieve waarde (plan rekent fiscaal met decimalen).
    const vb = h.voorbeeld && h.voorbeeld.jaarbijdrage ? h.voorbeeld.jaarbijdrage.waarde : null, fm = (h.verkenning || {}).formule;
    const methode = fm ? ({ ps: { standard: ['ps.methode', '30'], higher: ['ps.methode', '25'] }, vapz: { ordinary: ['vapz.soort', 'gewoon'], social: ['vapz.soort', 'sociaal'] } }[h.doel] || {})[fm.waarde] || null : null;
    return { fiscaal: { vorm: h.doel, statuut: h.statuut ? h.statuut.waarde : null, jaarbedrag: val('jaarbijdrage'), voorbeeld: vb, methode, methodeHerkomst: fm ? fm.herkomst : null }, naam: NAMEN[h.doel], verkenning: h.verkenning || {}, context: h.context || {}, precisie };
  }
  const it = { soort: h.doel, naam: h.naam, verkenning: h.verkenning || {}, context: h.context || {}, afgeleid: h.afgeleid || {}, richting: h.richting, term: null, geld: { mm: heel('maandinleg', 'Per maand'), ee: heel('eenmalig', 'Eenmalig'), eind: heel('doelbedrag', 'Doelbedrag'), wens: heel('gewenstInkomen', 'Inkomen per maand'), inkStart: null, inkTot: null }, precisie };
  // ronde6 · één rekenbasis: bleef de bijdrage in de simulatie behouden terwijl een ander profiel werd verkend,
  // dan is die afgeronde bijdrage de geplande inzet. Het plan rekent het doelbedrag dan niet opnieuw terug naar een ander maandbedrag.
  const af = (h.afgeleid || {}).maandinleg, vk = (h.verkenning || {}).profiel;
  if (af && Number.isFinite(af.waarde) && af.waarde > 0 && af.profiel && vk && af.profiel !== vk && (it.geld.eind != null || it.geld.wens != null)) { it.geld.mm = Math.max(1, Math.round(af.waarde)); it.geld.eind = null; it.geld.wens = null; it.leidend = 'bijdrage'; }
  if (h.doel === 'iemand') {
    const o = h.ontvanger; it.naam = o.naam; it.rel = o.relatie; it.kind = o.relatie !== 'ander'; it.kid = o.leeftijd.waarde;
    if (val('doelLeeftijd') !== null) it.term = { waarde: it.kind ? val('doelLeeftijd') : val('doelLeeftijd') - o.leeftijd.waarde, vereistGeboorte: false };
  } else if (h.doel === 'inkomen') {
    it.geld.inkStart = g.start ? 'nu' : 'later';
    if (val('startLeeftijd') !== null) it.term = { waarde: val('startLeeftijd'), vereistGeboorte: true };
    it.geld.inkTot = val('eindLeeftijd');
  } else if (val('termijn') !== null) it.term = { waarde: val('termijn'), vereistGeboorte: false };
  return it;
}

/* ---------- opslag ---------- */

const plain = x => !!x && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
function validSnapshot(s) {
  if(!plain(s)||s.v!==1||!plain(s.k)||!plain(s.fin)||!plain(s.pl)||!Array.isArray(s.pl.goals)||s.pl.goals.length>100)return false;
  const safe=(x,d=0)=>{if(d>35)return false;if(x===null||typeof x==='boolean')return true;if(typeof x==='number')return Number.isFinite(x);if(typeof x==='string')return x.length<=400000;if(Array.isArray(x))return x.length<=5000&&x.every(y=>safe(y,d+1));if(!plain(x))return false;return Object.keys(x).length<=2000&&Object.entries(x).every(([k,v])=>!['__proto__','constructor','prototype'].includes(k)&&safe(v,d+1));};
  if(!safe(s))return false;
  if(s.pl.ownDeferred!==undefined&&(!plain(s.pl.ownDeferred)||Object.values(s.pl.ownDeferred).some(d=>!plain(d)||d.kind!=='fiscal'||d.form!=='vapz'||typeof d.name!=='string'||!Number.isFinite(d.amount)||d.amount<=0||typeof d.example!=='boolean'||!plain(d.native)||typeof d.native.statuut!=='string'||!(d.native.methode===null||Array.isArray(d.native.methode)&&d.native.methode.length===2&&d.native.methode.every(x=>typeof x==='string')))))return false;
  if(s.pl.goals.some(g=>g&&g.ownContextOnly&&(g.later!==true||g.soort!=='inkomen'||g.inkStart!=='nu')))return false;
  if(s.pl.ownPlanReceipt!==undefined&&(!plain(s.pl.ownPlanReceipt)||typeof s.pl.ownPlanReceipt.signature!=='string'||!Array.isArray(s.pl.ownPlanReceipt.goals)||s.pl.ownPlanReceipt.goals.some(d=>!plain(d)||typeof d.id!=='string'||!Number.isFinite(d.monthly))))return false;
  if(!Object.entries(s.k).every(([k,v])=>k==='statuut'?Array.isArray(v)&&v.every(x=>typeof x==='string'):['actEen','actVen'].includes(k)?plain(v):typeof v==='string'||typeof v==='boolean'||v===null))return false;
  const ids=new Set();
  for(const g of s.pl.goals){if(!plain(g)||!['groei','inkomen','iemand','ander'].includes(g.soort)||!['string','number'].includes(typeof g.id)||ids.has(String(g.id))||typeof g.naam!=='string'||g.naam.length>200)return false;ids.add(String(g.id));if(g.h!==null&&g.h!==undefined&&(!Number.isFinite(g.h)||g.h<0||g.h>110))return false;for(const k of ['mm','ee','eind','wensStart','inkTot'])if(g[k]!=null&&typeof g[k]!=='string'&&typeof g[k]!=='number')return false;}
  if(s.pl.fx!==undefined&&(!plain(s.pl.fx)||(s.pl.fx.forms!==undefined&&(!plain(s.pl.fx.forms)||Object.values(s.pl.fx.forms).some(f=>!plain(f))))))return false;
  if(s.pl.v26!==undefined&&!plain(s.pl.v26))return false;
  if(s.pl.klant!==undefined&&!plain(s.pl.klant))return false;
  for(const k of ['p49ctx','p49fis','quickReceipts'])if(s.pl[k]!==undefined&&(!plain(s.pl[k])||Object.values(s.pl[k]).some(x=>!plain(x))))return false;
  for(const x of Object.values(s.pl.p49ctx||{})){if(typeof x.naam!=='string')return false;for(const k of ['context','verkenning','gekozen','afgeleid'])if(x[k]!==undefined&&!plain(x[k]))return false;}
  if(s.fin.erv!==undefined&&!plain(s.fin.erv))return false;
  const nestedGoals=x=>{if(!x||typeof x!=='object')return true;for(const [k,v] of Object.entries(x)){if(k==='goals'&&(!Array.isArray(v)||v.some(g=>!plain(g))))return false;if(!nestedGoals(v))return false;}return true;};
  if(!nestedGoals(s.pl))return false;
  return true;
}

const lees = (storage, key) => { try { return storage.getItem(key); } catch (e) { return null; } };
const json = (raw) => { try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; } };
const saveHandoff = (storage, h) => { storage.setItem(H_PREFIX + h.transferId, JSON.stringify(h)); return true; };
function readHandoff(storage, id) {
  if (typeof id !== 'string' || !/^norte-[a-z]+-[a-z0-9]{4,40}$/.test(id)) return { ok: false, error: 'Ongeldige overdracht' };
  const h = json(lees(storage, H_PREFIX + id));
  if (!h) return { ok: false, error: 'Overdracht niet gevonden' };
  const v = validateHandoff(h);
  if (!v.ok) return v;
  if (h.transferId !== id || h.sig !== fnv32(JSON.stringify([h.doel, h.naam, h.ontvanger || null, h.statuut || null, h.gekozen]))) return { ok: false, error: 'Overdracht beschadigd' };
  return { ok: true, data: h };
}
const clearHandoff = (storage, id) => { try { storage.removeItem(H_PREFIX + id); } catch (e) { /* niets */ } };

/* Meerdere sleutels als één geheel: bij elke fout wordt alles teruggezet. */
function atomicWrite(storage, entries) {
  const backup = entries.map(([k]) => [k, lees(storage, k)]);
  try {
    for (const [k, v] of entries) storage.setItem(k, v);
    for (const [k, v] of entries) if (storage.getItem(k) !== v) throw Error('Controle na schrijven mislukt');
    return { ok: true };
  } catch (e) {
    for (const [k, v] of backup) { try { if (v === null) storage.removeItem(k); else storage.setItem(k, v); } catch (e2) { /* best effort */ } }
    return { ok: false, error: e.message || 'Opslag mislukt' };
  }
}

const readMeta = (storage, key = PLAN_SLEUTEL) => { const m = json(lees(storage, key + META_SUFFIX)); return m && m.schema === META_SCHEMA ? m : null; };
const readSnapshot = (storage, key = PLAN_SLEUTEL) => { const s = json(lees(storage, key)); return validSnapshot(s) ? s : null; };
/* Onderscheid: niets bewaard · leesbaar plan · onleesbare inhoud · opslag niet bereikbaar. */
function storageState(storage, key = PLAN_SLEUTEL) {
  let raw; try { raw = storage.getItem(key); } catch (e) { return { code: 'fout' }; }
  if (raw === null || raw === undefined) return { code: 'niets' };
  const s = readSnapshot({ getItem: () => raw }, key);
  return s ? { code: 'plan', snapshot: s, raw } : { code: 'onleesbaar', raw };
}
/* Elke geslaagde bewaring van de plancomponent verhoogt de revisie, zodat tabbladen, herladen en export elkaar niet stil overschrijven. */
function touchMeta(storage, key = PLAN_SLEUTEL, { now = Date.now(), rand } = {}) {
  const st = storageState(storage, key); if (st.code !== 'plan') return { ok: false, code: st.code };
  const meta = readMeta(storage, key) || { schema: META_SCHEMA, projectId: nieuwProjectId(rand), revisie: 0 }, ctl = fnv32(st.raw);
  if (meta.opslagControle === ctl) return { ok: true, meta, gewijzigd: false };
  const nieuw = Object.assign({}, meta, { revisie: (meta.revisie || 0) + 1, opslagControle: ctl, gewijzigdOp: new Date(now).toISOString() });
  const w = atomicWrite(storage, [[key + META_SUFFIX, JSON.stringify(nieuw)]]);
  return w.ok ? { ok: true, meta: nieuw, gewijzigd: true } : { ok: false, code: 'fout' };
}
const vulling = (s) => !!s && ((s.pl.goals || []).length > 0 || Object.keys(s.pl.ownDeferred||{}).length>0 || Object.values((s.pl.fx || {}).forms || {}).some((f) => f && f.on) || ['inkomen', 'uitgaven', 'sparen', 'beleggen', 'buffer', 'planMaand', 'planEen'].some((k) => s.fin && s.fin[k]));
const hasContent = vulling;
function planSummary(storage, key = PLAN_SLEUTEL) {
  const st = storageState(storage, key);
  if (st.code === 'fout' || st.code === 'onleesbaar') return { heeftPlan: null, doelen: [], code: st.code };
  const s = st.snapshot;
  if (!s) return { heeftPlan: false, doelen: [] };
  const doelen = s.pl.goals.filter((g) => !g.later||g.ownContextOnly).map((g) => (g.soort === 'iemand' ? 'sparen voor ' + g.naam : String(g.naam || 'doel').toLowerCase()));
  doelen.push(...Object.values(s.pl.ownDeferred||{}).map(x=>String(x.name||'Fiscale wens').toLowerCase()));
  return { heeftPlan: vulling(s), doelen };
}

const datum = (iso) => String(iso || '').slice(0, 10);
const bestandsnaam = (label, iso) => 'norte-plan-' + (String(label || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'verkenning') + '-' + datum(iso) + '.json';

function exportProject({ storage, key = PLAN_SLEUTEL, snapshot, label = '', component, now = Date.now(), rand }) {
  if (!snapshot || snapshot.v !== 1 || !snapshot.pl || !Array.isArray(snapshot.pl.goals)) return { ok: false, error: 'Geen plan om te bewaren' };
  const meta = readMeta(storage, key) || { schema: META_SCHEMA, projectId: nieuwProjectId(rand), revisie: 0 };
  const bewaardOp = new Date(now).toISOString(), inhoud = JSON.parse(JSON.stringify(snapshot));
  const file = { schema: PROJECT_SCHEMA, versie: VERSIE, projectId: meta.projectId, revisie: (meta.revisie || 0) + 1, label: String(label || '').slice(0, 60), bewaardOp, bron: { component: component || null, sleutel: key }, controle: fnv32(JSON.stringify(inhoud)), inhoud };
  const nieuweMeta = Object.assign({}, meta, { schema: META_SCHEMA, revisie: file.revisie, label: file.label, bewaardOp, controle: file.controle, opslagControle: meta.opslagControle || null });
  const w = atomicWrite(storage, [[key + META_SUFFIX, JSON.stringify(nieuweMeta)]]);
  if (!w.ok) return { ok: false, error: w.error };
  return { ok: true, fileName: bestandsnaam(file.label, bewaardOp), text: JSON.stringify(file), revisie: file.revisie, projectId: file.projectId };
}

function parseProjectFile(text) {
  const f = json(typeof text === 'string' && text.length < 8e6 ? text : null);
  if (!f || typeof f.schema !== 'string' || !/^norte-project\//.test(f.schema)) return { ok: false, code: 'ongeldig' };
  if (f.schema !== PROJECT_SCHEMA) return { ok: false, code: 'versie' };
  const s = f.inhoud;
  if (!validSnapshot(s) || typeof f.projectId !== 'string' || f.projectId.length>100 || !Number.isInteger(f.revisie) || f.revisie < 1) return { ok: false, code: 'ongeldig' };
  if (f.controle !== fnv32(JSON.stringify(s))) return { ok: false, code: 'beschadigd' };
  return { ok: true, file: f };
}

/* Wat betekent dit bestand voor wat nu in deze browser staat? Nooit stil overschrijven. */
function compareProject(storage, key, file) {
  const st = storageState(storage, key);
  if (st.code === 'fout') return { code: 'fout' };
  if (st.code === 'onleesbaar') return { code: 'keuze', onleesbaar: true, lokaleDoelen: 0 };
  const local = st.snapshot, meta = readMeta(storage, key);
  if (!vulling(local)) return { code: 'leeg' };
  if (meta && meta.projectId === file.projectId && meta.controle === file.controle && JSON.stringify(local) === JSON.stringify(file.inhoud)) return { code: 'zelfde' };
  return { code: 'keuze', zelfdeProject: !!meta && meta.projectId === file.projectId, lokaleRevisie: meta ? meta.revisie : null, bestandRevisie: file.revisie, lokaleDoelen: local.pl.goals.filter((g) => !g.later).length, bewaardOp: meta ? meta.bewaardOp : null };
}

function importProject({ storage, key = PLAN_SLEUTEL, file, now = Date.now(), rand }) {
  const checked=parseProjectFile(JSON.stringify(file)); if(!checked.ok)return checked;
  const ontvangst = { id: 'ontv-' + willekeurig(rand), op: new Date(now).toISOString() };
  const raw = JSON.stringify(file.inhoud), vorige = readMeta(storage, key);
  const meta = { schema: META_SCHEMA, projectId: file.projectId, revisie: Math.max(file.revisie, vorige ? (vorige.revisie || 0) + 1 : 0), label: file.label || '', bewaardOp: file.bewaardOp, controle: file.controle, opslagControle: fnv32(raw), ontvangst: Object.assign(ontvangst, { bestandRevisie: file.revisie }) };
  const w = atomicWrite(storage, [[key, raw], [key + META_SUFFIX, JSON.stringify(meta)]]);
  return w.ok ? { ok: true, ontvangst } : w;
}

/* ---------- retour naar de oorspronkelijke taak (kennis ↔ plan) ---------- */
function writeReturn(storage, { van, titel, href, y = 0, focus = null, invoer = null, now = Date.now() }) {
  if (!['kennis', 'simulatie'].includes(van) || typeof href !== 'string' || !/^\/(kennis|simulatie)\//.test(href)) return false;
  const k = invoer ? kennisIntent(invoer) : null;
  try { storage.setItem(RET_KEY, JSON.stringify({ van, titel: String(titel || '').slice(0, 120), href: href.slice(0, 400), y: Math.max(0, Math.round(+y || 0)), focus: typeof focus === 'string' ? focus.slice(0, 80) : null, invoer: k ? invoer : null, op: now })); return true; } catch (e) { return false; }
}
function markReturn(storage) { const r = json(lees(storage, RET_KEY)); if (!r) return false; r.terug = true; try { storage.setItem(RET_KEY, JSON.stringify(r)); return true; } catch (e) { return false; } }
function consumeReturn(storage) { const r = json(lees(storage, RET_KEY)); if (!r || !r.terug) return null; delete r.terug; try { storage.setItem(RET_KEY, JSON.stringify(r)); } catch (e) { /* niets */ } return r; }

/* Kennis-minisim → plan. Alleen wat de bezoeker zelf instelde in een plan-relevante oefening (tijd: maandbedrag, doelbedrag, termijn).
 * Voorbeeldwaarden, keuzes zoals 'Voorbeeldaanpak', kosten-/koopkrachtoefeningen en testscores gaan nooit mee. */
const KENNIS_VELD = { maand: ['maandinleg', 0.01, 100000], doel: ['doelbedrag', 1, 10000000], jaren: ['termijn', 1, 60] };
function kennisIntent(inv) {
  if (!inv || inv.bron !== 'kennis' || inv.sim !== 'tijd' || typeof inv.id !== 'string' || !/^kennis-[a-z0-9-]{1,60}$/.test(inv.id)) return null;
  const g = inv.gekozen || {}, out = { maandinleg: null, doelbedrag: null, termijn: null };
  for (const [k, x] of Object.entries(g)) { const d = KENNIS_VELD[k]; if (!d || !x || x.herkomst !== 'klant' || !Number.isFinite(x.waarde) || x.waarde < d[1] || x.waarde > d[2]) return null; out[d[0]] = x.waarde; }
  if (out.maandinleg !== null && out.doelbedrag !== null) return null;
  if (out.maandinleg === null && out.doelbedrag === null) return null;
  const vb = Object.fromEntries(Object.entries(inv.voorbeeld || {}).filter(([k, x]) => KENNIS_VELD[k] && x && Number.isFinite(x.waarde)).map(([k, x]) => [KENNIS_VELD[k][0], x.waarde]));
  const term = out.termijn !== null ? out.termijn : null;
  return { id: inv.id, sig: fnv32(JSON.stringify([inv.sim, inv.context || null, g])), bronContext: inv.context || null, artikel: String(inv.artikel || '').slice(0, 120), soort: 'groei', naam: NAMEN.groei, term: term === null ? null : { waarde: Math.floor(term), vereistGeboorte: false }, termVoorbeeld: term === null && vb.termijn ? vb.termijn : null,
    geld: { mm: out.maandinleg === null ? null : Math.floor(out.maandinleg), ee: null, eind: out.doelbedrag === null ? null : Math.floor(out.doelbedrag), wens: null, inkStart: null, inkTot: null }, gekozen:g, precisie:Object.entries(g).filter(([k,x])=>k!=='jaren'&&!Number.isInteger(x.waarde)).map(([k,x])=>({veld:k,label:k,van:x.waarde,naar:Math.floor(x.waarde)})), verkenning: {}, context: {} };
}
function readReturn(storage, { now = Date.now(), maxMs = 6 * 3600 * 1000 } = {}) {
  const r = json(lees(storage, RET_KEY));
  if (!r || !/^\/(kennis|simulatie)\//.test(r.href || '') || !(now - r.op < maxMs)) return null;
  return r;
}

function download(fileName, text, doc = globalThis.document) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = doc.createElement('a'); a.href = url; a.download = fileName; doc.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const NorteProject = Object.freeze({ VERSIE, HANDOFF_SCHEMA, PROJECT_SCHEMA, PLAN_SLEUTEL, DOELEN, NAMEN, simGetal, fnv32, nieuwOverdrachtId, nieuwProjectId, buildHandoff, validateHandoff, planIntent, saveHandoff, readHandoff, clearHandoff, atomicWrite, readMeta, readSnapshot, storageState, touchMeta, hasContent, planSummary, exportProject, parseProjectFile, compareProject, importProject, writeReturn, markReturn, consumeReturn, readReturn, kennisIntent, download });

if(!globalThis.NorteProject)globalThis.NorteProject=NorteProject;
})();
