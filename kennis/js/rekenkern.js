/* Norte · educatieve rekenkern (kandidaat 2026-11-02)
   Pedagogisch prototype. GEEN productieplanmotor, geen prognose, geen productvergelijking.
   Eén gedeelde set aannames voor alle lenzen (kosten, koopkracht, tijd), zodat verkenningen
   elkaar niet tegenspreken. Voortbouwend op learning-math.js (education-2026-11-01):
   dezelfde volgorde "eerst aangenomen groei, daarna jaarlijkse kosten over de waarde". */
const NorteRekenkern = Object.freeze({
  version: 'education-2026-11-02-v4',
  parserVersie: 'invoer-nl-BE-1',
  methode: [
    'Jaarlijkse stappen. Elk jaar: waarde × (1 + groei vóór kosten) × (1 − jaarlijkse kosten).',
    'Maandelijkse inleg wordt per jaar samengeteld en aan het einde van dat jaar toegevoegd. Vereenvoudiging: bij positieve groei iets lager, bij negatieve groei iets hoger dan echt maandelijks storten.',
    'Groei en kosten blijven elk jaar gelijk. Werkelijke rendementen schommelen en kunnen negatief zijn.',
    'Koopkracht: eindwaarde gedeeld door (1 + aangenomen inflatie) tot de macht het aantal jaren.',
    'Niet meegerekend: belastingen, premietaks, instap-, uitstap- of transactiekosten, valuta en wisselende rendementen.'
  ],
  grenzen: { start:[0,1000000], maand:[0,100000], jaren:[1,50], groei:[-20,20], kosten:[0,5], inflatie:[-5,15] },

  /* Ruwe invoerstrings → getallen, veldbewust (parser invoer-nl-BE-1).
     geld:    10000 · 10.000 · 10 000 · 10.000,50 · 10000,50 · € 10.000  → aanvaard
              10.50 · 10,000 · 10.00.0 · gemengde scheidingstekens       → notatiefout, nooit stil herschaald
     procent: 0,5 · 0.5 · 4 · 4% (beide decimaaltekens, geen duizendtallen)
     jaren:   alleen hele getallen
     Leeg blijft leeg (null), nooit een stille standaard. Ongeldig = NaN, met uitleg via uitleg(). */
  soort(k){ return ({ start:'geld', eenmalig:'geld', maand:'geld', doelbedrag:'geld', storting:'geld', jaarbijdrage:'geld', jaren:'jaren' })[k] || 'procent'; },
  lees(raw, soort){
    if (raw === undefined || raw === null) return { v:null };
    let s = String(raw).trim();
    if (s === '') return { v:null };
    let neg = false;
    if (soort === 'geld') s = s.replace(/^€\s*/, '').replace(/\s*€$/, '').trim();
    if (soort === 'procent') s = s.replace(/\s*%$/, '').trim();
    if (s.startsWith('-')) { neg = true; s = s.slice(1).trim(); }
    const fout = uitleg => ({ v:NaN, uitleg });
    let v;
    if (soort === 'geld') {
      const seps = s.match(/[.   ]/g);
      if (/^\d+$/.test(s)) v = Number(s);
      else if (/^\d+,\d{1,2}$/.test(s)) v = Number(s.replace(',', '.'));
      else if (/^\d{1,3}([.   ]\d{3})+(,\d{1,2})?$/.test(s) && new Set(seps).size === 1) v = Number(s.replace(/[.   ]/g, '').replace(',', '.'));
      else if (/^\d+\.\d{1,2}$/.test(s)) return fout('Een punt gebruiken we alleen voor duizendtallen (10.000). Voor cent gebruikt u een komma (10,50).');
      else if (/^\d+,\d{3,}$/.test(s) || /^\d{1,3}(,\d{3})+$/.test(s)) return fout('Meer dan twee cijfers na de komma. Bedoelt u een bedrag in duizendtallen? Schrijf dan 10000 of 10.000.');
      else if (/^[\d.,   ]+$/.test(s)) return fout('Deze notatie is niet eenduidig. Schrijf het bedrag als 10000, 10.000 of 10.000,50.');
      else return fout('Geen bedrag. Schrijf bijvoorbeeld 10000 of 10.000.');
    } else if (soort === 'jaren') {
      if (/^\d+$/.test(s)) v = Number(s);
      else if (/^\d+[.,]\d+$/.test(s)) return fout('Alleen hele jaren.');
      else return fout('Geen getal. Schrijf bijvoorbeeld 20.');
    } else {
      if (/^\d+\.\d{3}$/.test(s)) return fout('Niet eenduidig: bedoelt u een duizendtal of een decimaal? Schrijf een percentage als 1 of 1,5.');
      if (/^\d+([.,]\d+)?$/.test(s)) v = Number(s.replace(',', '.'));
      else if (/^[\d., ]+$/.test(s)) return fout('Een percentage schrijft u als 4 of 0,5.');
      else return fout('Geen getal. Schrijf bijvoorbeeld 4 of 0,5.');
    }
    return { v: neg ? -v : v };
  },
  parse(raw){ const out = {}; for (const k of Object.keys(raw || {})) out[k] = this.lees(raw[k], this.soort(k)).v; return out; },
  uitleg(raw){ const out = {}; for (const k of Object.keys(raw || {})) { const r = this.lees(raw[k], this.soort(k)); if (r.uitleg) out[k] = r.uitleg; } return out; },
  valideer(x, velden){
    const fouten = {};
    for (const k of velden){
      const v = x[k], g = this.grenzen[k] || this.grenzen[k.replace(/[AB]$/,'')];
      if (v === null) { fouten[k] = 'leeg'; continue; }
      if (Number.isNaN(v)) { fouten[k] = 'geen getal'; continue; }
      if (g && (v < g[0] || v > g[1])) fouten[k] = `tussen ${g[0]} en ${g[1]}`;
      if (k === 'jaren' && !Number.isInteger(v)) fouten[k] = 'hele jaren';
    }
    if (velden.includes('start') && velden.includes('maand') && !fouten.start && !fouten.maand && x.start === 0 && x.maand === 0) fouten.maand = 'vul een inleg in';
    return fouten;
  },
  pad({start, maand, jaren, groei, kosten}){
    const out = [start]; let v = start;
    for (let j = 1; j <= jaren; j++){ v = v * (1 + groei/100) * (1 - kosten/100) + maand*12; out.push(v); }
    return out;
  },
  ingelegd({start, maand, jaren}){ return Array.from({length: jaren+1}, (_, j) => start + maand*12*j); },
  koopkracht(pad, inflatie){ return pad.map((v, j) => v / Math.pow(1 + inflatie/100, j)); },
  /* Spreiding: effect op het geheel als één positie daalt; de rest blijft in dit voorbeeld gelijk. */
  concentratie(gewicht, daling){ return -gewicht * daling / 100; },
  /* Pensioensparen, inkomstenjaar 2026 (Wikifin, gecontroleerd 2/11/2026). Geen persoonlijke fiscale afrekening. */
  pensioensparen: {
    jaar: 2026,
    formules: { basis:{ plafond:1050, tarief:30, label:'Basisplafond' }, verhoogd:{ plafond:1350, tarief:25, label:'Verhoogd plafond' } },
    /* Geen stil aftoppen en geen stil wisselen van formule: boven het gekozen plafond is er geen geldige uitkomst. */
    bereken(formule, storting){
      const f = this.formules[formule];
      if (!f) return { geldig:false, reden:'formule' };
      if (storting === null || storting === undefined) return { geldig:false, reden:'leeg' };
      if (!Number.isFinite(storting)) return { geldig:false, reden:'geen getal' };
      if (storting < 0) return { geldig:false, reden:'negatief' };
      if (storting === 0) return { geldig:false, reden:'nul' };
      if (storting > f.plafond) return { geldig:false, reden:'boven plafond', plafond:f.plafond, formule };
      const vermindering = Math.round(storting * f.tarief / 100);
      return { geldig:true, telt:storting, vermindering, nettoInspanning: storting - vermindering, tarief:f.tarief, plafond:f.plafond };
    }
  }
});
if (typeof module !== 'undefined') module.exports = NorteRekenkern;
