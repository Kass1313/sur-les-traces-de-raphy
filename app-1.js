'use strict';

const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const app = $('#app');
const toastEl = $('#toast');
const modalEl = $('#modal');
const SAVE_KEY = 'sur-les-traces-de-raphy-v7';
const CODE = '060361';

const scenes = [
  'Le départ','IRM','Kiné','Opération fictive','Gynécologue','La cave','Architecte','Peinture','Lavabo','Batterie','Nettoyage voiture','Sortie d’école','Dodo princesse','Mission super-héros','Vitrine mojito','Iced caramel macchiato','Douanes de l’amour','Projection Algérie','Pièce aux insectes','Maison impossible','Numéro masqué','Grand escape game','Le dossier Mehdi','Les 48 heures','Ce qu’on ne dit pas assez','Dernière porte'
];

const defaultState = {
  unlocked:false,
  titleRevealed:false,
  current:0,
  highest:0,
  completed:{},
  choices:{},
  flags:{},
  replay:false,
  createdAt:Date.now()
};

let S = load();
let skipArmed = false;
let toastTimer;

function load(){
  try { return {...defaultState, ...(JSON.parse(localStorage.getItem(SAVE_KEY))||{})}; }
  catch { return {...defaultState}; }
}
function save(){ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
function reset(){ localStorage.removeItem(SAVE_KEY); location.reload(); }
function rand(a){ return a[Math.floor(Math.random()*a.length)]; }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function esc(s=''){ return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function vib(p=22){ try { navigator.vibrate?.(p); } catch {} }
function toast(msg, ms=2600){ clearTimeout(toastTimer); toastEl.textContent=msg; toastEl.classList.add('show'); toastTimer=setTimeout(()=>toastEl.classList.remove('show'),ms); }
function modal(html){ modalEl.innerHTML=`<div class="modal-card">${html}</div>`; modalEl.hidden=false; }
function closeModal(){ modalEl.hidden=true; modalEl.innerHTML=''; }
window.closeRaphyModal = closeModal;

function screen(html, cls=''){
  app.innerHTML = `<main class="screen ${cls}">${html}</main>`;
  scrollTo({top:0,behavior:'instant'});
}
function topbar(i){
  return `<div class="topbar"><div class="ghost-pill"><span class="brand-dot"></span>&nbsp; dossier R</div><div class="progress-pill">${i+1}/${scenes.length}</div></div>`;
}
function hero(kicker,title,desc=''){
  return `<section class="hero"><div class="eyebrow">${kicker}</div><h2>${title}</h2>${desc?`<p>${desc}</p>`:''}</section>`;
}
function skipBtn(i){ return `<button class="skip-link" data-skip="${i}">Passer cette séquence</button>`; }
function wireSkip(i){
  const b=$('[data-skip]'); if(!b) return;
  b.onclick=()=>{
    if(!skipArmed){
      skipArmed=true;
      b.textContent='Tu confirmes vraiment ? 😏';
      toast(rand([
        'Déjà ? Je ne juge pas. Enfin si, un peu.',
        'Très bien. Hamoud note officiellement cette fuite.',
        'Mehdi affirme qu’il l’aurait réussi du premier coup. Source : Mehdi.'
      ]));
      setTimeout(()=>{skipArmed=false;if(b?.isConnected)b.textContent='Passer cette séquence';},3500);
    }else{ skipArmed=false; complete(i,true); }
  };
}
function complete(i, skipped=false){
  S.completed[i]=true;
  S.highest=Math.max(S.highest,i+1);
  S.current=Math.min(i+1,scenes.length-1);
  save();
  vib([20,35,55]);
  if(skipped) toast('Séquence passée. Le dossier fait semblant de ne rien avoir vu.');
  setTimeout(()=>route(S.current),180);
}
function continueBtn(label,fn){ return `<button class="btn" id="continueBtn">${label}</button>`; }

function progressDots(n,cur){ return `<div class="stepper">${Array.from({length:n},(_,i)=>`<i class="${i<=cur?'on':''}"></i>`).join('')}</div>`; }

function boot(){
  if(S.unlocked){ route(S.current); return; }
  lockScreen();
}

function lockScreen(){
  screen(`
    <div class="lock-mark">🔒</div>
    <section class="hero"><div class="eyebrow">Accès restreint</div><h1>Une personne seulement.</h1><p>Si tu n’es pas Raphy, pose ce téléphone avec beaucoup de dignité.</p></section>
    <div class="card glow">
      <input id="pin" class="code-input" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••" aria-label="Code d'accès">
      <div class="actions" style="margin-top:12px"><button class="btn" id="unlock">Entrer</button><button class="btn secondary" id="hint">Tu veux un indice ?</button></div>
      <div id="hintZone" class="hint-zone"></div>
    </div>
    <p class="caption">Petit détail : les mauvais codes sont conservés uniquement dans la mémoire très rancunière de cette page pendant environ trois secondes.</p>
  `,'centered');

  let attempts=0, hintStage=0, dodge=0;
  const pin=$('#pin');
  const tryUnlock=()=>{
    attempts++;
    if(pin.value===CODE){
      S.unlocked=true;save();vib([30,40,80]);
      toast('Bon. C’était bien toi. J’avais un doute extrêmement injustifié.');
      setTimeout(openingEnvelope,650); return;
    }
    vib(25); pin.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:260});
    pin.value='';
    toast([
      'Non. Mais j’admire la confiance avec laquelle tu as inventé ça.',
      'Le code vient de regarder cette tentative et de demander un avocat.',
      'Techniquement, six chiffres ont bien été saisis. C’est déjà un début.',
      'Raphy a choisi la confiance. Le clavier recommande la prudence.'
    ][Math.min(attempts-1,3)]);
  };
  $('#unlock').onclick=tryUnlock; pin.onkeydown=e=>{if(e.key==='Enter')tryUnlock()};
  $('#hint').onclick=()=>{
    hintStage++;
    if(hintStage===1){ $('#hintZone').innerHTML=`<div class="card soft"><b>Haha…</b><br>Tu peux pas te passer de moi deux minutes ? Tu veux <i>vraiment</i> un indice ?<div class="actions two" style="margin-top:12px"><button class="btn small" id="yesHint">Oui 🙄</button><button class="btn small secondary runaway" id="noHint">Non</button></div></div>`;
      const no=$('#noHint'), zone=$('#hintZone');
      const dodgeNo=()=>{ dodge++; const maxX=Math.max(0,zone.clientWidth-no.offsetWidth-20),maxY=20; no.style.left=`${Math.random()*maxX}px`;no.style.top=`${Math.random()*maxY+34}px`; if(dodge>=2){no.textContent='Très courageuse.';setTimeout(()=>no.style.display='none',550)} };
      no.onpointerenter=dodgeNo; no.onclick=dodgeNo;
      $('#yesHint').onclick=()=>{$('#hintZone').innerHTML=`<div class="card soft"><b>Indice 1 :</b> c’est une date qui compte pour vous. Six chiffres. Et non, « 123456 » n’est pas un souvenir romantique.</div>`};
    } else if(hintStage===2){ $('#hintZone').innerHTML=`<div class="card soft"><b>Indice 2 :</b> le code commence par <b>06</b>. Là je t’aide beaucoup trop, j’espère que c’est noté.</div>`; }
    else { $('#hintZone').innerHTML=`<div class="card soft"><b>Dernier coup de pouce :</b> 06 • 03 • 61. Maintenant si tu rates, c’est entre toi et le clavier.</div>`; }
  };
}

function openingEnvelope(){
  screen(`
    <div class="memory-scene" style="min-height:390px;background:linear-gradient(160deg,#362538,#0b0a10)">
      <div class="memory-bg" style="background-image:radial-gradient(circle at 30% 25%,rgba(255,195,206,.2),transparent 34%),linear-gradient(145deg,#352735,#100e15)"></div>
      <div style="position:absolute;inset:0;display:grid;place-items:center;z-index:2"><div style="width:230px;height:150px;border-radius:10px;background:#efe4da;transform:rotate(-4deg);box-shadow:0 30px 60px rgba(0,0,0,.35);display:grid;place-items:center;color:#3f3040;font-family:Georgia,serif;font-size:22px">Pour Raphy</div></div>
      <div class="memory-copy"><h3>J’avais prévu quelque chose de simple.</h3><p>Puis Hamoud a touché un truc.</p></div>
    </div>
    <div class="card"><p class="storyline">À l’intérieur : une clé, une photo retournée et une phrase écrite trop proprement pour être rassurante.</p><p class="storyline"><i>« Suis les traces. Certaines sont à toi. D’autres… te connaissent déjà. »</i></p></div>
    ${continueBtn('Ouvrir la première porte','')}
  `);
  $('#continueBtn').onclick=()=>meetingStory(0);
}

const meetingBeats = [
  {
    title:'Le magasin de lunettes',
    art:'linear-gradient(135deg,#624b5d,#241b2a 45%,#111016)',
    text:`Un jour, Mehdi entre dans un magasin de lunettes. Pas pour changer sa vie. Juste pour entrer dans un magasin de lunettes. Puis il te voit derrière le comptoir — cheveux framboise, sourire beaucoup trop efficace, répartie déjà prête.`,
    choices:[
      ['Le regarder et continuer comme si de rien n’était.','Très crédible. Le dossier note pourtant un léger bug dans le système nerveux de Mehdi.'],
      ['Le clasher immédiatement.','Voilà. Romance française : zéro violon, un clash propre, et tout le monde comprend très bien.'],
      ['Faire semblant de ne pas avoir remarqué qu’il te regarde.','Technique élégante. Lui, pendant ce temps : « waw… qu’est-ce qu’elle est belle ».']
    ]
  },
  {
    title:'Deux cigarettes',
    art:'linear-gradient(135deg,#493631,#1b1719 55%,#0d0c10)',
    text:`Quelques jours plus tard, vers 18 h, tu passes dans son magasin. Officiellement : deux cigarettes. Officieusement : le prétexte le moins discret de l’année pour reparler.`,
    choices:[
      ['« J’ai vraiment besoin de deux cigarettes. »','Le tribunal du flirt rejette cette version des faits.'],
      ['« Et si je voulais juste te parler ? »','Ah. Enfin une déclaration administrative conforme.'],
      ['Ne rien avouer et repartir dignement.','Très bien. La dignité repart. Le sourire, lui, est resté sur place.']
    ]
  },
  {
    title:'Deux Cristaline',
    art:'linear-gradient(135deg,#334050,#171c23 55%,#0c0d11)',
    text:`Vers 19 h, tu reviens avec deux bouteilles de Cristaline pour le remercier. Deux bouteilles. Pour deux cigarettes. Une économie circulaire d’une puissance terrifiante.`,
    choices:[
      ['Investissement romantique prudent.','Rentabilité émotionnelle : anormalement élevée.'],
      ['C’était juste pour remercier.','Bien sûr. Le dossier cligne très lentement des yeux.'],
      ['On ne commente pas la Cristaline.','Trop tard. Elle a déjà obtenu un rôle principal.']
    ]
  },
  {
    title:'L’appel, puis Snapchat',
    art:'linear-gradient(135deg,#453455,#15131a 55%,#0b0a0f)',
    text:`Mehdi finit par appeler ton magasin parce qu’il a envie de te voir. Après le travail, vous parlez vraiment. Puis vient la grande question diplomatique : Snapchat. Tu acceptes. Très calmement. Enfin, officiellement.`,
    choices:[
      ['Accepter comme si c’était banal.','Le téléphone, lui, a très bien compris que ce n’était pas banal.'],
      ['Le faire patienter deux secondes de trop.','Excellent. Deux secondes, mais une éternité administrative pour Mehdi.'],
      ['Dire oui tout de suite.','Décision rapide. Aucun comité de validation requis.']
    ]
  },
  {
    title:'Salon-de-Provence',
    art:'linear-gradient(135deg,#72543f,#2c2220 50%,#111014)',
    text:`Restaurant, anecdotes, voyages, États-Unis, tout ce que vous n’aviez pas encore eu le temps de raconter. Puis vous marchez. Plus tard, vous vous retrouvez allongés en quinconce près d’une balançoire en pneu, à regarder le ciel comme si la soirée avait décidé de ralentir.`,
    choices:[
      ['Rester là sans parler.','Pour une fois, même le jeu comprend qu’il faut se taire deux secondes.'],
      ['Raconter encore une anecdote.','Probabilité qu’elle implique une clavicule, une cheville ou une pizza avec des SDF : élevée.'],
      ['Dire « c’est incroyable ».','Mehdi détecté. Expression authentifiée.']
    ]
  },
  {
    title:'Et évidemment… la police',
    art:'linear-gradient(135deg,#25334a,#11141a 58%,#08090c)',
    text:`Parce qu’une première vraie soirée normale aurait été beaucoup trop simple, la police finit par vous demander de partir pendant une intervention liée à quatre jeunes et un faux pistolet. Vous reprenez la conversation dans la voiture. Comme si cette soirée avait besoin d’un rebondissement scénarisé.`,
    choices:[
      ['« On peut avoir UNE soirée normale ? »','Non. Dossier refusé pour manque de réalisme historique.'],
      ['En rire et continuer à parler.','Exactement. La soirée perd un décor, pas son intérêt.'],
      ['Faire comme si c’était prévu.','Mehdi confirme : « totalement prévu ». Personne ne le croit.']
    ]
  },
  {
    title:'11/05 — la plage',
    art:'linear-gradient(180deg,#d78b70 0,#8f6572 34%,#253450 68%,#11131a 100%)',
    text:`Quelques jours plus tard : plage, nappe, makis poulet, samoussas. Une surprise préparée par Mehdi avec un niveau d’organisation étonnamment élevé. Puis le premier baiser. Initié par lui — détail qu’il demandera probablement d’inscrire au procès-verbal.`,
    choices:[
      ['Laisser le moment exister.','Oui. Pas de vanne ici. Juste ce moment-là.'],
      ['Le taquiner avant le baiser.','Tradition respectée : romance, oui. Sans abandonner la répartie.'],
      ['Faire croire qu’il a attendu beaucoup trop longtemps.','Mehdi demande immédiatement un droit de réponse de 47 pages.']
    ]
  }
];

function meetingStory(i){
  if(i>=meetingBeats.length){ revealTitle(); return; }
  const b=meetingBeats[i];
  screen(`
    ${progressDots(meetingBeats.length,i)}
    <div class="memory-scene" style="min-height:360px"><div class="memory-bg" style="background-image:${b.art}"></div><div class="memory-copy"><div class="eyebrow">Avant les portes</div><h3>${b.title}</h3><p>${b.text}</p></div></div>
    <div class="card"><div class="eyebrow">Raphy fait quoi ?</div><div class="choices" style="margin-top:12px">${b.choices.map((c,j)=>`<button class="choice" data-story="${j}">${c[0]}</button>`).join('')}</div></div>
  `);
  $$('[data-story]').forEach(btn=>btn.onclick=()=>{
    const choice=b.choices[+btn.dataset.story];
    S.choices[`meeting_${i}`]=+btn.dataset.story;save();
    toast(choice[1],3200); vib(18); setTimeout(()=>meetingStory(i+1),800);
  });
}

function revealTitle(){
  S.titleRevealed=true;save();
  screen(`
    <div class="eyebrow">Dossier ouvert</div>
    <section class="hero"><h1 class="big-title">Sur les traces<br><span class="scriptish">de Raphy</span></h1><p>Pas un album souvenir. Pas exactement un escape game non plus. Une maison qui garde les détails… même ceux que tu n’avais pas remarqués.</p></section>
    <div class="card"><p class="storyline">La première porte s’ouvre. Derrière : une journée où ton dos décide de déposer officiellement sa démission.</p></div>
    ${continueBtn('Entrer','')}
  `,'centered');
  $('#continueBtn').onclick=()=>route(0);
}

function route(i){
  S.current=i;save();skipArmed=false;
  const fn = [
    levelDeparture,levelMRI,levelPhysio,levelOperation,levelGyno,levelCellar,levelArchitect,levelPaint,levelSink,levelBattery,levelClean,levelSchool,levelBedtime,levelHeroKid,levelMojito,levelCoffee,levelCustoms,levelAlgeria,levelHorror,levelHouse,levelUnknown,levelEscape,levelTrial,level48h,levelUnsaid,levelFinal
  ][i];
  (fn||levelFinal)();
}
