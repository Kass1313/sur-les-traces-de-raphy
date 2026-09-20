
'use strict';

function bedtimeGame(){
  let q=0,sleep=22,escapes=0;
  screen(top(12)+hero('Trace 13','Opération dodo','Objectif officiel : coucher une enfant fictive de 5 ans. Objectif réel : survivre aux négociations.')+
  '<div class="bedroom-stage"><div class="moon">☾</div><div class="bed">🛏️<span id="girl">👧🏻</span></div><div id="doorGirl" class="door-girl">🚪</div><div class="plush">🐷</div><div id="stars"></div></div>'+
  '<div class="card"><div class="hud"><span>Sommeil <b id="sleep">22%</b></span><span>Sorties de chambre <b id="esc">0</b></span></div><div class="meter"><i id="sleepBar" style="width:22%"></i></div><div id="bedQ" style="margin-top:14px"></div></div>'+skip(12));
  wireSkip(12);
  const reactions=[
    ['Mini verre accordé. Négociation eau : terminée pour 11 secondes.','Elle te regarde comme si tu venais d’inventer la sécheresse.','Mehdi est déclaré incompétent pour la diplomatie hydrique.'],
    ['Bonne décision. Elle avait en fait envie à 97%.','Attendre les 38% supplémentaires est une stratégie statistiquement étrange.','Le calcul est refusé par la Cour européenne du coucher.'],
    ['Pied gauche libéré. Le droit demande désormais les mêmes avantages.','Échange de pieds : solution innovante, anatomie non consultée.','Réunion reportée : les pieds refusent l’ordre du jour.'],
    ['Le doudou est rassuré. Il demande maintenant un verre d’eau.','Le doudou dépose une plainte pour management toxique.','Hamoud accepte le poste puis quitte la chambre sans prévenir.'],
    ['Contrôle rapide : rien. Absolument rien. Donc évidemment c’était terrifiant.','Elle imite le bruit. C’était probablement… un bruit.','La maison entend qu’on parle d’elle. Mauvaise idée.'],
    ['Réponse parfaitement raisonnable. Le poisson attendra demain.','Cours d’osmose à 21h14 : décision ambitieuse.','Mehdi est consulté. L’erreur stratégique est immédiate.'],
    ['Test lancé. Elle ferme les yeux pour vérifier scientifiquement.','Le temps refuse de négocier.','La sieste espagnole dépose une demande de brevet.']
  ];
  const draw=()=>{
    $('#sleep').textContent=Math.min(100,sleep)+'%';$('#sleepBar').style.width=Math.min(100,sleep)+'%';$('#esc').textContent=escapes;
    if(q>=QGIRL.length){
      $('#bedQ').innerHTML='<div class="card soft"><h3>Elle dort.</h3><p>Maintenant : sortir sans marcher sur le jouet, faire grincer le parquet ou réveiller Hamoud.</p><button class="btn" id="stealth">Mode furtif</button></div>';
      $('#stealth').onclick=stealth;return
    }
    const z=QGIRL[q];
    $('#bedQ').innerHTML='<div class="dialogue"><div class="avatar">👧🏻</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-bq="'+j+'">'+x+'</button>').join('')+'</div>';
    $$('[data-bq]').forEach(b=>b.onclick=()=>{
      const j=+b.dataset.bq;escapes++;sleep+=j===0?13:j===1?8:5;vib(6);
      toast(reactions[q][j],3000);
      $('#girl').animate([{transform:'translateY(0)'},{transform:'translateY(-18px)'},{transform:'translateY(0)'}],{duration:420});
      q++;setTimeout(draw,650)
    })
  };
  function stealth(){
    let pos=0,noise=0;
    $('#bedQ').innerHTML='<div class="stealth-track"><div id="foot" class="stealth-foot">🦶</div><div class="noise-zone" style="left:30%">🧸</div><div class="noise-zone" style="left:56%">▦</div><div class="noise-zone" style="left:76%">🐈</div></div><button class="btn secondary" id="stepBtn" style="margin-top:12px">Faire un petit pas</button><p class="caption">Le rythme change. Tape doucement quand le halo est petit.</p>';
    let safe=false,start=performance.now();const btn=$('#stepBtn');
    const pulse=()=>{
      if(!btn?.isConnected)return;
      const ph=((performance.now()-start)%1500)/1500,scale=.75+Math.sin(ph*Math.PI)*.65;btn.style.transform='scale('+scale+')';safe=scale<.95;requestAnimationFrame(pulse)
    };pulse();
    btn.onclick=()=>{
      if(safe){pos+=18;toast('Silence parfait. Même le parquet est impressionné.')}
      else{noise++;pos+=9;vib(16);toast(noise===1?'CRAC. Tout le monde reste immobile. Même toi.':'Hamoud ouvre un œil. Situation diplomatique fragile.')}
      $('#foot').style.left=Math.min(90,pos)+'%';
      if(pos>=90){toast('Sortie réussie. Puis une petite voix : « Maman… les poissons ils ont soif ? »');setTimeout(()=>complete(12),1100)}
    }
  }
  draw()
}

function heroKidGame(){
  let q=0,power=20;
  const gear=['🦸 Cape','🥷 Masque','📡 Gadget','🍎 Snack','⭐ Badge','🧸 Doudou secret défense'];
  screen(top(13)+hero('Trace 14','Mission super-héros','Un garçon fictif de 6 ans doit sauver le monde. Il lui manque essentiellement tout son matériel et quelques réponses philosophiques.')+
  '<div class="hero-room"><div class="city-window">🏙️</div><div id="heroBoy" class="hero-boy">🦸🏻‍♂️</div><div id="catMask" class="cat-mask">🐈‍⬛</div></div>'+
  '<div class="card"><div class="hud"><span>Puissance <b id="power">20%</b></span><span>Questions <b id="hq">0/7</b></span></div><div class="meter cold"><i id="powerBar" style="width:20%"></i></div><div id="heroQ" style="margin-top:14px"></div></div>'+skip(13));
  wireSkip(13);
  const comments=[
    ['Verdict accepté. Le pyjama obtient le statut de costume secondaire.','Doublement habillé, donc probablement impossible à coucher.','Réponse diplomatique : personne n’est satisfait, donc elle est parfaite.'],
    ['Même les héros mangent les légumes. Tragédie validée.','Le ministère des brocolis ouvre une enquête.','Carotte héroïque homologuée niveau 3.'],
    ['Exact. Maman sait. Ne demande pas comment.','Google Maps demande à être crédité au générique.','Secret défense : refus de réponse accepté.'],
    ['Le doudou reçoit immédiatement une habilitation confidentiel-défense.','Décision annulée par la Ligue des Super-Doudous.','Cape ajoutée : le doudou devient officiellement commandant.'],
    ['Hamoud devient identité secrète. Il refuse le costume.','Réponse juridique correcte. Féline, mais correcte.','La nuit uniquement : clause étonnamment précise.'],
    ['La Terre remercie de ne pas tenter l’expérience dans le salon.','Demain refuse d’accélérer. Scandale.','Excellente idée : transférer la responsabilité à une planète.'],
    ['Le dinosaure invisible proteste.','Le robot savait. C’est déjà beaucoup.','Enfin une réponse honnête : absolument personne ne sait.']
  ];
  const draw=()=>{
    $('#power').textContent=Math.min(100,power)+'%';$('#powerBar').style.width=Math.min(100,power)+'%';$('#hq').textContent=q+'/7';
    if(q>=QBOY.length){return inventory()}
    const z=QBOY[q];
    $('#heroQ').innerHTML='<div class="dialogue"><div class="avatar">🦸🏻‍♂️</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-hq="'+j+'">'+x+'</button>').join('')+'</div>';
    $$('[data-hq]').forEach(b=>b.onclick=()=>{
      const j=+b.dataset.hq;power+=j===2?12:9;toast(comments[q][j],2800);vib(7);q++;setTimeout(draw,600)
    })
  };
  function inventory(){
    $('#heroQ').innerHTML='<div class="eyebrow">Équipement avant départ</div><div class="item-grid" id="gear">'+gear.map((x,i)=>'<button class="item big" data-gear="'+i+'">'+x+'</button>').join('')+'</div><p class="caption">Hamoud a le masque. Oui, encore lui.</p>';
    let got=0;
    $$('[data-gear]').forEach(b=>b.onclick=()=>{
      const n=+b.dataset.gear;
      if(n===1&&!$('#catMask').classList.contains('caught'))return toast('Masque introuvable. Le chat évite soigneusement ton regard.');
      if(b.disabled)return;b.disabled=true;b.classList.add('selected');got++;toast(got===gear.length?'Équipement complet. Le monde peut respirer.':'Objet sécurisé.')
      if(got===gear.length)setTimeout(()=>complete(13),800)
    });
    $('#catMask').onclick=()=>{$('#catMask').classList.add('caught');$('#catMask').textContent='🐈';toast('Masque récupéré. Hamoud affirme qu’il “le gardait”.')}
  }
  draw()
}
