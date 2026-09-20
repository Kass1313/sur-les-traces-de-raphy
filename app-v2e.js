'use strict';

function physioGame(){
  let round=0,score=0,holding=false,holdStart=0,holdTarget=0;
  const moves=[
    ['Flamant administratif','🦩',900,1400,'Tiens la pose sans faire croire que tu remplis un Cerfa avec les genoux.'],
    ['Chaise invisible de la CAF','🪑',1100,1650,'Assieds-toi sur une chaise qui n’existe pas. Comme certaines démarches.'],
    ['Pont très optimiste','🌉',750,1250,'Le pont tient grâce au gainage et à une confiance probablement excessive.'],
    ['Chat qui regrette ses choix','🐈',950,1450,'Hamoud refuse de participer mais juge la technique.'],
    ['Respiration « je vais bien »','😮‍💨',1200,1750,'Inspire. Expire. Dire « ça va » reste facultatif.']
  ];
  screen(top(2)+hero('Trace 03','Kiné : protocole très officiel','Chaque exercice a un nom ridicule. Le timing, lui, est réel.')+
  '<div class="physio-stage"><div class="physio-grid"></div><div id="physioEmoji" class="physio-emoji">🦩</div><div id="physioGhost" class="physio-ghost">🐈</div><div class="balance-line"><i id="balanceNeedle"></i></div></div>'+
  '<div class="card"><div class="hud"><span>Exercice <b id="pr">1/5</b></span><span>Score <b id="ps">0</b></span></div><h3 id="pname">'+moves[0][0]+'</h3><p class="caption" id="pinstr">'+moves[0][4]+'</p><button class="btn" id="holdPose">Maintenir la pose</button><div class="meter" style="margin-top:12px"><i id="poseBar"></i></div></div>'+skip(2));
  wireSkip(2);
  const btn=$('#holdPose'),bar=$('#poseBar'),needle=$('#balanceNeedle');
  const draw=()=>{
    if(round>=moves.length){toast(score>=4?'Le kiné est obligé d’admettre que c’était propre.':'Protocole terminé. La dignité a survécu.');setTimeout(()=>complete(2),850);return}
    const m=moves[round];holdTarget=m[2]+Math.random()*(m[3]-m[2]);
    $('#pr').textContent=(round+1)+'/5';$('#ps').textContent=score;$('#pname').textContent=m[0];$('#pinstr').textContent=m[4];$('#physioEmoji').textContent=m[1];bar.style.width='0%';needle.style.left='50%';btn.textContent='Maintenir la pose';btn.disabled=false
  };
  btn.onpointerdown=e=>{e.preventDefault();if(holding)return;holding=true;holdStart=performance.now();btn.textContent='Tiens…';const animate=()=>{if(!holding||!btn.isConnected)return;const elapsed=performance.now()-holdStart;bar.style.width=Math.min(100,elapsed/holdTarget*100)+'%';needle.style.left=(50+Math.sin(elapsed/150)*18)+'%';requestAnimationFrame(animate)};animate()};
  const release=()=>{if(!holding)return;holding=false;const elapsed=performance.now()-holdStart;const ratio=elapsed/holdTarget;const good=ratio>.83&&ratio<1.22;if(good){score++;toast(['Timing propre. Le kiné est presque vexé.','Très bien. Hamoud retire une objection.','Exercice validé sans commission parlementaire.'][round%3]);vib(8)}else toast(ratio<.83?'Trop court. La chaise invisible n’était pas encore fiscalement créée.':'Trop long. On était sur une pose, pas une résidence principale.');round++;setTimeout(draw,500)};
  btn.onpointerup=release;btn.onpointercancel=release;btn.onpointerleave=release;draw()
}

function operationGame(){
  let phase=0,alignment=50,monitor=72,toolFound=false;
  screen(top(3)+hero('Trace 04','Opération fictive : dos neuf','Puzzle de jeu, pas conseil médical. Le chirurgien garde un calme franchement suspect.')+
  '<div class="operation-stage"><div class="op-monitor"><span>♥</span><b id="pulse">72</b></div><div class="spine-model"><div class="vertebra v1">L4</div><div class="disc" id="disc">●</div><div class="vertebra v2">L5</div></div><button class="op-cat" id="opCat">🐈</button><div id="opTool" class="op-tool">🔧</div></div>'+
  '<div class="card"><div class="hud"><span id="opPhase">1/4 · Aligner</span><span>Moniteur <b id="monitor">72</b></span></div><input id="align" type="range" min="0" max="100" value="50" style="width:100%"><div class="actions two" style="margin-top:12px"><button class="btn secondary" id="opAction">Valider</button><button class="btn secondary" id="opCalm">Dire au chirurgien de respirer</button></div><div id="opCopy" class="caption" style="margin-top:10px">Centre le disque dans la zone stable.</div></div>'+skip(3));
  wireSkip(3);
  const range=$('#align');
  range.oninput=()=>{alignment=+range.value;$('#disc').style.transform='translateX('+(alignment-50)*1.8+'px)'};
  $('#opCalm').onclick=()=>{monitor=Math.min(99,monitor+5);$('#monitor').textContent=monitor;$('#pulse').textContent=monitor;toast('Le chirurgien dit qu’il allait très bien. Sa main tremblait seulement par design.')};
  $('#opCat').onclick=()=>{if(phase===1&&!toolFound){toolFound=true;$('#opTool').classList.add('visible');toast('Hamoud avait l’instrument. Sous lui. Depuis le début.')}else toast('Hamoud n’est pas un membre certifié du bloc. Il refuse ce commentaire.')};
  $('#opAction').onclick=()=>{
    if(phase===0){if(Math.abs(alignment-50)>8){monitor-=6;$('#monitor').textContent=monitor;return toast('Trop décalé. Le chirurgien regarde l’écran comme s’il allait accuser la machine.')}phase=1;$('#opPhase').textContent='2/4 · Trouver l’outil';$('#opCopy').textContent='Un outil manque. Quelqu’un de poilu a l’air très confortable.';range.disabled=true;toast('Alignement propre. Étape suivante.')}
    else if(phase===1){if(!toolFound)return toast('L’outil n’est pas sur le plateau. Regarde le consultant félin.');phase=2;$('#opPhase').textContent='3/4 · Stabiliser';$('#opCopy').textContent='Maintiens le moniteur entre 76 et 88 avec le bouton respiration.';$('#opAction').textContent='Tester la stabilité';toast('Outil récupéré. Hamoud demande une prime de garde.')}
    else if(phase===2){if(monitor<76||monitor>88)return toast('Moniteur pas stable. Même le bip fait une grimace.');phase=3;$('#opPhase').textContent='4/4 · Fermeture';$('#opCopy').textContent='Choisis la finition officielle.';$('#opAction').style.display='none';$('#opCalm').style.display='none';const box=document.createElement('div');box.className='choices';box.innerHTML='<button class="choice" data-opend="0">Suture propre</button><button class="choice" data-opend="1">Ruban adhésif premium</button><button class="choice" data-opend="2">Laisser Mehdi dire « c’est bon »</button>';$('#opCopy').after(box);$$('[data-opend]').forEach(b=>b.onclick=()=>{if(+b.dataset.opend===0){toast('Opération fictive terminée. Le chirurgien retrouve enfin une tension normale.');setTimeout(()=>complete(3),850)}else toast(+b.dataset.opend===1?'Le bloc refuse le forfait bricolage.':'Le chirurgien vient de retirer Mehdi de la liste du personnel.')})}
  }
}

function cellarGame(){
  const items=[
    ['Câbles “au cas où”','cables','🔌'],['Décorations','deco','🎄'],['Peinture ouverte depuis une époque','paint','🎨'],['Objet dont personne ne connaît la fonction','mystery','🧩'],['Outils','tools','🪛'],['Carton vide qu’on garde quand même','box','📦'],['Encore des câbles','cables','🔌'],['Hamoud dans un carton','cat','🐈']
  ];
  const map={cables:'GARAGE',deco:'DÉCO',paint:'TRAVAUX',mystery:'MYSTÈRE',tools:'TRAVAUX',box:'GARAGE',cat:'MYSTÈRE'};
  let current=null,done=0,bonusStarted=false,bonus=20;
  screen(top(5)+hero('Trace 06','La cave de l’enfer','Tape un objet, puis son bac. Raphy range. Mehdi prépare déjà la phrase « on a bien bossé ».')+
  '<div class="cellar-stage"><div id="cellarItems" class="cellar-items">'+items.map((x,i)=>'<button class="cellar-box" data-ci="'+i+'"><span>'+x[2]+'</span><b>'+x[0]+'</b></button>').join('')+'</div></div>'+
  '<div class="bins three"><button class="bin" data-bin="GARAGE">GARAGE</button><button class="bin" data-bin="DÉCO">DÉCO</button><button class="bin" data-bin="TRAVAUX">TRAVAUX</button><button class="bin" data-bin="MYSTÈRE">MYSTÈRE</button></div><div class="card"><div class="hud"><span id="cellDone">0/8</span><span id="bonus">bonus dormant</span></div></div>'+skip(5));
  wireSkip(5);
  $$('[data-ci]').forEach(b=>b.onclick=()=>{if(b.disabled)return;$$('[data-ci]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');current=+b.dataset.ci;if(!bonusStarted){bonusStarted=true;const it=setInterval(()=>{if(!$('#bonus'))return clearInterval(it);bonus--;$('#bonus').textContent='bonus '+bonus+'s';if(bonus<=0){clearInterval(it);$('#bonus').textContent='bonus expiré'}},1000)}});
  $$('[data-bin]').forEach(bin=>bin.onclick=()=>{if(current===null)return toast('Choisis d’abord un objet. Sinon tu ranges le concept, pas la cave.');const item=items[current],expected=map[item[1]];if(bin.dataset.bin!==expected)return toast(item[1]==='cat'?'Hamoud refuse ce bac. Il s’est auto-classé “direction”.':'Non. Même Mehdi n’oserait pas ranger ça là. Enfin… normalement.');const b=$('[data-ci="'+current+'"]');b.disabled=true;b.classList.remove('selected');b.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.5) translateY(50px)'}],{duration:350,fill:'forwards'});done++;current=null;$('#cellDone').textContent=done+'/8';toast(done===8?(bonus>0?'Tout rangé avec bonus. Mehdi : « on a bien géré ». Raphy : regard silencieux.':'Tout rangé. Mehdi arrive pile pour dire « nickel ».'):'Bien rangé. Une phrase que personne ne prononce assez dans cette cave.');if(done===8)setTimeout(()=>complete(5),1100)})
}

function architectGame(){
  let round=0,sat=50;
  const reqs=[
    ['Je veux une cuisine ouverte. Mais vraiment intime.',['Ouvrir tout','Garder une demi-cloison','Fermer complètement'],1],
    ['Je veux beaucoup de lumière, mais pas trop de fenêtres.',['Agrandir les fenêtres','Miroirs + tons clairs','Éteindre le soleil'],1],
    ['Ambiance méditerranéenne, mais surtout pas “vacances”.',['Terre cuite partout','Bois clair + texture minérale','Palmier gonflable'],1],
    ['Beaucoup de rangement, mais je ne veux voir aucun meuble.',['Placards intégrés','Tout mettre dans la cave','Ne rien posséder'],0],
    ['Et si finalement on remettait le mur ?',['Remettre le mur','Faire semblant de ne pas entendre','Changer de métier'],0]
  ];
  screen(top(6)+hero('Trace 07','Architecte catastrophe','Le client change d’avis. Le plan, lui, essaie de garder une estime de soi.')+
  '<div class="architect-stage"><div class="room-plan"><div id="wallA" class="plan-wall wall-a"></div><div id="wallB" class="plan-wall wall-b"></div><div id="windowA" class="plan-window"></div><div id="storageA" class="plan-storage">RANGEMENT</div><div class="plan-table">TABLE</div></div></div>'+
  '<div class="card"><div class="hud"><span>Client <b id="sat">50%</b></span><span id="archRound">1/5</span></div><div class="meter"><i id="satBar" style="width:50%"></i></div><div id="archQ" style="margin-top:14px"></div></div>'+skip(6));
  wireSkip(6);
  const draw=()=>{if(round>=reqs.length){toast(sat>60?'Le client adore. Il veut tout changer demain matin.':'Le client est mitigé. Il demande exactement le contraire demain.');setTimeout(()=>complete(6),900);return}const r=reqs[round];$('#archRound').textContent=(round+1)+'/5';$('#archQ').innerHTML='<h3>'+r[0]+'</h3><div class="choices">'+r[1].map((x,j)=>'<button class="choice" data-ar="'+j+'">'+x+'</button>').join('')+'</div>';$$('[data-ar]').forEach(b=>b.onclick=()=>{const j=+b.dataset.ar,correct=j===r[2];sat=Math.max(5,Math.min(95,sat+(correct?12:-7)+(Math.random()>.8?-3:0)));$('#sat').textContent=sat+'%';$('#satBar').style.width=sat+'%';if(round===0)$('#wallA').classList.toggle('half',j===1);if(round===1)$('#windowA').classList.toggle('bright',j===1);if(round===3)$('#storageA').classList.toggle('hidden-store',j===0);if(round===4)$('#wallB').classList.add('return');toast(correct?['Le client : « oui, exactement ». Pour l’instant.','Bonne réponse. Le plan respire.'][round%2]:'Le client fait ce petit bruit qui veut dire « je pensais à autre chose ».');round++;setTimeout(draw,500)})};draw()
}

function paintingGame(){
  let coverage=0,drips=0,paws=0,done=false;
  screen(top(7)+hero('Trace 08','Peinture fraîche','Peins le mur au doigt. Les coulures apparaissent si tu insistes trop au même endroit. Hamoud a signé un accord qu’il ne respectera pas.')+
  '<div class="paint-room"><canvas id="paintWall" width="700" height="520"></canvas><div id="paintPaws"></div></div><div class="card"><div class="hud"><span>Couverture <b id="cov">0%</b></span><span>Coulures <b id="drips">0</b></span><span>Pattes <b id="paws">0</b></span></div><div class="meter"><i id="paintBar"></i></div><button class="btn secondary" id="wipePaws" style="margin-top:12px">Nettoyer les traces de Hamoud</button></div>'+skip(7));
  wireSkip(7);
  const cv=$('#paintWall'),ctx=cv.getContext('2d');ctx.fillStyle='#d8d2ca';ctx.fillRect(0,0,700,520);let down=false,lastX=0,lastY=0,lastT=0;
  const paint=e=>{if(!down||done)return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*700/r.width,y=(e.clientY-r.top)*520/r.height,now=performance.now(),dist=Math.hypot(x-lastX,y-lastY);ctx.strokeStyle='#8d6d78';ctx.lineWidth=42;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(lastX||x,lastY||y);ctx.lineTo(x,y);ctx.stroke();coverage=Math.min(100,coverage+.32+dist/260);if(now-lastT<45&&dist<9&&Math.random()>.86){drips++;ctx.fillStyle='#785a65';ctx.fillRect(x-3,y,6,36+Math.random()*55);$('#drips').textContent=drips}lastX=x;lastY=y;lastT=now;$('#cov').textContent=Math.floor(coverage)+'%';$('#paintBar').style.width=coverage+'%';if(coverage>48&&paws===0)spawnPaws();if(coverage>=100&&paws===0){done=true;toast(drips<4?'Mur terminé. Propre. Mehdi cherche où mettre sa signature.':'Mur terminé. Les coulures sont officiellement du caractère.');setTimeout(()=>complete(7),900)}};
  cv.onpointerdown=e=>{down=true;lastX=0;lastY=0;paint(e)};cv.onpointermove=paint;cv.onpointerup=()=>down=false;cv.onpointercancel=()=>down=false;
  function spawnPaws(){paws=4;$('#paws').textContent=paws;$('#paintPaws').innerHTML='<button class="paint-paw" data-pawclean style="left:22%;top:34%">🐾</button><button class="paint-paw" data-pawclean style="left:42%;top:46%">🐾</button><button class="paint-paw" data-pawclean style="left:62%;top:54%">🐾</button><button class="paint-paw" data-pawclean style="left:78%;top:37%">🐾</button>';toast('Hamoud vient de traverser la peinture. Il marche comme un artiste subventionné.');$$('[data-pawclean]').forEach(b=>b.onclick=()=>{b.remove();paws--;$('#paws').textContent=paws;if(paws===0&&coverage>=100){done=true;toast('Traces nettoyées. L’artiste est parti sans signer.');setTimeout(()=>complete(7),900)}})}
  $('#wipePaws').onclick=()=>toast(paws?'Tape directement sur chaque patte. Hamoud exige un nettoyage personnalisé.':'Aucune patte à nettoyer. Profite, ça ne va pas durer.')
}

function batteryGame(){
  let round=0,input=[],showing=false;
  const patterns=[[0,2,1],[3,1,0,2],[1,3,2,0,1]];
  screen(top(9)+hero('Trace 10','Batterie : logique de démarrage','Jeu abstrait uniquement. Retrouve la séquence lumineuse. Aucun branchement réel à reproduire.')+
  '<div class="battery-stage"><div class="battery-core">⚡</div><div class="battery-nodes">'+['A','B','C','D'].map((x,i)=>'<button class="battery-node n'+i+'" data-bn="'+i+'">'+x+'</button>').join('')+'</div></div><div class="card"><div class="hud"><span id="batRound">1/3</span><span id="batState">mémoire</span></div><button class="btn" id="showBat">Afficher la séquence</button><p class="caption">Observe, puis reproduis. Si tu rates, la voiture te juge silencieusement.</p></div>'+skip(9));
  wireSkip(9);
  const nodes=$$('[data-bn]');
  const show=async()=>{if(showing)return;showing=true;input=[];$('#batState').textContent='observe';for(const n of patterns[round]){nodes[n].classList.add('flash');await new Promise(r=>setTimeout(r,420));nodes[n].classList.remove('flash');await new Promise(r=>setTimeout(r,150))}showing=false;$('#batState').textContent='à toi'};
  $('#showBat').onclick=show;
  nodes.forEach(b=>b.onclick=()=>{if(showing)return;const n=+b.dataset.bn;input.push(n);b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),170);const idx=input.length-1;if(n!==patterns[round][idx]){toast('La voiture vient d’allumer un voyant imaginaire juste pour te vexer.');input=[];return}if(input.length===patterns[round].length){round++;if(round>=patterns.length){toast('Séquence complète. Démarrage fictif réussi.');setTimeout(()=>complete(9),850)}else{$('#batRound').textContent=(round+1)+'/3';$('#batState').textContent='mémoire';input=[];toast('Un niveau de plus. Parce que la voiture a décidé de tester ta patience.')}}});setTimeout(show,600)
}

function customsGame(){
  const items=[['Passeport ❤️',1,true],['Pâtes non cassées 🇮🇹',2,true],['Poêle à paella 🇪🇸',4,true],['Brochure Mehdi Immobilier 🇩🇿',7,false],['Hamoud dans la valise 🐈',6,false],['Doudou cochon 🐷',2,true],['Trois kilos de “au cas où”',5,false],['Chargeur oublié',1,true]];
  let selected=[],q=0;
  const questions=[
    ['Vous cassez les pâtes avant cuisson ?',['Oui, pour gagner du temps.','Non. Même Hamoud sait que non.','Seulement les jours fériés.'],1],
    ['La paella italienne, concept ou incident diplomatique ?',['Concept génial.','Incident diplomatique.','Je refuse de choisir.'],1],
    ['La brochure « deux pièces, cinq enfants, Mehdi très détendu » est-elle réaliste ?',['Absolument.','Seulement dans la tête de Mehdi.','L’ONU doit examiner le dossier.'],1]
  ];
  screen(top(16)+hero('Trace 17','Douanes de l’amour','Prépare la valise sans dépasser 12 kg fictifs. Puis réponds au contrôle culturel le plus inutile d’Europe.')+
  '<div class="suitcase-stage"><div class="suitcase"><div id="packed" class="packed"></div></div></div><div class="item-grid">'+items.map((x,i)=>'<button class="item big" data-pack="'+i+'">'+x[0]+'<br><small>'+x[1]+' kg</small></button>').join('')+'</div><div class="card"><div class="hud"><span>Poids <b id="weight">0</b>/12 kg</span><span id="packCount">0 objet</span></div><button class="btn" id="customNext">Passer au contrôle</button><div id="customQ"></div></div>'+skip(16));
  wireSkip(16);
  $$('[data-pack]').forEach(b=>b.onclick=()=>{const n=+b.dataset.pack;if(selected.includes(n)){selected=selected.filter(x=>x!==n);b.classList.remove('selected')}else{selected.push(n);b.classList.add('selected')}const w=selected.reduce((s,x)=>s+items[x][1],0);$('#weight').textContent=w;$('#packCount').textContent=selected.length+' objet'+(selected.length>1?'s':'');$('#packed').innerHTML=selected.map(x=>'<span>'+items[x][0].split(' ')[0]+'</span>').join('');if(w>12)toast('Valise en surcharge. Mehdi propose de porter la brochure à la main. Refus collectif.')});
  $('#customNext').onclick=()=>{const w=selected.reduce((s,x)=>s+items[x][1],0);if(w>12)return toast('12 kg max. Même l’amour a un bagage cabine.');if(selected.length<4)return toast('Il manque trop de choses. Même Hamoud trouve cette valise optimiste.');$('#customNext').style.display='none';$$('[data-pack]').forEach(x=>x.disabled=true);drawQ()};
  function drawQ(){if(q>=questions.length){toast('Douanes passées. La brochure Mehdi est retenue pour enquête.');setTimeout(()=>complete(16),850);return}const z=questions[q];$('#customQ').innerHTML='<div class="dialogue" style="margin-top:14px"><div class="avatar">🛂</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-cq="'+j+'">'+x+'</button>').join('')+'</div>';$$('[data-cq]').forEach(b=>b.onclick=()=>{const j=+b.dataset.cq;toast(j===z[2]?['La douane approuve sans enthousiasme.','Les grands-mères imaginaires hochent la tête.','La brochure perd immédiatement 5 étoiles.'][q]:'Réponse enregistrée. Un agent vient de soupirer très fort.');q++;setTimeout(drawQ,500)})}
}

function houseGame(){
  let round=0,found=0,eyesClosed=false;
  const rounds=[
    {change:'chair',label:'La chaise a avancé toute seule.'},
    {change:'frame',label:'Le cadre s’est retourné.'},
    {change:'lamp',label:'La lampe reste allumée dans le reflet.'},
    {change:'door',label:'Cette porte n’était pas là.'},
    {change:'cat',label:'Pourquoi Hamoud est-il dans un portrait officiel ?'}
  ];
  screen(top(19)+hero('Trace 20','La maison impossible','Observe. Ferme les yeux avec le bouton. Rouvre. Quelque chose aura changé.')+
  '<div class="impossible-room" id="room"><button class="room-chair" data-room="chair">🪑</button><button class="room-frame" data-room="frame">🖼️</button><button class="room-lamp" data-room="lamp">💡</button><button class="room-door" data-room="door">🚪</button><button class="room-catframe" data-room="cat">🐈</button><div id="blackout" class="blackout"></div></div><div class="card"><div class="hud"><span id="houseRound">0/5 anomalies</span><span id="houseStatus">observe</span></div><button class="btn" id="closeEyes">Fermer les yeux</button><p class="caption">Ne tape pas au hasard : la maison devient vexante quand elle gagne.</p></div>'+skip(19));
  wireSkip(19);
  $$('[data-room]').forEach(b=>b.onclick=()=>{if(eyesClosed)return;const target=round>0?rounds[round-1].change:null;if(b.dataset.room===target&&!b.classList.contains('found')){b.classList.add('found');found++;$('#houseRound').textContent=found+'/5 anomalies';toast(rounds[round-1].label);$('#houseStatus').textContent='trouvée';if(found===5){setTimeout(()=>{toast('La pièce redevient normale. Sauf le portrait. Le portrait refuse.');complete(19)},1100)}}else toast('Non. Ce truc était déjà bizarre avant. Essaie encore.')});
  $('#closeEyes').onclick=()=>{if(round>=rounds.length)return toast('Tu as déjà vu assez de choses bouger pour ce soir.');eyesClosed=true;$('#houseStatus').textContent='yeux fermés';$('#blackout').classList.add('on');setTimeout(()=>{apply(rounds[round].change);round++;$('#blackout').classList.remove('on');eyesClosed=false;$('#houseStatus').textContent='quelque chose a changé';vib(8)},700)};
  function apply(type){const el=$('[data-room="'+type+'"]');el.classList.add('changed');if(type==='chair')el.style.transform='translate(70px,-25px) scale(1.08)';if(type==='frame')el.style.transform='rotate(180deg)';if(type==='lamp')el.classList.add('haunted');if(type==='door')el.classList.add('wrong');if(type==='cat'){el.textContent='🖼️🐈';el.classList.add('official')}}
}

route=function(i){
  S.current=i;save();skipArmed=false;
  [
    departure,mri,physioGame,operationGame,gyno,cellarGame,architectGame,paintingGame,sinkGame,batteryGame,
    ()=>canvasGame(10,'Nettoyage voiture',true),school,bedtimeGame,heroKidGame,mojito,coffee,customsGame,algeria,horror,houseGame,unknown,escapeGame,trial,calm,unsaid,final
  ][i]()
};
if(S.unlocked&&S.storyDone)route(S.current);
