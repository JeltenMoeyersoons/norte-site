/* Norte Kennis — inhoud, eerste volledige redactionele editie (5 november 2026)
   Opmaak in tekst: [[begrip-id|zichtbaar woord]] wordt een begripsopener.
   {{sim:id}} plaatst een bestaande verkenning uit het plan in de lopende tekst (ids: tijd, kosten, koopkracht, spreiding).
   {{sim:tijd:mila}} gebruikt hetzelfde instrument met eigen, bewaarde verhaalinstellingen.
   Elk stuk heeft precies één `vervolg`. Lessen (soort 'uitleg') openen in de leerlaag; hun vervolg volgt daar de lesvolgorde uit app.js.
   Verhalen (soort 'verhaal') openen als redactionele pagina en hebben één eigen vervolg.
   Fictieve personen staan altijd aangekondigd met een korte noot (class "fictie"). */
window.NORTE_INHOUD = {

hoofdstukken: [
  { id:'begin',      thema:'het vertrekpunt',     vraag:'Waar begin ik?',               kort:'Sparen of beleggen, buffer, termijn en de spaarrekening.' },
  { id:'bouwstenen', thema:'de bouwstenen',       vraag:'Waarin kan ik beleggen?',      kort:'Aandelen, obligaties, fondsen, indexen en de verpakking errond.' },
  { id:'opbrengst',  thema:'opbrengst en kosten', vraag:'Wat kan mijn geld opbrengen?', kort:'Rendement, tijd, kosten, belasting en koopkracht.' },
  { id:'risico',     thema:'risico',              vraag:'Wat kan er misgaan?',          kort:'Schommeling, dalingen, spreiding en concentratie.' },
  { id:'samen',      thema:'aanpak',              vraag:'Welke aanpak past bij mij?',   kort:'Profiel, ritme, een kind, opvolgen en de aannames van een plan.' }
],

artikels: [

/* ───────────── 1. WAAR BEGIN IK ───────────── */
{ id:'sparen-of-beleggen', hoofdstuk:'begin', soort:'uitleg',
  titel:'Sparen of beleggen? Het antwoord begint bij wanneer u het geld nodig hebt',
  inleiding:'De vraag ‘sparen of beleggen’ klinkt als een keuze tussen twee producten. In werkelijkheid is het een vraag over tijd: wanneer hebt u dit geld nodig, en wat mag er tussendoor gebeuren?',
  kernidee:'Hetzelfde bedrag kan op een andere plek horen, afhankelijk van wanneer u het nodig hebt.',
  beeld:{ type:'termijn', rijen:[['Nieuwe wagen', 1.5], ['Studies van een kind', 15]], max:15, bijschrift:'Twee potjes van € 10.000. Hetzelfde bedrag, een andere termijn, en dus een andere plek.' },
  tekst:`
<p>Stel u twee potjes voor met elk € 10.000. Het eerste is voor een nieuwe wagen over anderhalf jaar. Het tweede is voor de studies van een kind dat vandaag drie is. Het bedrag is gelijk, de vraag erachter niet.</p>
<p>Bij het eerste potje mag er weinig misgaan. Staat de waarde net vóór de aankoop een vijfde lager, dan moet u uitstellen of lenen. Bij het tweede potje hebt u vijftien jaar. Een slecht jaar onderweg hoeft het doel dan niet meteen in gevaar te brengen. U hebt meer tijd voor mogelijk herstel, al staat dat herstel niet vast.</p>
<p>Dat is in een notendop het verschil. <strong>Sparen</strong> betekent dat uw geld beschikbaar blijft en dat het bedrag in principe niet daalt; u krijgt rente als vergoeding. <strong>Beleggen</strong> betekent dat u uw geld laat werken in bedrijven, leningen of gebouwen. Op lange termijn kan dat meer opbrengen dan sparen, maar de waarde schommelt en kan ook dalen, soms fors en soms jaren na elkaar.</p>

<h2>Eerst de buffer</h2>
<p>Eén vraag gaat aan alles vooraf: wat gebeurt er als morgen de wasmachine stukgaat, de auto een dure herstelling nodig heeft of u een tijd minder verdient? Het geld dat u dan meteen nodig hebt, heet een [[buffer|buffer]].</p>
<p>Die hoort op een spaarrekening, niet in een belegging. Niet omdat sparen ‘beter’ is, maar omdat een buffer er moet zijn op het moment dat u hem nodig hebt, ongeacht hoe de beurs er die week voor staat.</p>
<p>Hoe groot die buffer moet zijn, hangt af van uw situatie. Iemand met een vast contract en een gezin heeft andere noden dan een zelfstandige met een wisselend inkomen. Een veelgebruikte vuistregel is enkele maanden vaste uitgaven, maar een vuistregel is geen maat voor iedereen. Belangrijker dan het exacte getal is het principe: geld dat u binnen afzienbare tijd zeker nodig kunt hebben, belegt u niet.</p>

<h2>Daarna het doel en de tijd</h2>
<p>Wat overblijft na de buffer, kunt u aan een doel koppelen. Een doel maakt beleggen concreet: niet ‘meer rendement’, maar ‘een aanvulling op mijn pensioen vanaf 65’ of ‘de studies van Lien vanaf 2041’. Bij elk doel hoort een [[horizon|termijn]]: de tijd tussen vandaag en het moment dat u het geld wilt gebruiken.</p>
<p>Die termijn bepaalt hoeveel schommeling u zich kunt veroorloven. Hoe langer de termijn, hoe meer tijd een belegging heeft om een slechte periode te herstellen en hoe meer de groei van jaar op jaar zich kan opstapelen. Hoe korter de termijn, hoe groter de kans dat u net op een slecht moment moet verkopen. Daarom kiezen mensen voor geld dat ze binnen enkele jaren nodig hebben vaker voor sparen, en voor geld met een horizon van tien jaar of meer vaker voor een deel beleggen.</p>

<h2>Beschikbaar is niet hetzelfde als waardevast</h2>
<p>Een derde vraag wordt vaak vergeten: hoe snel kunt u aan uw geld? Een spaarrekening is meestal dezelfde dag beschikbaar. Een fonds of aandeel kunt u doorgaans binnen enkele dagen verkopen, maar tegen de prijs van dat moment. Een woning of een verzekeringscontract met een vaste looptijd kan maanden vragen, of kosten als u vroeger wilt stoppen. ‘Ik kan erbij’ en ‘ik krijg terug wat ik erin stak’ zijn dus twee aparte vragen.</p>

<h2>Wat sparen niet doet</h2>
<p>Sparen voelt veilig, en voor de buffer is het dat ook. Toch heeft het een stille keerzijde: stijgen de prijzen sneller dan de rente, dan koopt uw spaargeld elk jaar iets minder. Dat heet [[inflatie|inflatie]].</p>
<p>In 2022 liep de inflatie in België op tot boven de tien procent. Wie toen enkele tienden van een procent spaarrente kreeg, zag de [[koopkracht|koopkracht]] van zijn spaargeld in één jaar duidelijk afnemen, ook al stond hetzelfde bedrag op de rekening. Over lange perioden is dat het risico van niets doen.</p>

<h2>Een volgorde die houvast geeft</h2>
<p>De volgorde is eenvoudig, ook al is de uitwerking persoonlijk. Eerst een buffer die u met een gerust hart kunt aanspreken. Dan per doel de vraag: wanneer heb ik dit nodig, en hoe erg is het als het tussendoor minder waard is? Pas daarna komt de vraag waarin u belegt. Wie die volgorde omdraait en begint bij ‘welk fonds’, kiest vaak een product voor een vraag die nog niet gesteld is.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Welk rendement kan je verwachten?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten' },
    { label:'ECB — What is inflation?', url:'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html' }
  ],
  vervolg:{ type:'lezen', id:'spaarrekening', zin:'De buffer staat meestal op een spaarrekening. Hoe geeft die rekening eigenlijk rente?' }
},

{ id:'spaarrekening', hoofdstuk:'begin', soort:'uitleg',
  titel:'De spaarrekening: twee soorten rente en één datum die telt',
  inleiding:'Eind oktober 2025 stond er bijna 302 miljard euro op Belgische gereglementeerde spaarrekeningen. Het is de meest gebruikte plek voor geld. Wie weet hoe die rekening rente geeft, haalt er meer uit en weet ook waarvoor ze niet dient.',
  kernidee:'Een gereglementeerde spaarrekening geeft een basisrente per dag en een getrouwheidspremie pas na twaalf maanden. Ze is er voor beschikbaarheid, niet voor groei op lange termijn.',
  beeld:{ type:'vergelijk', kolommen:[['Basisrente', ['Loopt vanaf de dag na de storting', 'Wordt per dag berekend, ook als u later afhaalt', 'De bank mag ze op elk moment aanpassen']], ['Getrouwheidspremie', ['Pas verworven na twaalf maanden ononderbroken op de rekening', 'Wordt per storting apart geteld', 'Afhalen vóór die datum: geen premie op dat bedrag']]], bijschrift:'De twee delen van de vergoeding op een gereglementeerde spaarrekening. De precieze voorwaarden staan in de essentiële spaardersinformatie van elke rekening.' },
  tekst:`
<p>De vergoeding op een gereglementeerde spaarrekening bestaat uit twee delen. Het ene begint meteen te lopen, het andere moet u eerst verdienen door het geld te laten staan. Daardoor kunnen twee mensen met hetzelfde bedrag op dezelfde rekening toch een andere vergoeding krijgen.</p>

<h2>De basisrente: elke dag een beetje</h2>
<p>De basisrente loopt ten laatste vanaf de dag na uw storting en wordt per dag berekend, aan het tarief dat die dag geldt, zolang het geld op de rekening staat. Haalt u na drie maanden af, dan hebt u drie maanden basisrente verdiend. De bank betaalt ze eenmaal per jaar uit en mag het percentage op elk moment wijzigen, ook naar beneden.</p>

<h2>De getrouwheidspremie: twaalf maanden geduld</h2>
<p>De [[getrouwheidspremie|getrouwheidspremie]] krijgt u alleen op bedragen die twaalf maanden ononderbroken op de rekening blijven staan. Elke storting heeft zo haar eigen klok.</p>
<p>Het tarief van de premie ligt vast op het moment dat een storting begint te tellen, en de premie wordt meestal per kwartaal uitbetaald. Een voorbeeld. Ann (fictief) zet op 1 maart € 5.000 op haar spaarrekening. Op 15 februari van het jaar daarop haalt ze € 2.000 af voor een herstelling. Op die € 2.000 krijgt ze alleen basisrente: twee weken voor de twaalf maanden om waren, is de premie op dat bedrag verloren. Op de € 3.000 die blijven staan, krijgt ze vanaf 1 maart wel de premie.</p>
<p>Wie geld van de ene naar de andere rekening schuift, kan zo ongemerkt premie verliezen. Bij een overschrijving tussen bepaalde gereglementeerde spaarrekeningen bij dezelfde bank kan de lopende verwervingsperiode onder voorwaarden doorlopen. Vraag dat na vóór u overschrijft; een al verdiende premie en een nog lopende periode zijn verschillende dingen. Bij een andere bank begint de klok opnieuw.</p>
<p>Vergelijk daarom nooit alleen de optelsom van beide percentages. Die geldt pas voor een bedrag dat een jaar blijft staan, en alleen zolang de bank de basisrente niet wijzigt.</p>

<h2>Belasting: vrijgesteld tot een grens</h2>
<p>Op een gereglementeerde spaarrekening is de rente in 2026 vrijgesteld van belasting tot € 1.020 per persoon. Staat de rekening op naam van gehuwden of wettelijk samenwonenden, dan is dat € 2.040. Op de rente boven die grens is 15 procent [[roerende-voorheffing|roerende voorheffing]] verschuldigd. Hebt u meerdere spaarrekeningen, dan telt u de rente samen: de vrijstelling geldt per persoon, niet opnieuw per rekening. Op rente boven de grens die nog niet belast werd, moet u zelf aangifte doen. Voor een niet-gereglementeerde spaarrekening of een termijnrekening gelden andere regels; daar valt rente doorgaans onder het gewone tarief.</p>

<h2>Wat de rekening beschermt, en wat niet</h2>
<p>Gaat een bank failliet, dan beschermt de depositobescherming uw tegoeden tot € 100.000 per persoon en per bank. Wat ze niet beschermt, is de koopkracht. Bij een spaarrente onder de inflatie koopt hetzelfde bedrag elk jaar iets minder, zonder dat u het op uw rekeningafschrift ziet.</p>

<h2>Vergelijken voor uw eigen termijn</h2>
<p>Een rekening met een hoge getrouwheidspremie kan passen bij geld dat zeker een jaar blijft staan. Voor geld dat u mogelijk vroeger gebruikt, telt de basisrente zwaarder. Kijk ook naar voorwaarden zoals een maximaal maandbedrag. De essentiële spaardersinformatie vermeldt de regels; een vergelijking is pas bruikbaar als ze aansluit bij hoelang uw geld werkelijk blijft staan.</p>

<h2>Waarvoor ze dient</h2>
<p>Een spaarrekening is de logische plek voor uw buffer en voor geld dat u binnen een paar jaar nodig hebt: het blijft beschikbaar en het bedrag daalt niet. Voor geld dat twintig jaar kan blijven staan, is ze niet vanzelf de beste oplossing: bij een rente onder de inflatie neemt de koopkracht af. Dat is geen reden om de rekening te wantrouwen. Het is een reden om haar te gebruiken waarvoor ze gemaakt is.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Wat brengt een spaarrekening op?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/wat-brengt-een-spaarrekening-op' },
    { label:'Argenta — Basisrente, getrouwheidspremie en belasting op spaarrente (inkomstenjaar 2026; bancaire bron)', url:'https://www.argenta.be/nl/argenta-informeert/wat-je-moet-weten-over-de-rente-op-je-spaarrekening.html' },
    { label:'Wikifin (FSMA) — Vergelijkingstool spaarrekeningen', url:'https://www.wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen' },
    { label:'FSMA — Advies van 9 januari 2026 over de hervorming van de gereglementeerde spaarrekeningen (bedrag op gereglementeerde rekeningen, oktober 2025)', url:'https://www.fsma.be/sites/default/files/media/files/2026-01/2026-01-09_advies_spaarrekening.pdf' },
    { label:'FOD Financiën — Garantiefonds: beschermingsregelingen', url:'https://garantiefonds.belgium.be/nl/beschermingsregelingen' }
  ],
  vervolg:{ type:'lezen', id:'bouwstenen', zin:'Naast de spaarrekening: wat bezit u eigenlijk met een aandeel, een obligatie of een fonds?' }
},

/* ───────────── 2. WAARIN KAN IK BELEGGEN ───────────── */
{ id:'bouwstenen', hoofdstuk:'bouwstenen', soort:'uitleg',
  titel:'Aandelen, obligaties en fondsen: wat koopt u eigenlijk?',
  inleiding:'De namen lijken ingewikkeld. De eerste vraag is eenvoudig: staat uw geld bij een bank, bent u mede-eigenaar of leent u het uit? Een fonds kan die beleggingen vervolgens samenbrengen.',
  kernidee:'Een aandeel maakt u mede-eigenaar, een obligatie geldschieter. Een fonds brengt beleggingen samen; het risico hangt af van wat erin zit.',
  beeld:{ type:'bouwstenen', bijschrift:'De rol van uw geld. Een fonds kan onder meer aandelen en obligaties combineren.' },
  tekst:`
<p>Stel dat u geld opzijzet voor later. U kunt het op een spaarrekening laten staan, een aandeel kopen of een obligatie. In elk geval verdwijnt er geld van uw betaalrekening. Toch krijgt u er telkens iets anders voor terug. Dat verschil bepaalt waar de opbrengst vandaan kan komen en wat u kunt verliezen.</p>

<h2>Spaargeld: geld bij de bank</h2>
<p>Op een spaarrekening vertrouwt u geld toe aan een bank. In ruil betaalt de bank rente. De voorwaarden bepalen hoeveel, wanneer en hoe snel u aan uw geld kunt. Kijk dus niet alleen naar het aangekondigde percentage, maar ook naar de voorwaarden die erbij horen.</p>
<p>Dat maakt sparen bruikbaar voor een [[buffer|buffer]] of een doel dichtbij. Een spaarrekening bij een bank in de Europese Economische Ruimte valt in beginsel onder depositobescherming: tot € 100.000 per persoon en per bank als de bank failliet gaat. Het is één grens voor al uw rekeningen bij die bank samen, geen grens per rekening. In bepaalde situaties geldt tijdelijk een hogere bescherming; uw bank licht het toepasselijke stelsel toe.</p>
<p>Die bescherming vergoedt geen koersverlies op aandelen of fondsen en beschermt uw koopkracht niet. Stijgen de prijzen sneller dan uw spaarrente, dan kunt u later minder kopen met hetzelfde bedrag.</p>

<h2>Aandelen: een stukje eigenaar</h2>
<p>Met een [[aandeel|aandeel]] bezit u een klein deel van een onderneming en deelt u in haar toekomst. Een bedrijf kan een deel van zijn winst uitkeren als dividend; daarnaast kan de prijs van het aandeel stijgen of dalen. Geen van beide staat vooraf vast.</p>
<p>Een bekende bedrijfsnaam maakt dat risico niet kleiner. Ook een goed bedrijf kan op de beurs tegenvallen als beleggers te veel betaalden voor de verwachte groei. Bij ernstige problemen kunt u een groot deel of uw volledige inleg verliezen. Een aandeel is dus geen spaarrekening met een hogere rente.</p>

<h2>Obligaties: geld uitlenen</h2>
<p>Met een [[obligatie|obligatie]] leent u geld aan een overheid of onderneming. U wordt geen eigenaar. De voorwaarden regelen rente, looptijd en terugbetaling. Bij een gewone obligatie met vaste rente weet u welke betalingen beloofd zijn. Of u ze werkelijk ontvangt, hangt af van de mogelijkheid van de uitgever om te betalen.</p>
<p>Ook de verkoopprijs kan tussentijds veranderen, onder meer wanneer de marktrente wijzigt. Wilt u vóór de vervaldag verkopen, dan krijgt u dus niet noodzakelijk uw oorspronkelijke bedrag terug. ‘Vaste rente’ betekent niet ‘vaste verkoopwaarde’.</p>

<h2>Fondsen: samen in een mand</h2>
<p>Een [[fonds|beleggingsfonds]] brengt het geld van veel beleggers samen en koopt er volgens zijn beleid aandelen, obligaties of een combinatie mee. U koopt een deel van die verzameling, zodat u niet zelf elke belegging hoeft te kiezen.</p>
<p>Een beheerder kan actief keuzes maken of een index volgen. Een ETF is een fonds dat op de beurs verhandeld wordt; veel ETF’s volgen een index, maar er bestaan ook actief beheerde. De naam zegt dus niet genoeg over de aanpak, de kosten of het risico.</p>
<p>Bekijk steeds wat de mand bevat. Een fonds met alleen technologiebedrijven blijft afhankelijk van die ene sector; de verpakking ‘fonds’ maakt de inhoud niet vanzelf voorzichtig. De bruikbaarste eerste vraag bij elk product is daarom: waarin wordt mijn geld werkelijk belegd?</p>
`,
  bronnen:[
    { label:'FOD Financiën — Garantiefonds: beschermingsregelingen', url:'https://garantiefonds.belgium.be/nl/beschermingsregelingen' },
    { label:'Wikifin (FSMA) — Wat is een aandeel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/aandeel/wat-een-aandeel' },
    { label:'Wikifin (FSMA) — Wat is een obligatie?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/obligatie/wat-een-obligatie' },
    { label:'Wikifin (FSMA) — Wat is een beleggingsfonds?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/beleggingsfonds/wat-een-beleggingsfonds' },
    { label:'Wikifin (FSMA) — Indexfondsen, ETF’s en trackers', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/tracker/indexfondsen-etfs-en-trackers' }
  ],
  vervolg:{ type:'lezen', id:'verpakking', zin:'Een fonds zit soms nog in een verzekering of een fiscaal stelsel. Welke laag bepaalt wat?' }
},

{ id:'lotus', hoofdstuk:'bouwstenen', soort:'verhaal',
  titel:'Lotus: wat u koopt als u een stukje van een koekjesbakker koopt',
  inleiding:'Bijna iedere Vlaming kent het speculaasje bij de koffie. Minder mensen weten dat u een stukje van het bedrijf erachter kunt kopen. Wat krijgt u dan precies, en waarom zegt een goed product nog niet of het een goede belegging is?',
  kernidee:'Een aandeel is een stukje van een bedrijf; de prijs ervan weerspiegelt verwachtingen, niet alleen kwaliteit.',
  beeld:{ type:'stroom', stappen:['Lotus Bakeries, het bedrijf', 'Winst uit koekjes en pasta', 'Dividend of herbeleggen: de onderneming beslist'], noot:'De beurskoers is iets anders: wat beleggers vandaag voor een stukje van dat bedrijf willen betalen.', bijschrift:'Wat u als aandeelhouder bezit, en waar uw rendement vandaan kan komen.' },
  tekst:`
<p>In 1932 begon Jan Boone in Lembeke, een dorp in het Meetjesland, karamelkoekjes te bakken. Bijna een eeuw later wordt het speculaasje onder de naam Biscoff in tientallen landen verkocht, ligt er een smeerpasta van in de winkelrekken en heeft Lotus Bakeries een eigen fabriek in de Verenigde Staten.</p>
<p>Het is een van die zeldzame Belgische merken die wereldwijd groeiden zonder hun oorsprong te verliezen. De familie Boone is nog altijd de grootste aandeelhouder. En omdat Lotus op Euronext Brussel noteert, kan ook u een stukje van het bedrijf kopen. Zo’n stukje heet een [[aandeel|aandeel]].</p>

<h2>Wat u werkelijk koopt</h2>
<p>Wie een aandeel Lotus koopt, wordt mede-eigenaar. Niet van een koekje of een fabriek, maar van een heel klein deel van het hele bedrijf: zijn gebouwen, merken, schulden, toekomstige winsten en risico’s.</p>
<p>Als eigenaar hebt u een stem op de algemene vergadering, en als het bedrijf beslist een deel van de winst uit te keren, krijgt u een [[dividend|dividend]]. Dat dividend is niet gegarandeerd: de onderneming beslist over een uitkering, en in een moeilijk jaar kan het lager uitvallen of wegvallen.</p>
<p>Eigenaarschap heeft ook een keerzijde. Gaat een bedrijf failliet, dan worden eerst de schuldeisers betaald: banken, leveranciers, wie het bedrijf geld leende. Aandeelhouders komen als laatste en krijgen vaak niets terug. U deelt in de groei, maar ook in het risico.</p>

<h2>Een goed bedrijf is nog geen goede prijs</h2>
<p>Hier zit het belangrijkste inzicht van dit verhaal. Dat Lotus een sterk bedrijf is, weten beleggers ook. Die kennis zit al in de prijs van het aandeel.</p>
<p>Een aandeel Lotus kostte de voorbije jaren al snel enkele duizenden euro’s per stuk, omdat beleggers veel toekomstige groei verwachten. De vraag voor een belegger is dus niet ‘is dit een goed bedrijf?’ maar ‘is de verwachting die al in de prijs zit, nog te overtreffen?’</p>
<p>Daarom kan een aandeel dalen terwijl het bedrijf groeit. Groeit Lotus met tien procent terwijl beleggers op vijftien procent rekenden, dan kan de koers zakken. Omgekeerd kan een middelmatig bedrijf een goede belegging zijn als het minder slecht doet dan gevreesd. [[volatiliteit|Koersschommelingen]] zeggen vaak meer over veranderende verwachtingen dan over de koekjes zelf.</p>
<p>Zo ontstaat ook het verschil tussen bedrijfsgroei en wat u als aandeelhouder verdient. Uw rendement bestaat uit twee delen: het dividend dat u ontvangt, en het verschil tussen de prijs waartegen u koopt en de prijs waartegen u ooit verkoopt. Dat tweede deel hangt sterk af van uw instapmoment en van wat anderen later bereid zijn te betalen.</p>

<h2>Vertrouwd is niet hetzelfde als gespreid</h2>
<p>Een merk dat u elke dag ziet, voelt vertrouwd. Dat gevoel is begrijpelijk, maar het is geen analyse. Wie al zijn beleggingsgeld in één bedrijf stopt, hoe goed ook, hangt af van dat ene verhaal: een mislukte overname, een nieuwe concurrent, het vertrek van een sleutelfiguur of een productterugroeping. Daarom combineren de meeste beleggers veel bedrijven, uit verschillende sectoren en landen. Hoe zwaar het ontbreken van die [[spreiding|spreiding]] kan wegen, toont het verhaal van Fortis.</p>
<p>Lotus dient hier als herkenbaar voorbeeld van wat een aandeel is. Het verhaal zegt niets over de vraag of het aandeel vandaag een goede koop is.</p>
`,
  bronnen:[
    { label:'Lotus Bakeries — Jaarresultaten 2025 (persbericht)', url:'https://www.lotusbakeries.com/sites/default/files/documents-en/PR_2025_Annual_Results_Lotus_Bakeries_EN_1.pdf' }
  ],
  vervolg:{ type:'lezen', id:'staatsbon', zin:'Een aandeel maakt u eigenaar. Een obligatie maakt u geldschieter. In 2023 deden honderdduizenden Belgen dat tegelijk.' }
},

{ id:'staatsbon', hoofdstuk:'bouwstenen', soort:'verhaal',
  titel:'De staatsbon van 2023: wat kocht u eigenlijk?',
  inleiding:'In de zomer van 2023 stonden er wachtrijen aan bankloketten en liepen websites vast. De Belgische staat bood een bon aan van één jaar met een rente die ver boven die van de meeste spaarrekeningen lag. Het is het helderste voorbeeld van wat een obligatie is.',
  kernidee:'Een obligatie is een lening: u krijgt rente en, als de lener kan betalen, op de einddatum uw inleg terug.',
  beeld:{ type:'tijdlijn', punten:[['4 september 2023', 'U leent € 10.000 aan de Belgische staat'], ['Na één jaar', 'Rente € 330 bruto, ongeveer € 280 netto'], ['Vervaldag', '€ 10.000 terug, als de staat kan betalen']], bijschrift:'De staatsbon van één jaar als rekensom. Historische uitgifte; de fiscale regeling gold alleen toen.' },
  teaser:'Spaarders leenden in 2023 massaal geld aan België. Wat kregen ze daarvoor terug?',
  tekst:`
<p>Op 4 september 2023 gaf het Federaal Agentschap van de Schuld een staatsbon uit met een looptijd van één jaar. Bruto rente: 3,30 procent. En voor deze ene uitgifte een verlaagde roerende voorheffing van 15 procent in plaats van de gewone 30.</p>
<p>Wie € 10.000 inlegde, kreeg na een jaar € 10.000 terug plus ongeveer € 280 netto rente. Veel gewone spaarrekeningen gaven toen een totaalrente die daar ver onder lag. Er werd uiteindelijk bijna 22 miljard euro ingeschreven, een record voor zo’n uitgifte.</p>
<p>Die staatsbon is intussen terugbetaald en wordt niet meer aangeboden. De fiscale regeling gold voor die uitgifte en is geen huidige regel. Maar het mechanisme dat zoveel mensen toen leerden kennen, blijft hetzelfde voor elke [[obligatie|obligatie]].</p>

<h2>Hoe een obligatie werkt</h2>
<p>Een obligatie is een lening aan een staat of een bedrijf. In ruil krijgt u twee beloftes. De eerste is rente, bij obligaties vaak de [[coupon|coupon]] genoemd: een vast percentage van het geleende bedrag, meestal jaarlijks uitbetaald. De tweede is terugbetaling: op de einddatum, de vervaldag, krijgt u het nominale bedrag terug.</p>
<p>Anders dan bij een aandeel deelt u niet in de groei van de lener. Doet de Belgische staat het een jaar beter dan verwacht, dan krijgt u nog altijd 3,30 procent. Dat is meteen het aantrekkelijke van een obligatie: u weet vooraf wat u ontvangt, zolang de lener zijn beloftes nakomt.</p>

<h2>‘Zolang de lener betaalt’</h2>
<p>Die bijzin is belangrijk. Een obligatie is maar zo zeker als wie ze uitgeeft. Het risico dat een lener niet kan terugbetalen, heet [[kredietrisico|kredietrisico]]. Voor de Belgische staat wordt dat risico laag ingeschat, maar het is niet nul.</p>
<p>Bij bedrijven loopt het uiteen: een obligatie van een zeer solide onderneming draagt weinig risico, een obligatie van een bedrijf in moeilijkheden veel meer. Daarom bieden riskantere leners een hogere rente aan. Een opvallend hoge rente is dus altijd een vraag waard: waarom moet deze lener zoveel betalen om geld te vinden?</p>

<h2>Wat als u niet tot het einde wacht?</h2>
<p>Een obligatie die u tot de vervaldag houdt, levert op wat beloofd is, als de lener betaalt. Wilt u eerder verkopen, dan krijgt u de marktprijs van dat moment, en die hangt af van de rente op dat moment. Stijgt de rente naar 4 procent, dan wil niemand nog de volle prijs betalen voor uw bon van 3,30 procent, en daalt de waarde ervan.</p>
<p>Omgekeerd stijgt de waarde als de rente daalt. Bij een looptijd van één jaar is dat effect klein. Bij een obligatie van tien of twintig jaar kan het groot zijn. Ook een ‘veilige’ obligatie kan dus tijdelijk minder waard zijn dan u ervoor betaalde.</p>

<h2>Waarom de staatsbon zoveel teweegbracht</h2>
<p>Het succes van de uitgifte zette de banken onder druk. Kort erna verhoogden verschillende banken hun spaarrente of lanceerden ze eigen termijnproducten. Voor veel spaarders was het de eerste keer dat ze bewust vergeleken: wat krijg ik waar, voor hoe lang ligt mijn geld vast, en wat houd ik over na belasting? Precies die drie vragen, rente, looptijd en netto opbrengst, zijn de kern van elke obligatie.</p>

<h2>Het tweede bouwblok</h2>
<p>Obligaties zijn, naast aandelen, het tweede grote bouwblok. Ze schommelen doorgaans minder, leveren een vooraf gekende rente op en worden vaak gebruikt om een belegging rustiger te maken. Zonder risico zijn ze niet: er is het kredietrisico, het renterisico bij tussentijdse verkoop, en het risico dat de rente na belasting en inflatie weinig overlaat. Wie wil weten wat een obligatie vandaag oplevert, kijkt naar de actuele voorwaarden en fiscaliteit; die van 2023 gelden niet meer.</p>
`,
  bronnen:[
    { label:'Federaal Agentschap van de Schuld — Opbrengst 1-jarige staatsbon 4 september 2023', url:'https://www.debtagency.be/nl/content/opbrengst-van-de-1-jarige-staatsbon-van-4-september-2023' }
  ],
  vervolg:{ type:'lezen', id:'verpakking', zin:'Weinig mensen kopen losse aandelen en obligaties. Meestal zitten ze samen in een fonds, soms nog in een verzekering. Wat is wat?' }
},

{ id:'verpakking', hoofdstuk:'bouwstenen', soort:'uitleg',
  titel:'Belegging, fonds en verpakking: drie lagen die vaak door elkaar lopen',
  inleiding:'‘Ik heb een tak 23.’ ‘Ik zit in een ETF.’ ‘Mijn pensioensparen loopt via een fonds.’ Het zijn drie zinnen over drie verschillende dingen. Wie de lagen uit elkaar haalt, begrijpt veel beter wat hij bezit en wat het kost.',
  kernidee:'Veel producten kunt u in lagen lezen: de belegging, het fonds en een eventuele verzekering of fiscale regeling. Elke laag voegt eigen regels, kosten en soms risico’s toe.',
  beeld:{ type:'lagen', lagen:[['Verpakking', 'Tak 21, tak 23, pensioensparen: regels, fiscaliteit, kosten'], ['Fonds', 'De mand: actief beheerd of een index volgend'], ['Belegging', 'Aandelen, obligaties, vastgoed, cash: hier zit het eigenlijke risico']], bijschrift:'Drie lagen. Lees ze van onder naar boven.' },
  tekst:`
<p>Denk aan een fruitmand. Onderaan liggen de stukken fruit: appels, peren, druiven. Dat zijn de eigenlijke beleggingen, zoals aandelen en obligaties. Daarboven komt de mand, die het fruit samenbrengt. Dat is het fonds. En soms zit de mand nog in een geschenkverpakking, met een kaartje erbij en eigen regels over wanneer u ze mag openen. Dat is de verpakking: een verzekering of een fiscaal spaarstelsel.</p>
<p>Wie wil begrijpen wat hij heeft, stelt op elke laag één vraag: wat zit erin, hoe is het samengesteld, en welke regels en kosten horen bij de verpakking?</p>

<h2>Onderaan: de belegging zelf</h2>
<p>Onderaan staan altijd dezelfde bouwblokken: [[aandeel|aandelen]] van bedrijven, [[obligatie|obligaties]] van staten en bedrijven, soms vastgoed of grondstoffen, en cash. De risico’s en kansen van uw belegging komen in de eerste plaats van hier. Een fonds dat in technologieaandelen belegt, schommelt zoals technologieaandelen schommelen, ongeacht hoe het verpakt is.</p>

<h2>In het midden: de mand</h2>
<p>Een [[fonds|beleggingsfonds]] bundelt het geld van veel beleggers en koopt daarmee een mand van beleggingen. Met één aankoop bent u zo gespreid over tientallen of honderden bedrijven of leningen. Een actief beheerd fonds heeft een beheerder die kiest wat erin gaat; een indexfonds volgt een vaste lijst. Een [[etf|ETF]] is een fonds dat op de beurs verhandeld wordt, meestal maar niet altijd een indexfonds.</p>
<p>Een fonds is niet automatisch voorzichtig of gespreid. Een fonds dat alleen in één sector belegt, blijft van die sector afhankelijk; een landenfonds houdt een sterk landengewicht. Lees dus wat erin zit.</p>

<h2>Bovenaan: de verpakking</h2>
<p>Hier zit de verwarring meestal. Een verpakking voegt regels toe: fiscaliteit, kosten, wat er bij overlijden gebeurt en hoe snel u aan uw geld kunt. Ze kan ook extra bescherming of tegenpartijrisico meebrengen. Bij tak 21 is juist de belofte van de verzekeraar bepalend; dat is geen gewoon fonds met een ander etiket.</p>
<p>Een [[tak23|tak 23]] is een levensverzekering waarvan de waarde gekoppeld is aan fondsen; het beleggingsrisico draagt u in principe zelf. Een [[tak21|tak 21]] is een levensverzekering met een rente die de verzekeraar waarborgt. [[pensioensparen|Pensioensparen]] is een fiscaal stelsel dat als fonds of als verzekering kan bestaan. Elk van die verpakkingen heeft een eigen les in deze leeromgeving; hier volstaat het principe dat ze bovenop de inhoud komen.</p>

<h2>Beschermd is niet hetzelfde als gegarandeerd</h2>
<p>Die woorden klinken gelijk, maar ze betekenen iets anders. Spaargeld valt onder de depositobescherming. Voor tak 21 bestaat een aparte regeling via het Garantiefonds. Een tak 23-contract valt daar niet onder, en geen enkele regeling vergoedt een koersdaling van de fondsen waarin u belegt.</p>
<p>Bij sommige beleggingsproducten staat ‘kapitaalbescherming’. Dat is geen belofte dat u altijd uw inleg terugkrijgt. De bescherming geldt meestal alleen op de vervaldag, voor het bedrag dat werkelijk belegd werd, zonder de kosten. Wie eerder uitstapt, krijgt de waarde van dat moment. En de bescherming is zo sterk als wie ze geeft: gaat de instelling die het product uitgeeft of de bescherming verleent failliet, dan kunt u een groot deel of alles verliezen.</p>
<p>Ook een fiscaal voordeel is geen bescherming. De belastingvermindering bij pensioensparen verandert niets aan het risico van het fonds waarin u spaart.</p>

<h2>Waarom het onderscheid ertoe doet</h2>
<p>Twee mensen kunnen precies hetzelfde wereldwijde aandelenfonds bezitten: de ene rechtstreeks, de andere in een tak 23. Ze zijn blootgesteld aan dezelfde fondsbewegingen, maar de verzekering voegt eigen contractvoorwaarden toe. Hun kosten, fiscaliteit en regels bij overlijden kunnen verschillen. Omgekeerd kunnen twee producten met dezelfde naam ‘tak 23’ totaal verschillende risico’s hebben, omdat het ene in obligaties belegt en het andere in aandelen uit opkomende markten.</p>
<p>Stel bij elk product daarom drie vragen, van onder naar boven. Waarin wordt er eigenlijk belegd? Hoe is dat samengebracht, en wat kost dat jaarlijks? En welke verpakking zit errond, met welke fiscale regels, instapkosten en voorwaarden om eruit te gaan?</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Het risico spreiden', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/het-risico-spreiden-niet-alle' },
    { label:'Wikifin (FSMA) — Indexfondsen, ETF’s en trackers; passief en actief beheer', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/tracker/indexfondsen-etfs-en-trackers' },
    { label:'FOD Financiën — Garantiefonds: bescherming van levensverzekeringen tak 21 (FAQ)', url:'https://garantiefonds.belgium.be/nl/faq-0' },
    { label:'Wikifin (FSMA) — Gestructureerde producten: kapitaalbescherming', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/gestructureerde-producten' }
  ],
  vervolg:{ type:'lezen', id:'actief-index', zin:'In de middelste laag kiest u tussen een beheerder die kiest en een fonds dat een lijst volgt. Wat is het verschil echt?' }
},

{ id:'actief-index', hoofdstuk:'bouwstenen', soort:'uitleg',
  titel:'Actief beheerd of een index volgen: wat u eigenlijk kiest',
  inleiding:'Een beheerder die zelf kiest, of een fonds dat een vaste lijst volgt: het klinkt als een keuze tussen inzet en gemakzucht. In werkelijkheid kiest u tussen twee manieren om dezelfde markt te bezitten, met een ander kostenplaatje en een ander soort afwijking.',
  kernidee:'Een indexfonds volgt een lijst volgens vaste regels; een actief fonds wijkt daar bewust van af. Beide dragen het risico van de markt waarin ze beleggen, en twee fondsen kunnen voor een groot deel hetzelfde bezitten.',
  beeld:{ type:'vergelijk', kolommen:[['Actief beheerd', ['Een beheerder kiest en weegt zelf', 'Doel: beter doen dan de markt, of risico beperken', 'Doorgaans hogere kosten; het resultaat hangt mee af van die keuzes']], ['Een index volgen', ['Volgt een vaste lijst en weging', 'Doel: de markt zo dicht mogelijk volgen', 'Doorgaans lagere kosten; u krijgt de markt, ook als die daalt']]], bijschrift:'Twee manieren om een strategie uit te voeren. Het risico komt vooral van de markt waarin ze beleggen; een actieve beheerder kan daar bewust meer of minder van nemen.' },
  tekst:`
<p>Een [[index|index]] is een lijst met regels. De MSCI World-index, die veel Vlaamse beleggers via een fonds bezitten, bevatte eind oktober 2026 1.248 bedrijven uit 23 ontwikkelde landen. Hoe groter de beurswaarde van een bedrijf, hoe zwaarder het in de lijst weegt. Een indexfonds koopt die lijst na, in dezelfde verhoudingen, en past zich aan wanneer de lijst verandert.</p>

<h2>Ook een index maakt keuzes</h2>
<p>Volgen klinkt neutraal, maar de regels van de index bepalen wat u bezit. In diezelfde MSCI World woog de Verenigde Staten op 30 oktober 2026 voor 72,8 procent. Japan, het tweede land, kwam niet verder dan 5,7 procent. De tien grootste posities waren samen goed voor 26,6 procent van de hele index; Alphabet telt daarin twee keer mee, met twee soorten aandelen. Technologie alleen woog bijna 30 procent. Het is een momentopname: zulke gewichten verschuiven voortdurend.</p>
<p>‘Wereldwijd gespreid over 1.248 bedrijven’ is dus waar, en tegelijk weegt een handvol namen zwaar. Bedrijven uit opkomende landen zoals India of Brazilië zitten er niet in; daarvoor bestaan bredere indexen. Wie een index kiest, kiest dus ook een verdeling.</p>

<h2>Wat een actieve beheerder probeert</h2>
<p>Een actieve beheerder wijkt bewust af van de index. Hij koopt meer van wat hij goedkoop vindt, minder van wat hij duur vindt, of houdt meer cash aan als hij een daling vreest. Dat kan zin hebben: om beter te doen dan de markt, of om dalingen te verzachten. Die keuzes veranderen ook het risico: een geconcentreerd actief fonds kan beweeglijker zijn dan zijn index, een voorzichtig fonds rustiger.</p>
<p>Het werk kost geld: analisten, onderzoek, meer aan- en verkopen. Die kosten moeten eerst terugverdiend worden voor er iets overblijft. De SPIVA-rapporten van S&P, die actief beheerde Europese fondsen jaarlijks naast hun vergelijkingsindex leggen, tonen in de meeste categorieën dat een meerderheid achterblijft, en dat dit aandeel groter wordt naarmate de periode langer is. S&P maakt zelf indexen; lees het dus als onderzoek van een belanghebbende partij, met een duidelijke methode. Het betekent niet dat elk actief fonds slecht is. Het betekent wel dat het vooraf moeilijk te weten is welk fonds de uitzondering wordt.</p>

<h2>Wanneer twee fondsen één fonds blijken</h2>
<p>Stel dat u een wereldfonds bezit, een Amerikaans technologiefonds en een ‘duurzaam wereldfonds’. Drie namen, drie beheerders. Toch zitten Apple, Nvidia en Microsoft vermoedelijk in alle drie, en in de MSCI World alleen wogen die drie bedrijven eind oktober 2026 al samen ongeveer 15 procent. Meer fondsen naast elkaar betekent dan niet meer spreiding, wel meer van hetzelfde.</p>
<p>Kijk daarom door de namen heen. Het informatieblad van een fonds vermeldt de grootste posities en de verdeling over landen en sectoren. Leg die van uw fondsen naast elkaar: de overlap ziet u vaak in één oogopslag.</p>

<h2>ETF, indexfonds, tracker</h2>
<p>Een [[etf|ETF]] wordt op de beurs verhandeld, tegen de koers van dat moment, via een effectenrekening; bij aan- en verkoop kunnen beurstaks en transactiekosten gelden. Een klassiek indexfonds koopt u bij een bank of verzekeraar. ‘Tracker’ is in België een gangbaar woord voor beide. Ook een indexfonds wijkt een beetje af van zijn index, door de kosten en door de manier waarop het de lijst nabootst. Dat verschil heet de tracking difference en staat in de documenten van het fonds.</p>

<h2>Drie vragen bij elk fonds</h2>
<p>Volgt het een index, welke dan, en hoe is die samengesteld? Wat zijn de grootste posities, landen en sectoren, en hoeveel daarvan bezit u al via een ander product? En wat kost het totaal per jaar, in euro? Met die drie antwoorden weet u meer over uw risico dan met het label ‘actief’ of ‘passief’.</p>
`,
  bronnen:[
    { label:'MSCI — MSCI World Index (USD), factsheet 30 oktober 2026 (samenstelling, landen, grootste posities)', url:'https://www.msci.com/documents/10199/178e6643-6ae6-47b9-82be-e1fc565ededb' },
    { label:'S&P Dow Jones Indices — SPIVA Europe Year-End 2025 (onderzoek van een indexaanbieder)', url:'https://www.spglobal.com/spdji/en/spiva/article/spiva-europe-year-end-2025/' },
    { label:'Wikifin (FSMA) — Indexfondsen, ETF’s en trackers', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/tracker/indexfondsen-etfs-en-trackers' }
  ],
  vervolg:{ type:'lezen', id:'tak21-tak23', zin:'Een fonds kan nog in een verzekering zitten. Wat belooft een verzekeraar bij tak 21, en wat niet bij tak 23?' }
},

{ id:'tak21-tak23', hoofdstuk:'bouwstenen', soort:'uitleg',
  titel:'Tak 21 en tak 23: wat een verzekeraar belooft, en wat niet',
  inleiding:'Beide zijn levensverzekeringen en beide kunnen spaargeld laten groeien. Toch draagt bij de ene vooral de verzekeraar het risico, bij de andere vooral u. Wie dat verschil kent, leest een voorstel anders.',
  kernidee:'Tak 21 waarborgt een rente op elke storting, voor een afgesproken duur en zolang de verzekeraar kan betalen. Tak 23 volgt de waarde van fondsen en heeft geen standaardwaarborg.',
  beeld:{ type:'vergelijk', kolommen:[['Tak 21', ['Gewaarborgde rente per storting, voor een afgesproken duur', 'Eventueel winstdeelname, niet gewaarborgd', 'Garantiefonds tot € 100.000 per persoon en per verzekeraar naar Belgisch recht']], ['Tak 23', ['De waarde volgt de onderliggende fondsen', 'Geen standaardwaarborg op kapitaal of rendement', 'Niet gedekt door het Garantiefonds']]], bijschrift:'De kern van beide verzekeringen. Kosten, premietaks en fiscale regels komen er bij beide nog bij.' },
  tekst:`
<p>Een levensverzekering om te sparen of te beleggen is een contract met een verzekeraar: u stort premies, en het contract bepaalt wat u later terugkrijgt, of wat uw begunstigde krijgt als u overlijdt. Het verschil tussen de twee takken zit in één vraag: wie draagt het risico als het tegenzit?</p>

<h2>Tak 21: een belofte per storting</h2>
<p>Bij [[tak21|tak 21]] waarborgt de verzekeraar een rente. Die geldt per storting: de rente van vandaag geldt voor wat u vandaag stort, en de verzekeraar mag de rente voor toekomstige stortingen aanpassen. Bij sommige contracten geldt de gewaarborgde rente voor de hele looptijd, bij andere voor een beperkte periode, waarna een nieuwe rente volgt. Die duur staat in de voorwaarden en is minstens zo belangrijk als het percentage.</p>
<p>Daarbovenop kan de verzekeraar winstdeelname toekennen, afhankelijk van zijn resultaten. Die is niet gewaarborgd: in een slecht jaar kan ze kleiner zijn of wegvallen.</p>

<h2>Gewaarborgd, maar niet gratis</h2>
<p>De gewaarborgde rente rekent meestal op uw storting na kosten en taks. Bij een gewone individuele spaar- of beleggingsverzekering geldt voor particulieren doorgaans 2 procent premietaks; voor fiscale pensioenspaarverzekeringen geldt die taks niet. Daarnaast rekenen veel contracten instapkosten aan.</p>
<p>Een fictief rekenvoorbeeld. U stort € 10.000. Na 2 procent taks en 2 procent instapkosten werkt ongeveer € 9.600 voor u. Bij een gewaarborgde rente van 1,5 procent duurt het bijna drie jaar voor u weer op € 10.000 staat. Wie na een jaar stopt, krijgt dus minder terug dan hij stortte, ook al was alles ‘gewaarborgd’. Een waarborg betekent niet dat u altijd uw volledige inleg terugkrijgt: na kosten, en bij een zeer lage gewaarborgde rente, kan het resultaat lager uitvallen dan wat u stortte. Bij een afkoop in de eerste acht jaar kan bovendien roerende voorheffing gelden; de precieze regels hangen af van het contract.</p>

<h2>Zo sterk als de verzekeraar</h2>
<p>Een waarborg is een belofte van één onderneming. Gaat een verzekeraar naar Belgisch recht failliet, dan komt het Garantiefonds tussen tot € 100.000 per persoon en per instelling, voor al zijn individuele tak 21-contracten bij die verzekeraar samen. Groepsverzekeringen en het vrij aanvullend pensioen voor zelfstandigen (VAPZ) vallen daar niet onder. Voor een verzekeraar naar buitenlands recht geldt de regeling van dat land, en die is in Europa niet gelijkgeschakeld. Wie bij dezelfde verzekeraar een pensioenspaarverzekering van € 25.000 en een spaarverzekering van € 150.000 heeft, is samen voor € 100.000 beschermd, niet voor € 175.000. Die bescherming bestaat sinds de financiële crisis van 2008.</p>

<h2>Tak 23: u draagt het beleggingsrisico</h2>
<p>Bij [[tak23|tak 23]] is de waarde van uw contract gekoppeld aan een of meer fondsen. Stijgen die, dan stijgt uw contract; dalen ze, dan daalt het mee. Er is geen standaardwaarborg op kapitaal of rendement, en het Garantiefonds komt nooit tussen voor tak 23. Het risico hangt af van wat in de fondsen zit: een obligatiefonds schommelt doorgaans veel minder dan een aandelenfonds uit opkomende landen.</p>
<p>Dat betekent niet dat geen enkel tak 23-contract een vorm van bescherming kan hebben. Sommige contracten gebruiken een fonds met een beschermingsmechanisme, combineren tak 23 met een tak 21-deel, of voegen een overlijdensdekking toe. Lees dan altijd wie die bescherming geeft, wanneer ze geldt en wat ze kost.</p>

<h2>Waarom mensen voor een verzekering kiezen</h2>
<p>Een verzekering voegt regels toe die een gewone beleggingsrekening niet heeft. U duidt een begunstigde aan die bij overlijden het kapitaal krijgt, wat bij vermogensplanning een rol kan spelen. Binnen veel tak 23-contracten kunt u tussen fondsen wisselen. Daar staan de premietaks, de contractkosten en de fondskosten tegenover.</p>
<p>Ook fiscaal kan een verzekering anders behandeld worden dan een rechtstreekse belegging. Hoe de meerwaardebelasting die sinds 2026 geldt op een bepaald verzekeringscontract van toepassing is, hangt af van dat contract; laat dat voor uw eigen contract bevestigen. Vergelijk een verzekering met een rechtstreekse belegging daarom op hetzelfde niveau: dezelfde inhoud, alle kosten, dezelfde termijn.</p>
`,
  bronnen:[
    { label:'FSMA — Tak 21-levensverzekering (waarborg is niet altijd uw netto inleg terug)', url:'https://www.fsma.be/nl/tak-21-levensverzekering' },
    { label:'FOD Financiën — Garantiefonds: beschermingsregelingen (scope tak 21)', url:'https://garantiefonds.belgium.be/nl/beschermingsregelingen' },
    { label:'Wikifin (FSMA) — Wat zijn de risico’s en opbrengsten van een tak 21-spaarverzekering?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-21/wat-zijn-de-0' },
    { label:'Wikifin (FSMA) — De levens- en overlijdensverzekering: bescherming door het Garantiefonds', url:'https://www.wikifin.be/nl/budget-betalen-lenen-en-verzekeren/verzekeren/familie/de-levens-en-overlijdensverzekering/wat' },
    { label:'Wikifin (FSMA) — Langetermijnsparen: tak 21 en tak 23', url:'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/vermindering-voor-langetermijnsparen' },
    { label:'FOD Financiën — Meerwaardebelasting op financiële activa', url:'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting' },
    { label:'Rekenvoorbeeld: € 10.000 − 2 % premietaks − 2 % instapkosten ≈ € 9.600; aan 1,5 % per jaar terug op € 10.000 na ongeveer 2,7 jaar. Fictief; kosten verschillen per contract.', url:null }
  ],
  vervolg:{ type:'lezen', id:'pensioensparen', zin:'Pensioensparen bestaat als fonds én als verzekering. Wat levert het voordeel op, en wat vraagt het terug?' }
},

{ id:'pensioensparen', hoofdstuk:'bouwstenen', soort:'uitleg',
  titel:'Pensioensparen: hoe werkt het belastingvoordeel?',
  inleiding:'Een storting voor later kan vandaag uw belasting verlagen. Hoe groot is dat voordeel, en wat betekent het voor de kosten, beschikbaarheid en belasting later?',
  kernidee:'U krijgt elk jaar een belastingvermindering op uw storting, binnen een plafond. In ruil blijft het geld in principe tot uw zestigste in het stelsel, en volgt er een eindbelasting.',
  beeld:{ type:'vergelijk', kolommen:[['Basisplafond', ['Storting tot € 1.050 per jaar', '30 % belastingvermindering', 'Maximaal € 315 voordeel']], ['Verhoogd plafond', ['Storting tot € 1.350, na een uitdrukkelijke keuze', '25 % op het volledige bedrag', 'Maximaal € 337,50 voordeel']]], bijschrift:'De twee plafonds voor het inkomstenjaar 2026, zoals Wikifin ze vermeldt. Controleer de bedragen en voorwaarden voor het jaar waarin u stort.' },
  tekst:`
<p>Pensioensparen is een fiscaal stelsel, geen product. U kiest een pensioenspaarfonds bij een bank of een pensioenspaarverzekering bij een verzekeraar, stort elk jaar een bedrag, en de overheid geeft u een vermindering op uw personenbelasting. Wat het oplevert, hangt af van drie dingen: het voordeel, de inhoud en de afspraken voor later.</p>

<h2>Twee plafonds, en een zone om te vermijden</h2>
<p>Voor het inkomstenjaar 2026 kunt u kiezen tussen twee plafonds. Stort u tot € 1.050, dan krijgt u 30 procent belastingvermindering: maximaal € 315. Kiest u uitdrukkelijk voor het hogere plafond van € 1.350, dan krijgt u 25 procent op het hele bedrag: maximaal € 337,50.</p>
<p>Daar zit een valkuil. Een storting tussen € 1.050 en € 1.260 levert minder voordeel op dan precies € 1.050, omdat dan het lagere percentage op alles geldt. Bij € 1.260 is de vermindering opnieuw € 315; pas daarboven wordt ze groter. Het hogere plafond levert maximaal € 22,50 extra belastingvermindering op, bij € 300 extra storting. Meer storten bouwt ook meer kapitaal op, maar welk bedrag past, hangt van uw budget en doel af.</p>
<p>Een belastingvermindering verlaagt de belasting die u verschuldigd bent. Wie weinig of geen personenbelasting betaalt, heeft er dus minder of geen voordeel van.</p>

<h2>Fonds of verzekering</h2>
<p>Een pensioenspaarfonds belegt in aandelen en obligaties; de waarde hangt af van die beleggingen en er is geen waarborg. Een pensioenspaarverzekering in [[tak21|tak 21]] garandeert in principe een afgesproken opbrengst op elke storting en valt, bij een verzekeraar naar Belgisch recht, onder het Garantiefonds. Er bestaat ook een tak 23-vorm, zonder waarborg. Bij beide vormen kunnen instapkosten en jaarlijkse kosten spelen. Vergelijk de concrete tarieven.</p>
<p>U kunt later van fonds wisselen of van verzekeraar, maar alleen binnen dezelfde soort: van fonds naar fonds, van verzekering naar verzekering. Van een fonds naar een verzekering overstappen, of omgekeerd, geldt als een vervroegde opname en wordt zwaar belast.</p>

<h2>De rekening op zestig</h2>
<p>Meestal volgt op uw zestigste een heffing van 8 procent. Begon u na uw 55ste, dan gebeurt dat doorgaans op de tiende verjaardag van het contract. De belastbare basis verschilt: bij een fonds rekent de fiscus met een fictieve jaarlijkse groei van 4,75 procent op de stortingen; bij tak 21 met de gegarandeerde opbouw zonder winstdeelname; bij tak 23 met de contractwaarde op dat moment. Het is dus niet eenvoudigweg 8 procent van elk eindbedrag.</p>
<p>Wilt u het geld eerder, dan kost dat meestal 33 procent belasting op de afkoopwaarde, bij een verzekering vaak nog vermeerderd met uitstapkosten. Een pensioenspaarrekening is dus geen spaarpot voor een verbouwing of een woning: wie vóór zijn zestigste opneemt, geeft het grootste deel van het voordeel terug. De meerwaardebelasting die sinds 2026 op beleggingen geldt, is op pensioenspaarrekeningen niet van toepassing.</p>

<h2>Wat het voordeel waard is</h2>
<p>Lies (fictief) is 35 en stort elk jaar € 1.050 in een pensioenspaarfonds. Elk jaar krijgt ze € 315 belasting terug. Als ze voldoende personenbelasting verschuldigd is, verlaagt dat haar belasting met 30 procent van de storting. Dat is een fiscaal voordeel op die storting, geen jaarlijks beleggingsrendement. Daartegenover staan kosten, de latere heffing en beperkte beschikbaarheid.</p>
<p>Wat het voordeel niet doet, is het fonds veranderen. Een fonds met hoge jaarlijkse kosten blijft dat, vijfentwintig jaar lang. Vergelijk daarom ook bij pensioensparen de lopende kosten en de verdeling tussen aandelen en obligaties, en kijk of die verdeling past bij hoeveel jaar u nog tot uw pensioen hebt.</p>
<p>Daarnaast bestaat langetermijnsparen, een ander fiscaal stelsel via een levensverzekering, met voorwaarden die onder meer afhangen van uw inkomen en een eventuele woonlening. Die bedragen vallen buiten deze les.</p>

<h2>Past het bij uw plan?</h2>
<p>Pensioensparen past bij een doel dat werkelijk pas na uw zestigste valt. Geld dat u eerder nodig kunt hebben, hoort er niet in, hoe aantrekkelijk het voordeel ook is. Begin dus ook hier bij de buffer en de termijn, en pas dan bij de vraag welk fonds of welke verzekering.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Belastingvermindering voor pensioensparen (plafonds inkomstenjaar 2026)', url:'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/belastingverminderingen/pensioensparen' },
    { label:'Wikifin (FSMA) — Verschillen tussen pensioenspaarfonds en pensioenspaarverzekering (eindbelasting, vervroegde opvraging)', url:'https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/welke-verschillen-zijn-er-tussen-een' },
    { label:'Wikifin (FSMA) — Hoe wordt je pensioensparen belast?', url:'https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/hoe-wordt-je-pensioensparen-belast' },
    { label:'Wikifin (FSMA) — Hoe verander ik mijn pensioenspaarplan?', url:'https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/hoe-verander-ik-mijn-pensioenspaarplan' },
    { label:'FOD Financiën — Meerwaardebelasting: vrijgestelde activa', url:'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting' }
  ],
  vervolg:{ type:'lezen', id:'rendement', zin:'U weet nu wat u kunt bezitten. Hoe ontstaat de opbrengst, en wat houdt u ervan over?' }
},

{ id:'nijsmans', hoofdstuk:'bouwstenen', soort:'verhaal',
  titel:'Van teletekst naar fondsbeheer: wat kost expertise?',
  inleiding:'Tim Nijsmans begon als nieuwsgierige tiener en werd fondsbeheerder. Zijn verhaal brengt een vraag dichtbij die elke belegger kan stellen: wat betaal ik voor het beheer van mijn geld?',
  kernidee:'Een fonds kiezen gaat ook over de prijs van het beheer. Begrijp de kosten én wat u ervoor krijgt; een bekende naam beantwoordt die vragen niet.',
  beeld:null,
  tekst:`
<p>Tim Nijsmans was dertien toen beurskoersen op teletekst zijn belangstelling wekten. In een interview met Curvo vertelt hij hoe hij, wachtend in de bibliotheek, over beleggen las. Later werkte hij twaalf jaar als vermogens- en fondsbeheerder bij de Antwerpse privébank Dierickx Leys. Wat hem bleef bezighouden: de kosten van het beheer tegenover wat een fonds kon opbrengen.</p>
<p>In 2019 begon hij met Vermogensgids. In het interview pleit hij voor brede, goedkope indexfondsen en begeleiding tijdens onrustige periodes. Dat zijn zijn opvattingen, geen prestatiebewijs. Het interview verscheen bij Curvo, dat zelf indexbeleggen aanbiedt. Die context hoort bij het verhaal.</p>

<h2>Een eenvoudige vraag achter een ingewikkeld vak</h2>
<p>Zijn verhaal brengt een bruikbare vraag naar voren: hoeveel van de opbrengst moet eerst worden verdiend om alle kosten te betalen? Een fonds kan een indrukwekkende naam en een uitgebreid beheerteam hebben. Voor de belegger telt uiteindelijk wat die dienstverlening oplevert, na haar prijs.</p>
<p>Neem een eigen, fictief jaarvoorbeeld. Een belegging van € 10.000 groeit vóór kosten met 3 procent, tot € 10.300. Wordt daarna 1 procent kosten over die waarde ingehouden, dan gaat € 103 weg en blijft € 10.197 over. Een kost van 2 procent zou € 206 bedragen: er blijft € 10.094 over. Dezelfde belegging, maar een ander resultaat. Dit rekent zonder belasting en voorspelt geen rendement.</p>
<p>De verhouding wordt voelbaarder wanneer de opbrengst laag is. De kosten verdwijnen niet omdat het een mager beursjaar was. Ook in een verliesjaar kan er een vergoeding worden ingehouden. Wie een voorzichtig product zoekt, heeft dus evenveel reden om de [[lopende-kosten|jaarlijkse kosten]] te begrijpen als wie voluit op groei mikt.</p>

<h2>Goedkoop beantwoordt niet elke vraag</h2>
<p>Daarmee is de keuze nog niet gemaakt. Een goedkoop fonds kan geconcentreerd zijn in één sector. Twee goedkope fondsen kunnen grotendeels dezelfde bedrijven bevatten. Een duurdere oplossing kan diensten bevatten die u gebruikt, zoals opvolging of een verzekeringsdekking. Vergelijken vraagt daarom dezelfde inhoud, dezelfde termijn en een zicht op wat er werkelijk wordt aangeboden.</p>
<p>Ook een [[index|index]] kiezen blijft een beleggingskeuze. U neemt de stijgingen van die markt mee, maar ook haar dalingen. Lagere kosten voorkomen geen verlies. Ze laten bij verder gelijke omstandigheden wel meer van de opbrengst bij u.</p>

<h2>De vragen veranderen</h2>
<p>De dertienjarige wilde weten waarom koersen bewogen. Voor wie zelf belegt, komt daar een tweede vraag bij: wat betaal ik om eraan deel te nemen? Vraag naar de totale kosten in euro, hoe ze berekend worden en waarvoor u betaalt. Kijk daarna door de productnaam heen naar de beleggingen zelf.</p>
<p>Dat maakt een gesprek concreter dan een discussie over welke beheerder de beste is. U hoeft geen fondsbeheerder te worden om goede vragen te stellen.</p>
`,
  bronnen:[
    { label:'Curvo — Tips voor de Belgische belegger, met Tim Nijsmans (interview; commerciële context, opinies van de geïnterviewde)', url:'https://curvo.eu/nl/artikel/tips-voor-de-belgische-belegger-met-tim-nijsmans' },
    { label:'Investment Officer — Vermogensgids, opgericht in 2019 door Tim Nijsmans (17 maart 2020)', url:'https://www-t.investmentofficer.be/fr/actualites/vermogensgids-augmentez-lallocation-de-vos-actions-surponderez-en-actions-dividende' }
  ],
  vervolg:{ type:'lezen', id:'actief-index', zin:'Wat kiest u eigenlijk tussen een beheerder en een index? De les zet beide naast elkaar.' }
},

{ id:'ethias', hoofdstuk:'bouwstenen', soort:'verhaal',
  titel:'Ethias 2008: toen spaarders tegelijk hun geld terugvroegen',
  inleiding:'In oktober 2008 haalden klanten van Ethias massaal geld weg uit First, een levensverzekering die aanvoelde als een spaarrekening. Binnen enkele weken stonden drie overheden klaar met anderhalf miljard euro. Wat dat verhaal leert over het woord ‘gewaarborgd’.',
  kernidee:'Een waarborg is een belofte van één instelling. Hoe sterk ze is, hangt af van die instelling en van de bescherming die erachter staat.',
  beeld:{ type:'tijdlijn', punten:[['Oktober 2008', 'Klanten halen honderden miljoenen weg uit First'], ['20 oktober 2008', 'Overheden kondigen € 1,5 miljard kapitaal aan'], ['23 oktober 2008', 'Bescherming tot € 100.000, voortaan ook voor tak 21']], bijschrift:'Drie weken uit de financiële crisis. De regeling werd op 14 november 2008 bij koninklijk besluit vastgelegd.' },
  tekst:`
<p>First was een van de populairste spaarproducten van België. Juridisch was het een levensverzekering in [[tak21|tak 21]], met een gewaarborgde rente. In de praktijk gebruikten veel mensen het als een spaarrekening met een betere rente: ze konden er op elk moment geld van afhalen, zonder uitstapvergoeding. Alleen bij een opvraging binnen een bepaalde termijn kon roerende voorheffing gelden.</p>
<p>Ethias was in 2008 de derde verzekeraar van het land, met een balans van ruim 28 miljard euro. Het bedrijf kwam voort uit een groep onderlinge verzekeringsmaatschappijen.</p>

<h2>Een product dat elke dag weg kon</h2>
<p>Een verzekeraar die rente waarborgt, belegt het geld van zijn klanten zelf, vaak voor lange tijd, in obligaties, aandelen en vastgoed. Dat werkt zolang niet iedereen tegelijk zijn geld terugvraagt. In de herfst van 2008 nam het aantal opvragingen plots sterk toe. Na de val van Lehman Brothers en de redding van Fortis en Dexia was het vertrouwen in financiële instellingen weg. Ethias had zelf verliezen geleden op beleggingen tijdens de crisis. Klanten haalden in oktober honderden miljoenen euro uit hun First-contracten.</p>
<p>Het probleem was niet dat de rente plots niet meer gewaarborgd was. Het probleem was dat een belofte die elke dag opvraagbaar is, op elke dag waargemaakt moet kunnen worden.</p>

<h2>Drie overheden, anderhalf miljard</h2>
<p>Op 20 oktober 2008 kondigden de federale overheid, het Vlaamse en het Waalse Gewest aan dat ze samen anderhalf miljard euro kapitaal in Ethias zouden steken. Met dat kapitaal bleef de verzekeraar overeind. De Europese Commissie keurde de steun en de herstructurering later goed, in mei 2010.</p>

<h2>Waarom tak 21 sindsdien anders beschermd is</h2>
<p>Drie dagen later, op 23 oktober 2008, keurde de federale ministerraad een besluit goed dat de bescherming van spaardeposito’s optrok tot € 100.000, en dezelfde bescherming invoerde voor verzekeringen in tak 21. Op 14 november werd dat bij koninklijk besluit vastgelegd. Vóór die herfst bestond die bescherming voor tak 21 niet.</p>
<p>Vandaag komt het Garantiefonds tussen tot € 100.000 per persoon voor al zijn individuele tak 21-contracten samen bij een failliete verzekeraar naar Belgisch recht. Voor tak 23, groepsverzekeringen en VAPZ geldt die bescherming niet.</p>

<h2>Wat ‘gewaarborgd’ dus betekent</h2>
<p>Een gewaarborgde rente is een belofte van een verzekeraar, geen eigenschap van het geld. Ze is zo sterk als die verzekeraar, en daarachter als de bescherming die de overheid sinds 2008 voorziet, binnen haar grens. Wie grote bedragen in tak 21 heeft, kan die over verschillende verzekeraars spreiden, zodat elk deel onder de grens blijft.</p>
<p>En opvraagbaar is iets anders dan veilig. Een product dat u elke dag kunt opvragen, kan juist daardoor kwetsbaar worden als veel mensen dat tegelijk willen.</p>
<p>Ethias bestaat nog en is vandaag een andere onderneming dan in 2008. Dit verhaal gaat over wat er toen gebeurde, niet over haar huidige producten.</p>
`,
  bronnen:[
    { label:'Europese Commissie — Besluit staatssteun Ethias (procedure, opvragingen First, koninklijk besluit 14 november 2008)', url:'https://ec.europa.eu/competition/state_aid/cases/228044/228044_1016051_76_1.pdf' },
    { label:'Ministerraad 23 oktober 2008 — Bescherming van deposito’s, ook voor tak 21 (news.belgium.be)', url:'https://news.belgium.be/nl/node/9137/pdf' },
    { label:'Kamer van volksvertegenwoordigers — Commissieverslag 2 december 2008 (kapitaalinjectie Ethias via federale, Vlaamse en Waalse overheid)', url:'https://www.dekamer.be/doc/CCRA/pdf/52/ac384x.pdf' },
    { label:'Wikifin (FSMA) — Bescherming van levensverzekeringen tak 21 door het Garantiefonds', url:'https://www.wikifin.be/nl/budget-betalen-lenen-en-verzekeren/verzekeren/familie/de-levens-en-overlijdensverzekering/wat' }
  ],
  vervolg:{ type:'lezen', id:'tak21-tak23', zin:'Wat belooft een verzekeraar vandaag bij tak 21, en wat niet bij tak 23?' }
},

/* ───────────── 3. WAT KAN MIJN GELD OPBRENGEN ───────────── */
{ id:'rendement', hoofdstuk:'opbrengst', soort:'uitleg',
  titel:'Rendement: wat brengt uw geld werkelijk op?',
  inleiding:'Rente, dividend en een hogere verkoopprijs kunnen iets opleveren. Kosten, belasting en inflatie veranderen wat u overhoudt. Een percentage krijgt pas betekenis wanneer u weet wat erin zit.',
  kernidee:'Rendement bestaat uit inkomsten én een verandering in waarde. Wat u werkelijk overhoudt, hangt ook af van kosten, belasting en inflatie.',
  beeld:{ type:'rendement', bijschrift:'Fictief jaarvoorbeeld bij € 1.000 inleg: € 40 waardestijging en € 20 inkomsten geven samen € 60, of 6 %. Vóór kosten en belasting.' },
  tekst:`
<p>U belegt € 1.000. Een jaar later is de belegging € 1.040 waard en hebt u € 20 uitgekeerd gekregen. Alleen naar de hogere waarde kijken geeft een onvolledig beeld. De € 40 waardestijging en de € 20 inkomsten vormen samen € 60 opbrengst: 6 procent van uw oorspronkelijke inleg. Dat is een fictief rekenvoorbeeld, geen belofte van wat haalbaar is.</p>

<h2>De opbrengst heeft twee bronnen</h2>
<p>De eerste is inkomen. Op spaargeld is dat [[rente|rente]], op een gewone obligatie een coupon, op aandelen dividend. De tweede is waardeverandering: u kunt een belegging later voor meer of minder verkopen. Beide tellen mee in het totale [[rendement|rendement]].</p>
<p>Daalt de belegging uit het voorbeeld naar € 900, dan maakt € 20 inkomen daar geen winst van. Samen houdt u € 920 over: 8 procent minder dan uw inleg, vóór kosten en belasting. Een hoge uitkering is dus niet hetzelfde als een hoog totaalrendement. Bij een fonds kunnen inkomsten uitgekeerd of herbelegd worden. Tel herbelegde inkomsten niet nog eens apart op als ze al in de fondswaarde zitten.</p>

<h2>Een renteafspraak is iets anders dan een verwachting</h2>
<p>Bij een vaste rente leggen de voorwaarden betalingen vast voor een afgesproken periode. Controleer daarbij altijd wie de belofte doet, hoe lang ze geldt en wat er gebeurt als u eerder uitstapt. Een afspraak neemt niet alle risico weg.</p>
<p>Bij aandelen en de meeste fondsen kent niemand vooraf de uitkomst. Een historisch gemiddelde beschrijft een voorbije periode. Een aanname in een simulatie toont wat er onder bepaalde voorwaarden zou kunnen gebeuren. Geen van beide is een voorspelling voor uw eigen belegging.</p>

<h2>Wat blijft er over?</h2>
<p>Van een bruto opbrengst gaan kosten af. Eenmalige instapkosten werken anders dan kosten die elk jaar over de waarde berekend worden, en daarbij kunnen transactiekosten of vergoedingen bij winst komen. Ook belasting beïnvloedt de uitkomst, verschillend per product, per soort opbrengst en per situatie. Een belastingvoordeel bij de start zegt op zich weinig over het totale resultaat: voorwaarden, kosten en een mogelijke belasting later horen in dezelfde vergelijking.</p>
<p>Tot slot is er [[inflatie|inflatie]]. Een hoger bedrag is geen vooruitgang in koopkracht als alles wat u ermee wilt kopen nog sterker in prijs stijgt. Vergelijk opbrengsten daarom over dezelfde periode en op hetzelfde niveau: vóór of na kosten, belasting en inflatie.</p>

<h2>Tijd maakt het verschil groter</h2>
<p>Als opbrengsten opnieuw belegd worden, kunnen ze zelf mee opbrengen. Dat is samengestelde groei. Het werkt ook omgekeerd: wat aan kosten weggaat, kan later niet meer meegroeien. En na een daling is een even grote procentuele stijging niet genoeg om terug op het beginpunt te komen. Van € 100 naar € 80 is min 20 procent; van € 80 terug naar € 100 vraagt plus 25 procent.</p>
<p>Een bruikbaar rendementscijfer vertelt dus altijd over welke periode het gaat, wat meegeteld is en welke onzekerheid erbij hoort. Daarmee leest u een berekening beter, zonder van een illustratie een belofte te maken.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten' },
    { label:'Wikifin (FSMA) — Wat is een aandeel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/aandeel/wat-een-aandeel' },
    { label:'Wikifin (FSMA) — Wat is een obligatie?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/obligatie/wat-een-obligatie' },
    { label:'Wikifin (FSMA) — Welke invloed heeft inflatie op je spaargeld?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/welke-invloed-heeft-inflatie-op-je-spaargeld' },
    { label:'Eigen fictieve rekenvoorbeelden; geen tarieven of rendementsverwachtingen. Totaalrendement zonder tussentijdse stortingen: (eindwaarde + uitgekeerde inkomsten − beginwaarde) / beginwaarde.', url:null }
  ],
  vervolg:{ type:'lezen', id:'tijd', zin:'Wat gebeurt er wanneer uw opbrengst zelf de tijd krijgt om mee te groeien?' }
},

{ id:'tijd', hoofdstuk:'opbrengst', soort:'uitleg', keuzemoment:['inleg','termijn'],
  titel:'Waarom tijd het zware werk doet',
  inleiding:'Twee mensen leggen elk € 200 per maand in. De ene begint op haar 30ste, de andere op zijn 40ste. Bij dezelfde positieve voorbeeldgroei ontstaat op hun 65ste een groot verschil. Vroeger beginnen geeft de inleg én de opbrengst meer tijd.',
  kernidee:'Groei op groei: wat uw geld opbrengt, gaat zelf ook meewerken, en dat effect wordt groter naarmate de tijd langer is.',
  beeld:{ type:'reken', id:'vroeg', bijschrift:'Lien en Tom (fictief) leggen elk € 200 per maand in tot hun 65ste. Voorbeeldgroei 4 % per jaar, geen kosten of belasting: een illustratie, geen verwachting.' },
  tekst:`
<p>Stel dat een belegging in een jaar 4 procent opbrengt. Op € 1.000 is dat € 40. Laat u die € 40 staan, dan rekent het volgende jaar de groei op € 1.040 in plaats van op € 1.000. In het begin is het verschil verwaarloosbaar, een paar euro.</p>
<p>Maar het herhaalt zich elk jaar, en de basis wordt elk jaar groter. Dat is [[samengestelde-groei|samengestelde groei]]: opbrengst die zelf opbrengst maakt. Bij aandelen gebeurt dat via herbelegde dividenden en hogere koersen, bij obligaties en sparen via herbelegde rente.</p>
<p>Het effect is daarom niet lineair. Na tien jaar valt het nog mee. Na twintig of dertig jaar komt een groot deel van de eindwaarde niet meer van wat u inlegde, maar van de groei daarop. U kunt dat hieronder zelf uitproberen.</p>

{{sim:tijd}}

<h2>Wat de verkenning toont, en wat niet</h2>
<p>Kijk naar de twee lijnen. De ene is wat u zelf inlegt, de andere een mogelijke waarde volgens de rekenkern van het Norte-plan. Het verschil is de berekende waardegroei volgens dit voorbeeld. Zet de termijn eens op 10 en dan op 30 jaar: de inleg verdrievoudigt, maar het verschil groeit veel sneller.</p>
<p>Het voorbeeld van Lien en Tom rekent met een vaste 4 procent per jaar; de verkenning niet. Haar lijn volgt een verwacht rendement per soort belegging, met een aanpak die rustiger wordt naarmate het einde nadert, en een gemodelleerd marktpad met dalingen. Dat blijft een illustratie, geen vast rendement en geen voorspelling: echte beleggingen schommelen anders, ook verlies is mogelijk.</p>
<p>Kosten en belasting zitten er niet in, en de bedragen zijn nominaal: euro’s van het jaar zelf. Wat die later nog kunnen kopen, ziet u in de les over koopkracht. Daarom staat er ‘mogelijke waarde’ en geen verwachting.</p>

<h2>Eenmalig of elke maand</h2>
<p>U kunt een bedrag in één keer inleggen of elke maand iets bijzetten. Een eenmalig bedrag werkt van bij de start volledig mee. Een maandelijkse inleg bouwt geleidelijk op: de eerste storting heeft veel tijd om te groeien, de laatste bijna geen.</p>
<p>Wie vanuit zijn inkomen belegt, bouwt vaak maandelijks op. Dat kan een werkbaar ritme zijn: een vast bedrag maakt de gewoonte eenvoudig, zolang het in uw budget past. De afweging tussen beide komt terug in de les over het ritme van instappen.</p>

<h2>Waarom vroeg beginnen zo zwaar weegt</h2>
<p>Bij een vaste positieve voorbeeldgroei zijn de toenames in de laatste jaren het grootst, omdat ze op een grotere basis rekenen. In werkelijkheid kunnen juist die jaren ook tegenvallen. Wie tien jaar later begint, mist dus niet de eerste tien jaar, maar in feite de laatste tien jaar van groei op een grote basis.</p>
<p>Daarom levert een kleine inleg op jonge leeftijd soms meer op dan een grotere inleg later. Het omgekeerde geldt ook: wie later begint, is niet te laat. Elk bijkomend jaar termijn werkt nog mee.</p>

<h2>Tijd werkt alleen als het geld kan blijven staan</h2>
<p>Tijd is de factor die u het minst kunt inhalen met een hoger bedrag. Een lange termijn geeft ruimte voor mogelijk herstel; ze maakt verlies niet onmogelijk. Maar die tijd telt alleen als het geld ook echt zo lang kan blijven staan. Daarom hoort deze rekensom altijd bij de vraag uit het begin: wanneer hebt u het geld nodig?</p>
`,
  bronnen:[
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (commerciële communicatie; principes, geen Norte-verwachtingen)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' },
    { label:'Rekenmethode: voorbeeld Lien en Tom met de Norte-educatieve rekenkern (jaarlijkse stappen, vaste groei); verkenning met de rekenkern van het Norte-plan (educatieve uitsnede, fictief voorbeelddoel)', url:null }
  ],
  vervolg:{ type:'lezen', id:'kosten', zin:'Wat aan kosten weggaat, kan niet meer meegroeien. Welke kosten zijn er, en waar vindt u ze?' }
},

{ id:'kosten', hoofdstuk:'opbrengst', soort:'uitleg', keuzemoment:['kosten','fiscaal'],
  titel:'Kosten en belasting: wat er tussen de opbrengst en u staat',
  inleiding:'Twee fondsen kunnen precies hetzelfde bezitten en toch een ander bedrag opleveren. Het verschil zit in wat er onderweg afgaat: kosten bij het fonds, kosten bij de verpakking, taksen en belasting. Een groot deel daarvan kunt u vooraf opzoeken.',
  kernidee:'De kostenstructuur kunt u vooraf opzoeken; het rendement niet. Jaarlijkse kosten werken door in de tijd. Belasting hangt af van het product, de opbrengst en de regels van dat jaar.',
  beeld:{ type:'balken', eenheid:'€', rijen:[['Zonder kosten', 26533, 'zacht'], ['Met 0,2 % kosten per jaar', 25540, ''], ['Met 1,8 % kosten per jaar', 18776, 'kost']], bijschrift:'Rekenvoorbeeld: € 10.000 eenmalig, twintig jaar, 5 % groei per jaar vóór kosten; de jaarlijkse kosten gaan af van die groei. Geen belasting, geen voorspelling.' },
  tekst:`
<p>Kijk naar de drie balken. Hetzelfde bedrag, dezelfde twintig jaar, dezelfde groei vóór kosten. Het enige verschil is wat er elk jaar afgaat. Bij 0,2 procent per jaar blijft het grootste deel van de groei over. Bij 1,8 procent staat er na twintig jaar bijna € 6.800 minder dan bij 0,2 procent, op een inleg van € 10.000. Dat is het effect van [[lopende-kosten|lopende kosten]]: ze worden elk jaar van een steeds grotere waarde afgehouden, en wat weg is, groeit niet meer mee.</p>

<h2>Eenmalig, jaarlijks of bij elke transactie</h2>
<p>Kosten komen in drie soorten, en ze vergelijken lukt alleen als u ze uit elkaar houdt.</p>
<p><strong>Eenmalig</strong>: instapkosten op wat u stort, en soms uitstapkosten als u vroeg stopt. Drie procent instap betaalt u één keer op dat bedrag.<br>
<strong>Jaarlijks</strong>: de lopende kosten van het fonds, elk jaar berekend over de waarde van uw belegging, in goede en slechte jaren. Bij een verzekering komen daar vaak beheerkosten van het contract bij, bij een effectenrekening soms een bewaarloon.<br>
<strong>Per transactie</strong>: bij een aan- of verkoop kunnen beurstaks en een vergoeding aan de bank of broker spelen. Het tarief en eventuele uitzonderingen hangen van de transactie en het effect af.</p>
<p>Bij een gewone individuele tak 21- of tak 23-verzekering geldt doorgaans 2 procent premietaks. Fiscale pensioenspaarverzekeringen zijn daarvan vrijgesteld.</p>

<h2>Waar u ze vindt</h2>
<p>Voor fondsen en verzekeringsbeleggingen bestaat een gestandaardiseerd essentiële-informatiedocument. Het vermeldt de totale kosten in euro en in procent, voor een aanbevolen bezitsperiode en voor kortere perioden, met een uitsplitsing per soort kost. Het bedrag in euro zegt vaak meer dan het percentage: het toont wat u werkelijk betaalt. Vraag daarnaast of er een vergoeding voor advies of begeleiding bijkomt, en hoe die berekend wordt.</p>

<h2>De belasting op wat u verdient</h2>
<p>Op <strong>rente en dividenden</strong> houdt de bank of het fonds in de regel 30 procent [[roerende-voorheffing|roerende voorheffing]] in. Voor rente op een gereglementeerde spaarrekening gelden een vrijstelling en een lager tarief.</p>
<p>Op <strong>meerwaarden</strong> geldt voor particulieren sinds 1 januari 2026 meestal een belasting van 10 procent. De Kamer keurde de wet goed op 2 april 2026; ze verscheen op 21 april 2026 in het Staatsblad en werkt terug tot 1 januari. Die belasting geldt wanneer u financiële activa zoals aandelen, obligaties of fondsen met winst verkoopt. De eerste schijf van uw gerealiseerde meerwaarden per jaar is vrijgesteld: volgens de FOD Financiën € 10.000 voor aanslagjaar 2027, dus voor meerwaarden uit 2026. Voor oudere beleggingen is de waarde op 31 december 2025 in beginsel het vertrekpunt. Een aantoonbare hogere oorspronkelijke aankoopwaarde kan voor de meerwaarde in aanmerking komen; oude verliezen zijn niet zomaar aftrekbaar. Pensioenspaarrekeningen, groepsverzekeringen en contracten langetermijnsparen zijn uitdrukkelijk vrijgesteld. Dit is de hoofdlijn; voor bijzondere gevallen gelden andere regels. De kleine verkenningen uit het plan rekenen deze belasting niet mee.</p>
<p>Bij fondsen die deels in obligaties beleggen, kan bij verkoop daarnaast een belasting op het renteluik gelden. De regels verschillen per product en veranderen geregeld; bij een concrete keuze hoort een actuele controle.</p>

<h2>Duurder is niet automatisch slechter</h2>
<p>Een product kan meer kosten omdat het iets doet wat u nodig hebt: advies en opvolging, een gewaarborgde rente, een verzekeringsdekking, of een aanpak die u helpt vol te houden. Dat kan zijn prijs waard zijn. De vraag is niet ‘wat is het goedkoopst?’, maar ‘wat betaal ik jaarlijks, waarop wordt het berekend, en wat krijg ik er concreet voor terug?’ Bij gelijke groei vóór kosten houdt u met hogere kosten altijd minder over; of het verschil gerechtvaardigd is, hangt af van wat er tegenover staat.</p>
`,
  bronnen:[
    { label:'FSMA — Gedelegeerde Verordening (EU) 2017/653 over het essentiële-informatiedocument (kosten, risico-indicator)', url:'https://www.fsma.be/sites/default/files/legacy/verordening_2017_653_nl.pdf' },
    { label:'FOD Financiën — Meerwaardebelasting op financiële activa (tarief, vrijstelling, fotomoment, vrijgestelde activa)', url:'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting' },
    { label:'Kamer van volksvertegenwoordigers — Wetsontwerp meerwaardebelasting 56K1244: aangenomen 2 april 2026, wet van 6 april 2026, Belgisch Staatsblad 21 april 2026', url:'https://www.dekamer.be/flwb/html/56/N/56K1244.html' },
    { label:'Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten' },
    { label:'Rekenvoorbeeld figuur: 10.000 × (1,05 − k)^20 met k = 0, 0,2 % en 1,8 %. Eigen illustratie.', url:null }
  ],
  vervolg:{ type:'lezen', id:'koopkracht', zin:'Na kosten en belasting komt nog een stille factor: wat kunt u over twintig jaar nog kopen met dat bedrag?' }
},

{ id:'buffett', hoofdstuk:'opbrengst', soort:'verhaal',
  titel:'Tien jaar geduld. Eén weddenschap van Buffett.',
  inleiding:'In 2007 wedde Warren Buffett een miljoen dollar dat een eenvoudig, goedkoop indexfonds tien jaar lang beter zou doen dan dure hedgefondsen. Het eerste jaar leek hij te verliezen. Wat de afloop over kosten zegt, en wat niet.',
  kernidee:'Kosten drukken het resultaat. Wat u betaalt, kan niet meer meegroeien.',
  beeld:{ type:'portret', src:'assets/buffett-2015.jpg', alt:'Warren Buffett tijdens de SelectUSA-bijeenkomst in 2015', bijschrift:'Warren Buffett in 2015. Foto: USA International Trade Administration / Wikimedia Commons, publiek domein.' },
  teaser:'Een miljoen dollar op een goedkoop indexfonds tegen dure hedgefondsen. Het eerste jaar leek Buffett te verliezen.',
  tekst:`
<p>Warren Buffett, de bekendste belegger ter wereld, stelde in 2007 een weddenschap voor van een miljoen dollar. Zijn stelling: over de tien jaar van 2008 tot en met 2017 zou een gewoon indexfonds op ongeveer 500 grote Amerikaanse beursbedrijven beter doen dan een selectie hedgefondsen, gekozen door professionals.</p>
<p>Ted Seides, van het beheerhuis Protégé Partners, ging de uitdaging aan. Hij koos vijf fondsen die zelf weer in hedgefondsen belegden. De winst zou naar een goed doel gaan.</p>

<h2>Een slechte start</h2>
<p>Het eerste jaar leek Buffett zich te vergissen. In 2008 viel de beurs zwaar, en het indexfonds verloor veel meer dan de hedgefondsen. Die beloofden net zulke klappen te verzachten, en dat lukte dat jaar ook.</p>
<p>Daarna keerde het. Het indexfonds haalde zijn achterstand in en liep weg. Na tien jaar was het ongeveer 126 procent meer waard dan bij de start. De vijf fondsen bleven gemiddeld ver daaronder. In zijn jaarbrief over 2017 rekende Buffett het voor; de opbrengst ging naar Girls Inc. in Omaha.</p>

<h2>Waar het verschil vandaan kwam</h2>
<p>Buffett wees kosten aan als de belangrijkste oorzaak. Hij beschreef meerdere lagen: bij de onderliggende hedgefondsen én bij de fondsen die daarin belegden, telkens met een jaarlijkse vergoeding en een vergoeding bij winst. Het indexfonds kostte een fractie daarvan.</p>
<p>Waarom weegt dat zo zwaar? [[lopende-kosten|Lopende kosten]] worden elk jaar afgehouden van de waarde van uw belegging, of het nu een goed of een slecht jaar was. Wat u betaalt, kan het volgende jaar niet meer meegroeien. Zo werken kosten als samengestelde groei in omgekeerde richting.</p>

<h2>Maar het was geen zuiver kostenexperiment</h2>
<p>Het is verleidelijk om te besluiten dat goedkoop altijd wint. Dat zou te kort door de bocht zijn. De hedgefondsen volgden andere strategieën dan het indexfonds, met andere risico’s en een andere samenstelling. Ze probeerden in 2008 verliezen te beperken, en dat lukte gedeeltelijk.</p>
<p>Het ging ook om één periode in één markt, die achteraf sterk was voor grote Amerikaanse aandelen. In een andere periode of markt had het verschil kleiner of groter kunnen zijn. Kosten verklaren een belangrijk deel van de afloop, maar niet alles.</p>
<p>Wat de weddenschap niet kon, kunt u hieronder wel: alles gelijk houden behalve de kosten. Dan ziet u wat één percentage op zich doet.</p>

{{sim:kosten}}

<h2>Wat u vooraf wel kunt weten</h2>
<p>De afloop van de weddenschap kende in 2007 niemand. De kosten wel: die stonden in de contracten. Dat is ook bij uw eigen beleggingen zo. Het toekomstige rendement kunt u niet opzoeken, de kostenstructuur wel. Bij gelijke groei vóór kosten houdt u met hogere kosten minder over. Of een hogere kost de moeite waard is, hangt af van wat u er concreet voor terugkrijgt.</p>
`,
  bronnen:[
    { label:'Berkshire Hathaway — Jaarbrief 2017 (resultaten van de weddenschap)', url:'https://www.berkshirehathaway.com/letters/2017ltr.pdf' },
    { label:'Portret: USA International Trade Administration / Wikimedia Commons — publiek domein', url:'https://commons.wikimedia.org/wiki/File:Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_(cropped).jpg' },
    { label:'Rekenmethode kosten: rekenkern van het Norte-plan (educatieve uitsnede), hetzelfde voorbeeldplan met en zonder lopende kosten', url:null }
  ],
  vervolg:{ type:'lezen', id:'kosten', zin:'Welke kosten zitten in uw eigen product, en waar staan ze? De les zet ze op een rij, samen met de belasting.' }
},

{ id:'koopkracht', hoofdstuk:'opbrengst', soort:'uitleg',
  titel:'Koopkracht: wat € 10.000 binnen twintig jaar nog waard is',
  inleiding:'Een bedrag op uw rekening is een getal. Wat u ermee kunt kopen, is iets anders. Wie aan een lange termijn denkt, houdt beide uit elkaar: het nominale bedrag en de koopkracht.',
  kernidee:'Rendement betekent pas iets na kosten, belasting en inflatie. Het bedrag van later is niet het geld van vandaag.',
  beeld:{ type:'reken', id:'koopkracht', bijschrift:'€ 10.000 die twintig jaar op een rekening blijft, bij 2 % aangenomen inflatie en zonder rente.' },
  tekst:`
<p>Herinnert u zich wat een brood of een volle tank twintig jaar geleden kostte? De meeste mensen weten intuïtief dat prijzen stijgen. Wat minder vaak doorgerekend wordt, is wat dat betekent voor geld dat lang blijft liggen. Stijgen de prijzen gemiddeld 2 procent per jaar, dan koopt € 10.000 binnen twintig jaar nog ongeveer wat vandaag € 6.700 koopt. Het bedrag is niet veranderd; wat u ermee kunt, wel.</p>
<p>Die prijsstijging heet [[inflatie|inflatie]]. De Europese Centrale Bank probeert ze op middellange termijn rond 2 procent te houden. Dat lukt niet altijd: in 2022 lag de inflatie in België maandenlang boven de tien procent. Wat een vast bedrag kan kopen, heet [[koopkracht|koopkracht]].</p>

{{sim:koopkracht}}

<h2>Van bruto naar netto naar koopkracht</h2>
<p>Een rendement in een folder legt meestal nog drie stappen af voor het bij u aankomt. Een voorbeeld met afgeronde cijfers:</p>
<p><strong>Bruto</strong>: een belegging groeit in een jaar met 5 procent. Dat is wat de onderliggende aandelen of obligaties opbrachten.<br>
<strong>Na kosten</strong>: het fonds houdt 1 procent jaarlijkse kosten af. Er blijft ongeveer 4 procent over.<br>
<strong>Na belasting</strong>: afhankelijk van het product en de regels van dat moment gaat er belasting af op dividenden, rente of meerwaarde. Stel dat er 3,5 procent overblijft.<br>
<strong>Na inflatie</strong>: als de prijzen dat jaar met 2 procent stegen, is uw koopkracht met ongeveer 1,5 procent toegenomen.</p>
<p>Van 5 naar 1,5 procent: dat is het verschil tussen het [[bruto-netto|bruto]] rendement en wat er in koopkracht werkelijk bijkomt. De verhouding hangt sterk af van het product en de periode, maar de volgorde van de stappen blijft dezelfde. Wie twee producten vergelijkt, vergelijkt ze op dezelfde stap.</p>

<h2>Ook spaargeld verliest koopkracht</h2>
<p>Op een spaarrekening is het bedrag beschermd, de koopkracht niet. Is de spaarrente lager dan de inflatie, dan daalt uw koopkracht elk jaar een beetje, zonder dat u het op uw rekeningafschrift ziet. Voor de buffer is dat een aanvaardbare prijs voor zekerheid en beschikbaarheid. Voor geld dat twintig jaar blijft liggen, is het een kost om bewust mee te rekenen.</p>

<h2>Twee manieren om een plan te lezen</h2>
<p>In een plan op lange termijn kunt u bedragen op twee manieren tonen: nominaal, zoals ze volgens het voorbeeld later op uw rekening zouden staan, of in koopkracht van vandaag. Beide zijn juist, maar ze beantwoorden een andere vraag. ‘Hoeveel zal er staan?’ is nominaal. ‘Wat kan ik ermee?’ is koopkracht.</p>
<p>Denkt u een doel in euro van vandaag, bijvoorbeeld ‘de studies kosten nu zo’n € 40.000’, dan is het eerlijker om ook de uitkomst in koopkracht te bekijken. Belangrijk is dat u telkens weet welke van de twee u ziet, en dat de inflatie niet twee keer wordt afgetrokken.</p>

<h2>Een aanname, geen voorspelling</h2>
<p>Inflatie is geen reden om in paniek te beleggen, wel een reden om bij een lange termijn verder te kijken dan het bedrag. De inflatie in de verkenning is een uitgangspunt dat u zelf kunt wijzigen. Niemand weet hoe de prijzen de komende twintig jaar evolueren.</p>
`,
  bronnen:[
    { label:'ECB — What is inflation?', url:'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html' },
    { label:'Rekenmethode koopkracht: figuur en tekst delen de eindwaarde door (1 + inflatie) tot de macht het aantal jaren (Norte-educatieve rekenkern); de verkenning toont ‘Koopkracht behouden’ uit het Norte-plan: het bedrag dat met de inflatie meegroeit', url:null }
  ],
  vervolg:{ type:'lezen', id:'vastgoed', zin:'Veel Vlamingen zien een huurwoning als de veiligste belegging. Wat blijft er na alle kosten echt over?' }
},

{ id:'vastgoed', hoofdstuk:'opbrengst', soort:'verhaal',
  titel:'Een huurwoning als belegging: wat er na de huur werkelijk overblijft',
  inleiding:'‘Stenen verliezen nooit hun waarde.’ Het is een van de hardnekkigste zinnen in Vlaanderen. Een studie van het Steunpunt Wonen rekende uit wat een private huurwoning in een model echt oplevert, en waar de huur naartoe gaat voor ze bij de eigenaar aankomt.',
  kernidee:'De huur is niet het rendement. Tussen bruto huur en netto opbrengst zitten kosten die vaak meer dan een derde wegnemen.',
  beeld:{ type:'balken', eenheid:'%', rijen:[['Bruto direct rendement', 3.80, ''], ['Kosten, ongeveer 37 % van de huur', 1.41, 'kost'], ['Netto direct rendement', 2.39, ''], ['Totaal in het model, met waardeontwikkeling en aankooprechten', 3.29, 'licht']], bijschrift:'Modelcijfers per jaar uit de rendementsanalyse van het Steunpunt Wonen (2025), tabel 1. Het totaal bevat prijsstijging, afschrijving en gespreide verkooprechten. Geen gerealiseerd gemiddelde, geen voorspelling, niet gecorrigeerd voor inflatie.' },
  tekst:`
<p class="fictie">Het gezin hieronder is fictief. De percentages komen uit een studie; de bedragen zijn een eigen rekenvoorbeeld met die percentages.</p>
<p>Els en Koen hebben wat spaargeld en een erfenis, waarmee ze een appartement van € 300.000 zonder lening overwegen. De aankoopkosten moeten ze daarnaast nog betalen. Een makelaar schat de huur op € 950 per maand. Koen rekent snel: € 11.400 per jaar, bijna vier procent. ‘Beter dan de spaarrekening, en je hebt iets tastbaars.’</p>
<p>Die vier procent is wat economen het [[bruto-netto|bruto]] direct rendement noemen: de huur, gedeeld door de waarde van de woning. Het is het getal dat het vaakst geciteerd wordt, en het getal dat het minst zegt over wat er overblijft.</p>

<h2>Wat de studie deed</h2>
<p>In 2025 publiceerden Frank Vastmans en Joren Vandenbergh voor het Steunpunt Wonen een rendementsanalyse van private huurwoningen in Vlaanderen. Ze bouwden een theoretisch model: wat brengt een typische huurwoning op als je alle kosten meerekent, en hoe draagt de waardeontwikkeling van de woning daartoe bij? Het is geen meting van wat eigenaars gemiddeld écht verdienden, en geen voorspelling voor een individuele woning. Het is een zorgvuldige raming van hoe de rekensom eruitziet.</p>
<p>In dat model bedraagt het bruto direct rendement 3,8 procent. Daarvan gaat ongeveer 37 procent van de huur naar lopende kosten: onderhoud (18 procent van de huur), onroerende voorheffing (10), brandverzekering (5), leegstand (3) en huurachterstand die niet meer te innen is (1). Wat overblijft, het netto direct rendement, is afgerond 2,39 procent.</p>
<p>Daarbij komt in het model een netto indirect rendement van ongeveer 0,9 procent per jaar: een prijsstijging van 2,5 procent, min 1 procent afschrijving omdat een gebouw veroudert, min 0,6 procent voor de verkooprechten bij de aankoop. Die rechten, 12 procent van de prijs, spreidt het model over twintig jaar. Samen komt het totale nominale rendement zo op 3,29 procent per jaar, nog vóór inflatie. De kostenpercentages zijn aannames van die studie, geen regels die vandaag voor uw woning gelden.</p>

<h2>Wat dat betekent voor Els en Koen</h2>
<p>Passen we die percentages toe op hun appartement van € 300.000, dan ziet het jaar er zo uit. Bruto huur, aan 3,80 procent: € 11.400. Kosten, 37 procent daarvan: € 4.218. Netto in de hand: € 7.182, of afgerond 2,39 procent.</p>
<p>Dat is nog altijd een inkomen, maar het is iets anders dan de € 11.400 waarmee Koen begon te rekenen. En in een jaar met een lange leegstand of een nieuwe verwarmingsketel kan het een pak minder zijn.</p>
<p>Het model spreidt de aankooprechten netjes over twintig jaar. In het echt betalen Els en Koen ze in één keer, vooraf, en verkopen ze misschien vroeger. Een grote renovatie of nieuwe energie-eisen kunnen zwaarder uitvallen dan een modelgemiddelde. En wie met een lening koopt, voegt rente en een hefboom toe: dat vergroot het rendement in goede jaren en het risico in slechte.</p>

<h2>Prijsstijging is een ander verhaal</h2>
<p>Woningprijzen in Vlaanderen zijn de voorbije decennia sterk gestegen, en dat voedt de overtuiging dat stenen altijd winnen. Een prijsstijging verhoogt de waarde van uw bezit, maar maakt nog geen geld beschikbaar. Daarvoor moet u verkopen of lenen. Die stijging is bovendien niet gegarandeerd. Ze verschilt bovendien sterk per regio, type woning en periode. In het model van de studie is ze een gemodelleerde factor, geen zekerheid. Wie één woning bezit, heeft ook een groot deel van zijn vermogen op één adres staan: het tegendeel van [[spreiding|spreiding]].</p>

<h2>Wat vastgoed wél biedt, en wat het vraagt</h2>
<p>Een huurwoning kan een zinvol deel van een vermogen zijn: een tastbaar bezit, een huur die vaak meestijgt met de index, en iets wat u zelf kunt beheren. Ze vraagt ook tijd, een groot bedrag in één keer, en u kunt er niet snel aan: een woning verkoopt u niet op een week, en zeker niet in stukjes. Een eerlijke vergelijking met andere beleggingen gebeurt op hetzelfde niveau: netto, na alle kosten, en met hetzelfde risico in gedachten.</p>
`,
  bronnen:[
    { label:'Vastmans, F. & Vandenbergh, J. (2025) — Rendementsanalyse private huur en evolutie huurwoningvoorraad, Steunpunt Wonen (tabel 1, p. 12)', url:'https://steunpuntwonen.be/wp-content/uploads/2025/02/Ad-hoc_Rendementsanalyse-private-huur_EIND.pdf' }
  ],
  vervolg:{ type:'lezen', id:'spreiding', zin:'Rendement is één kant van de rekening. Welke tegenvallers kunnen uw doel raken?' }
},

/* ───────────── 4. WAT KAN ER MISGAAN ───────────── */
{ id:'spreiding', hoofdstuk:'risico', soort:'uitleg',
  titel:'Risico en spreiding: wat kan er misgaan?',
  inleiding:'Een dalende koers valt op. Maar afhankelijk zijn van één bedrijf, uw geld te vroeg nodig hebben of koopkracht verliezen zijn ook risico’s. Spreiding helpt, binnen duidelijke grenzen.',
  kernidee:'Spreiding maakt u minder afhankelijk van één tegenvaller. Ze voorkomt niet dat een hele markt daalt of dat uw geld op het verkeerde moment nodig is.',
  beeld:{ type:'balken', eenheid:'%', rijen:[['Alles in dat ene aandeel', -50, 'kost'], ['10 % in dat ene aandeel', -5, 'kost']], bijschrift:'Fictieve stresstest: één aandeel verliest 50 %, alle andere beleggingen blijven gelijk. De balken tonen het verlies op het geheel. Geen marktmodel of voorspelling.' },
  tekst:`
<p>U hebt aandelen van tien bedrijven. Dat klinkt veiliger dan één aandeel. Maar als alle tien dezelfde klanten hebben en op dezelfde economische ontwikkeling rekenen, kan één tegenvaller ze samen raken. Voor spreiding telt niet alleen hoeveel namen u bezit, maar vooral waarvan ze afhankelijk zijn.</p>

<h2>Een daling is één vorm van risico</h2>
<p>Koersen bewegen omdat verwachtingen, rente en bedrijfsresultaten veranderen. Een daling is meteen een lagere waarde. Of ze tijdelijk blijkt, weet u pas achteraf: herstel staat niet vast. Een bedrijf kan blijvend in de problemen komen. Wie geld uitleende, kan te maken krijgen met een uitgever die niet volledig terugbetaalt.</p>
<p>Andere risico’s merkt u soms pas later. U vindt niet meteen een koper wanneer u wilt verkopen. Een vreemde munt daalt tegenover de euro. Of uw bedrag blijft gelijk terwijl de prijzen stijgen. Risico gaat dus verder dan de vraag of een grafiek vandaag rood kleurt.</p>
<p>Een voorbeeld van het valuta-effect: u koopt een Amerikaans aandeel voor $ 1.100 wanneer één euro 1,10 dollar waard is. In euro is dat € 1.000. Wordt de euro sterker, tot 1,25 dollar, dan is diezelfde $ 1.100 nog € 880 waard, ook al bleef de koers in dollar gelijk. Een zwakkere euro werkt omgekeerd. Dat effect komt bovenop wat het aandeel zelf doet.</p>

<h2>Wat spreiding kan opvangen</h2>
<p>Zit uw volledige belegging in één aandeel en halveert dat aandeel, dan halveert ook het geheel. Zit er maar een tiende in dat aandeel en blijft de rest gelijk, dan daalt het geheel met 5 procent. Dat eenvoudige voorbeeld verklaart de bedoeling van [[spreiding|spreiding]]: één mislukking hoeft niet alles te bepalen.</p>
<p>U kunt afhankelijkheden verdelen over bedrijven, sectoren, landen, uitgevers en soorten beleggingen. Aandelen en obligaties geven andere rechten en kunnen anders reageren. Dat betekent niet dat de ene altijd stijgt wanneer de andere daalt. In moeilijke periodes kunnen meerdere markten tegelijk zakken, zoals in 2022.</p>

<h2>Veel fondsen is niet automatisch veel spreiding</h2>
<p>Twee fondsen kunnen grotendeels dezelfde ondernemingen bezitten. Een wereldfonds kan zwaar wegen naar enkele grote bedrijven of één land. Wie er een tweede fonds met dezelfde zwaartepunten naast zet, verandert minder dan de namen doen vermoeden. Kijk daarom door de verpakking heen: wat bezit u samen, waar zitten de grootste gewichten, en op welke ontwikkelingen rekenen die beleggingen? Meer losse producten maken bovendien de kosten en de opvolging ingewikkelder. Het aantal producten is geen kwaliteitsmaatstaf.</p>

<h2>Uw termijn en draagkracht blijven bepalend</h2>
<p>Een gespreide belegging kan nog altijd ongeschikt zijn voor geld dat u binnenkort nodig hebt. Moet u tijdens een daling verkopen om een aankoop te betalen, dan kunt u niet wachten op een mogelijk herstel. Een langere termijn geeft meer tijd, maar garandeert geen goede uitkomst.</p>
<p>Ook hoeveel verlies u financieel kunt opvangen, is iets anders dan hoeveel risico u durft te nemen. Uw doelen, buffer, termijn, kennis en ervaring horen bij die afweging. Lezen of een oefening juist oplossen verandert uw financiële [[draagvermogen|draagkracht]] niet.</p>

<h2>Een vraag die helpt</h2>
<p>Vraag bij een belegging niet alleen: hoeveel kan dit opbrengen? Vraag ook: welke tegenvaller kan dit raken, en wat gebeurt er dan met mijn doel? Zo wordt risico concreter dan één score. Een bekende bedrijfsnaam, een lange termijn of een brede mand neemt die vraag niet van u over.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Het risico spreiden of niet alle eieren in één mand leggen', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/het-risico-spreiden-niet-alle' },
    { label:'Wikifin (FSMA) — Wat is je beleggersprofiel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/je-beleggersprofiel/wat-je-beleggersprofiel' },
    { label:'Wikifin (FSMA) — Indexfondsen, ETF’s en trackers', url:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/tracker/indexfondsen-etfs-en-trackers' },
    { label:'Eigen vereenvoudigde stresstest: 10 % weging × 50 % koersverlies = 5 % verlies op het geheel, bij ongewijzigde andere posities.', url:null }
  ],
  vervolg:{ type:'lezen', id:'daling', zin:'Hoe diep kan een daling gaan, hoe lang duurt herstel, en wanneer weegt ze het zwaarst?' }
},

{ id:'daling', hoofdstuk:'risico', soort:'uitleg', keuzemoment:['strategie'],
  titel:'Dalingen en herstel: wat een min op uw scherm wel en niet betekent',
  inleiding:'Wie belegt, ziet vroeg of laat een rood cijfer. Een daling van twintig procent vraagt meer dan twintig procent om terug te komen, en soms duurt herstel jaren. Tegelijk is niet beleggen ook niet zonder risico.',
  kernidee:'Een daling is meteen een lager vermogen. Of en wanneer het herstelt, weet niemand vooraf; wie dan verkoopt, legt het verlies vast, en bij een faillissement kan het ook zonder verkoop blijvend zijn. Voor geld met een lange termijn weegt ook het stille verlies aan koopkracht.',
  beeld:{ type:'balken', eenheid:'%', rijen:[['Nodig herstel na een daling van 20 %', 25, 'licht'], ['Nodig herstel na een daling van 40 %', 66.7, 'licht'], ['Nodig herstel na een daling van 50 %', 100, 'licht']], bijschrift:'Hoeveel een belegging na een daling moet stijgen om terug op het beginpunt te komen. Zuivere rekensom, zonder kosten of bijkomende inleg.' },
  tekst:`
<p>Twee woorden worden vaak door elkaar gebruikt. [[volatiliteit|Volatiliteit]] is hoe sterk een waarde op en neer gaat, van dag tot dag en van jaar tot jaar. De terugval vanaf een eerder hoogtepunt is een andere maat: hoeveel lager de waarde sindsdien staat. Een belegging kan veel schommelen en toch weinig diep dalen, of rustig lijken tot ze één keer hard valt.</p>

<h2>De rekensom van terugkomen</h2>
<p>Staat een belegging van € 100 op € 80, dan hebt u 20 procent verloren. Om terug op € 100 te komen, moet ze niet met 20 maar met 25 procent stijgen, want de stijging rekent op de lagere basis. Na een daling van 40 procent is 67 procent herstel nodig, na een halvering zelfs 100 procent. Hoe dieper de val, hoe steiler de weg terug.</p>

<h2>Hoe diep en hoe lang</h2>
<p>Ook brede, gespreide beleggingen kennen diepe dalingen. De MSCI World-index, met meer dan duizend bedrijven uit ontwikkelde landen, stond in euro gemeten in maart 2009 op zijn diepste punt 53,6 procent lager dan in mei 2001, met herbelegde dividenden. In 2022 verloor dezelfde index in euro 12,8 procent, in een jaar waarin ook obligaties fors daalden.</p>
<p>Hoe lang herstel duurt, verschilt sterk. Soms gaat het in maanden, soms in jaren. Na de Japanse beurspiek van 1989 duurde het tientallen jaren. Brede spreiding vermindert de afhankelijkheid van één onderneming, maar garandeert geen herstel binnen uw termijn.</p>

<h2>Wanneer een daling het zwaarst weegt</h2>
<p>Dezelfde daling raakt niet iedereen op dezelfde manier. Wie pas begint en elke maand inlegt, koopt na een daling goedkoper bij; het grootste deel van zijn inleg moet nog komen. Wie vlak voor zijn doel staat, of al geld uit zijn belegging opneemt, heeft die tijd niet meer. Daarom maken veel plannen de verdeling geleidelijk rustiger naarmate een doel dichterbij komt.</p>

<h2>Het risico dat u niet ziet</h2>
<p>Er is ook een risico zonder rood cijfer. Wie geld voor twintig jaar op een spaarrekening laat staan, ziet geen daling, maar verliest wel [[koopkracht|koopkracht]] zodra de inflatie hoger is dan de rente. Bij 2 procent inflatie per jaar koopt € 10.000 na twintig jaar nog wat vandaag zowat € 6.700 koopt. In 2022, met een inflatie boven de tien procent, ging dat een pak sneller. Voor geld met een korte termijn is dat een aanvaardbare prijs voor zekerheid. Voor geld met een lange [[horizon|termijn]] is niets doen ook een keuze met een prijs.</p>

<h2>Wat u vooraf kunt regelen</h2>
<p>Een daling kunt u niet voorkomen; uw reactie erop kunt u wel voorbereiden. Een buffer zorgt dat u niet hoeft te verkopen voor een onverwachte uitgave. Een termijn die past bij het doel geeft tijd voor een mogelijk herstel, zonder dat herstel gegarandeerd is. Spreiding vermindert de afhankelijkheid van één onderneming of sector. En een afspraak met uzelf, vooraf gemaakt, helpt op het moment dat het nieuws slecht is: wat doe ik als mijn belegging een vijfde lager staat?</p>
<p>De verkenningen uit het Norte-plan rekenen daarom met een gemodelleerd marktpad waarin dalingen zitten. Niet om te schrikken, maar om te tonen hoe een plan zich in zo’n periode gedraagt. Het is één voorbeeldpad, geen kansberekening.</p>
`,
  bronnen:[
    { label:'MSCI — MSCI World Index (EUR), factsheet 31 december 2025, netto-indexrendementen en grootste daling 2001–2009', url:'https://www.msci.com/resources/factsheets/index_fact_sheet/msci-world-index-eur-net.pdf' },
    { label:'ECB — What is inflation?', url:'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html' },
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (inspiratie voor de principes; geen bron voor cijfers)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' },
    { label:'Rekensom figuur: nodig herstel = 1 / (1 − daling) − 1.', url:null }
  ],
  vervolg:{ type:'lezen', id:'profiel', zin:'Hoeveel schommeling past dan bij u? Dat is geen knop die u zelf kiest.' }
},

{ id:'risico', hoofdstuk:'risico', soort:'verhaal', beeld:{ type:'foto', src:'assets/asml-campus.jpg', alt:'De campus van ASML in Veldhoven op een heldere winterdag', bijschrift:'De hoofdzetel van ASML in Veldhoven. Eigendom, resultaat, verwachting en beurskoers zijn vier verschillende dingen.' },
  titel:'Een sterk bedrijf, een slechte dag: risico heeft meer dan één gezicht',
  inleiding:'Op 15 oktober 2024 verscheen het kwartaalbericht van chipmachinebouwer ASML per vergissing een dag te vroeg. De nieuwe bestellingen en de vooruitzichten vielen tegen, en het aandeel zakte die dag in Amsterdam met 15,6 procent. Wat zegt zo’n dag over risico, en wat net niet?',
  kernidee:'Risico is niet één ding. Schommeling, blijvend verlies, wanbetaling, onverkoopbaarheid en wisselkoers vragen elk een andere vraag.',
  teaser:'Op één dag verloor een van Europa’s sterkste bedrijven ruim 15 procent van zijn beurswaarde. Wat vertelt zo’n dag over risico?',
  tekst:`
<p>ASML, met zijn hoofdzetel in het Nederlandse Veldhoven, bouwt de machines waarmee de meest geavanceerde computerchips ter wereld gemaakt worden. Het is een van de waardevolste bedrijven van Europa, en het zit in verschillende brede Europese aandelenindexen. Toch kon één tegenvallende verwachting voor het volgende jaar de koers op één dag fors doen dalen. Wie het aandeel had, of een Europees indexfonds, zag dat terug.</p>
<p>Dat is het eerste en meest zichtbare gezicht van risico. Het is er niet het enige.</p>

<h2>Schommeling</h2>
<p>Wat veranderde er die dag? De omzet van het kwartaal was sterk, zowat 7,5 miljard euro. Wat tegenviel, waren de nieuwe bestellingen, zowat 2,6 miljard euro, en een voorzichtiger vooruitzicht voor 2025. De fabrieken, machines en klanten waren dezelfde als de dag ervoor. Wat veranderde, was de verwachting: voor beleggers betekende dat waarschijnlijk minder groei in de jaren daarna.</p>
<p>Een aandeel is een stukje eigendom van het bedrijf; de koers is de prijs die beleggers vandaag voor dat stukje willen betalen, op basis van wat ze van de toekomstige resultaten verwachten. Daalt die verwachting, dan daalt de waarde van uw aandeel echt mee, ook als er niets kapot is. Of de nieuwe verwachting te somber of terecht was, blijkt pas later.</p>
<p>Hoe sterk een waarde zo op en neer gaat, heet de [[volatiliteit|volatiliteit]]. Een daling van meer dan 15 procent op één dag is uitzonderlijk voor één groot bedrijf, maar dalingen van twintig, dertig procent over enkele maanden komen op de aandelenmarkt geregeld voor. Een lagere koers is meteen een lager vermogen. Of dat later goedgemaakt wordt, staat niet vast; wie dan verkoopt, legt het verlies vast.</p>

<h2>Blijvend verlies</h2>
<p>Soms komt een koers niet terug. Een bedrijf kan failliet gaan, een sector kan verdwijnen, een technologie kan ingehaald worden. Het verschil tussen een tijdelijke daling en een blijvend verlies ziet u vaak pas achteraf. Spreiding over veel bedrijven maakt het onwaarschijnlijk dat al uw beleggingen tegelijk blijvend verloren gaan; bij één aandeel is dat risico reëel. Het verhaal van Fortis gaat daarover.</p>

<h2>Wanbetaling</h2>
<p>Bij een obligatie of een spaarrekening is het risico vooral dat de lener niet terugbetaalt: het [[kredietrisico|kredietrisico]]. Voor spaartegoeden bij een bank geldt een wettelijke bescherming tot € 100.000 per persoon en per bank. Bij obligaties hangt het af van wie ze uitgeeft.</p>

<h2>Niet kunnen verkopen</h2>
<p>Sommige beleggingen kunt u niet snel of niet zonder verlies verkopen: een woning, een niet-beursgenoteerd bedrijf, een contract met hoge uitstapkosten. Dat heet liquiditeitsrisico. Het wordt zichtbaar op het slechtste moment: wanneer u het geld plots nodig hebt.</p>

<h2>Wisselkoers</h2>
<p>Wie belegt in bedrijven of obligaties in dollar, yen of pond, krijgt er een extra schommeling bij: de waarde van die munt tegenover de euro. Een Amerikaans aandeel kan in dollar stijgen en in euro toch dalen. Voor een gespreid wereldwijd fonds is dat een gewoon onderdeel van de belegging; het is goed om te weten dat het er is.</p>

<h2>Wat u aankunt, is iets anders dan wat u durft</h2>
<p>Hoeveel van deze risico’s passen bij u? Een adviseur kijkt daarvoor naar verschillende dingen, die vaak door elkaar gehaald worden.</p>
<p><strong>Doel en termijn</strong>: waarvoor is het geld, en wanneer hebt u het nodig?<br>
<strong>Financiële situatie</strong>: kunt u een verlies opvangen zonder dat uw leven of uw doelen in gevaar komen? Dat is uw [[draagvermogen|draagvermogen]], en het hangt af van inkomen, buffer en verplichtingen.<br>
<strong>Kennis en ervaring</strong>: begrijpt u hoe een product werkt, en hebt u er zelf al in belegd? Kennis kunt u opbouwen, ook hier. Een artikel lezen of een verkenning proberen is wel geen ervaring.<br>
<strong>Hoe u met risico omgaat</strong>: wat doet u als uw belegging een kwart minder waard is? Blijft u rustig, of verkoopt u?</p>
<p>Iemand kan veel durven maar weinig kunnen dragen, of omgekeerd. Daarom is uw [[risicoprofiel|beleggersprofiel]] geen keuze die u zelf aanvinkt, maar de uitkomst van een gesprek en een toets over al die dimensies samen.</p>

<h2>Wat deze ene dag leert</h2>
<p>Vraag bij elke belegging niet alleen ‘hoeveel kan het opbrengen?’ maar ook ‘welk soort risico draag ik hier, en wat gebeurt er als het zich voordoet op het slechtste moment?’ Voor wie het aandeel ASML had, was 15 oktober 2024 een echt waardeverlies. Of dat herstelt, hangt af van de resultaten en verwachtingen daarna. Wie aandelen bezit, moet zulke dagen kunnen dragen zonder op het slechtste moment te moeten verkopen.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Het risico spreiden', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/het-risico-spreiden-niet-alle' },
    { label:'Wikifin (FSMA) — Wat is je beleggersprofiel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/je-beleggersprofiel/wat-je-beleggersprofiel' },
    { label:'FSMA — Brochure beleggen via verzekeringen (IDD, 2026), p. 13: doelen en risicotolerantie, financiële situatie en verliesdraagkracht, kennis en ervaring', url:'https://www.fsma.be/sites/default/files/media/files/2026-04/fsma_brochure_idd_belegging_nl.pdf' },
    { label:'Reuters via Investing.com — Europese beurzen, 15 oktober 2024 (ASML −15,6 % in Amsterdam)', url:'https://www.investing.com/news/economy-news/european-shares-climb-to-twoweek-highs-oil-stocks-slump-3662684' },
    { label:'ASML — Resultaten derde kwartaal 2024, 15 oktober 2024', url:'https://www.asml.com/en/news/press-releases/2024/q3-2024-financial-results-dd3ac76a9d4d0f8c' }
  ],
  vervolg:{ type:'lezen', id:'fortis', zin:'Wat als het blijvende verlies net zit in het bedrijf dat iedereen veilig vond?' }
},

{ id:'fortis', hoofdstuk:'risico', soort:'verhaal',
  titel:'Fortis 2008: wanneer vertrouwd en veilig niet hetzelfde blijken',
  inleiding:'Voor veel Belgische families was het aandeel Fortis het aandeel bij uitstek: een grote, degelijke bank-verzekeraar, met een dividend dat elk jaar binnenkwam. In het najaar van 2008 verloren zij op enkele weken het grootste deel van die waarde.',
  kernidee:'Wie veel in één bedrijf belegt, hoe vertrouwd ook, hangt af van één verhaal. Spreiding vermindert de afhankelijkheid van één bedrijf, maar houdt een brede marktcrisis niet tegen.',
  beeld:{ type:'tijdlijn', punten:[['Eind september 2008', 'Redding: de Belgische, Nederlandse en Luxemburgse overheden grijpen in'], ['April 2009', 'Aandeelhouders keuren de overeenkomst met BNP Paribas goed'], ['2018', 'Schikking van € 1,3 miljard, geen volledige vergoeding']], bijschrift:'Drie momenten uit het verhaal van Fortis. Bronnen: Nationale Bank van België en Ageas.' },
  tekst:`
<p>Fortis was in 2007 een van de grootste financiële groepen van Europa. Het aandeel zat in veel portefeuilles van gewone Belgische spaarders, vaak omdat ze er klant waren, er werkten of het van hun ouders gekregen hadden. Het dividend was trouw, de naam klonk degelijk, en een bank leek iets wat niet zomaar verdwijnt.</p>
<p>In 2007 nam Fortis samen met twee andere banken het Nederlandse ABN AMRO over, een van de grootste bankovernames ooit. Om dat te betalen haalde het bedrijf vele miljarden op bij zijn aandeelhouders. Kort daarna brak de internationale financiële crisis uit.</p>
<p>Toen in september 2008 het vertrouwen tussen banken wegviel, kwam Fortis op enkele weken in acute geldnood. Eind september grepen de Belgische, Nederlandse en Luxemburgse overheden in. Op 3 oktober nam de Nederlandse staat de Nederlandse activiteiten over; op 6 oktober nam de Belgische staat Fortis Bank over, die grotendeels aan BNP Paribas zou worden overgedragen. Over die overeenkomst stemden de aandeelhouders pas in april 2009, na lang juridisch getouwtrek. Wat overbleef aan verzekeringsactiviteiten werd later Ageas.</p>
<p>Voor de aandeelhouders was de schade enorm: het aandeel verloor op enkele maanden het overgrote deel van zijn waarde. Er volgden jaren van rechtszaken. In 2018 werd een schikking van 1,3 miljard euro definitief. Die bracht een gedeeltelijke vergoeding, geen terugbetaling van wat aandeelhouders verloren; voor velen bleef het verlies blijvend.</p>

<h2>Wat er misging, bij de belegger</h2>
<p>De fouten van de bank zijn achteraf uitgebreid besproken. Voor de individuele belegger draait het verhaal om iets anders: [[concentratie|concentratie]]. Wie een groot deel van zijn vermogen in één aandeel heeft, hangt af van beslissingen en gebeurtenissen die hij niet kan voorzien of beïnvloeden. Dat het bedrijf vertrouwd voelde, maakte het risico niet kleiner; het maakte het minder zichtbaar.</p>
<p>Voor wie bij Fortis werkte, was het risico dubbel: inkomen en spaargeld hingen aan hetzelfde bedrijf. Datzelfde patroon zie je vandaag bij werknemers die veel aandelen van hun eigen werkgever bezitten.</p>

{{sim:spreiding}}

<h2>Wat spreiding wel en niet doet</h2>
<p>[[spreiding|Spreiding]] betekent dat u uw geld verdeelt over veel bedrijven, sectoren, landen en soorten beleggingen. Stort één bedrijf in, dan raakt dat maar een klein deel van het geheel. In de verkenning hierboven ziet u hoe het gewicht van één positie bepaalt hoeveel een daling van dat ene bedrijf aan het geheel kost.</p>
<p>Spreiding beschermt niet tegen alles. In 2008 daalden bijna alle aandelen tegelijk, ook in gespreide fondsen, alleen veel minder diep dan Fortis. Spreiding vermindert de afhankelijkheid van één onderneming. Ze neemt niet elk gezamenlijk risico weg: een crisis, een sectorprobleem of gedeelde schuldeisers kunnen meerdere posities raken. Herstel van een fonds blijft afhankelijk van zijn beleggingen; het is geen zekerheid.</p>

<h2>Een vraag om uzelf te stellen</h2>
<p>Kijk eens naar uw eigen bezit alsof het van een ander was. Hoeveel ervan hangt af van één bedrijf, één sector, één land of één woning? Hoe groter dat aandeel, hoe meer u blootstaat aan een verhaal dat u niet in handen hebt. Dat kan een bewuste keuze zijn, maar dan hoort het er ook een te zijn.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Het risico spreiden, niet alle eieren in één mand', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/het-risico-spreiden-niet-alle' },
    { label:'Nationale Bank van België — Financial Stability Review 2009 (redding Fortis, september–oktober 2008, overeenkomst BNP Paribas goedgekeurd in april 2009)', url:'https://www.nbb.be/doc/ts/publications/fsr/fsr2009en.pdf' },
    { label:'Ageas — Fortis-schikking definitief (2018, € 1,3 miljard)', url:'https://www.ageas.com/en/newsroom/fortis-settlement-final-1677445' }
  ],
  vervolg:{ type:'lezen', id:'profiel', zin:'Hoeveel risico past dan bij u? Dat is geen knop die u zelf kiest.' }
},

{ id:'nikkei', hoofdstuk:'risico', soort:'verhaal',
  titel:'1989: toen Tokio de beurs van de wereld leek',
  inleiding:'Op 29 december 1989 sloot de Japanse beursindex Nikkei op 38.916 punten. Dat record zou 34 jaar blijven staan. Wie vandaag een wereldindex koopt, bezit voor bijna driekwart Amerikaanse bedrijven. Wat leert Japan over die verhouding, en wat net niet?',
  kernidee:'Een index volgt wat vandaag groot is. Dat is geen fout, maar het betekent wel dat ook een brede index zwaar kan leunen op één land, en dat herstel na een piek heel lang kan duren.',
  beeld:{ type:'tijdlijn', punten:[['29 december 1989', 'De Nikkei sluit op 38.916 punten: een record'], ['22 februari 2024', 'Ruim 34 jaar later sluit hij voor het eerst hoger: 39.099 punten']], bijschrift:'Slotstanden van de Nikkei 225, afgerond. Een koersindex in yen: dividenden, kosten, inflatie en het valuta-effect voor een eurobelegger zijn niet inbegrepen.' },
  tekst:`
<p>Eind jaren tachtig leek Japan onstuitbaar. De economie groeide al decennia snel, Japanse bedrijven domineerden elektronica en auto’s, en de prijzen van aandelen en grond stegen jaar na jaar. Rond 1989 was de Japanse beurs in totale waarde groter dan de Amerikaanse. Wie toen wereldwijd belegde volgens de grootte van elke markt, bezat dus meer Japan dan Amerika.</p>
<p>Op de laatste beursdag van 1989 sloot de Nikkei, de bekendste Japanse index, op 38.916 punten. Daarna barstte de zeepbel. De koersen zakten in de jaren negentig diep, herstelden, en vielen opnieuw. Het oude record bleef buiten bereik, door meerdere economische en beurscrisissen heen.</p>

<h2>Vierendertig jaar</h2>
<p>Pas op 22 februari 2024 sloot de Nikkei voor het eerst boven zijn record van 1989, op 39.099 punten. Een generatie lang had de index daaronder gestaan. Dit gaat over de koersindex, zonder dividenden. Wie de uitkeringen herbelegde, had een ander herstelpad; voor een eurobelegger veranderde bovendien de wisselkoers het resultaat.</p>
<p>Een record in deze koersindex betekent niet dat iedere Japanse belegger pas in 2024 uit verlies kwam. Dividenden, aankoopmomenten, bijkomende stortingen, kosten en wisselkoersen veranderen het persoonlijke resultaat. De bruikbare les is dat zelfs een lange termijn geen vaste hersteltermijn oplevert.</p>

<h2>De wereldbelegger van toen</h2>
<p>Wie in 1989 een wereldwijd gespreide mand had, had dus een groot stuk Japan, en voelde die val. Maar de rest van die mand deed iets anders. Amerikaanse en Europese bedrijven groeiden in de jaren negentig sterk. Daardoor volgde het geheel niet het Japanse pad, en werd het gewicht van Japan in de wereldindex vanzelf kleiner. Een [[index|index]] past zich zo aan: niet vooraf, maar achteraf.</p>

<h2>De wereld van vandaag</h2>
<p>Op 30 oktober 2026 woog de Verenigde Staten in de MSCI World-index voor 72,8 procent. Japan, ooit de grootste, kwam nog op 5,7 procent. De tien grootste posities, allemaal van Amerikaanse bedrijven, waren samen goed voor ruim een kwart van de index. Het blijft een momentopname.</p>
<p>Het is verleidelijk om een rechte lijn te trekken naar Japan. Dat zou oneerlijk zijn. De Amerikaanse beurs van vandaag is niet de Japanse van 1989, en niemand weet hoe de verhoudingen zich de komende decennia ontwikkelen. Ze kunnen nog verder in dezelfde richting gaan. Wat Japan wel toont, is eenvoudiger: wat vandaag het grootst is, hoeft dat niet te blijven, en een index volgt die verschuiving pas nadat ze gebeurd is.</p>

<h2>Wat u ermee kunt</h2>
<p>Het verhaal is geen reden om een land te mijden of een ander te verkiezen. Het is een reden om te weten wat er in uw mand zit. Een wereldindex is breder dan één land, en dat is precies wat hem beschermde tegen het Japanse scenario. Hoe breed hij vandaag werkelijk is, leest u in zijn informatieblad: landen, sectoren, grootste posities. En spreiding werkt niet alleen over landen, maar ook over tijd: wie geleidelijk inlegt, legt niet alles op één moment op één top.</p>
`,
  bronnen:[
    { label:'Nikkei Indexes — Newsletter maart 2024: recordslot op 22 februari 2024 boven het record van 29 december 1989', url:'https://indexes.nikkei.co.jp/nkave/archives/file/nikkei_indexes_newsletter_vol51.pdf' },
    { label:'MSCI — MSCI World Index, factsheet 30 oktober 2026 (landengewichten, grootste posities)', url:'https://www.msci.com/documents/10199/178e6643-6ae6-47b9-82be-e1fc565ededb' },
    { label:'justETF — Japan: the ultimate stock market crash (marktwaarde per land, herstel met dividenden; commerciële bron)', url:'https://www.justetf.com/en/academy/japan-stock-market-crash.html' }
  ],
  vervolg:{ type:'lezen', id:'spreiding', zin:'Spreiding over landen, sectoren en bedrijven: wat vangt ze op, en waar houdt ze op?' }
},

{ id:'eerste-jaar', hoofdstuk:'risico', soort:'verhaal',
  titel:'Het eerste jaar van Sarah en Jonas: beginnen in 2022',
  inleiding:'Een fictief gezin uit Ninove begint in januari 2022 elke maand te beleggen. Een maand later valt Rusland Oekraïne binnen, de energiefactuur schiet omhoog en eind dat jaar is hun belegging minder waard dan wat ze erin stopten. Wat doet u dan?',
  kernidee:'Volhouden is geen kwestie van moed op het slechtste moment, maar van afspraken die u vooraf maakt: een buffer, een termijn en wat u doet als het tegenzit.',
  beeld:{ type:'balken', eenheid:'%', rijen:[['2022', -12.78, 'kost'], ['2023', 19.60, ''], ['2024', 26.60, ''], ['2025', 6.77, '']], bijschrift:'Jaarrendementen MSCI World in euro, met herbelegde dividenden na de bronheffing volgens de indexmethode. Geen fondsresultaat: fonds- en persoonlijke kosten en belastingen zijn niet verwerkt. Het gezin is fictief.' },
  tekst:`
<p class="fictie">Sarah, Jonas en hun kinderen zijn verzonnen. De beurscijfers zijn echt: de jaarrendementen van de MSCI World-index in euro.</p>
<p>Sarah is 34 en verpleegkundige, Jonas is 36 en werkt bij een aannemer. Ze wonen met Lars, vier, en Fien, één, in een rijwoning in Ninove. Na twee jaar sparen staat er een buffer van een half jaar vaste uitgaven op hun spaarrekening. Op een avond in december 2021 beslissen ze om voor de kinderen iets op te bouwen, voor over vijftien jaar of meer: € 150 per maand, automatisch, in een breed wereldwijd aandelenfonds.</p>
<p>Ze maken drie afspraken met elkaar. De buffer blijft apart en wordt niet belegd. Het bedrag vertrekt elke maand vanzelf. En ze verkopen niet omdat het nieuws slecht is; alleen als ze het geld echt nodig hebben en de buffer op is.</p>

<h2>Februari</h2>
<p>De eerste storting vertrekt in januari 2022. Op 24 februari valt Rusland Oekraïne binnen. De beurzen reageren nerveus, de prijzen van gas en elektriciteit schieten omhoog. Sarah opent de app van de bank nu elke avond. Het bedrag is klein, maar het staat in het rood, en dat voelt groter dan het is.</p>

<h2>Het najaar</h2>
<p>In oktober komt de nieuwe energiefactuur. Het voorschot verdubbelt bijna. Sarah en Jonas gaan aan de keukentafel zitten. Ze verkopen niets. Wel verlagen ze de maandelijkse inleg een paar maanden tot € 75, zodat de hogere facturen uit het gewone budget komen en de buffer intact blijft. Ook dat is een afspraak nakomen: de buffer is er om niet te moeten verkopen.</p>
<p>Eind december staat hun fonds lager dan wat ze erin stopten. De wereldindex verloor dat jaar in euro 12,8 procent. Voor een eerste jaar is dat geen bemoedigende kennismaking.</p>

<h2>Wat ze toen niet konden weten</h2>
<p>De jaren daarna liepen anders. In 2023 won dezelfde index in euro 19,6 procent, in 2024 26,6 procent en in 2025 6,8 procent. Wie in januari 2022 één euro in de index stak, had eind 2025 zowat € 1,41, ondanks dat slechte eerste jaar. Een fonds volgt nooit precies dezelfde uitkomst: kosten, volgverschillen en persoonlijke belastingen spelen mee. Voor maandelijkse stortingen is de rekensom bovendien anders, omdat elk bedrag op een ander moment begint mee te doen.</p>

<h2>Waarom dit geen succesverhaal is</h2>
<p>Het zou verkeerd zijn om hieruit te besluiten dat volhouden altijd binnen drie jaar beloond wordt. Na de Japanse beurspiek van 1989 duurde het tientallen jaren. Het herstel van 2023 was geen verdienste van Sarah en Jonas, en het was niet te voorspellen.</p>
<p>Wat wel van hen was, zijn de afspraken. Ze hadden een [[buffer|buffer]], waardoor de energiefactuur geen verkoop afdwong. Ze hadden een termijn van vijftien jaar, waardoor een slecht jaar geen ramp was. En ze hadden vooraf beslist wat ze zouden doen als het tegenzat, zodat ze dat niet op de slechtste avond moesten bedenken. Hadden ze het geld in 2023 nodig gehad voor een nieuwe wagen, dan was het verhaal anders afgelopen. Daarom begint volhouden niet bij de beurs, maar bij de vraag wanneer u het geld nodig hebt.</p>
`,
  bronnen:[
    { label:'MSCI — MSCI World Index (EUR), factsheet 31 december 2025, netto-indexrendementen 2022–2025', url:'https://www.msci.com/resources/factsheets/index_fact_sheet/msci-world-index-eur-net.pdf' },
    { label:'Rekensom: 0,8722 × 1,1960 × 1,2660 × 1,0677 ≈ 1,41 (indexwaarde, zonder kosten of belasting).', url:null }
  ],
  vervolg:{ type:'lezen', id:'daling', zin:'Hoe diep kan een daling gaan, hoe lang duurt herstel, en wanneer weegt ze het zwaarst?' }
},

/* ───────────── 5. WELKE AANPAK PAST BIJ MIJ ───────────── */
{ id:'profiel', hoofdstuk:'samen', soort:'uitleg', keuzemoment:['strategie'],
  titel:'Uw beleggersprofiel: welke aanpak past bij u?',
  inleiding:'Dezelfde belegging past niet bij iedereen. Uw doel, termijn, financiële situatie, ervaring en omgang met risico bepalen samen welke aanpak geschikt kan zijn.',
  kernidee:'Strategie volgt uit doel, termijn en draagvermogen, niet uit hoeveel rendement u zou willen.',
  beeld:{ type:'stroom', stappen:['Doel en termijn', 'Financiële situatie en draagvermogen', 'Kennis, ervaring en hoe u met een daling omgaat'], noot:'Samen leiden ze tot een beleggersprofiel: welk risico en welke aanpak bij u passen. U kiest het niet als een smaak.', bijschrift:'Waaruit een profiel bestaat. Uw adviseur stelt het samen met u op.' },
  tekst:`
<p>Stel u twee mensen voor met elk € 25.000. De ene heeft het geld over drie jaar nodig voor een woning, de andere wil er over vijfentwintig jaar het pensioen mee aanvullen. Hetzelfde bedrag stelt heel andere eisen aan een belegging. Wat voor de ene te veel schommelt, kan voor de andere te onderzoeken zijn.</p>
<p>Een profiel brengt die verschillen in kaart. Een hoger verwacht rendement vraagt doorgaans meer beleggingsrisico. Of dat risico bij u past, hangt af van uw volledige situatie. Meer risico nemen geeft op zichzelf geen recht op een hogere opbrengst.</p>

<h2>Waaruit een profiel bestaat</h2>
<p>Een [[risicoprofiel|beleggersprofiel]] volgt uit drie groepen vragen, aangevuld met uw voorkeuren. Wat zijn uw beleggingsdoelen, wanneer hebt u het geld nodig, en hoeveel risico wilt u nemen? Hoeveel buffer en inkomen hebt u, en welke verplichtingen? Hoeveel verlies kunt u financieel dragen? Begrijpt u de producten, en hebt u er ervaring mee? En hebt u voorkeuren, bijvoorbeeld over duurzaamheid, waarmee rekening gehouden moet worden?</p>
<p>Het resultaat zegt welk risico en welke soort beleggingen bij u passen. In een strategie wordt dat vaak vertaald naar een verhouding tussen rustigere bouwblokken zoals obligaties en spaargeld, en beweeglijkere zoals aandelen, maar ook de soort producten en hoe goed u ze begrijpt tellen mee. Een defensieve strategie bevat doorgaans meer obligaties en minder aandelen: minder schommeling, meestal ook minder verwachte groei. Een dynamische strategie bevat meer aandelen: een grotere kans op groei over lange termijn, maar ook diepere tussentijdse dalingen. Geen van beide is ‘beter’. Ze passen bij een andere situatie.</p>

<h2>Termijn verandert alles</h2>
<p>Hetzelfde gezin kan voor verschillende doelen een andere strategie hebben. Het geld voor een verbouwing over drie jaar vraagt rust; een aanvulling op het pensioen over vijfentwintig jaar kan meer schommeling dragen. Daarom kijkt een plan per doel naar de termijn. En naarmate een doel dichterbij komt, kan het zinvol zijn de strategie geleidelijk rustiger te maken, zodat een daling vlak voor het moment van gebruik minder schade doet.</p>

<h2>Gedrag is de verborgen factor</h2>
<p>Op papier kiezen veel mensen moediger dan ze in werkelijkheid zijn. In een goede beursperiode lijkt een daling van dertig procent een abstract getal. Wanneer ze echt gebeurt en het om uw eigen spaargeld gaat, verkopen sommige beleggers net op het laagste punt. Daarmee leggen ze het verlies vast en missen ze een eventueel herstel.</p>
<p>Een strategie die u in een slechte periode volhoudt, is meer waard dan een theoretisch betere die u verlaat. Daarom vraagt een goed profiel ook hoe u gereageerd hebt of zou reageren, en niet alleen wat u hoopt.</p>

<h2>De uitvoering telt ook</h2>
<p>Binnen eenzelfde strategie kan het geld actief beheerd worden of een index volgen. Dat is in de eerste plaats een keuze over hoe de strategie uitgevoerd wordt, met gevolgen voor de kosten. Het kan ook het risico veranderen: een beheerder die sterk afwijkt, kan meer of minder risico nemen dan de markt.</p>

<h2>Een verkenning is nog geen profiel</h2>
<p>In uw plan kunt u een aanpak aannemen om te zien hoe het plan er dan zou kunnen uitzien. Dat is een verkenning en geen profiel. Uw werkelijke beleggersprofiel stelt uw adviseur samen met u op, na een toets van uw kennis en ervaring en een gesprek over uw situatie. Een hoger profiel is geen beloning en geeft geen toegang tot ‘betere’ producten; het beschrijft alleen wat bij u past.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Wat is je beleggersprofiel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/je-beleggersprofiel/wat-je-beleggersprofiel' },
    { label:'FSMA — Brochure beleggen via verzekeringen (IDD, 2026), p. 13', url:'https://www.fsma.be/sites/default/files/media/files/2026-04/fsma_brochure_idd_belegging_nl.pdf' },
    { label:'FSMA — Gedragsregels duurzaamheidsvoorkeuren (MiFID II, IDD)', url:'https://www.fsma.be/nl/gedragsregels-duurzaamheidsvoorkeuren-mifid-ii-en-idd-en-pog' },
    { label:'FSMA — Praktijkgids IDD (kennis en ervaring, p. 43–48)', url:'https://www.fsma.be/sites/default/files/media/files/2022-01/fsma_2022_06_nl.pdf' },
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (principes over volatiliteit en markttiming)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' }
  ],
  vervolg:{ type:'lezen', id:'instappen', zin:'Legt u in één keer in, of elke maand een beetje?' }
},

{ id:'instappen', hoofdstuk:'samen', soort:'uitleg', keuzemoment:['inleg'],
  titel:'In één keer of elke maand? Het ritme van instappen',
  inleiding:'Een erfenis in één keer beleggen, ze in schijven investeren of elke maand iets opzijzetten: het ritme verandert hoe lang uw geld meedoet en hoe u een slechte start ervaart.',
  kernidee:'Eenmalig inleggen werkt langer mee; gespreid inleggen beperkt de spijt van een slecht moment. Regelmaat telt zwaarder dan timing.',
  beeld:{ type:'reken', id:'ritme', bijschrift:'Sofie en Tom (fictief) leggen over tien jaar elk € 24.000 in. Het verschil zit in hoe lang dat geld gemiddeld meewerkt.' },
  tekst:`
<p>Neem twee buren. Sofie erft € 24.000 en legt het in één keer in. Tom heeft geen erfenis, maar zet elke maand € 200 opzij om te beleggen. Na tien jaar hebben ze evenveel ingelegd. Toch is hun verhaal anders, en dat zegt iets over de twee manieren van instappen.</p>

<h2>Eenmalig: meer tijd, meer spijtrisico</h2>
<p>Een eenmalig bedrag werkt van de eerste dag volledig mee. Omdat markten op lange termijn vaker stijgen dan dalen, leverde in één keer inleggen in veel historische perioden gemiddeld meer op dan hetzelfde bedrag gespreid inleggen. Dat is de rekenkundige kant, en die weegt in het voordeel van [[samengestelde-groei|tijd in de markt]].</p>
<p>De menselijke kant is anders. Stel dat Sofie inlegt en de markt zakt in de maanden daarna met twintig procent. Dan is haar erfenis € 4.800 minder waard. Dat is een echt verlies van vermogen. Of het later goedgemaakt wordt, hangt af van wat de markt daarna doet, en zeker is dat niet. Psychologisch is het zwaar, en wie daardoor verkoopt, legt het verlies vast. Niemand kan voorspellen of de dag na uw inleg een goede of slechte dag wordt, ook professionals niet.</p>

<h2>Gespreid: minder spijt, iets minder tijd</h2>
<p>Wie een som in schijven inlegt, bijvoorbeeld over twaalf maanden, verkleint de kans op een heel ongelukkig instapmoment. Daalt de markt, dan koopt u de volgende schijven goedkoper. Stijgt ze, dan had u achteraf beter alles meteen ingelegd.</p>
<p>Gespreid instappen is dus vooral een manier om spijt te beperken en het makkelijker te maken om aan de strategie vast te houden. Dat is een legitieme reden, zolang u weet dat het een keuze voor rust is en geen techniek die gegarandeerd meer oplevert.</p>

<h2>Maandelijks: geen keuze, wel een kracht</h2>
<p>Tom heeft geen som om te spreiden; hij legt in wat hij elke maand kan missen. Voor de meeste mensen is dat de realistische weg, en ze heeft een echte kracht: regelmaat. Een vast bedrag dat automatisch vertrekt, vraagt geen beslissing meer en houdt stand in goede en slechte maanden. In dalende periodes koopt hetzelfde bedrag meer, in stijgende minder. Op lange termijn telt vooral dat het blijft doorlopen.</p>
<p>Heeft € 100 per maand zin? Over twintig jaar is dat € 24.000 eigen inleg, plus een onzekere waardeverandering. Dat kan een betekenisvol bedrag worden, maar de belegging kan ook minder waard zijn dan de inleg. En het bedrag kan meegroeien met uw inkomen.</p>

<h2>Combineren mag</h2>
<p>Veel plannen combineren beide: een startbedrag dat het grootste deel van de tijd laat meewerken, en een maandelijkse inleg die het geheel aanvult. In uw plan kunt u beide invullen en het effect op de plangrafiek zien.</p>

<h2>Het ritme dat u volhoudt</h2>
<p>Er is geen ritme dat altijd het meest oplevert. Kies het ritme dat u volhoudt: een eenmalige inleg als u een daling meteen erna kunt verdragen, gespreid als dat u helpt om rustig te blijven, maandelijks als dat is wat u kunt. Past het bedrag later niet meer in uw budget, dan is aanpassen verstandig. Een werkbaar ritme helpt om marktpaniek te onderscheiden van een echte verandering in uw situatie.</p>
`,
  bronnen:[
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (markttiming, vroeg beginnen)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' }
  ],
  vervolg:{ type:'lezen', id:'kind', zin:'Sparen voor iemand anders: van wie is het geld, en wanneer moet het er zijn?' }
},

{ id:'kind', hoofdstuk:'samen', soort:'uitleg', keuzemoment:['termijn'],
  titel:'Beleggen voor een kind: van wie is het geld, en wanneer?',
  inleiding:'Ouders en grootouders die voor een kind sparen, beginnen vaak bij de vraag welk product. Twee andere vragen bepalen meer: op wiens naam staat het geld, en wanneer moet het er zijn?',
  kernidee:'Geld op naam van een kind is van het kind, en vanaf zijn achttiende beslist het zelf. Wie de bestemming wil blijven sturen, spaart op eigen naam. De tijd tot het moment van gebruik bepaalt hoeveel schommeling past.',
  beeld:{ type:'termijn', rijen:[['Beginnen bij de geboorte', 18], ['Beginnen op tien jaar', 8], ['Beginnen op vijftien jaar', 3]], max:18, bijschrift:'De tijd tot de achttiende verjaardag. Hoe meer jaren, hoe meer ruimte om een slechte periode te herstellen.' },
  tekst:`
<p>Een spaarpot voor een kind voelt als een eenvoudig gebaar. Toch zitten er twee beslissingen in die verder reiken dan het product: wie wordt eigenaar, en voor welk moment spaart u? Wie die twee eerst beantwoordt, kiest daarna veel makkelijker.</p>

<h2>Op naam van het kind</h2>
<p>Zet u geld op een rekening op naam van een kind, dan is dat geld van het kind. Zolang het minderjarig is, beheren de ouders het, maar niet zomaar: willen ouders goederen van hun kind verkopen of weggeven, dan is daar in principe de toestemming van de vrederechter voor nodig, en een bank kan zich in twijfelgevallen verzetten tegen een opname. Wordt het kind achttien, dan kan het vrij over het geld beschikken. Het kan dan ook terugbetaling eisen van geld dat de ouders voor zichzelf gebruikt zouden hebben.</p>
<p>Dat is een sterke bescherming voor het kind. Het betekent ook dat u de bestemming loslaat. Wie op zijn achttiende liever een wereldreis maakt dan studeert, beslist dat zelf.</p>

<h2>Op uw eigen naam</h2>
<p>Wilt u meer controle houden, dan kunt u voor het kind sparen op een aparte rekening of belegging op uw eigen naam. Het geld blijft dan van u, tot u het geeft. U beslist wanneer en hoe. Veel ouders combineren beide: een rekening op naam van het kind voor wat het vrij mag gebruiken, en een pot op eigen naam voor grote uitgaven zoals studies of een eerste woning.</p>
<p>Geeft u later een groter bedrag, dan is dat een schenking, met eigen regels en een fiscale behandeling die per gewest verschilt. Bij grotere bedragen kan een notaris de mogelijkheden toelichten. Spreek ook af wat er gebeurt als u het geld zelf onverwacht nodig hebt: op eigen naam blijft het geld van u, met alle flexibiliteit en onzekerheid die daarbij hoort.</p>

<h2>Achttien jaar is een termijn</h2>
<p>Wie bij de geboorte begint, heeft achttien jaar. Dat is een [[horizon|termijn]] waarbij een deel beleggen zinvol kan zijn: er is tijd om een slechte periode te herstellen, en kleine maandelijkse bedragen tellen over zo’n periode op. Maar de datum ligt vast. Studies beginnen niet later omdat de beurs net gezakt is. Daarom maken veel ouders de pot rustiger naarmate die datum nadert, zodat een daling op zestien of zeventien jaar minder schade doet.</p>
<p>Begint u pas wanneer het kind tien of vijftien is, dan is de termijn korter en past er minder schommeling. Dan weegt de rust van een spaarrekening zwaarder dan de kans op groei.</p>

<h2>Wat er niet bij past</h2>
<p>Pensioensparen staat op uw eigen naam en is bedoeld voor uw eigen pensioen; wie het vóór zijn zestigste opneemt, betaalt een hoge belasting. Het is dus geen spaarpot voor een kind. Kijk ook uit voor producten met een looptijd of uitstapkosten die verder reiken dan het moment waarop het kind het geld nodig heeft.</p>

<h2>Wanneer anderen meesparen</h2>
<p>Grootouders, een meter of een peter willen vaak ook iets bijdragen. Dezelfde vragen gelden dan voor hen. Het helpt om de bedoeling op papier te zetten en af te spreken met de ouders, zeker als er meerdere kinderen zijn: wat gelijk is en wat niet, en waarom. Dat voorkomt verrassingen, achttien jaar later.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Een spaarrekening openen voor je kind (eigendom, vrederechter, achttien jaar, sparen op eigen naam)', url:'https://www.wikifin.be/nl/familie/financiele-opvoeding/een-spaarrekening-openen-voor-je-kind' },
    { label:'Wikifin (FSMA) — Een spaarrekening voor het nieuwjaarsgeld van mijn kind (opnames vanaf 16 en 18 jaar)', url:'https://www.wikifin.be/nl/faq/1-een-spaarrekening-voor-het-nieuwjaarsgeld-van-mijn-kind' }
  ],
  vervolg:{ type:'lezen', id:'opvolgen', zin:'Een plan blijft niet vanzelf kloppen. Wanneer kijkt u opnieuw, en wat verandert er als u gaat opnemen?' }
},

{ id:'opvolgen', hoofdstuk:'samen', soort:'uitleg',
  titel:'Opvolgen, herwegen en opnemen: een plan blijft niet vanzelf kloppen',
  inleiding:'Een plan is gemaakt voor de situatie van vandaag. Markten bewegen, uw leven verandert, en op een dag wilt u het geld gebruiken. Elk van die drie momenten vraagt een andere vraag.',
  kernidee:'Herwegen brengt een belegging terug naar de afgesproken verhouding. Een verandering in uw leven kan het plan zelf wijzigen. Opnemen is een eigen fase, met eigen risico’s.',
  beeld:{ type:'stroom', stappen:['Afgesproken: 60 % aandelen, 40 % obligaties', 'Na een sterk aandelenjaar: zowat 66 % aandelen', 'Herwegen: terug naar de afspraak'], noot:'Rekenvoorbeeld: de aandelen stijgen 30 %, de obligaties blijven gelijk.', bijschrift:'Waarom een verdeling na een goed jaar vanzelf verschuift.' },
  tekst:`
<p>Wie een plan gemaakt heeft, wil er liefst niet meer naar omkijken. Voor een groot deel kan dat ook: een goede verdeling hoeft niet elke maand bijgestuurd te worden. Maar helemaal vanzelf blijft een plan niet kloppen. Drie dingen veranderen het: de markt, uw leven, en het moment waarop u het geld gaat gebruiken.</p>

<h2>Herwegen: terug naar de afspraak</h2>
<p>Stel dat u afsprak om 60 procent in aandelen en 40 procent in obligaties te beleggen. Na een jaar waarin aandelen 30 procent stijgen en obligaties gelijk blijven, zit u zonder iets te doen aan ongeveer 66 procent aandelen. Uw belegging is beweeglijker geworden dan u bedoelde. [[herwegen|Herwegen]] betekent: een deel verkopen van wat sterk steeg en bijkopen wat achterbleef, tot de afgesproken verhouding terug is.</p>
<p>Dat voelt tegennatuurlijk: u verkoopt wat goed liep. Maar herwegen is geen voorspelling, het is discipline. Het houdt uw risico waar u het wilde hebben. Na een daling werkt het omgekeerd: dan koopt u bij wat goedkoper werd.</p>
<p>Herwegen kan op vaste momenten, bijvoorbeeld eenmaal per jaar, of wanneer de verdeling meer dan een afgesproken marge afwijkt. Verkopen kost wel geld: transactiekosten, beurstaks, en sinds 2026 mogelijk meerwaardebelasting boven de jaarlijkse vrijstelling. Vaak is het eenvoudiger om nieuwe inleg naar het deel te sturen dat achterbleef. Bij veel gemengde fondsen gebeurt het herwegen binnen het fonds.</p>

<h2>Wanneer uw leven verandert</h2>
<p>Een nieuwe job, een kind, een scheiding, een erfenis, ziekte, een verhuis: zulke gebeurtenissen veranderen uw doelen, uw termijn of uw draagvermogen. Dat is geen herwegen meer, dat is het plan zelf opnieuw bekijken, en vaak ook uw beleggersprofiel. Een goede vuistregel: een daling op de beurs is zelden een reden om uw plan te wijzigen, een verandering in uw leven vaak wel.</p>

<h2>Naar het doel toe</h2>
<p>Naarmate een doel dichterbij komt, is er minder tijd om een daling te herstellen. Daarom wordt de aanpak in veel plannen geleidelijk rustiger in de laatste jaren voor het doel. Ook het Norte-plan rekent met een aanpak die rustiger wordt naarmate het einde nadert.</p>

<h2>Opnemen: de fase die vaak vergeten wordt</h2>
<p>Op een dag wordt sparen gebruiken. Wie maandelijks wil opnemen, bijvoorbeeld als aanvulling op het pensioen, staat voor een nieuwe vraag: hoeveel kan ik elk jaar uit mijn vermogen halen zonder het te snel uit te putten?</p>
<p>Een vast bedrag geeft zekerheid over het inkomen, maar weegt zwaar als de waarde daalt. Een vast percentage van de waarde past zich aan, maar geeft een wisselend inkomen. In beide gevallen weegt een daling in de eerste jaren van opnemen het zwaarst: wat u dan verkoopt, kan niet meer herstellen. Sommige mensen houden daarom het geld voor de eerstvolgende jaren in een rustige vorm apart, zodat ze niet hoeven te verkopen op een slecht moment. Ook bij opnemen kunnen belasting en kosten spelen, afhankelijk van wat u verkoopt.</p>
<p>In een plan hoort opnemen een eigen gebeurtenis te zijn, zichtbaar als uitbetaling, en niet te verwarren met een daling.</p>

<h2>Een vast ritme</h2>
<p>Spreek een vast moment af om terug te kijken, bijvoorbeeld eenmaal per jaar. Is de buffer nog groot genoeg? Kloppen de doelen en hun termijn nog? Is de verdeling niet ver afgeweken? Zijn de kosten nog in verhouding? Vier vragen, een uur werk, en een plan dat blijft passen bij wie u nu bent.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Wat is je beleggersprofiel?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/je-beleggersprofiel/wat-je-beleggersprofiel' },
    { label:'FOD Financiën — Meerwaardebelasting op financiële activa', url:'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting' },
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (principes over spreiding en herwegen)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' },
    { label:'Rekenvoorbeeld figuur: 60 × 1,30 = 78; 78 / (78 + 40) ≈ 66 %.', url:null }
  ],
  vervolg:{ type:'lezen', id:'aannames', zin:'De lijn in een plangrafiek rust op aannames. Waar komen ze vandaan, en waar houden ze op?' }
},

{ id:'rendement-simulatie', hoofdstuk:'opbrengst', soort:'uitleg', keuzemoment:['simulatie'],
  titel:'Met welk rendement rekent de simulatie? De aannames achter uw bedrag, in gewone taal',
  inleiding:'Een simulatie toont welk bedrag u op een bepaald moment zou kunnen hebben. Dat bedrag komt uit een berekening met vaste aannames. Hier leest u welke, waarom ze zo gekozen zijn, en wat ze niet zeggen.',
  kernidee:'Het bedrag in de simulatie is een berekening onder aannames, geen belofte. Het is bruto: zonder kosten en zonder belastingen.',
  beeld:{ type:'stroom', stappen:['Een verwacht rendement per soort belegging', 'Een mix die past bij uw profiel', 'Minder risico naarmate uw doel nadert', 'Een marktpad met dalingen'], noot:'Vier stappen achter elk bedrag in de simulatie.' },
  tekst:`
<h2>Wat we per soort belegging verwachten</h2>
<p>De simulatie rekent met 6,40 procent per jaar voor aandelen, 3,02 procent voor obligaties en 0,86 procent voor spaargeld. Dat zijn bruto rekenaannames. Wat u werkelijk ontvangt, hangt af van onder meer het marktverloop, kosten en belastingen.</p>
<div class="disc"><button type="button" class="disc-knop" aria-expanded="false" aria-controls="norte-rendementsbronnen"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span>Bekijk waarop uw simulatie rekent</span></button><div class="disc-paneel" id="norte-rendementsbronnen" data-dicht><div class="disc-binnen">
<ol>
<li><strong>Horizon-enquête (editie 2026).</strong> De verwachting voor grote Amerikaanse bedrijven bedraagt 6,39 procent per jaar over tien jaar. Boven de gebruikte Amerikaanse basisrente van 3,95 procent blijft 2,44 procentpunt vergoeding voor aandelenrisico over.</li>
<li><strong>Aswath Damodaran (1 januari 2026).</strong> Uit beurskoersen en verwachte uitkeringen volgt voor dezelfde markt een verwacht rendement van 8,41 procent. Boven diezelfde basisrente is dat 4,46 procentpunt.</li>
<li><strong>Beide ramingen tellen even zwaar.</strong> Het gemiddelde is 3,45 procentpunt. Norte gebruikt de Amerikaanse markt als referentie voor de aandelenaanname.</li>
<li><strong>Een basisrente in euro.</strong> Bij dat gemiddelde telt Norte 2,948 procent voor tienjarig overheidspapier met AAA-rating uit de eurozone (ECB, 31 december 2025). Afgerond komt de aanname op 6,40 procent per jaar.</li>
</ol>
</div></div></div>

<h2>Uw profiel bepaalt de mix</h2>
<p>Hoeveel [[aandeel|aandelen]] er in uw simulatie zitten, hangt af van het profiel dat u kiest:</p>
<ul>
<li>Sparen: alles op de spaarrekening.</li>
<li>Defensief: 30 procent aandelen, de rest obligaties. Samen ongeveer 4,0 procent per jaar.</li>
<li>Neutraal: 50 procent aandelen. Ongeveer 4,7 procent per jaar.</li>
<li>Dynamisch: 80 procent aandelen. Ongeveer 5,7 procent per jaar.</li>
<li>Agressief: alleen aandelen. 6,40 procent per jaar.</li>
</ul>
<p>Meer aandelen betekent een hoger verwacht rendement, maar ook grotere schommelingen onderweg.</p>

<h2>Minder risico naarmate uw doel nadert</h2>
<p>We beleggen in functie van de termijn van uw doel. Is uw doel nog ver weg, dan heeft een daling tijd om te herstellen. Komt het dichterbij, dan bouwt de simulatie het risico stap voor stap af:</p>
<ul>
<li>nog 25 jaar of meer: alle profielen kunnen;</li>
<li>tussen 15 en 25 jaar: hoogstens dynamisch;</li>
<li>tussen 8 en 15 jaar: hoogstens neutraal;</li>
<li>tussen 3 en 8 jaar: hoogstens defensief;</li>
<li>de laatste drie jaar: op de spaarrekening.</li>
</ul>
<p>Daarom laat een korte termijn niet elk profiel toe, en daarom groeit de lijn vlak voor uw doel rustiger.</p>

<h2>Dalingen zitten er bewust in</h2>
<p>Een lijn die elk jaar evenveel stijgt, zou te mooi zijn. Het marktpad in de simulatie bevat daarom dalingen, geïnspireerd op crisissen uit het verleden. Het is één voorbeeldpad. Het zegt niet hoe waarschijnlijk een bedrag is, en de werkelijkheid kan beter of slechter uitvallen, ook lager dan wat u inlegde.</p>

<h2>Wat er niet in zit</h2>
<p>De simulatie rekent bruto: zonder instapkosten, lopende kosten en belastingen. Die hangen af van het product dat u kiest, en ze verlagen het bedrag. Ook uw eigen gedrag zit er niet in: wie halverwege verkoopt, volgt een ander pad. De bedragen zijn in euro’s van het jaar zelf; wat u er later mee kunt kopen, hangt af van de [[koopkracht|inflatie]].</p>

<h2>Hoe u de simulatie het best gebruikt</h2>
<p>Gebruik de simulatie om te vergelijken: wat doet een hoger maandbedrag, een langere termijn of een rustiger profiel? Voor een eerlijk en volledig beeld, met kosten en belastingen voor uw situatie, neemt u best contact op met een financieel adviseur.</p>
`,
  bronnen:[
    { label:'Horizon Actuarial, Survey of Capital Market Assumptions 2026, tabel 3. Tienjarige raming voor US Equity – Large Cap.', url:'https://www.horizonactuarial.com/_files/ugd/f76a4b_a73ade7e6ba748f192d531c974bbea2a.pdf?index=true#page=5' },
    { label:'Aswath Damodaran (NYU Stern), berekening van de impliciete risicopremie op 1 januari 2026.', url:'https://pages.stern.nyu.edu/~adamodar/pdfiles/blog/DataUpdate4for2026.pdf' },
    { label:'Europese Centrale Bank, tienjarige AAA-spotrente in euro op 31 december 2025.', url:'https://data.ecb.europa.eu/data/datasets/YC/YC.B.U2.EUR.4F.G_N_A.SV_C_YM.SR_10Y' },
    { label:'Rekenmethode: Norte-rekenkern, M27 marktveronderstellingen versie 2026-11.1. Aandelen 6,40 %, obligaties 3,02 % per jaar nominaal (reëel 4,31 % en 1 % bij 2 % inflatie); spaarrente 0,86 %. Prototypeparameters, niet onafhankelijk gevalideerd.', url:null },
    { label:'Rekenvoorbeeld: defensief 0,3 × 6,40 + 0,7 × 3,02 ≈ 4,0 %; neutraal 0,5 × 6,40 + 0,5 × 3,02 ≈ 4,7 %; dynamisch 0,8 × 6,40 + 0,2 × 3,02 ≈ 5,7 % per jaar, vóór kosten en belasting en zonder afbouw.', url:null },
    { label:'Afbouw volgens de termijn (rekenkern, horizonPassend): minder dan 3 jaar sparen, minder dan 8 jaar defensief, minder dan 15 jaar neutraal, minder dan 25 jaar dynamisch, vanaf 25 jaar agressief; nooit hoger dan het gekozen profiel.', url:null },
    { label:'Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten' }
  ],
  vervolg:{ type:'lezen', id:'aannames', zin:'Waar de aannames vandaan komen, en waar ze ophouden.' }
},

{ id:'aannames', hoofdstuk:'samen', soort:'uitleg', keuzemoment:['plan'],
  titel:'Hoe het plan rekent: waar de aannames vandaan komen en waar ze ophouden',
  inleiding:'Een plangrafiek toont een vloeiende lijn naar uw doel. Achter die lijn zitten keuzes: een verwacht rendement per soort belegging, een verdeling, een marktpad en een inflatie. Wie die keuzes kent, leest de grafiek beter, en vertrouwt ze niet blind.',
  kernidee:'De lijn in het plan is een berekening met vastgelegde uitgangspunten, geen voorspelling. Ze helpt keuzes vergelijken; ze zegt niet wat er zal gebeuren.',
  beeld:{ type:'stroom', stappen:['Een verwacht rendement per soort belegging', 'Een verdeling volgens de aanpak', 'Een gemodelleerd marktpad met dalingen', 'Bedragen in euro van dat jaar'], noot:'Vier lagen achter elke lijn in de verkenningen uit het plan.', bijschrift:'Hoe een verkenning uit het Norte-plan tot stand komt.' },
  tekst:`
<p>Een berekening over twintig jaar kan niet zonder aannames. Niemand weet wat aandelen en obligaties de komende decennia opbrengen, of hoe de prijzen evolueren. Een plan moet dus iets veronderstellen. De vraag is niet of er aannames zijn, maar welke, en of ze zichtbaar zijn.</p>

<h2>De uitgangspunten aan de basis</h2>
<p>Het Norte-plan is een prototype, en zijn rekenkern werkt met vaste marktveronderstellingen. Voor aandelen is dat een reëel rendement van 4,31 procent per jaar, voor obligaties 1 procent, en voor sparen een rente van 0,86 procent. Met een aangenomen inflatie van 2 procent per jaar worden de beleggingsrendementen omgerekend naar euro’s van later: 6,40 procent voor aandelen en 3,02 procent voor obligaties.</p>
<p>Het zijn parameters van dit prototype. Ze zijn geen gemeten resultaat van een fonds, geen belofte, en niet door een onafhankelijke instelling gevalideerd als verwachting voor de komende jaren. Andere instellingen werken met andere getallen.</p>

<h2>De aanpak bepaalt de mix</h2>
<p>Hoeveel van elk bouwblok in een verkenning zit, hangt af van de aanpak. Defensief rekent met 30 procent aandelen, neutraal met 50 procent en dynamisch met 80 procent; het plan kent ook sparen, zonder aandelen, en agressief, met alleen aandelen. Met de uitgangspunten hierboven komt een neutrale mix op ongeveer 4,8 procent per jaar vóór kosten, een dynamische op ongeveer 5,9 procent. Dat is een eenvoudige gewogen som; de aanpak wordt bovendien rustiger naarmate het einde van de termijn nadert, zodat het werkelijke verloop lager kan uitkomen. Probeer het zelf: zet de aanpak hieronder eens op defensief en daarna op dynamisch.</p>

{{sim:tijd}}

<h2>Dalingen zitten er bewust in</h2>
<p>Een lijn met elk jaar precies hetzelfde rendement zou te mooi zijn. Het marktpad in de rekenkern heeft daarom een gemodelleerde vorm met dalingen, waaronder voorbeeldschokken die geïnspireerd zijn op historische crisissen, zonder ze exact na te bootsen. Het is één voorbeeldpad, geen reeks toevallige scenario’s en geen kansverdeling: de grafiek zegt niet hoe waarschijnlijk een uitkomst is.</p>

<h2>Wat de lijn niet toont</h2>
<p>Eén lijn is één pad. Werkelijke rendementen liggen elk jaar anders, en een gemiddelde rond 6,6 procent kan net zo goed betekenen: tien jaar weinig en daarna veel, of omgekeerd. Voor wie in die periode moet opnemen, maakt dat een groot verschil.</p>
<p>De verkenning van tijd en groei rekent zonder kosten en belasting; de kostenverkenning uit het plan houdt lopende kosten wel elke maand op de waarde in. Belasting, ook de meerwaardebelasting, zit in geen van de kleine verkenningen. De inflatie is één vast percentage per jaar, terwijl ze in werkelijkheid schommelt. En wat de lijn nooit kan tonen, is gedrag: wie halverwege stopt of verkoopt, volgt een ander pad.</p>

<h2>Nominaal of in koopkracht</h2>
<p>De bedragen in de verkenningen zijn nominaal: euro’s van het jaar zelf. Het plan kan daarnaast tonen wat nodig is om de [[koopkracht|koopkracht]] van een bedrag te behouden, met een inflatie die u zelf instelt. Twee lezingen, twee vragen. Belangrijk is dat de inflatie niet twee keer wordt afgetrokken, en dat u weet welke van de twee u bekijkt.</p>

<h2>Hoe u de grafiek het best gebruikt</h2>
<p>De sterkte van een plangrafiek zit in het vergelijken. Wat doet een hoger maandbedrag, een langere termijn, een rustigere aanpak, een procent minder kosten? Zo ziet u welk effect één gewijzigde invoer binnen hetzelfde model heeft. Ook het verschil blijft afhankelijk van de aannames; het is geen voorspelling van uw voordeel in de werkelijkheid. Lees het eindbedrag als een mogelijke uitkomst onder deze uitgangspunten, en kijk geregeld opnieuw, met de werkelijke waarden van dat moment.</p>
`,
  bronnen:[
    { label:'Rekenmethode: js/planbron-koopkracht.js, M27 marktveronderstellingen versie 2026-11.1. Inflatie 2 %; nominaal = (1 + reëel) × 1,02 − 1; aandelen reëel 4,31 % (nominaal 6,40 %), obligaties reëel 1 % (3,02 %), spaarrente 0,86 %; aandelendeel sparen 0, defensief 30, neutraal 50, dynamisch 80, agressief 100 %; gemodelleerd marktpad met historisch geïnspireerde voorbeeldschokken, geen Monte Carlo. Prototypeparameters, niet onafhankelijk gevalideerd.', url:null },
    { label:'Rekenvoorbeeld: neutraal 0,5 × 6,40 + 0,5 × 3,02 ≈ 4,7 %; dynamisch 0,8 × 6,40 + 0,2 × 3,02 ≈ 5,7 % per jaar, vóór kosten en zonder glijpad.', url:null },
    { label:'Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?', url:'https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten' },
    { label:'J.P. Morgan Asset Management — Principles for long-term investing, Europe 2026 (inspiratie; geen bron voor de Norte-uitgangspunten)', url:'https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf' }
  ],
  vervolg:{ type:'plannen', zin:'U kent nu de keuzes en de aannames achter een plan. Zet ze voor uzelf op een rij.' }
},

{ id:'noorwegen', hoofdstuk:'samen', soort:'verhaal',
  titel:'Hoe Noorwegen zijn olie in aandelen omzette, en in 2008 bleef kopen',
  inleiding:'In mei 1996 stortte de Noorse staat bijna twee miljard kroon in een nieuw fonds voor zijn olie-inkomsten. In 2008 verloor dat fonds 23 procent, zijn slechtste jaar ooit. Datzelfde jaar kocht het meer aandelen dan ooit tevoren.',
  kernidee:'Regels die vooraf vastliggen, maken volhouden makkelijker: hoeveel in aandelen, wanneer bijkopen, en hoeveel er elk jaar uit mag.',
  beeld:{ type:'tijdlijn', punten:[['Mei 1996', 'Eerste storting: bijna 2 miljard kroon'], ['2008', '−23,3 %, en alle nieuwe geld gaat naar aandelen'], ['2017', 'De opnameregel gaat van 4 naar 3 % per jaar']], bijschrift:'Drie momenten uit de geschiedenis van het Noorse overheidspensioenfonds. Bronnen: Norges Bank Investment Management en het IMF.' },
  tekst:`
<p>Noorwegen vond eind jaren zestig olie in de Noordzee. Decennia later stond het land voor een vraag die elk gezin met een erfenis kent, alleen dan op nationale schaal: wat doe je met geld dat er vandaag is, maar ook voor de volgende generaties moet dienen?</p>
<p>Het antwoord werd een fonds. In mei 1996 deed het Noorse ministerie van Financiën een eerste storting van bijna twee miljard kroon in wat toen het petroleumfonds heette. Het fonds belegt uitsluitend in het buitenland, en sinds 1998 ook in aandelen. Het wordt beheerd door Norges Bank Investment Management, een onderdeel van de Noorse centrale bank. Vandaag heet het het Government Pension Fund Global en is het een van de grootste beleggers ter wereld.</p>

<h2>Drie regels</h2>
<p>Wat het fonds bijzonder maakt, is niet zijn grootte, maar zijn regels. Het ministerie legt vast welk deel in aandelen zit. Nieuw geld en herwegen houden die verhouding op peil. En sinds 2001 geldt een opnameregel: de overheid mag over de jaren heen ongeveer zoveel uit het fonds halen als het naar verwachting reëel opbrengt, dus na inflatie. Eerst schatte men dat op 4 procent per jaar; in 2017 werd het 3 procent.</p>

<h2>Het slechtste jaar</h2>
<p>Toen kwam 2008. Het fonds verloor 23,3 procent, gemeten in een mand van buitenlandse munten: zowat 633 miljard kroon. Het was het zwakste resultaat in zijn geschiedenis. Toch was het fonds eind dat jaar groter dan een jaar eerder, door de nieuwe instroom: een rendement is iets anders dan de evolutie van het saldo. Ook de beheerders zelf deden het dat jaar 3,4 procentpunt slechter dan de vergelijkingsmaatstaf die het ministerie had vastgelegd.</p>
<p>Wat er tegelijk gebeurde, is het eigenlijke verhaal. Door de hoge olieprijs kwam er dat jaar een recordbedrag nieuw geld binnen: 384 miljard kroon. Dat ging volledig naar aandelen, op het moment dat de beurzen instortten. Eind 2008 was 40 procent van alle aandelen in het fonds dat jaar gekocht. Het ministerie had bovendien beslist om het aandelendeel van 40 naar 60 procent te verhogen. In 2009 won het fonds 25,6 procent, toen een record.</p>

<h2>Wat een gezin hier wel en niet uit leert</h2>
<p>Een land is geen gezin. Noorwegen heeft een termijn zonder einde, een vaste stroom nieuw geld en geen studiekosten die op een vaste datum vallen. Het hoefde in 2008 niets te verkopen. Een gezin kan niet zomaar hetzelfde doen, en hoeft dat ook niet.</p>
<p>Toch vertalen drie ideeën zich goed. Leg vooraf vast hoeveel u in aandelen wilt, en [[herwegen|herweeg]] naar die afspraak, ook als het pijn doet. Laat nieuwe inleg doorlopen in slechte jaren, als uw buffer en termijn dat toelaten. En koppel wat u later opneemt aan wat uw vermogen redelijkerwijs kan dragen. Die 3 procent van Noorwegen is zelf ook een aanname: een inschatting van het verwachte rendement, die men bijstelde toen de verwachting veranderde.</p>
`,
  bronnen:[
    { label:'Norges Bank Investment Management — Persbericht resultaten 2008 (−23,3 %, instroom 384 miljard kroon in aandelen, 40 % van de aandelen in 2008 gekocht)', url:'https://www.nbim.no/en/news-and-insights/the-press/press-releases/2009/poor-results--changes-in-investment-strategy-implementation/' },
    { label:'Norges Bank Investment Management — Jaarverslag 2006 (eerste storting mei 1996, aandelen sinds 1998)', url:'https://www.nbim.no/en/news-and-insights/reports/2006/annual-report-2006/' },
    { label:'Norges Bank Investment Management — Jaarverslag 2009 (rendement 25,6 %; opnameregel toen 4 % van het fonds)', url:'https://www.nbim.no/globalassets/reports/2009/nbim_annualreport09.pdf' },
    { label:'IMF — Norway: 2025 Article IV, opnameregel rond 3 % van de fondswaarde (verwacht reëel rendement)', url:'https://meetings.imf.org/-/media/Files/Publications/CR/2025/English/1norea2025002-source-pdf.ashx' }
  ],
  vervolg:{ type:'lezen', id:'opvolgen', zin:'Herwegen, een leven dat verandert, en de dag dat u gaat opnemen: hoe volgt u een plan op?' }
},

{ id:'mila', hoofdstuk:'samen', soort:'verhaal',
  titel:'Een pot voor Mila: de keuzes van een oma en opa',
  inleiding:'Rita en Walter willen elke maand iets opzijzetten voor hun kleindochter Mila, geboren in 2026. Een bedrag kiezen is snel gebeurd. De moeilijke vragen komen daarna: op wiens naam, voor wanneer, en wat als Mila op haar achttiende iets anders wil?',
  kernidee:'Wie voor een kind spaart, beslist eerst over eigendom en termijn. Het product volgt daaruit.',
  beeld:{ type:'vergelijk', kolommen:[['Op naam van Mila', ['Het geld is van Mila', 'Haar ouders beheren het tot ze achttien is', 'Vanaf haar achttiende beslist zij']], ['Op naam van oma en opa', ['Het geld blijft van hen', 'Zij beslissen wanneer en hoe ze het geven', 'Een latere schenking heeft eigen regels']]], bijschrift:'De twee mogelijkheden die Rita en Walter afwegen. Ook een combinatie kan.' },
  tekst:`
<p class="fictie">Rita, Walter en Mila zijn verzonnen. De regels over rekeningen op naam van een kind komen van Wikifin.</p>
<p>Rita en Walter wonen al veertig jaar in Lokeren. Toen hun dochter Katrien in het voorjaar van 2026 beviel van Mila, wisten ze meteen wat ze wilden doen: elke maand € 50 opzij, voor later. Rita had zelf als kind een spaarboekje gekregen van haar meter. Ze herinnert zich vooral het gevoel dat iemand aan haar had gedacht.</p>
<p>Bij de bank kregen ze een eerste vraag die ze niet verwacht hadden. Op wiens naam?</p>

<h2>Van wie is het?</h2>
<p>Een rekening op naam van Mila is van Mila, legde de adviseur uit. Haar ouders beheren het geld tot ze achttien is, maar ze kunnen er niet zomaar mee doen wat ze willen: voor het verkopen of weggeven van wat van een kind is, is in principe de toestemming van de vrederechter nodig. Op haar achttiende beslist Mila zelf.</p>
<p>Walter zag het meteen voor zich: Mila op achttien, met een sleutel van een tweedehands auto in plaats van een inschrijving aan de hogeschool. Rita haalde haar schouders op. ‘Dan is dat haar keuze.’ Walter was daar minder zeker van.</p>

<h2>Achttien jaar</h2>
<p>Hun tweede vraag ging over de termijn. Ze hebben achttien jaar tot haar volwassenheid. Dat geeft meer ruimte om beleggen te overwegen dan bij een doel over drie jaar, al is herstel nooit verzekerd. Met € 50 per maand leggen ze in die periode samen € 10.800 in. Maar de einddatum ligt vast. Dus spraken ze af dat ze, als ze beleggen, de pot vanaf Mila’s veertiende geleidelijk rustiger maken.</p>
<p>Wat kan zo’n maandbedrag betekenen? Pas hieronder de inleg of de termijn aan. De lijn is een rekenvoorbeeld, geen plan voor Mila. Kosten, belasting en de regels voor een schenking zitten er niet in.</p>

{{sim:tijd:mila}}

<h2>Wat ze afspreken</h2>
<p>Uiteindelijk kozen Rita en Walter voor twee potten. Op een spaarrekening op naam van Mila komt het verjaardags- en nieuwjaarsgeld, voor haar om later vrij te gebruiken. De maandelijkse € 50 gaat naar een belegging op hun eigen naam, met een brief erbij voor Mila en haar ouders over waarvoor het bedoeld is. Wanneer en hoe ze het geven, beslissen ze later, en dan kijken ze ook naar de regels voor schenkingen, die per gewest verschillen.</p>
<p>Ze bespraken het ook met Katrien en haar man. Niet omdat het moest, maar zodat niemand achttien jaar later verrast wordt, en zodat een eventueel broertje of zusje op dezelfde manier behandeld wordt.</p>

<h2>Wat dit verhaal niet beslist</h2>
<p>Een andere familie kiest anders, en dat kan net zo goed kloppen. Wie alles op naam van het kind zet, geeft het kind zekerheid en laat de bestemming los. Wie op eigen naam spaart, houdt de bestemming in handen, maar het geld blijft dan juridisch van de grootouders, ook als zij het zelf onverwacht nodig hebben, bijvoorbeeld voor zorg. Dat is een afweging tussen controle en zekerheid, en geen product lost die voor u op.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — Een spaarrekening openen voor je kind', url:'https://www.wikifin.be/nl/familie/financiele-opvoeding/een-spaarrekening-openen-voor-je-kind' },
    { label:'Wikifin (FSMA) — Een spaarrekening voor het nieuwjaarsgeld van mijn kind', url:'https://www.wikifin.be/nl/faq/1-een-spaarrekening-voor-het-nieuwjaarsgeld-van-mijn-kind' },
    { label:'De verkenning gebruikt de bestaande rekenkern van het Norte-plan. Het voorbeeld rekent met maandelijkse inleg, een afbouwende verdeling en gemodelleerde dalingen; zonder kosten, belasting of schenkingsregels. Het is geen persoonlijk plan voor Mila.', url:null }
  ],
  vervolg:{ type:'plannen', zin:'Met uw eigen bedrag en termijn, voor uw kind of kleinkind.' }
},

{ id:'van-plan-naar-oplossing', hoofdstuk:'samen', soort:'verhaal',
  titel:'Van plan naar oplossing: wat doet een makelaar, wat kost het, hoe verloopt een eerste gesprek?',
  inleiding:'Een plan zegt wat u wilt bereiken en hoeveel u daarvoor opzijzet. Het zegt nog niet waarin u belegt, bij wie, en tegen welke kosten. Die stap zet u met een makelaar. Wat mag u van dat gesprek verwachten?',
  kernidee:'Een makelaar vertaalt uw plan naar concrete oplossingen, en moet u vooraf zeggen hoe hij vergoed wordt.',
  tekst:`
<h2>Wat een makelaar doet</h2>
<p>Een makelaar in verzekeringen en beleggingen werkt niet voor één bank of verzekeraar. Hij vergelijkt oplossingen van verschillende aanbieders en zoekt wat past bij uw doelen, uw termijn en hoeveel schommeling u aankan. Dat laatste toetst hij met vragen over uw kennis en ervaring. Dat is wettelijk verplicht, ook als u uw plan al zelf hebt gemaakt.</p>
<h2>Wat het kost</h2>
<p>Een makelaar wordt op twee manieren vergoed: met een commissie die in de kosten van het product zit, of met een vergoeding die u zelf betaalt. Soms is het een combinatie. Hij moet u vooraf zeggen welke vorm hij gebruikt. Vraag het gerust in het eerste gesprek, samen met de kosten van de oplossing zelf: instap, beheer en uitstap.</p>
<p>Of een eerste kennismaking iets kost, verschilt per kantoor. Bij de meeste kantoren is ze vrijblijvend. Uw kantoor zegt het u bij de afspraak.</p>
<h2>Hoe een eerste gesprek verloopt</h2>
<p>U overloopt samen uw doelen en uw plan, als u dat wilt delen. De makelaar stelt vragen over uw situatie, uw kennis en uw ervaring. Daarna bekijkt hij welke oplossingen passen, wat ze kosten en welke risico’s erbij horen. U beslist niets in dat gesprek: u krijgt een voorstel en tijd om het te lezen.</p>
<h2>Wat u kunt meebrengen</h2>
<p>Uw plan of uw simulatie, een idee van wat u al opzij hebt staan, en uw vragen. Meer is niet nodig.</p>
`,
  bronnen:[
    { label:'Wikifin (FSMA) — informatie over financiële tussenpersonen en hun vergoeding', url:null },
    { label:'Algemene uitleg, geen persoonlijk advies. De praktische afspraken verschillen per kantoor.', url:null }
  ],
  vervolg:{ type:'plannen', zin:'Neem uw plan mee naar het gesprek, of maak het eerst.' }
},

{
  id:'hoeveel-is-genoeg', hoofdstuk:'begin', soort:'verhaal',
  titel:'Hoeveel is genoeg? Wat u later krijgt, en hoe u wilt leven',
  inleiding:'Hoeveel u later nodig hebt, begint niet bij een product. Het begint bij twee bedragen: wat het wettelijk pensioen u ongeveer geeft, en hoeveel u nodig hebt om te leven zoals u wilt. Het verschil tussen die twee is uw pensioenkloof.',
  kernidee:'Uw pensioenkloof is het verschil tussen hoe u wilt leven en wat het wettelijk pensioen geeft. Hoe vroeger u begint, hoe kleiner het maandbedrag om ze te dichten.',
  tekst:`
<h2>Wat het wettelijk pensioen gemiddeld geeft</h2>
<p>Het bedrag hangt sterk af van uw statuut. Gemiddeld ontvangt een gepensioneerde in België per maand, netto:</p>
<ul>
<li><strong>Werknemer</strong>: ongeveer € 1.565</li>
<li><strong>Zelfstandige</strong>: ongeveer € 1.231</li>
<li><strong>Ambtenaar</strong>: ongeveer € 2.521</li>
</ul>
<p>Dat zijn gemiddelden over alle gepensioneerden in één stelsel. Uw eigen bedrag hangt af van uw loopbaan, uw loon en de jaren waarin u werkte. Een groepsverzekering of een VAPZ komt daar bovenop, als u er een hebt.</p>
<h2>Hoe gepensioneerden leven</h2>
<p>Een 65-plusser in Vlaanderen leeft gemiddeld van ongeveer € 2.580 netto per maand, gerekend per volwassene en gecorrigeerd voor de grootte van het gezin. Voor 35- tot 64-jarigen is dat € 3.240. Na het pensioen leeft men dus gemiddeld met ongeveer een vijfde minder.</p>
<p>Voor uzelf is een eenvoudige vraag vaak de beste start: wat geeft u vandaag uit, en wat valt later weg? Een afbetaalde woning, kinderen die het huis uit zijn en geen woon-werkverkeer maken het bedrag kleiner. Reizen, de kleinkinderen en zorg kunnen het weer groter maken.</p>
<h2>Uw pensioenkloof</h2>
<p>Trek het wettelijk pensioen af van het bedrag waarmee u wilt leven. Huurt u later, dan komt de huur er nog bij. Wat overblijft, moet uit uw eigen vermogen komen, maand na maand, vanaf uw pensioen.</p>
{{sim:kloof}}
{{sim:kloofwegen}}
`,
  bronnen:[
    { label:'PensionStat.be — kerncijfers wettelijk pensioen, gemiddeld pensioen per stelsel (2026)', url:'https://www.pensionstat.be/nl/kerncijfers/wettelijk-pensioen/gepensioneerden' },
    { label:'Statistiek Vlaanderen — huishoudinkomen naar leeftijd (2025)', url:'https://www.vlaanderen.be/statistiek-vlaanderen/inkomen-en-armoede/huishoudinkomen' },
    { label:'Statistiek Vlaanderen — gemiddelde huurprijs op de private markt (2023)', url:'https://www.vlaanderen.be/statistiek-vlaanderen/bouwen-en-wonen/gemiddelde-huurprijs-private-woningmarkt' },
    { label:'Sober en ruimer zijn een rekenvoorbeeld: 20 % minder en 20 % meer dan de gemiddelde levensstandaard van 65-plussers.', url:null },
    { label:'De rekenvoorbeelden gebruiken dezelfde rekenkern als de Norte-simulatie. Bedragen vóór kosten en belastingen, geen persoonlijk advies.', url:null }
  ],
  vervolg:{ type:'plannen', doel:'inkomen', titel:'Werk uw pensioenkloof uit', zin:'Met uw eigen leeftijd en bedrag, in een paar minuten.' }
},

/* Aanvullende praktijkverhalen bij de acht ontbrekende lesonderwerpen. Fictieve personen, bestaande financiële uitleg. */
{
  "id": "verbouwing",
  "hoofdstuk": "begin",
  "soort": "verhaal",
  "titel": "Een aannemer wacht niet op de beurs",
  "inleiding": "Wouter en Ilse uit Mechelen hebben € 40.000 gespaard. Over achttien maanden komt de aannemer voor de badkamer en de keuken. Een collega vindt het zonde om dat geld ‘dood’ op een spaarrekening te laten staan. Heeft hij gelijk?",
  "kernidee": "Geld met een vaste datum en een vast bedrag vraagt een andere plek dan geld voor later. Niet omdat beleggen slecht is, maar omdat de factuur niet kan wachten.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Wouter, Ilse en hun bedragen zijn verzonnen; de redenering erachter is algemeen.</p>\n<p>De offerte ligt op de keukentafel: € 25.000, waarvan een voorschot bij de start en de rest bij oplevering. Startdatum: over anderhalf jaar. Op hun spaarrekening staat € 40.000. Wouter rekent hardop. ‘Als we die € 25.000 nu beleggen, verdienen we misschien een paar duizend euro tegen dan.’</p>\n<p>Misschien. Dat woord blijft hangen. Ilse stelt de vraag die het gesprek kantelt: wat gebeurt er als het tegenvalt?</p>\n\n<h2>Wat ‘tegenvallen’ hier betekent</h2>\n<p>Stel dat het geld in een aandelenfonds zit en dat fonds staat in de maand van de factuur 15 procent lager. Dan is € 25.000 nog € 21.250 waard. De aannemer vraagt nog altijd € 25.000. Wouter en Ilse moeten dan € 3.750 bijleggen uit ander geld, lenen, of de werken uitstellen. Bij verkoop is dat het bedrag dat voor de factuur beschikbaar komt. De lagere waarde is ook vóór die verkoop al een tekort tegenover hun doel.</p>\n<p>Of zo’n daling komt, weet niemand. Ze kan ook uitblijven, en dan hadden ze meer gehad. Maar bij achttien maanden is er weinig tijd om een slecht moment uit te zitten, en de datum ligt vast. Dat is het verschil met geld dat twintig jaar kan blijven staan: niet het product, maar de [[horizon|termijn]] en de vraag hoe erg een tekort op dat moment is.</p>\n\n<h2>Drie potten in plaats van één bedrag</h2>\n<p>Ze leggen het anders op tafel. Niet € 40.000, maar drie bedragen met elk een eigen vraag.</p>\n<p>Eerst de [[buffer|buffer]]: het geld voor een kapotte wagen of een maand zonder loon. Ze kijken welke onverwachte uitgaven en periodes met minder inkomen ze moeten kunnen opvangen. Daar hangt de grootte van hun buffer van af. Dan de verbouwing: € 25.000 met een vaste datum, die beschikbaar moet zijn op de dag dat de factuur komt. En wat overblijft: geld zonder vaste bestemming, dat jaren kan blijven staan.</p>\n<p>Voor de eerste twee potten telt vooral dat het bedrag er is wanneer het nodig is. Ze willen beide potten kunnen aanspreken zonder afhankelijk te zijn van de beurskoers. Bij geld met een vaste looptijd controleren ze bovendien de terugbetaling, bescherming en kosten: een einddatum alleen garandeert nog geen waardevast bedrag. Alleen voor de derde pot is de vraag ‘sparen of beleggen?’ echt open.</p>\n\n<h2>Wat de collega wel bedoelde</h2>\n<p>De collega had een punt: geld dat jarenlang op een spaarrekening blijft liggen, verliest koopkracht als de inflatie hoger is dan de rente. Ook de verbouwingspot voelt prijsstijgingen. Alleen weegt voor die pot iets anders zwaarder: de factuur moet op een vaste datum betaald kunnen worden. Meer mogelijke opbrengst gaat samen met het risico dat er dan juist te weinig geld is.</p>\n<p>Wouter en Ilse beslissen niet voor eeuwig. Na de verbouwing herbekijken ze wat overblijft, en dan wordt de vraag naar beleggen opnieuw relevant, met een andere termijn.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten"
    },
    {
      "label": "Rekenvoorbeeld: € 25.000 × (1 − 15 %) = € 21.250. Fictief, geen verwachting.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "sparen-of-beleggen",
    "zin": "Buffer, doel en termijn: de les zet de volgorde op een rij."
  }
},

{
  "id": "autopanne",
  "hoofdstuk": "begin",
  "soort": "verhaal",
  "titel": "Elf maanden en een distributieriem",
  "inleiding": "Nadia zette in maart € 6.000 op haar spaarrekening. In februari, één maand voor de twaalf maanden om waren, gaf de distributieriem van haar auto het op. Ze haalde € 1.800 af. Wat kostte dat haar aan rente, en was het een fout?",
  "kernidee": "De getrouwheidspremie telt per storting. Wie vroeg afhaalt, mist de premie op dat ene deel, niet op de rest en niet op wat al verworven was. Een buffer gebruiken waarvoor hij dient, is geen fout.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Nadia en de rentetarieven in dit verhaal zijn verzonnen. Echte tarieven verschillen per bank en veranderen geregeld.</p>\n<p>Nadia werkt in een woonzorgcentrum in Genk en rijdt elke dag twintig kilometer. Op 10 maart zette ze haar eindejaarspremie en wat spaargeld, samen € 6.000, op een gereglementeerde spaarrekening. Op 2 februari van het jaar daarop stond ze met haar auto aan de kant van de weg. De garage rekende € 1.800.</p>\n<p>Ze aarzelde. Ze wist vaag dat je ‘premie verliest’ als je te vroeg afhaalt. Moest ze de herstelling op afbetaling nemen?</p>\n\n<h2>Wat er precies verloren gaat</h2>\n<p>Op haar rekening krijgt ze twee soorten rente. De [[rente|basisrente]] loopt elke dag, op het tarief van die dag. De [[getrouwheidspremie|getrouwheidspremie]] krijgt ze pas op een bedrag dat twaalf maanden ononderbroken op de rekening blijft. Het tarief van die premie ligt vast vanaf het moment dat de storting begint te tellen.</p>\n<p>Stel, met fictieve tarieven, een basisrente van 0,40 procent en een premie van 0,60 procent per jaar. Op de € 1.800 die ze afhaalt, heeft ze ongeveer elf maanden basisrente verdiend: zowat € 6,60. Die houdt ze. Wat ze mist, is de premie op die € 1.800: zowat € 10,80 voor een volledig jaar.</p>\n<p>Op de € 4.200 die blijft staan, verandert niets. Die bereikt op 10 maart gewoon de twaalf maanden. Een premie die al verworven is, blijft van haar. Een afhaling neemt die niet terug; het gaat om de nog lopende verwervingsperiode op het opgenomen bedrag.</p>\n\n<h2>De rekensom die ertoe doet</h2>\n<p>Tegenover die € 10,80 staan andere getallen. Een afbetaling kan rente en andere kosten meebrengen. Die zou ze naast de gemiste premie moeten leggen. De auto heeft ze nodig om op het werk te raken; een herstelling een maand uitstellen is geen bruikbare oplossing. Haar spaargeld is beschikbaar wanneer ze het nodig heeft.</p>\n<p>Dat is ook de reden waarom een [[buffer|buffer]] op een spaarrekening staat en niet in een belegging. Had de € 1.800 in een fonds gezeten dat net lager stond, dan had ze dat verlies moeten nemen. Hier geeft ze alleen de nog te verdienen premie op het opgenomen deel op.</p>\n\n<h2>Wat ze wel meeneemt</h2>\n<p>Nadia kijkt voortaan vóór een grote overschrijving naar de verwervingsdatums in haar bankapp. Bij verschillende stortingen op één rekening kiest ze niet zelf welke storting ze afhaalt: de bank rekent een opname eerst toe aan de bedragen waarvan de verwervingsperiode het minst ver gevorderd is. Bij bepaalde overschrijvingen tussen gereglementeerde rekeningen bij dezelfde bank kan een lopende periode onder voorwaarden doorlopen. Bij een andere bank begint die klok opnieuw. Al verworven premie blijft in beide gevallen van haar.</p>\n<p>Maar de grootste les is eenvoudiger: rente optimaliseren is nuttig, zolang ze de functie van het geld niet in de weg staat.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Wat brengt een spaarrekening op?",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/wat-brengt-een-spaarrekening-op"
    },
    {
      "label": "Wikifin (FSMA) — Vergelijkingstool spaarrekeningen",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen"
    },
    {
      "label": "Rekenvoorbeeld met fictieve tarieven: € 1.800 × 0,40 % × 11/12 ≈ € 6,60 basisrente; € 1.800 × 0,60 % ≈ € 10,80 gemiste premie.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "spaarrekening",
    "zin": "Basisrente, getrouwheidspremie en waarvoor de rekening dient: de les legt het uit."
  }
},

{
  "id": "twee-verpakkingen",
  "hoofdstuk": "bouwstenen",
  "soort": "verhaal",
  "titel": "Twee brochures, bijna dezelfde inhoud",
  "inleiding": "Lien uit Hasselt heeft twee brochures voor zich. De ene beschrijft een gemengd fonds bij haar bank, de andere een tak 23-verzekering met een vergelijkbare beleggingsmix. De grafieken lijken op elkaar. Waarom zou de keuze dan nog uitmaken?",
  "kernidee": "Twee beleggingen met een gelijkaardige inhoud kunnen een andere verpakking hebben. Die verpakking bepaalt kosten, beschikbaarheid en wat er bij overlijden gebeurt.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Lien en de twee producten zijn verzonnen. Echte voorwaarden staan in het essentiële-informatiedocument en de contractvoorwaarden van elk product.</p>\n<p>Lien is 41, ze heeft € 20.000 die ze minstens tien jaar kan missen, en ze wil het niet allemaal op een spaarrekening laten. Haar bank stelt een [[fonds|beleggingsfonds]] voor met ongeveer de helft aandelen en de helft obligaties. Een verzekeraar stelt een [[tak23|tak 23]]-contract voor dat in een fonds met een vergelijkbare mix belegt. Op papier lijken de grote lijnen gelijk. De onderliggende posities, het beheer en de kosten kunnen toch verschillen.</p>\n<p>‘Dan neem ik toch gewoon de goedkoopste?’ vraagt ze. Dat is een goede vraag, maar het is niet de enige.</p>\n\n<h2>Wat gelijk is</h2>\n<p>Een belangrijk deel van het beleggingsrisico komt van wat erin zit. Een daling van aandelen kan beide oplossingen raken; hoeveel de totale waarde verandert, hangt ook af van de obligaties, de precieze posities en het beheer. Geen van beide heeft een standaardwaarborg op het kapitaal, en de bescherming van het Garantiefonds voor tak 21 geldt voor geen van beide. Wie denkt dat ‘verzekering’ veiliger klinkt, vergist zich hier: de beleggingswaarde is in dit fictieve contract niet gewaarborgd. Een eventuele overlijdensdekking is een aparte afspraak, geen bescherming tegen elke beursdaling.</p>\n\n<h2>Wat verschilt</h2>\n<p>Het fonds koopt ze rechtstreeks. Ze betaalt eventueel instapkosten en elk jaar de lopende kosten van het fonds. Ze kan het in principe verkopen wanneer ze wil, tegen de waarde van dat moment.</p>\n<p>Het tak 23-contract is een levensverzekering. Naast de kosten van het fonds kunnen er contractkosten zijn, en op de premies betalen particulieren normaal 2 procent premietaks; voor fiscale contracten zoals pensioensparen gelden andere regels. Uitstappen heet hier afkopen, en de voorwaarden kunnen een afkoopvergoeding voorzien, zeker in de eerste jaren. Wat ze bij de aankoop betaalt, moet de belegging dus eerst terugverdienen.</p>\n<p>Daar staat iets tegenover. In het contract duidt Lien een begunstigde aan voor een uitkering bij haar overlijden, volgens de afspraken van het contract. Dat kan voor haar gezin een praktisch verschil maken. Of het ook fiscaal iets verandert, hangt af van haar situatie; dat beloven de brochures niet, en ze laat het bevestigen voor ze beslist.</p>\n\n<h2>De vraag die ze uiteindelijk stelt</h2>\n<p>Lien zet de twee naast elkaar, niet op hun grafiek, maar op drie vragen. Wat kost elk product in totaal, in euro, over tien jaar? Hoe snel en tegen welke voorwaarden kan ik eraan? En wat gebeurt er met dit geld als mij iets overkomt?</p>\n<p>Het antwoord hangt af van wat ze belangrijk vindt. Ze wil weten welk voorstel de diensten bevat die zij nodig heeft en wat ze daarvoor betaalt. Een rechtstreekse belegging is niet automatisch goedkoper, en een verzekering is niet automatisch de betere regeling voor haar gezin. Dat blijkt uit de concrete tarieven en afspraken, niet uit de naam van de verpakking. Wat niet meer kan, is de twee als ‘hetzelfde’ behandelen omdat de inhoud gelijkaardig is.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Wat is een beleggingsfonds?",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/beleggingsfonds/wat-een-beleggingsfonds"
    },
    {
      "label": "FSMA — Tak 23-levensverzekering: interne fondsen, contract en kosten",
      "url": "https://www.fsma.be/nl/tak-23-levensverzekering"
    },
    {
      "label": "Wikifin (FSMA) — Pensioenspaarfonds en verzekeringen: onder meer vrijstelling van premietaks bij fiscaal pensioensparen",
      "url": "https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/welke-verschillen-zijn-er-tussen-een"
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "verpakking",
    "zin": "Belegging, fonds en verpakking: welke laag bepaalt wat?"
  }
},

{
  "id": "extra-storting",
  "hoofdstuk": "bouwstenen",
  "soort": "verhaal",
  "titel": "Vijftig euro extra, veertig euro minder belastingvoordeel",
  "inleiding": "Dirk wil in december € 50 extra pensioensparen. Daarvoor moet hij uitdrukkelijk voor het hogere plafond kiezen. Vóór hij bevestigt, rekent hij na: wat doet dat met zijn belastingvermindering?",
  "kernidee": "Bij pensioensparen bepaalt het plafond het percentage. Tussen € 1.050 en € 1.260 levert een storting minder voordeel op dan precies € 1.050. Daarboven kan meer storten een bewuste keuze zijn.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Dirk en zijn stortingen zijn verzonnen. De bedragen zijn die van Wikifin voor het inkomstenjaar 2026. Bedragen en regels kunnen wijzigen; dit voorbeeld gaat over dat jaar.</p>\n<p>Dirk is 52, werkt bij een logistiek bedrijf in Aalst en doet al twintig jaar aan [[pensioensparen|pensioensparen]]. In januari 2026 stortte hij € 1.050. In december ziet hij in zijn bankapp nog wat ruimte en wil hij € 50 toevoegen. Daarvoor moet hij uitdrukkelijk het hogere plafond kiezen. Hij wil eerst weten wat er dan verandert; meer sparen voor later klinkt goed, maar is de vermindering ook groter? Hij legt de vraag voor aan zijn buurman, met wie hij wel vaker zijn belastingbrief bekijkt.</p>\n\n<h2>Twee plafonds, twee percentages</h2>\n<p>Voor 2026 zijn er twee formules. Tot € 1.050 krijgt hij 30 procent belastingvermindering: € 315. Kiest hij uitdrukkelijk voor het verhoogde plafond, dan mag hij tot € 1.350 storten, maar dan geldt 25 procent op het hele bedrag.</p>\n<p>Als hij die keuze bevestigt, geeft zijn totale storting van € 1.100 recht op 25 procent belastingvermindering: € 275. Dat is € 40 minder dan bij € 1.050. Hij zou meer storten en minder belastingvermindering krijgen. Pas bij € 1.260 komt hij weer op € 315 uit, en bij € 1.350 op € 337,50, het maximum.</p>\n<p>Er is dus een zone waarin bijstorten het voordeel verkleint. Daarboven niet: wie bewust € 1.350 stort, krijgt € 22,50 meer vermindering dan bij € 1.050, en bouwt meer kapitaal op. Dat kan een goede keuze zijn. Dirk ontdekt waarom het loont om vóór het bevestigen van het hogere plafond de volledige storting na te rekenen.</p>\n\n<h2>Wat die vermindering wel en niet is</h2>\n<p>Zijn buurman wijst op nog iets. Een belastingvermindering is geen jaarlijks rendement van 30 procent op een belegging. Ze verlaagt de personenbelasting die hij verschuldigd is; wie weinig of geen belasting betaalt, heeft er minder of niets aan. En de rekening is niet afgesloten op het moment van storten. Op zijn zestigste volgt meestal een heffing van 8 procent. Bij zijn pensioenspaarfonds wordt die berekend op een fictieve opbouw aan 4,75 procent per jaar, niet simpelweg op zijn echte fondswaarde. Wie vóór die leeftijd opneemt, betaalt doorgaans 33 procent. En de lopende kosten van zijn fonds lopen elk jaar mee.</p>\n<p>Het voordeel is reëel, maar het is één deel van de rekensom, naast kosten, beschikbaarheid en de belasting later.</p>\n\n<h2>Wat Dirk meeneemt</h2>\n<p>Dirk bevestigt de extra storting voorlopig niet. Voor 2026 houdt hij het bij zijn bestaande bedrag; voor een volgend jaar bekijkt hij opnieuw wat hij kan missen, welke bedragen dan gelden en hoe lang het geld vast mag zitten. Minder dan het plafond storten kan ook passen. De hoogste belastingvermindering is niet vanzelf het beste bedrag voor elk gezin.\n</p><p>Het gesprek met zijn buurman heeft hem geen beleggingsadvies gegeven. Wel een vraag die hij voortaan vooraf stelt: wat verandert er met het voordeel op de hele storting? Bij twijfel over zijn eigen belasting vraagt hij het na.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Verschillen tussen pensioenspaarfonds en pensioenspaarverzekering (eindbelasting, vervroegde opvraging)",
      "url": "https://www.wikifin.be/nl/pensioen-en-pensioenvoorbereiding/pensioensparen/welke-verschillen-zijn-er-tussen-een"
    },
    {
      "label": "Rekenvoorbeeld: € 1.050 × 30 % = € 315; € 1.100 × 25 % = € 275; € 1.260 × 25 % = € 315; € 1.350 × 25 % = € 337,50.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "pensioensparen",
    "zin": "Fonds of verzekering, de rekening op zestig en wat het voordeel waard is."
  }
},

{
  "id": "twee-zussen",
  "hoofdstuk": "opbrengst",
  "soort": "verhaal",
  "titel": "Ellen begon op 25, Griet op 35",
  "inleiding": "Twee zussen uit Kortrijk leggen elk € 200 per maand opzij tot hun 65ste. Ellen begon tien jaar vroeger dan Griet. Op een familiefeest vraagt Griet zich af hoeveel verschil die tien jaar maken, en wat zij zelf nog kan kiezen.",
  "kernidee": "Vroeger beginnen betekent meer stortingen én meer tijd voor die stortingen. Het effect van tijd is reëel maar onzeker, en wie later begint, heeft nog altijd tijd.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Ellen en Griet zijn verzonnen. De inleg kan worden uitgerekend. De toekomstige opbrengst ligt niet vast.</p>\n<p>Ellen begon met haar eerste vaste job, op haar 25ste. € 200 per maand, automatisch, in een gespreid fonds. Voor Griet was er na haar studie en huur eerst weinig ruimte. Op haar 35ste begint ze, met hetzelfde bedrag. Allebei willen ze tot hun 65ste doorgaan.</p>\n\n<h2>Wat ze elk inleggen</h2>\n<p>Ellen stort veertig jaar lang: 480 keer € 200, samen € 96.000. Griet stort dertig jaar: 360 keer € 200, samen € 72.000. Het eerste verschil is dus eenvoudig. Ellen legt € 24.000 meer in.</p>\n<p>Daarom is dit geen zuivere vergelijking van ‘wie het slimste moment koos’. Ellen heeft niet alleen langer gewacht op groei, ze heeft ook meer geld gestort. Wie de twee eindbedragen naast elkaar zet, ziet beide effecten door elkaar.</p>\n\n<h2>Wat tijd doet met die € 24.000</h2>\n<p>Het tweede verschil is subtieler. De stortingen die Ellen tussen 25 en 35 deed, krijgen dertig tot veertig jaar de tijd. Als het fonds over die periode iets opbrengt, gaat ook die opbrengst weer meewerken. Dat is [[samengestelde-groei|samengestelde groei]]: opbrengst die zelf weer kan opbrengen. Bij aanhoudende positieve groei wordt dat effect groter. Bij negatieve jaren daalt de waarde; er is geen vaste groeilijn.</p>\n<p>Daardoor wordt het verschil in eindwaarde bij een positief rendement doorgaans groter dan die € 24.000. Hoeveel groter, hangt af van wat de markten de komende decennia doen, en dat weet niemand. Het kan ook tegenvallen. Tijd geeft meer kans om slechte jaren uit te zitten; ze garandeert geen goede uitkomst.</p>\n\n<h2>Wat Griet niet moet geloven</h2>\n<p>Aan tafel zegt een oom dat Griet ‘te laat’ is. Dat klopt niet. Dertig jaar is nog altijd een lange [[horizon|termijn]]. Haar eerste storting heeft drie decennia om mee te werken. En de tien jaar waarin ze niet belegde, waren niet verloren: ze betaalde haar studie af en bouwde een buffer op, wat haar nu net helpt om vol te houden.</p>\n<p>Wat ze wel kan doen, is kijken welke knoppen ze nog heeft. Een iets hoger maandbedrag als haar loon stijgt. Een paar jaar langer doorgaan, als dat bij haar plannen past. Of haar huidige bedrag aanhouden, zolang het past bij haar doel, financiële ruimte en risico. Een slecht beursjaar en een verandering in haar eigen leven zijn verschillende redenen om opnieuw te kijken. Moet ze het geld eerder gebruiken of kan ze de inleg niet meer missen, dan kan aanpassen verstandig zijn.</p>\n<p>Ellen kijkt opnieuw naar haar eigen datum. Langer bezig zijn ontslaat haar niet van de vraag wanneer ze het geld wil gebruiken. De zussen hoeven elkaar niet in te halen; ze willen elk een bedrag en een aanpak waar ze mee verder kunnen.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten"
    },
    {
      "label": "J.P. Morgan Asset Management — Principles for long-term investing (inspiratie voor het principe; commerciële communicatie, geen bron voor cijfers)",
      "url": "https://cdn.jpmorganfunds.com/content/dam/jpm-am-aem/emea/regional/en/insights/market-insights/mi-long-term-investing-principles-ce-en.pdf"
    },
    {
      "label": "Rekenvoorbeeld inleg: 40 × 12 × € 200 = € 96.000; 30 × 12 × € 200 = € 72.000.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "plannen",
    "zin": "Met uw eigen bedrag en termijn, in een paar minuten."
  }
},

{
  "id": "winkelkar",
  "hoofdstuk": "opbrengst",
  "soort": "verhaal",
  "titel": "Hetzelfde bedrag, een andere winkelkar",
  "inleiding": "Hilde en Marc uit Sint-Niklaas zetten € 10.000 opzij voor een nieuw dak, ‘ooit, als het moet’. Op hun rekening blijft het bedrag mooi staan. Maar wat kan dat bedrag later nog betalen?",
  "kernidee": "Rente, het saldo op de rekening en koopkracht zijn drie verschillende dingen. Een gelijk of stijgend bedrag kan toch minder kunnen kopen.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Hilde, Marc en hun bedragen zijn verzonnen. De inflatie in dit verhaal is een aanname, geen voorspelling.</p>\n<p>Elke zaterdag doet Marc de boodschappen. Hij houdt de kasticketjes niet bij, maar hij merkt het toch: voor hetzelfde volle winkelwagentje betaalt hij vandaag duidelijk meer dan een paar jaar geleden. Hilde merkt het bij de offertes van een dakwerker. Dezelfde dakwerken, een hoger bedrag.</p>\n<p>Hun € 10.000 voor het dak staat ondertussen op de spaarrekening. Het saldo is niet gedaald. Integendeel, er komt elk jaar een beetje rente bij. Waarom voelt het dan alsof het minder wordt?</p>\n\n<h2>Drie getallen die door elkaar lopen</h2>\n<p>Er spelen drie dingen. De [[rente|rente]] is wat de bank betaalt. Het saldo is wat er op de rekening staat. En de [[koopkracht|koopkracht]] is wat dat saldo kan kopen.</p>\n<p>Een eenvoudig voorbeeld, zonder rente. Stijgen de prijzen gemiddeld 2 procent per jaar, dan koopt € 10.000 binnen twintig jaar nog ongeveer wat vandaag € 6.730 koopt. Het saldo blijft € 10.000, Een uitgave die vandaag € 10.000 kost, zou bij precies die prijsstijging dan zowat € 14.860 kosten. Een dak heeft in werkelijkheid zijn eigen prijsontwikkeling; de algemene inflatie is geen offerte voor dakwerken.</p>\n<p>Met rente verandert het beeld, maar niet altijd genoeg. Krijgen ze in een rekenvoorbeeld elk jaar precies 1 procent rente, zonder belasting en kosten, dan staat er na twintig jaar zowat € 12.200. Dat is meer geld. Maar omgerekend naar prijzen van vandaag is het nog maar zowat € 8.200 waard. Het saldo steeg, de koopkracht daalde. Als de opbrengst na eventuele belasting en kosten de [[inflatie|inflatie]] precies bijhoudt, blijft de koopkracht gelijk.</p>\n\n<h2>Wat ze ermee doen</h2>\n<p>Hun eerste reflex is om alles te beleggen. Dat is te snel. Een deel van hun spaargeld is hun buffer, en die moet er morgen kunnen zijn, ongeacht de beurs. Daar is de spaarrekening de juiste plek, ook al kost ze wat koopkracht. Dat is de prijs van zekerheid en beschikbaarheid, en die prijs is vaak het waard.</p>\n<p>Voor het dak willen ze eerst beter weten wanneer het werk nodig zal zijn. Ze vragen de dakwerker wat nog kan wachten en wat niet. ‘Waarschijnlijk niet binnen vijf jaar’ is nog geen afspraak waarop ze blind een belegging kunnen kiezen. Ook een obligatie kan minder opbrengen bij vroege verkoop. Pas met een bruikbare termijn en een zicht op hoeveel tekort ze kunnen opvangen, kunnen ze de mogelijkheden vergelijken.</p>\n\n<h2>Wat de winkelkar hen leerde</h2>\n<p>Het belangrijkste dat verandert, is hoe ze over hun doel denken. Niet langer ‘€ 10.000 voor het dak’, maar ‘een dak, wat het dan ook kost’. Een doel in euro van vandaag vraagt om een uitkomst die ook in euro van vandaag bekeken wordt.</p>",
  "bronnen": [
    {
      "label": "ECB — What is inflation?",
      "url": "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html"
    },
    {
      "label": "Wikifin (FSMA) — Wat is een obligatie? Onder meer verkopen vóór de vervaldag",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/obligatie/wat-een-obligatie"
    },
    {
      "label": "Rekenvoorbeeld: € 10.000 / 1,02^20 ≈ € 6.730; € 10.000 × 1,02^20 ≈ € 14.860; € 10.000 × 1,01^20 ≈ € 12.200, gedeeld door 1,02^20 ≈ € 8.200. Fictieve rente en inflatie, zonder belasting.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "koopkracht",
    "zin": "Van bruto naar netto naar koopkracht: de les rekent het stap voor stap."
  }
},

{
  "id": "twee-collegas",
  "hoofdstuk": "samen",
  "soort": "verhaal",
  "titel": "Dezelfde bonus, dezelfde tip, twee andere antwoorden",
  "inleiding": "Sanne en Pieter werken op hetzelfde kantoor in Gent. Ze krijgen allebei een bonus van € 8.000, en een collega raadt hun allebei hetzelfde technologiefonds aan. Waarom past dezelfde tip niet bij allebei?",
  "kernidee": "Wat bij iemand past, volgt uit doel, termijn, financiële draagkracht, kennis en ervaring en risicobereidheid, niet uit een tip of een leeftijd.",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Sanne, Pieter en de collega zijn verzonnen. Het verhaal toont een manier van denken, geen beoordeling van een echt fonds.</p>\n<p>Het is vrijdagmiddag en de bonussen staan op de rekening. Bij de koffieautomaat is Kevin enthousiast: hij zit al twee jaar in een technologiefonds en ‘dat gaat alleen maar omhoog’. Sanne en Pieter knikken. Allebei denken ze erover na.</p>\n\n<h2>Sanne</h2>\n<p>Sanne is 33, huurt een appartement en wil binnen drie jaar een woning kopen. Haar buffer dekt twee maanden vaste kosten; ze vindt die reserve krap voor haar plannen. Ze heeft nog nooit belegd en weet niet goed wat er in zo’n fonds zit.</p>\n<p>Voor haar is die € 8.000 eigenlijk een stuk van haar voorschot. Daalt het fonds net voor de aankoop met een kwart, dan heeft ze € 2.000 minder om in te brengen, of moet ze de aankoop uitstellen. Ze kan zo’n verlies moeilijk opvangen, haar [[horizon|termijn]] is kort, en ze kan niet inschatten wat ze koopt. De tip zegt niets over die drie dingen.</p>\n\n<h2>Pieter</h2>\n<p>Pieter is 48, zijn woning is grotendeels afbetaald, zijn buffer dekt een half jaar, en hij belegt al jaren in gespreide fondsen. Hij zat er ook in tijdens 2022 en verkocht toen niets. Zijn bonus is voor later, zonder vaste datum.</p>\n<p>Voor hem is beleggen dus een echte optie. Maar ook bij hem rammelt de tip. Een fonds dat alleen in technologie belegt, is geconcentreerd. Hij heeft via zijn wereldfondsen al veel van dezelfde grote bedrijven. Meer daarvan maakt zijn [[spreiding|spreiding]] niet breder, wel eenzijdiger. En ‘het gaat alleen maar omhoog’ is hoogstens Kevins indruk van zijn recente ervaring. Het is geen belofte voor de volgende jaren en zegt niets over de verliezen die een technologiefonds kan lijden.</p>\n\n<h2>Waarom leeftijd het niet beslist</h2>\n<p>Het is verleidelijk om te zeggen: Sanne is jong en kan dus meer risico nemen, of Pieter is ouder en moet voorzichtiger zijn. In dit verhaal is het eerder omgekeerd, en dat komt niet door hun leeftijd. Het komt door wat het geld moet doen, wanneer, hoeveel verlies ze kunnen dragen, wat ze weten en hoe ze reageren als het tegenzit.</p>\n<p>Precies die vragen stelt een adviseur of makelaar voor hij iets voorstelt. Hij bekijkt uw doelen en risicobereidheid, uw financiële situatie en verliesdraagkracht, uw kennis en ervaring, en uw eventuele duurzaamheidsvoorkeuren. Daaruit volgt uw [[risicoprofiel|beleggersprofiel]], en pas daarna de vraag welke oplossing passend is. Dat maakt een uitkomst niet zeker. Het maakt wel dat de keuze bij u hoort, en niet bij Kevin.</p>\n<p>Sanne zet haar bonus apart voor de woning. Pieter belegt een deel, maar breed, en laat de technologietip liggen. De bonussen kwamen op hetzelfde moment. Wat ze ermee willen doen en kunnen dragen, bleek het beslissende verschil.</p>",
  "bronnen": [
    {
      "label": "FSMA — Brochure beleggen via verzekeringen (IDD, 2026), p. 13: doelen en risicotolerantie, financiële situatie en verliesdraagkracht, kennis en ervaring",
      "url": "https://www.fsma.be/sites/default/files/media/files/2026-04/fsma_brochure_idd_belegging_nl.pdf"
    },
    {
      "label": "FSMA — Gedragsregels duurzaamheidsvoorkeuren (MiFID II, IDD)",
      "url": "https://www.fsma.be/nl/gedragsregels-duurzaamheidsvoorkeuren-mifid-ii-en-idd-en-pog"
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "profiel",
    "zin": "Waaruit een beleggersprofiel bestaat, en waarom u het niet zelf aanvinkt."
  }
},

{
  "id": "de-lijn",
  "hoofdstuk": "samen",
  "soort": "verhaal",
  "titel": "‘Wat neemt die lijn eigenlijk aan?’",
  "inleiding": "Ann en Dries zien hun plan voor het eerst: een rustige lijn die precies op hun 65ste hun doel raakt. Het ziet er geruststellend uit. Tot Dries één vraag stelt, en het gesprek een stuk nuttiger wordt.",
  "kernidee": "Een plangrafiek is een berekening met aannames, geen belofte. Wie de belangrijkste aannames kent, stelt betere vragen dan ‘halen we het?’",
  "beeld": null,
  "tekst": "<p class=\"fictie\">Fictief verhaal. Ann, Dries en hun adviseur zijn verzonnen. Het gesprek laat zien welke vragen helpen om een berekening te begrijpen.</p>\n<p>Het scherm toont één doel: een aanvulling op hun pensioen. Een stijgende lijn, een punt op hun 65ste, en daar staat het bedrag dat ze wilden. Ann is opgelucht. Dries leunt naar voren. ‘Wat neemt die lijn eigenlijk aan?’</p>\n<p>De adviseur opent de uitgangspunten van de berekening. Ze bekijken er drie die veel verschil maken.</p>\n\n<h2>Eén: de prijzen</h2>\n<p>‘De bedragen in deze grafiek zijn euro’s van dat latere jaar,’ legt ze uit. ‘Het plan neemt aan dat de prijzen 2 procent per jaar stijgen.’ Ze laat de lijn zien die toont wat er nodig is om de [[koopkracht|koopkracht]] van vandaag te behouden. Stijgt de [[inflatie|inflatie]] gemiddeld sneller, dan koopt hetzelfde eindbedrag minder, en ligt die lijn hoger.</p>\n<p>Dries schrijft het op: het doel is niet een bedrag, maar wat ze er later mee willen kunnen doen.</p>\n\n<h2>Twee: de kosten</h2>\n<p>‘En kosten?’ vraagt Ann. De adviseur toont dat de groeilijn in deze uitsnede zonder kosten en belasting rekent, en dat er een aparte verkenning bestaat die het effect van [[lopende-kosten|lopende kosten]] toont. Elk procent dat jaarlijks afgaat, kan niet meer meegroeien. Over twintig jaar maakt dat een zichtbaar verschil. Welke kosten hun gekozen oplossing werkelijk heeft, komt pas later, als ze producten vergelijken.</p>\n\n<h2>Drie: het pad naar het doel</h2>\n<p>De derde aanname is de lastigste. De lijn volgt een gemodelleerd marktpad met dalingen, op basis van vaste uitgangspunten per soort belegging. ‘Het is één voorbeeldpad,’ zegt ze. ‘Geen voorspelling, en geen kansberekening.’</p>\n<p>Dries vraagt wat er gebeurt als een grote daling net vóór hun 65ste valt. Dan is er minder tijd voor mogelijk herstel, en herstel staat nooit vast. De gevolgen hangen ook af van de omvang van de belegging, verdere stortingen en geplande opnames. Ze bespreken daarom of en wanneer risico afbouwen past bij hun doel. Dat kan de schommelingen beperken, maar ook de mogelijke groei verminderen; het waarborgt de uitkomst niet.</p>\n\n<h2>Wat er verandert aan tafel</h2>\n<p>Ann en Dries vragen niet langer ‘halen we het?’. Ze vragen: hoeveel speling hebben we als het tegenzit? Wat doen we als de lijn over tien jaar lager ligt dan nu? En kunnen we die beslissing vooraf afspreken, zodat we ze niet in een slechte week moeten nemen?</p>\n<p>Ann en Dries gebruiken de grafiek voortaan om keuzes en tegenvallers te vergelijken. De uitkomst blijft onzeker; hun afspraken worden concreter. Ze spreken af om elk jaar opnieuw te kijken, met hun werkelijke bedragen en hun plannen van dat moment.</p>",
  "bronnen": [
    {
      "label": "Wikifin (FSMA) — Welk rendement kan je verwachten van een belegging?",
      "url": "https://www.wikifin.be/nl/sparen-en-beleggen/hoe-beleggen-en-risicospreiding/hoe-beleggen/welk-rendement-kan-je-verwachten"
    },
    {
      "label": "ECB — What is inflation?",
      "url": "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html"
    },
    {
      "label": "Rekenmethode: aannames van het Norte-plan zoals beschreven in de les ‘Hoe het plan rekent’ (prototypeparameters, inflatie 2 %, gemodelleerd marktpad); dit verhaal voegt geen berekening toe.",
      "url": null
    }
  ],
  "vervolg": {
    "type": "lezen",
    "id": "aannames",
    "zin": "Waar de aannames van het plan vandaan komen, en waar ze ophouden."
  }
}
],

/* Kernbegrippen: korte betekenis + de les waarin het uitgelegd wordt (altijd een les, zodat het begrip naar de leeromgeving kan leiden) */
begrippen: {
  'rendement':          { term:'Rendement', betekenis:'De opbrengst over een bepaalde periode ten opzichte van uw inleg: inkomsten plus waardeverandering. Het kan positief of negatief zijn. Kosten, belasting en inflatie veranderen wat u overhoudt.', artikel:'rendement' },
  'rente':              { term:'Rente', betekenis:'Een vergoeding voor het beschikbaar stellen of uitlenen van geld. De voorwaarden bepalen onder meer het percentage, de periode en of het vast of variabel is. Op een spaarrekening bestaat ze vaak uit een basisrente en een getrouwheidspremie.', artikel:'spaarrekening' },
  'getrouwheidspremie': { term:'Getrouwheidspremie', betekenis:'Het deel van de vergoeding op een gereglementeerde spaarrekening dat u alleen krijgt op bedragen die twaalf maanden ononderbroken op de rekening blijven. Elke storting telt apart. Haalt u eerder af, dan verliest u de premie op dat bedrag.', artikel:'spaarrekening' },
  'buffer':             { term:'Buffer', betekenis:'Spaargeld dat u meteen kunt gebruiken voor onverwachte uitgaven of een periode met minder inkomen. Het hoort niet in een belegging, omdat u het net nodig kunt hebben wanneer koersen laag staan. Hoe groot hij moet zijn, hangt af van uw eigen situatie.', artikel:'sparen-of-beleggen' },
  'horizon':            { term:'Termijn', betekenis:'De tijd tot u het geld wilt gebruiken. Een langere termijn geeft een belegging meer tijd om een daling te herstellen en groei te laten opstapelen. Ze garandeert geen goede uitkomst, en geld dat u binnenkort nodig hebt, hoort niet in een schommelende belegging.', artikel:'sparen-of-beleggen' },
  'aandeel':            { term:'Aandeel', betekenis:'Een klein deel van de eigendom van een bedrijf. U kunt delen in dividend en in een hogere koers, maar geen van beide staat vast. Bij een faillissement komen aandeelhouders als laatste aan de beurt en kunt u uw volledige inleg verliezen.', artikel:'bouwstenen' },
  'dividend':           { term:'Dividend', betekenis:'Het deel van de winst dat een bedrijf aan zijn aandeelhouders uitkeert. De onderneming beslist of en hoeveel ze uitkeert; een dividend kan lager uitvallen of wegvallen. Een uitkering maakt een koersdaling niet ongedaan: tel waarde en uitkering samen.', artikel:'bouwstenen' },
  'obligatie':          { term:'Obligatie', betekenis:'Een lening aan een staat of bedrijf. U ontvangt rente en op de vervaldag het nominale bedrag terug, als de uitgever kan betalen. Wie vóór de vervaldag verkoopt, krijgt de marktprijs van dat moment; die bij een vaste coupon doorgaans daalt als de marktrente stijgt, als de andere omstandigheden gelijk blijven.', artikel:'bouwstenen' },
  'coupon':             { term:'Coupon', betekenis:'De rente die een obligatie uitbetaalt, als percentage van het geleende bedrag. Bij een vaste coupon weet u vooraf welke betalingen beloofd zijn. Of u ze ontvangt, hangt af van het vermogen van de uitgever om te betalen.', artikel:'bouwstenen' },
  'kredietrisico':      { term:'Kredietrisico', betekenis:'Het risico dat wie geld leende, het niet of niet volledig terugbetaalt. Hoe minder solide de lener, hoe hoger de rente die hij moet bieden. Een opvallend hoge rente is daarom een reden om na te gaan waarom.', artikel:'bouwstenen' },
  'fonds':              { term:'Beleggingsfonds', betekenis:'Een mand waarin het geld van veel beleggers samen wordt belegd in aandelen, obligaties of andere beleggingen. Met één aankoop bent u zo over veel posities gespreid. Het risico hangt af van wat erin zit: een fonds met één sector of één land blijft geconcentreerd.', artikel:'verpakking' },
  'index':              { term:'Index', betekenis:'Een lijst van beleggingen met vaste regels, zoals de MSCI World voor grote bedrijven uit ontwikkelde landen. Meestal weegt een bedrijf zwaarder naarmate zijn beurswaarde groter is. Een indexfonds koopt die lijst na; de regels bepalen dus wat u bezit.', artikel:'actief-index' },
  'etf':                { term:'ETF', betekenis:'Een beleggingsfonds dat op de beurs verhandeld wordt, tegen de koers van dat moment. Veel ETF’s volgen een index; er bestaan ook actief beheerde. De inhoud en aanpak bepalen risico en kosten, de naam ETF niet.', artikel:'actief-index' },
  'tak21':              { term:'Tak 21', betekenis:'Levensverzekering met een rente die de verzekeraar per storting waarborgt, voor een afgesproken duur, eventueel aangevuld met winstdeelname. Voor de gedekte individuele contracten bij een verzekeraar naar Belgisch recht geldt bij faillissement maximaal € 100.000 per persoon en per instelling, samen over die contracten. Groepsverzekeringen en VAPZ zijn uitgesloten. Een waarborg is niet altijd uw netto inleg terug: kosten, premietaks en fiscaliteit bepalen wat u werkelijk overhoudt.', artikel:'tak21-tak23' },
  'tak23':              { term:'Tak 23', betekenis:'Levensverzekering waarvan de waarde gekoppeld is aan fondsen. Er is geen standaardwaarborg op kapitaal of rendement, en het Garantiefonds komt niet tussen. Sommige contracten bouwen een vorm van bescherming in; lees dan wie die geeft en wat ze kost.', artikel:'tak21-tak23' },
  'pensioensparen':     { term:'Pensioensparen', betekenis:'Fiscaal stelsel met een belastingvermindering op jaarlijkse stortingen tot een plafond. Voor het inkomstenjaar 2026: tot € 1.050 aan 30 % of tot € 1.350 aan 25 %. Meestal volgt op zestig een heffing van 8 % op een productafhankelijke berekeningsbasis. Vroeger opnemen wordt doorgaans zwaar belast; uitzonderingen en kosten hangen van de situatie af.', artikel:'pensioensparen' },
  'samengestelde-groei':{ term:'Samengestelde groei', betekenis:'Groei op groei: wat uw geld opbrengt, gaat zelf mee opbrengen als u het laat staan. Het effect is klein in het begin en wordt groter naarmate de termijn langer is. Het werkt ook omgekeerd: wat aan kosten weggaat, kan niet meer meegroeien.', artikel:'tijd' },
  'lopende-kosten':     { term:'Lopende kosten', betekenis:'De jaarlijkse kosten van een fonds, elk jaar afgehouden van de waarde van uw belegging, in goede en in slechte jaren. Wat u betaalt, kan niet meer meegroeien; daardoor wordt een klein verschil over lange tijd groot. Instap-, transactie- en uitstapkosten en belastingen komen er apart bij.', artikel:'kosten' },
  'roerende-voorheffing':{ term:'Roerende voorheffing', betekenis:'Belasting die de bank of het fonds meteen inhoudt op rente en dividenden, in de regel 30 %. Voor rente op een gereglementeerde spaarrekening gelden een vrijstelling tot een jaarlijks bedrag en daarboven 15 %.', artikel:'kosten' },
  'inflatie':           { term:'Inflatie', betekenis:'De gemiddelde stijging van prijzen. Stijgen de prijzen sneller dan uw rente of rendement, dan kunt u later minder kopen met hetzelfde bedrag. Hoe hoog ze de komende jaren wordt, weet niemand vooraf.', artikel:'koopkracht' },
  'koopkracht':         { term:'Koopkracht', betekenis:'Wat u met een bedrag werkelijk kunt kopen. Een bedrag van later drukt u in geld van vandaag uit door het voor inflatie te corrigeren. Nominaal en in koopkracht zijn allebei juist; ze beantwoorden een andere vraag.', artikel:'koopkracht' },
  'bruto-netto':        { term:'Bruto en netto', betekenis:'Bruto is de opbrengst vóór kosten en belasting; netto is wat overblijft. Een vergelijking klopt pas als beide producten op hetzelfde niveau en over dezelfde periode staan. Daarna verandert inflatie nog wat u er werkelijk mee kunt kopen.', artikel:'koopkracht' },
  'volatiliteit':       { term:'Volatiliteit', betekenis:'Hoe sterk de waarde van een belegging op en neer gaat. Een lagere koers is meteen een lager vermogen. Of dat later goedgemaakt wordt, staat niet vast; bij een faillissement kan het verlies blijvend zijn, ook zonder te verkopen.', artikel:'daling' },
  'draagvermogen':      { term:'Financieel draagvermogen', betekenis:'In hoeverre u een verlies kunt opvangen zonder dat uw leven of doelen in gevaar komen. Het hangt onder meer af van uw inkomen, buffer, verplichtingen en termijn. Het is iets anders dan hoeveel risico u durft, en lezen of oefenen verandert het niet.', artikel:'profiel' },
  'concentratie':       { term:'Concentratie', betekenis:'Een groot deel van uw vermogen in één bedrijf, sector, land of bezit. Eén tegenvaller raakt dan veel van het geheel: zit de helft in één aandeel dat halveert, dan verliest u een kwart. Wie ook in dat bedrijf werkt, loopt dubbel risico.', artikel:'spreiding' },
  'spreiding':          { term:'Spreiding', betekenis:'Uw geld verdelen over bedrijven, sectoren, landen en soorten beleggingen, zodat één tegenvaller het geheel minder raakt. Het telt waarvan uw beleggingen afhankelijk zijn, niet hoeveel namen u bezit. Spreiding voorkomt niet dat een hele markt tegelijk daalt.', artikel:'spreiding' },
  'risicoprofiel':      { term:'Beleggersprofiel', betekenis:'Beschrijving van welk risico en welke aanpak bij u passen, opgesteld met uw adviseur op basis van uw beleggingsdoelen en risicotolerantie, uw financiële situatie en verliesdraagkracht, uw kennis en ervaring, en eventueel uw duurzaamheidsvoorkeuren. U kiest het niet vrij. Een hoger profiel is geen beloning en geeft geen toegang tot ‘betere’ producten.', artikel:'profiel' },
  'herwegen':           { term:'Herwegen', betekenis:'Een belegging terugbrengen naar de afgesproken verhouding, bijvoorbeeld tussen aandelen en obligaties, nadat de markt ze heeft doen verschuiven. Het is discipline, geen voorspelling. Verkopen kan kosten en belasting meebrengen; nieuwe inleg sturen kan vaak ook.', artikel:'opvolgen' }
},

/* Uitgelicht op de kennisstart (redactionele keuze; de opening zelf staat in app.js) */
uitgelicht: { hoofd:'risico', neven:['buffett', 'staatsbon'] },

/* Keuzemomenten uit de klantvoorbereiding → lessen en bestaande verkenning (dekkingskaart). sim: alleen bestaande ids of null. */
keuzemomenten: [
  { id:'vertrek',   vraag:'Vertrekt u van een doel of van een bedrag?',            artikels:['sparen-of-beleggen','spaarrekening'], sim:null },
  { id:'inleg',     vraag:'Eenmalig, maandelijks of beide?',                       artikels:['instappen','tijd'], sim:'tijd' },
  { id:'fiscaal',   vraag:'Fiscaal voordeel benutten?',                            artikels:['pensioensparen','kosten'], sim:null },
  { id:'termijn',   vraag:'Wanneer hebt u het geld nodig?',                        artikels:['sparen-of-beleggen','tijd','kind'], sim:'tijd' },
  { id:'strategie', vraag:'Welke aanpak neemt u aan voor deze verkenning?',        artikels:['profiel','daling','spreiding'], sim:'spreiding' },
  { id:'product',   vraag:'Fonds, verzekering of fiscaal stelsel?',                artikels:['verpakking','actief-index','tak21-tak23'], sim:null },
  { id:'kosten',    vraag:'Wat kosten de oplossingen, en wat blijft er over?',     artikels:['kosten','buffett'], sim:'kosten' },
  { id:'plan',      vraag:'De plangrafiek en haar aannames lezen',                 artikels:['aannames','koopkracht'], sim:'koopkracht' },
  { id:'opvolgen',  vraag:'Opvolgen, herwegen en later opnemen',                   artikels:['opvolgen'], sim:null }
],

/* ───────── Oefenvragen: educatief, met directe uitleg. Bewaard als inhoud; in de redactionele artikels worden ze niet getoond. ───────── */
oefenvragen: [
  { id:'ob', hoofdstuk:'opbrengst', scenario:'Het indexfonds won de weddenschap ruim. U wilt weten wat kosten op zich doen.',
    vraag:'Welke vergelijking zegt het meest over kosten?',
    opties:['Twee fondsen met dezelfde inhoud en strategie, maar andere jaarlijkse kosten','Een indexfonds tegenover hedgefondsen met een andere strategie'],
    juist:0, uitleg:'Alleen als inhoud en risico gelijk zijn, zegt het verschil vooral iets over kosten. In de weddenschap verschilden ook strategie, samenstelling en risico. Daarom verklaren kosten een belangrijk deel, maar niet alles.', artikel:'buffett' },
  { id:'o1', hoofdstuk:'begin', scenario:'Nora (fictief) heeft € 8.000 op haar spaarrekening. Haar auto is twaalf jaar oud en zal binnen een jaar of twee vervangen moeten worden.',
    vraag:'Wat is de meest logische eerste stap?',
    opties:['Het grootste deel in een aandelenfonds steken, want sparen brengt weinig op','Eerst bepalen hoeveel buffer ze nodig heeft en wat ze voor de auto opzijzet','Wachten tot de rente stijgt'],
    juist:1, uitleg:'Geld dat binnen een jaar of twee nodig is, en de buffer, horen niet in een belegging die op dat moment net lager kan staan. Eerst die twee bedragen bepalen; pas wat overblijft komt in aanmerking voor beleggen.', artikel:'sparen-of-beleggen' },
  { id:'o2', hoofdstuk:'opbrengst', scenario:'Een spaarrekening geeft 1 % rente. De prijzen stijgen dat jaar met 3 %.',
    vraag:'Wat gebeurt er met de koopkracht van het spaargeld?',
    opties:['Ze stijgt met 1 %','Ze blijft gelijk, want het bedrag daalt niet','Ze daalt met ongeveer 2 %'],
    juist:2, uitleg:'Het bedrag op de rekening stijgt, maar de prijzen stijgen sneller. U kunt er na een jaar ongeveer 2 % minder mee kopen.', artikel:'koopkracht' },
  { id:'o3', hoofdstuk:'bouwstenen', scenario:'Lotus maakt een uitstekend jaar: de omzet groeit met 10 %. Toch daalt de koers van het aandeel op de dag van de jaarcijfers.',
    vraag:'Wat is de meest waarschijnlijke verklaring?',
    opties:['De cijfers waren slechter dan beleggers al hadden verwacht','Het bedrag van het dividend wordt van de koers afgetrokken','De beurs maakt een fout die snel hersteld wordt'],
    juist:0, uitleg:'De prijs van een aandeel weerspiegelt verwachtingen. Als beleggers op meer groei rekenden, kan een goed resultaat toch teleurstellen.', artikel:'lotus' },
  { id:'o4', hoofdstuk:'bouwstenen', scenario:'Jan (fictief) kocht een obligatie met een looptijd van tien jaar en een coupon van 3 %. Twee jaar later is de marktrente gestegen naar 4,5 %.',
    vraag:'Wat gebeurt er met de waarde van zijn obligatie als hij ze vandaag verkoopt?',
    opties:['Ze is meer waard, omdat de rente gestegen is','Ze is minder waard dan wat hij betaalde','Er verandert niets, de coupon blijft 3 %'],
    juist:1, uitleg:'Nieuwe obligaties bieden nu 4,5 %. Niemand betaalt dan de volle prijs voor een obligatie van 3 %, dus daalt de waarde. Houdt Jan ze tot de vervaldag, dan krijgt hij wel het nominale bedrag terug, als de lener betaalt.', artikel:'staatsbon' },
  { id:'o5', hoofdstuk:'bouwstenen', scenario:'Twee buren hebben elk ‘een tak 23’. De ene belegt in een obligatiefonds, de andere in een fonds met aandelen uit opkomende landen.',
    vraag:'Wat is juist?',
    opties:['Ze dragen hetzelfde risico, want het is hetzelfde type product','Het risico hangt vooral af van het fonds in de verzekering','Een tak 23 heeft altijd een gewaarborgd kapitaal'],
    juist:1, uitleg:'Tak 23 is de verpakking. Het risico komt van wat erin zit: een obligatiefonds schommelt doorgaans veel minder dan aandelen uit opkomende landen. Een tak 23 heeft geen standaardwaarborg op kapitaal.', artikel:'tak21-tak23' },
  { id:'o6', hoofdstuk:'opbrengst', scenario:'Fonds A kost 0,3 % per jaar, fonds B 1,8 %. Beide beleggen in vergelijkbare aandelen en groeien vóór kosten even sterk.',
    vraag:'Wat gebeurt er met het verschil tussen beide na dertig jaar?',
    opties:['Het blijft ongeveer 1,5 % van de inleg','Het wordt in verhouding groter, omdat kosten zich opstapelen','Het verdwijnt, omdat duurdere fondsen het verschil goedmaken'],
    juist:1, uitleg:'Kosten worden elk jaar van een steeds grotere waarde afgehouden, en wat u betaalt kan niet meer meegroeien. Het verschil stapelt zich op zoals samengestelde groei.', artikel:'kosten' },
  { id:'o7', hoofdstuk:'opbrengst', scenario:'Een appartement van € 250.000 wordt verhuurd voor € 9.500 per jaar.',
    vraag:'Wat is 3,8 % in dit voorbeeld?',
    opties:['Het netto rendement','Het bruto direct rendement','Het totale rendement inclusief waardestijging'],
    juist:1, uitleg:'Huur gedeeld door de waarde is het bruto direct rendement. Na kosten zoals onderhoud, voorheffing, leegstand en belasting blijft er minder over; in het model van het Steunpunt Wonen ongeveer 2,4 %.', artikel:'vastgoed' },
  { id:'o8', hoofdstuk:'risico', scenario:'Mieke (fictief) werkt al twintig jaar bij een grote bank en heeft 70 % van haar beleggingen in aandelen van haar werkgever.',
    vraag:'Wat is het grootste risico?',
    opties:['Wisselkoersrisico','Concentratie: inkomen en vermogen hangen van hetzelfde bedrijf af','Dat het dividend te laag is'],
    juist:1, uitleg:'Als het met haar werkgever slecht gaat, kan ze tegelijk haar job en een groot deel van haar vermogen verliezen. Dat is het patroon dat bij Fortis veel mensen raakte.', artikel:'fortis' },
  { id:'o9', hoofdstuk:'risico', scenario:'Ahmed (fictief) zegt: ‘Ik durf veel risico, ik heb vorig jaar alle artikels over aandelen gelezen.’',
    vraag:'Wat zegt dit over zijn beleggersprofiel?',
    opties:['Hij heeft voldoende kennis en ervaring voor een dynamisch profiel','Durven, kennis, ervaring en draagvermogen zijn aparte vragen; dit zegt er weinig over','Wie veel leest, mag zelf zijn profiel kiezen'],
    juist:1, uitleg:'Lezen is geen ervaring, en durven is geen draagvermogen. Een profiel komt uit een gesprek en een toets over al die dimensies samen.', artikel:'risico' },
  { id:'o10', hoofdstuk:'samen', scenario:'Sofie (fictief) erft € 30.000 voor een doel over twintig jaar. Ze is bang dat de beurs net na haar inleg zakt.',
    vraag:'Welke aanpak past bij die zorg?',
    opties:['Wachten tot de beurs gezakt is','In schijven inleggen over een aantal maanden, wetende dat dit vooral spijt beperkt','Alles in één aandeel steken dat net gedaald is'],
    juist:1, uitleg:'Gespreid instappen verkleint het risico op een heel ongelukkig instapmoment en helpt om vol te houden. Het levert niet gegarandeerd meer op. Wachten op het juiste moment lukt zelden.', artikel:'instappen' },
  { id:'o11', hoofdstuk:'samen', scenario:'Een doel komt dichterbij: over twee jaar heeft het gezin het geld voor de studies nodig. Het zit nog volledig in een dynamische strategie.',
    vraag:'Wat is een logische vraag om met de adviseur te bespreken?',
    opties:['Of de strategie geleidelijk rustiger moet nu het doel dichtbij is','Of ze naar een nog dynamischer strategie kunnen voor meer rendement','Niets, een strategie blijft altijd gelijk'],
    juist:0, uitleg:'Naarmate een doel dichterbij komt, is er minder tijd om een daling te herstellen. Een rustigere strategie kan de schade van een daling vlak voor gebruik beperken.', artikel:'profiel' },
  { id:'b1', hoofdstuk:'bouwstenen', scenario:'Een onderneming haalt geld op met aandelen én met een gewone obligatie. U koopt alleen de obligatie.',
    vraag:'Welke rol hebt u dan?',
    opties:['Mede-eigenaar van de onderneming','Geldschieter volgens de obligatievoorwaarden'],
    juist:1, uitleg:'Een obligatie is een lening. U krijgt geen aandeel in het eigendom en bent afhankelijk van de beloofde betalingen én van het vermogen van de uitgever om te betalen.', artikel:'bouwstenen' },
  { id:'r1', hoofdstuk:'opbrengst', scenario:'Een fictieve belegging van € 1.000 is na één jaar € 950 waard. Ze keerde ook € 30 uit. Geen bijkomende inleg, kosten of belasting.',
    vraag:'Wat is het totale resultaat?',
    opties:['€ 30 winst, want dat is uitgekeerd','€ 20 verlies: waarde en uitkering samen tellen'],
    juist:1, uitleg:'€ 950 plus € 30 is € 980. Ten opzichte van de oorspronkelijke € 1.000 is dat € 20 verlies, of min 2 procent. Een uitkering maakt een koersverlies niet automatisch goed.', artikel:'rendement' },
  { id:'s1', hoofdstuk:'risico', scenario:'Twee fondsen dragen verschillende namen, maar beleggen voor een groot deel in dezelfde technologiebedrijven.',
    vraag:'Wat weet u over de spreiding?',
    opties:['Twee fondsen betekent automatisch dubbel zoveel spreiding','De inhoud kan sterk overlappen; de namen zeggen niet genoeg'],
    juist:1, uitleg:'Dezelfde bedrijven in twee fondsen blijven dezelfde afhankelijkheid. Kijk naar de gezamenlijke inhoud en gewichten. Een bredere spreiding vermindert afhankelijkheid van losse posities, maar sluit marktverlies niet uit.', artikel:'spreiding' }
]

/* De formele prototypetoets en ervaringsvragen uit v1 zijn bewust verwijderd: formele beoordeling hoort in de bestaande adviesflow. */
};
