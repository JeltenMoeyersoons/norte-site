/* Norte · Sparen en beleggen begrijpen — inhoudsmodel v2 (kandidaat 2026-11-02, herstelronde na klantenpaneltoets 1)
   Eén artikel per onderwerp. Elk artikel: hoofdvraag (titel), kern, concreet voorbeeld of stappen, eindpunt (doe).
   Bronnen: alleen bronnen waarvan de relevante tekst in deze ronde werkelijk gelezen werd (zie BRONNEN-GELEZEN.md).
   status: 'uitgewerkt' · 'concept' · 'actueel' (actueel te redigeren, met peildatum). */
const NorteInhoud = (() => {
const V = '2026-11-02-v8';
const SRC = {
  wfKostenAandelen:['Wikifin — Welke kosten heb je bij het beleggen in aandelen?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/aandeel/welke-kosten-heb-je-bij-het-beleggen-aandelen'],
  wfKostenFonds:['Wikifin — Hoeveel kost het om te investeren in een fonds?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/beleggingsfonds/hoeveel-kost-het-om-te-investeren-een'],
  wfTracker:['Wikifin — Hoe investeer je in trackers en wat kost dat?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/tracker/hoe-investeer-je-trackers-en-wat-kost-dat'],
  wfObligatieKosten:['Wikifin — Welke kosten betaal je bij een obligatie?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/producten-op-lange-termijn/obligatie/welke-kosten-betaal-je'],
  wfSpaar:['Wikifin — Spaarrekening','https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/spaarrekening'],
  wfSpaarWat:['Wikifin — Wat is een spaarrekening?','https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/wat-een-spaarrekening'],
  belfiusSpaar:['Belfius — Gereglementeerde spaarrekeningen (plafond inkomstenjaar 2026)','https://www.belfius.be/retail/nl/producten/sparen-beleggen/sparen/index.aspx'],
  wfTakVerschil:['Wikifin — Verschillen tussen tak 21 en tak 23','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/wat-zijn-de-verschillen-tussen-tak-21'],
  wfTak23:['Wikifin — Wat is tak 23?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-23/wat-tak-23'],
  wfLevenKosten:['Wikifin — Kosten en belastingen bij een levensverzekering','https://www.wikifin.be/nl/themas/verzekeren/levens-en-overlijdensverzekeringen/kosten-en-belastingen'],
  wfGarantie:['Wikifin — Wat gebeurt er als mijn verzekeraar failliet gaat?','https://www.wikifin.be/nl/budget-betalen-lenen-en-verzekeren/verzekeren/familie/de-levens-en-overlijdensverzekering/wat'],
  wfTak21Risico:['Wikifin — Risico\'s en opbrengsten van een tak 21-spaarverzekering','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-21/wat-zijn-de-0'],
  wfPensioenBelast:['Wikifin — Hoe wordt je pensioensparen belast?','https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/hoe-wordt-je-pensioensparen-belast'],
  wfOverlijden:['Wikifin — Wat is een overlijdensverzekering?','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/wat-een-overlijdensverzekering'],
  wfPensioen:['Wikifin — Pensioensparen','https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/belastingverminderingen/pensioensparen'],
  fodMeerwaarde:['FOD Financiën — Meerwaardebelasting','https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting'],
  belfiusMeerwaarde:['Belfius — Meerwaardebelasting (stand na de stemming)','https://www.belfius.be/corporate/NL/aan-uw-zijde/meerwaardebelasting/index.aspx'],
  kpmgMeerwaarde:['KPMG — Meerwaardebelasting goedgekeurd door het parlement','https://kpmg.com/be/nl/insights/my-tax-compass-de-trends-die-op-uw-fiscale-radar-moeten-staan/people-services-updates/meerwaardebelasting-goedgekeurd-door-het-parlement.html'],
  ecb:['ECB — Monetary policy strategy (2% op middellange termijn)','https://www.ecb.europa.eu/mopo/strategy/html/index.en.html'],
  rekenkamer:['Algemene Rekenkamer — Rapport Kredietcrisis 2008/2009 (Tweede Kamer 31 941, nr. 2)','https://zoek.officielebekendmakingen.nl/kst-31941-2.pdf'],
  odlyzkoPT:['A. Odlyzko — Isaac Newton and the perils of the financial South Sea (Physics Today, 2020)','https://physicstoday.aip.org/features/isaac-newton-and-the-perils-of-the-financial-south-sea'],
  bloomberg:['Bloomberg — Nikkei overtakes 1989 high (22 februari 2024)','https://www.bloomberg.com/news/articles/2024-02-22/nikkei-225-heads-to-close-above-record-high-reached-in-1989'],
  buffettBrief:['Berkshire Hathaway — Brief aan de aandeelhouders over 2017, p. 12 (primaire bron)','https://www.berkshirehathaway.com/letters/2017ltr.pdf'],
  buffett:['Conversable Economist — Buffett\'s bet, 10 years later (citeert de brief)','https://conversableeconomist.com/2018/05/07/index-funds-vs-hedge-funds-buffetts-bet-10-years-later/'],
  kamerMeerwaarde:['Kamer — Wetsontwerp meerwaardebelasting op financiële activa, aangenomen tekst (DOC 56 1244/008, art. 4 en 10)','https://www.dekamer.be/FLWB/PDF/56/1244/56K1244008.pdf'],
  kamerFiche:['Kamer — Dossierfiche 56K1244 (wet van 6 april 2026, BS 21 april 2026)','https://www.dekamer.be/flwb/html/56/N/56K1244.html'],
  asml:['ASML — About ASML','https://www.asml.com/en/company/about-asml']
};
const families = [
  { id:'basis', naam:'De bouwstenen', intro:'Wat u koopt als u spaart of belegt, in gewone woorden.' },
  { id:'principes', naam:'Principes die tellen', intro:'Spreiding, tijd, kosten en risico. Weinig regels, veel gevolgen.' },
  { id:'sparen', naam:'Sparen, rente en inflatie', intro:'Wat uw spaargeld doet, en wat het niet doet.' },
  { id:'verzekering', naam:'Beleggen via een verzekering', intro:'Tak 21 en tak 23: dezelfde familie, ander risico.' },
  { id:'fiscaal', naam:'Belasting en voorwaarden', intro:'Fiscale voordelen bestaan, maar altijd met voorwaarden.' },
  { id:'rendement', naam:'Rendement en aannames', intro:'Een berekening lezen zonder ze als belofte te geloven.' },
  { id:'verhalen', naam:'Verhalen uit de geschiedenis', intro:'Echte gebeurtenissen met bron, en één duidelijk fictief ontwerpverhaal.' },
  { id:'bedrijven', naam:'Bedrijven en actualiteit', intro:'Wat er achter een aandeel of een index zit.' },
  { id:'doelen', naam:'Uw eigen situatie', intro:'Optionele verdieping voor uzelf. Geen vragenlijst, niets wordt doorgestuurd.' }
];
const A = {};
const art = o => { A[o.id] = Object.assign({ versie:V, status:'concept', related:[], sources:[] }, o); };
const T = rows => `<table class="compare"><thead><tr>${rows[0].map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

/* ── De bouwstenen ─────────────────────────────────────────── */
art({ id:'sparen-of-beleggen', fam:'basis', fmt:'Basis', status:'uitgewerkt',
  title:'Sparen of beleggen: welk geld hoort waar?', lead:'Bij sparen zet u geld bij een bank tegen een rente. Bij beleggen wordt u mede-eigenaar of schuldeiser en draagt u een deel van het risico.',
  kern:'Geld dat u binnenkort nodig heeft, hoort niet af te hangen van de beurs. Geld dat jaren kan blijven staan, kan dat wel.',
  predict:{ q:'U heeft over één jaar € 8.000 nodig voor een verbouwing. Waar zou u dat geld zetten?', opts:[['Op een spaarrekening','Dan staat het klaar en schommelt het niet. De rente is wellicht lager dan wat beleggen op lange termijn kan opbrengen, maar u loopt niet het risico dat de beurs net dan lager staat.'],['In een belegging, want die brengt op termijn meer op','Op lange termijn kan dat. Maar één jaar is kort: als de beurs in dat jaar daalt, heeft u minder dan € 8.000 wanneer u het nodig heeft.']] },
  body:[['Twee rollen voor uw geld','<p>Op een spaarrekening ontvangt u rente volgens de voorwaarden van de bank, en is uw geld beschikbaar. Bij beleggen koopt u aandelen, obligaties of een fonds. De waarde kan stijgen en dalen; u kunt minder terugkrijgen dan u inlegde.</p>']],
  box:{ type:'steps', label:'In drie stappen', title:'Uw geld ordenen', items:['Wat heeft u binnen twee à drie jaar nodig? Dat hoort bij sparen.','Wat kan vijf jaar of langer blijven staan? Daar kan beleggen een rol spelen.','Hoeveel schommeling kunt u verdragen zonder te moeten verkopen? Dat bepaalt hoeveel risico past.'] },
  kenner:'<p>Het onderscheid is geen zwart-wit. Een spaarrekening heeft ook een risico: koopkrachtverlies als de rente onder de inflatie blijft. Een kortlopende obligatie schommelt weinig. Bekijk daarom drie assen tegelijk: beschikbaarheid, waardeschommeling en verwacht rendement, elk vóór én na kosten.</p>',
  doe:{ tekst:'Zet uw geld in gedachten in twee kolommen: "binnenkort nodig" en "kan lang blijven staan". Alleen de tweede kolom komt in aanmerking om te beleggen.', href:'#a-buffer', label:'Hoeveel hoort in de eerste kolom?' },
  lens:'tijd', related:['buffer','aandelen','obligaties','inflatie'], sources:[SRC.wfSpaarWat] });

art({ id:'aandelen', fam:'basis', fmt:'Basis', status:'uitgewerkt',
  title:'Een aandeel: wat koopt u eigenlijk?', lead:'Met een aandeel bezit u een klein deel van een onderneming. U deelt in de groei, maar ook in de tegenslag.',
  kern:'Een goed bedrijf is niet automatisch een goede belegging tegen elke prijs.',
  body:[['Twee bronnen van opbrengst','<p>Een bedrijf kan een deel van de winst uitkeren als dividend. De beurskoers kan stijgen. Beide zijn onzeker: een bedrijf kan het dividend schrappen en de koers kan fors dalen.</p>'],
        ['Kosten bij elke aan- en verkoop','<p>Op de beurs betaalt u makelaarsloon, vaak bewaarloon en de beurstaks. Volgens Wikifin is de beurstaks op bestaande aandelen 0,35%: € 35 op een aankoop van € 10.000.</p>']],
  box:{ type:'voorbeeld', label:'Voorbeeld', title:'Hetzelfde bedrijf, twee prijzen', text:'Twee beleggers kopen hetzelfde aandeel. De ene betaalt € 50, de andere € 80 tijdens een hype. Het bedrijf groeit voor beiden precies even goed. Toch heeft de tweede belegger veel meer groei nodig om hetzelfde rendement te halen.' },
  kenner:'<p>Op lange termijn bestaat een aandelenrendement uit dividend, winstgroei en een verandering van de waardering (de prijs die beleggers voor één euro winst betalen). Die laatste kan jaren in uw voordeel of nadeel werken; zie het Nikkei-verhaal. Wie verwachtingen bouwt, bekijkt die drie delen apart.</p>',
  doe:{ tekst:'Kijk bij een aandeel dat u aanspreekt hoeveel het van uw totale vermogen zou worden. Is dat meer dan u kwijt zou willen raken?', href:'#verkennen-spreiding', label:'Bekijk het gewicht van één positie' },
  lens:'spreiding', related:['spreiding','asml','nikkei','fondsen-etf'], sources:[SRC.wfKostenAandelen] });

art({ id:'obligaties', fam:'basis', fmt:'Basis', status:'uitgewerkt',
  title:'Een obligatie: geld lenen met afspraken', lead:'Met een obligatie leent u geld aan een overheid of bedrijf. Daar staan afspraken over rente en terugbetaling tegenover.',
  kern:'Een obligatie is een lening met voorwaarden. Vóór de einddatum kan de verkoopwaarde schommelen.',
  body:[['Wat u afspreekt','<p>Een obligatie heeft een einddatum en meestal een vaste rentevergoeding, de coupon. Als de uitgever in betalingsproblemen komt, kunt u minder terugkrijgen.</p>'],
        ['Een fonds is geen lening','<p>Een obligatiefonds koopt en verkoopt voortdurend obligaties. Het heeft daardoor geen vaste einduitkomst, zoals één lening die volgens afspraak wordt terugbetaald.</p>']],
  box:{ type:'steps', label:'Wat er gebeurt als de rente stijgt', title:'Waarom een "veilige" obligatie toch kan dalen', items:['U koopt een obligatie met 2% rente.','De marktrente stijgt; nieuwe obligaties geven 4%.','Niemand wil uw 2%-obligatie nog tegen de volle prijs. Wie vóór de einddatum verkoopt, krijgt minder.','Houdt u ze tot de einddatum en betaalt de uitgever terug, dan krijgt u de afgesproken terugbetaling.'] },
  kenner:'<p>Rentegevoeligheid (duration) bepaalt hoe sterk de prijs reageert op een renteverandering: hoe langer de looptijd, hoe groter het effect. Voor een verwachting van een obligatieportefeuille tellen ook kredietrisico, valuta en herbelegging. Bij aankoop op de secundaire markt rekent de bank makelaarsloon aan; dat verschilt per instelling.</p>',
  doe:{ tekst:'Vraag bij elke obligatie of elk obligatiefonds drie dingen: wie leent het geld, tot wanneer, en wat gebeurt er als u vroeger wilt verkopen?', href:'#k-rendement', label:'Waarom een rentecurve geen rendement is' },
  related:['rendement','rente','fondsen-etf'], sources:[SRC.wfObligatieKosten] });

art({ id:'fondsen-etf', fam:'basis', fmt:'Basis', status:'uitgewerkt',
  title:'Fondsen en ETF\'s: wat zit er in de verpakking?', lead:'Een fonds bundelt het geld van veel beleggers. Een ETF of tracker is een fonds dat op de beurs verhandeld wordt, vaak met een index als leidraad.',
  kern:'Het woord "fonds" zegt niets over spreiding. De inhoud en de kosten beslissen.',
  predict:{ q:'Een fonds draagt de naam "Wereld Technologie". Hoe gespreid is het?', opts:[['Breed: het belegt in de hele wereld','Het kan in veel landen beleggen, maar wel in één sector. Daalt technologie wereldwijd, dan daalt het hele fonds.'],['Beperkt: het hangt af van één sector','Juist dat is de vraag die u stelt: één sector, hoeveel landen ook. Kijk naar het gewicht van de grootste posities.']] },
  body:[['Actief of volgend','<p>Een actief fonds probeert met keuzes beter te doen dan de markt. Een indexvolgend fonds of tracker probeert een index zo goed mogelijk te volgen, meestal met lagere lopende kosten. Geen van beide garandeert een resultaat.</p>'],
        ['Kosten die erbij komen','<p>Wikifin noemt onder meer instap- en uitstapkosten, lopende kosten, beurstaks bij sommige fondsen en bewaarloon op uw effectenrekening.</p>']],
  box:{ type:'tip', label:'Checklist', title:'Drie vragen bij elk fonds', items:['Wat zit erin, en hoe zwaar wegen de grootste posities?','Wat kost het per jaar, en wat komt erbij bij aankoop en verkoop?','Welk risico vermeldt het essentiële-informatiedocument?'] },
  kenner:'<p>Bij trackers verschilt de replicatie (fysiek of synthetisch), de behandeling van dividenden (uitkerend of kapitaliserend) en daardoor de fiscale behandeling en de beurstaks. Een lage lopende kost is niet de totale kost; zie "Wat vertelt de lopende kost u niet?".</p>',
  doe:{ tekst:'Leg het essentiële-informatiedocument van een fonds naast de drie vragen hierboven. Kunt u ze niet beantwoorden, dan is dat zelf een antwoord.', href:'#k-kosten', label:'Welke kosten u nog moet optellen' },
  lens:'kosten', related:['kosten','fonds-of-tak23','spreiding','wereldindex'], sources:[SRC.wfKostenFonds, SRC.wfTracker] });

/* ── Principes ─────────────────────────────────────────────── */
art({ id:'spreiding', fam:'principes', fmt:'Principe', status:'uitgewerkt',
  title:'Spreiding: waar bent u van afhankelijk?', lead:'Spreiden betekent: niet alles laten afhangen van één bedrijf, sector, land of moment.',
  kern:'Het aantal namen zegt weinig. Hun gewicht en hun gedeelde afhankelijkheid zeggen veel.',
  predict:{ q:'U bezit aandelen van tien banken. Hoe gespreid bent u?', opts:[['Goed: tien verschillende namen','Tien namen voelt als spreiding, maar het zijn tien banken. In 2008 daalden veel banken tegelijk.'],['Beperkt: het blijft één sector','Precies daar zit het risico: tien namen met dezelfde afhankelijkheid. Spreiding gaat over verschillende soorten risico.']] },
  body:[['Gewicht weegt zwaarder dan aantal','<p>Is één positie de helft van uw vermogen, dan bepaalt die positie grotendeels uw resultaat, hoeveel andere namen u ook heeft.</p>'],
        ['Spreiding heeft grenzen','<p>In een crisis kunnen veel beleggingen tegelijk dalen. Spreiding beperkt de schade van één tegenvaller, maar voorkomt geen daling van de hele markt.</p>']],
  box:{ type:'steps', label:'Vier lagen', title:'Waarover u kunt spreiden', items:['Over bedrijven: niet één naam.','Over sectoren en landen: niet één economie.','Over soorten beleggingen: aandelen, obligaties, spaargeld.','Over de tijd: niet alles op één moment instappen.'] },
  kenner:'<p>Wat telt is correlatie: hoe sterk beleggingen samen bewegen. Die is niet stabiel en stijgt vaak net in een crisis. Spreiding in de tijd (gespreid instappen) verlaagt het instaprisico, niet het marktrisico zelf.</p>',
  doe:{ tekst:'Leg vooraf vast hoeveel één belegging maximaal van uw vermogen mag zijn, en bekijk wat een daling van die positie met het geheel doet.', href:'#verkennen-spreiding', label:'Bekijk het gewicht van één positie' },
  lens:'spreiding', related:['fortis','newton','fondsen-etf','risico-horizon'], sources:[SRC.rekenkamer] });

art({ id:'risico-horizon', fam:'principes', fmt:'Principe', status:'uitgewerkt',
  title:'Risico en tijd: kunt u een daling uitzitten?', lead:'Schommelingen horen bij beleggen. De vraag is of u ze kunt uitzitten, en wat u daarvoor in de hand heeft.',
  kern:'Een daling is een echt waardeverlies. Of het uw plan raakt, hangt af van wanneer u het geld nodig heeft.',
  body:[['Een daling is een verlies, ook zonder te verkopen','<p>Daalt uw belegging 30%, dan is uw vermogen op dat moment 30% minder waard. Herstel is mogelijk, maar niet gegarandeerd en niet op een vaste termijn. Wie net op dat moment moet verkopen, maakt het verlies definitief.</p>'],
        ['Wat u wél in de hand heeft','<p>U kunt de markt niet sturen, wel de omstandigheden waarin een daling u treft.</p>']],
  box:{ type:'steps', label:'Handelingsruimte', title:'Vier dingen die een daling minder schadelijk maken', items:['Een buffer, zodat u niet hoeft te verkopen.','Een termijn die past bij het risico: geld voor binnenkort niet in aandelen.','Spreiding, zodat één tegenvaller niet alles bepaalt.','Een plan dat u vooraf maakt, niet tijdens de paniek.'] },
  kenner:'<p>Een illustratieve daling is geen maximale verliesgrens: historische dalingen tonen wat gebeurd is, niet wat kan gebeuren. Een lange horizon verkleint niet automatisch het risico; het Nikkei-verhaal toont dat herstel decennia kan duren voor één markt. In een plan horen daarom zowel de horizon, de ruimte om te wachten als een bewuste keuze voor het risico.</p>',
  doe:{ tekst:'Stel uzelf de vraag: als mijn belegging volgend jaar een derde minder waard is, moet ik dan iets verkopen? Zo ja, dan is de buffer of de termijn de eerste werf.', href:'#a-buffer', label:'Uw buffer bepalen' },
  related:['nikkei','buffer','gemiddelde','spreiding'] });

art({ id:'samengestelde-groei', fam:'principes', fmt:'Principe', status:'uitgewerkt',
  title:'Samengestelde groei: waarom tijd zo zwaar weegt', lead:'Wat erbij komt, kan zelf weer groeien. Daarom telt de tijd zo zwaar mee.',
  kern:'Samengestelde groei werkt langzaam en dan snel. Hetzelfde mechanisme werkt op kosten en inflatie, en ook bij verliezen.',
  predict:{ q:'Wat weegt zwaarder: tien jaar langer beleggen of 20% meer inleggen per maand?', opts:[['Meer inleggen','Meer inleggen helpt rechtstreeks. Maar tien jaar extra geeft de groei op de groei veel meer tijd; in het rekenvoorbeeld is dat effect meestal groter.'],['Langer beleggen','In het rekenvoorbeeld met een positieve groeiaanname is dat meestal zo, omdat elke extra jaar groeit op alles wat er al staat. Bij tegenvallende jaren werkt hetzelfde mechanisme in uw nadeel.']] },
  body:[['Groei op groei','<p>Groeit iets 4% per jaar, dan groeit het tweede jaar ook de winst van het eerste jaar mee. Over twintig jaar maakt dat een groot verschil, zolang die groei er is.</p>'],
        ['Hetzelfde mechanisme werkt tegen u','<p>Jaarlijkse kosten en inflatie stapelen zich op dezelfde manier op. Daarom tonen we ze in hetzelfde rekenvoorbeeld.</p>']],
  doe:{ tekst:'Verander in het rekenvoorbeeld alleen de looptijd, en daarna alleen het maandbedrag. Welke knop doet het meest voor uw situatie?', href:'#verkennen-tijd', label:'Probeer het met dezelfde aannames' },
  kenner:'<p>Een vuistregel om te voelen hoe snel samengestelde groei gaat: deel 72 door het groeipercentage en u krijgt ongeveer het aantal jaren waarin een bedrag verdubbelt. Bij 4% is dat ongeveer 18 jaar, bij 2% ongeveer 36 jaar. Het is een benadering, geen belofte; het werkt alleen als die groei er elk jaar is.</p>',
  lens:'tijd', related:['regelmatige-inleg','kosten','inflatie','twee-buren'] });

art({ id:'regelmatige-inleg', fam:'principes', fmt:'Principe', status:'uitgewerkt',
  title:'Maandelijks inleggen: hoe klein mag het zijn?', lead:'Een vast bedrag per maand maakt beleggen haalbaar en spreidt uw instapmomenten.',
  kern:'Regelmaat bouwt op, ook met kleine bedragen. Wat u inlegt, weet u; wat het waard wordt, niet.',
  body:[['Uw inleg apart zien','<p>Uw eigen inleg is het enige bedrag dat u zelf bepaalt. Toon het altijd apart van een veronderstelde groei: de waarde kan erboven of eronder liggen.</p>'],
        ['Instappen op verschillende momenten','<p>Wie maandelijks inlegt, koopt soms duur en soms goedkoop. Dat verkleint de kans dat alles op één slecht moment instapt. Het garandeert geen beter resultaat.</p>']],
  box:{ type:'tip', label:'Praktisch', title:'Klein en vast', items:['Kies een bedrag dat u ook in een mindere maand volhoudt.','Plan het kort na uw loon, niet op het einde van de maand.','Let op vaste kosten per aankoop: bij kleine bedragen wegen die zwaarder.'] },
  doe:{ tekst:'Kies één maandbedrag dat u ook in een mindere maand zou volhouden, en kijk wat het over 15 jaar wordt, apart van de aangenomen groei.', href:'#verkennen-tijd', label:'Bekijk uw inleg naast de groei' },
  kenner:'<p>Een bedrag dat u vandaag al heeft, in één keer beleggen of over maanden spreiden? Spreiden verkleint het risico van één ongelukkig instapmoment; in één keer beleggen geeft het geld langer de tijd. Geen van beide is altijd beter; het hangt ook af van hoe u een daling vlak na de start zou beleven. Let bij spreiden op vaste kosten per aankoop.</p>',
  lens:'tijd', related:['samengestelde-groei','twee-buren','risico-horizon','kosten'] });

art({ id:'kosten', fam:'principes', fmt:'Principe', status:'uitgewerkt',
  title:'Wat kost een klein verschil?', lead:'Kosten gaan mee door de tijd. Eén procent per jaar lijkt klein, tot u het over twintig jaar bekijkt.',
  kern:'Kosten behoren tot de weinige dingen die u vooraf kunt vergelijken. Vergelijk ze samen met wat u ervoor krijgt; lopende kosten kunnen later wijzigen.',
  predict:{ q:'Twee voorbeelden groeien even hard (4% per jaar vóór kosten). Het ene kost 0,5% per jaar, het andere 1,5%. Wat is het verschil na 20 jaar op € 10.000?', opts:[['Ongeveer € 2.000 (20 jaar × 1% van € 10.000)','Dat zou kloppen als kosten alleen op de inleg werkten. Ze worden elk jaar op de hele waarde berekend, ook op wat er gegroeid is: in dit rekenvoorbeeld is het verschil ruim € 3.600.'],['Meer dan € 2.000','Klopt met het rekenvoorbeeld: ruim € 3.600, omdat de kosten ook wegen op de groei van alle voorgaande jaren.']] },
  body:[['Begin bij wat u vergelijkt','<p>Bij beleggen kunnen instapkosten, lopende kosten, transactiekosten, beurstaks, bewaarloon, advies- of beheersvergoeding en uitstapkosten horen. Vraag welke kosten gelden en welke dienstverlening ertegenover staat.</p>'],
        ['Maak één verschil zichtbaar','<p>In het rekenvoorbeeld verandert alleen het kostenniveau. Startbedrag, looptijd en aangenomen groei zijn gelijk. Zo ziet u dat ene effect; een echte vergelijking vraagt ook aandacht voor risico en dienstverlening.</p>']],
  kenner:`<p>De lopende kost in het essentiële-informatiedocument dekt niet alles. Tel de lagen apart op:</p>${T([['Kostenlaag','Waar u ze vindt','In de "lopende kosten"?'],['Beheer en werking van het fonds','Essentiële-informatiedocument','Ja'],['Transacties binnen het fonds','Essentiële-informatiedocument, vaak apart vermeld','Meestal apart'],['Instap- en uitstapkosten','Documentatie, tarieflijst','Nee'],['Beurstaks bij aan- en verkoop','Wettelijk; 0,35% bij bestaande aandelen, bij fondsen en trackers kan het anders zijn','Nee'],['Bewaarloon en makelaarsloon','Tarieflijst van de bank of broker','Nee'],['Advies- of beheersvergoeding','Uw overeenkomst','Nee'],['Premietaks (levensverzekering)','2% voor natuurlijke personen; niet bij pensioensparen','Nee']])}<p><b>Mini-rekenvoorbeeld</b> (voorbeeldtarieven, behalve de wettelijke beurstaks): op € 20.000 in aandelen kost de beurstaks bij aankoop € 70. Een lopende kost van 0,20% is € 40 per jaar, een bewaarloon van 0,15% € 30 per jaar. Bij weinig transacties en lange termijn wegen de jaarlijkse kosten het zwaarst; bij kleine bedragen en vaak handelen de vaste kosten per aankoop.</p>`,
  doe:{ tekst:'Vraag een gedetailleerd kostenoverzicht in euro én procent, per jaar en bij aan- en verkoop. Wikifin raadt dat ook aan.', href:'#verkennen-kosten', label:'Zie het effect over de tijd' },
  lens:'kosten', related:['buffett','fondsen-etf','bruto-netto','tak21-tak23'], sources:[SRC.wfKostenAandelen, SRC.wfKostenFonds, SRC.wfLevenKosten] });

/* ── Sparen, rente, inflatie ────────────────────────────────── */
art({ id:'spaarrekening', fam:'sparen', fmt:'Basis', status:'actueel', peildatum:'2026-11-02',
  title:'Wat een spaarrekening echt oplevert', lead:'Een gereglementeerde spaarrekening heeft twee delen: een basisrente en een getrouwheidspremie, elk met hun eigen voorwaarden.',
  kern:'De geafficheerde rente vertelt niet alles. Voorwaarden en koopkracht bepalen wat er overblijft.',
  body:[['Twee delen','<p>De basisrente krijgt u op het bedrag op de rekening. De getrouwheidspremie krijgt u alleen voor bedragen die 12 maanden onafgebroken op de rekening blijven staan. Beide tarieven kunnen wijzigen.</p>'],
        ['Belasting','<p>Bij een gereglementeerde spaarrekening is er geen roerende voorheffing tot een jaarlijks vastgelegde grens; daarboven wel. Bij een niet-gereglementeerde rekening betaalt u roerende voorheffing vanaf de eerste cent.</p>']],
  box:{ type:'voorbeeld', label:'Voorbeeld', title:'Een opname te vroeg', text:'U zet in januari € 5.000 op een spaarrekening en haalt het in november weg. U krijgt de basisrente, maar geen getrouwheidspremie: de 12 maanden waren niet om.' },
  kenner:'<p>Voor inkomstenjaar 2026 vermeldt Belfius een vrijgestelde eerste schijf van € 1.020 per persoon en 15% roerende voorheffing daarboven. Sinds 2024 moet elk document van een gereglementeerde spaarrekening de categorie vermelden; categorie B kent bijkomende voorwaarden. Bij redactie: bedragen actualiseren met de officiële bron.</p>',
  doe:{ tekst:'Kijk in de informatiefiche van uw spaarrekening vanaf welke datum de getrouwheidspremie op uw bedragen loopt.', href:'#verkennen-koopkracht', label:'Wat inflatie met spaargeld doet' },
  lens:'koopkracht', related:['inflatie','rente','buffer'], sources:[SRC.wfSpaar, SRC.wfSpaarWat, SRC.belfiusSpaar] });

art({ id:'inflatie', fam:'sparen', fmt:'Principe', status:'uitgewerkt',
  title:'Inflatie: waarom € 100 later minder koopt', lead:'Als prijzen stijgen, koopt hetzelfde bedrag minder. Een bedrag dat op papier groeit, groeit niet noodzakelijk evenveel in koopkracht.',
  kern:'Kijk naar twee getallen: hoeveel euro, en wat u er dan mee kunt kopen.',
  predict:{ q:'Uw spaargeld groeit 2% per jaar, de prijzen stijgen ook 2%. Wat doet uw koopkracht?', opts:[['Die groeit 2%','Op papier groeit uw bedrag 2%, maar alles wordt ook 2% duurder. Wat u ermee kunt kopen, blijft ongeveer gelijk.'],['Die blijft ongeveer gelijk','Inderdaad: groei en prijsstijging heffen elkaar ongeveer op. Pas wat boven de inflatie uitkomt, vergroot uw koopkracht.']] },
  body:[['Bedrag en koopkracht','<p>Een toekomstig bedrag in euro zegt hoeveel geld er volgens de berekening staat. Wat u ermee kunt kopen, hangt af van de prijzen tegen dan.</p>'],
        ['Een doelstelling is geen voorspelling','<p>De Europese Centrale Bank streeft naar 2% inflatie op middellange termijn, gemeten met de geharmoniseerde consumptieprijsindex. De werkelijke inflatie kan afwijken, en uw eigen uitgaven kunnen anders stijgen.</p>']],
  doe:{ tekst:'Zet in het rekenvoorbeeld de koopkrachtlens aan en vergelijk het eindbedrag in euro met het bedrag in koopkracht van vandaag.', href:'#verkennen-koopkracht', label:'Bekijk beide getallen' },
  kenner:'<p>De ECB meet inflatie met de geharmoniseerde consumptieprijsindex (HICP) voor de hele eurozone en streeft symmetrisch naar 2%: afwijkingen naar boven en naar beneden zijn even ongewenst. Uw persoonlijke inflatie kan verschillen, omdat uw uitgavenpakket anders is dan het gemiddelde. In een plan op lange termijn is daarom een eigen, bewust gekozen inflatieaanname zinvoller dan het doel van de centrale bank.</p>',
  lens:'koopkracht', related:['spaarrekening','bruto-netto','samengestelde-groei'], sources:[SRC.ecb] });

art({ id:'rente', fam:'sparen', fmt:'Vergelijking', status:'concept',
  title:'Rente: één woord, drie betekenissen', lead:'Spaarrente, obligatiecoupon en marktrente heten allemaal rente, maar zeggen iets anders.',
  kern:'Een rentepercentage hoort altijd bij voorwaarden, een periode en een risico.',
  body:[['Naast elkaar', T([['','Wat het is','Waar u op let'],['Spaarrente','Vergoeding van de bank op uw spaartegoed','Basisrente en getrouwheidspremie, kan wijzigen'],['Coupon','Vaste vergoeding van een obligatie, vastgelegd bij uitgifte','Wie de uitgever is, einddatum'],['Marktrente','Rente die vandaag op de markt geldt','Bepaalt de prijs van bestaande obligaties']])]],
  doe:{ tekst:'Als iemand u "x% rente" aanbiedt: vraag welke van de drie het is, voor hoe lang, en vóór of na kosten en belasting.', href:'#a-obligaties', label:'Waarom de marktrente obligaties beweegt' },
  related:['obligaties','spaarrekening','rendement'] });

/* ── Beleggen via een verzekering ──────────────────────────── */
art({ id:'tak21-tak23', fam:'verzekering', fmt:'Vergelijking', status:'uitgewerkt',
  title:'Tak 21 en tak 23: wie draagt welk risico?', lead:'Beide zijn levensverzekeringen waarmee u spaart of belegt. De vraag die het verschil maakt: wie draagt welk risico?',
  kern:'Bij tak 21 belooft de verzekeraar een rendement volgens het contract, na kosten. Bij tak 23 volgt uw waarde de beleggingen, ook naar beneden.',
  scenario:{ vraag:'Wat gebeurt er als …', opties:[
    { label:'de beurs 20% daalt', tak21:'Uw contractwaarde daalt niet mee met de beurs: dat risico draagt de verzekeraar. Het rendement kan wel laag zijn, en de kosten lopen door.', tak23:'Uw contractwaarde daalt mee met het fonds. Dat risico draagt u zelf, en herstel is niet gegarandeerd.' },
    { label:'de verzekeraar in problemen komt', tak21:'Bij een Belgische verzekeraar beschermt het Garantiefonds uw tak 21-contracten samen tot € 100.000.', tak23:'Het Garantiefonds geldt niet voor tak 23. Vraag uw makelaar hoe het fonds van dit contract is ondergebracht.' },
    { label:'u het geld na vier jaar nodig heeft', tak21:'Afkopen kan. Afhankelijk van het contract en het tijdstip kan dat een afkoopvergoeding kosten, en bij een contract zonder fiscaal voordeel kan er belasting volgen.', tak23:'Afkopen kan, tegen de waarde op dat moment, min eventuele uitstapkosten. Staat de waarde van het fonds dan lager, dan krijgt u minder.' } ] },
  body:[['Kort naast elkaar', T([['','Tak 21','Tak 23'],['Wie draagt het beleggingsrisico?','De verzekeraar, voor het gewaarborgde deel','U zelf'],['Wat staat vast?','Een rendement volgens het contract, na kosten. Winstdeelname is nooit beloofd','Niets: de waarde volgt het fonds'],['Verzekeraar failliet?','Garantiefonds bij een Belgische verzekeraar, tot € 100.000','Geen Garantiefonds'],['Kosten en vroeg opnemen','Vaak instapkosten, en bij vroeg opnemen mogelijk een afkoopvergoeding. De exacte kosten verschillen per contract','Vaak instap-, beheers- en uitstapkosten. De exacte kosten verschillen per contract'],['Belasting','Hangt af van het contract en van wanneer u opneemt','Idem']]) + '<p>Geen roerende voorheffing betekent niet automatisch dat de opbrengst belastingvrij is. <a href="#a-fiscaal-verzekering">Hoe wordt een levensverzekering belast?</a></p>'],
        ['Wat u vóór de keuze moet weten','<ul><li>Een garantie hangt aan het contract en geldt na kosten: netto kan het tegenvallen.</li><li>Tak 23 heeft geen rendementsgarantie.</li><li>Vroeg opnemen kan kosten en belasting meebrengen, afhankelijk van het contract en het tijdstip.</li><li>Productvoorwaarden verschillen per contract.</li></ul>']],
  box:{ type:'voorbeeld', label:'Voorbeeld (fictief)', title:'Twee keer € 10.000', text:'Aannames: beide contracten zonder fiscaal voordeel en met instapkosten; het tak 23-contract belegt in een aandelenfonds dat in dat jaar in waarde daalt. Na premietaks en instapkosten wordt bij beide minder dan € 10.000 belegd. Na zo\'n jaar staat dit tak 23-contract lager, het tak 21-contract niet. Ook in tak 21 kunt u na kosten onder uw inleg uitkomen als u vroeg afkoopt.' },
  kenner:`<p><b>Wat is bij tak 21 gewaarborgd, en tot wanneer?</b> Dat staat in het contract en kan per storting en per periode verschillen; een nieuwe storting kan een andere gewaarborgde rente krijgen dan een oude. Winstdeelname komt erbij maar is nooit beloofd. Wikifin wijst erop dat een gewaarborgde rente nul of negatief kan zijn, en dat u geld verliest als de kosten hoger zijn dan het rendement.</p>${T([['Vraag','Waar u het vindt'],['Welke rente is gewaarborgd, op welke stortingen, voor hoe lang?','Contract en financiële infofiche'],['Wat kost afkopen in jaar 1 tot 8?','Afkoopvergoeding en financiële correctie in het contract'],['Valt mijn contract onder het Garantiefonds?','Belgische verzekeraar: ja (tak 21). Buitenlandse verzekeraar: navragen. Groepsverzekering: nee'],['Hoeveel heb ik al in tak 21 bij deze verzekeraar?','De € 100.000 geldt voor al uw tak 21-contracten samen bij die verzekeraar']])}<p>Voorbeeld van Wikifin: € 25.000 pensioensparen en € 60.000 levensverzekering bij dezelfde verzekeraar zijn volledig beschermd. Met € 150.000 in plaats van € 60.000 is de bescherming samen beperkt tot € 100.000.</p><p>Alle fiscale voorwaarden (roerende voorheffing, uitzonderingen, meerwaardebelasting) staan in <a href="#a-fiscaal-verzekering">Hoe wordt een levensverzekering belast?</a></p>`,
  doe:{ tekst:'Leg uw contract naast de korte vergelijking. Wat u niet kunt invullen, is een vraag voor uw makelaar.', href:'#a-fonds-of-tak23', label:'Tak 23 of rechtstreeks in een fonds?' },
  related:['fiscaal-verzekering','tak21','tak23','pensioensparen'], sources:[SRC.wfTakVerschil, SRC.wfGarantie, SRC.wfTak21Risico, SRC.wfLevenKosten] });

art({ id:'fiscaal-verzekering', fam:'fiscaal', fmt:'Fiscaal', status:'actueel', peildatum:'2026-11-02',
  title:'Hoe wordt een levensverzekering belast?', lead:'Drie momenten kunnen tellen: wanneer u stort, wanneer u opneemt en wanneer er wordt uitbetaald. Wat geldt, hangt af van het contract.',
  kern:'Geen roerende voorheffing betekent niet dat de opbrengst altijd belastingvrij is.',
  body:[['In gewone woorden', T([['Moment','Wat er kan gelden'],['Bij storting','Meestal 2% premietaks; niet bij pensioensparen'],['Opnemen in de eerste acht jaar (tak 21 zonder fiscaal voordeel)','Roerende voorheffing, behalve in bepaalde uitzonderingen'],['Opnemen later, of tak 23','In principe geen roerende voorheffing'],['Afkoop of uitbetaling bij leven, sinds 2026','Ook een verzekering zonder fiscaal voordeel kan onder de nieuwe meerwaardebelasting vallen. Pensioensparen en langetermijnsparen zijn vrijgesteld'],['Bij overlijden','Successierechten kunnen gelden']])]],
  box:{ type:'steps', label:'Wat u uw makelaar vraagt', title:'Drie vragen over uw contract', items:['Heeft dit contract een fiscaal voordeel, of niet?','Wat kost het, in belasting en kosten, als ik vóór acht jaar opneem?','Valt een afkoop of uitbetaling onder de meerwaardebelasting, en geldt er een vrijstelling?'] },
  kenner:`<p><b>Roerende voorheffing bij tak 21.</b> Bij een tak 21-contract zonder fiscaal voordeel kunnen vrijstellingen van roerende voorheffing gelden, afhankelijk van de looptijd en de contractvoorwaarden. Een contract van meer dan acht jaar is in principe vrijgesteld, onder voorwaarden. Wikifin beschrijft daarnaast een vrijstelling bij een overlijdensdekking van minstens 130% van de gestorte premies, die ook vóór acht jaar kan spelen. Daarbij kunnen aanvullende voorwaarden gelden, onder meer dat de verzekeringnemer ook de verzekerde en de begunstigde bij leven is. Geldt er geen vrijstelling, dan kan een afkoop vóór de achtste verjaardag 30% roerende voorheffing meebrengen op een fictief rendement (Wikifin noemt 4,75%), ook als het werkelijke rendement lager lag. Laat uw makelaar nakijken welke regel voor uw contract geldt. Voor tak 23 met een minimumrendement gelden vergelijkbare regels. Pensioensparen en langetermijnsparen volgen een eigen regime met een eindbelasting.</p><p><b>Meerwaardebelasting.</b> Volgens de aangenomen wettekst (Kamer, DOC 56 1244/008, art. 4 en 10; wet van 6 april 2026) vallen levensverzekeringsovereenkomsten onder de financiële activa, en gelden een afkoop en een uitbetaling bij leven als overdracht. Er zijn vrijstellingen, onder meer voor fiscaal begunstigde contracten en voor zover de opbrengst al anders belast wordt (bijvoorbeeld als roerend inkomen). Dit is een algemene uitleg, geen persoonlijke berekening. Regels en voorwaarden kunnen wijzigen; laat uw eigen contract nakijken door uw makelaar.</p>`,
  doe:{ tekst:'Bewaar de drie vragen voor een gesprek, samen met het onderwerp dat u bezighoudt.', href:'#gesprek', label:'Naar uw gespreksoverzicht' },
  related:['tak21-tak23','tak21','tak23','belasting-beleggen'], sources:[SRC.wfLevenKosten, SRC.wfOverlijden, SRC.wfTakVerschil, SRC.kamerMeerwaarde, SRC.kamerFiche, SRC.fodMeerwaarde] });

art({ id:'tak21', fam:'verzekering', fmt:'Basis', status:'uitgewerkt',
  title:'Tak 21: wat betekent "gewaarborgd" precies?', lead:'Tak 21 lijkt op sparen: de verzekeraar waarborgt een rendement volgens het contract en kan winstdeelname toekennen.',
  kern:'Gewaarborgd gaat over het afgesproken deel, na kosten en voor de termijn in het contract. Winstdeelname is nooit beloofd.',
  body:[['Twee delen van het rendement','<p>Het gewaarborgde rendement staat in uw contract. Een eventuele winstdeelname hangt af van de resultaten van de verzekeraar en kan van jaar tot jaar verschillen.</p>'],
        ['Kosten en belasting','<p>Op de premie betalen natuurlijke personen 2% premietaks, behalve bij pensioensparen. Daarnaast rekent de verzekeraar kosten aan. Wie vroeg opneemt, betaalt vaak een afkoopvergoeding en soms belasting. <a href="#a-fiscaal-verzekering">Hoe wordt een levensverzekering belast?</a></p>'],
        ['Wat "gewaarborgd" niet betekent','<p>De waarborg geldt voor het contractdeel volgens de voorwaarden, dus na kosten en taksen. Het is geen garantie dat u de volledige brutopremie terugkrijgt. Wikifin wijst erop dat een gewaarborgde rente nul of zelfs negatief kan zijn, en dat kosten bij een vroege opvraging tot een lager bedrag kunnen leiden dan u betaalde.</p>']],
  box:{ type:'steps', label:'Wat u nakijkt', title:'Vijf vragen bij een tak 21-contract', items:['Hoeveel bedraagt de gewaarborgde rente, en voor welke stortingen en periode?','Welke kosten gaan er af bij storting en elk jaar?','Wat kost een afkoop in de eerste acht jaar?','Is de verzekeraar Belgisch, zodat het Garantiefonds geldt?','Heeft u het geld zeker niet nodig vóór de acht jaar om zijn, en welke uitzondering of welk fiscaal regime geldt voor uw contract?'] },
  kenner:'<p>Bekijk het rendement na kosten en premietaks, over de termijn die u werkelijk aanhoudt. Bij afkoop in de eerste acht jaar kan bovendien een financiële correctie gelden, die flink kan oplopen als de marktrente hoger ligt dan de rente op uw contract (Wikifin).</p>',
  doe:{ tekst:'Haal de financiële infofiche van uw contract boven en beantwoord de vijf vragen.', href:'#k-tak21-tak23', label:'Wat is gewaarborgd, en tot wanneer?' },
  related:['tak21-tak23','tak23','fonds-of-tak23','spaarrekening'], sources:[SRC.wfLevenKosten, SRC.wfTak21Risico, SRC.wfOverlijden, SRC.wfGarantie] });

art({ id:'tak23', fam:'verzekering', fmt:'Basis', status:'uitgewerkt',
  title:'Tak 23: beleggen in de verpakking van een verzekering', lead:'Bij tak 23 belegt de verzekeraar uw premies in een intern beleggingsfonds. Uw waarde volgt dat fonds, ook naar beneden.',
  kern:'Het verlies door marktschommelingen is volgens Wikifin volledig voor rekening van de verzekeringnemer.',
  body:[['Hoe het werkt','<p>U stort één keer of periodiek. De verzekeraar belegt volgens een vooraf bepaalde strategie, bijvoorbeeld in aandelen, obligaties of vastgoed, en moet die duidelijk meedelen.</p>'],
        ['Looptijd en begunstigde','<p>Er zijn contracten met en zonder einddatum. Vervroegd beëindigen kan, met kosten en mogelijke belastingen. U kiest vrij een begunstigde; bij overlijden kunnen successierechten verschuldigd zijn.</p>']],
  box:{ type:'tip', label:'Vóór u tekent', title:'Drie controles', items:['Staat de verzekeraar bij de Nationale Bank, en de tussenpersoon in de FSMA-databank?','Wat zit er in het interne fonds, en wat kost het per jaar en bij uitstap?','Kunt u een daling uitzitten, zonder vervroegd te moeten afkopen?'] },
  kenner:'<p>Tak 23 valt niet onder het Garantiefonds. Fiscaal is er in principe geen roerende voorheffing, behalve bij producten met een minimumrendement en opname vóór acht jaar. Vergelijk een tak 23 met een rechtstreeks fonds of tracker op de totale kost, inclusief premietaks, en op de flexibiliteit bij uitstap.</p>',
  doe:{ tekst:'Vergelijk een tak 23 met dezelfde soort belegging rechtstreeks in een fonds of tracker: zelfde onderliggende belegging, zelfde horizon, totale kost in euro.', href:'#a-fonds-of-tak23', label:'Zo vergelijkt u eerlijk' },
  lens:'kosten', related:['fonds-of-tak23','tak21-tak23','fondsen-etf','kosten'], sources:[SRC.wfTak23, SRC.wfLevenKosten, SRC.wfGarantie] });

art({ id:'fonds-of-tak23', fam:'verzekering', fmt:'Vergelijking', status:'uitgewerkt',
  title:'Rechtstreeks in een fonds of tracker, of via tak 23?', lead:'Dezelfde onderliggende belegging kunt u op twee manieren kopen: rechtstreeks op een effectenrekening, of verpakt in een levensverzekering tak 23.',
  kern:'Een tracker of fonds is wat u koopt; tak 23 is een verpakking eromheen. Vergelijk dus dezelfde inhoud, met de totale kost, de uitstapregels en de fiscale gevolgen.',
  predict:{ q:'U vergelijkt een wereldwijde aandelentracker met een tak 23 die in een wereldwijd aandelenfonds belegt. Wat vergelijkt u eerst?', opts:[['Het rendement van vorig jaar','Dat zegt weinig: het hangt af van de markt en van de periode. Vergelijk eerst of de onderliggende belegging echt vergelijkbaar is, en daarna wat u in totaal betaalt.'],['Wat erin zit, en wat het in totaal kost','Dat is de eerlijke volgorde: dezelfde onderliggende belegging en horizon, daarna de totale kost in euro, de uitstapregels en de fiscaliteit.']] },
  body:[['Twee verpakkingen, naast elkaar', T([['','Rechtstreeks (fonds of tracker)','Via tak 23'],['Wat u bezit','Deelbewijzen op uw effectenrekening','Een verzekeringscontract; de verzekeraar belegt in een intern fonds'],['Kosten bij instap','Makelaarsloon en beurstaks bij aankoop (bij fondsen soms instapkosten)','Premietaks 2% voor natuurlijke personen en instapkosten van het contract'],['Kosten per jaar','Lopende kosten van het fonds en vaak bewaarloon','Lopende kosten van het onderliggende fonds én beheerskosten van het contract'],['Uitstappen','Verkopen op de beurs; makelaarsloon en beurstaks','Afkopen; uitstapkosten en soms een afkoopvergoeding, vaak dalend met de looptijd'],['Belasting op opbrengst','Afhankelijk van het fonds: roerende voorheffing op uitkeringen, meerwaardebelasting bij verkoop met winst','In principe geen roerende voorheffing, maar niet automatisch belastingvrij (<a href="#a-fiscaal-verzekering">hoe een levensverzekering belast wordt</a>)'],['Bij overlijden','Valt in de nalatenschap','Uitkering aan de begunstigde die u kiest; successierechten kunnen verschuldigd zijn'],['Bij faillissement','Bij de bank of broker gelden aparte beschermingsregels voor effecten','Geen Garantiefonds voor tak 23']])],
        ['Zo vergelijkt u eerlijk','<p>Neem dezelfde onderliggende belegging, hetzelfde risico en dezelfde horizon. Tel daarna alle kosten op, zowel eenmalig als per jaar, in euro over de hele periode die u werkelijk aanhoudt.</p>']],
  box:{ type:'steps', label:'Vragen voor uw makelaar', title:'Vijf vragen bij elke vergelijking', items:['Is de onderliggende belegging dezelfde of echt vergelijkbaar?','Wat kost het in totaal per jaar, in euro: fonds, contract en bewaring samen?','Wat kost instappen en uitstappen, en vanaf wanneer daalt de uitstapkost?','Welke belasting geldt bij uitkering, verkoop of afkoop, in mijn situatie?','Wat gebeurt er bij overlijden, en wie wil ik als begunstigde?'] },
  kenner:'<p><b>Zelf rekenen zonder een tweede rekenmachine.</b> Gebruik het bestaande kostenvoorbeeld. Zet als startbedrag wat er na de eenmalige kosten werkelijk belegd wordt; bij tak 23 gaan de premietaks van 2% en eventuele instapkosten er eerst af. Zet bij kosten A de totale jaarlijkse kost van de rechtstreekse route en bij kosten B die van de tak 23-route. Laat de groei gelijk. Uitstapkosten trekt u aan het einde zelf af. Wij noemen hier bewust geen producttarieven: die verschillen per aanbieder en veranderen.</p><p>Wat de conclusie kan omkeren: een kortere horizon (uitstapkosten wegen dan zwaar), de waarde van de begunstigdeclausule in uw situatie, en de fiscale behandeling bij uitkering.</p>',
  doe:{ tekst:'Vul in het kostenvoorbeeld de totale jaarlijkse kost van beide routes in, met hetzelfde startbedrag na eenmalige kosten.', href:'#verkennen-kosten', label:'Vergelijk de twee routes' },
  lens:'kosten', related:['tak23','fondsen-etf','kosten','belasting-beleggen'], sources:[SRC.wfLevenKosten, SRC.wfKostenFonds, SRC.wfTracker, SRC.wfKostenAandelen, SRC.wfTak23, SRC.wfGarantie, SRC.fodMeerwaarde, SRC.kamerMeerwaarde] });

art({ id:'rekenmethode', fam:'rendement', fmt:'Methode', status:'uitgewerkt',
  title:'Zo rekenen onze voorbeelden', lead:'Alle rekenvoorbeelden op deze pagina\'s gebruiken dezelfde, eenvoudige methode. Hier ziet u ze stap voor stap, met wat erin zit en wat niet.',
  kern:'Elk jaar: eerst de aangenomen groei, dan de jaarlijkse kosten over de waarde, dan de inleg van dat jaar erbij.',
  box:{ type:'steps', label:'Volgorde per jaar', title:'Vier stappen, elk jaar opnieuw', items:['Waarde begin van het jaar × (1 + groei vóór kosten).','Dat resultaat × (1 − jaarlijkse kosten).','Plus de inleg van dat jaar: 12 × uw maandbedrag, samengevoegd en aan het einde van het jaar bijgeteld.','Koopkracht (optioneel): eindwaarde ÷ (1 + inflatie) tot de macht het aantal jaren.'] },
  body:[['Uitgewerkt voorbeeld', T([['Jaar','Berekening','Waarde'],['Start','Startbedrag','€ 10.000'],['1','10.000 × 1,04 × 0,995 + 12 × 150','€ 12.148'],['2','12.148 × 1,04 × 0,995 + 1.800','€ 14.371']]) + '<p>Met 4% groei vóór kosten, 0,5% kosten per jaar en € 150 per maand.</p>'],
        ['Wat erin zit en wat niet', T([['Meegerekend','Niet meegerekend'],['Uw startbedrag en uw maandinleg','Belastingen en premietaks'],['Eén vaste groei per jaar, die u zelf kiest','Instap-, uitstap- en transactiekosten'],['Eén jaarlijks kostenpercentage','Schommelende of negatieve jaren in een andere volgorde'],['Inflatie, als u die lens kiest','Valuta en kredietverliezen']])],
        ['Waarom de maandinleg per jaar wordt samengevoegd','<p>Dat maakt de berekening leesbaar. Het is een vereenvoudiging, geen voorzichtige keuze: bij positieve groei geeft ze een iets lager resultaat dan echt maandelijks storten, bij negatieve groei juist een iets hoger. Met −4% groei in hetzelfde voorbeeld wordt jaar 1 € 11.352, terwijl u € 11.800 inlegde.</p>'],
        ['Verschil met uw plan', T([['','Deze rekenvoorbeelden','Uw plan bij de makelaar'],['Doel','Een principe begrijpen','Een persoonlijk voorstel voorbereiden'],['Aannames','Voorbeeldwaarden die u zelf wijzigt','Een vastgelegde aannamenset van het kantoor, met versie en peildatum'],['Kosten en belasting','Eén kostenpercentage, geen belasting','Volgens de gekozen producten en uw situatie'],['Onzekerheid','Eén pad en één gevoeligheidsregel','Bespreking van mogelijke uitkomsten en risico']])]],
  kenner:'<p>Educatieve rekenkern versie <code>education-2026-11-02-v4</code>, invoerparser <code>invoer-nl-BE-1</code>. Ze is niet afgeleid van de planrekenmotor en geen bewijs van integratie. Een berekend bedrag wordt nooit als door u bevestigd naar uw plan overgenomen; alleen uw eigen invoer gaat mee, met de herkomst per veld.</p>',
  doe:{ tekst:'Probeer de methode zelf: verander één knop tegelijk en kijk welke het meeste verschil maakt.', href:'#verkennen-tijd', label:'Naar het rekenvoorbeeld' },
  related:['rendement','gemiddelde','samengestelde-groei','bruto-netto'] });

/* ── Belasting en voorwaarden ──────────────────────────────── */
art({ id:'pensioensparen', fam:'fiscaal', fmt:'Fiscaal', status:'actueel', peildatum:'2026-11-02',
  title:'Pensioensparen: wat levert de vermindering op, en wat staat ertegenover?', lead:'U krijgt een belastingvermindering op wat u stort, binnen een jaarlijks plafond. Daar staan voorwaarden, kosten en een eindbelasting tegenover.',
  kern:'De belastingvermindering is geen rendement. Bekijk ze samen met het product, de kosten, de beschikbaarheid en de eindbelasting.',
  predict:{ q:'U stort € 1.350 met het verhoogde plafond. Meer of minder voordeel dan € 1.050 met het basisplafond?', opts:[['Meer, want u stort meer','U stort € 300 meer, maar alles krijgt 25% in plaats van 30%. Het verschil in vermindering is klein: ongeveer € 338 tegenover € 315.'],['Ongeveer evenveel','Ongeveer: € 338 tegenover € 315 in inkomstenjaar 2026. Procentueel levert het verhoogde plafond dus minder op per gestorte euro.']] },
  body:[['Twee formules (inkomstenjaar 2026)','<p>Basisplafond: tot € 1.050, met 30% belastingvermindering. Verhoogd plafond: tot € 1.350, met 25% op het volledige bedrag.</p>'],
        ['Wat ertegenover staat', '<ul><li>Het verhoogde plafond moet u elk jaar uitdrukkelijk kiezen bij uw bank of verzekeraar; het gebeurt niet vanzelf.</li><li>Het voordeel geldt in principe pas bij minstens 10 jaar sparen; de laatste premie kan tot en met het jaar waarin u 64 wordt.</li><li>Wie ooit een storting aangaf voor het voordeel, betaalt een eindbelasting, meestal 8%. Waarop die berekend wordt, verschilt per product (fonds of verzekering). In principe op uw 60ste verjaardag; begon u het contract na uw 55ste, dan op de tiende verjaardag van het contract.</li><li>Het geld is bedoeld voor later; vroeger opnemen is niet de bedoeling en kan fiscaal nadelig zijn.</li><li>Eén pensioenspaarcontract per persoon voor het fiscale voordeel.</li><li>Wie weinig belasting betaalt, kan het voordeel niet altijd volledig benutten.</li></ul>'],
        ['Fonds of verzekering', T([['','Pensioenspaarfonds','Verzekering tak 21','Verzekering tak 23'],['Wat vastligt','Geen kapitaalgarantie','Een gewaarborgd rendement op het contractdeel volgens de voorwaarden, na kosten. Geen garantie dat u de volledige brutopremie terugkrijgt','Geen kapitaalgarantie'],['Waardeschommeling','Ja, volgt de fondsen','Beperkt; kosten en een vroege uitstap kunnen wel tot minder leiden','Ja, volgt de fondsen'],['Waar u op let','Kosten van het fonds','Kosten, gewaarborgde rente en voor hoe lang','Kosten van contract en fonds']])]],
  kenner:'<p>De berekening hier rondt af op hele euro\'s en houdt geen rekening met uw persoonlijke belastingsituatie, gemeentebelasting of de exacte eindbelasting. Pensioenspaarrekeningen zijn volgens de FOD Financiën vrijgesteld van de nieuwe meerwaardebelasting. Op pensioenspaarverzekeringen is geen premietaks verschuldigd (Wikifin).</p>',
  doe:{ tekst:'Bereken de mogelijke vermindering voor uw jaarbijdrage en de formule die u zelf kiest, en lees meteen wat ervoor vastligt.', href:'#verkennen-pensioensparen', label:'Bereken het voor 2026' },
  lens:'pensioensparen', related:['tak21-tak23','langetermijnsparen','belasting-beleggen'], sources:[SRC.wfPensioen, SRC.wfPensioenBelast, SRC.wfLevenKosten, SRC.fodMeerwaarde] });

art({ id:'langetermijnsparen', fam:'fiscaal', fmt:'Fiscaal', status:'actueel', peildatum:'2026-11-02',
  title:'Langetermijnsparen: een tweede fiscale korf, met eigen voorwaarden', lead:'Via een levensverzekering kunt u onder voorwaarden een belastingvermindering krijgen naast het pensioensparen.',
  kern:'Een tweede voordeel kan, maar het concurreert soms met andere fiscale voordelen en legt geld lang vast.',
  body:[['Waar het om gaat','<p>Langetermijnsparen loopt via een levensverzekering (tak 21 of tak 23). Het plafond hangt af van uw inkomen en kan samenvallen met andere fiscale voordelen. Contracten langetermijnsparen zijn volgens de FOD Financiën vrijgesteld van de meerwaardebelasting.</p>']],
  box:{ type:'steps', label:'Vóór u begint', title:'Vier vragen, samen te bekijken', items:['Gebruikt u het pensioensparen al ten volle?','Gebruikt u dezelfde fiscale ruimte al voor iets anders?','Kunt u het geld lang missen?','Wat kost het contract, en welke eindbelasting volgt?'] },
  kenner:'<p>Bij redactie vullen we dit artikel aan met de actuele plafonds en de eindbelasting, rechtstreeks uit de officiële bron. Tot dan rekent deze kandidaat hier bewust niets uit.</p>',
  doe:{ tekst:'Neem de vier vragen mee naar uw makelaar; of langetermijnsparen bij u past, hangt af van uw volledige fiscale situatie.', href:'#a-pensioensparen', label:'Eerst het pensioensparen' },
  related:['pensioensparen','tak21-tak23'], sources:[SRC.wfTakVerschil, SRC.fodMeerwaarde] });

art({ id:'belasting-beleggen', fam:'fiscaal', fmt:'Fiscaal', status:'actueel', peildatum:'2026-11-02',
  title:'Belasting op beleggen: wat wordt waar belast?', lead:'Dividend, rente, een verkoop met winst en de aankoop zelf kunnen elk een eigen heffing hebben.',
  kern:'Belasting zit op verschillende momenten. Een resultaat "vóór belasting" is nog niet wat u overhoudt.',
  body:[['Vier momenten', T([['Moment','Wat','Waar u op let'],['Inkomsten','Roerende voorheffing op dividend en rente','Uitzonderingen en vrijstellingen bestaan'],['Verkoop met winst','Meerwaardebelasting van 10% sinds 1 januari 2026, met een jaarlijkse vrijstelling op de eerste schijf','Pensioensparen, groepsverzekeringen en langetermijnsparen zijn vrijgesteld'],['Aan- en verkoop','Beurstaks','0,35% bij bestaande aandelen; bij fondsen anders'],['Levensverzekering','Premietaks bij storting; mogelijk belasting bij opname of afkoop','2% voor natuurlijke personen, niet bij pensioensparen. Niet automatisch belastingvrij: zie <a href="#a-fiscaal-verzekering">hoe een levensverzekering belast wordt</a>']])]],
  kenner:'<p><b>Wat telt als meerwaarde?</b> In principe de verkoopprijs min de aanschaffingswaarde. Voor wat u vóór 1 januari 2026 kocht, kijkt de FOD Financiën naar de waarde op 31 december 2025, het "fotomoment". In het voorbeeld van de FOD koopt Jan in 2020 voor € 5.000 aandelen die op 31 december 2025 € 7.000 waard zijn; verkoopt hij in 2026 voor € 10.000, dan start de berekening vanaf € 7.000 en niet vanaf € 5.000. Onder voorwaarden en mits bewijs kan tijdelijk een hogere historische aankoopwaarde gelden (KPMG). De bank kan de belasting aan de bron inhouden; de vrijstelling vraagt dan uw aangifte. Verrekening van minderwaarden kent beperkingen. Dit is een conceptuitleg; bij redactie volgt een fiscale toets.</p>',
  doe:{ tekst:'Bewaar voor elke belegging die u vóór 2026 kocht de waarde op 31 december 2025 en, als die hoger lag, het bewijs van uw aankoopprijs.', href:'#a-bruto-netto', label:'Van bruto naar wat overblijft' },
  related:['bruto-netto','pensioensparen','fiscaal-verzekering'], sources:[SRC.kamerMeerwaarde, SRC.kamerFiche, SRC.fodMeerwaarde, SRC.belfiusMeerwaarde, SRC.kpmgMeerwaarde, SRC.wfKostenAandelen, SRC.wfLevenKosten] });

/* ── Rendement en aannames ─────────────────────────────────── */
art({ id:'rendement', fam:'rendement', fmt:'Methode', status:'uitgewerkt',
  title:'Wat kan uw geld opbrengen, en hoe zeker is dat?', lead:'Elke berekening van de toekomst steunt op aannames. Goede berekeningen tonen ze; eerlijke berekeningen tonen ook hun grenzen.',
  kern:'Een rekenresultaat is een "als … dan". Geen belofte.',
  body:[['Wat bij elk resultaat hoort','<p>Welke groei is aangenomen? Zijn kosten, belasting en inflatie meegerekend? En: de werkelijkheid kan afwijken, ook naar beneden.</p>'],
        ['In onze rekenvoorbeelden','<p>De groei is een voorbeeldwaarde die u zelf kunt wijzigen. Het is geen verwachting van Norte of van uw makelaar. In uw plan rekent uw makelaar met de kantoormethode en een vastgelegde aannamenset.</p>']],
  box:{ type:'voorbeeld', label:'Zo leest u een resultaat', title:'"€ 58.000 na 20 jaar"', text:'Lees: als de groei elk jaar 4% vóór kosten is, als de kosten 0,5% per jaar zijn, zonder belasting, en in euro van later. Verandert één van die voorwaarden, dan verandert het getal.' },
  kenner:`<p><b>Waarom is een rentecurve geen obligatierendement?</b> Een staatsrentecurve is een marktgegeven voor staatsleningen per looptijd. Een verwacht rendement van een obligatieportefeuille is iets anders:</p>${T([['','Staatsrentecurve','Obligatieportefeuille'],['Wie leent','Staten met hoge kredietwaardigheid','Ook bedrijven en andere landen'],['Looptijd','Per looptijd apart','Een mengeling, die voortdurend wordt vernieuwd'],['Valuta','Euro','Kan ook vreemde munten bevatten'],['Wat erbij komt','Niets','Kosten, kredietverliezen, herbelegging tegen nieuwe rentes']])}<p>Verwachtingen van verschillende instellingen middelen vraagt gelijke valuta, horizon en rekenconventie. Een plan verwijst naar de aannamenset en uitlegversie die bij dat plan zijn vastgelegd; een redactionele update wijzigt geen oud plan.</p>`,
  doe:{ tekst:'Vraag bij elke berekening die u krijgt: welke groei, welke kosten, welke belasting, en in euro van wanneer? Voor onze eigen rekenvoorbeelden staat het antwoord in de rekenmethode.', href:'#a-rekenmethode', label:'Zo rekenen onze voorbeelden' },
  lens:'tijd', related:['rekenmethode','gemiddelde','bruto-netto','obligaties'], sources:[SRC.ecb] });

art({ id:'bruto-netto', fam:'rendement', fmt:'Vergelijking', status:'uitgewerkt',
  title:'Bruto, netto en koopkracht: welk getal bedoelt men?', lead:'Drie getallen voor hetzelfde resultaat. Wie ze verwart, overschat wat er overblijft.',
  kern:'Vraag bij elk getal: vóór of na kosten, vóór of na belasting, in euro of in koopkracht?',
  body:[['Drie lagen', T([['Laag','Betekenis'],['Bruto','Vóór kosten en belasting'],['Netto','Na de kosten en belastingen die meegerekend zijn (vraag welke)'],['Koopkracht','Netto, gecorrigeerd voor prijsstijgingen']])],
        ['In onze rekenvoorbeelden','<p>Kosten en, op uw vraag, inflatie worden meegerekend. Belastingen niet. Dat staat telkens bij het resultaat.</p>']],
  doe:{ tekst:'Zet in het rekenvoorbeeld de koopkrachtlens aan: dan ziet u netto na kosten en in koopkracht naast elkaar.', href:'#verkennen-koopkracht', label:'Bekijk beide' },
  lens:'koopkracht', related:['kosten','inflatie','belasting-beleggen'] });

art({ id:'gemiddelde', fam:'rendement', fmt:'Methode', status:'uitgewerkt',
  title:'Gemiddeld 4% per jaar: waarom dat geen belofte is', lead:'"Gemiddeld 4%" klinkt rustig. In werkelijkheid komt dat gemiddelde uit goede en slechte jaren.',
  kern:'Dezelfde gemiddelde groei kan tot een ander eindbedrag leiden, afhankelijk van schommelingen en van wanneer u stort of opneemt.',
  box:{ type:'steps', label:'Rekenvoorbeeld', title:'Waarom −20% en +20% geen 0% is', items:['U start met € 10.000.','Jaar 1: −20%. U heeft € 8.000.','Jaar 2: +20% op € 8.000. U heeft € 9.600.','Het "gemiddelde" is 0%, maar u verloor € 400. Om terug te komen na −20% is +25% nodig.'] },
  body:[['Volgorde telt','<p>Wie stort of opneemt, merkt dat een daling vlak vóór een grote opname zwaarder weegt dan dezelfde daling aan het begin.</p>']],
  kenner:'<p>Het rekenkundig gemiddelde ligt boven het samengestelde (meetkundige) gemiddelde zodra rendementen schommelen. Voor een planberekening telt het samengestelde rendement, naast een spreiding van mogelijke uitkomsten. Onze rekenvoorbeelden gebruiken bewust een vaste groei; dat is een vereenvoudiging die bij het resultaat staat.</p>',
  doe:{ tekst:'Lees "gemiddeld x%" voortaan als: het eindbedrag kan hoger of lager uitvallen dan een vaste x% per jaar, vooral als u tussentijds geld nodig heeft.', href:'#a-risico-horizon', label:'Wat u in de hand heeft bij een daling' },
  related:['rendement','risico-horizon','nikkei'] });

/* ── Verhalen ──────────────────────────────────────────────── */
art({ id:'fortis', fam:'verhalen', fmt:'Verhaal · 2008', status:'uitgewerkt',
  title:'Een vertrouwde naam. Toch afhankelijk.', lead:'De crisis rond Fortis als vertrekpunt om spreiding te begrijpen.',
  kern:'Een bekende naam is iets anders dan een gespreid geheel.',
  body:[['Wat er gebeurde','<p>In het najaar van 2008 kwam Fortis in de problemen. Op 3 oktober 2008 nam de Nederlandse Staat de Nederlandse onderdelen over, waarvoor hij volgens de Algemene Rekenkamer € 16,8 miljard betaalde.</p>'],
        ['Wat vertrouwd voelt, kan zwaar wegen','<p>Stel u een belegger voor die een groot deel van zijn vermogen aan één bekende financiële onderneming heeft verbonden. Dit is een fictieve persoon, bedoeld om de afhankelijkheid tastbaar te maken.</p><blockquote>Een bekende naam is iets anders dan een gespreid geheel.</blockquote>'],
        ['De les achter het verhaal','<p>Het rekenvoorbeeld onderzoekt alleen het gewicht van één positie bij een veronderstelde daling. Het reconstrueert de Fortis-crisis niet. Meerdere beleggingen kunnen tegelijk dalen.</p>']],
  doe:{ tekst:'Bekijk wat het geheel doet als één positie die 30% van uw vermogen weegt de helft van haar waarde verliest.', href:'#verkennen-spreiding', label:'Bekijk het gewicht van één positie' },
  lens:'spreiding', related:['spreiding','newton','aandelen'], sources:[SRC.rekenkamer] });

art({ id:'newton', fam:'verhalen', fmt:'Bekende persoon · 1720', status:'uitgewerkt',
  title:'Zelfs Newton: waarom kennis niet beschermt tegen meedoen', lead:'Isaac Newton beheerste de wiskunde van de planeten. In de Zuidzeezeepbel van 1720 verloor hij toch een groot deel van zijn vermogen.',
  kern:'Kennis beschermt niet tegen de reflex om mee te doen als iedereen wint. Een vooraf vastgelegde regel wel een beetje.',
  body:[['Eerst voorzichtig','<p>Historicus Andrew Odlyzko reconstrueerde Newtons beleggingen. Volgens zijn onderzoek verkocht Newton in het voorjaar van 1720 het grootste deel van zijn South Sea-aandelen, met winst.</p>'],
        ['Dan toch terug','<p>De koers bleef stijgen. Newton kocht opnieuw, tegen hogere prijzen. In oktober was het aandeel minder dan een kwart van zijn piek waard.</p>'],
        ['Over dat bekende citaat','<p>Newton zou gezegd hebben dat hij de bewegingen van hemellichamen kon berekenen, maar niet de waanzin van mensen. Dat citaat is niet betrouwbaar overgeleverd. De verliezen zelf zijn volgens Odlyzko wel goed gedocumenteerd.</p>']],
  box:{ type:'voorbeeld', label:'Wat u ermee doet', title:'Een regel vóór het moment', text:'Leg vooraf vast hoeveel één belegging van uw vermogen mag zijn. Dan beslist niet het enthousiasme van dat moment.' },
  doe:{ tekst:'Kies uw eigen grens voor één positie en kijk wat een daling dan nog met het geheel doet.', href:'#verkennen-spreiding', label:'Kies uw grens' },
  lens:'spreiding', related:['spreiding','fortis','risico-horizon'], sources:[SRC.odlyzkoPT] });

art({ id:'nikkei', fam:'verhalen', fmt:'Markt · 1989–2024', status:'uitgewerkt',
  title:'Vierendertig jaar wachten: wat één markt kan doen', lead:'Eind december 1989 sloot de Japanse Nikkei-index op een record. Pas op 22 februari 2024 sloot hij er opnieuw boven.',
  kern:'Een markt kan heel lang onder een top blijven. Spreiding over landen en in de tijd is daarom geen detail.',
  body:[['Wat er gebeurde','<p>Eind jaren tachtig stegen Japanse aandelen en vastgoed sterk. Daarna volgde een lange daling. De Nikkei 225 sloot op 22 februari 2024 voor het eerst boven het niveau van december 1989.</p>'],
        ['Wat het niet betekent','<p>Het betekent niet dat elke belegger 34 jaar verlies leed. Wie dividenden ontving, gespreid instapte of ook buiten Japan belegde, had een ander verloop. Het toont wel dat "op lange termijn komt het goed" geen wet is voor één markt.</p>']],
  kenner:`<p><b>Wat verzwijgt een koersindex?</b></p>${T([['','Wat de Nikkei 225-koers toont','Wat er voor een belegger ook telt'],['Dividenden','Niet inbegrepen (koersindex)','Ontvangen of herbelegde dividenden'],['Valuta','In yen','Een euro-belegger had ook wisselkoerseffecten'],['Instapmoment','Eén top als vergelijkingspunt','Gespreid instappen geeft een ander verloop'],['Spreiding','Eén land','Een wereldwijde belegging hing er maar deels van af']])}<p>Het voorbeeld zegt dus vooral iets over instapwaardering en concentratie in één land, niet over beleggen in het algemeen.</p>`,
  doe:{ tekst:'Kijk bij uw eigen beleggingen hoeveel er van één land of regio afhangt.', href:'#a-wereldindex', label:'Wat zit er in een wereldindex?' },
  related:['risico-horizon','spreiding','gemiddelde','wereldindex'], sources:[SRC.bloomberg] });

art({ id:'buffett', fam:'verhalen', fmt:'Bekende persoon · 2008–2017', status:'uitgewerkt',
  title:'Tien jaar, één weddenschap over kosten', lead:'Eind 2007 wedde Warren Buffett dat een goedkoop indexfonds over tien jaar beter zou doen dan een selectie hedgefondsen. De weddenschap ging over kosten.',
  kern:'Een rendement komt en gaat. Hoge kosten gaan elk jaar af.',
  body:[['De afspraak','<p>Van 1 januari 2008 tot 31 december 2017: een S&amp;P 500-indexfonds tegen vijf "fondsen van fondsen", gekozen door Protégé Partners, die samen in meer dan 200 hedgefondsen belegden. De opbrengst ging naar een goed doel.</p>'],
        ['Wat er gebeurde','<p>Volgens Buffetts brief aan de aandeelhouders over 2017 deden alle vijf het in 2008 beter dan het indexfonds. In elk van de negen jaren daarna bleef de groep <em>als geheel</em>, gemiddeld, achter. Dat geldt niet voor elk fonds afzonderlijk: in sommige jaren deed een individueel fonds het wél beter dan de index. Over tien jaar won het indexfonds ruim.</p>'],
        ['Geen zuivere kostentest','<p>De fondsen verschilden ook in strategie, risico en samenstelling. De weddenschap toont dus niet alleen het effect van kosten. Ons kostenvoorbeeld houdt de groei bewust gelijk om alleen dat ene effect te laten zien; dat is een didactische vereenvoudiging, geen verklaring van deze uitkomst.</p>'],
        ['Wat het niet zegt','<p>Dit is geen aanbeveling voor een product, en Buffett heeft niets met Norte te maken. Het is een goed gedocumenteerd voorbeeld van hoe hoge kosten over lange tijd wegen. Een Amerikaans indexfonds is bovendien geen gespreide wereldbelegging.</p>']],
  doe:{ tekst:'Bekijk wat een verschil van één procentpunt kosten per jaar doet over tien jaar, met dezelfde groei.', href:'#verkennen-kosten', label:'Zie het kostenverschil' },
  kenner:'<p>Wat bewijst de weddenschap wél en níet? Ze toont één periode, één markt (Amerikaanse grote bedrijven) en één vergelijking na kosten. Ze bewijst niet dat elk indexfonds altijd wint, en ook niet dat elke actieve beheerder te duur is. Ze maakt wel concreet wat een hoge jaarlijkse kost over tien jaar kan doen. De resultaten uit de brief zijn geschiedenis, geen verwachting.</p>',
  lens:'kosten', related:['kosten','fondsen-etf','wereldindex'], sources:[SRC.buffettBrief, SRC.buffett] });

art({ id:'twee-buren', fam:'verhalen', fmt:'Ontwerpverhaal · fictief', status:'concept',
  title:'Twee buren, één verschil: wanneer u begint', lead:'Een verzonnen verhaal over Lies en Tom, die allebei € 150 per maand opzij zetten. Lies begint tien jaar vroeger.',
  kern:'Het verschil zit niet in het bedrag, maar in de jaren dat het kon groeien.',
  body:[['Het verhaal','<p>Lies en Tom zijn fictieve personen. Ze leggen elk € 150 per maand in. Lies doet dat van haar 30e tot haar 60e, Tom van zijn 40e tot zijn 60e. Lies legt dus € 18.000 meer in, maar het verschil in het eindbedrag is in het rekenvoorbeeld groter dan die € 18.000.</p>'],
        ['Waarom fictief','<p>Een verzonnen voorbeeld maakt een principe tastbaar zonder te doen alsof het om echte klanten of resultaten gaat.</p>']],
  doe:{ tekst:'Zet € 150 per maand in het rekenvoorbeeld, eerst over 30 jaar en dan over 20 jaar. Zie waar het verschil vandaan komt.', href:'#verkennen-tijd', label:'Speel het verhaal na' },
  lens:'tijd', related:['samengestelde-groei','regelmatige-inleg'] });

/* ── Bedrijven en actualiteit ──────────────────────────────── */
art({ id:'asml', fam:'bedrijven', fmt:'Bedrijf · ASML', status:'concept',
  title:'De wereld achter één chip', lead:'ASML ontwerpt en bouwt lithografiemachines, een essentieel onderdeel van de chipproductie: ze gebruiken licht om de minuscule patronen van chips te printen.',
  kern:'Wie een aandeel bekijkt, kijkt naar een bedrijf in een keten, met klanten, leveranciers en politiek.',
  box:{ type:'steps', label:'De keten in vier schakels', title:'Waar één bedrijf van afhangt', items:['Klanten: chipfabrikanten, die investeren in golven.','Hun klanten: de vraag naar chips voor telefoons, auto\'s, datacenters.','Leveranciers: duizenden onderdelen, vaak van gespecialiseerde bedrijven.','Overheden: exportregels tussen landen bepalen mee wie wat mag kopen.'] },
  body:[['Wat een belegger daarvan leert','<p>Een sterk bedrijf kan toch sterk schommelen, door investeringscycli of regelgeving. Eén aandeel is daarom altijd ook een keuze voor concentratie.</p>']],
  doe:{ tekst:'Stel bij een aandeel dat u aanspreekt de vraag: van welke drie dingen hangt dit bedrijf af, en heb ik daar elders al veel van?', href:'#verkennen-spreiding', label:'Bekijk het gewicht van één positie' },
  lens:'spreiding', related:['aandelen','spreiding','wereldindex'], sources:[SRC.asml], beeld:'beelden/asml-campus.jpg' });

art({ id:'wereldindex', fam:'bedrijven', fmt:'Actualiteit', status:'actueel', peildatum:'2026-11-02',
  title:'Een wereldindex: hoe gespreid is "de hele wereld"?', lead:'Een wereldwijde aandelenindex klinkt maximaal gespreid. Toch kan een kleine groep grote bedrijven of één land zwaar wegen.',
  kern:'Gespreid over duizenden namen is niet hetzelfde als gelijk gespreid.',
  box:{ type:'voorbeeld', label:'Zo werkt het', title:'Gewogen naar grootte', text:'De meeste indexen wegen bedrijven naar hun beurswaarde. Is één bedrijf honderd keer groter dan een ander, dan weegt het honderd keer zwaarder. De grootste bedrijven, landen en sectoren bepalen zo een groot deel van het resultaat.' },
  body:[['Wat u nakijkt','<p>Kijk in het overzicht van de index of het fonds naar drie getallen: het gewicht van de tien grootste posities, van het grootste land en van de grootste sector.</p>']],
  kenner:'<p>Bij redactie krijgt dit stuk recente gewichten met bron en peildatum. Tot dan noemt deze kandidaat bewust geen percentages, omdat die voortdurend veranderen.</p>',
  doe:{ tekst:'Zoek in de documentatie van een wereldfonds de top-10-posities en het landengewicht op. Weegt één land meer dan u dacht?', href:'#a-nikkei', label:'Wat één land kan doen' },
  related:['fondsen-etf','spreiding','nikkei','asml'] });

/* ── Uw eigen situatie (bewerkte conceptversies; oorspronkelijke artikels blijven ongewijzigd) ── */
art({ id:'van-ooit-naar-plan', fam:'doelen', fmt:'Stappenplan', status:'concept', bewerkt:true,
  title:'Van "ooit" naar een doel waarmee u kunt rekenen', lead:'"Ooit minder werken" of "later iets voor de kinderen" is een begin. Een wens wordt bruikbaar zodra ze drie dingen krijgt.',
  kern:'Een doel hoeft niet perfect te zijn om een vertrekpunt te zijn: wat, wanneer, en ongeveer hoeveel.',
  box:{ type:'steps', label:'In drie stappen', title:'Van wens naar vertrekpunt', items:['Wat wilt u mogelijk maken? Eén zin volstaat: "vanaf mijn 60e vier dagen werken".','Wanneer? Een jaartal of leeftijd, ook al is het een schatting.','Ongeveer hoeveel? Een orde van grootte: per maand extra, of een bedrag op één moment.'] },
  body:[['Voorbeeld (fictief)','<p>An wil "later wat ademruimte". Uitgeschreven wordt dat: over 15 jaar een jaar lang één dag minder werken, en dat inkomensverschil zelf opvangen. Met dat vertrekpunt kan haar makelaar rekenen; de precieze bedragen komen later.</p>'],
        ['Wat u hier niet hoeft te doen','<p>U hoeft geen inkomsten, uitgaven of bestaande contracten op te lijsten. Wat financieel haalbaar is, bekijkt uw makelaar met u.</p>']],
  doe:{ tekst:'Schrijf uw doel in één zin met een jaartal. Wilt u er al mee rekenen, dan kan dat met uw eigen bedrag.', href:'#simulatie', label:'Reken met uw eigen bedrag' },
  related:['buffer','wat-heeft-u','regelmatige-inleg'] });

art({ id:'buffer', fam:'doelen', fmt:'Stappenplan', status:'concept', bewerkt:true,
  title:'Hoeveel buffer heeft u echt nodig?', lead:'Een buffer is geld dat klaarstaat voor het onverwachte, zodat u een belegging niet op het slechtste moment moet verkopen.',
  kern:'Genoeg om niet te moeten verkopen; niet zoveel dat geld jaren stilstaat zonder reden.',
  box:{ type:'steps', label:'Zo bepaalt u een orde van grootte', title:'Vier vragen', items:['Wat zijn uw vaste uitgaven per maand, ongeveer?','Hoe zeker is uw inkomen? Een vast loon vraagt minder buffer dan een wisselend inkomen.','Welke grotere uitgaven ziet u de komende twee à drie jaar aankomen?','Wat geeft u rust? Ook dat telt, zolang het een bewuste keuze is.'] },
  body:[['Te weinig en te veel','<p>Met te weinig buffer moet u bij een tegenslag misschien verkopen terwijl de beurs laag staat. Met veel meer dan nodig verliest spaargeld jaar na jaar koopkracht. Er bestaat geen bedrag dat voor iedereen klopt.</p>'],
        ['Waar de buffer staat','<p>Een buffer moet snel beschikbaar zijn en mag niet schommelen. Een spaarrekening ligt dan voor de hand; let op de voorwaarden voor de getrouwheidspremie.</p>']],
  doe:{ tekst:'Noteer voor uzelf één bedrag dat u altijd beschikbaar wilt houden. Wat daarboven ligt en lang kan blijven staan, kan een rol krijgen in een plan.', href:'#a-sparen-of-beleggen', label:'Welk geld hoort waar?' },
  related:['sparen-of-beleggen','risico-horizon','spaarrekening','inflatie'] });

art({ id:'wat-heeft-u', fam:'doelen', fmt:'Overzicht', status:'concept', bewerkt:true,
  title:'Wat heeft u eigenlijk? Een overzicht voor uzelf', lead:'Overzicht geeft rust, en het voorkomt dat een nieuwe stap iets dubbel doet wat u al heeft.',
  kern:'Vier soorten bezit, elk met een eigen rol. Een overzicht is voor uzelf; u hoeft het hier nergens in te vullen.',
  body:[['Vier soorten bezit', T([['Soort','Voorbeelden','Rol'],['Beschikbaar','Zicht- en spaarrekeningen','Buffer en kortetermijnuitgaven'],['Belegd','Aandelen, fondsen, trackers, obligaties','Groei op lange termijn, met schommelingen'],['Via verzekering of pensioen','Tak 21, tak 23, pensioensparen, groepsverzekering','Vaak fiscaal gestuurd, met voorwaarden en een termijn'],['Woning en andere bezittingen','Eigen woning, tweede verblijf','Wonen; niet zomaar beschikbaar als geld']])],
        ['Waarom het helpt','<p>Wie ziet dat er al veel in één soort zit, bijvoorbeeld alles op de spaarrekening of alles bij één verzekeraar, weet ook waar een volgende stap het meeste verschil kan maken.</p>']],
  doe:{ tekst:'Maak voor uzelf het lijstje met vier kolommen. Neem het mee naar een gesprek als u wilt; uw makelaar vraagt het dan niet opnieuw van nul.', href:'#a-spreiding', label:'Waar bent u van afhankelijk?' },
  related:['van-ooit-naar-plan','buffer','tak21-tak23','spreiding'] });

/* ── Leerlijnen (Leren = leesmodus van dezelfde artikels) ── */
const paden = [
  { id:'basis', titel:'Hoe werkt beleggen?', belofte:'De bouwstenen en de drie principes die het meest tellen.', stappen:['sparen-of-beleggen','spreiding','kosten','fondsen-etf','aandelen','samengestelde-groei'] },
  { id:'overblijft', titel:'Wat blijft er over?', belofte:'Van bruto naar wat u werkelijk kunt besteden.', stappen:['kosten','inflatie','bruto-netto','belasting-beleggen'] },
  { id:'verzekering', titel:'Beleggen via een verzekering', belofte:'Tak 21, tak 23 en pensioensparen, met hun voorwaarden.', stappen:['tak21-tak23','tak21','tak23','fonds-of-tak23','pensioensparen'] },
  { id:'rendement', titel:'Een berekening lezen', belofte:'Aannames, gemiddelden en geduld.', stappen:['rendement','rekenmethode','gemiddelde','risico-horizon','nikkei'] }
];
const scherp = [
  { a:'rendement', q:'Waarom is een rentecurve geen obligatierendement?', s:'Vergelijkingstabel: wie leent, looptijd, valuta, wat erbij komt' },
  { a:'tak21-tak23', q:'Tak 21: wat is gewaarborgd, en tot wanneer?', s:'Contractvragen, afkoop, Garantiefonds met rekenvoorbeeld' },
  { a:'kosten', q:'Wat vertelt de lopende kost u niet?', s:'Zeven kostenlagen en een mini-rekenvoorbeeld' },
  { a:'nikkei', q:'Wat verzwijgt een koersindex?', s:'Dividenden, valuta, instapmoment en één land' },
  { a:'fonds-of-tak23', q:'Fonds of tracker rechtstreeks, of via tak 23?', s:'Vergelijkingskader: kosten, uitstap, fiscaliteit, begunstigde, bescherming' },
  { a:'belasting-beleggen', q:'Meerwaardebelasting: wat telt als meerwaarde?', s:'Het fotomoment van 31 december 2025, met het voorbeeld van de FOD' }
];
const lenzen = {
  kosten:{ naam:'Kosten', titel:'Een klein verschil. Jaar na jaar.', uitleg:'Zelfde inleg, zelfde groei. Alleen de jaarlijkse kosten verschillen.', artikel:'kosten', groep:'groei' },
  koopkracht:{ naam:'Koopkracht', titel:'Wat kunt u er later mee kopen?', uitleg:'Hetzelfde resultaat, in euro en in koopkracht.', artikel:'inflatie', groep:'groei' },
  tijd:{ naam:'Inleg en tijd', titel:'Wat doet tijd met uw inleg?', uitleg:'Wat u zelf inlegt, apart van wat de aangenomen groei toevoegt.', artikel:'samengestelde-groei', groep:'groei' },
  spreiding:{ naam:'Spreiding', titel:'Hoe zwaar weegt één positie?', uitleg:'Eén belegging daalt in dit voorbeeld. Wat doet dat met het geheel?', artikel:'spreiding', groep:'apart' },
  pensioensparen:{ naam:'Pensioensparen', titel:'Wat levert de belastingvermindering op?', uitleg:'Kies een formule en een jaarbedrag. U ziet de mogelijke vermindering en wat u zelf netto inbrengt.', artikel:'pensioensparen', groep:'apart' }
};
return { versie:V, families, artikels:A, paden, scherp, lenzen, bronnen:SRC };
})();
if (typeof module !== 'undefined') module.exports = NorteInhoud;
