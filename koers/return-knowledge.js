/* One editorial source, several contextual entrances; reading never edits a plan. */
function initializeReturnKnowledge(){
  const sources={
    damodaran:'https://people.stern.nyu.edu/adamodar/pdfiles/eqnotes/dcfall.pdf',
    ecb:'https://www.ecb.europa.eu/stats/financial_markets_and_interest_rates/euro_area_yield_curves/html/index.en.html',
    horizon:'https://www.horizonactuarial.com/survey-of-capital-market-assumptions',
    aandelen:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/aandeel',
    obligaties:'https://www.fsma.be/nl/obligatie',
    spaargeld:'https://www.wikifin.be/nl/sparen-en-beleggen/spaarrekening/spaarrekening',
    rente:'https://www.wikifin.be/nl/woordenlijst',
    inflatie:'https://www.wikifin.be/nl/budget-betalen-lenen-en-verzekeren/budget-en-budgetbeheer/wat-inflatie',
    target:'https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html'
  };
  const concepts={
    aandelen:{name:'Aandelen',question:'Wat is een aandeel?',short:'Met een aandeel bezit u een klein deel van een bedrijf. U kunt geld verdienen door een hogere verkoopprijs of een uitkering van het bedrijf. Beide zijn onzeker; u kunt ook geld verliezen.',body:'<h2>Een stukje van een bedrijf</h2><p>Als het bedrijf winst maakt, kan het een deel uitkeren. Zo’n uitkering heet dividend. Het bedrijf kan ook besluiten niets uit te keren. De beursprijs van een aandeel kan stijgen en dalen.</p><h2>De prijs telt mee</h2><p>Een goed bedrijf is niet automatisch een goede belegging tegen elke prijs. Wat u vandaag betaalt en wat het bedrijf later kan uitkeren, hangen samen.</p>',next:'Spreiding onderzoeken',route:'#proberen/spreiding'},
    obligaties:{name:'Obligaties',question:'Wat is een obligatie?',short:'Met een obligatie leent u geld aan een overheid of een bedrijf. Daar staan afspraken over rente en terugbetaling tegenover. De uitgever kan in betalingsproblemen komen, en de verkoopwaarde kan schommelen.',body:'<h2>Een lening met afspraken</h2><p>Een obligatie heeft voorwaarden, zoals een einddatum en een rentevergoeding. Vóór die einddatum kunt u bij verkoop minder terugkrijgen dan u betaalde.</p><h2>Een fonds is een verzameling leningen</h2><p>Een obligatiefonds koopt en verkoopt obligaties. Het heeft daardoor niet dezelfde vaste einduitkomst als één lening die volgens afspraak wordt terugbetaald. De rente, de kwaliteit van de uitgevers en eventuele vreemde valuta beïnvloeden het resultaat.</p>',next:'Hoe gebruiken we rente in een berekening?',route:'#lezen/rendement'},
    spaargeld:{name:'Spaargeld',question:'Wat brengt een spaarrekening op?',short:'Op een spaarrekening bouwt u een reserve op. De rentevoorwaarden bepalen de vergoeding. Bij een gereglementeerde rekening kunnen basisrente en getrouwheidspremie verschillende voorwaarden hebben. Inflatie kan uw koopkracht verkleinen.',body:'<h2>Kijk naar de voorwaarden</h2><p>Een geafficheerde rente vertelt niet alles. Voor een getrouwheidspremie moet geld bijvoorbeeld lang genoeg op de rekening blijven. De rente op een spaarrekening kan wijzigen.</p><h2>Uw reserve heeft een functie</h2><p>Geld voor onverwachte uitgaven vraagt ook aandacht voor beschikbaarheid. Alleen de hoogste vergoeding vergelijken is daarom niet genoeg.</p>',next:'Uw eigen inleg bekijken',route:'#simuleren/ritme'},
    rente:{name:'Rente',question:'Wat betekent rente?',short:'Rente is de vergoeding voor het uitlenen van geld, of de prijs voor het lenen ervan. Een rentepercentage hoort altijd bij voorwaarden en een periode. Het zegt op zichzelf niet wat een belegging u uiteindelijk oplevert.',body:'<h2>Dezelfde term, andere voorwaarden</h2><p>De rente op uw spaarrekening, de coupon van een obligatie en een rente uit een marktmodel zijn verschillende gegevens. Vergelijk ook de looptijd, het risico en eventuele kosten.</p><h2>Wat blijft er over?</h2><p>Het bedrag dat u ontvangt kan verschillen van een bedrag vóór kosten en belastingen. Door inflatie kan bovendien de koopkracht veranderen.</p>',next:'Rendementsaannames begrijpen',route:'#lezen/rendement'},
    inflatie:{name:'Inflatie',question:'Waarom telt inflatie mee?',short:'Inflatie is een algemene stijging van de prijzen. Met hetzelfde bedrag kunt u dan minder kopen. Een bedrag dat op papier groeit, groeit dus niet noodzakelijk evenveel in koopkracht.',body:'<h2>Bedrag en koopkracht</h2><p>Een toekomstige uitkomst in euro vertelt hoeveel geld er volgens de berekening staat. Voor wat u ermee kunt kopen, telt ook de ontwikkeling van de prijzen mee.</p><h2>Een doel is geen voorspelling</h2><p>De Europese Centrale Bank streeft naar 2% inflatie op middellange termijn. De werkelijke inflatie kan daarvan afwijken, en uw eigen uitgaven kunnen anders stijgen.</p>',next:'De aannames achter een berekening',route:'#lezen/rendement'},
    rendement:{name:'Rendement',question:'Wat betekent rendement?',short:'Rendement is wat een belegging oplevert of verliest ten opzichte van de inleg. Het kan bestaan uit inkomsten en een waardeverandering. Vraag altijd of kosten, belastingen en inflatie al verwerkt zijn.'}
  };
  const term=(id,label)=>`<button type="button" class="finance-term" data-finance-term="${id}" aria-label="${esc(label||concepts[id].name.toLowerCase())}, korte uitleg">${esc(label||concepts[id].name.toLowerCase())}</button>`;
  const ticket=()=>history.state?.learningTicket;
  const context=()=>history.state?.knowledgeContext;
  const warning=(cost=false)=>`<aside class="return-warning" aria-label="Over rendementen"><p>${cost?'Deze groeivoet is een vrije rekenaanname, geen rendementsverwachting.':'Een rendementsaanname is geen belofte. Bij beleggen kunt u geld verliezen.'}</p><a href="#lezen/rendement">Hoe bepalen we de aannames? ${arrow}</a></aside>`;
  const returnPlan=()=>ticket()?`<a class="back return-context" href="${esc(ticket().route)}" data-learning-return>${backArrow}Terug naar uw plan</a>`:'';
  const top=(main=false)=>{
    const previous=history.state?.readingFrom||'#ontdekken';
    const from=main?(context()?.route||ticket()?.route||(previous.startsWith('#lezen/')?'#ontdekken':previous)):previous;
    return `<div class="subpage-top">${back(from==='#proberen/kosten'?'Terug naar uw kostenproef':from.startsWith('#lezen')?'Terug naar het artikel':from==='#ontdekken'?'Alle onderwerpen':'Terug naar het onderdeel',from)}${ticket()&&from!==ticket().route?returnPlan():''}</div>`;
  };
  const contextNote=()=>{
    const c=context();
    if(c?.kind==='cost')return `<aside class="article-calculation-context"><strong>Bij uw kostenproef</strong><p>${Number.isFinite(c.gross)?`${formatPct(c.gross)}% groei vóór kosten is hier uw rekenaanname. Dit cijfer komt niet uit een vastgelegde rendementsverwachting.`:'U heeft nog geen geldige groeivoet ingevuld. De proef gebruikt geen vastgelegde rendementsverwachting.'}</p></aside>`;
    if(ticket())return `<aside class="article-calculation-context"><strong>Bij ${esc(ticket().part)}</strong><p>Dit planvoorbeeld bevat nog geen berekende rendementen of gekoppelde jaarversie. In een echt plan moeten de gebruikte cijfers en methode hier herkenbaar zijn.</p></aside>`;
    return '';
  };
  const sourceLink=(label,url)=>`<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
  function assumptionsArticle(){return `${top(true)}<div class="reading-layout journal-reading assumptions-reading"><article class="reading-paper"><span class="small-label">Rendementen begrijpen</span><h1>Wat kan uw geld opbrengen?</h1><p class="lead">Een berekening helpt u vooruitkijken. De uitkomst hangt af van uw inleg én van de aannames erachter.</p><p class="article-risk">Een berekende uitkomst is geen garantie. Bij beleggen kunt u geld verliezen.</p>${contextNote()}<div class="article-body">
      <h2>Begin bij wat u zelf inlegt</h2><p>Wat u opzijzet en wat uw geld mogelijk opbrengt, zijn twee verschillende dingen. Onze snelle inlegsimulatie telt alleen uw bijdragen op. Een berekening mét ${term('rendement')} heeft aanvullende aannames nodig.</p>
      <h2>Waar komen die aannames vandaan?</h2>
      <h3>Aandelen: de prijs en de verwachting</h3><p>Stel dat u een huis koopt om te verhuren. De prijs kent u. De toekomstige huur en verkoopwaarde staan nog niet vast. Zo kunt u ook naar ${term('aandelen')} kijken: wat betaalt u nu, en welke uitkeringen worden verwacht?</p><p>Professor Aswath Damodaran van New York University leidt uit beurskoersen, uitkeringen en groeiverwachtingen een vergoeding voor aandelenrisico af. De besproken methode telt die vergoeding op bij een euro-rentereferentie voor veilige staatsobligaties. Ook deze benadering steunt op verwachtingen; ze voorspelt uw persoonlijke opbrengst niet.</p>
      <h3>Obligaties: de rente als vertrekpunt</h3><p>Met ${term('obligaties')} leent u geld uit. De huidige ${term('rente')} helpt om een rekenaanname te vormen. Als vertrekpunt is een door de Europese Centrale Bank geschatte rentecurve voor staatsobligaties uit de eurolanden gekozen, rond zeven jaar.</p><p>Dat is een euroreferentie, geen voorspelling voor ieder obligatiefonds. Een fonds heeft andere leningen en verandert onderweg. Renteveranderingen, betalingsproblemen, kosten en valuta kunnen het resultaat beïnvloeden.</p>
      <h3>Spaargeld: uw rekening blijft bepalend</h3><p>Bij ${term('spaargeld')} begint u bij de rentevoorwaarden van uw rekening. Een gemiddelde uit Belgische bankstatistieken kan als referentie dienen, maar is niet automatisch wat u zelf ontvangt. Ook de voorwaarden voor een premie tellen mee.</p>
      <h3>Inflatie: wat kunt u ermee kopen?</h3><p>${term('inflatie','Inflatie')} vermindert de koopkracht van geld. De ECB streeft naar 2% op middellange termijn. Dat is een doelstelling, geen voorspelling van de jaarlijkse prijsstijging in België of van uw eigen uitgaven.</p>
      <h2>Wat houdt u uiteindelijk over?</h2><p>Een broncijfer is nog geen netto-opbrengst. Kosten en belastingen kunnen uw resultaat verlagen. Inflatie verandert wat u ermee kunt kopen. Kijk daarom bij iedere berekening wat er wel en niet verwerkt is.</p><p>${link('Bekijk wat kosten kunnen doen','#proberen/kosten','inline-article-link')}</p><p>Een gemiddeld rendement zegt ook niet hoe uw belegging onderweg beweegt. Een tegenvaller kan juist samenvallen met het moment waarop u uw geld nodig heeft.</p>
      <details class="method-details"><summary>Waarom kunnen aannames verschillen?</summary><p>Een kantoor kan vooraf een vaste methode kiezen. Voor aandelen is een aanvullende vergelijking met de jaarlijkse Horizon-enquête besproken. Die verzamelt verwachtingen uit de professionele beleggingswereld. Voor obligaties is een vergelijking met de Bloomberg Global Aggregate besproken.</p><p>Een gemiddelde van twee bronnen is een methodiekeuze, geen bewijs van zekerheid. Valuta, looptijd, risico en de manier van rekenen moeten eerst vergelijkbaar worden gemaakt. Bij aandelen gaat de besproken middeling over de risicovergoeding, niet zomaar over twee totale rendementen.</p><p>De keuze hoort bij het kantoor en moet samen met de gebruikte jaarversie bij het dossier terug te vinden zijn. Het gebruik van commerciële indexgegevens vraagt bovendien vooraf controle van de gebruiksrechten.</p></details>
      <details class="method-details"><summary>Bronnen en status van deze uitleg</summary><ul><li>${sourceLink('Damodaran · de opbouw van een impliciete risicovergoeding',sources.damodaran)}</li><li>${sourceLink('ECB · geschatte rentecurves voor eurolanden',sources.ecb)}</li><li>${sourceLink('Horizon Actuarial · jaarlijkse enquête',sources.horizon)}</li><li>${sourceLink('ECB · inflatiedoelstelling',sources.target)}</li><li>${sourceLink('Wikifin · spaarrekening en rentevoorwaarden',sources.spaargeld)}</li></ul><p>Ontwerpuitleg, samengesteld op 1 november 2026. De aandelen- en obligatiemethode volgen de besproken opzet; actuele jaarcijfers zijn hier nog niet gekoppeld. De precieze spaarreferentie en inflatiekeuze stonden in het gelezen gesprek nog ter goedkeuring. Er wordt daarom geen voorlopig percentage als uw vaste aanname voorgesteld.</p><p>De vergelijkbaarheid van de aanvullende bronnen, gebruiksrechten en definitieve toepassing moeten nog worden vastgesteld. Dit artikel is geen productadvies of vrijgave van een rekenmodel.</p></details>
    </div></article><aside class="reading-aside assumptions-aside">${ticket()?`<h2>Uw plan blijft<br>uw vertrekpunt</h2>${link('Terug naar uw plan',ticket().route,'button return-context')}`:`<h2>Maak het<br>concreet</h2>${link('Bekijk uw eigen inleg','#simuleren/ritme','button')}`}<p>Een proef helpt u begrijpen. Een passende keuze bespreekt u in samenhang met uw situatie.</p></aside></div>`;}
  function conceptArticle(id){const c=concepts[id];return `${top()}<div class="reading-layout journal-reading"><article class="reading-paper"><span class="small-label">Een begrip begrijpen</span><h1>${c.question}</h1><p class="lead">${c.short}</p><div class="article-body">${c.body||''}<p class="article-source">Meer uitleg: ${sourceLink(id==='obligaties'?'FSMA':'Wikifin',sources[id]||sources.rente)}</p>${c.route?link(c.next,c.route,'text-action'):''}</div></article><aside class="reading-aside">${ticket()?link('Terug naar uw plan',ticket().route,'button return-context'):link('De aannames achter een berekening','#lezen/rendement')}</aside></div>`;}
  journalEntries.rendement={kind:'Rendementen begrijpen',title:'Wat kan uw geld opbrengen?'};
  for(const [id,c] of Object.entries(concepts))if(id!=='rendement')journalEntries[id]={kind:'Een begrip begrijpen',title:c.question};
  const previousStory=journalStory;
  journalStory=id=>id==='rendement'?assumptionsArticle():concepts[id]?conceptArticle(id):previousStory(id);
  const previousDiscover=discover;
  discover=()=>previousDiscover().replace('<div class="editorial-pair">',`<a class="assumptions-entry" href="#lezen/rendement"><div><span class="small-label">De aannames achter een berekening</span><h2>Wat kan uw geld opbrengen?</h2></div><span>Waar de cijfers vandaan komen ${arrow}</span></a><div class="editorial-pair">`);
  pages.ontdekken=discover;
  const previousPrepare=prepare;
  prepare=n=>{const html=previousPrepare(n);return Number(n)===4?html.replace('<div class="actions">',warning()+'<div class="actions">'):html;};
  const previousTab=tabContent;
  tabContent=advisor=>previousTab(advisor)+(state.tab==='aanpak'?warning():'');
  const previousConcept=conceptTest;
  conceptTest=()=>{const html=previousConcept();return location.hash==='#proberen/kosten'?html.replace('<div id="cost-result"',warning(true)+'<div id="cost-result"'):html;};
  const previousConfirmed=confirmedPlan;
  confirmedPlan=()=>previousConfirmed().replace('<section class="plan-understanding">',warning()+'<section class="plan-understanding">');
  pages['bevestigd-plan']=confirmedPlan;
  // Keep the original calculation context through short definitions and deeper reading.
  const previousNavigate=navigate;
  navigate=(hash,trigger)=>{
    const priorContext=history.state?.knowledgeContext;
    const isKnowledge=hash==='#lezen/rendement'||Object.keys(concepts).some(id=>hash==='#lezen/'+id);
    let c=isKnowledge?history.state?.knowledgeContext:null;
    if(hash==='#lezen/rendement'&&location.hash==='#proberen/kosten'){
      const form=document.querySelector('#cost-form'),field=form.elements.namedItem('gross');
      c={kind:'cost',route:'#proberen/kosten',gross:field.value!==''&&field.validity.valid?Number(field.value):null,inputs:Object.fromEntries(['amount','years','costA','costB','gross'].map(k=>[k,form.elements.namedItem(k).value])),scroll:scrollY,focus:trigger?.dataset.focus,history:{...history.state}};
    }
    previousNavigate(hash,trigger);
    if(isKnowledge&&c){history.replaceState({...history.state,knowledgeContext:c},'',location.href);render(false);}
    else if(priorContext&&hash===priorContext.route&&trigger?.classList.contains('back')){
      history.replaceState({...priorContext.history,key:history.state.key},'',location.href);render(false);
      const form=document.querySelector('#cost-form');
      if(form&&priorContext.inputs){for(const [key,value] of Object.entries(priorContext.inputs))form.elements.namedItem(key).value=value;form.dispatchEvent(new Event('input',{bubbles:true}));}
      requestAnimationFrame(()=>{root.querySelector(`[data-focus="${priorContext.focus}"]`)?.focus({preventScroll:true});window.scrollTo(0,priorContext.scroll);});
    }
  };
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-finance-term]');if(!button)return;
    const id=button.dataset.financeTerm,c=concepts[id];if(!c)return;
    show('Kort uitgelegd',c.question,`<p>${c.short}</p>${id==='rendement'?link('De aannames achter een berekening','#lezen/rendement'):link('Verder lezen over '+c.name.toLowerCase(),'#lezen/'+id)}`,button);
  });
}
