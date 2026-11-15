/* Redactionele herziening, 5 november 2026. Eén gegevensbron voor artikels en leerlaag.
   Bewust afzonderlijk van de bestaande rekenkern en de oorspronkelijke inhoudsedite. */
(() => {
'use strict';
const C=window.NORTE_INHOUD, A=id=>C.artikels.find(a=>a.id===id);
const bron=(label,url)=>({label,url});
const U={
 verzekeren:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-23/wat-tak-23',
 tak21:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-21/beleggen-een',
 takken:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/wat-zijn-de-verschillen-tussen-tak-21',
 belasting:'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/je-roerend-inkomen/de-belastingen-op-je-belgische',
 meerwaarde:'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting',
 ps:'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/belastingverminderingen/pensioensparen',
 lts:'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/belastingverminderingen/vermindering-voor',
 ltswerking:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/producten-op-lange-termijn/wat-langetermijnsparen',
 zelfstandig:'https://www.fsma.be/nl/hoe-kan-u-als-zelfstandige-een-aanvullend-pensioen-opbouwen',
 vapz:'https://www.fsma.be/nl/welke-zijn-de-fiscale-regels-voor-een-vapz-overeenkomst',
 sociaal:'https://www.fsma.be/nl/wat-een-sociale-vapz-overeenkomst',
 poz:'https://www.fsma.be/nl/welke-zijn-de-fiscale-regels-voor-een-vapznp-overeenkomst',
 ipt:'https://www.fsma.be/nl/welke-zijn-de-fiscale-regels-voor-zelfstandige-bedrijfsleiders',
 grens:'https://www.fsma.be/nl/wat-de-80-regel'
};
const bite=(id,titel,vragen,noot='')=>`<section class="leer-bite" aria-labelledby="bite-${id}"><h2 id="bite-${id}">${titel}</h2><ol role="list">${vragen.map(([k,v])=>`<li><div class="bite-inhoud"><h3>${k}</h3><p>${v}</p></div></li>`).join('')}</ol>${noot?`<p class="bite-noot">${noot}</p>`:''}</section>`;

/* Eén concrete beursdag blijft een verhaal over prijs, verwachtingen en concentratie. */
Object.assign(A('risico'),{titel:'ASML: een sterk bedrijf, een slechte beursdag',inleiding:'Op 15 oktober 2024 verloor het ASML-aandeel 15,6 procent. De fabrieken stonden er nog; de verwachtingen waren veranderd. Wat leert die dag over één aandeel en een gespreid fonds?',teaser:'De fabrieken stonden er nog. De verwachtingen waren veranderd. Wat leert een koersdaling van 15,6 procent over uw belegging?'});
A('risico').tekst=`
<p>ASML bouwt in het Nederlandse Veldhoven de machines waarmee chipfabrikanten de meest geavanceerde chips maken. Het bedrijf heeft technologie die moeilijk na te maken is. Toch verloor het aandeel op 15 oktober 2024 in Amsterdam 15,6 procent. De fabrieken stonden er nog. De verwachtingen waren veranderd.</p>
<h2>De prijs kijkt vooruit</h2>
<p>Het kwartaalbericht verscheen per vergissing een dag te vroeg. De nieuwe bestellingen en de vooruitzichten voor 2025 vielen tegen. Beleggers moesten hun beeld van de toekomstige groei bijstellen. Een sterk bedrijf bleek op die dag minder waard dan zij de dag ervoor dachten.</p>
<p>Met een [[aandeel|aandeel]] bezit u een stukje van een onderneming. De beurskoers is wat anderen er vandaag voor willen betalen, op basis van onder meer verwachte winst, groei en onzekerheid. Een goed product of een sterke marktpositie maakt die prijs niet vast. Ook bij een uitstekend bedrijf kan de koers hoog zijn ten opzichte van wat beleggers later verwachten.</p>
<p>Wie het aandeel bezat, zag zijn vermogen die dag werkelijk dalen. Daar hoeft u niet eerst voor te verkopen. Verkopen zet de lagere waarde om in geld; aanhouden laat de mogelijkheid van herstel open, maar geeft geen zekerheid dat het herstel komt. De beweeglijkheid van een koers heet [[volatiliteit|volatiliteit]].</p>
<h2>Wat als ASML in uw fonds zit?</h2>
<p>ASML zit ook in brede Europese aandelenindexen. Wie een Europees [[indexfonds|indexfonds]] bezit, kan dus een deel van de daling voelen. Dat betekent niet dat het hele fonds evenveel zakt: het gewicht van ASML en de beweging van alle andere beleggingen bepalen samen de uitkomst.</p>
<p>Een eenvoudig rekenvoorbeeld: als ASML vóór de daling 5 procent van een fictief fonds uitmaakt en de overige beleggingen gelijk blijven, geeft een daling van 15,6 procent een verlies van ongeveer 0,78 procent voor dat fonds. Dit is alleen een illustratie van weging, geen weergave van een werkelijk fonds. Spreiding maakt één bedrijf minder bepalend; een brede beursdaling kan nog steeds het hele fonds raken.</p>
<h2>Een slechte dag is geen diagnose</h2>
<p>Uit één koersdag blijkt niet of een bedrijf voorgoed in moeilijkheden zit, of dat beleggers hun verwachtingen later opnieuw zullen verhogen. Soms herstelt een koers, soms blijft een verlies bestaan. Dat onderscheid ziet u vaak pas achteraf. <a class="verhaal-link" href="#/artikel/fortis">Het verhaal van Fortis</a> laat zien waarom een vertrouwde naam alleen onvoldoende houvast biedt.</p>
${bite('risico','Wat deze beursdag leert',[
 ['Een bedrijf is geen vaste prijs','Ook sterke ondernemingen kunnen fors dalen als verwachtingen veranderen.'],
 ['In een fonds telt het gewicht','Een klein aandeel van het fonds heeft een kleiner effect op het geheel.'],
 ['Herstel is geen afspraak','Een lagere koers geeft op zichzelf geen zekerheid over wat volgt.']
])}
<p>ASML bleef op die dag hetzelfde bedrijf, maar beleggers betaalden er minder voor. Wie een aandeel beoordeelt, kijkt dus naar twee verschillende zaken: de onderneming zelf en de prijs die ervoor gevraagd wordt. In een breed fonds komt daar een derde vraag bij: hoe zwaar weegt dat ene bedrijf?</p>`;

/* Bank/verzekering: bestaande les en gekoppeld verhaal verdiepen, geen dubbele les bouwen. */
Object.assign(A('verpakking'),{
 titel:'Bank of verzekering: wat verandert er voor uw geld?',
 inleiding:'Vergelijkbare beleggingen kunnen in een fonds bij een bank zitten of in een levensverzekering. De inhoud kan op elkaar lijken. De afspraken eromheen maken wel verschil.',
 kernidee:'Kijk naar wat erin zit én naar wat het contract voor u regelt.',
 tekst:`<p>In een brochure ziet u aandelen, obligaties en een grafiek. In een andere bijna hetzelfde, maar nu heet het een beleggingsverzekering. U vergelijkt dan twee dingen tegelijk: waarin uw geld belegt en welke juridische afspraken u sluit.</p>
<h2>Wat bezit u?</h2>
<p>Koopt u een [[fonds|beleggingsfonds]] via een bank of broker, dan bezit u deelbewijzen van dat fonds. De beheerder belegt het gezamenlijke geld volgens het fondsbeleid. Bij een [[tak23|tak 23-verzekering]] sluit u een contract met een verzekeraar. De waarde volgt de gekozen interne beleggingsfondsen. U bezit via dat contract niet rechtstreeks de aandelen waar die fondsen in beleggen.</p>
<p>Vergelijk daarom eerst de inhoud: hoeveel aandelen en obligaties, welke landen, welke spreiding en welk beheer? Het woord verzekering maakt beleggingen in aandelen niet vanzelf minder beweeglijk. Een vergelijkbare mix kan in beide vormen dalen. Tak 21 werkt anders: daar doet de verzekeraar een rentebelofte volgens de contractvoorwaarden.</p>
<h2>Wat kan een verzekering extra regelen?</h2>
<p>U kunt een [[begunstigde|begunstigde]] aanduiden: wie ontvangt de uitkering als de verzekerde overlijdt? Dat kan helpen om uw bedoeling voor uw partner of gezin vast te leggen. Het is geen automatische vrijstelling van erfbelasting. Familierecht, de precieze clausule en de gewestelijke fiscale regels blijven tellen.</p>
<p>Een levensverzekering kan ook een bijkomende overlijdensdekking bieden. De verzekerde uitkering kan daardoor verschillen van de waarde die u hebt opgebouwd. Daarvoor betaalt u doorgaans een premie; controleer wat verzekerd is en onder welke voorwaarden.</p>
<p>Sommige contracten laten u binnen dezelfde verzekering tussen fondsen wisselen of tak 21 en tak 23 combineren. Dat kan het beheer eenvoudiger maken. Het aantal beschikbare fondsen, de kosten van wisselen en eventuele voorwaarden verschillen per contract. Bij tak 21 kan een contractuele waarborg een troef zijn; bij een gewone tak 23 is er geen kapitaal- of rendementswaarborg.</p>
<h2>Wat betekent ‘kapitaalbescherming’?</h2>
<p>Sommige beleggingsproducten, ook in een verzekeringsvorm, vermelden kapitaalbescherming. Zo’n bescherming is niet hetzelfde als de rente- of kapitaalwaarborg van een tak 21-contract, en evenmin als een wettelijke garantieregeling. Bij een gestructureerd product geldt ze doorgaans alleen op de einddatum en op het werkelijk belegde bedrag, exclusief kosten. Wie eerder verkoopt, krijgt de marktwaarde van dat moment.</p>
<p>Lees welk percentage beschermd is en wie ervoor instaat. Als de uitgever of de instelling die bescherming biedt failliet gaat, kunt u ook bij ‘100 procent kapitaalbescherming’ een groot deel of alles verliezen. De gewone depositogarantie vergoedt dat beleggingsverlies niet.</p>
<h2>Wat staat daar tegenover?</h2>
<p>Naast de kosten van de fondsen kunnen instap-, contract-, dekkings- en afkoopkosten spelen. Op gewone individuele tak 21- en tak 23-premies geldt in de regel 2 procent [[premietaks|premietaks]]. Fiscale pensioenproducten hebben eigen regels; pensioenspaarverzekeringen zijn bijvoorbeeld vrijgesteld van die premietaks.</p>
<p>Ook bij rechtstreeks beleggen zijn er kosten en belastingen. Bij aankoop of verkoop kan beurstaks gelden. Op rente en dividenden is vaak roerende voorheffing verschuldigd. De vergelijking vraagt dus de totale rekening voor dezelfde inleg en dezelfde termijn, niet alleen één zichtbaar tarief.</p>
<p>Een niet-fiscale beleggingsverzekering is bovendien niet algemeen belastingvrij. De meerwaardebelasting omvat ook tak 21 en tak 23; de concrete heffing hangt samen met andere toepasselijke belastingen. Pensioensparen en langetermijnsparen vallen onder een ander fiscaal stelsel.</p>
${bite('verpakking','Vergelijk dezelfde afspraken',[
 ['Inhoud','Welke beleggingen en risico’s zitten erin?'],['Bestemming','Wie krijgt wat bij leven of overlijden?'],['Totale prijs','Fonds, contract, dekking en belasting samen.'],['Beschikbaarheid','Wanneer kunt u eruit, en wat kost dat?']
])}
<p>Een verzekering verdient haar plaats als de extra afspraken bij uw doel passen. Een fonds bij een bank kan passen als u vooral rechtstreeks in dat fonds wilt beleggen. De aanbieder of de verpakking alleen zegt nog niet welke keuze voor u de beste is.</p>`,
 beeld:null,
 bronnen:[bron('Wikifin — gestructureerde producten en kapitaalbescherming','https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/gestructureerde-producten'),bron('Wikifin — werking tak 23, begunstigde, looptijd en afkoop',U.verzekeren),bron('Wikifin — werking tak 21 en aanvullende dekkingen',U.tak21),bron('Wikifin — verschillen tak 21 en tak 23',U.takken),bron('FOD Financiën — meerwaardebelasting en vrijgestelde pensioenproducten',U.meerwaarde),...A('tak21-tak23').bronnen.filter(b=>/kosten|fisc|taks/i.test(b.label))]
});

/* Redactionele timing: bestaande relevante uitleg behouden; adviseur niet de protagonist maken. */
A('profiel').tekst=A('profiel').tekst.replace('Uw werkelijke beleggersprofiel stelt uw adviseur samen met u op, na een toets van uw kennis en ervaring en uw financiële situatie.', 'Voor een persoonlijk beleggingsvoorstel worden uw kennis en ervaring, financiële situatie, doelen en risicobereidheid samen onderzocht. Zo’n beoordeling verschilt van een voorbeeldaanpak kiezen.');
A('profiel').tekst=A('profiel').tekst.replace(/<p>Een \[\[risicoprofiel\|beleggersprofiel\]\] volgt[^<]+<\/p>/,
 bite('profiel','Wat u aankunt, is iets anders dan wat u durft',[
 ['Doel en termijn','Waarvoor is het geld, en wanneer hebt u het nodig?'],
 ['Financiële draagkracht','Kunt u verlies opvangen zonder uw buffer of andere doelen in gevaar te brengen?'],
 ['Kennis en ervaring','Begrijpt u het product, en hebt u er werkelijk in belegd? Lezen is geen beleggingservaring.'],
 ['Omgaan met risico','Wat doet u als uw belegging een kwart minder waard wordt?']
 ])+'<p>Een [[risicoprofiel|beleggersprofiel]] brengt deze afwegingen samen. Ook uw voorkeuren, bijvoorbeeld over duurzaamheid, tellen mee. Iemand kan veel durven maar weinig verlies kunnen dragen, of omgekeerd.</p>');
A('pensioensparen').tekst=A('pensioensparen').tekst.replace('Die bedragen vallen buiten deze les.','Het gebruikt een andere fiscale korf; de volgende les legt uit hoe u die ruimte beoordeelt.');
A('profiel').tekst=A('profiel').tekst.replace('<h2>Waaruit een profiel bestaat</h2>','');
A('profiel').beeld=null; // de scanbare afwegingen vervangen het oude, herhalende stroomschema.
A('eerste-jaar').hoofdstuk='samen';
// De expliciet genoemde casus maakt concentratierisico concreet; één inline verwijzing, geen extra aanbevelingsblok.
A('lotus').tekst=A('lotus').tekst.replace('toont het verhaal van Fortis.', 'toont <a class="verhaal-link" href="#/artikel/fortis">het verhaal van Fortis</a>.');
A('vastgoed').tekst=A('vastgoed').tekst.replace(/huur die vaak meestijgt met de index/g,'huur die onder voorwaarden via huurindexering kan stijgen');
A('opvolgen').tekst=A('opvolgen').tekst.replace('Ook het Norte-plan rekent met een aanpak die rustiger wordt naarmate het einde nadert.','Hoe en wanneer u afbouwt, hangt af van het doel en de ruimte om een tegenvaller op te vangen.');
A('aannames').hoofdstuk='opbrengst';
A('de-lijn').hoofdstuk='opbrengst';
/* De lezer onderzoekt de grafiek zelf. De aannames en beperkingen blijven integraal staan. */
A('de-lijn').tekst=A('de-lijn').tekst
 .replace('Ann, Dries en hun adviseur zijn verzonnen. Het gesprek laat zien welke vragen helpen om een berekening te begrijpen.', 'Ann en Dries zijn verzonnen. Hun vragen laten zien hoe u een berekening kunt onderzoeken.')
 .replace('De adviseur opent de uitgangspunten van de berekening. Ze bekijken er drie die veel verschil maken.', 'Samen openen ze de uitgangspunten van de berekening. Drie ervan maken veel verschil.')
 .replace('‘De bedragen in deze grafiek zijn euro’s van dat latere jaar,’ legt ze uit. ‘Het plan neemt aan dat de prijzen 2 procent per jaar stijgen.’ Ze laat de lijn zien die toont wat er nodig is om de [[koopkracht|koopkracht]] van vandaag te behouden.', 'Ann leest dat de bedragen euro’s van dat latere jaar zijn. Het plan neemt aan dat de prijzen 2 procent per jaar stijgen. Een tweede lijn toont wat er nodig is om de [[koopkracht|koopkracht]] van vandaag te behouden.')
 .replace('De adviseur toont dat de groeilijn in deze uitsnede zonder kosten en belasting rekent, en dat er een aparte verkenning bestaat die het effect van [[lopende-kosten|lopende kosten]] toont.', 'In de toelichting zien ze dat deze groeilijn zonder kosten en belasting rekent. Een aparte verkenning toont het effect van [[lopende-kosten|lopende kosten]].')
 .replace('‘Het is één voorbeeldpad,’ zegt ze. ‘Geen voorspelling, en geen kansberekening.’', 'De toelichting is duidelijk: één voorbeeldpad, geen voorspelling en geen kansberekening.')
 .replace('<h2>Wat er verandert aan tafel</h2>', '<h2>Van uitkomst naar afweging</h2>');

A('tak21-tak23').tekst=A('tak21-tak23').tekst.replace(/Hoe de meerwaardebelasting[^<]*laat dat voor uw eigen contract bevestigen\./g,'Gewone niet-fiscale tak 21- en tak 23-verzekeringen vallen ook onder de meerwaardebelasting. Andere toepasselijke heffingen en uitzonderingen bepalen de concrete behandeling.');

/* Kosten en belasting krijgen elk een eigen, materiële les. */
Object.assign(A('kosten'),{
 titel:'Beleggingskosten: wat betaalt u, en waarvoor?',
 inleiding:'Een instapkost ziet u meteen. Jaarlijkse kosten vallen minder op, maar werken elk jaar opnieuw door. Samen bepalen ze hoeveel van de opbrengst voor u overblijft.',
 kernidee:'Vergelijk alle kosten over eenzelfde termijn, voor eenzelfde bedrag.',
 tekst:`<p>Stelt een brochure 4 procent opbrengst voor, vraag dan wat daarvan al is afgehouden. Kosten kunnen in de koers van het fonds verwerkt zitten, apart van uw rekening gaan of van een premie worden afgetrokken. Dat maakt ze niet minder echt, alleen minder zichtbaar.</p>
<h2>Bij het begin, onderweg en bij het einde</h2>
<p><strong>Bij de start</strong> kunnen instapkosten spelen. Van een storting van € 1.000 met 2 procent instapkosten wordt, als die kosten van de storting worden afgehouden, € 980 belegd. Eventuele belastingen komen daar nog bij.</p>
<p><strong>Onderweg</strong> betaalt een fonds zijn beheer en werking uit het fondsvermogen. Die [[lopende-kosten|lopende kosten]] ziet u doorgaans niet als een aparte afschrijving: ze drukken de fondswaarde. Een verzekeringscontract of effectenrekening kan nog eigen kosten hebben. Controleer welke lagen het getoonde totaal omvat.</p>
<p><strong>Bij handelen of uitstappen</strong> kunnen transactiekosten, een afkoopvergoeding of andere voorwaarden spelen. Vooral als u het geld eerder nodig hebt dan voorzien, kunnen die zwaar wegen. Belastingen zijn een aparte kostensoort; ze hangen af van het product en de verrichting.</p>
<h2>Een klein percentage, elk jaar opnieuw</h2>
<p>Kosten verlagen het bedrag dat verder kan meegroeien. Daardoor verliest u ook de mogelijke toekomstige opbrengst op wat al aan kosten wegging. In de verkenning hieronder blijft het voorbeeldpad gelijk en verandert alleen de jaarlijkse kost. De berekening is afgeleid uit het plan; het is geen voorspelling van het rendement van een fonds.</p>
{{sim:kosten}}
<h2>Waar vindt u het totaal?</h2>
<p>Vraag het essentiële-informatiedocument en de kostenopgave voor uw eigen bedrag en termijn. Kijk naar het totaal in euro én naar de uitsplitsing. Zijn de fondskosten inbegrepen? Komen er contractkosten bij? Wat betaalt u als u na drie jaar in plaats van na tien jaar stopt?</p>
${bite('kosten','Drie dingen om naast elkaar te leggen',[
 ['Dezelfde basis','Eenzelfde bedrag, termijn en soort belegging.'],['Alle lagen','Fonds, rekening of verzekering en eventuele dekking.'],['De dienstverlening','Wat krijgt u voor beheer, begeleiding of andere afspraken?']
])}
<p>Een duurder product kan diensten of waarborgen bevatten die u nuttig vindt. Ze moeten dan wel duidelijk zijn en voor u hun prijs waard zijn. Lagere kosten garanderen geen betere belegging; onnodige kosten maken het wel moeilijker om met dezelfde beleggingen hetzelfde nettoresultaat te halen.</p>`,
 beeld:null,
 bronnen:A('kosten').bronnen,
 vervolg:{type:'lezen',id:'belastingen',zin:'Kosten zijn niet de hele rekening. Wanneer houdt ook de fiscus iets af?'}
});

const nieuw=(id,hoofdstuk,titel,inleiding,kernidee,tekst,bronnen,vervolg,soort='uitleg')=>({id,hoofdstuk,soort,titel,inleiding,kernidee,tekst,beeld:null,bronnen,vervolg,actualiteit:/belastingen|langetermijnsparen|zelfstandigen/.test(id)?'Belgische regels, nagekeken op 5 november 2026.':'',niveau:'basis'});
C.artikels.push(nieuw('belastingen','opbrengst','Belasting op sparen en beleggen: wanneer betaalt u wat?',
 'Bij storten, bij een uitkering of bij verkoop: de fiscus kan op verschillende momenten meerekenen. Het helpt om die momenten uit elkaar te houden.',
 'Een tarief zegt weinig zonder te weten waarop het wordt berekend.',
 `<p>Een rente van 3 procent, een fonds dat in waarde stijgt en een belastingvermindering zijn drie verschillende dingen. Ook fiscaal worden ze anders behandeld. Hieronder gaat het om een particuliere belegger in België; beroepsmatig of speculatief handelen kan onder andere regels vallen.</p>
<h2>Wanneer u instapt of handelt</h2>
<p>Bij de aankoop of verkoop van effecten kan beurstaks gelden. Het tarief hangt onder meer af van het soort effect en de juridische vorm. Een ETF heeft dus niet automatisch één vast beurstakstarief. Bij de oorspronkelijke uitgifte van een aandeel of obligatie geldt die taks niet.</p>
<p>Voor gewone individuele tak 21- en tak 23-verzekeringen geldt doorgaans een [[premietaks|premietaks]] van 2 procent op de storting. Pensioenspaarverzekeringen zijn daarvan vrijgesteld. Andere pensioenregelingen volgen hun eigen regels. Instapkosten zijn nog iets anders dan belasting.</p>
<h2>Wanneer u rente of dividend krijgt</h2>
<p>Op de meeste rente en dividenden geldt 30 procent [[roerende-voorheffing|roerende voorheffing]]. Ontvangt u € 100 bruto rente waarop dat tarief van toepassing is, dan blijft € 70 over. Dat rekenvoorbeeld zegt niets over uw uiteindelijke koopkracht.</p>
<p>Voor gereglementeerde spaarrekeningen is in 2026 de eerste € 1.020 rente per persoon vrijgesteld. Op de rente erboven geldt 15 procent. Tel de rente over uw verschillende rekeningen samen; meerdere banken geven niet meerdere persoonlijke vrijstellingen.</p>
<p>Voor bepaalde aandelendividenden bestaat in 2026 een vrijstelling van € 833 per persoon. De bank houdt doorgaans eerst voorheffing in; de toepasselijke voorheffing vraagt u terug via de belastingaangifte. De vrijstelling geldt niet zomaar voor elke fondsuitkering of elk dividend.</p>
<h2>Wanneer u met winst verkoopt</h2>
<p>De [[meerwaardebelasting|meerwaardebelasting]] heeft een standaardtarief van 10 procent. Voor gerealiseerde meerwaarden van 2026 is de eerste € 10.000 per persoon vrijgesteld. Dit is een vrijstelling op winst, niet op de verkoopopbrengst. Inhouding door een bank en wat u uiteindelijk verschuldigd bent, kunnen verschillen: een inhouding op vrijgestelde winst kan via de aangifte teruggevraagd worden.</p>
<p>Voor bezittingen van vóór 2026 speelt de waarde op 31 december 2025 een rol. Er zijn voorwaarden voor het verrekenen van minderwaarden en voor het gebruik van de oorspronkelijke aankoopwaarde. Bewaar daarom aankoopbewijzen en jaaroverzichten. Kosten en taksen mag u bij de fiscale berekening van deze meerwaarde niet aftrekken.</p>
<p>Bij fondsen met obligaties kan bovendien de zogeheten Reyndersheffing spelen: 30 procent op het belastbare obligatie- en cashgedeelte van de opbrengst. De drempel en berekening hangen af van het fonds en de aankoopdatum. Tel dus niet zelf eenvoudigweg 10 en 30 procent op de hele winst op; de toepasselijke belastinggrondslag moet worden bepaald.</p>
<h2>Wanneer u fiscaal voor uw pensioen spaart</h2>
<p>Pensioensparen en langetermijnsparen zijn vrijgesteld van deze meerwaardebelasting. Daar staan eigen voorwaarden en een latere heffing tegenover. Een belastingvermindering op uw storting is geen gegarandeerd beleggingsrendement. Een niet-fiscale tak 21- of tak 23-verzekering is door haar verzekeringsvorm alleen niet vrijgesteld.</p>
${bite('belastingen','Lees de rekening in drie delen',[
 ['Waarop?','Storting, rente, dividend of gerealiseerde winst.'],['Wanneer?','Bij instap, uitkering, verkoop of op een fiscale einddatum.'],['Wat moet ik zelf doen?','Bewijzen bewaren, vrijstellingen benutten en zo nodig aangeven.']
])}
<p>Bij buitenlandse rekeningen, een verhuis of bijzondere transacties kunnen bijkomende aangifteverplichtingen spelen. Deze uitleg is een vertrekpunt voor een gewone Belgische spaarder, geen volledige berekening van uw persoonlijke belasting.</p>`,
 [bron('Wikifin — beurstaks, roerende voorheffing, vrijstellingen en obligatiefondsen',U.belasting),bron('FOD Financiën — geldende meerwaardebelasting, vrijstellingen en aangifte',U.meerwaarde)],
 {type:'lezen',id:'belastingbrief',zin:'Een eenvoudige verkoop laat zien waarom ingehouden belasting niet altijd de eindafrekening is.'}));

C.artikels.push(nieuw('langetermijnsparen','bouwstenen','Langetermijnsparen: wat levert de fiscale ruimte u op?',
 'Naast pensioensparen bestaat een tweede persoonlijke fiscale spaarmogelijkheid, via een levensverzekering. Of u er voordeel uit haalt, hangt ook af van uw inkomen en soms van uw woonlening.',
 'Controleer eerst uw fiscale ruimte. Kies daarna pas het contract en de storting.',
 `<p>Langetermijnsparen is een fiscaal stelsel voor de opbouw van aanvullend pensioenkapitaal via een levensverzekering. Het kan in [[tak21|tak 21]], met een contractuele renteafspraak, of in [[tak23|tak 23]], waarbij uw geld de gekozen fondsen volgt. Het fiscale voordeel maakt de beleggingen eronder niet zekerder.</p>
<h2>30 procent, binnen uw eigen grens</h2>
<p>Voor inkomstenjaar 2026 bedraagt de belastingvermindering 30 procent van de aanvaarde premie. Het absolute jaarmaximum is € 2.450, maar uw persoonlijke grens hangt af van uw beroepsinkomen. Een storting van € 1.000 geeft, als u voldoende fiscale ruimte en verschuldigde personenbelasting hebt, € 300 belastingvermindering. Dat is een voordeel op de storting, geen jaarlijks rendement van 30 procent.</p>
<p>U hoeft niet elk jaar het maximum te storten. Ook een lager bedrag of een jaar overslaan kan, binnen de afspraken van het contract. Geld dat u binnenkort nodig hebt, wordt door het belastingvoordeel geen geschikte pensioenreserve.</p>
<h2>Wat doet uw woonlening?</h2>
<p>Bij oudere woonleningen kunnen de kapitaalaflossingen, rente en premies voor een schuldsaldoverzekering dezelfde fiscale korf al vullen. Dan is er mogelijk geen ruimte meer voor een bijkomend voordeel op langetermijnsparen.</p>
<p>Voor een Vlaamse lening voor de eigen woning van vóór 2016 is dit een belangrijk aandachtspunt. Leningen voor de eigen woning vanaf 2016 beïnvloeden die korf in Vlaanderen niet op dezelfde manier. In andere gewesten en bij andere soorten vastgoed gelden eigen regels. Kijk daarom naar de datum, het doel en het fiscale stelsel van de lening, niet alleen naar de maandelijkse aflossing.</p>
<h2>Een voordeel nu, een rekening later</h2>
<p>Een fiscaal contract moet onder meer minstens tien jaar lopen en vóór uw 65ste worden gesloten. Er gelden voorwaarden voor wie bij leven en overlijden begunstigde mag zijn. Een feitelijk samenwonende partner kan niet zonder meer als begunstigde bij overlijden worden aangeduid binnen de fiscale voorwaarden.</p>
<p>Begon het contract vóór uw 55ste, dan volgt normaal op 60 jaar een heffing van 10 procent op de belastbare opbouw. Bij een latere start gebeurt dat doorgaans na tien jaar. De precieze belastbare basis hangt af van de contractvorm. Wie vroeg afkoopt, kan een ongunstige fiscale rekening en afkoopkosten krijgen. Dit is dus geen vrij beschikbare spaarrekening.</p>
<h2>Vergelijk het hele contract</h2>
<p>Op de premies geldt doorgaans 2 procent premietaks. Instapkosten, beheerkosten en eventuele dekkingskosten komen daar nog bij. Vraag hoeveel van uw storting werkelijk wordt opgebouwd, welke rente of fondsen gelden en wat een vervroegde opname betekent.</p>
<p>Bij tak 21 is de contractuele waarborg afhankelijk van de verzekeraar; bij tak 23 kunnen de fondsen dalen en is er normaal geen kapitaalwaarborg. Langetermijnsparen heeft wel een eigen fiscaal stelsel en is vrijgesteld van de algemene meerwaardebelasting op financiële activa.</p>
${bite('lts','Vóór uw eerste storting',[
 ['Ruimte','Hoeveel laat mijn inkomen toe, en is de korf al gebruikt?'],['Termijn','Kan dit geld werkelijk voor mijn pensioen blijven staan?'],['Netto-opbouw','Wat blijft na premiebelasting en kosten over?']
])}
<p>Pensioensparen gebruikt een andere fiscale korf en kan, als aan de voorwaarden is voldaan, naast langetermijnsparen bestaan. Het gaat om twee regelingen, niet om twee keer hetzelfde voordeel op één storting.</p>`,
 [bron('Wikifin — langetermijnsparen, voorwaarden en woonlening',U.lts),bron('Wikifin — werking en kosten langetermijnsparen',U.ltswerking),bron('FOD Financiën — vrijgestelde pensioenproducten',U.meerwaarde)],
 {type:'lezen',id:'afbetaald',zin:'Waarom twee mensen met dezelfde storting toch een ander belastingvoordeel kunnen krijgen.'}));

C.artikels.push(nieuw('zelfstandigen','bouwstenen','Pensioen opbouwen als zelfstandige: VAPZ, POZ of IPT?',
 'Uw beroepsstatuut bepaalt welke mogelijkheden openstaan. Begin bij wie de premie betaalt en hoe het voordeel werkt; de afkortingen worden dan veel eenvoudiger.',
 'Een aftrekbare beroepskost en een belastingvermindering zijn niet hetzelfde.',
 `<p>Een zelfstandige kan naast het wettelijke pensioen een aanvullend pensioen opbouwen. Er zijn regelingen die aan uw beroepsactiviteit vasthangen en persoonlijke regelingen zoals pensioensparen. Ze hebben elk eigen grenzen. Een groter fiscaal voordeel is niet automatisch een betere bestemming voor geld dat uw zaak binnenkort nodig heeft.</p>
<h2>VAPZ: u bouwt zelf op</h2>
<p>Het [[vapz|Vrij Aanvullend Pensioen voor Zelfstandigen]] is een individuele pensioenovereenkomst voor zelfstandigen die aan de voorwaarden voldoen. Binnen het bijdrageplafond kan de premie als beroepskost aftrekbaar zijn. Uw wettelijke sociale bijdragen moeten daarvoor effectief en volledig betaald zijn.</p>
<p>De aftrek verlaagt het belastbare beroepsinkomen. Daardoor kan de personenbelasting dalen en kan er ook een effect zijn op de sociale bijdragen. Dat effect verschijnt niet noodzakelijk meteen. Er is geen vast voordeelpercentage dat voor elke zelfstandige hetzelfde is. Op de VAPZ-bijdrage geldt geen premietaks.</p>
<p>Een sociaal VAPZ bevat ook een solidariteitsluik, bijvoorbeeld bescherming van verdere pensioenopbouw bij arbeidsongeschiktheid. Minstens 10 procent van de bijdrage gaat naar dat luik. U kunt onder voorwaarden meer bijdragen, maar niet elke euro wordt pensioenreserve. Kijk dus ook naar wat de extra bescherming precies inhoudt.</p>
<h2>Zonder vennootschap: de POZ</h2>
<p>Een zelfstandige die zijn activiteit als natuurlijk persoon uitoefent, kan aanvullend een [[poz|Pensioenovereenkomst voor Zelfstandigen]] sluiten. De wettelijke benaming is VAPZNP. De premie kan 30 procent belastingvermindering opleveren in de personenbelasting, voor zover onder meer de 80%-grens wordt gerespecteerd en u voldoende belasting verschuldigd bent.</p>
<p>Dat is een vermindering van de belasting, niet dezelfde aftrek als bij het VAPZ. Volgens de actuele FSMA-toelichting is op deze bijdragen geen premietaks verschuldigd. Bij uitbetaling gelden wel belastingen en sociale inhoudingen. De rekening eindigt dus niet bij de vermindering op de premie.</p>
<h2>Met vennootschap: de IPT</h2>
<p>Een zelfstandige bedrijfsleider kan ook via zijn vennootschap een aanvullend pensioen opbouwen, bijvoorbeeld met een [[ipt|Individuele Pensioentoezegging]]. Bij een door de vennootschap betaalde premie betaalt de onderneming voor een pensioenrecht van de bedrijfsleider. Het geld is daarna geen vrij beschikbare bedrijfskas meer.</p>
<p>Binnen de wettelijke voorwaarden, waaronder de 80%-regel, kan de bijdrage aftrekbaar zijn voor de vennootschap. Op de bijdragen geldt een premietaks van 4,4 procent. Bij uitbetaling hangen de belasting en sociale inhoudingen onder meer af van leeftijd, loopbaan en activiteit. Het voordeel voor de onderneming en het netto pensioen voor u zijn twee verschillende berekeningen.</p>
<h2>Wat betekent die 80%-grens?</h2>
<p>Uw wettelijke en aanvullende pensioen worden samen omgerekend naar een jaarlijkse rente. Die mag in de regel niet boven 80 procent van het toepasselijke referentie-inkomen uitkomen. Voor bedrijfsleiders wordt gekeken naar de laatste normale bruto jaarbezoldiging; voor de POZ naar het gemiddelde belastbare beroepsinkomen van de drie voorgaande jaren. Bestaande aanvullende pensioenrechten tellen mee. Het VAPZ heeft een eigen bijdrageplafond; pensioensparen en langetermijnsparen behoren tot de derde pijler en tellen niet mee in deze 80%-berekening.</p>
${bite('zelfstandig','Drie vragen vóór een pensioenpremie',[
 ['Wie betaalt?','U persoonlijk of uw vennootschap?'],['Welk voordeel?','Beroepskost, vennootschapskost of belastingvermindering?'],['Wat blijft beschikbaar?','Voor uw bedrijf, gezin en pensioen — na kosten en latere heffingen.']
])}
<p>Het aanvullende pensioen wordt in beginsel gekoppeld aan uw pensionering uitbetaald. Voor sommige vastgoeddoeleinden bestaan bijzondere mogelijkheden, geen vrije afkoop. De voorwaarden en latere netto-uitkering verdienen dus evenveel aandacht als het belastingvoordeel vandaag. Een accountant en financieel adviseur kunnen de samenhang met uw beroepsinkomen en bestaande pensioenrechten nakijken.</p>`,
 [bron('FSMA — mogelijkheden voor zelfstandigen',U.zelfstandig),bron('FSMA — fiscale regels VAPZ',U.vapz),bron('FSMA — sociaal VAPZ',U.sociaal),bron('FSMA — fiscale regels VAPZNP/POZ',U.poz),bron('FSMA — bedrijfsleiders en IPT',U.ipt),bron('FSMA — de 80%-regel',U.grens)],
 {type:'lezen',id:'twee-zaken',zin:'Een zelfstandig ontwerper en een zaakvoerder leggen hun pensioenplannen naast elkaar.'}));

/* Nieuwe verhalen leggen één keuze uit, zonder verkoopsituatie of gedramatiseerde testimonial. */
C.artikels.push(nieuw('belastingbrief','opbrengst','De verkoop was klaar. De belastingrekening nog niet.',
 'Lena verkoopt aandelen met winst. Er wordt belasting ingehouden. Pas bij haar jaaroverzicht ziet ze waarom dat nog niet haar definitieve rekening is.', '',
 `<p class="fictie">Fictief voorbeeld. Lena en de verrichtingen zijn verzonnen. De bedragen illustreren de Belgische meerwaardebelasting voor 2026.</p>
<p>Lena uit Mechelen koopt in februari 2026 voor € 5.000 aandelen. In september verkoopt ze die voor € 7.000. Voor de eenvoud zijn er in dit voorbeeld geen kosten en geen andere verrichtingen. Ze heeft € 2.000 winst gerealiseerd: het verschil tussen aankoop en verkoop.</p>
<h2>Niet 10 procent van de hele verkoop</h2>
<p>Haar bank past in dit voorbeeld het stelsel met inhouding toe. Ze houdt 10 procent van de fiscale meerwaarde in: € 200. Niet € 700 op de volledige verkoopwaarde. Het verschil lijkt vanzelfsprekend zodra ze het uitschrijft, maar op een rekeningafschrift lopen verkoopopbrengst, winst en belasting gemakkelijk door elkaar.</p>
<p>Lena denkt eerst dat het daarmee afgehandeld is. Dan leest ze over de persoonlijke jaarvrijstelling van € 10.000 aan gerealiseerde meerwaarden voor 2026. Haar winst blijft daar ruim onder. De bankinhouding en de belasting die ze uiteindelijk verschuldigd is, blijken twee verschillende dingen.</p>
<h2>Het jaar telt mee</h2>
<p>In dit eenvoudige voorbeeld heeft Lena geen andere gerealiseerde meerwaarden. Ze kan de ingehouden € 200 daarom via haar belastingaangifte terugvragen. Had ze ook bij een andere bank winst gerealiseerd, dan moest ze haar totale persoonlijke positie bekijken. Een tweede bank maakt geen tweede vrijstelling.</p>
<p>Bij het andere stelsel vraagt een klant dat de bank niet inhoudt. Dat ontslaat hem niet van aangifteverplichtingen. Voor Lena is de belangrijkste les niet welk stelsel ze ‘moet’ kiezen. Het is dat ze moet weten wat al is ingehouden en wat ze zelf nog moet aangeven of terugvragen.</p>
<h2>Wat ze voortaan bewaart</h2>
<p>Ze maakt één map voor aankoopbewijzen, verkoopafrekeningen en jaaroverzichten. Voor oudere beleggingen bewaart ze ook de waarde op 31 december 2025, omdat die bij de fiscale berekening van belang kan zijn. Een stijgende koers en een gerealiseerde meerwaarde zijn niet hetzelfde moment.</p>
<p>Het voorbeeld gaat uitsluitend over deze meerwaardebelasting op een gewone aandelenverkoop. Dividenden, obligatiefondsen, buitenlandse inkomsten en pensioenproducten vragen elk hun eigen behandeling. Lena hoeft niet elk tarief uit het hoofd te kennen. Ze wil kunnen herkennen welke vraag bij welke afrekening hoort.</p>`,
 [bron('FOD Financiën — meerwaardebelasting, inhouding, vrijstelling en aangifte',U.meerwaarde)],{type:'lezen',id:'belastingen',zin:'Van beurstaks tot roerende voorheffing: de les plaatst elke belasting bij het juiste moment.'},'verhaal'));
C.artikels.push(nieuw('afbetaald','bouwstenen','De laatste aflossing opent een andere vraag',
 'Annelies betaalt haar woonlening af. Het maandbedrag komt vrij. Betekent dat ook dat ze nu fiscaal kan langetermijnsparen?', '',
 `<p class="fictie">Fictief verhaal. Annelies, Bram en hun leningen zijn verzonnen. De situatie illustreert waarom de fiscale korf persoonlijk moet worden nagekeken.</p>
<p>Annelies is 48 en woont in Leuven. Haar lening voor de eigen woning dateert van 2011. Deze maand betaalt ze de laatste aflossing. Ze heeft meer financiële ruimte, maar wil niet meteen een nieuw vast bedrag toezeggen. Eerst legt ze haar jaarlijkse belastingoverzicht naast de afrekeningen van de lening.</p>
<h2>Een maandbudget is geen fiscale korf</h2>
<p>Bij haar oude Vlaamse woonlening konden betalingen voor de lening en langetermijnsparen dezelfde fiscale korf gebruiken. Zolang die ruimte door de lening werd ingenomen, leverde een extra storting voor langetermijnsparen niet automatisch extra belastingvermindering op. Nu de lening afloopt, kan er ruimte ontstaan.</p>
<p>Dat is nog niet hetzelfde als zonder meer het jaarmaximum mogen storten. Haar beroepsinkomen bepaalt mee hoeveel fiscaal in aanmerking komt. Ook het laatste jaar met leningbetalingen vraagt aandacht. Ze wil het bedrag voor dat jaar laten berekenen vóór ze een premie vastlegt.</p>
<h2>De buurman heeft een ander antwoord</h2>
<p>Bram, haar buurman, leent sinds 2018 voor zijn Vlaamse eigen woning. Hij zegt dat zijn woonlening langetermijnsparen niet in de weg staat. Dat kan in zijn situatie kloppen: voor Vlaamse leningen voor de eigen woning vanaf 2016 geldt die wisselwerking niet op dezelfde manier.</p>
<p>Ze hebben dus niet één van beiden iets fout begrepen. De datum en fiscale behandeling van hun leningen verschillen. Alleen hun maandaflossingen vergelijken had dat niet aan het licht gebracht.</p>
<h2>Van ruimte naar een bewuste keuze</h2>
<p>Annelies kijkt vervolgens waarvoor het geld dient. Haar noodbuffer blijft apart. Ze wil een deel bewaren voor werken aan de woning en kan alleen het deel voor haar pensioen lang vastzetten. Het belastingvoordeel verandert die verdeling niet.</p>
<p>Pas daarna vergelijkt ze contracten: tak 21 of tak 23, kosten, begunstiging, einddatum en latere belasting. Met voldoende fiscale ruimte en verschuldigde personenbelasting kan een aanvaarde premie 30 procent vermindering geven. Daartegenover staan voorwaarden, kosten en een heffing later.</p>
<p>De afbetaalde lening is voor haar geen automatische koopaanleiding. Ze is een aanleiding om opnieuw te kijken: hoeveel ruimte heb ik nu, en welk doel wil ik ermee financieren?</p>`,
 [bron('Wikifin — langetermijnsparen en de fiscale korf van woonleningen',U.lts)],{type:'lezen',id:'langetermijnsparen',zin:'Hoe fiscale ruimte, looptijd en contractkosten samen bepalen wat langetermijnsparen voor u doet.'},'verhaal'));
C.artikels.push(nieuw('twee-zaken','bouwstenen','Zelfstandig, allebei. Toch geen identiek pensioenplan.',
 'Sofie werkt op eigen naam. Karim heeft een vennootschap. Ze willen allebei een pensioenpot opbouwen, maar komen bij verschillende mogelijkheden uit.', '',
 `<p class="fictie">Fictief verhaal. Sofie, Karim en hun ondernemingen zijn verzonnen. Er worden geen persoonlijke fiscale voordelen of opbrengsten berekend.</p>
<p>Sofie is zelfstandig grafisch ontwerper in Gent. Karim heeft een installatiebedrijf in een vennootschap. Aan het einde van het jaar praten ze over hun pensioen. Een klant had Sofie verteld over een IPT. ‘Dat moet jij ook doen’, zei hij. Maar kan dat wel op dezelfde manier?</p>
<h2>Eerst de betaler</h2>
<p>Bij Karims pensioenplan kan zijn vennootschap premie betalen voor een aanvullend pensioen als bedrijfsleider. Die uitgave en de fiscale voorwaarden worden op het niveau van de onderneming bekeken. Het opgebouwde recht is bedoeld voor zijn pensioen, niet voor een nieuwe bestelwagen volgend voorjaar.</p>
<p>Sofie oefent haar activiteit als natuurlijk persoon uit. Zij heeft niet dezelfde vennootschap die een IPT voor haar kan financieren. Ze kijkt naar een VAPZ en eventueel een POZ. Dat zij geen IPT via een eigen vennootschap heeft, betekent niet dat zij geen aanvullend pensioen kan opbouwen.</p>
<h2>Dezelfde storting is niet hetzelfde voordeel</h2>
<p>Het VAPZ kan binnen de voorwaarden als beroepskost aftrekbaar zijn. De POZ kan een belastingvermindering geven. Dat zijn verschillende manieren waarop een premie fiscaal meetelt. Een reclamepercentage volstaat niet om te weten hoeveel er voor Sofie netto verandert.</p>
<p>Karim heeft bovendien eerdere pensioenrechten als werknemer. Ook die kunnen relevant zijn voor de ruimte van zijn huidige pensioenregeling. ‘Ik stort hetzelfde als mijn collega’ blijkt daardoor geen goede berekening. Hun inkomen, loopbaan en bestaande opbouw verschillen.</p>
<h2>Wat de zaak zelf nodig heeft</h2>
<p>Ze hebben wel een gemeenschappelijke vraag: welk geld kan werkelijk voor later blijven staan? Sofie reserveert eerst voor belastingen en rustige maanden. Karim houdt rekening met de buffer van zijn bedrijf en geplande investeringen. Een aftrekbare premie lost een tekort aan werkkapitaal niet op.</p>
<p>Voor de rest vergelijken ze de opbouw, bescherming bij tegenslag, kosten en heffingen bij uitbetaling. Sofie vraagt wat het solidariteitsluik van een sociaal VAPZ inhoudt. Karim wil weten welke grenzen en voorwaarden zijn vennootschap moet respecteren.</p>
<p>Beiden willen dus een pensioen opbouwen, maar hoeven niet hetzelfde product te hebben. De namen zijn pas bruikbaar nadat duidelijk is wie kan deelnemen, wie betaalt en wat het geld later moet doen.</p>`,
 [bron('FSMA — mogelijkheden aanvullend pensioen voor zelfstandigen',U.zelfstandig),bron('FSMA — de 80%-regel en bestaande pensioenopbouw',U.grens),bron('FSMA — fiscale regels VAPZ',U.vapz),bron('FSMA — fiscale regels POZ',U.poz),bron('FSMA — fiscale regels bedrijfsleiders',U.ipt)],{type:'lezen',id:'zelfstandigen',zin:'De regelingen naast elkaar: wie betaalt, welk voordeel geldt en wat zijn de grenzen?'},'verhaal'));

/* Korte begrippen: betekenis eerst; de verdiepende les is steeds een bewuste keuze. */
Object.assign(C.begrippen,{
 indexfonds:{term:'Indexfonds',betekenis:'Een beleggingsfonds dat het verloop van een bepaalde beursindex zo dicht mogelijk probeert te volgen. Het fonds bezit beleggingen volgens die index, of volgt haar via een andere toegelaten methode. Het resultaat kan door kosten en andere verschillen afwijken. Een ETF kan een indexfonds zijn; niet elke ETF volgt een index.',artikel:'actief-index'},
 begunstigde:{term:'Begunstigde',betekenis:'De persoon die volgens een levensverzekeringscontract de afgesproken uitkering ontvangt bij leven of overlijden van de verzekerde. De clausule, het familierecht en de fiscale regels bepalen mee wat mogelijk is. Iemand aanduiden geeft niet automatisch een vrijstelling van erfbelasting.',artikel:'verpakking'},
 premietaks:{term:'Premietaks',betekenis:'Belasting op een verzekeringspremie, los van de kosten van de verzekeraar. Bij gewone individuele tak 21 en tak 23 geldt doorgaans 2 procent. Voor fiscale pensioenregelingen kunnen andere tarieven of vrijstellingen gelden.',artikel:'belastingen'},
 meerwaardebelasting:{term:'Meerwaardebelasting',betekenis:'Belasting op gerealiseerde winst bij een verkoop of andere belastbare overdracht van financiële activa. In België geldt een standaardtarief van 10 procent, met voor 2026 een persoonlijke jaarvrijstelling van € 10.000. Uitzonderingen, andere heffingen en de aankoopdatum beïnvloeden de berekening. Niet alle koersstijgingen zijn onmiddellijk belast.',artikel:'belastingen'},
 vapz:{term:'VAPZ',betekenis:'Vrij Aanvullend Pensioen voor Zelfstandigen. Een individuele pensioenregeling waarvan de premie binnen voorwaarden en grenzen als beroepskost aftrekbaar kan zijn. Er gelden eigen bijdrageplafonds en heffingen bij uitbetaling.',artikel:'zelfstandigen'},
 poz:{term:'POZ',betekenis:'Pensioenovereenkomst voor Zelfstandigen, ook VAPZNP genoemd. Een aanvullende pensioenregeling voor zelfstandigen die als natuurlijk persoon werken, naast het VAPZ. De premie kan binnen de voorwaarden 30 procent belastingvermindering opleveren.',artikel:'zelfstandigen'},
 ipt:{term:'IPT',betekenis:'Individuele Pensioentoezegging. Een onderneming kan zo voor een zelfstandige bedrijfsleider een aanvullend pensioen financieren. Fiscale aftrekbaarheid is aan voorwaarden en grenzen gebonden; het is geen vrij opneembare bedrijfsspaarrekening.',artikel:'zelfstandigen'}
});
/* Alleen gericht, één koppeling van hetzelfde kernbegrip per stuk. Geen automatische links op ieder financieel woord. */
for(const id of ['buffett','bouwstenen','nijsmans','eerste-jaar']) {
 const a=A(id);if(!a.tekst.includes('[[indexfonds|')) a.tekst=a.tekst.replace(/(?<!\[\[)(indexfonds(?:en)?)/i,(_,w)=>`[[indexfonds|${w}]]`);
}
A('bouwstenen').tekst=A('bouwstenen').tekst.replace('een index volgen','een [[index|index]] volgen');
A('eerste-jaar').tekst=A('eerste-jaar').tekst.replace('een wereldindex','een [[index|wereldindex]]');

/* Vijf herkenbare vrijwillige kennischecks. Geen vragen tussendoor in de artikels. */
const Q=window.NORTE_CHECKS;
Q.obligaties.verder='actief-index';Q.obligaties.verderLabel='Verder met actief of index';
const sit=(id,rij,context,vraag,opties,juist,uitleg)=>({id,rij,context,vraag,opties,juist,uitleg});
Q.begin={naam:'De eerste keuzes',les:'sparen-of-beleggen',verder:'spaarrekening',uitnodiging:'Welk geld kunt u laten beleggen?',situaties:[
 sit('datum','Doel en termijn','Eva betaalt over zes maanden een aannemer. Het geld staat nu op een spaarrekening.','Maakt een fonds dat ze elke dag kan verkopen dit geld even zeker beschikbaar?', ['Ja, dagelijks verkopen betekent zonder verlies terugkrijgen','Nee, de waarde kan net voor de betaling lager zijn','Ja, als het fonds veel aandelen bevat'],1,'Dagelijks kunnen verkopen zegt iets over beschikbaarheid, niet over de prijs. Een vaste betaaldeadline laat weinig ruimte om een koersdaling uit te zitten.'),
 sit('buffer','Een onverwachte uitgave','Koen heeft geld voor zijn pensioen en een aparte reserve voor een defecte auto.','Welke eigenschap weegt het zwaarst voor die autoreserve?', ['De hoogste mogelijke opbrengst','Snel beschikbaar zijn zonder afhankelijkheid van beurskoersen','Een zo lang mogelijke looptijd'],1,'Een buffer dient voor onverwachte uitgaven. De zekerheid om hem te kunnen gebruiken weegt daar zwaarder dan de kans op een hogere beursopbrengst.'),
 sit('rente','Rente en koopkracht','Op Lies’ rekening staat na een jaar meer geld. De prijzen van wat zij koopt zijn nog sterker gestegen.','Is haar koopkracht gestegen?', ['Ja, meer euro’s is meer koopkracht','Dat hangt alleen van de bank af','Nee, met haar saldo kan ze minder kopen'],2,'Het bedrag en de koopkracht zijn verschillende dingen. Als de prijzen sterker stijgen dan uw saldo, kunt u met dat hogere saldo minder kopen.')
]};
Q.opbrengst={naam:'Opbrengsten en kosten',les:'rendement',verder:'tijd',uitnodiging:'Wat houdt u werkelijk over?',situaties:[
 sit('groei','Groei op groei','Een bedrag brengt iets op en die opbrengst blijft mee belegd.','Wat kan er het volgende jaar gebeuren?', ['Alleen de oorspronkelijke inleg kan opbrengen','Ook de eerdere opbrengst kan opbrengen — of in waarde dalen','Dezelfde winst is nu gegarandeerd'],1,'Bij samengestelde groei kan ook de eerdere opbrengst verder meewerken. Bij beleggingen blijft de waarde schommelen; de groei is niet gegarandeerd.'),
 sit('kost','Jaarlijkse kosten','Twee fictieve beleggingen volgen exact hetzelfde pad vóór kosten. Alleen de jaarlijkse kosten verschillen.','Wat doen hogere jaarlijkse kosten?', ['Ze verminderen de waarde én wat daarna nog kan meegroeien','Ze spelen alleen bij de eerste storting','Ze veranderen het nettoresultaat niet'],0,'Kosten verdwijnen uit de belegging. Op dat bedrag kan daarna ook geen toekomstige opbrengst meer ontstaan. Het voorbeeld zegt niets over welk werkelijk product beter presteert.'),
 sit('fiscaal','Belastingvoordeel','Een aanvaarde pensioenstorting geeft in dit voorbeeld 30 procent belastingvermindering.','Betekent dat 30 procent jaarlijks beleggingsrendement?', ['Ja, elk jaar op het hele kapitaal','Alleen bij een verzekering','Nee, het is een fiscaal voordeel op de storting, met voorwaarden'],2,'Belastingvermindering verlaagt verschuldigde belasting. Zij is geen jaarlijks rendement op uw pensioenpot; kosten, beleggingsresultaten en latere heffingen blijven meetellen.')
]};
Q.risico={naam:'Risico en spreiding',les:'spreiding',verder:'daling',uitnodiging:'Hoe afhankelijk bent u van één belegging?',situaties:[
 sit('bedrijven','Eén of veel bedrijven','Eén onderneming in een breed aandelenfonds raakt in moeilijkheden.','Wat kan spreiding hier doen?', ['Het fonds kan nooit meer dalen','De afhankelijkheid van die ene onderneming verkleinen','Elk verlies bij die onderneming terugbetalen'],1,'Spreiding maakt één onderneming minder bepalend. Ze neemt een brede beursdaling of andere gemeenschappelijke risico’s niet weg.'),
 sit('herstel','Daling en herstel','Een fictieve belegging daalt van € 100 naar € 80. Daarna stijgt ze met 20 procent.','Is ze terug op € 100?', ['Ja, −20 % en +20 % heffen elkaar op','Nee, ze staat op € 96','Nee, ze staat op € 80'],1,'20 procent van € 80 is € 16. Het bedrag wordt dus € 96. Van € 80 terug naar € 100 vraagt een stijging van 25 procent.'),
 sit('blijvend','Een vertrouwde naam','Een bekend bedrijf keert al lang dividend uit.','Is dat een garantie dat het aandeel herstelt na een daling?', ['Ja, een bekend merk herstelt altijd','Ja, zolang het vroeger dividend betaalde','Nee, toekomstige resultaten en risico’s blijven onzeker'],2,'Naamsbekendheid en vroegere uitkeringen zijn geen waarborg. Een onderneming kan structureel achteruitgaan; verlies kan blijvend zijn.')
]};
Q.aanpak={naam:'Uw aanpak',les:'profiel',verder:'instappen',uitnodiging:'Wat past bij de situatie?',situaties:[
 sit('dragen','Durven en kunnen','Twee mensen verdragen een koersdaling even rustig. Eén van hen heeft het geld volgend jaar nodig.','Kunnen ze daarom evenveel risico dragen?', ['Ja, ze voelen zich even rustig','Nee, de termijn en financiële situatie verschillen','Dat wordt alleen door leeftijd bepaald'],1,'Risicobereidheid is niet hetzelfde als verliesdraagkracht. Doel, termijn, financiële situatie en kennis en ervaring horen bij dezelfde afweging.'),
 sit('leven','Een veranderde datum','Een doel komt plots drie jaar vroeger dan gepland.','Wat verdient nu aandacht?', ['Alleen de dagkoers','De termijn en de ruimte om tegenvallers op te vangen opnieuw bekijken','Meer risico nemen om de tijd in te halen'],1,'Een gewijzigde deadline kan de passende aanpak veranderen. Meer risico nemen is geen betrouwbare manier om verloren tijd te compenseren.'),
 sit('ervaring','Leren en ervaring','U hebt alle uitleg over een beleggingsproduct gelezen.','Wat mag u daaruit afleiden?', ['Dat u er al echte beleggingservaring mee hebt','Dat een persoonlijk risicoprofiel niet meer nodig is','Dat uw kennis kan groeien, maar lezen geen echte beleggingservaring is'],2,'Een les kan kennis versterken. Ervaring met echt beleggen en de beoordeling van uw persoonlijke situatie zijn andere zaken. Deze kennisvragen leveren geen formeel beleggersprofiel op.')
]};
/* Herkenbare redactionele puntgroepen: dezelfde vorm voor afspraken en afwegingen.
   De begripsuitleg, verhalende context en beperkingen blijven lopende tekst. */
A('noorwegen').tekst=A('noorwegen').tekst.replace(
 '<h2>Drie regels</h2>\n<p>Wat het fonds bijzonder maakt, is niet zijn grootte, maar zijn regels. Het ministerie legt vast welk deel in aandelen zit. Nieuw geld en herwegen houden die verhouding op peil. En sinds 2001 geldt een opnameregel: de overheid mag over de jaren heen ongeveer zoveel uit het fonds halen als het naar verwachting reëel opbrengt, dus na inflatie. Eerst schatte men dat op 4 procent per jaar; in 2017 werd het 3 procent.</p>',
 '<p>Wat het fonds bijzonder maakt, is niet alleen zijn grootte. Het werkt met vooraf vastgelegde afspraken.</p>'+bite('noorwegen','Drie regels voor het Noorse fonds',[
 ['Een vaste verdeling','Het ministerie bepaalt welk deel van het fonds in aandelen zit.'],
 ['Terug naar die verdeling','Nieuw geld en [[herwegen|herwegen]] helpen om de afgesproken verdeling op peil te houden.'],
 ['Een grens aan opnames','Sinds 2001 mag de overheid over de jaren heen ongeveer het verwachte reële rendement opnemen, dus na inflatie. De inschatting daalde van 4 procent per jaar naar 3 procent in 2017.']
 ]));
A('actief-index').tekst=A('actief-index').tekst.replace(
 '<h2>Drie vragen bij elk fonds</h2>\n<p>Volgt het een index, welke dan, en hoe is die samengesteld? Wat zijn de grootste posities, landen en sectoren, en hoeveel daarvan bezit u al via een ander product? En wat kost het totaal per jaar, in euro? Met die drie antwoorden weet u meer over uw risico dan met het label ‘actief’ of ‘passief’.</p>',
 bite('fondskeuze','Drie vragen bij elk fonds',[
 ['Wat volgt het fonds?','Volgt het een [[index|index]]? Welke, en hoe is die samengesteld?'],
 ['Wat bezit u al?','Bekijk de grootste posities, landen en sectoren. Hoeveel daarvan bezit u ook via een ander product?'],
 ['Wat kost het geheel?','Vergelijk de totale jaarlijkse kosten, ook uitgedrukt in euro.']
 ])+'<p>Met die antwoorden begrijpt u beter wat u bezit, welk risico u loopt en wat u betaalt dan met alleen het label ‘actief’ of ‘passief’.</p>');

})();
/* Eindredactie en volledige bronverwijzingen van de geraakte fiscale uitleg. */
(() => {
 const A=id=>window.NORTE_INHOUD.artikels.find(a=>a.id===id), Q=window.NORTE_CHECKS;
 const kosten21='https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-21/wat-zijn-de';
 const kosten23='https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/verzekeringsproducten/levensverzekering-tak-23/wat-zijn-de';
 for(const id of ['verpakking','tak21-tak23','belastingen']) A(id).bronnen.push({label:'Wikifin — premietaks, pensioenspaarvrijstelling en kosten tak 21',url:kosten21},{label:'Wikifin — belastingen en kosten tak 23',url:kosten23});
 A('kosten').bronnen=A('kosten').bronnen.filter(b=>!/^Rekenvoorbeeld figuur:|^Kamer van/.test(b.label));
 A('kosten').bronnen.push({label:'Verkenning afgeleid uit de ongewijzigde Norte-planrekenkern. Hetzelfde voorbeeldpad wordt vergeleken met verschillende jaarlijkse kosten; model en beperkingen staan bij de bediening.',url:null});
 A('profiel').tekst=A('profiel').tekst.replace('Uw werkelijke beleggersprofiel stelt uw adviseur samen met u op, na een toets van uw kennis en ervaring en een gesprek over uw situatie.','Voor een persoonlijk beleggingsvoorstel worden uw doelen, financiële situatie, kennis en ervaring en risicobereidheid samen onderzocht. Een voorbeeldaanpak kiezen vervangt die beoordeling niet.');
 A('zelfstandigen').bronnen.push({label:'FSMA — vastgoedfinanciering met aanvullend pensioen, alleen als de regeling dit toelaat',url:'https://www.fsma.be/nl/kan-ik-mijn-aanvullend-pensioen-gebruiken-voor-de-aankoop-het-verbouwen-van-vastgoed'});
 const labels={begin:'Verder met de spaarrekening',opbrengst:'Verder met tijd en groei',risico:'Verder met dalingen en herstel',aanpak:'Verder met eenmalig of maandelijks'};
 for(const [id,label] of Object.entries(labels)) Q[id].verderLabel=label;
 // Vaste variatie in antwoordvolgorde; geen score op leesgedrag of afgeleid beleggersprofiel.
 for(const [n,id] of ['begin','opbrengst','risico','aanpak'].entries()) Q[id].situaties.forEach((s,i)=>{
   const j=(n+i)%3, good=s.opties[s.juist];s.opties=s.opties.slice(j).concat(s.opties.slice(0,j));s.juist=s.opties.indexOf(good);
   s.uitleg=s.uitleg.replace('van25procent','van 25 procent');
 });
})();

/* Korte kennisvragen: dezelfde vijf ingangen, concrete afwegingen en een nuttig vervolg. */
(() => {
 const Q=window.NORTE_CHECKS;
 // Herformulering behoudt de antwoordposities: bestaande antwoorden op hetzelfde inzicht blijven geldig.
 const formuleer=(s,context,vraag,goed,fout)=>{
  s.context=context;s.vraag=vraag;
  const p=s.juist;s.opties=[...fout];s.opties.splice(p,0,goed);
 };
 formuleer(Q.begin.situaties[0],
  'Eva heeft over zes maanden geld nodig voor een verbouwing. Ze overweegt een fonds dat ze elke dag kan verkopen.',
  'Is het hele bedrag dan zeker beschikbaar?',
  'Nee, de verkoopwaarde kan lager zijn.',
  ['Ja, want ze kan op elk moment verkopen.','Ja, als het fonds breed gespreid is.']);
 formuleer(Q.begin.situaties[1],
  'Koen houdt een aparte reserve voor een onverwachte autoreparatie.',
  'Wat weegt voor die reserve het zwaarst?',
  'Op tijd over het nodige bedrag kunnen beschikken.',
  ['Een zo hoog mogelijke verwachte opbrengst.','Een beursdaling kunnen afwachten tot herstel.']);
 formuleer(Q.begin.situaties[2],
  'Lies’ spaarsaldo groeit met 2 procent. De prijzen stijgen in dezelfde periode met 3 procent.',
  'Wat gebeurt er met haar koopkracht?',
  'Die daalt: de prijzen stijgen sneller dan haar saldo.',
  ['Die stijgt: er staat meer geld op de rekening.','Die blijft gelijk: beide percentages zijn positief.']);
 // Nieuwe vragen hebben eigen IDs; oude obligatie-antwoorden worden niet op andere vragen toegepast.
 Q.obligaties.naam='Bouwstenen';
 Q.obligaties.uitnodiging='Wat weet u al over aandelen, fondsen en verzekeringen?';
 Q.obligaties.situaties=[
  {id:'verkoop-voor-doel',rij:'Obligaties',context:'Tom koopt een obligatie die over vijf jaar wordt terugbetaald. Over zes maanden wil hij het geld misschien voor een auto gebruiken.',vraag:'Kan hij dan rekenen op de beloofde eindwaarde?',
   opties:['Ja, de eindwaarde geldt zodra hij verkoopt.','Nee, bij eerdere verkoop krijgt hij de marktprijs.','Ja, zolang de uitgever zijn rente betaalt.'],juist:1,
   uitleg:'De terugbetalingsafspraak geldt op de einddatum, als de uitgever kan betalen. Verkoopt Tom eerder, dan kan de marktprijs lager zijn. Een obligatie met vijf jaar looptijd geeft dus geen zekerheid over het bedrag voor zijn auto over zes maanden.'},
  {id:'twee-fondsmanden',rij:'Fondsen',context:'Fonds A belegt in twintig bedrijven uit verschillende sectoren. Fonds B bezit honderd technologiebedrijven.',vraag:'Wat zegt het aantal bedrijven over de spreiding?',
   opties:['Fonds B is door het hogere aantal zeker beter gespreid.','Beide fondsen zijn even goed gespreid, want ze hebben meerdere bedrijven.','Het aantal alleen volstaat niet: bekijk ook sectoren en gewichten.'],juist:2,
   uitleg:'Twintig bedrijven over verschillende sectoren kunnen minder van één sector afhangen dan honderd technologiebedrijven. Dat maakt fonds A niet automatisch de beste keuze. Ook de landen, de gewichten en de precieze beleggingen tellen mee.'},
  {id:'dekking-bij-leven',rij:'Verzekeringen',context:'Een tak 23-contract heeft een extra overlijdensdekking. De fondsen dalen. De klant leeft en wil geld opnemen.',vraag:'Beschermt die overlijdensdekking ook het bedrag bij opname?',
   opties:['Nee, een overlijdensdekking is geen waarborg bij opname.','Ja, ze beschermt elke opname tegen een beursdaling.','Ja, zodra er een begunstigde is aangeduid.'],juist:0,
   uitleg:'Een overlijdensdekking regelt een uitkering bij overlijden, volgens de voorwaarden. Ze beschermt op zichzelf niet tegen een lagere fondswaarde wanneer de klant tijdens zijn leven geld opneemt. Kijk dus wanneer een bescherming precies geldt.'}
 ];
 // Minder weggevers, dezelfde betekenis en correcte antwoordpositie.
 formuleer(Q.opbrengst.situaties[0],
  'De opbrengst van een belegging blijft mee belegd.', 'Waarover kan de volgende opbrengst worden berekend?',
  'Over de inleg én eerdere opbrengst; verlies blijft mogelijk.',
  ['Alleen over het bedrag dat oorspronkelijk werd ingelegd.','Over een groter bedrag, zodat de opbrengst zeker hoger is.']);
 formuleer(Q.opbrengst.situaties[2],
  'Een aanvaarde pensioenstorting geeft in dit voorbeeld 30 procent belastingvermindering.',
  'Waarop slaat dat voordeel?',
  'Op de aanvaarde storting, binnen de fiscale voorwaarden.',
  ['Op het hele opgebouwde kapitaal, elk jaar opnieuw.','Op het bedrag dat na alle kosten gegarandeerd overblijft.']);
 formuleer(Q.opbrengst.situaties[1],
  Q.opbrengst.situaties[1].context, Q.opbrengst.situaties[1].vraag,
  'Ze verminderen de waarde én wat daarna nog kan meegroeien.',
  ['Ze verminderen alleen de opbrengst van het jaar waarin ze worden aangerekend.','Ze wegen door de groei van het kapitaal na verloop van tijd minder zwaar.']);
 formuleer(Q.risico.situaties[0],
  Q.risico.situaties[0].context, Q.risico.situaties[0].vraag,
  'De afhankelijkheid van die ene onderneming verkleinen.',
  ['Een daling van de hele aandelenmarkt voorkomen.','Het verlies bij die onderneming over andere beleggers verdelen.']);
 formuleer(Q.risico.situaties[2],
  Q.risico.situaties[2].context, Q.risico.situaties[2].vraag,
  'Nee, toekomstige resultaten en risico’s blijven onzeker.',
  ['Ja, vroegere dividenden zorgen voor een ondergrens aan de koers.','Ja, zolang het bedrijf winst blijft maken.']);
 formuleer(Q.aanpak.situaties[0],
  Q.aanpak.situaties[0].context, Q.aanpak.situaties[0].vraag,
  'Nee, de termijn en financiële situatie verschillen.',
  ['Ja, hun reactie op een daling is hetzelfde.','Ja, als ze allebei een breed gespreid fonds kiezen.']);
 formuleer(Q.aanpak.situaties[2],
  Q.aanpak.situaties[2].context, Q.aanpak.situaties[2].vraag,
  'Dat uw kennis kan groeien, zonder al beleggingservaring te hebben.',
  ['Dat u nu ook weet hoe u bij een echte koersdaling reageert.','Dat dit product daardoor bij uw persoonlijke doel past.']);
 const meta={
  begin:[
   ['sparen-of-beleggen','Verkoopbaar is niet hetzelfde als waardevast.'],
   ['sparen-of-beleggen','Een buffer moet klaarstaan als u hem nodig hebt.'],
   ['koopkracht','Meer euro’s kunnen toch minder kopen.']
  ],
  obligaties:[
   ['bouwstenen','De eindwaarde is geen vaste prijs bij eerdere verkoop.'],
   ['bouwstenen','Het aantal bedrijven alleen zegt niet hoe goed een fonds spreidt.'],
   ['verpakking','Overlijdensdekking is geen bescherming bij opname.']
  ],
  opbrengst:[
   ['tijd','Ook eerdere opbrengst kan verder meewerken.'],
   ['kosten','Kosten verminderen ook wat later kan meegroeien.'],
   ['pensioensparen','Een belastingvoordeel is geen jaarlijks rendement.']
  ],
  risico:[
   ['spreiding','Spreiding maakt één bedrijf minder bepalend.'],
   ['daling','Na −20 procent vraagt herstel +25 procent.'],
   ['daling','Een vertrouwde naam garandeert geen herstel.']
  ],
  aanpak:[
   ['profiel','Risico durven nemen is niet hetzelfde als verlies kunnen dragen.'],
   ['profiel','Een gewijzigde deadline vraagt een nieuwe afweging.'],
   ['profiel','Kennis opbouwen is iets anders dan beleggingservaring.']
  ]
 };
 for(const [id,m] of Object.entries(meta)) Q[id].situaties.forEach((s,i)=>{s.les=m[i][0];s.inzicht=m[i][1];});
})();

/* Gerichte taalredactie: concrete onderwerpen, directe zinnen en één gedachte per alinea.
   Bestaande bedragen, bron- en vervolgdoelen, rekenregels en antwoordposities blijven behouden. */
(() => {
 const A=id=>window.NORTE_INHOUD.artikels.find(a=>a.id===id);
 const edits=[{"id": "actief-index", "field": "inleiding", "old": "Een beheerder die zelf kiest, of een fonds dat een vaste lijst volgt: het klinkt als een keuze tussen inzet en gemakzucht. In werkelijkheid kiest u tussen twee manieren om dezelfde markt te bezitten, met een ander kostenplaatje en een ander soort afwijking.", "new": "Een actieve beheerder kiest zelf waarin het fonds belegt. Een indexfonds volgt de samenstelling van een index. Die keuze beïnvloedt de kosten en hoeveel het fonds van die index kan afwijken."}, {"id": "verpakking", "field": "tekst", "old": "U vergelijkt dan twee dingen tegelijk: waarin uw geld belegt en welke juridische afspraken u sluit.", "new": "U vergelijkt twee dingen: waarin uw geld wordt belegd en welke afspraken in het contract staan."}, {"id": "kosten", "field": "tekst", "old": "Controleer welke lagen het getoonde totaal omvat.", "new": "Controleer of het totaal zowel de fondskosten als de kosten van uw rekening of verzekering bevat."}, {"id": "spreiding", "field": "tekst", "old": "Een wereldfonds kan zwaar wegen naar enkele grote bedrijven of één land.", "new": "Ook een wereldfonds kan voor een groot deel uit enkele grote bedrijven of beleggingen in één land bestaan."}, {"id": "ethias", "field": "tekst", "old": "Het probleem was niet dat de rente plots niet meer gewaarborgd was. Het probleem was dat een belofte die elke dag opvraagbaar is, op elke dag waargemaakt moet kunnen worden.", "new": "De rentewaarborg was niet veranderd. Maar omdat klanten hun geld elke dag konden opvragen, moest Ethias het ook op elk moment kunnen terugbetalen."}, {"id": "tijd", "field": "tekst", "old": "Stel dat een belegging in een jaar 4 procent opbrengt. Op € 1.000 is dat € 40. Laat u die € 40 staan, dan rekent het volgende jaar de groei op € 1.040 in plaats van op € 1.000. In het begin is het verschil verwaarloosbaar, een paar euro.", "new": "Stel dat een belegging in een jaar 4 procent opbrengt. Op € 1.000 is dat € 40. Laat u die € 40 mee belegd, dan begint het volgende jaar met € 1.040 in plaats van € 1.000. Een volgende opbrengst wordt dus ook berekend op die eerste € 40. In het begin gaat het verschil om een paar euro."}, {"id": "tijd", "field": "tekst", "old": "Het voorbeeld van Lien en Tom rekent met een vaste 4 procent per jaar; de verkenning niet. Haar lijn volgt een verwacht rendement per soort belegging, met een aanpak die rustiger wordt naarmate het einde nadert, en een gemodelleerd marktpad met dalingen. Dat blijft een illustratie, geen vast rendement en geen voorspelling: echte beleggingen schommelen anders, ook verlies is mogelijk.", "new": "Het voorbeeld van Lien en Tom rekent met een vaste 4 procent per jaar. De berekening hierboven werkt anders: ze gebruikt een verwacht rendement per soort belegging en bevat ook dalingen. Naarmate de einddatum nadert, wordt de verdeling over beleggingen rustiger. De lijn blijft een rekenvoorbeeld. Ze belooft geen vast rendement en voorspelt de toekomst niet. Echte beleggingen schommelen anders; ook verlies is mogelijk."}, {"id": "tijd", "field": "tekst", "old": "Wie tien jaar later begint, mist dus niet de eerste tien jaar, maar in feite de laatste tien jaar van groei op een grote basis.", "new": "Wie tien jaar later begint, geeft ook de opbrengsten tien jaar minder tijd om verder mee te groeien."}, {"id": "winkelkar", "field": "tekst", "old": "Het saldo blijft € 10.000, Een uitgave", "new": "Het saldo blijft € 10.000. Een uitgave"}, {"id": "autopanne", "field": "tekst", "old": "Hier geeft ze alleen de nog te verdienen premie op het opgenomen deel op.", "new": "Hier verliest ze alleen de premie die ze op het opgenomen bedrag nog niet had verdiend."}, {"id": "aannames", "field": "inleiding", "old": "Een plangrafiek toont een vloeiende lijn naar uw doel. Achter die lijn zitten keuzes: een verwacht rendement per soort belegging, een verdeling, een marktpad en een inflatie. Wie die keuzes kent, leest de grafiek beter, en vertrouwt ze niet blind.", "new": "Een plangrafiek laat zien hoe uw geld volgens de berekening kan groeien. De uitkomst hangt af van de verwachte opbrengsten, de verdeling over beleggingen, de dalingen in het rekenvoorbeeld en de aangenomen inflatie. Hier leest u hoe die keuzes de grafiek bepalen en wat de lijn niet kan voorspellen."}, {"id": "sparen-of-beleggen", "field": "tekst", "old": "Daarom kiezen mensen voor geld dat ze binnen enkele jaren nodig hebben vaker voor sparen, en voor geld met een horizon van tien jaar of meer vaker voor een deel beleggen.", "new": "Daarom kiezen mensen vaker voor sparen als ze het geld binnen enkele jaren nodig hebben. Bij een termijn van tien jaar of meer beleggen ze vaker een deel."}, {"id": "spaarrekening", "field": "tekst", "old": "De basisrente loopt ten laatste vanaf de dag na uw storting en wordt per dag berekend, aan het tarief dat die dag geldt, zolang het geld op de rekening staat.", "new": "De basisrente begint ten laatste te lopen op de dag na uw storting. Zolang het geld op de rekening staat, verdient u elke dag rente aan het tarief van die dag."}, {"id": "spaarrekening", "field": "tekst", "old": "Wie geld van de ene naar de andere rekening schuift, kan zo ongemerkt premie verliezen. Bij een overschrijving tussen bepaalde gereglementeerde spaarrekeningen bij dezelfde bank kan de lopende verwervingsperiode onder voorwaarden doorlopen. Vraag dat na vóór u overschrijft; een al verdiende premie en een nog lopende periode zijn verschillende dingen. Bij een andere bank begint de klok opnieuw.", "new": "Wie geld van de ene naar de andere rekening schuift, kan zo ongemerkt premie verliezen. Bij een andere bank begint de klok opnieuw. Bij dezelfde bank kan de klok onder voorwaarden doorlopen, als u overschrijft tussen bepaalde gereglementeerde spaarrekeningen. Vraag dat na vóór u overschrijft. Premie die u al verdiend hebt, blijft van u. Wat u kunt verliezen, is de premie van een periode die nog loopt."}, {"id": "actief-index", "field": "tekst", "old": "De SPIVA-rapporten van S&P, die actief beheerde Europese fondsen jaarlijks naast hun vergelijkingsindex leggen, tonen in de meeste categorieën dat een meerderheid achterblijft, en dat dit aandeel groter wordt naarmate de periode langer is.", "new": "S&P legt in zijn jaarlijkse SPIVA-rapporten actief beheerde Europese fondsen naast hun vergelijkingsindex. In de meeste categorieën blijft een meerderheid van die fondsen achter. Hoe langer de onderzochte periode, hoe groter dat deel."}, {"id": "pensioensparen", "field": "tekst", "old": "Elk jaar krijgt ze € 315 belasting terug. Als ze voldoende personenbelasting verschuldigd is, verlaagt dat haar belasting met 30 procent van de storting.", "new": "Als ze voldoende personenbelasting verschuldigd is, daalt haar belasting elk jaar met € 315: 30 procent van haar storting."}, {"id": "tijd", "field": "tekst", "old": "de andere een mogelijke waarde volgens de rekenkern van het Norte-plan.", "new": "de andere een mogelijke waarde volgens de berekening van het Norte-plan."}, {"id": "aannames", "field": "tekst", "old": "Voor aandelen is dat een reëel rendement van 4,5 procent per jaar, voor obligaties 1 procent, en voor sparen een rente van 0,86 procent. Met een aangenomen inflatie van 2 procent per jaar worden de beleggingsrendementen omgerekend naar euro’s van later: 6,59 procent voor aandelen en 3,02 procent voor obligaties.", "new": "Voor aandelen rekent het plan met 4,5 procent rendement per jaar na inflatie. Voor obligaties is dat 1 procent. Voor sparen gebruikt het een rente van 0,86 procent. De grafiek toont bedragen in euro’s van later. Daarom rekent het plan de beleggingsrendementen om met een aangenomen inflatie van 2 procent per jaar: 6,59 procent voor aandelen en 3,02 procent voor obligaties."}, {"id": "daling", "field": "kernidee", "old": "Een daling is meteen een lager vermogen. Of en wanneer het herstelt, weet niemand vooraf; wie dan verkoopt, legt het verlies vast, en bij een faillissement kan het ook zonder verkoop blijvend zijn. Voor geld met een lange termijn weegt ook het stille verlies aan koopkracht.", "new": "Een daling verlaagt meteen uw vermogen. Of en wanneer de waarde herstelt, weet niemand vooraf. Wie tijdens een daling verkoopt, legt het verlies vast. Bij een faillissement kan het verlies ook zonder verkoop blijvend zijn. Voor geld met een lange termijn weegt ook het stille verlies aan koopkracht."}, {"id": "kind", "field": "tekst", "old": "Zolang het minderjarig is, beheren de ouders het, maar niet zomaar: willen ouders goederen van hun kind verkopen of weggeven, dan is daar in principe de toestemming van de vrederechter voor nodig, en een bank kan zich in twijfelgevallen verzetten tegen een opname.", "new": "Zolang het kind minderjarig is, beheren de ouders het geld, maar niet zomaar. Willen ze iets verkopen of weggeven wat van hun kind is, dan hebben ze daarvoor in principe de toestemming van de vrederechter nodig. In twijfelgevallen kan een bank zich verzetten tegen een opname."}, {"id": "verbouwing", "field": "tekst", "old": "Bij verkoop is dat het bedrag dat voor de factuur beschikbaar komt. De lagere waarde is ook vóór die verkoop al een tekort tegenover hun doel.", "new": "Verkopen ze dan, dan hebben ze € 21.250 voor de factuur. Ook zonder te verkopen staan ze op dat moment € 3.750 te kort voor hun doel."}, {"id": "autopanne", "field": "tekst", "old": "Bij verschillende stortingen op één rekening kiest ze niet zelf welke storting ze afhaalt: de bank rekent een opname eerst toe aan de bedragen waarvan de verwervingsperiode het minst ver gevorderd is. Bij bepaalde", "new": "Staan er verschillende stortingen op één rekening, dan kiest ze niet zelf welke ze afhaalt. De bank rekent een opname eerst toe aan de stortingen die nog het langst moeten blijven staan om de premie te verdienen.</p>\n<p>Bij bepaalde"}, {"id": "profiel", "field": "tekst", "old": "Het resultaat zegt welk risico en welke soort beleggingen bij u passen. In een strategie wordt dat vaak vertaald naar een verhouding tussen rustigere bouwblokken zoals obligaties en spaargeld, en beweeglijkere zoals aandelen, maar ook de soort producten en hoe goed u ze begrijpt tellen mee. Een defensieve strategie bevat doorgaans meer obligaties en minder aandelen: minder schommeling, meestal ook minder verwachte groei. Een dynamische strategie bevat meer aandelen: een grotere kans op groei over lange termijn, maar ook diepere tussentijdse dalingen. Geen van beide is ‘beter’. Ze passen bij een andere situatie.", "new": "Het resultaat helpt bepalen welk risico en welke beleggingen bij u passen. De strategie vertaalt dat vaak naar een verdeling tussen spaargeld, obligaties en aandelen. Ook de precieze producten en hoe goed u ze begrijpt, blijven belangrijk.</p>\n<p>Een defensieve strategie bevat doorgaans meer obligaties en minder aandelen: minder schommeling, meestal ook minder verwachte groei. Een dynamische strategie bevat meer aandelen: een grotere kans op groei over lange termijn, maar ook diepere tussentijdse dalingen. Geen van beide is ‘beter’. Ze passen bij een andere situatie."}];
 for(const e of edits) A(e.id)[e.field]=A(e.id)[e.field].replace(e.old,e.new);
 const vragen=[{"check": "aanpak", "id": "leven", "context": "Uw verbouwing start drie jaar eerder dan gepland. U hebt uw belegde geld dus sneller nodig.", "vraag": "Wat doet u eerst?", "goed": "Nagaan hoeveel risico nog past bij die kortere termijn.", "fout": ["Meer risico nemen om sneller winst te maken.", "Alleen naar de koers van vandaag kijken."], "uitleg": "Met minder tijd tot de verbouwing kunt u een daling moeilijker afwachten. Bekijk of u het geld op tijd kunt gebruiken en hoeveel verlies u kunt opvangen. Meer risico nemen maakt de uitkomst niet zekerder."}, {"check": "begin", "id": "datum", "vraag": "Krijgt ze bij verkoop zeker haar volledige inleg terug?"}, {"check": "begin", "id": "buffer", "context": "Koen houdt een buffer apart voor een onverwachte autoreparatie.", "vraag": "Wat is voor die buffer het belangrijkst?", "goed": "Dat het geld er is wanneer hij het nodig heeft.", "fout": ["Dat het geld zoveel mogelijk kan opbrengen.", "Dat hij een beursdaling kan uitzitten tot herstel."]}, {"check": "opbrengst", "id": "groei", "context": "De opbrengst van een belegging wordt niet uitbetaald, maar blijft belegd.", "vraag": "Waarop kan de volgende opbrengst worden berekend?", "goed": "Op de inleg én op de eerdere opbrengst.", "fout": ["Alleen op het bedrag dat eerst werd ingelegd.", "Op een groter bedrag, dus zeker een hogere opbrengst."]}, {"check": "opbrengst", "id": "kost", "context": "Twee fictieve beleggingen doen vóór kosten precies hetzelfde. Alleen hun jaarlijkse kosten verschillen.", "goed": "Ze verlagen de waarde én wat daarna kan meegroeien.", "fout": ["Ze verlagen alleen de opbrengst van dat ene jaar.", "Ze wegen minder zwaar naarmate de belegging groeit."]}, {"check": "opbrengst", "id": "fiscaal", "vraag": "Op welk bedrag wordt dat voordeel berekend?", "goed": "Op de aanvaarde storting.", "fout": ["Op het opgebouwde kapitaal.", "Op het behaalde rendement."]}, {"check": "aanpak", "id": "ervaring", "context": "U hebt de uitleg over een beleggingsproduct gelezen, maar er nog niet in belegd.", "vraag": "Wat weet u daardoor beter?", "goed": "Hoe het product werkt, zonder er al ervaring mee te hebben.", "fout": ["Hoe u reageert als uw belegging echt in waarde daalt.", "Of dit product bij uw persoonlijke financiële situatie past."]}];
 for(const e of vragen){
  const s=window.NORTE_CHECKS[e.check].situaties.find(s=>s.id===e.id);
  for(const k of ['context','vraag','uitleg']) if(e[k]) s[k]=e[k];
  if(e.goed){const j=s.juist;s.opties=[...e.fout];s.opties.splice(j,0,e.goed);}
 }
})();


/* Oefenen gebruikt eigen toepassingssituaties; de centrale test blijft ongewijzigd. */
