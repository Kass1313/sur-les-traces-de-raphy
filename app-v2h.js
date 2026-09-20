'use strict';

(()=>{
  const pauseBtn=document.createElement('button');
  pauseBtn.className='pause-dock';
  pauseBtn.type='button';
  pauseBtn.textContent='Ⅱ';
  pauseBtn.setAttribute('aria-label','Mettre en pause');
  document.body.append(pauseBtn);

  let paused=false,pendingComplete=null;
  const nativeComplete=complete;

  complete=function(i,sk=false){
    if(paused){pendingComplete={i,sk};return}
    return nativeComplete(i,sk)
  };

  pauseBtn.onclick=()=>{
    if(paused)return;
    paused=true;
    document.body.classList.add('raphy-paused');
    modal.hidden=false;
    modal.innerHTML='<div class="modal-card pause-card"><div class="eyebrow">PAUSE</div><h2>La maison attend.</h2><p class="storyline">Même Hamoud a arrêté de toucher aux trucs. Enfin, normalement.</p><div class="actions"><button class="btn" id="resumeGame">Reprendre</button><button class="btn secondary" id="restartScene">Recommencer cette trace</button><button class="btn secondary" id="pauseReplay">Voir les traces débloquées</button></div></div>';
    $('#resumeGame').onclick=()=>{
      paused=false;document.body.classList.remove('raphy-paused');modal.hidden=true;modal.innerHTML='';
      if(pendingComplete){pendingComplete=null;route(S.current)}
    };
    $('#restartScene').onclick=()=>{pendingComplete=null;paused=false;document.body.classList.remove('raphy-paused');modal.hidden=true;modal.innerHTML='';route(S.current)};
    $('#pauseReplay').onclick=()=>{pendingComplete=null;paused=false;document.body.classList.remove('raphy-paused');modal.hidden=true;modal.innerHTML='';replay()}
  };
})();

function cleanCarGame(){
  let phase=0,washed=0,interior=0,finalFound=false,down=false;
  const dirt=[];
  screen(top(10)+hero('Trace 11','Nettoyage voiture extrême','Trois phases. Extérieur, intérieur, puis la tache microscopique que la voiture gardait spécialement pour toi.')+
  '<div class="carwash-stage" id="carWash"><div class="wash-sky"></div><div class="wash-car"><div class="car-roof"></div><div class="car-window"></div><div class="car-body">🚙</div></div><canvas id="washCanvas" width="700" height="430"></canvas></div>'+
  '<div class="card"><div class="hud"><span id="cleanPhase">1/3 · extérieur</span><span id="cleanPct">0%</span></div><div class="meter cold"><i id="cleanBar"></i></div><p class="caption" id="cleanCopy">Frotte la carrosserie. Oui, vraiment. Le chiffon imaginaire est inclus.</p></div>'+skip(10));
  wireSkip(10);
  const cv=$('#washCanvas'),ctx=cv.getContext('2d');
  ctx.clearRect(0,0,700,430);
  for(let i=0;i<115;i++){
    const x=85+Math.random()*530,y=115+Math.random()*230,r=5+Math.random()*17;
    dirt.push({x,y,r,alive:true});
    ctx.fillStyle='rgba(78,59,45,'+(0.35+Math.random()*.4)+')';
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()
  }

  const clean=e=>{
    if(!down||phase!==0)return;
    const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*700/r.width,y=(e.clientY-r.top)*430/r.height;
    let hit=0;
    for(const d of dirt){
      if(d.alive&&Math.hypot(d.x-x,d.y-y)<44){d.alive=false;hit++}
    }
    if(hit){
      redraw();
      washed=dirt.filter(d=>!d.alive).length/dirt.length*100;
      $('#cleanPct').textContent=Math.min(99,Math.floor(washed))+'%';
      $('#cleanBar').style.width=Math.min(99,washed)+'%';
      if(washed>94)setTimeout(interiorPhase,450)
    }
  };
  cv.onpointerdown=e=>{down=true;clean(e)};
  cv.onpointermove=clean;
  cv.onpointerup=()=>down=false;
  cv.onpointercancel=()=>down=false;

  function redraw(){
    ctx.clearRect(0,0,700,430);
    for(const d of dirt){
      if(!d.alive)continue;
      ctx.fillStyle='rgba(78,59,45,.58)';
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()
    }
  }

  function interiorPhase(){
    if(phase!==0)return;
    phase=1;
    $('#cleanPhase').textContent='2/3 · intérieur';
    $('#cleanPct').textContent='0/7 objets';
    $('#cleanBar').style.width='0%';
    $('#cleanCopy').textContent='Ramasse tout ce qui n’a aucune raison crédible d’être encore dans la voiture.';
    $('#carWash').innerHTML='<div class="car-interior"><div class="dashboard">TABLEAU DE BORD</div>'+
      [
        ['🧾','ticket froissé',12,64],['🧦','chaussette mystère',70,72],['🥤','gobelet vide',30,58],
        ['🧻','lingette',82,42],['🍪','miette géante',48,80],['🧸','petit jouet',20,36],['🐈','poils d’Hamoud',62,34]
      ].map((x,i)=>'<button class="car-trash" data-trash="'+i+'" style="left:'+x[2]+'%;top:'+x[3]+'%"><span>'+x[0]+'</span><small>'+x[1]+'</small></button>').join('')+
      '</div>';
    $$('[data-trash]').forEach(b=>b.onclick=()=>{
      if(b.disabled)return;b.disabled=true;
      b.animate([{transform:'scale(1)',opacity:1},{transform:'scale(.2) rotate(12deg)',opacity:0}],{duration:300,fill:'forwards'});
      interior++;
      $('#cleanPct').textContent=interior+'/7 objets';
      $('#cleanBar').style.width=(interior/7*100)+'%';
      toast(interior===6?'Il reste un truc. La voiture le défend personnellement.':interior===7?'Intérieur propre. Trop propre. C’est suspect.':'Retiré. La voiture récupère un peu de dignité.');
      if(interior===7)setTimeout(finalSpot,650)
    })
  }

  function finalSpot(){
    phase=2;
    $('#cleanPhase').textContent='3/3 · le fameux 99%';
    $('#cleanPct').textContent='99%';
    $('#cleanBar').style.width='99%';
    $('#cleanCopy').textContent='Il reste UNE tache. Minuscule. Évidemment. Cherche-la.';
    $('#carWash').innerHTML='<div class="final-clean-scene"><div class="clean-car-big">🚙</div><button class="micro-spot" id="microSpot" aria-label="Petite tache"></button><div class="clean-sparkles">✦ ✧ ✦</div></div>';
    $('#microSpot').onclick=()=>{
      if(finalFound)return;
      finalFound=true;$('#microSpot').classList.add('found');
      $('#cleanPct').textContent='100%';$('#cleanBar').style.width='100%';
      toast('100%. Silence. Respect. ... Hamoud arrive.');
      setTimeout(()=>{
        $('#carWash').insertAdjacentHTML('beforeend','<div class="cat-redirt">🐈 <span>🐾</span></div>');
        toast('Il a remis UNE trace. C’est sa signature, apparemment.');
        setTimeout(()=>complete(10),1100)
      },900)
    }
  }
}

route=function(i){
  S.current=i;save();skipArmed=false;
  [
    departure,mri,physioGame,operationGame,gyno,cellarGame,architectGame,paintingGame,sinkGame,batteryGame,
    cleanCarGame,school,bedtimeGame,heroKidGame,mojito,coffee,customsGame,algeria,horror,houseGame,unknown,escapeGame,trial,calm,unsaid,final
  ][i]()
};
