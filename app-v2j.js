'use strict';

(()=>{
  const p=document.querySelector('.pause-dock');
  if(!p)return;
  const sync=()=>{p.style.display=S.unlocked?'grid':'none'};
  sync();
  const obs=new MutationObserver(sync);
  obs.observe(document.getElementById('app'),{childList:true,subtree:true});
})();

function operationGame(){
  let phase=0,alignment=50,monitor=74,toolFound=false,closed=false;
  screen(top(3)+hero('Trace 04','Opération fictive : dos neuf','Puzzle de jeu, pas conseil médical. Le chirurgien garde un calme franchement suspect.')+
  '<div class="operation-stage"><div class="op-monitor"><span>♥</span><b id="pulse">74</b></div><div class="spine-model"><div class="vertebra v1">L4</div><div class="disc" id="disc">●</div><div class="vertebra v2">L5</div></div><button class="op-cat" id="opCat">🐈</button><div id="opTool" class="op-tool">🔧</div></div>'+
  '<div class="card"><div class="hud"><span id="opPhase">1/4 · Aligner</span><span>Moniteur <b id="monitor">74</b></span></div><input id="align" type="range" min="0" max="100" value="50" style="width:100%"><div class="actions two" style="margin-top:12px"><button class="btn secondary" id="opAction">Valider</button><button class="btn secondary" id="opCalm">Respiration guidée</button></div><div id="opCopy" class="caption" style="margin-top:10px">Centre le disque dans la zone stable.</div></div>'+skip(3));
  wireSkip(3);
  const range=$('#align');
  const refresh=()=>{$('#monitor').textContent=Math.round(monitor);$('#pulse').textContent=Math.round(monitor)};
  range.oninput=()=>{alignment=+range.value;$('#disc').style.transform='translateX('+(alignment-50)*1.8+'px)'};
  $('#opCalm').onclick=()=>{
    if(phase<2)return toast('Le chirurgien respire déjà très bien. Enfin, il le prétend.');
    if(monitor<80)monitor+=4;
    else if(monitor>84)monitor-=4;
    else monitor+=(Math.random()>.5?1:-1);
    refresh();
    toast(monitor>=78&&monitor<=86?'Moniteur plus stable. Le bip redevient fréquentable.':'Ça se rapproche. Le bip arrête progressivement de paniquer.')
  };
  $('#opCat').onclick=()=>{
    if(phase===1&&!toolFound){
      toolFound=true;$('#opTool').classList.add('visible');
      toast('Hamoud avait l’instrument. Sous lui. Depuis le début.')
    }else toast('Hamoud n’est pas un membre certifié du bloc. Il refuse ce commentaire.')
  };
  $('#opAction').onclick=()=>{
    if(closed)return;
    if(phase===0){
      if(Math.abs(alignment-50)>8){monitor=Math.max(60,monitor-4);refresh();return toast('Trop décalé. Le chirurgien regarde l’écran comme s’il allait accuser la machine.')}
      phase=1;$('#opPhase').textContent='2/4 · Trouver l’outil';$('#opCopy').textContent='Un outil manque. Quelqu’un de poilu a l’air très confortable.';range.disabled=true;toast('Alignement propre. Étape suivante.')
    }else if(phase===1){
      if(!toolFound)return toast('L’outil n’est pas sur le plateau. Regarde le consultant félin.');
      phase=2;monitor=70;refresh();$('#opPhase').textContent='3/4 · Stabiliser';$('#opCopy').textContent='Ramène le moniteur entre 78 et 86 avec “Respiration guidée”.';$('#opAction').textContent='Tester la stabilité';toast('Outil récupéré. Le moniteur décide maintenant d’avoir une personnalité.')
    }else if(phase===2){
      if(monitor<78||monitor>86)return toast('Pas encore stable. Vise entre 78 et 86.');
      phase=3;$('#opPhase').textContent='4/4 · Fermeture';$('#opCopy').textContent='Choisis la finition officielle.';$('#opAction').style.display='none';$('#opCalm').style.display='none';
      const box=document.createElement('div');box.className='choices';box.innerHTML='<button class="choice" data-opend="0">Suture propre</button><button class="choice" data-opend="1">Ruban adhésif premium</button><button class="choice" data-opend="2">Laisser Mehdi dire « c’est bon »</button>';$('#opCopy').after(box);
      $$('[data-opend]').forEach(b=>b.onclick=()=>{
        if(+b.dataset.opend===0){
          closed=true;toast('Opération fictive terminée. Le chirurgien retrouve enfin une tension normale.');setTimeout(()=>complete(3),850)
        }else toast(+b.dataset.opend===1?'Le bloc refuse le forfait bricolage.':'Le chirurgien vient de retirer Mehdi de la liste du personnel.')
      })
    }
  }
}

function paintingGame(){
  let coverage=0,drips=0,paws=0,pawsSpawned=false,done=false,down=false,lastX=0,lastY=0,lastT=0;
  screen(top(7)+hero('Trace 08','Peinture fraîche','Peins le mur au doigt. Les coulures apparaissent si tu insistes trop au même endroit. Hamoud a signé un accord qu’il ne respectera pas.')+
  '<div class="paint-room"><canvas id="paintWall" width="700" height="520"></canvas><div id="paintPaws"></div></div><div class="card"><div class="hud"><span>Couverture <b id="cov">0%</b></span><span>Coulures <b id="drips">0</b></span><span>Pattes <b id="paws">0</b></span></div><div class="meter"><i id="paintBar"></i></div><button class="btn secondary" id="wipePaws" style="margin-top:12px">Nettoyer les traces de Hamoud</button></div>'+skip(7));
  wireSkip(7);
  const cv=$('#paintWall'),ctx=cv.getContext('2d');
  ctx.fillStyle='#d8d2ca';ctx.fillRect(0,0,700,520);

  const maybeFinish=()=>{
    if(done||coverage<100||paws>0)return;
    done=true;
    toast(drips<4?'Mur terminé. Propre. Mehdi cherche où mettre sa signature.':'Mur terminé. Les coulures sont officiellement du caractère.');
    setTimeout(()=>complete(7),900)
  };

  const paint=e=>{
    if(!down||done)return;
    const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*700/r.width,y=(e.clientY-r.top)*520/r.height,now=performance.now(),dist=Math.hypot(x-lastX,y-lastY);
    ctx.strokeStyle='#8d6d78';ctx.lineWidth=42;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(lastX||x,lastY||y);ctx.lineTo(x,y);ctx.stroke();
    coverage=Math.min(100,coverage+.32+dist/260);
    if(now-lastT<45&&dist<9&&Math.random()>.86){drips++;ctx.fillStyle='#785a65';ctx.fillRect(x-3,y,6,36+Math.random()*55);$('#drips').textContent=drips}
    lastX=x;lastY=y;lastT=now;
    $('#cov').textContent=Math.floor(coverage)+'%';$('#paintBar').style.width=coverage+'%';
    if(coverage>48&&!pawsSpawned)spawnPaws();
    maybeFinish()
  };

  cv.onpointerdown=e=>{down=true;lastX=0;lastY=0;paint(e)};
  cv.onpointermove=paint;
  cv.onpointerup=()=>down=false;
  cv.onpointercancel=()=>down=false;

  function spawnPaws(){
    pawsSpawned=true;paws=4;$('#paws').textContent=paws;
    $('#paintPaws').innerHTML='<button class="paint-paw" data-pawclean style="left:22%;top:34%">🐾</button><button class="paint-paw" data-pawclean style="left:42%;top:46%">🐾</button><button class="paint-paw" data-pawclean style="left:62%;top:54%">🐾</button><button class="paint-paw" data-pawclean style="left:78%;top:37%">🐾</button>';
    toast('Hamoud vient de traverser la peinture. Il marche comme un artiste subventionné.');
    $$('[data-pawclean]').forEach(b=>b.onclick=()=>{b.remove();paws--;$('#paws').textContent=paws;if(paws===0){toast(coverage>=100?'Traces nettoyées. L’artiste est parti sans signer.':'Pattes nettoyées. Il reste le mur à finir.');maybeFinish()}})
  }

  $('#wipePaws').onclick=()=>toast(paws?'Tape directement sur chaque patte. Hamoud exige un nettoyage personnalisé.':'Aucune patte à nettoyer. Profite, ça ne va pas durer.')
}

route=function(i){
  S.current=i;save();skipArmed=false;
  [
    departure,mri,physioGame,operationGame,gyno,cellarGame,architectGame,paintingGame,sinkGame,batteryGame,
    cleanCarGame,school,bedtimeGame,heroKidGame,mojito,coffee,customsGame,algeria,horror,houseGame,unknown,escapeGame,trial,calm,unsaid,final
  ][i]()
};
