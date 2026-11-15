/* Preserve old public knowledge links while keeping the accepted knowledge source unchanged. */
(()=>{'use strict';const raw=location.hash.slice(1);if(!raw||raw.startsWith('/'))return;
const aliases={'inflatie':'koopkracht','fondsen-etf':'verpakking','fondsen':'verpakking','aandelen':'bouwstenen','obligaties':'bouwstenen','risico-horizon':'spreiding','regelmatige-inleg':'instappen','van-ooit-naar-plan':'kind','buffer':'sparen-of-beleggen','wat-heeft-u':'sparen-of-beleggen'};
let dest='#/';if(raw==='leren'||raw.startsWith('pad-'))dest='#/leren';else if(/^(a-|k-|verkennen-)/.test(raw)){const id=raw.replace(/^(a-|k-|verkennen-)/,'');const target=aliases[id]||id;dest=window.NORTE_INHOUD?.artikels.some(a=>a.id===target)?'#/artikel/'+target:'#/leren';}
history.replaceState(history.state,'',location.pathname+location.search+dest);
})();
