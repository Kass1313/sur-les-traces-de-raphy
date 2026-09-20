
'use strict';

function school(){
  let found=0,chat=0;
  screen(top(11)+hero('Trace 12','Sortie d’école','Six affaires à récupérer. Et surtout : ne te fais pas aspirer dans une conversation de portail de 14 minutes.')+
  '<div class="game-stage school-stage" id="sch"><div class="school-door">MATERNELLE</div>'+
  ['🎒','🧥','🥤','🧸','🎨','🥿'].map((x,i)=>'<button class="school-item" data-s style="left:'+(8+(i%3)*31)+'%;top:'+(78+Math.floor(i/3)*132)+'px">'+x+'</button>').join('')+
  '<button class="chat-mom" id="mom1">👩 « juste deux minutes… »</button><button class="chat-mom mom2" id="mom2">👩‍🦱 « tu sais pour la kermesse ? »</button></div>'+
  '<div class="card"><div class="hud"><span id="found">0/6 affaires</span><span id="talk">0 conversation piégée</span></div><p class="caption">Les mamans sont fictives. Leur capacité à prolonger une phrase ne l’est pas.</p></div>'+skip(11));
  wireSkip(11);
  $$('[data-s]').forEach(b=>b.onclick=()=>{
    if(b.disabled)return;
    b.disabled=true;
    b.animate([{transform:'scale(1)'},{transform:'scale(1.45) rotate(8deg)'},{transform:'scale(.2)'}],{duration:350,fill:'forwards'});
    found++;$('#found').textContent=found+'/6 affaires';
    toast(found===5?'Il en manque UNE. Évidemment.':found===6?'Tout est là. Fuite du portail autorisée.':'Objet récupéré. Aucun échange WhatsApp requis.');
    if(found===6)setTimeout(()=>complete(11),900)
  });
  ['#mom1','#mom2'].forEach((s,idx)=>{$(s).onclick=()=>{
    chat++;$('#talk').textContent=chat+' conversation'+(chat>1?'s':'')+' piégée'+(chat>1?'s':'');
    toast(idx?'Kermesse, gâteaux, tombola… tu viens de perdre 6 minutes fictives.':'« Juste deux minutes » vient officiellement de dépasser quatre minutes.')
  }})
}

function coffee(){
  let step=0;
  const ingredients=[
    ['Vanille','🍦','layer-vanilla'],['Lait','🥛','layer-milk'],['Glace','🧊','layer-ice'],['Espresso','☕','layer-coffee'],['Caramel','🍯','layer-caramel']
  ];
  screen(top(15)+hero('Trace 16','Iced caramel macchiato','Pas un QCM. Monte-le vraiment, couche par couche.')+
  '<div class="coffee-scene"><div class="coffee-machine">☕<span>BAR</span></div><div class="cup"><div id="cupLayers"></div><div class="cup-logo">R</div></div></div>'+
  '<div class="item-grid" id="coffeeItems">'+ingredients.map((x,i)=>'<button class="item big" data-c="'+i+'"><span style="font-size:30px">'+x[1]+'</span><br>'+x[0]+'</button>').join('')+'</div><div id="customer"></div>'+skip(15));
  wireSkip(15);
  $$('[data-c]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.c;
    if(i!==step)return toast(['Non. Le barista intérieur vient de tousser très fort.','On peut le faire… mais ce ne sera plus la même boisson.','Raphy, concentre-toi, le caramel nous regarde.'][Math.floor(Math.random()*3)]);
    const x=ingredients[i];b.disabled=true;b.classList.add('selected');
    const layer=document.createElement('div');layer.className='coffee-layer '+x[2];layer.innerHTML=i===2?'<span>◆ ◆ ◆</span>':'';
    $('#cupLayers').append(layer);
    layer.animate([{transform:'scaleY(0)',opacity:.4},{transform:'scaleY(1)',opacity:1}],{duration:450,fill:'both'});
    step++;vib(8);
    toast(step===4?'Espresso posé. Regarde les couches — là on respecte le sujet.':step===5?'Caramel terminé. Le client suivant arrive déjà, malheureusement.':'Ajout propre.');
    if(step===5)setTimeout(customers,700)
  });
  function customers(){
    let n=0;
    const orders=[
      ['Bonjour, je veux le même… sans café.',['Donc un lait caramel ?','Je vais faire semblant de ne pas avoir entendu.','Hamoud prend la commande.']],
      ['Avec 2 glaçons et demi exactement.',['Je coupe le troisième.','Vous avez un pied à coulisse ?','Non.']],
      ['Et très très chaud, mais glacé.',['Physique : désactivée.','Bien sûr madame.','Je vous propose de choisir une température sur Terre.']]
    ];
    const draw=()=>{
      if(n>=orders.length){
        $('#customer').innerHTML='<div class="card glow"><b>Service terminé.</b><br><span class="caption">Raphy garde la boisson. Les clients gardent leurs problèmes.</span><button class="btn" id="cend" style="margin-top:12px">Continuer</button></div>';
        $('#cend').onclick=()=>complete(15);return
      }
      $('#customer').innerHTML='<div class="card"><div class="dialogue"><div class="avatar">🙂</div><div class="bubble">'+orders[n][0]+'</div></div><div class="choices" style="margin-top:12px">'+orders[n][1].map((x,j)=>'<button class="choice" data-co="'+j+'">'+x+'</button>').join('')+'</div></div>';
      $$('[data-co]').forEach(b=>b.onclick=()=>{
        toast(+b.dataset.co===0?'Réponse professionnellement défendable.':+b.dataset.co===1?'Le service client quitte mentalement la pièce.':'Court. Efficace. Juridiquement fascinant.');
        n++;setTimeout(draw,500)
      })
    };
    draw()
  }
}

function horror(){
  let clues=0,calmed=false,ended=false;
  screen(top(18)+hero('Trace 19','La pièce qui bourdonne','Trouve trois marques sur les murs avec la lampe. Les papillons, eux, trouvent très bien la lampe tout seuls.')+
  '<div class="game-stage horror-stage" id="hs"><div id="moths"></div><button class="wall-symbol" data-hclue style="left:14%;top:20%">△</button><button class="wall-symbol" data-hclue style="right:15%;top:48%">1105</button><button class="wall-symbol" data-hclue style="left:32%;bottom:15%">♥</button><div class="flashlight" id="fl"></div><button class="btn small secondary" id="lamp" style="position:absolute;right:12px;top:12px;z-index:5">Allumer l’autre lampe</button><div class="hamoud-horror">🐈</div><div id="shadow" class="horror-shadow"></div></div>'+
  '<div class="card"><div class="hud"><span id="hc">0/3 marques</span><span id="fear">bruit : faible</span></div><p class="caption">Déplace ton doigt pour déplacer la lumière. Tu peux passer la scène à tout moment.</p></div>'+skip(18),'horror');
  wireSkip(18);
  for(let i=0;i<14;i++){
    let m=document.createElement('div');m.className='moth';m.style.setProperty('--dur',(2.2+Math.random()*4)+'s');m.style.left=Math.random()*90+'%';m.style.top=Math.random()*70+'%';$('#moths').append(m)
  }
  const stage=$('#hs'),fl=$('#fl');
  const move=e=>{let r=stage.getBoundingClientRect();fl.style.setProperty('--x',(e.clientX-r.left)/r.width*100+'%');fl.style.setProperty('--y',(e.clientY-r.top)/r.height*100+'%')};
  stage.onpointermove=move;stage.onpointerdown=move;
  $$('[data-hclue]').forEach(el=>el.onclick=()=>{
    if(el.classList.contains('found'))return;
    el.classList.add('found');clues++;$('#hc').textContent=clues+'/3 marques';vib(10);
    toast(clues===1?'Une marque. Tu l’as déjà vue quelque part.':clues===2?'Deux. La maison insiste lourdement.':'Trois. Et quelque chose vient de bouger derrière toi.');
    if(clues===3)setTimeout(finish,1700)
  });
  $('#lamp').onclick=()=>{
    calmed=true;$('#moths').classList.add('lured');$('#fear').textContent='bruit : déplacé';
    toast('Bonne idée. Les ailes changent de cible. Pas toutes. Ça aurait été trop gentil.')
  };
  setTimeout(()=>{if(stage.isConnected){
    vib([18,40,18]);$('#shadow').classList.add('show');$('#fear').textContent='bruit : derrière';
    toast('Bruit derrière toi. Hamoud est pourtant juste devant.');
    setTimeout(()=>$('#shadow')?.classList.remove('show'),900)
  }},4200);
  setTimeout(()=>{if(stage.isConnected&&!ended){
    const bug=document.createElement('div');bug.className='screen-bug';bug.textContent='🪳';stage.append(bug);
    bug.animate([{transform:'translate(0,0) scale(.5)'},{transform:'translate(-45vw,65vh) scale(1.7)'}],{duration:1900,fill:'forwards'});
    setTimeout(()=>bug.remove(),2100)
  }},6500);
  function finish(){
    if(ended)return;ended=true;
    toast(calmed?'La porte s’ouvre. L’autre lampe reste allumée toute seule.':'La porte s’ouvre. Les ailes restent derrière. Enfin… presque.');
    setTimeout(()=>complete(18),900)
  }
}
