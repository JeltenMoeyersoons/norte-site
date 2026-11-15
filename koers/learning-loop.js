/* Same-origin prototype journey: learning is an excursion, not a plan mutation. */
function initializeLearningLoop(){
  const clone=x=>JSON.parse(JSON.stringify(x));
  const isPlan=hash=>/^#(voorbereiden|eigen-plan|adviseur-plan|bevestigd-plan)(\/|$)/.test(hash);
  const isLearning=hash=>/^#(ontdekken|leren|lezen|proberen|simuleren)(\/|$)/.test(hash);
  const ticket=()=>history.state?.learningTicket;
  const currentKind=()=>(location.hash.startsWith('#simuleren')||['','#start'].includes(location.hash))?'inleg':location.hash.includes('/kosten')?'kosten':'spreiding';
  const inquiryRoute=(kind,inputs)=>kind==='inleg'?(inputs?.target?'#simuleren/doel':'#simuleren/ritme'):'#proberen/'+kind;
  const titleOf=kind=>kind==='kosten'?'Kosten':kind==='inleg'?'Regelmatige inleg':'Spreiding';
  const emptyCost=()=>({amount:10000,years:20,gross:4,costA:.5,costB:1.5});
  const getWork=()=>{
    const t=ticket();
    if(t){state.learningWorkspaces=state.learningWorkspaces||{};state.learningWorkspaces[t.id]=state.learningWorkspaces[t.id]||clone(t.initial||{});return state.learningWorkspaces[t.id];}
    state.publicLearning=state.publicLearning||{};return state.publicLearning;
  };
  const readInquiry=()=>({kind:currentKind(),inputs:clone(currentKind()==='inleg'?(['','#start'].includes(location.hash)?{monthly:simulationData().monthly,years:simulationData().years}:(getWork().monthly||{monthly:200,years:10})):currentKind()==='kosten'?(getWork().costs||emptyCost()):{weight:Number.isFinite(getWork().spread?.weight)?getWork().spread.weight:25,shock:40}),source:history.state?.learningSource||null,model:NorteLearningMath.version});
  const inquiryText=x=>x.kind==='inleg'?`${x.inputs.target?'Doel '+euros(x.inputs.target)+' · ':''}${euros(x.inputs.monthly)} per maand · ${x.inputs.years} jaar · alleen inleg`:x.kind==='kosten'?`${euros(x.inputs.amount)} · ${x.inputs.years} jaar · ${formatPct(x.inputs.costA)}% en ${formatPct(x.inputs.costB)}% jaarlijkse kosten · ${formatPct(x.inputs.gross)}% rekenaanname`:`Eén positie ${x.inputs.weight}% · voorbeeldscenario −40%`;
  const nav=selected=>`<nav class="knowledge-nav" aria-label="Kennisomgeving"><a href="#ontdekken" ${selected==='ontdekken'?'aria-current="page"':''}>Ontdekken</a><a href="#leren" ${selected==='leren'?'aria-current="page"':''}>Leren</a></nav>`;
  const returnLink=()=>ticket()?`<a class="back return-context" href="${esc(ticket().route)}" data-learning-return>${backArrow}Terug naar uw plan</a>`:'';
  const top=(label,href)=>`<div class="subpage-top">${ticket()&&href===ticket().route?'':back(label,href)}${returnLink()}</div>`;
  const status=()=>ticket()?`<p class="learning-context">Bij ${ticket().mode==='draft'?'uw voorbereiding':'uw adviseurplan'} · ${esc(ticket().part)}<span>U onderzoekt een voorbeeld. Uw plan blijft bewaard.</span></p>`:'';
  const trialAction=()=>ticket()?`<button type="button" class="button dark" data-loop-action="return">Terug naar uw plan ${arrow}</button>${ticket().mode==='draft'?'<button type="button" class="text-action" data-loop-action="keep">Bewaar deze proef bij mijn voorbereiding '+arrow+'</button>':'<button type="button" class="text-action" data-loop-action="question">Neem mee als vraag '+arrow+'</button>'}`:`<button type="button" class="button dark" data-loop-action="start">Naar uw plan ${arrow}</button>`;
  const addPlanLinks=()=>`<div class="plan-learning-links"><a href="#lezen/spreiding">Spreiding begrijpen ${arrow}</a><a href="#lezen/kosten">Kosten begrijpen ${arrow}</a></div>`;

  journalEntries.kosten={type:'leren',kind:'Kosten begrijpen',title:'Wat kost een klein verschil?',lead:'Kosten gaan mee door de tijd. Onderzoek één effect, met gelijke aannames.',concept:'kosten',source:'https://www.wikifin.be/nl/sparen-en-beleggen/beleggingsproducten/aandeel/welke-kosten-heb-je-bij-het-beleggen-aandelen',body:'<h2>Begin bij wat u vergelijkt.</h2><p>Bij beleggen kunnen verschillende soorten kosten horen. Vraag welke kosten gelden en welke dienstverlening daar tegenover staat.</p><h2>Maak één verschil zichtbaar.</h2><p>In deze proef veranderen alleen de jaarlijkse procentuele kosten. Het startbedrag, de looptijd en de aangenomen groei zijn voor beide voorbeelden gelijk. Zo kunt u dat ene effect onderzoeken.</p><p>Een vergelijking van oplossingen vraagt ook aandacht voor risico, kenmerken en dienstverlening.</p>'};
  journalEntries.banken={type:'verhalen',kind:'In de praktijk · 2008',title:'Een vertrouwde naam. Toch afhankelijk.',lead:'De crisis rond Fortis als vertrekpunt om spreiding te begrijpen.',concept:'spreiding',source:'https://www.rekenkamer.nl/onderwerpen/k/kredietcrisis/lopende-interventies/overname-fortis-abn-amro',body:'<p>In 2008 dreigde Fortis failliet te gaan. De Nederlandse Staat nam de Nederlandse onderdelen over. De Algemene Rekenkamer beschrijft die ingreep en de gevolgen voor de Staat.</p><h2>Wat vertrouwd voelt, kan zwaar wegen.</h2><p>Stel u een belegger voor die een groot deel van zijn vermogen aan één bekende financiële onderneming heeft verbonden. Dit is een fictieve persoon, bedoeld om de afhankelijkheid tastbaar te maken.</p><blockquote>Een bekende naam is iets anders dan een gespreid geheel.</blockquote><h2>De les achter het verhaal.</h2><p>De proef hieronder onderzoekt alleen het gewicht van één positie bij een veronderstelde daling. Ze reconstrueert de Fortis-crisis niet. Meerdere beleggingen kunnen tegelijk dalen.</p>'};
  topics.kosten={name:'Kosten begrijpen',title:journalEntries.kosten.title,category:'Kosten',stage:4};
  topics.banken={name:'Spreiding',title:journalEntries.banken.title,category:'In de praktijk',stage:4};

  const oldDiscover=discover;
  discover=()=>`${top('Startpagina','#start')}<section class="journal-heading"><h1>Sparen en beleggen begrijpen.</h1>${nav('ontdekken')}</section><div class="journal-opening"><a class="journal-lead" href="#lezen/banken"><div class="history-art" aria-hidden="true"><span>2008</span><small>Fortis · Een les over spreiding</small></div><div class="journal-lead-copy"><span class="small-label">In de praktijk</span><h2>Een vertrouwde naam.<br>Toch afhankelijk.</h2><p>Wat de crisis rond Fortis helpt begrijpen over spreiding.</p><span class="text-action">Lees het verhaal ${arrow}</span></div></a><a class="journal-try academy-entry" href="#leren"><span class="small-label">De basis</span><h2>Hoe werkt<br>beleggen?</h2><div class="academy-lines" aria-hidden="true"><span>01 — Spreiding</span><span>02 — Kosten</span><span>03 — Fondsen</span></div><span class="entry-action">Bekijk de basis ${arrow}</span></a></div><div class="editorial-pair"><a class="cost-editorial" href="#lezen/kosten"><span class="small-label">Een concept begrijpen</span><h2>Wat kost een<br>klein verschil?</h2><div class="cost-motif" aria-hidden="true"><i></i><i></i></div><span class="text-action">Lees en probeer ${arrow}</span></a>${journalCard('asml')}</div>`;

  const units=[{id:'spreiding',name:'Spreiding',promise:'Begrijp waar u van afhankelijk bent.',answer:'b',question:'U bezit aandelen van tien banken. Wat kunt u daaruit besluiten?',options:[['a','Tien namen betekent voldoende spreiding.'],['b','Er kan nog een sterke afhankelijkheid van één sector zijn.']],explanation:'Het aantal namen zegt niet alles. Ook hun gewicht en gedeelde afhankelijkheden tellen mee.',next:'kosten'}, {id:'kosten',name:'Kosten',promise:'Zie wat een jaarlijks verschil doet.',answer:'a',question:'Wat houdt de kostenproef voor beide voorbeelden gelijk?',options:[['a','Startbedrag, looptijd en aangenomen groei.'],['b','De toekomstige uitkomst.']],explanation:'Alleen het kostenniveau verschilt. De proef geeft geen voorspelling van een echte belegging.',next:'fonds'}, {id:'fonds',name:'Fondsen',promise:'Kijk onder de verpakking.',answer:'b',question:'Is elk fonds vanzelf breed gespreid?',options:[['a','Ja, omdat het een fonds is.'],['b','Nee, de onderliggende beleggingen en hun samenhang tellen.']],explanation:'Een fonds kan op één sector, regio of type belegging gericht zijn.',next:null}];
  state.learningProgress=state.learningProgress||{};
  function academy(){const count=units.filter(u=>state.learningProgress[u.id]?.passed).length;return `${top('Startpagina','#start')}<section class="journal-heading"><h1>Beleggen begrijpen.</h1>${nav('leren')}</section><section class="course-layout"><div class="course-intro"><p>Drie korte onderdelen. Lees, probeer en toets wat u begrijpt.</p><p class="course-progress">${count} van 3 afgerond</p><progress max="3" value="${count}" aria-label="Voortgang leerpad"></progress><small>Voortgang blijft in deze tabsessie.</small></div><ol class="course-units">${units.map((u,i)=>`<li><a href="#leren/${u.id}"><span class="unit-no">0${i+1}</span><div><h2>${u.name}</h2><p>${u.promise}</p></div><span>${state.learningProgress[u.id]?.passed?'Afgerond':state.learningProgress[u.id]?.answer?'Hervatten':arrow}</span></a></li>`).join('')}</ol></section>`;}
  function unit(id){const u=units.find(x=>x.id===id)||units[0],p=state.learningProgress[u.id]||{},x=journalEntries[u.id],index=units.indexOf(u);return `${top('Leerpad','#leren')}${status()}<div class="reading-layout lesson-layout"><article class="reading-paper"><span class="small-label">0${index+1} van 03 · ${u.name}</span><h1>${u.promise}</h1><div class="article-body"><p>${x.lead}</p>${x.body}${u.id==='spreiding'?link('Het verhaal: de bankencrisis','#lezen/banken'):''}${u.id!=='fonds'?link(u.id==='kosten'?'Probeer het effect van kosten':'Probeer het gewicht van één positie','#proberen/'+u.id,'button dark'):''}<form class="understanding-check" data-unit="${u.id}"><fieldset><legend>${u.question}</legend>${u.options.map(([value,label])=>`<label><input type="radio" name="understanding" value="${value}" required ${p.answer===value?'checked':''}>${label}</label>`).join('')}</fieldset><button class="text-action" type="submit">Bekijk de uitleg ${arrow}</button><div class="understanding-feedback" role="status">${p.checked?`${p.passed?'Dat klopt.':'Bekijk het nog eens.'} ${u.explanation}`:''}</div>${p.passed?link(u.next?'Volgend onderdeel':'Terug naar het leerpad',u.next?'#leren/'+u.next:'#leren','button dark'):''}</form><p class="prototype-note">Een oefenvraag bij deze uitleg. Geen formele beoordeling van uw kennis of ervaring.</p></div></article></div>`;}
  pages.leren=()=>location.hash.split('/')[1]?unit(location.hash.split('/')[1]):academy();

  const oldStory=journalStory;
  journalStory=id=>{
    if(!journalEntries[id])return oldStory(id);
    const x=journalEntries[id],kind=x.concept==='inleg'?'inleg':x.concept==='kosten'?'kosten':'spreiding';
    const origin=history.state?.readingFrom||'#ontdekken';
    return `${top(origin.startsWith('#leren')?'Terug naar de les':origin.startsWith('#proberen')?'Terug naar de proef':isPlan(origin)?'Terug naar het onderdeel':'Ontdekken',origin)}${status()}<div class="reading-layout journal-reading"><article class="reading-paper"><span class="small-label">${x.kind}</span><h1>${x.title}</h1><p class="lead">${x.lead}</p><div class="article-body">${x.body}${x.source?`<p class="article-source">Bron: <a href="${esc(x.source)}" target="_blank" rel="noreferrer">${id==='banken'?'Algemene Rekenkamer':id==='asml'?'ASML':'Wikifin'}</a></p>`:''}<section class="article-experiment"><span class="small-label">Zelf onderzoeken</span><h2>${kind==='kosten'?'Wat doet een jaarlijks verschil?':kind==='inleg'?'Wat doet uw eigen inleg?':'Hoe zwaar weegt één positie?'}</h2><p>${kind==='kosten'?'Vergelijk twee kostenniveaus met dezelfde aannames.':'Verander één invoer en bekijk het effect.'}</p>${link('Probeer het voorbeeld',kind==='inleg'?'#simuleren/ritme':'#proberen/'+kind,'button dark')}</section>${link('Verder leren over '+(kind==='kosten'?'kosten':'spreiding'),'#leren/'+(kind==='kosten'?'kosten':'spreiding'))}</div></article><aside class="reading-aside">${ticket()?'':`<h2>Uw eigen<br>vertrekpunt?</h2>${link('Maak uw plan','#voorbereiden/1/'+id,'button')}`}</aside></div>`;
  };

  function costInputs(){return getWork().costs||emptyCost();}
  function costResults(x){const r=NorteLearningMath.costs(x);if(!r)return '<p>Vul de velden hierboven in om het verschil te bekijken.</p>';return `<dl class="cost-comparison"><div><dt>Bij ${formatPct(x.costA)}% kosten</dt><dd>${euros(r.endA)}</dd></div><div><dt>Bij ${formatPct(x.costB)}% kosten</dt><dd>${euros(r.endB)}</dd></div></dl><p class="cost-difference">${euros(Math.abs(r.difference))} verschil in eindkapitaal</p>`;}
  function costsPage(){const x=costInputs(),origin=history.state?.simFrom||'#lezen/kosten';return `${top(origin.startsWith('#leren')?'Terug naar de les':isPlan(origin)?'Terug naar het onderdeel':'Terug naar de uitleg',origin)}${status()}<section class="cost-test"><div class="cost-intro"><span class="small-label">Kosten · Zelf onderzoeken</span><h1>Een klein verschil.<br>Jaar na jaar.</h1><p>Twee voorbeelden. Alleen de jaarlijkse kosten verschillen.</p></div><form id="cost-form"><div class="cost-fields"><label>Startbedrag (€)<input id="cost-amount" name="amount" type="number" min="0" max="1000000" step="1" required value="${x.amount}"></label><label>Looptijd in jaren<input id="cost-years" name="years" type="number" min="1" max="50" step="1" required value="${x.years}"></label><label>Jaarlijkse kosten A (%)<input id="cost-a" name="costA" type="number" min="0" max="5" step="0.1" required value="${x.costA}"></label><label>Jaarlijkse kosten B (%)<input id="cost-b" name="costB" type="number" min="0" max="5" step="0.1" required value="${x.costB}"></label></div><label class="gross-assumption">Gedeelde rekenaanname: groei vóór kosten (%)<input id="cost-gross" name="gross" type="number" min="-20" max="20" step="0.5" required value="${x.gross}"></label><div id="cost-result" aria-live="polite" aria-atomic="true">${costResults(x)}</div><p class="cost-assumptions">Eenmalige inleg. Elk jaar eerst de aangenomen groei, daarna de jaarlijkse kosten over die waarde. Zonder belastingen, inflatie, instap- of uitstapkosten. Geen prognose of productvergelijking.</p><div class="trial-actions">${trialAction()}</div><a class="text-action cost-read-more" href="#lezen/kosten">Lees de uitleg ${arrow}</a></form></section>`;}
  const oldConcept=conceptTest;
  conceptTest=()=>{
    if(currentKind()==='kosten')return costsPage();
    state.conceptTrial={...(getWork().spread||{weight:25,shock:40}),source:history.state?.learningSource||null};
    const html=oldConcept();
    return html.replace(/<button class="button dark[\s\S]*?<\/button>/,`<div class="trial-actions">${trialAction()}</div>`).replace('</div><section class="concept-test">','</div>'+status()+'<section class="concept-test">');
  };
  const oldUpdateConcept=updateConcept;
  updateConcept=()=>{oldUpdateConcept();getWork().spread={weight:conceptData().weight,shock:40};persist();};

  const oldSimulate=simulate,oldUpdateSimulation=updateSimulation;
  simulate=id=>{
    state.simulation=clone(getWork().monthly||{monthly:200,years:10});
    let html=oldSimulate(id).replace('id="simulation-form"','id="loop-monthly-form"').replace(/<button type="submit"[\s\S]*?<\/button>/,`<div class="trial-actions">${trialAction()}</div>`).replace('</div><section class="quick-simulation">','</div>'+status()+'<section class="quick-simulation">');
    if(id==='doel'){
      const target=getWork().monthly?.target||25000;getWork().monthly={...simulationData(),target};persist();
      html=html.replace('Wat als u elke maand<br>iets opzijzet?','Simuleer uw doel.').replace('<div class="simulation-fields">',`<div class="goal-target-control"><label for="sim-target">Uw doelbedrag (€)</label><input id="sim-target" type="number" min="1" max="100000000" step="1" required value="${target}"></div><div class="simulation-fields">`).replace('<p class="calculation-note">',`<p id="goal-comparison" class="goal-comparison">${goalComparison(getWork().monthly)}</p><p class="calculation-note">`);
    }
    return html;
  };
  updateSimulation=()=>{oldUpdateSimulation();const input=document.querySelector('#sim-monthly');if(input?.value!==''&&input?.validity.valid){getWork().monthly={...getWork().monthly,...clone(simulationData())};persist();}document.querySelectorAll('#loop-monthly-form [data-loop-action="start"],#loop-monthly-form [data-loop-action="keep"],#loop-monthly-form [data-loop-action="question"]').forEach(b=>b.disabled=!input?.validity.valid||input?.value==='');};

  function goalComparison(x){const total=x.monthly*12*x.years,difference=x.target-total;return difference>0?`${euros(difference)} minder dan uw doelbedrag, op basis van alleen uw inleg.`:difference===0?'Uw inleg is gelijk aan uw doelbedrag.':`${euros(-difference)} meer dan uw doelbedrag, op basis van alleen uw inleg.`;}
  function updateGoalComparison(){
    const form=document.querySelector('#loop-monthly-form'),target=document.querySelector('#sim-target');if(!target||!form)return;
    const valid=form.checkValidity();if(valid){getWork().monthly={...simulationData(),target:Number(target.value)};persist();}
    document.querySelector('#goal-comparison').textContent=valid?goalComparison(getWork().monthly):'Vul uw doelbedrag en inleg in om te vergelijken.';
    form.querySelectorAll('[data-loop-action="start"],[data-loop-action="keep"],[data-loop-action="question"]').forEach(b=>b.disabled=!valid);
  }
  document.addEventListener('input',e=>{if(['sim-target','sim-monthly','sim-range'].includes(e.target.id))updateGoalComparison();});
  document.addEventListener('change',e=>{if(e.target.id==='sim-years')updateGoalComparison();});

  const oldPrepare=prepare;
  prepare=n=>{
    let html=oldPrepare(n);
    if(state.preparationInquiry){const x=state.preparationInquiry;html=html.replace(/<p class="context-tag">[\s\S]*?<\/p>/,'');html=html.replace('<p>'+steps[n-1][2]+'</p>',`<p>${steps[n-1][2]}</p><div class="inquiry-summary"><span>Uw bewaarde proef · ${titleOf(x.kind)}</span><p>${esc(inquiryText(x))}</p><a href="${inquiryRoute(x.kind,x.inputs)}">Opnieuw onderzoeken ${arrow}</a></div>`);}
    if(n===4)html=html.replace('<div class="actions">',addPlanLinks()+'<div class="actions">');
    return html;
  };
  const questionMarkup=planId=>(state.learningQuestions||[]).map((q,i)=>q.plan===planId?`<details class="saved-learning-question"><summary>Vraag voor een volgend gesprek: ${esc(q.title)}</summary><p>${esc(inquiryText(q.inquiry))}</p><a href="${inquiryRoute(q.inquiry.kind,q.inquiry.inputs)}" data-learning-question="${i}">Bekijk deze proef opnieuw ${arrow}</a><p>Alleen een ontwerpnotitie; niets verzonden. Uw adviseurplan is niet gewijzigd.</p></details>`:'').join('');
  const oldPlan=plan;
  plan=advisor=>oldPlan(advisor)+(advisor?questionMarkup('advisor-example'):'');
  const oldRelated=relatedToTab;
  relatedToTab=()=>oldRelated()+addPlanLinks();
  const oldConfirmed=confirmedPlan;
  confirmedPlan=()=>oldConfirmed()+`<section class="plan-understanding"><h2>Uw aanpak begrijpen</h2>${addPlanLinks()}${questionMarkup('confirmed-example')}</section>`;
  const oldSummary=preparationSummary;
  preparationSummary=(snapshot=null)=>oldSummary(snapshot)+((snapshot?snapshot.inquiry:state.preparationInquiry)?`<p class="handoff-inquiry">Bewaarde proef: ${esc(inquiryText(snapshot?snapshot.inquiry:state.preparationInquiry))}. Te bespreken, geen bevestigde keuze.</p>`:'');

  function returnToPlan(t,trigger){
    capture(trigger);state.tab=t.tab;persist();
    const key='return-'+Date.now()+'-'+(++counter);
    history.pushState({...t.history,learningTicket:null,key},'',t.route);currentKey=key;
    positions.set(key,{scroll:t.scroll,focus:t.focus});render(true);
  }
  const oldNavigate=navigate;
  navigate=(hash,trigger)=>{
    const from=location.hash||'#start',existing=ticket();
    if(existing&&hash===existing.route){returnToPlan(existing,trigger);return;}
    let nextTicket=isLearning(hash)?existing:undefined;
    if(isPlan(from)&&isLearning(hash)){
      const id='learn-'+Date.now()+'-'+(++counter),mode=from.startsWith('#voorbereiden')||from==='#eigen-plan'?'draft':'readonly';
      const originalHistory={...history.state};delete originalHistory.learningTicket;
      nextTicket={id,route:from,history:originalHistory,mode,plan:from==='#bevestigd-plan'?'confirmed-example':mode==='draft'?'draft-example':'advisor-example',tab:state.tab,part:from==='#bevestigd-plan'?'De besproken aanpak':from.startsWith('#voorbereiden')?steps[Math.max(0,Number(from.split('/')[1])-1)]?.[0]||'Uw voorbereiding':({doelen:'Uw doelen',aanpak:'De aanpak',afspraken:'Afspraken'}[state.tab]||'Uw aanpak'),scroll:scrollY,focus:trigger?.dataset.focus,initial:{}};
      const saved=state.preparationInquiry;
      if(saved&&mode==='draft'){nextTicket.initial[saved.kind==='kosten'?'costs':saved.kind==='inleg'?'monthly':'spread']=clone(saved.inputs);nextTicket.source=saved.source;}
    }
    if(nextTicket&&trigger?.dataset.learningQuestion!==undefined){const q=state.learningQuestions?.[Number(trigger.dataset.learningQuestion)];if(q&&q.plan===nextTicket.plan){nextTicket.initial[q.inquiry.kind==='kosten'?'costs':q.inquiry.kind==='inleg'?'monthly':'spread']=clone(q.inquiry.inputs);nextTicket.source=q.inquiry.source;}}
    let source=history.state?.learningSource||nextTicket?.source||null;
    if(from.startsWith('#lezen/'))source=from.split('/')[1];
    const previousInquiry=state.preparationInquiry;
    const publicCostStart=state.preparationInquiry&&!existing&&(from.startsWith('#proberen')||from.startsWith('#simuleren'))&&hash.startsWith('#voorbereiden');
    oldNavigate(hash,trigger);
    if(publicCostStart){state.preparationConcept=null;state.preparationSimulation=null;state.preparationSource=source;persist();render();}
    if(isLearning(hash)){
      history.replaceState({...history.state,learningTicket:nextTicket||null,learningSource:source},'',location.href);
      render(false);
    }else if(isPlan(hash)&&!isPlan(from)&&previousInquiry){
      // Existing draft inquiries survive an unrelated read → prepare transition.
      state.preparationInquiry=previousInquiry;persist();
    }
  };
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-loop-action]');if(!button)return;
    const action=button.dataset.loopAction,t=ticket();
    if(action==='return'){returnToPlan(t,button);return;}
    if(action==='keep'||action==='start'){
      const inquiry=readInquiry();
      if(action==='keep'&&t?.mode!=='draft')return;
      state.preparationInquiry=inquiry;persist();
      if(t)returnToPlan(t,button);else navigate('#voorbereiden/1/'+(inquiry.source||inquiry.kind),button);
    }else if(action==='question'&&t){
      const x=readInquiry();state.learningQuestions=state.learningQuestions||[];
      const note={plan:t.plan,title:titleOf(x.kind),inquiry:x};
      const index=state.learningQuestions.findIndex(q=>q.plan===t.plan&&q.title===note.title);
      if(index>=0)state.learningQuestions[index]=note;else state.learningQuestions.push(note);
      persist();returnToPlan(t,button);
    }
  });
  document.addEventListener('input',e=>{
    if(e.target.closest('#cost-form')){
      const form=document.querySelector('#cost-form'),valid=form.checkValidity();
      const x=Object.fromEntries(['amount','years','costA','costB','gross'].map(k=>[k,form.elements.namedItem(k).value===''?NaN:Number(form.elements.namedItem(k).value)]));
      document.querySelector('#cost-result').innerHTML=valid?costResults(x):'<p>Vul de velden in om het verschil te bekijken.</p>';
      form.querySelectorAll('[data-loop-action="keep"],[data-loop-action="start"],[data-loop-action="question"]').forEach(b=>b.disabled=!valid);
      if(valid){getWork().costs=x;persist();}
    }
    if(e.target.name==='understanding'){
      const form=e.target.closest('form'),id=form.dataset.unit;state.learningProgress[id]={answer:e.target.value};persist();form.querySelector('.understanding-feedback').textContent='';form.querySelector('a.button')?.remove();
    }
  });
  document.addEventListener('submit',e=>{
    if(['cost-form','loop-monthly-form'].includes(e.target.id))e.preventDefault();
    if(e.target.matches('.understanding-check')){
      e.preventDefault();const u=units.find(x=>x.id===e.target.dataset.unit),answer=new FormData(e.target).get('understanding');
      state.learningProgress[u.id]={answer,checked:true,passed:answer===u.answer};persist();
      const scroll=scrollY;render();window.scrollTo(0,scroll);document.querySelector('.understanding-feedback').tabIndex=-1;document.querySelector('.understanding-feedback').focus({preventScroll:true});
    }
    if(e.target.id==='appointment-form'){
      // Existing handler takes its snapshot first; enrich only the pending request.
      if(state.requestDemo){state.requestDemo.inquiry=clone(state.preparationInquiry||null);persist();render();}
    }
  });
  pages.ontdekken=discover;
  pages['bevestigd-plan']=confirmedPlan;
  const oldHelp=helpContext;
  helpContext=()=>location.hash.startsWith('#proberen/kosten')?'Kosten onderzoeken':location.hash.startsWith('#leren')?'Beleggen leren':oldHelp();
}
