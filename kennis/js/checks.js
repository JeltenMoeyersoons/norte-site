/* Norte Kennis — vrijwillige korte checks per onderwerp (gedeelde bron voor de leerlaag en het losse voorstel).
   Situaties volgen de bestaande uitleg over obligaties en de staatsbon van 2023. Nu alleen obligaties. */
window.NORTE_CHECKS = {
  obligaties: { naam:'Obligaties', les:'bouwstenen', verder:'verpakking', verderLabel:'Verder met fondsen',
    uitnodiging:'De rente stijgt. Wat gebeurt er met een obligatie?',
    situaties:[
      { id:'rente', rij:'Rente en verkoopprijs',
        context:'Jan heeft een obligatie met een vaste coupon van 3 % per jaar. Ze loopt nog acht jaar. Nieuwe, vergelijkbare obligaties bieden nu 4,5 %.',
        vraag:'Jan wil zijn obligatie nu verkopen. Wat gebeurt er doorgaans met de prijs?',
        opties:['Die daalt doorgaans', 'Die stijgt, want de rente is gestegen', 'Die blijft gelijk, want de coupon blijft 3 %'], juist:0,
        uitleg:'Een koper kan nu 4,5 % krijgen op een nieuwe obligatie en betaalt voor Jans 3 % daarom minder. Hoeveel minder, hangt vooral af van de resterende looptijd. De coupon blijft de afspraak: houdt Jan de obligatie tot de vervaldag, dan krijgt hij het nominale bedrag terug, als de uitgever kan betalen.' },
      { id:'uitgever', rij:'Terugbetaling door uitgever',
        context:'Sara vergelijkt twee obligaties van vijf jaar. De Belgische staat biedt 3 % per jaar, een bedrijf dat het moeilijk heeft 9 %.',
        vraag:'Wat verklaart vooral dat verschil in rente?',
        opties:['Het bedrijf verdient meer en deelt dat met beleggers', 'De kans dat het bedrijf niet terugbetaalt, is groter', 'Een hogere rente wijst op een betere obligatie'], juist:1,
        uitleg:'Een obligatie is een lening: of u rente en inleg terugkrijgt, hangt af van wie ze uitgeeft. Wie riskanter leent, moet meer rente bieden. Een opvallend hoge rente is dus een reden om na te gaan waarom. Ook de Belgische staat is niet zonder risico, al wordt dat laag ingeschat.' },
      { id:'vervaldag', rij:'Verkopen vóór de vervaldag',
        context:'Els kocht een obligatie die over zes jaar vervalt. Over een jaar heeft ze het geld nodig voor een verbouwing.',
        vraag:'Wat moet Els weten als ze vóór de vervaldag verkoopt?',
        opties:['Ze krijgt gewoon haar inleg terug', 'Ze verkoopt tegen de prijs van dat moment, hoger of lager', 'Ze kan de obligatie altijd aan de uitgever teruggeven'], juist:1,
        uitleg:'Het nominale bedrag komt pas op de vervaldag terug. Wie eerder verkoopt, krijgt de marktprijs van dat moment; die hangt af van de rente en van het vertrouwen in de uitgever, en er kunnen verkoopkosten zijn. Geld dat u binnenkort nodig hebt, past daarom vaak beter bij een vorm die dan beschikbaar is.' }
    ] }
};
