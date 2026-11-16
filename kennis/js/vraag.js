/* Ronde 72 · Elk artikel beantwoordt in de eerste twee seconden de vraag die ernaar verwijst.
   Titel = de vraag. Eerste zin van de inleiding = het antwoord. De rest van het artikel blijft ongewijzigd.
   Eén nieuw artikel: 'termijn' (waarom het risico afbouwt naar uw doel), waar de flow tot nu toe naar een rekenartikel wees. */
(function () {
  const I = window.NORTE_INHOUD; if (!I || !I.artikels) return;
  const A = (id) => I.artikels.find((a) => a.id === id);
  const zet = (id, o) => { const a = A(id); if (a) Object.assign(a, o); };

  zet('rendement-simulatie', {
    titel: 'Met welk rendement rekent de simulatie?',
    inleiding: 'Voor aandelen telt Norte twee ramingen even zwaar mee. De Horizon-enquête bundelt de verwachtingen van beleggingsprofessionals. Aswath Damodaran, professor aan NYU Stern, leidt zijn raming af uit de beurskoersen en verwachte uitkeringen. Daarmee rekent de simulatie voor aandelen met 6,40 procent per jaar vóór kosten en belastingen.'
  });
  zet('aannames', {
    titel: 'Hoe rekent uw plan?',
    inleiding: 'Met vaste verwachte opbrengsten: 4,31 procent per jaar na inflatie voor aandelen, 1 procent voor obligaties en 0,86 procent rente voor sparen. Uw aanpak bepaalt de mix en het marktverloop bevat dalingen. Het is een berekening, geen voorspelling.'
  });
  zet('daling', {
    titel: 'Wat als de markt daalt? Dalingen en herstel',
    inleiding: 'Een daling verlaagt meteen uw vermogen. Wie niet verkoopt, geeft de markt tijd om te herstellen, maar dat kan jaren duren: na een daling van 20 procent is 25 procent stijging nodig om terug te komen.'
  });
  zet('koopkracht', {
    titel: 'Koopkracht: wat is uw geld later nog waard?',
    inleiding: 'Minder dan het bedrag zegt. Stijgen de prijzen 2 procent per jaar, dan koopt € 10.000 binnen twintig jaar nog ongeveer wat vandaag € 6.700 koopt. Daarom toont uw simulatie de lijn ‘Koopkracht’: wat erboven ligt, is echte groei.'
  });
  zet('kosten', {
    titel: 'Kosten: wat gaat er nog af van uw opbrengst?',
    inleiding: 'Van het bedrag in uw simulatie gaan nog kosten en belastingen af. Dit stuk gaat over de kosten: bij het begin, elk jaar en bij het einde. Vooral de jaarlijkse kosten wegen zwaar, omdat ze elk jaar opnieuw doorwerken.'
  });
  zet('pensioensparen', {
    inleiding: 'U krijgt 30 procent belastingvermindering op een storting tot € 1.050, of 25 procent tot € 1.350. In ruil blijft het geld in principe tot uw zestigste in het stelsel en volgt er een eindbelasting. Pensioensparen is de bekendste vorm van fiscaal sparen.'
  });
  zet('langetermijnsparen', {
    inleiding: '30 procent belastingvermindering op uw storting, binnen een grens die van uw beroepsinkomen afhangt. Of u er echt voordeel uit haalt, hangt ook af van uw woonlening.'
  });
  zet('sparen-of-beleggen', {
    inleiding: 'Dat hangt af van wanneer u het geld nodig hebt. Eerst een buffer op een spaarrekening. Geld voor de komende jaren blijft daar ook. Geld dat lang kan blijven staan, kan beleggen.'
  });
  zet('tijd', {
    inleiding: 'Omdat opbrengst zelf weer opbrengt. Hoe langer uw geld belegd blijft, hoe groter dat effect. Daarom weegt een jaar vroeger beginnen zwaarder dan een jaar langer inleggen aan het einde.'
  });
  zet('kind', {
    inleiding: 'Twee keuzes wegen zwaarder dan het product: op wiens naam staat het geld, en wanneer moet het er zijn? Op naam van het kind is het van het kind, en vanaf achttien beslist het zelf.'
  });
  zet('verpakking', {
    inleiding: 'Het verschil zit zelden in waarin u belegt, maar in de afspraken eromheen: wat u precies bezit, wat een verzekering extra kan regelen en wat daar tegenover staat.'
  });
  const opl = A('van-plan-naar-oplossing');
  if (opl) {
    opl.titel = 'Van plan naar oplossing: wat doet een makelaar?';
    opl.inleiding = 'Een onafhankelijk makelaar zoekt bij meerdere verzekeraars en beheerders welke oplossing bij uw plan past. Hier leest u hoe hij vergoed wordt en hoe een eerste gesprek verloopt.';
    opl.tekst = String(opl.tekst).replace('<p>Of een eerste kennismaking iets kost, verschilt per kantoor. Bij de meeste kantoren is ze vrijblijvend. Uw kantoor zegt het u bij de afspraak.</p>', '<p>Het eerste gesprek is kosteloos.</p>')
      .replace(/Daarna bekijkt hij welke oplossingen passen/, 'Daarna bespreekt u welke oplossingen in aanmerking komen')
      .replace(/U beslist niets in dat gesprek: u krijgt een voorstel en tijd om het te lezen\./, 'U beslist niets in dat gesprek. U spreekt af wat verder wordt uitgewerkt; een voorstel volgt nadien, met tijd om het te lezen.');
  }

  if (!A('termijn')) I.artikels.push({
    id: 'termijn', hoofdstuk: 'risico', soort: 'uitleg', keuzemoment: [],
    titel: 'Waarom bouwen we het risico af naar uw doel?',
    inleiding: 'Omdat een daling tijd nodig heeft om te herstellen. Is uw doel ver weg, dan past meer schommeling. Komt het dichterbij, dan gaat elk jaar een deel van uw geld naar rustigere beleggingen.',
    kernidee: 'Wie het risico afbouwt, verkleint de kans dat een daling vlak voor het doel zwaar doorweegt. Daar staat meestal een lager verwacht rendement tegenover.',
    beeld: null,
    tekst: `
<h2>Hoeveel schommeling bij welke termijn</h2>
<p>De simulatie laat per termijn een hoogste profiel toe:</p>
<ul>
<li>nog 25 jaar of meer: alle profielen kunnen;</li>
<li>tussen 15 en 25 jaar: hoogstens dynamisch;</li>
<li>tussen 8 en 15 jaar: hoogstens neutraal;</li>
<li>tussen 3 en 8 jaar: hoogstens defensief;</li>
<li>de laatste drie jaar: op de spaarrekening.</li>
</ul>
<h2>Waarom afbouwen</h2>
<p>Na een daling van 20 procent is 25 procent stijging nodig om terug te komen. Ver van uw doel is daar tijd voor. Vlak voor uw doel niet: dan zou u het geld nodig hebben op een laag punt.</p>
<h2>Wat u ervan merkt</h2>
<p>De lijn stijgt vlak voor uw doel rustiger. U ruilt een stuk verwacht rendement in voor meer zekerheid op het moment dat u het geld nodig hebt.</p>
<h2>Kiest u toch meer schommeling?</h2>
<p>Een hoger profiel kan een hoger bedrag tonen. Maar een daling kort voor uw doel krijgt dan weinig tijd om te herstellen. Twijfelt u, bespreek het met een financieel adviseur.</p>
`,
    bronnen: [
      { label: 'Norte-rekenkern: hoogste profiel per termijn, zoals de simulatie rekent', url: null },
      { label: 'Algemene uitleg, geen persoonlijk advies.', url: null }
    ],
    vervolg: { type: 'lezen', id: 'daling', zin: 'Wat doet een daling precies, en hoe lang duurt herstel?' }
  });
})();
