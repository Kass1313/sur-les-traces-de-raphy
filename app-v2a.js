
'use strict';

function departure(){
  let support=52,walk=0,holding=false,phase='walk';
  screen(top(0)+hero('Trace 01','Le départ','D’abord : l’aider à marcher. Ensuite : conduire jusqu’à l’hôpital sans déclarer la guerre à chaque dos-d’âne.')+
  '<div class="game-stage departure-stage" id="walkStage"><div class="hall-depth"></div><div class="walk-line"><div id="walker" class="walker">🚶‍♀️</div><div class="hamoud-door">🐈</div></div><div class="support-zone"><span>trop peu</span><b>ZONE CONFORT</b><span>trop</span></div></div>'+
  '<div class="card"><div class="meter"><i id="supportBar" style="width:52%"></i></div><p class="caption">Maintiens l’écran pour soutenir davantage. Relâche pour alléger. Garde la jauge dans la zone confortable.</p><div class="meter cold" style="margin-top:12px"><i id="walkBar"></i></div></div>'+skip(0));
  wireSkip(0);
  const st=$('#walkStage'),sb=$('#supportBar'),wb=$('#walkBar'),walker=$('#walker');
  st.onpointerdown=e=>{e.preventDefault();holding=true};st.onpointerup=()=>holding=false;st.onpointercancel=()=>holding=false;st.onpointerleave=()=>holding=false;
  let last=performance.now(),warn=0;
  const loop=t=>{
    if(!st.isConnected||phase!=='walk')return;
    const dt=Math.min(40,t-last)/16;last=t;
    support+=holding?1.15*dt:-.72*dt;support=clamp(support,4,96);sb.style.width=support+'%';
    const good=support>=38&&support<=68;sb.style.filter=good?'brightness(1.25)':'saturate(.45)';
    if(good){walk+=.28*dt;walker.style.left=Math.min(84,walk*.84)+'%';wb.style.width=Math.min(100,walk)+'%'}
    else if(t-warn>1800){warn=t;toast(support<38?'Un peu plus de soutien. Raphy fait la forte, évidemment.':'Doucement. On l’aide, on ne la transporte pas comme une commode.')}
    if(walk>=100){phase='drive';toast('Sortie réussie. Hamoud considère ça comme une trahison personnelle.');setTimeout(drive,650);return}
    requestAnimationFrame(loop)
  };
  requestAnimationFrame(loop);

  function drive(){
    screen(top(0)+hero('Trace 01 · partie 2','Trajet vers l’hôpital','Trois voies. Évite les bosses. Mehdi a décrété que les limitations émotionnelles ne s’appliquaient pas.')+
    '<div class="road-stage" id="road"><div class="road-lines"></div><div id="car" class="road-car">🚗</div><div id="obstacles"></div><div class="hospital-sign">HÔPITAL ↑</div></div>'+
    '<div class="card"><div class="hud"><span id="dist">0%</span><span id="bumps">0 bosse</span></div><div class="meter cold"><i id="driveBar"></i></div><div class="actions two" style="margin-top:12px"><button class="btn secondary" id="left">← Gauche</button><button class="btn secondary" id="right">Droite →</button></div></div>'+skip(0));
    wireSkip(0);
    let lane=1,d=0,hits=0,obs=[],tick=0,lastT=performance.now();
    const car=$('#car'),road=$('#road'),layer=$('#obstacles');
    const setLane=()=>car.style.left=(16+lane*34)+'%';setLane();
    $('#left').onclick=()=>{lane=Math.max(0,lane-1);setLane();vib(8)};
    $('#right').onclick=()=>{lane=Math.min(2,lane+1);setLane();vib(8)};
    const spawn=()=>{
      const el=document.createElement('div'),ln=Math.floor(Math.random()*3);
      el.className='road-bump';el.style.left=(11+ln*34)+'%';el.style.top='-40px';el.textContent=Math.random()>.72?'🕳️':'▰';
      layer.append(el);obs.push({el,lane:ln,y:-40,hit:false});
    };
    const run=t=>{
      if(!road.isConnected)return;
      const dt=Math.min(40,t-lastT)/16;lastT=t;tick+=dt;
      if(tick>42){tick=0;spawn()}
      d+=.22*dt;$('#driveBar').style.width=Math.min(100,d)+'%';$('#dist').textContent=Math.floor(Math.min(100,d))+'%';
      obs.forEach(o=>{o.y+=4.1*dt;o.el.style.top=o.y+'px';if(!o.hit&&o.y>road.clientHeight-125&&o.y<road.clientHeight-65&&o.lane===lane){o.hit=true;hits++;d=Math.max(0,d-5);$('#bumps').textContent=hits+' bosse'+(hits>1?'s':'');vib([16,24,16]);toast(hits===1?'Dos-d’âne détecté par le dos avant le conducteur.':'La suspension souhaite participer à la conversation.')}});
      obs=obs.filter(o=>{if(o.y>road.clientHeight+50){o.el.remove();return false}return true});
      if(d>=100){toast(hits<2?'Arrivée propre. Même Raphy est légèrement surprise.':'Arrivée à l’hôpital. La route dépose une plainte contre Mehdi.');setTimeout(()=>complete(0),800);return}
      requestAnimationFrame(run)
    };
    requestAnimationFrame(run)
  }
}

function mri(){
  let scan=0,stability=86,breaths=0,windowOpen=false,finished=false;
  screen(top(1)+hero('Trace 02','IRM : mission immobilité','Le scanner fait un bruit de chantier naval. Ton nez, lui, choisit précisément maintenant pour couler.')+
  '<div class="game-stage mri-stage" id="mriStage"><div class="mri-tunnel"><div class="mri-bed">😐</div><div class="scan-line"></div></div><div id="breathRing" class="breath-ring"></div><button class="temptation" id="nose">🤧 toucher le nez</button><button class="temptation second" id="itch">ça gratte ici →</button></div>'+
  '<div class="card"><div class="hud"><span>Stabilité <b id="stab">86%</b></span><span>Respirations <b id="br">0/5</b></span></div><div class="meter cold"><i id="scan"></i></div><button class="btn secondary" id="breathe" style="margin-top:12px">Caler la respiration</button><p class="caption" id="ml">Tape uniquement quand l’anneau devient doré.</p></div>'+skip(1));
  wireSkip(1);
  const ring=$('#breathRing'),btn=$('#breathe');
  let start=performance.now(),last=performance.now();
  $('#nose').onclick=()=>{stability-=13;vib(12);toast('Le nez gagne. La dignité perd un petit peu.')};
  $('#itch').onclick=()=>{stability-=17;vib(12);toast('Le scanner vient de dessiner ton tatouage en police Comic Sans.')};
  btn.onclick=()=>{
    if(windowOpen){breaths++;stability=Math.min(100,stability+5);toast(['Parfait.','Propre.','Le radiologue imaginaire approuve.'][breaths%3]);vib(8)}
    else{stability-=8;toast('Trop tôt. La machine note « mouvement artistique ».')}
    $('#br').textContent=breaths+'/5';$('#stab').textContent=Math.max(0,Math.round(stability))+'%'
  };
  const loop=t=>{
    if(!ring.isConnected||finished)return;
    const phase=((t-start)%2200)/2200,scale=.72+Math.sin(phase*Math.PI)*.55;
    ring.style.transform='translate(-50%,-50%) scale('+scale+')';
    windowOpen=scale>1.08&&scale<1.2;ring.classList.toggle('gold',windowOpen);
    const dt=Math.min(40,t-last)/16;last=t;scan+=.11*dt;
    $('#scan').style.width=Math.min(100,scan)+'%';stability-=.012*dt;$('#stab').textContent=Math.max(0,Math.round(stability))+'%';
    if(scan>42&&scan<44)$('#ml').textContent='Reconstruction tatouage : « NEW… YOR? » Le logiciel panique.';
    if(scan>=100||breaths>=5){finished=true;toast(stability>65?'Scan terminé. Immobilité franchement suspecte.':'Scan terminé. Le tatouage demande à parler au service graphique.');setTimeout(()=>complete(1),850);return}
    requestAnimationFrame(loop)
  };requestAnimationFrame(loop)
}

function gyno(){
  let q=0;
  const doctor=[
    ['Parfait. Le logiciel, lui, fuit clairement.','Je note : « patiente coopérative, logiciel à surveiller ».','Très bien. J’ajoute « plomberie émotionnelle stable ».'],
    ['Réponse recevable. La paperasse, moins.','Je peux prescrire trois jours sans formulaire. Malheureusement c’est un formulaire.','Votre patience est donc en phase terminale administrative.'],
    ['Merci de confirmer. J’avais peur que ce rendez-vous parte très loin.','Le lavabo est donc officiellement le patient secondaire.','Je vais entourer « TOUJOURS LE LAVABO » en rouge.'],
    ['Je vois. Exposition chronique à la confiance masculine non homologuée.','Je recommande de conserver la notice à distance de Mehdi.','Le terme « optimisation » vient d’être interdit dans ce cabinet.'],
    ['Excellent. Nous sauvons la dignité du service.','Vous aviez révisé ? Je suis presque inquiète.','Le siphon peut attendre en salle d’attente.'],
    ['Décision courageuse. Très courageuse.','Je peux inscrire Hamoud en contact secondaire, mais il ne répond jamais.','Je note : Mehdi, sous réserve de conduite acceptable.'],
    ['Je m’en doutais. Le « ça va » familial est très résistant.','Secret défense accepté.','Très bien. Je traduis médicalement par : « elle fait la forte ».']
  ];
  screen(top(4)+hero('Trace 05','Consultation gynéco','Non graphique. Très sérieuse en apparence. Complètement sabotée par le logiciel.')+
  '<div class="clinic-shell"><div class="clinic-head"><span>Cabinet · dossier RAPHY</span><span id="bug">SYSTÈME OK</span></div><div class="dialogue"><div class="avatar">👩‍⚕️</div><div class="bubble" id="gq"></div></div><div id="gopts" class="choices" style="margin-top:14px"></div><div id="greply"></div></div>'+skip(4));
  wireSkip(4);
  const draw=()=>{
    if(q>=QG.length){
      $('#gq').innerHTML='C’est terminé. Le logiciel vous remercie et demande maintenant la référence du siphon.';
      $('#gopts').innerHTML='<button class="btn" id="gend">Quitter le cabinet avec votre dignité</button>';
      $('#greply').innerHTML='<div class="fake-form"><b>Compte rendu :</b><br>Patiente : Raphy<br>État : très bien<br>Lavabo : à revoir<br>Mehdi : surveillance recommandée</div>';
      $('#gend').onclick=()=>complete(4);return
    }
    $('#bug').textContent=q%2?'ERREUR #VASQUE':'SYSTÈME OK';$('#bug').classList.toggle('danger-text',q%2===1);
    $('#gq').textContent=QG[q][0];
    $('#gopts').innerHTML=QG[q][1].map((x,j)=>'<button class="choice" data-g="'+j+'">'+x+'</button>').join('');
    $('#greply').innerHTML='';
    $$('[data-g]').forEach(b=>b.onclick=()=>{
      const j=+b.dataset.g;vib(8);$('#gopts').innerHTML='';
      $('#greply').innerHTML='<div class="dialogue" style="margin-top:14px"><div class="avatar">🩺</div><div class="bubble me">'+doctor[q][j]+'</div></div><button class="btn secondary" id="gnext" style="margin-top:12px">Question suivante</button>';
      $('#gnext').onclick=()=>{q++;draw()}
    })
  };draw()
}
