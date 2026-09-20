'use strict';

(()=>{
  S.flags=S.flags||{};
  const ACTS={
    0:{n:'ACTE I',title:'Ce qui commence sans prévenir',sub:'Des souvenirs ordinaires. Enfin… presque.',mark:'✦'},
    5:{n:'ACTE II',title:'La vraie vie est déjà un escape game',sub:'Cave, plans, peinture, lavabo. Aucun manuel ne survivra.',mark:'⌂'},
    12:{n:'ACTE III',title:'Ceux qui n’ont jamais sommeil',sub:'Deux mini-héros fictifs. Sept questions chacun. Beaucoup trop d’énergie.',mark:'☾'},
    18:{n:'ACTE IV',title:'Quand la maison commence à répondre',sub:'À partir d’ici, certains détails cessent d’être innocents.',mark:'◌'},
    21:{n:'ACTE V',title:'Tout était déjà là',sub:'Les détails reviennent. Cette fois, ils ont une raison.',mark:'♥'},
    23:{n:'ÉPILOGUE',title:'Ce qui reste quand les jeux s’arrêtent',sub:'Plus de chrono. Plus de score. Juste vous.',mark:'∞'}
  };
  const sceneMoods={
    0:'care',1:'medical',2:'medical',3:'medical',4:'medical',
    5:'work',6:'work',7:'work',8:'work',9:'work',10:'work',
    11:'family',12:'family',13:'family',14:'light',15:'light',16:'travel',17:'travel',
    18:'fear',19:'fear',20:'fear',21:'mystery',22:'mystery',23:'tender',24:'tender',25:'final'
  };

  const coreRoute=route;
  route=function(i,opts={}){
    document.body.dataset.scene=String(i);
    document.body.dataset.mood=sceneMoods[i]||'default';
    const act=ACTS[i];
    const key='raphy-act-'+i;
    if(act&&!opts.skipAct&&!sessionStorage.getItem(key)){
      sessionStorage.setItem(key,'1');
      return showAct(i,act)
    }
    return coreRoute(i)
  };

  function showAct(i,act){
    screen(
      '<div class="act-card act-'+(document.body.dataset.mood||'default')+'">'+
        '<div class="act-symbol">'+act.mark+'</div>'+
        '<div class="eyebrow">'+act.n+'</div>'+
        '<h1>'+act.title+'</h1>'+
        '<div class="act-rule"></div>'+
        '<p>'+act.sub+'</p>'+
        '<div class="act-whisper">'+actWhisper(i)+'</div>'+
        '<button class="btn secondary" id="actContinue">Continuer</button>'+
      '</div>',
      'centered act-screen'
    );
    let gone=false;
    const go=()=>{if(gone)return;gone=true;coreRoute(i)};
    $('#actContinue').onclick=go;
    setTimeout(go,i>=18?3100:2400)
  }

  function actWhisper(i){
    const lines={
      0:'« Il y a des jours qu’on ne reconnaît comme importants qu’après. »',
      5:'« Quelqu’un dira forcément “on a bien géré”. On sait déjà qui. »',
      12:'« Il est 21 h. Personne n’a l’intention de dormir. »',
      18:'« Tu connais déjà cette maison. C’est précisément ce qui devrait t’inquiéter. »',
      21:'« Rien n’a été ajouté. Tout a seulement été remarqué. »',
      23:'« Les meilleures traces ne demandent pas à être trouvées. »'
    };
    return lines[i]||''
  }

  const originalChapterCurtain=chapterCurtain;
  chapterCurtain=function(fromIndex,nextIndex,skipped){
    const callbacks={
      0:'Raphy avance mieux quand on l’aide sans décider à sa place.',
      1:'Le scanner a gardé plus qu’une image.',
      4:'Le logiciel médical connaît maintenant beaucoup trop bien le lavabo.',
      8:'Rouge et bleu. Inversés. La maison retient ça.',
      10:'Même propre à 100 %, Hamoud trouve encore un moyen de signer.',
      15:'Le caramel était dans le bon ordre. Détail inutile. Probablement.',
      17:'La brochure Mehdi Immobilier n’a toujours aucune valeur contractuelle.',
      18:'Trois marques ont été vues dans le noir.',
      19:'La pièce n’a bougé que quand Raphy a cessé de regarder.',
      20:'1105 vient d’être confirmé une deuxième fois.',
      21:'Le verrou central vient de comprendre quelque chose avant toi.',
      22:'Mehdi a été jugé. Les archives sont satisfaites.',
      24:'Il ne reste plus rien à résoudre.'
    };
    const extra=callbacks[fromIndex]||'';
    screen(
      '<div class="chapter-curtain '+([17,18,19,20,21].includes(fromIndex)?'ominous':'')+'">'+
        '<div class="curtain-mark">'+([17,18,19,20,21].includes(fromIndex)?'◌':'✦')+'</div>'+
        '<div class="eyebrow">'+(skipped?'TRACE PASSÉE':'TRACE CLASSÉE')+'</div>'+
        '<h2>'+NAMES[fromIndex]+'</h2>'+
        '<div class="curtain-line"></div>'+
        (extra?'<p class="curtain-callback">'+extra+'</p>':'')+
        '<small>prochaine trace</small>'+
        '<h3>'+NAMES[nextIndex]+'</h3>'+
        '<button class="btn secondary small" id="curtainNext">Continuer maintenant</button>'+
      '</div>',
      'centered'
    );
    let fired=false;
    const go=()=>{if(fired)return;fired=true;route(nextIndex)};
    $('#curtainNext').onclick=go;
    setTimeout(go,[17,18,19,20,21].includes(fromIndex)?2900:2100)
  };

  const baseReplay=replay;
  replay=function(){
    const groups=[
      ['ACTE I · HÔPITAL',[0,1,2,3,4]],
      ['ACTE II · BRICOLAGE & CHAOS',[5,6,7,8,9,10]],
      ['ACTE III · FAMILLE & LÉGÈRETÉ',[11,12,13,14,15,16,17]],
      ['ACTE IV · MAISON IMPOSSIBLE',[18,19,20]],
      ['ACTE V · DOSSIER FINAL',[21,22]],
      ['ÉPILOGUE',[23,24,25]]
    ];
    const doneCount=Object.keys(S.done||{}).filter(k=>S.done[k]).length;
    screen(
      hero('APRÈS LE GÉNÉRIQUE','Rejouer une trace','Pas besoin de recommencer toute l’histoire.')+
      '<div class="replay-progress"><div><b>'+doneCount+'</b><span>/26 traces débloquées</span></div><div class="meter"><i style="width:'+(doneCount/26*100)+'%"></i></div></div>'+
      groups.map(g=>
        '<section class="replay-act"><div class="eyebrow">'+g[0]+'</div><div class="replay-grid">'+
        g[1].map(i=>'<button class="replay-card" data-r="'+i+'" '+(S.done[i]?'':'disabled')+'><span>'+String(i+1).padStart(2,'0')+'</span><b>'+NAMES[i]+'</b><small>'+(S.done[i]?'rejouer':'verrouillé')+'</small></button>').join('')+
        '</div></section>'
      ).join('')+
      '<div class="card soft future-slot"><div class="eyebrow">CHAPITRE +1</div><h3>Pas encore écrit.</h3><p class="caption">C’est volontaire. Il faut bien laisser de la place à ce qui n’est pas encore arrivé.</p></div>'
    );
    $$('[data-r]').forEach(b=>b.onclick=()=>route(+b.dataset.r,{skipAct:true}))
  };

  const catLines=[
    'Hamoud te regarde comme si tout ceci était ton idée.',
    'Aucune déclaration sans avocat.',
    'Il sait quelque chose. Ou il veut juste manger. Impossible à déterminer.',
    'Chef de projet autoproclamé depuis 2026.',
    'Ce chat a statistiquement touché trop de choses dans cette application.',
    'Il n’a rien fait. Ce qui est exactement ce qu’il dirait.'
  ];
  let catTap=0;
  document.addEventListener('click',e=>{
    const target=e.target.closest('.hamoud-door,.op-cat,.sink-cat,.hamoud-horror,.cat-mask,.physio-ghost,.cinema-cat,.cat-redirt');
    if(!target)return;
    catTap++;
    if(catTap%2===0)toast(catLines[(catTap/2-1)%catLines.length],2600)
  });

  let lastScene=null;
  const observer=new MutationObserver(()=>{
    const current=document.body.dataset.scene;
    if(current===lastScene)return;
    lastScene=current;
    requestAnimationFrame(()=>{
      const s=document.querySelector('.screen');
      if(!s)return;
      s.classList.add('scene-cinematic-enter');
      setTimeout(()=>s.classList.remove('scene-cinematic-enter'),850)
    })
  });
  observer.observe(document.getElementById('app'),{childList:true,subtree:true});
})();
