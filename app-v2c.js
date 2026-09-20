
'use strict';

function sinkGame(){
  let step=0,washerFound=false;
  const names=['Vasque','Robinet','Joint principal','Siphon','Raccord eau','Test'];
  screen(top(8)+hero('Trace 09','Le lavabo','Cette fois, chaque pièce doit vraiment trouver sa place. Et bien sûr Hamoud a volé le seul petit joint important.')+
  '<div class="sink-stage"><div class="sink-wall"></div><div class="sink-basin">◡<div id="faucetSlot" class="sink-slot top-slot"></div><div id="drainSlot" class="sink-slot drain-slot"></div></div><div id="pipeSlot" class="pipe-slot"></div><button id="sinkCat" class="sink-cat">🐈</button><div id="leak" class="leak"></div></div>'+
  '<div class="card"><div class="eyebrow" id="sinkStep">Étape 1/6 · Vasque</div><div id="sinkParts" class="item-grid">'+['🛁 Vasque','🚰 Robinet','⭕ Joint','〰️ Siphon','🔴/🔵 Raccords','💧 Tester'].map((x,i)=>'<button class="item big" data-sp="'+i+'">'+x+'</button>').join('')+'</div><div id="sinkFinal"></div></div>'+skip(8));
  wireSkip(8);
  $('#sinkCat').onclick=()=>{
    if(step>=2&&!washerFound){
      washerFound=true;
      $('#sinkCat').animate([{transform:'translateX(0)'},{transform:'translateX(70px)'}],{duration:500,fill:'forwards'});
      toast('Sous Hamoud : le petit joint. Évidemment. Il était assis sur la plomberie.')
    }else toast('Hamoud refuse de répondre sans avocat.')
  };
  $$('[data-sp]').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.sp;
    if(n!==step)return toast('Pas encore. Mehdi dit « moi j’aurais essayé ». Personne ne lui a demandé.');
    if(n===2&&!washerFound)return toast('Le joint a disparu. Quelqu’un de poilu a l’air beaucoup trop calme.');
    b.disabled=true;b.classList.add('selected');step++;
    $('#sinkStep').textContent='Étape '+Math.min(step+1,6)+'/6 · '+(names[step]||'Test');
    if(n===1)$('#faucetSlot').innerHTML='🚰';
    if(n===2)$('#drainSlot').innerHTML='⭕';
    if(n===3)$('#pipeSlot').innerHTML='〰️';
    if(n===4)toast('Raccords posés. Rouge et bleu ont l’air… étrangement suspects.');
    if(n===5)finalTest()
  });
  function finalTest(){
    $('#sinkParts').style.display='none';
    $('#sinkFinal').innerHTML='<h3>Test eau</h3><p>Le bouton rouge sort froid. Le bleu sort chaud. Que fais-tu ?</p><div class="choices"><button class="choice" data-sf="0">Dire que c’est une fonctionnalité premium</button><button class="choice" data-sf="1">Inverser les deux repères</button><button class="choice" data-sf="2">Accuser la gravité</button></div>';
    $('#leak').classList.add('on');
    $$('[data-sf]').forEach(x=>x.onclick=()=>{
      if(+x.dataset.sf===1){
        $('#leak').classList.remove('on');
        toast('Corrigé. Mehdi annonce qu’il avait « justement un doute ».');
        setTimeout(()=>complete(8),900)
      }else toast(+x.dataset.sf===0?'Tentative brillante de rebranding. Refusée.':'La gravité demande à être retirée du dossier.')
    })
  }
}

function escapeGame(){
  let stage=0,timer;
  const tokens=[];
  screen(top(21)+hero('Trace 22','Le grand escape game','Tout ce que tu croyais être un détail revient. Pas de compteur de “fragments”. Juste la maison qui te demande si tu étais vraiment attentive.')+
  '<div class="escape-shell"><div class="escape-header"><span>VERROU CENTRAL</span><span id="et">0/6</span></div><div id="ec"></div><div id="eh"></div></div>'+skip(21));
  wireSkip(21);
  const hint=html=>{
    clearTimeout(timer);$('#eh').innerHTML='';
    timer=setTimeout(()=>{
      if(!$('#eh'))return;
      $('#eh').innerHTML='<button class="btn secondary small" id="hintE">Tu veux un indice ?</button>';
      $('#hintE').onclick=()=>{
        $('#hintE').textContent='Haha… évidemment 😏';
        setTimeout(()=>{if($('#hintE'))$('#hintE').outerHTML='<div class="card soft">'+html+'</div>'},500)
      }
    },20000)
  };
  const advance=(token,msg)=>{
    tokens.push(token);stage++;$('#et').textContent=stage+'/6';toast(msg);vib([8,18]);setTimeout(draw,650)
  };
  function draw(){
    clearTimeout(timer);
    if(!$('#ec'))return;
    $('#eh').innerHTML='';
    if(stage===0){
      $('#ec').innerHTML='<div class="eyebrow">Verrou 1 · scanner</div><h3>Un symbole a déjà été mal “reconstruit” pendant l’IRM.</h3><div class="escape-symbols">'+['○','△','♥','□'].map(x=>'<button class="escape-symbol" data-sym="'+x+'">'+x+'</button>').join('')+'</div>';
      $$('[data-sym]').forEach(b=>b.onclick=()=>b.dataset.sym==='♥'?advance('♥','Oui. Le cœur n’était pas décoratif.'):toast('Le scanner refuse ce symbole avec beaucoup d’assurance.'));
      hint('Repense à ce qui revenait quand la machine reconstruisait trop de choses.')
    }else if(stage===1){
      $('#ec').innerHTML='<div class="eyebrow">Verrou 2 · lavabo</div><h3>Le chaud et le froid avaient été inversés. Reproduis l’ordre corrigé.</h3><div class="valve-board"><button class="valve blue" data-v="B">FROID</button><button class="valve red" data-v="R">CHAUD</button></div><div class="code-strip" id="vs"></div>';
      let seq=[],goal=['B','R','B'];
      $$('[data-v]').forEach(b=>b.onclick=()=>{
        seq.push(b.dataset.v);$('#vs').textContent=seq.map(x=>x==='B'?'🔵':'🔴').join(' ');
        if(seq.length===3){
          if(seq.join('')===goal.join(''))advance('↔','Le lavabo avait menti. Toi non.');
          else{toast('Ça fuit conceptuellement. Recommence.');seq=[];$('#vs').textContent=''}
        }
      });
      hint('Le branchement était inversé. Pense bleu → rouge → bleu.')
    }else if(stage===2){
      $('#ec').innerHTML='<div class="eyebrow">Verrou 3 · mémoire</div><h3>Premier vrai rendez-vous surprise : jour + mois uniquement.</h3><div class="input-row"><input id="edate" class="code-input" maxlength="4" inputmode="numeric" placeholder="JJMM"><button class="btn" id="edateGo">Valider</button></div>';
      $('#edateGo').onclick=()=>$('#edate').value==='1105'?advance('1105','Exact. 11/05. La plage vient de réapparaître dans le dossier.'):toast('Non. Le sushi refuse cette chronologie.');
      hint('Tu connais seulement 1105. C’est volontaire : aucun piège sur l’année.')
    }else if(stage===3){
      $('#ec').innerHTML='<div class="eyebrow">Verrou 4 · Hamoud</div><h3>Observe son trajet. Puis répète-le.</h3><div class="paw-grid">'+Array.from({length:9},(_,i)=>'<button class="paw-cell" data-paw="'+i+'"></button>').join('')+'</div><button class="btn secondary" id="showPaw" style="margin-top:12px">Voir le trajet</button>';
      const goal=[0,4,8,5,2],input=[];let showing=false;
      $('#showPaw').onclick=async()=>{
        if(showing)return;showing=true;input.length=0;
        for(const n of goal){
          let el=$('[data-paw="'+n+'"]');el.classList.add('flash');
          await new Promise(r=>setTimeout(r,380));el.classList.remove('flash');
          await new Promise(r=>setTimeout(r,120))
        }
        showing=false;toast('À toi. Hamoud nie toute responsabilité.')
      };
      $$('[data-paw]').forEach(b=>b.onclick=()=>{
        if(showing)return;
        const n=+b.dataset.paw;input.push(n);b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),200);
        const k=input.length-1;
        if(n!==goal[k]){toast('Hamoud te regarde comme si C’ÉTAIT TOI qui avais mal marché.');input.length=0;return}
        if(input.length===goal.length)advance('🐈','Trajet reproduit. Le chat connaît une porte qui n’existe pas.')
      });
      hint('Le trajet forme une diagonale, descend, puis remonte vers la droite.')
    }else if(stage===4){
      const mem=[['💧','Cristaline'],['🛞','Balançoire'],['🍣','Plage'],['⛪','Bonne Mère']];
      $('#ec').innerHTML='<div class="eyebrow">Verrou 5 · chronologie</div><h3>Remets ces souvenirs dans l’ordre où ils sont entrés dans votre histoire.</h3><div class="memory-order">'+mem.map((x,i)=>'<button class="memory-chip" data-m="'+i+'">'+x[0]+' '+x[1]+'</button>').join('')+'</div><div id="mo" class="code-strip"></div>';
      const goal=[0,1,2,3],arr=[];
      $$('[data-m]').forEach(b=>b.onclick=()=>{
        const n=+b.dataset.m;if(arr.includes(n))return;
        arr.push(n);b.classList.add('selected');$('#mo').textContent=arr.map(n=>mem[n][0]).join(' → ');
        if(arr.length===4){
          if(arr.join('')===goal.join(''))advance('TRACE','Oui. Ce ne sont pas des “collectibles”. C’est la chronologie qui fait la trace.');
          else{toast('Presque. Le dossier rembobine.');arr.length=0;$$('[data-m]').forEach(x=>x.classList.remove('selected'));$('#mo').textContent=''}
        }
      });
      hint('Les deux bouteilles arrivent avant la balançoire, puis la plage, puis Marseille.')
    }else if(stage===5){
      $('#ec').innerHTML='<div class="eyebrow">Verrou final</div><h3>Tu as : '+tokens.join(' · ')+'</h3><p class="storyline">Choisis ce que la maison essayait réellement de reconstruire.</p><div class="choices"><button class="choice" data-final="0">Un objet disparu</button><button class="choice" data-final="1">Une preuve contre Mehdi</button><button class="choice" data-final="2">La trace que Raphy laisse dans les lieux et les moments</button></div>';
      $$('[data-final]').forEach(b=>b.onclick=()=>{
        if(+b.dataset.final!==2)return toast(+b.dataset.final===1?'Tentant. Mais non, son procès arrive juste après.':'La maison n’a rien volé. Regarde mieux.');
        clearTimeout(timer);$('#et').textContent='6/6';
        toast('Le verrou s’ouvre. Et soudain, tous les détails d’avant avaient une raison.');
        setTimeout(()=>complete(21),1100)
      });
      hint('Le titre du jeu est déjà la réponse. Ce n’est pas ce qu’elle trouve, c’est ce qu’elle laisse.')
    }
  }
  draw()
}

route=function(i){
  S.current=i;save();skipArmed=false;
  [
    departure,mri,()=>timing(2,'Kiné : protocole très officiel'),
    ()=>simpleOrder(3,'Bloc opératoire fictif','Puzzle, pas conseil médical.',[0,1,2,3],['🟦 L4','🟪 L5','🟡 Disque','❤️ Courage'],'Dos fictivement réparé. Hamoud conserve l’outil.'),
    gyno,
    ()=>simpleOrder(5,'La cave','Raphy range. Mehdi récoltera les mérites.',[0,1,2,3],['📦 Câbles','🎄 Déco','🪛 Objet inconnu','🐈 Hamoud'],'Cave rangée. Mehdi : « on a bien géré ».'),
    ()=>simpleOrder(6,'Architecte','Le client change d’avis toutes les 43 secondes.',[0,2,1,3],['🏠 Ouvrir','🧱 Refermer','☀️ Lumière','🗄️ Rangement'],'Le client adore. Il veut tout changer demain.'),
    ()=>canvasGame(7,'Peinture'),sinkGame,
    ()=>simpleOrder(9,'Batterie','Puzzle abstrait, pas tutoriel mécanique.',[0,2,1,3],['A','B','C','D'],'Système restauré. Pile de clé faible. Évidemment.'),
    ()=>canvasGame(10,'Nettoyage voiture',true),
    school,
    ()=>quiz(12,'Opération dodo','Sept excuses. Une seule mission : sortir vivante de la chambre.',QGIRL,'👧🏻❄️'),
    ()=>quiz(13,'Mission super-héros','Sept questions auxquelles aucun adulte n’était préparé.',QBOY,'🦸🏻‍♂️'),
    mojito,coffee,customs,algeria,horror,house,unknown,escapeGame,trial,calm,unsaid,final
  ][i]()
};
if(S.unlocked&&S.storyDone)route(S.current);
