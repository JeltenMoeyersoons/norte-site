const films = [
 {key:'tesla',id:'r5vsHHPVhJg',credit:'Tesla · The Kickflip',start:10,end:19,audioTail:1.1},
 {key:'astra',id:'1QNsdr-Qx_I',credit:'OpenAI · Introducing GPT-6 Astra',start:67,end:74.8,audioTail:.7},
 {key:'mens',id:'V1Lxp-Q6Y9g',credit:'Boston Dynamics · Atlas / Ghost Rabona',start:20,end:32,audioTail:1.1},
 {key:'intuitive',id:'TGjnb86HndU',credit:'Intuitive · da Vinci SP',start:13,end:25,audioTail:1.1},
 {key:'amazon',id:'uTn1aLz9hhA',credit:'Amazon · Prime Air',start:25,end:38.5,audioTail:1.1}
];
const cinema=document.querySelector('.cinema'), layer=document.querySelector('.route-layer');
const soundButton=document.querySelector('#sound'), params=new URLSearchParams(location.search);
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const SOFT_VOLUME=8, FADE_IN_MS=700, OUTRO_MS=reduceMotion?0:850;
const readKey=k=>{try{return localStorage.getItem(k)}catch{return null}};
const saveKey=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
const sessionRead=k=>{try{return sessionStorage.getItem(k)}catch{return null}};
const sessionSave=(k,v)=>{try{sessionStorage.setItem(k,v)}catch{}};
let next=Number(readKey('norte-intro-next')||0);if(!Number.isFinite(next))next=0;
const selected=films.find(f=>f.key===params.get('film'))||films[next%films.length];
const source=document.querySelector('#source-link');
source.href='https://www.youtube.com/watch?v='+selected.id+'&t='+selected.start;
source.textContent=selected.credit+' · YouTube';
let player, ready=false, apiRequested=false, phase='idle', generation=0;
let intent=sessionRead('norte-audio')==='off'?'off':'on';
let blocked=false, suspended=false, resumeWithSound=false, lastCaptions;
let tickTimer, loadTimer, watchdog, phaseTimer, navigationTimer, startGate;
let rampStart=0, commandedVolume=-1, curve=[];
const active=()=>phase==='loading'||phase==='playing';
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
function setPhase(value){phase=value;cinema.dataset.stage=value;}
function clearPlaybackTimers(){clearInterval(tickTimer);clearTimeout(startGate);clearTimeout(loadTimer);clearTimeout(watchdog);}
function cancelRun(){generation++;clearPlaybackTimers();clearTimeout(phaseTimer);clearTimeout(navigationTimer);}
function volume(value){
 const level=Math.round(Math.max(0,Math.min(SOFT_VOLUME,value)));
 if(ready&&commandedVolume!==level){player.setVolume(level);commandedVolume=level;}
 cinema.dataset.volumeTarget=String(level);
}
function silence(){if(!ready)return;volume(0);player.mute();player.pauseVideo();}
function preview(role){document.querySelectorAll('.page-preview').forEach(f=>f.classList.toggle('active',f.dataset.role===role));}
preview(readKey('norte-role')==='makelaar'?'makelaar':'klant');
function soundLabel(){
 const audible=ready&&phase==='playing'&&!suspended&&!player.isMuted()&&player.getVolume()>0;
 cinema.dataset.playerAudio=audible?'unmuted':'muted';
 soundButton.disabled=!ready||(phase==='loading'&&!suspended);
 soundButton.textContent=suspended?'Verder kijken':!ready||phase==='loading'?'Geluid laden…':cinema.dataset.volumeControl==='unconfirmed'?'Geluid via YouTube':audible?'Geluid uitzetten':'Geluid inschakelen';
 soundButton.setAttribute('aria-pressed',String(audible));
 soundButton.classList.toggle('needs-gesture',ready&&!audible);
 soundButton.title='Zachte weergave, maximaal 8 op 100. Uw apparaatvolume blijft bepalend.';
}
// Caption module controls are feature-detected; they are not guaranteed by every YouTube player.
// A deliberate fade to volume zero is NOT a mute preference and must not flash captions on.
function syncCaptions(wanted){
 if(!ready||!active())return;
 cinema.dataset.captionsRequested=wanted?'on':'off';
 if(lastCaptions===wanted)return;
 const method=wanted?'loadModule':'unloadModule';
 if(typeof player[method]!=='function'){cinema.dataset.captionsSupport='unavailable';return;}
 lastCaptions=wanted;
 try{player[method]('captions');cinema.dataset.captionsSupport='requested';}
 catch{lastCaptions=undefined;cinema.dataset.captionsSupport='unavailable';}
}
function observe(time){
 const sample={time:Number(time.toFixed(2)),volume:player.getVolume(),muted:player.isMuted()};
 cinema.dataset.mediaTime=String(sample.time);
 cinema.dataset.playerVolume=String(sample.volume);
 if(!curve.length||curve.at(-1).volume!==sample.volume||curve.at(-1).muted!==sample.muted){
  curve.push(sample);if(curve.length>48)curve.shift();
  cinema.dataset.audioCurve=JSON.stringify(curve);
 }
}
function startTick(){
 clearInterval(tickTimer);const run=generation;
 tickTimer=setInterval(()=>{
  if(run!==generation||!active()||!ready||suspended)return;
  const time=player.getCurrentTime();
  if(phase==='playing'){
   if(time>=selected.end-.04){observe(time);finishFilm();return;}
   if(!reduceMotion&&time>=selected.end-OUTRO_MS/1000){document.body.classList.add('outro');cinema.dataset.outroStarted='true';}
   if(intent!=='off'&&!blocked&&!player.isMuted()){
    const fadeIn=smooth((performance.now()-rampStart)/FADE_IN_MS);
    const fadeOut=smooth((selected.end-time)/selected.audioTail);
    volume(Math.min(Math.max(1,SOFT_VOLUME*fadeIn),SOFT_VOLUME*fadeOut));
   }
  }
  observe(time);
  syncCaptions(intent==='off'||blocked||player.isMuted());
  soundLabel();
 },80);
}
function showChoices(focus=true){
 cancelRun();setPhase('choices');silence();cinema.hidden=true;layer.hidden=false;
 document.body.classList.remove('outro','ending','phase-one','phase-two');
 document.body.classList.add('choosing');saveKey('norte-intro-seen','1');
 if(focus)document.querySelector('#routes-title').focus({preventScroll:true});
}
function showStatements(){
 if(phase==='choices'||phase==='leaving')return;
 const run=generation;setPhase('statement');
 document.body.classList.remove('outro');document.body.classList.add('ending','phase-one');
 phaseTimer=setTimeout(()=>{
  if(run!==generation)return;
  document.body.classList.remove('phase-one');setPhase('text-gap');
  phaseTimer=setTimeout(()=>{
   if(run!==generation)return;
   document.body.classList.add('phase-two');setPhase('question');
   phaseTimer=setTimeout(()=>{if(run===generation)showChoices();},3200);
  },250);
 },2200);
}
function finishFilm(){
 if(!active())return;
 clearPlaybackTimers();const run=generation;
 const alreadyDissolving=document.body.classList.contains('outro');setPhase('outro');
 // Hide the whole player before pausing, so YouTube's pause/end overlay does not flash.
 volume(0);if(ready)player.mute();document.body.classList.add('outro');
 phaseTimer=setTimeout(()=>{if(run===generation){silence();showStatements();}},alreadyDissolving?140:OUTRO_MS);
}
function failed(){
 if(!active())return;
 document.querySelector('#intro-note').hidden=false;document.body.classList.add('no-film');finishFilm();
}
function prepareAndPlay(){
 if(!ready||!active())return;
 if(document.hidden){suspended=true;resumeWithSound=false;silence();soundLabel();return;}
 clearTimeout(loadTimer);clearTimeout(startGate);
 // No autoplay race. Check the low volume acknowledgement before requesting audible playback.
 player.mute();volume(1);player.seekTo(selected.start,true);
 const run=generation, started=performance.now();
 const startWhenSoft=()=>{
  if(run!==generation||!active()||suspended)return;
  const acknowledged=player.getVolume();
  if(acknowledged>1&&performance.now()-started<900){startGate=setTimeout(startWhenSoft,40);return;}
  cinema.dataset.startVolumeConfirmed=String(acknowledged);
  const safe=acknowledged<=SOFT_VOLUME;
  if(!safe){blocked=true;cinema.dataset.volumeControl='unconfirmed';}
  rampStart=performance.now();
  if(intent==='off'||blocked)player.mute();else player.unMute();
  player.playVideo();startTick();soundLabel();
  loadTimer=setTimeout(()=>{if(run===generation&&phase==='loading'&&!suspended)failed();},6000);
 };
 startWhenSoft();
}
function makePlayer(){
 if(player||!active())return;
 player=new YT.Player('film',{
  host:selected.key==='amazon'?'https://www.youtube.com':'https://www.youtube-nocookie.com',videoId:selected.id,
  playerVars:{autoplay:0,mute:1,controls:0,playsinline:1,rel:0,cc_load_policy:0,cc_lang_pref:'nl',hl:'nl',start:selected.start,end:Math.ceil(selected.end+2),origin:location.origin},
  events:{
   onReady:event=>{ready=true;commandedVolume=-1;if(!active()){silence();return;}prepareAndPlay();},
   onStateChange:event=>{
    if(!active()){if(event.data===1)silence();return;}
    if(event.data===1){
     if(suspended||document.hidden){silence();return;}
     const first=phase==='loading';setPhase('playing');cinema.dataset.playback='playing';
     clearTimeout(loadTimer);clearTimeout(watchdog);
     if(first)rampStart=performance.now();
     const run=generation;
     watchdog=setTimeout(()=>{if(run===generation&&active())finishFilm();},(selected.end-selected.start+15)*1000);
     saveKey('norte-intro-next',String((films.indexOf(selected)+1)%films.length));startTick();soundLabel();
    }
    if(event.data===0)finishFilm();
   },
   onApiChange:()=>{if(active())syncCaptions(intent==='off'||blocked||player.isMuted());},
   onAutoplayBlocked:()=>{
    if(!active()||!ready||suspended)return;
    if(blocked){soundLabel();return;}
    blocked=true;cinema.dataset.autoplayAudio='blocked';player.mute();
    // Do not keep attempting unmute without a gesture or overwrite a visitor's preference.
    syncCaptions(true);player.playVideo();soundLabel();
   },
   onError:event=>{cinema.dataset.error=String(event.data);failed();}
  }
 });
}
function loadAPI(){
 if(window.YT?.Player){makePlayer();return;}
 if(apiRequested)return;apiRequested=true;
 const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.onerror=failed;document.head.appendChild(script);
}
window.onYouTubeIframeAPIReady=()=>{if(active())makePlayer();};
function startIntro(){
 cancelRun();setPhase('loading');blocked=false;suspended=false;lastCaptions=undefined;curve=[];
 rampStart=0;commandedVolume=-1;delete cinema.dataset.playback;delete cinema.dataset.autoplayAudio;
 delete cinema.dataset.audioCurve;delete cinema.dataset.mediaTime;delete cinema.dataset.outroStarted;delete cinema.dataset.startVolumeConfirmed;delete cinema.dataset.volumeControl;
 document.body.classList.remove('choosing','departing','outro','ending','phase-one','phase-two','no-film');
 cinema.hidden=false;layer.hidden=true;document.querySelector('#intro-note').hidden=true;soundLabel();
 const run=generation;
 loadTimer=setTimeout(()=>{if(run===generation&&phase==='loading'&&!suspended)failed();},8000);
 if(ready)prepareAndPlay();else loadAPI();
}
soundButton.addEventListener('click',()=>{
 if(!active()||!ready)return;
 if(cinema.dataset.volumeControl==='unconfirmed'){window.open(source.href,'_blank','noopener');return;}
 if(suspended){
  suspended=false;rampStart=performance.now();
  player.mute();volume(1);if(resumeWithSound&&intent!=='off'){blocked=false;player.unMute();}
  player.playVideo();startTick();soundLabel();return;
 }
 const audible=!player.isMuted()&&player.getVolume()>0;
 if(audible){intent='off';sessionSave('norte-audio','off');player.mute();syncCaptions(true);soundLabel();return;}
 intent='on';sessionSave('norte-audio','on');const wasBlocked=blocked;blocked=false;
 if(player.getVolume()>SOFT_VOLUME){prepareAndPlay();return;}
 rampStart=performance.now();volume(1);player.unMute();
 if(wasBlocked)player.seekTo(selected.start,true);
 player.playVideo();startTick();soundLabel();
});
document.querySelector('#skip').addEventListener('click',()=>showChoices());
document.querySelector('#intro-cookies').addEventListener('click',()=>window.NorteKlant?.cookies());
// Reuse the document/player, so replay does not discard the preceding real click.
document.querySelector('#replay').addEventListener('click',()=>startIntro());
document.querySelectorAll('[data-choice]').forEach(link=>{
 link.addEventListener('pointerenter',()=>preview(link.dataset.choice));
 link.addEventListener('focus',()=>preview(link.dataset.choice));
 link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();if(phase==='leaving')return;
  cancelRun();setPhase('leaving');silence();preview(link.dataset.choice);saveKey('norte-role',link.dataset.choice);
  document.body.classList.add('departing');
  navigationTimer=setTimeout(()=>{location.href=link.getAttribute('href');},reduceMotion?0:280);
 });
});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden&&active()){
  resumeWithSound=ready&&!player.isMuted()&&intent!=='off'&&!blocked;
  suspended=true;clearPlaybackTimers();silence();soundLabel();
 }
});
window.addEventListener('pagehide',()=>{cancelRun();setPhase('leaving');silence();});
if (params.get('ok') === '1') {
  location.replace('/op-de-hoogte.html?ok=1');
} else if (params.get('intro') === 'overslaan' || (reduceMotion && params.get('intro') !== 'opnieuw')) {
  showChoices(false);
} else {
  startIntro();
}
