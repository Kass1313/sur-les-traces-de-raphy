(function(){
'use strict';
window.__raphyRuntimePhase='entered';
try{
/* ===== app.js ===== */
'use strict';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const app=$('#app'),toastBox=$('#toast'),modal=$('#modal'),KEY='raphy-v8',CODE='060361';
const NAMES=['Le départ','IRM','Kiné','Bloc fictif','Gynécologue','Cave','Architecte','Peinture','Lavabo','Batterie','Nettoyage voiture','Sortie d’école','Dodo princesse','Mission super-héros','Vitrine mojito','Iced caramel macchiato','Douanes de l’amour','Projection Algérie','Pièce aux insectes','Maison impossible','Numéro masqué','Grand escape game','Dossier Mehdi','Les 48 heures','Ce qu’on ne dit pas assez','Dernière porte'];
const D={unlocked:false,current:0,done:{},choices:{},storyDone:false};
const BACKUP_KEY='raphy-v8-backup';
let S=(()=>{
  const norm=x=>({...D,...(x&&typeof x==='object'?x:{}),done:(x&&x.done&&typeof x.done==='object'?x.done:{}),choices:(x&&x.choices&&typeof x.choices==='object'?x.choices:{})});
  try{return norm(JSON.parse(localStorage.getItem(KEY)||'{}'))}
  catch{
    try{return norm(JSON.parse(localStorage.getItem(BACKUP_KEY)||'{}'))}
    catch{return {...D,done:{},choices:{}}}
  }
})();
let tt,skipArmed=false;
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const toast=(m,t=2400)=>{clearTimeout(tt);toastBox.textContent=m;toastBox.classList.add('show');tt=setTimeout(()=>toastBox.classList.remove('show'),t)};
const vib=p=>{try{navigator.vibrate?.(p)}catch{}};
const screen=(h,c='')=>{app.innerHTML='<main class="screen '+c+'">'+h+'</main>';scrollTo(0,0)};
const top=i=>'<div class="topbar"><div class="ghost-pill"><span class="brand-dot"></span>&nbsp; dossier R</div><div class="progress-pill">'+(i+1)+'/26</div></div>';
const hero=(k,t,d='')=>'<section class="hero"><div class="eyebrow">'+k+'</div><h2>'+t+'</h2>'+(d?'<p>'+d+'</p>':'')+'</section>';
const skip=i=>'<button class="skip-link" id="skip">Passer cette séquence</button>';
function wireSkip(i){let b=$('#skip');if(!b)return;b.onclick=()=>{if(!skipArmed){skipArmed=true;b.textContent='Tu confirmes vraiment ? 😏';toast(['Déjà ? Je ne juge pas. Enfin si, un peu.','Hamoud note officiellement cette fuite.','Mehdi affirme qu’il l’aurait réussi. Source : Mehdi.'][Math.floor(Math.random()*3)]);setTimeout(()=>{skipArmed=false;if(b?.isConnected)b.textContent='Passer cette séquence'},3000)}else complete(i,true)}}
function complete_legacy(i,sk=false){S.done[i]=true;S.current=Math.min(i+1,25);save();if(sk)toast('Séquence passée. Le dossier fait semblant de ne rien avoir vu.');setTimeout(()=>route(S.current),180)}
function dots(n,i){return '<div class="stepper">'+Array.from({length:n},(_,x)=>'<i class="'+(x<=i?'on':'')+'"></i>').join('')+'</div>'}
function lock(){
  document.body.classList.remove('raphy-paused');
  let value='',tries=0,h=0,dodge=0;
  const render=()=>{
    screen(
      '<div class="v26-lock-wrap">'+
        '<div class="lock-mark v26-lock-mark">🔒</div>'+
        hero('Accès restreint','Une personne seulement.','Si tu n’es pas Raphy, pose ce téléphone avec beaucoup de dignité.')+
        '<div class="card glow v26-lock-card">'+
          '<div class="eyebrow">CODE À 6 CHIFFRES</div>'+
          '<div class="v26-pin-dots" id="v26Dots">'+Array.from({length:6},(_,i)=>'<i data-dot="'+i+'"></i>').join('')+'</div>'+
          '<input id="pin" class="code-input v26-pin-input" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" maxlength="6" placeholder="Tape le code ici" aria-label="Code à six chiffres">'+
          '<div class="v26-keypad" id="v26Keypad">'+
            [1,2,3,4,5,6,7,8,9].map(n=>'<button type="button" data-key="'+n+'">'+n+'</button>').join('')+
            '<button type="button" data-key="clear" class="v26-key-small">C</button>'+
            '<button type="button" data-key="0">0</button>'+
            '<button type="button" data-key="back" class="v26-key-small">⌫</button>'+
          '</div>'+
          '<button class="btn v26-enter" id="go" disabled>Entrer</button>'+
          '<button class="btn secondary" id="hint" style="margin-top:10px">Tu veux un indice ?</button>'+
          '<div id="hz" class="hint-zone"></div>'+
        '</div>'+
      '</div>',
      'centered v26-lock-screen'
    );

    const input=$('#pin'),go=$('#go');
    const paint=()=>{
      value=(input.value||'').replace(/\D/g,'').slice(0,6);
      input.value=value;
      $$('[data-dot]').forEach((d,i)=>d.classList.toggle('filled',i<value.length));
      go.disabled=value.length!==6;
    };
    input.addEventListener('input',paint);
    input.addEventListener('keydown',e=>{
      if(e.key==='Enter'&&value.length===6)attempt();
    });
    input.addEventListener('paste',()=>setTimeout(paint,0));
    input.addEventListener('pointerdown',()=>setTimeout(()=>input.focus(),0));

    $$('[data-key]').forEach(b=>b.onclick=()=>{
      const k=b.dataset.key;
      if(k==='clear')value='';
      else if(k==='back')value=value.slice(0,-1);
      else if(value.length<6)value+=k;
      input.value=value;paint();vib(5);
      if(value.length===6)input.blur()
    });

    function attempt(){
      tries++;
      if(value===CODE){
        go.disabled=true;
        S.unlocked=true;save();vib([30,30,60]);
        toast('Bon. C’était bien toi. J’avais un doute extrêmement injustifié.');
        document.querySelector('.v26-lock-card')?.classList.add('unlocked');
        setTimeout(opening,650)
      }else{
        value='';input.value='';paint();
        document.querySelector('.v26-lock-card')?.animate(
          [{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],
          {duration:280}
        );
        toast(['Non. Mais la confiance était magnifique.','Le code demande un avocat.','Six chiffres ont bien été saisis. C’est déjà quelque chose.','Raphy a choisi la confiance. Le clavier recommande la prudence.'][Math.min(tries-1,3)])
      }
    }
    go.onclick=attempt;

    $('#hint').onclick=()=>{
      h++;
      if(h===1){
        $('#hz').innerHTML='<div class="card soft"><b>Haha…</b><br>Tu peux pas te passer de moi deux minutes ? Tu veux VRAIMENT un indice ?<div class="actions two" style="margin-top:12px"><button class="btn small" id="yes">Oui 🙄</button><button class="btn small secondary runaway" id="no">Non</button></div></div>';
        let no=$('#no'),z=$('#hz');
        const run=()=>{dodge++;no.style.left=Math.random()*Math.max(20,z.clientWidth-no.offsetWidth-20)+'px';no.style.top=(35+Math.random()*25)+'px';if(dodge>2){no.textContent='Très courageuse.';setTimeout(()=>no.remove(),500)}};
        no.onpointerenter=run;no.onclick=run;
        $('#yes').onclick=()=>$('#hz').innerHTML='<div class="card soft"><b>Indice 1 :</b> une date commune. Six chiffres. Non, 123456 n’est pas romantique.</div>'
      }else if(h===2){
        $('#hz').innerHTML='<div class="card soft"><b>Indice 2 :</b> ça commence par <b>06</b>. Là je t’aide beaucoup trop.</div>'
      }else{
        $('#hz').innerHTML='<div class="card soft"><b>Bon :</b> 06 • 03 • 61. Si tu rates encore, le clavier demande une pause.</div>'
      }
    };

    paint();
    setTimeout(()=>{try{input.focus({preventScroll:true})}catch{input.focus()}},350);
  };
  render()
}
function opening_legacy(){screen('<div class="memory-scene" style="min-height:390px;background:linear-gradient(160deg,#362538,#0b0a10)"><div style="position:absolute;inset:0;display:grid;place-items:center"><div style="width:230px;height:150px;border-radius:12px;background:#efe4da;transform:rotate(-4deg);display:grid;place-items:center;color:#3f3040;font:22px Georgia">Pour Raphy</div></div><div class="memory-copy"><h3>J’avais prévu quelque chose de simple.</h3><p>Puis Hamoud a touché un truc.</p></div></div><div class="card"><p class="storyline">À l’intérieur : une clé, une photo retournée et une phrase : <i>« Suis les traces. Certaines sont à toi. D’autres… te connaissent déjà. »</i></p></div><button class="btn" id="o">Ouvrir</button>');$('#o').onclick=()=>story(0)}
const STORY=[
['Le magasin de lunettes','Mehdi entre dans un magasin de lunettes. Puis il te voit : cheveux framboise, sourire beaucoup trop efficace, répartie déjà prête. Il était venu pour des lunettes. Le scénario avait manifestement d’autres projets.',['Le clasher immédiatement.','Faire comme si tu n’avais rien remarqué.','Le regarder deux secondes de trop.']],
['Deux cigarettes','Quelques jours plus tard, vers 18 h, tu passes dans son magasin. Officiellement : deux cigarettes. Officieusement : le prétexte le moins discret de l’année.',['« J’ai vraiment besoin de deux cigarettes. »','« Et si je voulais juste te parler ? »','Repartir avec une dignité très théorique.']],
['Deux Cristaline','Vers 19 h, tu reviens avec deux bouteilles de Cristaline pour le remercier. Deux bouteilles pour deux cigarettes : probablement le meilleur rendement romantique de 2026.',['Investissement prudent.','C’était juste pour remercier. Bien sûr.','Refuser tout commentaire sur la Cristaline.']],
['L’appel et Snapchat','Mehdi appelle ton magasin parce qu’il veut te reparler. Après le travail, vous discutez vraiment. Puis la grande négociation diplomatique : Snapchat.',['Dire oui tout de suite.','Le faire patienter deux secondes.','Prétendre que c’est une décision administrative.']],
['Salon-de-Provence','Restaurant, voyages, États-Unis, anecdotes. Puis la balade et cette balançoire en pneu, vous deux en quinconce à regarder le ciel comme si la soirée avait décidé de ralentir.',['Rester sans parler.','Raconter encore une anecdote.','Dire « c’est incroyable ».']],
['Et évidemment… la police','La police vous demande finalement de partir pendant une intervention liée à quatre jeunes et un faux pistolet. Vous continuez à parler dans la voiture. Première soirée normale : demande refusée.',['En rire.','Faire comme si tout était prévu.','Demander UNE soirée normale.']],
['11/05 — la plage','Plage, nappe, makis poulet, samoussas. Puis le premier baiser, initié par Mehdi — détail qu’il voudrait évidemment faire authentifier.',['Laisser le moment exister.','Le taquiner avant.','Le faire patienter encore une seconde.']]
];
function story(i){if(i>=STORY.length){S.storyDone=true;save();return reveal()}let s=STORY[i];screen(dots(STORY.length,i)+'<div class="memory-scene" style="min-height:380px;background:linear-gradient(150deg,#6b5064,#25202a 52%,#0d0c11)"><div class="memory-copy"><div class="eyebrow">Avant les portes</div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div></div><div class="card"><div class="eyebrow">Raphy fait quoi ?</div><div class="choices" style="margin-top:12px">'+s[2].map((x,j)=>'<button class="choice" data-a="'+j+'">'+x+'</button>').join('')+'</div></div>');$$('[data-a]').forEach(b=>b.onclick=()=>{S.choices['story'+i]=+b.dataset.a;save();toast(['Le dossier note cette version avec un sourcil levé.','Choix enregistré. Hamoud refuse de commenter.','Mehdi prépare déjà un droit de réponse.'][+b.dataset.a]);setTimeout(()=>story(i+1),600)})}
function reveal(){screen('<div class="eyebrow">Dossier ouvert</div><section class="hero"><h1 class="big-title">Sur les traces<br><span class="scriptish">de Raphy</span></h1><p>Pas un album souvenir. Une maison qui garde les détails, même ceux que tu n’avais pas remarqués.</p></section><div class="card"><p class="storyline">La première porte s’ouvre. Derrière : une journée où ton dos décide de déposer officiellement sa démission.</p></div><button class="btn" id="r">Entrer</button>','centered');$('#r').onclick=()=>route(0)}
const QG=[
['Le logiciel indique : « motif de consultation — installation d’une vasque double ». Je confirme que ce n’est pas vous qui fuyez sous l’évier ?',['Non docteur. Enfin j’espère.','Ça dépend, vous avez du Téflon ?','Mehdi a rempli le formulaire, ça explique beaucoup.']],
['Sur une échelle de 1 à 10, votre patience avec les formulaires administratifs est-elle encore couverte par la Sécurité sociale ?',['6, mais ça baisse.','Je demande une ALD pour paperasse chronique.','Elle est décédée à la page 2.']],
['Le dossier mentionne « eau chaude inversée avec eau froide ». Nous parlons TOUJOURS du lavabo ?',['Oui. On garde notre dignité.','Je souhaite appeler mon plombier et mon avocat.','Posez la question à Mehdi, il est très sûr de lui.']],
['Avez-vous été exposée à un homme convaincu qu’une pièce restante signifie que le montage est plus efficace ?',['Malheureusement oui.','Exposition quotidienne, sans protection.','Il appelle ça optimisation.']],
['Le système me demande votre groupe sanguin puis la taille du siphon. J’ignore la deuxième question pour notre dignité commune.',['Excellente décision.','Dommage, j’avais révisé.','Le siphon refuse de témoigner.']],
['Votre contact d’urgence est Mehdi. Maintenez-vous cette décision après le trajet jusqu’à l’hôpital ?',['Oui, malgré tout.','Je voudrais consulter les autres candidats.','Seulement si Hamoud est indisponible.']],
['Quand vous dites « ça va », est-ce médical ou une tradition consistant à faire la forte ?',['Un peu des deux.','Je refuse sans mon doudou cochon.','Secret défense.']]
];
const QGIRL=[
['« J’ai soif. Mais pas l’eau de tout à l’heure. L’autre eau. »',['Mini verre.','Expliquer qu’il n’y a qu’une eau.','Appeler Mehdi.']],
['« J’ai envie de faire pipi. Mais je crois seulement à 62%. »',['On tente.','On attend 38%.','Auditer le calcul.']],
['« Mon pied gauche a chaud. Le droit est normal. »',['Sortir le pied gauche.','Échanger les pieds.','Réunion des deux pieds.']],
['« Mon doudou a peur du noir. Moi non. Lui. »',['Veilleuse.','Dire au doudou de grandir.','Hamoud garde du corps.']],
['« J’ai entendu un bruit. Il faisait exactement… bruit. »',['Vérifier vite.','Demander une imitation.','Dire « c’est la maison ».']],
['« Les poissons, ils ont soif ? »',['Excellente question, demain.','Cours sur l’osmose.','Demander à Mehdi.']],
['« Si je dors très fort, demain arrive plus vite ? »',['Oui, teste tout de suite.','Non.','Seulement pendant la sieste espagnole.']]
];
const QBOY=[
['Si Superman met son pyjama par-dessus son costume, il est doublement habillé ou officiellement au lit ?',['Au lit.','Doublement habillé.','Les deux.']],
['Si je sauve le monde avant le dîner, je dois manger les légumes ?',['Oui.','Non.','Seulement les carottes héroïques.']],
['Pourquoi les méchants ont une base secrète mais maman sait toujours où elle est ?',['Maman sait tout.','Google Maps.','Secret défense.']],
['Un super-héros peut avoir un doudou s’il est classé secret défense ?',['Évidemment.','Non.','Seulement avec une cape.']],
['Si Hamoud vole mon masque, il devient mon identité secrète ?',['Oui, malheureusement.','Non.','Seulement la nuit.']],
['Si je cours très vite autour de la maison, demain arrive plus tôt ?',['Non.','Oui.','Demande à la Terre.']],
['Qui gagne entre un dinosaure invisible et un robot qui sait qu’il est invisible ?',['Le dinosaure.','Le robot.','Personne ne peut répondre.']]
];
function quiz(i,title,sub,qs,emo){let q=0;screen(top(i)+hero('Trace '+String(i+1).padStart(2,'0'),title,sub)+'<div class="card" id="qc"></div>'+skip(i));wireSkip(i);const c=$('#qc');const draw=()=>{if(q>=qs.length){c.innerHTML='<div style="font-size:70px;text-align:center">'+emo+'</div><h3>Mission terminée.</h3><button class="btn" id="qd">Continuer</button>';$('#qd').onclick=()=>complete(i);return}let z=qs[q];c.innerHTML=dots(qs.length,q)+'<div class="dialogue" style="margin-top:16px"><div class="avatar">'+emo+'</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:14px">'+z[1].map((x,j)=>'<button class="choice" data-q="'+j+'">'+x+'</button>').join('')+'</div>';$$('[data-q]',c).forEach(b=>b.onclick=()=>{toast(['Réponse enregistrée. Le dossier hoche la tête.','Choix audacieux. Aucun remboursement prévu.','Hamoud estime que c’est défendable.'][+b.dataset.q]);q++;setTimeout(draw,430)})};draw()}
function simpleOrder(i,title,desc,order,icons,finish){let p=0;screen(top(i)+hero('Trace '+String(i+1).padStart(2,'0'),title,desc)+'<div class="game-stage" style="display:grid;place-items:center"><div id="build" style="font-size:86px">🧰</div></div><div class="item-grid">'+icons.map((x,j)=>'<button class="item" data-o="'+j+'">'+x+'</button>').join('')+'</div><p class="caption" id="ol">Étape 1/'+order.length+'</p>'+skip(i));wireSkip(i);$$('[data-o]').forEach(b=>b.onclick=()=>{let j=+b.dataset.o;if(j===order[p]){b.disabled=true;b.classList.add('selected');p++;$('#ol').textContent='Étape '+Math.min(p+1,order.length)+'/'+order.length;toast('Ça rentre. Mehdi dit évidemment qu’il savait.');if(p===order.length){toast(finish);setTimeout(()=>complete(i),700)}}else toast('Non. Cette pièce vient de demander à retourner dans sa boîte.')})}
function departure_legacy(){let v=50,x=0,press=false;screen(top(0)+hero('Trace 01','Le départ','Aide Raphy à avancer sans la porter comme un colis fragile.')+'<div class="game-stage" id="walk"><div style="position:absolute;left:10%;right:10%;bottom:55px;height:8px;background:#403747;border-radius:20px"><div id="w" style="position:absolute;left:0;top:-38px;font-size:38px">🚶‍♀️</div></div><div style="position:absolute;right:20px;top:20px;font-size:48px">🐈</div></div><div class="card"><div class="meter"><i id="m" style="width:50%"></i></div><p id="l" class="caption">Maintiens l’écran : plus de soutien. Relâche : moins.</p></div>'+skip(0));wireSkip(0);let st=$('#walk'),m=$('#m'),w=$('#w');st.onpointerdown=e=>{e.preventDefault();press=true};st.onpointerup=()=>press=false;st.onpointercancel=()=>press=false;let last=performance.now();const loop=t=>{if(!st.isConnected)return;let dt=Math.min(40,t-last)/16;last=t;v+=press?1.2*dt:-.7*dt;v=Math.max(5,Math.min(95,v));m.style.width=v+'%';if(v>40&&v<68){x+=.14*dt;w.style.left=Math.min(88,x)+'%'}if(x>=88){toast('Appartement quitté. Hamoud dépose une réclamation officielle.');setTimeout(()=>complete(0),600);return}requestAnimationFrame(loop)};requestAnimationFrame(loop)}
function mri_legacy(){let p=0,still=100;screen(top(1)+hero('Trace 02','IRM : ne bouge pas','Le nez qui coule a choisi son moment.')+'<div class="game-stage" style="display:grid;place-items:center;background:linear-gradient(#dfe6eb,#606a73 55%,#15181b)"><div style="font-size:82px">😐</div><button class="btn small secondary" id="itch" style="position:absolute;left:14px;bottom:14px">Ça gratte</button><button class="btn small secondary" id="nose" style="position:absolute;right:14px;bottom:14px">Nez 🤧</button></div><div class="card"><div class="meter cold"><i id="scan"></i></div><p id="ml" class="caption">Ne touche à rien. Oui, les boutons sont là exprès.</p></div>'+skip(1));wireSkip(1);$('#itch').onclick=()=>{still-=18;toast('La machine vient de créer un Picasso médical.')};$('#nose').onclick=()=>{still-=12;toast('Dignité : en cours de négociation.')};let it=setInterval(()=>{if(!$('#scan'))return clearInterval(it);p+=2;$('#scan').style.width=p+'%';if(p===44)$('#ml').textContent='Le scanner reconstruit un tatouage : « New… Pork ? »';if(p>=100){clearInterval(it);toast(still>80?'Immobile. Impressionnant.':'Scan terminé. Les tatouages demandent une seconde opinion graphique.');setTimeout(()=>complete(1),600)}},150)}
function timing(i,title){let q=0,ok=false,score=0;let names=['Flamant administratif','Chaise invisible de la CAF','Pont très optimiste','Chat qui regrette ses choix','Respiration « je vais bien »'];screen(top(i)+hero('Trace 03',title,'Quand le bouton devient doré, tape.')+'<div class="game-stage" style="display:grid;place-items:center"><div id="pose" style="font-size:90px">🦩</div></div><div class="card"><h3 id="tn">'+names[0]+'</h3><button class="btn" id="tap">Synchroniser</button><p class="caption">Score : <b id="ts">0</b></p></div>'+skip(i));wireSkip(i);const next=()=>{if(q>=5){toast('Kiné validée. Hamoud demande une médaille.');return setTimeout(()=>complete(i),600)}ok=false;$('#tn').textContent=names[q];$('#tap').style.filter='';setTimeout(()=>{ok=true;$('#tap').style.filter='brightness(1.4)';setTimeout(()=>{ok=false;$('#tap').style.filter=''},450)},650+Math.random()*700)};$('#tap').onclick=()=>{if(ok){score++;toast('Timing propre. Le kiné est presque contrarié.')}else toast('Techniquement, c’était un mouvement.');$('#ts').textContent=score;q++;next()};next()}
function gyno_legacy(){quiz(4,'Consultation gynéco','Non graphique. Le logiciel, lui, est gravement atteint.',QG,'👩‍⚕️')}
function canvasGame(i,title,clean=false){screen(top(i)+hero('Trace '+String(i+1).padStart(2,'0'),title,clean?'Frotte jusqu’à 100%. À 99%, évidemment, une micro-tache.':'Peins au doigt. Hamoud a promis de ne pas marcher dedans.')+'<div class="canvas-wrap"><canvas id="cv" class="paint-canvas" width="640" height="500"></canvas></div><div class="meter"><i id="bar"></i></div>'+skip(i));wireSkip(i);let c=$('#cv'),x=c.getContext('2d'),down=false,moves=0,done=false;x.fillStyle=clean?'#a9c0cb':'#d6cec3';x.fillRect(0,0,640,500);for(let k=0;k<100;k++){x.fillStyle=clean?'#6e5b4d':'#b4a59b';x.beginPath();x.arc(Math.random()*640,Math.random()*500,6+Math.random()*18,0,7);x.fill()}if(clean)x.globalCompositeOperation='destination-out';const draw=e=>{if(done)return;let r=c.getBoundingClientRect(),px=(e.clientX-r.left)*640/r.width,py=(e.clientY-r.top)*500/r.height;x.beginPath();x.arc(px,py,30,0,7);if(!clean)x.fillStyle='#92706f';x.fill();moves++;let pc=Math.min(100,moves/2.2);$('#bar').style.width=pc+'%';if(pc>=100){done=true;if(!clean){x.font='45px serif';x.fillText('🐾',360,250);toast('Hamoud a ajouté sa signature. Art contemporain.')}else toast('100%. Silence. Respect.');setTimeout(()=>complete(i),800)}};c.onpointerdown=e=>{down=true;draw(e)};c.onpointermove=e=>down&&draw(e);c.onpointerup=()=>down=false;c.onpointercancel=()=>down=false}
function school_legacy(){let f=0;screen(top(11)+hero('Trace 12','Sortie d’école','Six affaires à récupérer. Deux conversations fictives à éviter.')+'<div class="game-stage" id="sch" style="background:linear-gradient(#c6d9e8,#91a782)">'+['🎒','🧥','🥤','🧸','🎨','🥿'].map((x,i)=>'<button class="item" data-s style="position:absolute;left:'+(12+(i%3)*29)+'%;top:'+(60+Math.floor(i/3)*120)+'px;width:78px;background:#eee;color:#222">'+x+'</button>').join('')+'<button class="item" id="mom" style="position:absolute;right:12px;bottom:12px;width:110px;background:#f1d7dc;color:#222">👩 « juste 2 min… »</button></div>'+skip(11));wireSkip(11);$$('[data-s]').forEach(b=>b.onclick=()=>{b.disabled=true;b.style.opacity=.2;f++;if(f===6){toast('Six affaires. Zéro réunion de parents improvisée.');setTimeout(()=>complete(11),650)}});$('#mom').onclick=()=>toast('Piège. Tu viens de perdre quatre minutes fictives de ta vie.')}
function mojito(){simpleOrder(14,'Vitrine mojito','Petit niveau esthétique. Une seule vraie blague ici.',[0,1,2,3,4],['🧊 Glace','🍋‍🟩 Citron','🌿 Menthe','🥤 Bulles','🍯 Sucre'],'Cette fois, il y a de la menthe. On progresse.')}
function coffee_legacy(){simpleOrder(15,'Iced caramel macchiato','Sa boisson préférée. L’ordre compte.',[0,1,2,3,4],['🍦 Vanille','🥛 Lait','🧊 Glace','☕ Espresso','🍯 Caramel'],'Parfait. Un client fictif voudrait la même chose sans café, sans lait et très café.')}
function customs(){let n=0;screen(top(16)+hero('Trace 17','Douanes de l’amour','Italie, Espagne, Algérie : les pays ne sont pas la blague. Mehdi, souvent, oui.')+'<div class="item-grid">'+['Passeport ❤️','Pâtes non cassées 🇮🇹','Paella symbolique 🇪🇸','Brochure Mehdi 🇩🇿','Hamoud 🐈','Doudou cochon 🐷'].map(x=>'<button class="item big" data-p>'+x+'</button>').join('')+'</div><button class="btn" id="cc">Contrôle</button>'+skip(16));wireSkip(16);$$('[data-p]').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');n+=$(b).classList.contains('selected')?1:-1});$('#cc').onclick=()=>{if(n<4)return toast('Il manque des choses. Le douanier fixe Hamoud avec inquiétude.');toast('Voyage al dente : pas trop long, pas trop cuit. Le douanier regrette sa blague.');setTimeout(()=>complete(16),700)}}
function algeria(){screen(top(17)+hero('Trace 18','Mehdi Immobilier™','Offre totalement objective écrite par le principal bénéficiaire.')+'<div class="memory-scene" style="min-height:400px;background:linear-gradient(#e9a36e,#b96770 42%,#32465c)"><div class="memory-copy"><h3>Deux pièces · cinq enfants · liberté conceptuelle</h3><p>« Terrasse exceptionnelle. Raphy ne sort pas parce qu’elle est tellement bien. Moi, très détendu. »</p></div></div><div class="choices"><button class="choice" data-al="0">Refuser et demander l’adresse de l’agence.</button><button class="choice" data-al="1">Accepter si Mehdi gère les cinq enfants pendant 18 ans.</button><button class="choice" data-al="2">Demander une sixième personnalité pour tenir le planning.</button></div>'+skip(17));wireSkip(17);$$('[data-al]').forEach(b=>b.onclick=()=>{S.choices.algeria=+b.dataset.al;save();toast(['Mehdi retire discrètement la brochure.','L’offre vient de perdre toute rentabilité.','Négociation extrêmement dangereuse.'][+b.dataset.al]);setTimeout(()=>complete(17),700)})}
function horror_legacy(){screen(top(18)+hero('Trace 19','La pièce qui bourdonne','Lampe torche. Et quelque chose qui frôle l’écran.')+'<div class="game-stage horror" id="hs" style="min-height:520px;background:#030304"><div id="moths"></div><div class="flashlight" id="fl"></div><button class="btn small secondary" id="lamp" style="position:absolute;right:12px;top:12px;z-index:3">Autre lampe</button><div style="position:absolute;left:18px;bottom:18px;font-size:48px">🐈</div></div>'+skip(18),'horror');wireSkip(18);for(let i=0;i<10;i++){let m=document.createElement('div');m.className='moth';m.style.setProperty('--dur',(3+Math.random()*4)+'s');m.style.left=Math.random()*90+'%';m.style.top=Math.random()*70+'%';$('#moths').append(m)}$('#hs').onpointermove=e=>{let r=$('#hs').getBoundingClientRect();$('#fl').style.setProperty('--x',(e.clientX-r.left)/r.width*100+'%');$('#fl').style.setProperty('--y',(e.clientY-r.top)/r.height*100+'%')};$('#lamp').onclick=()=>{$('#moths').style.transform='translate(25%,-15%)';toast('Bonne idée. Presque toutes les ailes changent de cible.')};setTimeout(()=>{if($('#hs')){vib([20,30,20]);toast('Bruit derrière toi. Hamoud est pourtant juste devant.')}},4500);setTimeout(()=>$('#hs')&&complete(18),10500)}
function house(){let f=0;screen(top(19)+hero('Trace 20','La maison impossible','Tu connais cette pièce. C’est précisément le problème.')+'<div class="game-stage" style="min-height:470px;background:linear-gradient(#493b3a,#171418)"><button class="anomaly" data-an style="left:10%;top:12%;width:90px;height:110px;background:#362c31;color:white">🖼️🐈</button><button class="anomaly" data-an style="right:12%;top:16%;width:80px;height:90px;background:#6d5c51;transform:rotate(180deg)">🖼️</button><button class="anomaly" data-an style="left:34%;bottom:14%;font-size:70px">🪑</button><button class="anomaly" data-an style="right:7%;bottom:8%;width:95px;height:220px;background:#151217;color:white">🚪</button></div>'+skip(19));wireSkip(19);$$('[data-an]').forEach(b=>b.onclick=()=>{if(b.classList.contains('found'))return;b.classList.add('found');f++;toast(f===1?'Le portrait officiel de Hamoud est beaucoup trop sérieux.':'Anomalie trouvée. La pièce prétend que tout va bien.');if(f===4)setTimeout(()=>complete(19),650)})}
function unknown_legacy(){let st=0;screen(top(20)+hero('Trace 21','Numéro masqué','Il connaît des réponses données plus tôt.')+'<div class="phone"><div class="phone-top"><span>19:47</span><span>Masqué</span></div><div id="msgs"><div class="msg in">Tu avances vite.</div><div class="msg in">Premier vrai rendez-vous surprise : jour + mois ?</div></div><div id="pa" style="margin-top:12px"><div class="input-row"><input id="d" class="code-input" maxlength="4" inputmode="numeric" placeholder="JJMM"><button class="btn" id="send">OK</button></div></div></div>'+skip(20));wireSkip(20);$('#send').onclick=()=>{if($('#d').value!=='1105')return toast('Non. Le sushi refuse de confirmer cette chronologie.');$('#msgs').innerHTML+='<div class="msg out">1105</div><div class="msg in">Bien. La maison ne vole rien. Elle reconstruit ce que tu changes partout où tu passes.</div>';$('#pa').innerHTML='<button class="btn" id="hang">Raccrocher</button>';$('#hang').onclick=()=>complete(20)}}
function escapeGame_legacy(){let p=0;const z=[['Sur l’IRM, quel symbole revient ?',['○','△','♥','□'],2],['Le lavabo mentait sur…',['La taille','Chaud/froid','La hauteur','Le prix'],1],['Premier vrai rendez-vous surprise ?',['2504','0205','1105','1905'],2],['Anomalie la plus absurde de la maison ?',['Chaise','Porte','Portrait de Hamoud','Lumière'],2],['Ce que tu touches laisse une…',['trace','preuve','facture','tache'],0]];screen(top(21)+hero('Trace 22','Le grand escape game','Les détails d’avant reviennent enfin.')+'<div class="card" id="ec"></div>'+skip(21));wireSkip(21);const draw=()=>{if(p>=z.length){$('#ec').innerHTML='<div class="eyebrow">Dernier verrou</div><h2>♥ + ↔ + 1105 + 🐈 + TRACE</h2><p class="storyline">Ce n’est pas un code. C’est une phrase déguisée.</p><button class="btn" id="ed">Ouvrir</button>';$('#ed').onclick=()=>complete(21);return}let q=z[p];$('#ec').innerHTML=dots(z.length,p)+'<h3>'+q[0]+'</h3><div class="choices">'+q[1].map((x,j)=>'<button class="choice" data-e="'+j+'">'+x+'</button>').join('')+'</div><div id="eh"></div>';$$('[data-e]').forEach(b=>b.onclick=()=>{if(+b.dataset.e===q[2]){toast('Oui. Et maintenant tu réalises que ce détail comptait.');p++;setTimeout(draw,450)}else toast('Non. Le verrou fait ce petit silence gênant.')});setTimeout(()=>{if($('#eh'))$('#eh').innerHTML='<button class="btn secondary small" id="hintE">Tu veux un indice ?</button>';if($('#hintE'))$('#hintE').onclick=()=>{$('#hintE').textContent='Vraiment ? 😏';setTimeout(()=>$('#hintE')&&($('#hintE').outerHTML='<div class="card soft">Indice : repense aux scènes précédentes, pas à un code sorti de nulle part.</div>'),550)}},20000)};draw()}
function trial(){let p=0,score=0;const c=[['Le mérite de la cave','Raphy a tout rangé. Mehdi : « on a bien géré ».','Je supervisais moralement.'],['Le trajet hôpital','Plusieurs dos-d’âne ont été traités comme facultatifs.','La route était agressive.'],['Le lavabo','Chaud et froid inversés avec une confiance remarquable.','Le manuel manquait d’ambition.'],['Le plan Algérie premium','Deux pièces, cinq enfants, Mehdi très détendu.','La brochure était en test.'],['Les cinq minutes','Plusieurs cinq minutes ont duré 12 à 47 minutes.','Le temps est relatif.'],['Hamoud chef de projet','Le chat a eu accès aux outils et aux décisions.','Il avait l’air qualifié.']];screen(top(22)+hero('Trace 23','Le dossier Mehdi','Six dossiers. Une défense qui aurait dû rester silencieuse.')+'<div class="card" id="tc"></div>'+skip(22));wireSkip(22);const draw=()=>{if(p>=c.length){$('#tc').innerHTML='<h2>Verdict : '+(score<4?'acquitté de façon suspecte':score<8?'coupable mais encore fréquentable':'très coupable, qu’il arrête de parler')+'.</h2><p>Hamoud fait appel. Personne ne lui a demandé.</p><button class="btn" id="td">Classer</button>';$('#td').onclick=()=>complete(22);return}let x=c[p];$('#tc').innerHTML=dots(c.length,p)+'<h2>'+x[0]+'</h2><p>'+x[1]+'</p><div class="card soft"><b>Défense de Mehdi :</b><br>'+x[2]+'</div><div class="choices" style="margin-top:14px"><button class="choice" data-v="0">Acquitté 😇</button><button class="choice" data-v="1">Coupable 😌</button><button class="choice" data-v="2">Très coupable, qu’il arrête de parler 🔨</button></div>';$$('[data-v]').forEach(b=>b.onclick=()=>{score+=+b.dataset.v;toast(+b.dataset.v===0?'Mehdi sourit beaucoup trop vite.':+b.dataset.v===1?'Il murmure « sorti de son contexte ».':'Le marteau a parlé. Mehdi aussi, mais personne n’écoute.');p++;setTimeout(draw,430)})};draw()}
function calm(){screen(top(23)+hero('Trace 24','Les 48 heures','Pas d’énigme. Pas de score.')+'<div class="memory-scene" style="min-height:430px;background:linear-gradient(145deg,#473b44,#1d1920 56%,#0d0c11)"><div class="memory-copy"><h3>Hôpital, repos, maison.</h3><p>Et <i>Qu’est-ce qu’on a fait au Bon Dieu ?</i> Toi morte de rire. Un souvenir banal, donc précieux.</p></div></div><button class="btn" id="cd">Continuer</button>');$('#cd').onclick=()=>complete(23)}
function unsaid(){let p=0;const a=[['Ta force','Je vois à quel point tu continues, même quand ce serait plus simple de dire que c’est trop.'],['Ton courage','Pas le spectaculaire. Celui du quotidien.'],['Ta place','Tu es importante dans ma vie. Comme une réalité, pas comme une phrase de fin.'],['Toi','Et oui : je te trouve magnifique. Je ne te le dis probablement pas assez.'],['Nous','Au milieu de tout le reste… je t’aime.']];screen(top(24)+hero('Trace 25','La pièce où on ne dit pas assez les choses','Ici, pas de score.')+'<div class="card" id="uc"></div>');const draw=()=>{if(p>=a.length){$('#uc').innerHTML='<div class="heart"></div><h2 style="text-align:center">Il reste une porte.</h2><button class="btn" id="ud">L’ouvrir</button>';$('#ud').onclick=()=>complete(24);return}$('#uc').innerHTML='<div class="eyebrow">'+a[p][0]+'</div><p class="storyline">'+a[p][1]+'</p><button class="btn secondary" id="un">Continuer</button>';$('#un').onclick=()=>{p++;draw()}};draw()}
function final_legacy(){S.done[25]=true;save();screen(hero('Dernière porte','Le cœur n’était pas à trouver.','Il était en train de se construire depuis la première porte.')+'<div class="heart"></div><div class="card glow"><p class="storyline">La maison n’avait rien volé. Elle a suivi ce que tu laisses derrière toi : dans les lieux, les journées, les gens, les souvenirs. Des traces.</p><p class="storyline">La suite n’est pas écrite ici. Tant mieux.</p><p class="storyline" style="font-size:30px;text-align:center"><b>Je t’aime ❤️</b></p></div><div class="actions"><button class="btn" id="cr">Générique</button><button class="btn secondary" id="rp">Rejouer</button></div>','centered');$('#cr').onclick=credits;$('#rp').onclick=replay}
function credits_legacy(){screen(hero('Générique','Une production parfaitement raisonnable')+'<div class="card credits"><p><b>Raphy</b> — héroïne, spécialiste mondiale du « ça va ».</p><p><b>Mehdi</b> — scénario, confiance disproportionnée, récupération de mérite.</p><p><b>Hamoud</b> — sabotage, direction artistique, expertise non demandée.</p><p><b>La Cristaline</b> — meilleur retour sur investissement romantique de 2026.</p><p><b>Prochain chapitre</b> — vide pour l’instant.</p></div><button class="btn" id="rp">Rejouer</button><button class="btn secondary" id="dev">Zone Mehdi</button>');$('#rp').onclick=replay;$('#dev').onclick=dev}
function replay(){screen(hero('Après le générique','Rejouer une trace')+'<div class="item-grid">'+NAMES.map((x,i)=>'<button class="item big" data-r="'+i+'" '+(S.done[i]?'':'disabled')+'><b>'+String(i+1).padStart(2,'0')+'</b><br>'+x+'</button>').join('')+'</div><div class="card soft"><div class="eyebrow">À venir</div><h3>Chapitre +1</h3><p class="caption">Vide pour l’instant. Volontairement.</p></div>');$$('[data-r]').forEach(b=>b.onclick=()=>route(+b.dataset.r))}
function dev_legacy(){modal.hidden=false;modal.innerHTML='<div class="modal-card"><h2>Zone Mehdi</h2><input id="dc" class="code-input" maxlength="6" inputmode="numeric"><div class="actions" style="margin-top:12px"><button class="btn" id="dg">Entrer</button><button class="btn secondary" id="dx">Fermer</button></div></div>';$('#dx').onclick=()=>modal.hidden=true;$('#dg').onclick=()=>{if($('#dc').value!==CODE)return toast('Accès refusé. Hamoud a changé quelque chose.');modal.innerHTML='<div class="modal-card"><h2>Outils test</h2><button class="btn secondary" id="all">Tout débloquer</button><button class="btn danger" id="reset" style="margin-top:10px">Effacer progression</button></div>';$('#all').onclick=()=>{for(let i=0;i<26;i++)S.done[i]=true;save();toast('Tout débloqué. Dopage de QA.');modal.hidden=true};$('#reset').onclick=()=>{localStorage.removeItem(KEY);location.reload()}}}
function route(i){S.current=i;save();skipArmed=false;[
departure,mri,()=>timing(2,'Kiné : protocole très officiel'),()=>simpleOrder(3,'Bloc opératoire fictif','Puzzle, pas conseil médical.',[0,1,2,3],['🟦 L4','🟪 L5','🟡 Disque','❤️ Courage'],'Dos fictivement réparé. Hamoud conserve l’outil.'),gyno,
()=>simpleOrder(5,'La cave','Raphy range. Mehdi récoltera les mérites.',[0,1,2,3],['📦 Câbles','🎄 Déco','🪛 Objet inconnu','🐈 Hamoud'],'Cave rangée. Mehdi : « on a bien géré ».'),
()=>simpleOrder(6,'Architecte','Le client change d’avis toutes les 43 secondes.',[0,2,1,3],['🏠 Ouvrir','🧱 Refermer','☀️ Lumière','🗄️ Rangement'],'Le client adore. Il veut tout changer demain.'),
()=>canvasGame(7,'Peinture'),()=>simpleOrder(8,'Le lavabo','Une pièce en trop ? Mehdi dit que le fabricant exagère.',[0,1,2,3,5,4],['🛁 Vasque','🚰 Robinet','⭕ Joint','〰️ Siphon','🔴 Chaud','🔵 Froid'],'Montage réussi. Chaud et froid ont choisi la rébellion.'),
()=>simpleOrder(9,'Batterie','Puzzle abstrait, pas tutoriel mécanique.',[0,2,1,3],['A','B','C','D'],'Système restauré. Pile de clé faible. Évidemment.'),
()=>canvasGame(10,'Nettoyage voiture',true),school,()=>quiz(12,'Opération dodo','Sept excuses. Une seule mission : sortir vivante de la chambre.',QGIRL,'👧🏻❄️'),()=>quiz(13,'Mission super-héros','Sept questions auxquelles aucun adulte n’était préparé.',QBOY,'🦸🏻‍♂️'),mojito,coffee,customs,algeria,horror,house,unknown,escapeGame,trial,calm,unsaid,final][i]()}

/* ===== app-v2a.js ===== */
'use strict';
const clampValue=(n,a,b)=>Math.max(a,Math.min(b,n));

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
    support+=holding?1.15*dt:-.72*dt;support=clampValue(support,4,96);sb.style.width=support+'%';
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

/* ===== app-v2b.js ===== */
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

/* ===== app-v2c.js ===== */
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

/* ===== app-v2d.js ===== */
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
    school,bedtimeGame,heroKidGame,mojito,coffee,customs,algeria,horror,house,unknown,escapeGame,trial,calm,unsaid,final
  ][i]()
};

/* ===== app-v2e.js ===== */
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

function operationGame_legacy(){
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

function paintingGame_legacy(){
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

/* ===== app-v2f.js ===== */
'use strict';

const CINEMA_STORY=[
  {
    tag:'25 AVRIL 2026 · OPTIQUE',
    title:'Le jour où un magasin de lunettes devient un problème',
    icon:'👓',
    text:'Mehdi entre pour une raison parfaitement normale. Puis il te voit derrière le comptoir : cheveux framboise, sourire qui accroche immédiatement son attention, répartie déjà chargée. Il remarque aussi ce tatouage New York sur ta cuisse. À partir de là, les lunettes deviennent franchement secondaires.',
    lines:['« Tu taquines toujours les clients comme ça ? »','Un regard. Une réponse. Puis encore une.','Il ressort avec beaucoup plus de questions qu’en entrant.'],
    choices:['Le clasher proprement.','Faire semblant de ne pas voir qu’il te regarde.','Le laisser croire deux secondes qu’il a le dernier mot.']
  },
  {
    tag:'30 AVRIL · 18:00',
    title:'Deux cigarettes. Prétexte officiellement douteux.',
    icon:'🚬',
    text:'Quelques jours passent. Puis tu débarques dans son magasin pour demander deux cigarettes. Deux. Pas un paquet. Pas trois. Exactement la quantité idéale pour prétendre que tout ceci est parfaitement innocent.',
    lines:['Mehdi : extrêmement calme en apparence.','Le dossier : beaucoup moins convaincu.','La conversation reprend comme si elle avait seulement été mise en pause.'],
    choices:['« J’avais vraiment besoin de deux cigarettes. »','Admettre que le prétexte avait du talent.','Ne rien avouer. Jamais.']
  },
  {
    tag:'30 AVRIL · 19:00',
    title:'Le meilleur investissement Cristaline de l’histoire',
    icon:'💧',
    text:'Une heure plus tard, tu reviens avec deux bouteilles de Cristaline pour le remercier. Deux cigarettes contre deux bouteilles d’eau. Sur le papier : transaction absurde. Dans l’histoire : rendement émotionnel anormal.',
    lines:['Personne ne demande un reçu.','Mehdi retient surtout que tu es revenue.','La Cristaline obtient un rôle secondaire majeur.'],
    choices:['Simple politesse. Rien à signaler.','Opération de flirt très discrète.','Interdire définitivement toute analyse de la Cristaline.']
  },
  {
    tag:'2 MAI · APRÈS LE TRAVAIL',
    title:'L’appel qui n’avait rien d’administratif',
    icon:'📞',
    text:'Mehdi appelle ton magasin parce qu’il veut te parler. Après le travail, vous prenez enfin le temps. Puis arrive la grande demande diplomatique : Snapchat.',
    lines:['Il essaie probablement d’avoir l’air détendu.','Tu es contente.','La conversation change de canal, pas de rythme.'],
    choices:['Dire oui immédiatement.','Le faire patienter juste assez.','Traiter Snapchat comme un dossier à valider en commission.']
  },
  {
    tag:'4 MAI · SALON-DE-PROVENCE',
    title:'Restaurant, anecdotes et ciel nocturne',
    icon:'🌙',
    text:'Restaurant à Salon-de-Provence. Tu racontes tes voyages, les États-Unis, tes anecdotes — clavicule, cheville, pizza avec des SDF… Puis la ville devient plus calme. Vous finissez près d’une balançoire en pneu, en quinconce, à regarder le ciel.',
    lines:['Pas besoin d’occuper chaque silence.','La soirée prend son temps.','Pour une fois, personne ne demande où tout ça va.'],
    choices:['Rester là sans parler.','Relancer une anecdote improbable.','Dire « c’est incroyable » juste pour contaminer Mehdi.']
  },
  {
    tag:'PLUS TARD CE SOIR-LÀ',
    title:'Évidemment, la police',
    icon:'🚓',
    text:'Parce qu’une soirée normale aurait été trop simple, la police vous demande finalement de partir pendant une intervention sans rapport avec vous, liée à quatre jeunes et un faux pistolet. Vous reprenez la conversation dans la voiture.',
    lines:['Décor changé. Conversation intacte.','Première soirée normale : candidature refusée.','Mehdi prétend que ce rebondissement était prévu.'],
    choices:['En rire immédiatement.','Faire comme si tout était prévu.','Demander officiellement UNE soirée sans scénario secondaire.']
  },
  {
    tag:'11 MAI · LA PLAGE',
    title:'Le vrai premier rendez-vous surprise',
    icon:'🌊',
    text:'Nappe, plage, makis poulet, samoussas. Mehdi a préparé la surprise avec un niveau d’organisation franchement suspect. Puis il t’embrasse. Premier baiser. Celui-là, il demandera probablement qu’on le grave dans les archives.',
    lines:['La mer continue comme si de rien n’était.','Le dossier retient surtout la date : 1105.','À partir de là, la plage devient un lieu à vous.'],
    choices:['Laisser le moment exister.','Le taquiner une dernière fois avant.','Lui faire croire qu’il a attendu beaucoup trop longtemps.']
  },
  {
    tag:'LES SOIRS D’APRÈS',
    title:'Plage, parking, supermarché… et pourtant',
    icon:'🛒',
    text:'D’autres plages. Des fins de journée après le travail. Parfois simplement devant un supermarché, dans une voiture, à parler longtemps. Rien de spectaculaire — et c’est justement pour ça que ces moments restent.',
    lines:['Pas besoin de décor premium.','Deux personnes suffisent parfois à transformer un parking.','Hamoud n’était probablement pas consulté.'],
    choices:['Parler jusqu’à perdre l’heure.','Mettre de la musique et rester là.','Décréter que le parking est désormais un lieu romantique officiel.']
  },
  {
    tag:'JUIN · SOIRÉE JACUZZI',
    title:'Des LED et personne d’autre',
    icon:'✨',
    text:'Une soirée jacuzzi, juste vous deux, avec les LED et cette impression d’avoir momentanément mis le reste du monde sur silencieux.',
    lines:['Aucun mini-jeu ici.','Aucune énigme.','Juste une soirée qui mérite sa place dans la chronologie.'],
    choices:['Profiter du calme.','Faire une mauvaise blague.','Dire que les LED sont beaucoup trop sérieuses.']
  },
  {
    tag:'JUIN · MARSEILLE',
    title:'La surprise change de côté',
    icon:'🚂',
    text:'Cette fois, c’est toi qui surprends Mehdi. Il découvre Marseille en arrivant : petit train touristique, montée, ville qui s’ouvre sous vous, puis Notre-Dame-de-la-Garde — la Bonne Mère.',
    lines:['Il ne connaît pas la destination avant d’y être.','Le petit train obtient sa minute de gloire.','En haut, la photo de couple devient un vrai point de repère.'],
    choices:['Le laisser deviner le plus longtemps possible.','Tout révéler à l’arrivée.','Prétendre que le petit train était le but principal.']
  },
  {
    tag:'PUIS LE QUOTIDIEN',
    title:'Les souvenirs qui n’ont pas besoin d’être “grands”',
    icon:'🏠',
    text:'L’hôpital, le dos, les travaux, la cave, la voiture, le lavabo, les soirées ordinaires, « dinde laquée », les fous rires. Ce jeu ne cherche pas seulement les grands moments. Il cherche tout ce qui finit par devenir votre langage.',
    lines:['C’est là que commencent les traces.','Pas dans une collection. Dans les détails.','Et certains détails vont revenir plus tard.'],
    choices:['Continuer.','Continuer, mais avec méfiance.','Continuer en accusant déjà Hamoud.']
  }
];

function opening(){
  screen(
    '<div class="cinema-letter"><div class="letter-glow"></div><div class="letter-paper"><span>POUR RAPHY</span><small>ouvrir seulement si tu assumes les conséquences</small></div><div class="cinema-cat">🐈</div></div>'+
    '<div class="card glow"><p class="storyline">J’avais prévu quelque chose de simple.</p><p class="storyline">Puis Hamoud a touché un truc.</p><div class="mystery-line">« Suis les traces. Certaines sont à toi. D’autres… se souviennent de toi. »</div></div>'+
    '<button class="btn" id="openCinema">Ouvrir le dossier</button>',
    'cinema-screen'
  );
  $('#openCinema').onclick=()=>cinematicStory(0)
}

function cinematicStory(i){
  if(i>=CINEMA_STORY.length){
    S.storyDone=true;
    save();
    return cinematicReveal()
  }
  const s=CINEMA_STORY[i];
  screen(
    dots(CINEMA_STORY.length,i)+
    '<div class="cinema-memory">'+
      '<div class="cinema-vignette"></div>'+
      '<div class="cinema-icon">'+s.icon+'</div>'+
      '<div class="cinema-date">'+s.tag+'</div>'+
      '<div class="cinema-copy"><h2>'+s.title+'</h2><p>'+s.text+'</p></div>'+
    '</div>'+
    '<div class="memory-lines">'+s.lines.map((x,j)=>'<div class="memory-line" style="animation-delay:'+(j*.16)+'s">'+x+'</div>').join('')+'</div>'+
    '<div class="card"><div class="eyebrow">Raphy répond</div><div class="choices" style="margin-top:12px">'+s.choices.map((x,j)=>'<button class="choice" data-cstory="'+j+'">'+x+'</button>').join('')+'</div></div>'
  );
  $$('[data-cstory]').forEach(b=>b.onclick=()=>{
    const j=+b.dataset.cstory;
    S.choices['cinema_'+i]=j;
    if(i===0)S.choices.story0=j;
    save();
    const reactions=[
      ['Dossier : chimie confirmée.','Très crédible. Mehdi avait déjà cessé d’écouter les lunettes.','Il croyait avoir le dernier mot. Adorable.'],
      ['Version officielle enregistrée. Avec un astérisque énorme.','Enfin un aveu presque honnête.','Le dossier respecte ce silence. Il n’y croit pas, mais il le respecte.'],
      ['Politesse. Oui. Absolument.','Le mot “discrète” vient de quitter la pièce.','La Cristaline refuse de témoigner.'],
      ['Réponse rapide. Diplomatie efficace.','Deux secondes. Pour lui : environ six ans.','Commission approuvée à l’unanimité de vous deux.']
    ];
    const set=reactions[Math.min(i,reactions.length-1)];
    toast(set?set[j]:['Choix enregistré.','La maison note ce détail.','Hamoud regarde ailleurs, donc c’est suspect.'][j],2800);
    setTimeout(()=>cinematicStory(i+1),680)
  })
}

function cinematicReveal(){
  screen(
    '<div class="title-reveal-bg"><div class="trace t1"></div><div class="trace t2"></div><div class="trace t3"></div><div class="trace t4"></div>'+
    '<div class="eyebrow">LE DOSSIER A UN NOM</div>'+
    '<h1 class="cinematic-title">Sur les traces<br><em>de Raphy</em></h1>'+
    '<p class="title-sub">Une maison. Des souvenirs. Des détails beaucoup trop précis.</p>'+
    '<button class="btn gold" id="enterGame">Entrer dans la première trace</button></div>',
    'centered title-screen'
  );
  $('#enterGame').onclick=()=>route(0)
}

function chapterCurtain(fromIndex,nextIndex,skipped){
  const labels=[
    'La porte suivante s’ouvre sans faire de bruit.',
    'Quelque chose dans la maison vient de changer.',
    'Hamoud est déjà passé par là. Mauvais signe.',
    'Le dossier tourne une page tout seul.',
    'Un détail vient d’être conservé quelque part.',
    'La lumière du couloir s’allume avant toi.'
  ];
  const ominous=[3,8,17,18,19,20,21,22,24].includes(fromIndex);
  screen(
    '<div class="chapter-curtain '+(ominous?'ominous':'')+'">'+
      '<div class="curtain-mark">'+(ominous?'◌':'✦')+'</div>'+
      '<div class="eyebrow">'+(skipped?'TRACE PASSÉE':'TRACE CLASSÉE')+'</div>'+
      '<h2>'+NAMES[fromIndex]+'</h2>'+
      '<div class="curtain-line"></div>'+
      '<p>'+labels[fromIndex%labels.length]+'</p>'+
      '<small>prochaine trace</small>'+
      '<h3>'+NAMES[nextIndex]+'</h3>'+
      '<button class="btn secondary small" id="curtainNext">Continuer maintenant</button>'+
    '</div>',
    'centered'
  );
  let fired=false;
  const go=()=>{if(fired)return;fired=true;route(nextIndex)};
  $('#curtainNext').onclick=go;
  setTimeout(go,ominous?2600:1850)
}

function complete(i,sk=false){
  S.done[i]=true;
  const next=Math.min(i+1,25);
  S.current=next;
  save();
  if(i>=25)return route(25);
  if(sk)toast('Séquence passée. Le dossier fait semblant de ne rien avoir vu.');
  chapterCurtain(i,next,sk)
}

function unknown(){
  const firstChoice=['tu l’as clashé','tu as fait comme si tu n’avais rien remarqué','tu lui as laissé croire qu’il avait le dernier mot'][S.choices.story0??0];
  const alg=S.choices.algeria;
  screen(
    top(20)+hero('Trace 21','Numéro masqué','Pas de vrai appel. Mais l’écran connaît des choses qu’il ne devrait pas avoir besoin de répéter.')+
    '<div class="incoming-call" id="callScreen">'+
      '<div class="call-static"></div>'+
      '<div class="caller-orb">?</div>'+
      '<div class="caller-name">NUMÉRO MASQUÉ</div>'+
      '<div class="caller-sub">appel entrant · source inconnue</div>'+
      '<div class="call-actions"><button class="call-decline" id="decline">✕</button><button class="call-accept" id="accept">✓</button></div>'+
    '</div>'+
    '<div id="afterCall"></div>'+skip(20)
  );
  wireSkip(20);
  $('#accept').onclick=()=>openThread(false);
  $('#decline').onclick=()=>{vib([18,28,18]);toast('Tu peux refuser l’appel. Le message, lui, était déjà là.');setTimeout(()=>openThread(true),800)};

  function openThread(refused){
    $('#callScreen').outerHTML=
      '<div class="phone phone-dark"><div class="phone-top"><span>19:47</span><span>MASQUÉ</span></div><div id="msgs">'+
      '<div class="msg in">'+(refused?'Refuser était logique.':'Tu as décroché.')+'</div>'+
      '<div class="typing" id="typing"><i></i><i></i><i></i></div></div><div id="phoneAction"></div></div>';
    const messages=[
      'Je me souviens du magasin de lunettes.',
      'Dans ta version, '+firstChoice+'.',
      'Je me souviens des deux bouteilles. Du pneu. De la plage.',
      alg===1?'Et de cette magnifique offre immobilière où Mehdi devait finalement gérer cinq enfants.':alg===0?'Et tu as refusé la brochure Algérie sans même négocier les frais de dossier.':'Et la brochure Algérie est toujours juridiquement discutable.',
      'Mais il manque une vérification.'
    ];
    let k=0;
    const sendNext=()=>{
      if(k>=messages.length)return askDate();
      const t=$('#typing');if(!t)return;
      t.insertAdjacentHTML('beforebegin','<div class="msg in reveal-msg">'+messages[k]+'</div>');
      k++;setTimeout(sendNext,650+Math.random()*400)
    };
    setTimeout(sendNext,700)
  }

  function askDate(){
    $('#typing')?.remove();
    $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in">Premier vrai rendez-vous surprise. Jour + mois. Seulement ce que vous savez vraiment.</div>');
    $('#phoneAction').innerHTML='<div class="input-row" style="margin-top:12px"><input id="maskedDate" class="code-input" maxlength="4" inputmode="numeric" placeholder="JJMM"><button class="btn" id="maskedSend">Envoyer</button></div>';
    $('#maskedSend').onclick=()=>{
      if($('#maskedDate').value!=='1105')return toast('Non. Le sushi refuse de confirmer cette chronologie.');
      $('#msgs').insertAdjacentHTML('beforeend','<div class="msg out">1105</div>');
      $('#phoneAction').innerHTML='';
      setTimeout(()=>{
        $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in reveal-msg">Bien.</div><div class="msg in reveal-msg">Tu pensais chercher ce que la maison avait caché.</div>');
        setTimeout(()=>{
          $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in reveal-msg">Elle n’a rien caché.</div><div class="msg in reveal-msg">Elle a appris à te reconnaître à travers ce que tu laisses derrière toi.</div><div class="msg in reveal-msg final-mask-msg">Des traces.</div>');
          $('#phoneAction').innerHTML='<button class="btn danger" id="hangMasked">Raccrocher</button>';
          vib([20,60,20]);
          $('#hangMasked').onclick=()=>{
            screen('<div class="black-transition"><div class="glitch-word">TRACE</div><p>Une serrure vient de s’ouvrir quelque part dans la maison.</p><button class="btn secondary" id="toEscape">Trouver laquelle</button></div>','centered horror');
            $('#toEscape').onclick=()=>complete(20)
          }
        },1200)
      },850)
    }
  }
}

function final(){
  S.done[25]=true;save();
  const sum=(S.choices.story0||0)+(S.choices.algeria||0)+(S.choices.cinema_4||0);
  const variant=sum%3;
  const cls=['future-sea','future-dawn','future-city'][variant];
  const line=[
    'Pas besoin de savoir exactement à quoi ressemblera la suite.',
    'Je ne veux pas figer notre histoire dans ce qu’elle a déjà été.',
    'Le plus beau dans toutes ces traces, c’est qu’il en reste encore à créer.'
  ][variant];
  screen(
    '<div class="final-scene '+cls+'">'+
      '<div class="future-sky"></div><div class="future-horizon"></div>'+
      '<div class="final-copy"><div class="eyebrow">DERNIÈRE PORTE</div><h2>Le cœur n’était pas à trouver.</h2><p>'+line+'</p></div>'+
      '<button class="hold-heart" id="holdHeart" aria-label="Maintenir le cœur"><span>♥</span><i id="heartProgress"></i></button>'+
      '<p class="hold-caption" id="holdCaption">Maintiens le cœur.</p>'+
    '</div>',
    'centered final-screen'
  );
  let down=false,start=0,raf=0,revealed=false;
  const heart=$('#holdHeart'),progress=$('#heartProgress');
  const loop=()=>{
    if(!down||revealed)return;
    const p=Math.min(1,(performance.now()-start)/1800);
    progress.style.setProperty('--p',(p*360)+'deg');
    heart.style.transform='scale('+(1+p*.08)+')';
    if(p>=1){revealed=true;down=false;vib([30,40,90]);return revealMessage()}
    raf=requestAnimationFrame(loop)
  };
  const begin=e=>{e.preventDefault();if(revealed)return;down=true;start=performance.now();$('#holdCaption').textContent='Encore un peu…';loop()};
  const cancel=()=>{if(revealed)return;down=false;cancelAnimationFrame(raf);progress.style.setProperty('--p','0deg');heart.style.transform='';$('#holdCaption').textContent='Maintiens le cœur.'};
  heart.onpointerdown=begin;heart.onpointerup=cancel;heart.onpointercancel=cancel;heart.onpointerleave=cancel;

  function revealMessage(){
    screen(
      '<div class="final-message-bg '+cls+'"><div class="floating-traces">'+
      ['👓','💧','🛞','🌊','🚂','🐈','☕','🏠'].map((x,i)=>'<span style="--i:'+i+'">'+x+'</span>').join('')+
      '</div><div class="final-letter"><div class="eyebrow">POUR LA SUITE</div>'+
      '<p class="storyline">Tout ce jeu regarde en arrière seulement pour une raison : montrer combien de choses ordinaires sont déjà devenues les nôtres.</p>'+
      '<p class="storyline">Je veux encore des soirées imprévues, des projets, des fous rires, des catastrophes de bricolage, des endroits qui deviendront importants uniquement parce qu’on y était ensemble.</p>'+
      '<p class="storyline">Tu es forte. Tu es courageuse. Tu comptes énormément pour moi.</p>'+
      '<h1>Je t’aime ❤️</h1>'+
      '<div class="actions"><button class="btn" id="finalCredits">Générique</button><button class="btn secondary" id="finalReplay">Rejouer</button></div></div></div>',
      'centered'
    );
    $('#finalCredits').onclick=credits;$('#finalReplay').onclick=replay
  }
}

if(S.unlocked){if(S.storyDone)route(S.current);else opening();}

/* ===== app-v2h.js ===== */
'use strict';
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

/* ===== app-v2i.js ===== */
'use strict';

function credits(){
  const choicesCount=Object.keys(S.choices||{}).length;
  screen(
    '<div class="credits-stage"><div class="credits-stars"></div><div class="credits-roll">'+
      '<div class="credit-block hero-credit"><div class="eyebrow">SUR LES TRACES DE RAPHY</div><h1>Générique</h1><p>Une production excessivement personnelle.</p></div>'+
      '<div class="credit-block"><small>AVEC</small><h2>Raphy</h2><p>Héroïne principale · force tranquille · spécialiste internationale du « ça va »</p></div>'+
      '<div class="credit-block"><small>CRÉÉ PAR</small><h2>Mehdi</h2><p>Scénario · confiance parfois injustifiée · récupération occasionnelle du mérite</p></div>'+
      '<div class="credit-block"><small>DIRECTION DU CHAOS</small><h2>Hamoud</h2><p>Sabotage · déplacements d’objets · plomberie clandestine · consultant non sollicité</p></div>'+
      '<div class="credit-block"><small>MEILLEUR SECOND RÔLE LIQUIDE</small><h2>Deux Cristaline</h2><p>Retour sur investissement romantique encore inexpliqué</p></div>'+
      '<div class="credit-block"><small>ACCESSOIRES</small><p>Une balançoire en pneu · une nappe de plage · des makis poulet · des samoussas · un petit train · un lavabo beaucoup trop sûr de lui</p></div>'+
      '<div class="credit-block"><small>STATISTIQUE TOTALEMENT INUTILE</small><h2>'+choicesCount+'</h2><p>choix conservés localement dans ce téléphone</p></div>'+
      '<div class="credit-block tender-credit"><small>ET POUR LA SUITE</small><h2>À nous.</h2><p>Le prochain chapitre n’est pas encore écrit.</p></div>'+
      '<div class="credit-block end-credit"><h1>❤️</h1><p>fin de cette version<br>pas de l’histoire</p></div>'+
    '</div></div>'+
    '<div class="credits-controls"><button class="btn" id="creditsReplay">Rejouer</button><button class="btn secondary" id="creditsDev">Zone Mehdi</button><button class="btn secondary" id="creditsSkip">Accélérer le générique</button></div>',
    'credits-screen'
  );
  $('#creditsReplay').onclick=replay;
  $('#creditsDev').onclick=dev;
  $('#creditsSkip').onclick=()=>document.querySelector('.credits-roll')?.classList.add('fast')
}

function dev(){
  modal.hidden=false;
  modal.innerHTML='<div class="modal-card"><div class="eyebrow">ZONE MEHDI</div><h2>Outils de test</h2><p class="caption">Cette zone sert uniquement à tester la progression locale.</p><div class="actions"><button class="btn secondary" id="jumpReplay">Menu des traces</button><button class="btn secondary" id="unlockAll">Tout débloquer</button><button class="btn danger" id="resetAll">Effacer toute la progression</button><button class="btn secondary" id="closeDev">Fermer</button></div></div>';
  $('#jumpReplay').onclick=()=>{modal.hidden=true;modal.innerHTML='';replay()};
  $('#unlockAll').onclick=()=>{for(let i=0;i<26;i++)S.done[i]=true;save();toast('Tout débloqué. Dopage de QA activé.')};
  $('#resetAll').onclick=()=>{localStorage.removeItem(KEY);location.reload()};
  $('#closeDev').onclick=()=>{modal.hidden=true;modal.innerHTML=''}
}

/* ===== app-v2j.js ===== */
'use strict';
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

/* ===== robust single boot ===== */
try{if(S.unlocked){if(S.storyDone)route(S.current);else opening()}else lock()}catch(e){console.error('Core boot failed',e);try{lock()}catch(e2){console.error('Lock fallback failed',e2)}}


/* ===== V24 SAFE EXTRAS ===== */
(()=>{
  const PREF_KEY='raphy-prefs-v24';
  let prefs;
  try{prefs={sound:true,motion:true,fear:'normal',...JSON.parse(localStorage.getItem(PREF_KEY)||'{}')}}catch{prefs={sound:true,motion:true,fear:'normal'}}
  const savePrefs=()=>{try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}};

  // Expose a tiny safe API for later QA without exposing personal content.
  window.RaphyApp={
    version:'24',
    getState:()=>JSON.parse(JSON.stringify(S)),
    go:i=>route(Math.max(0,Math.min(25,Number(i)||0))),
    replay:()=>replay(),
    reset:()=>{localStorage.removeItem(KEY);location.reload()}
  };

  // Scene metadata + act separators.
  const actMap={
    0:['ACTE I','Ce qui commence sans prévenir','Des souvenirs ordinaires. Enfin… presque.','✦'],
    5:['ACTE II','La vraie vie est déjà un escape game','Cave, plans, peinture, lavabo. Aucun manuel ne survivra.','⌂'],
    12:['ACTE III','Ceux qui n’ont jamais sommeil','Deux mini-héros fictifs. Beaucoup trop d’énergie.','☾'],
    18:['ACTE IV','Quand la maison commence à répondre','À partir d’ici, certains détails cessent d’être innocents.','◌'],
    21:['ACTE V','Tout était déjà là','Les détails reviennent. Cette fois, ils ont une raison.','♥'],
    23:['ÉPILOGUE','Ce qui reste quand les jeux s’arrêtent','Plus de chrono. Plus de score. Juste vous.','∞']
  };
  const hintMap={
    0:['Garde la jauge au milieu, pas au maximum.','Le rythme régulier compte plus que la vitesse.','Pour la conduite, change de voie avant que l’obstacle arrive en bas.'],
    1:['Le bon moment arrive quand l’anneau devient doré.','Le nez et la démangeaison sont surtout des pièges.','Cinq respirations bien calées suffisent.'],
    2:['Maintiens le bouton, puis relâche près de la durée cible.','Le milieu de la jauge est ton meilleur repère.','Mieux vaut un peu court qu’un maintien interminable.'],
    3:['Commence par centrer le disque.','L’outil disparu n’est pas vraiment très loin. Hamoud semble confortable.','Pour stabiliser, vise la zone 78–86.'],
    4:['Il n’y a pas de “bonne” personnalité de réponse.','Lis surtout les réactions de la médecin : le logiciel mélange tout.','Sept questions, puis tu peux sortir avec ta dignité.'],
    5:['Sélectionne d’abord un objet, puis son bac.','Les câbles vont au garage, les outils aux travaux.','Hamoud refuse d’être rangé comme un objet normal.'],
    6:['Le client adore les contradictions. Cherche le compromis.','Une demi-cloison vaut mieux que tout ouvrir ou tout fermer.','Les placards intégrés rendent le rangement presque invisible.'],
    7:['Peins en balayant le mur plutôt qu’en restant au même endroit.','Les coulures arrivent si tu insistes trop sur une zone.','Si Hamoud laisse des pattes, touche chaque trace directement.'],
    8:['Suis l’ordre de montage affiché.','Le petit joint a disparu au moment le plus prévisible possible.','À la fin, le vrai piège est l’inversion chaud/froid.'],
    9:['Observe toute la séquence avant de reproduire.','Un mauvais bouton remet seulement la saisie à zéro.','La troisième manche est la plus longue : mémorise par groupes.'],
    10:['Frotte vraiment la carrosserie au doigt.','Ensuite, chaque objet de l’intérieur est cliquable.','À 99 %, cherche une minuscule tache près de la voiture.'],
    11:['Récupère les six affaires avant de rester discuter.','Les deux adultes près du portail sont volontairement des pièges.','Les objets sont répartis sur deux rangées.'],
    12:['Les réponses changent surtout l’humour et la jauge de sommeil.','Après les sept excuses, il reste encore à sortir de la chambre.','En mode furtif, tape quand le bouton est le plus petit.'],
    13:['Réponds aux sept questions, puis cherche l’équipement.','Le masque n’est pas perdu : Hamoud sait exactement où il est.','Touche le chat avant de tenter de récupérer le masque.'],
    14:['L’ordre des ingrédients compte.','Glace et menthe ne servent pas seulement à décorer.','Ce virgin mojito a surtout besoin qu’on suive enfin une logique.'],
    15:['Vanille, lait, glace, espresso, caramel.','Les couches doivent rester visibles.','Les demandes clients après la boisson sont faites pour être absurdes.'],
    16:['La valise doit rester sous 12 kg.','Prends au moins quatre objets avant le contrôle.','La brochure immobilière de Mehdi n’est pas obligatoire. Vraiment pas.'],
    17:['Cette scène est une satire du plan de Mehdi, pas une proposition sérieuse.','Choisis la réponse qui te ressemble le plus.','Aucune option ne t’engage à vivre avec cinq enfants dans deux pièces.'],
    18:['Déplace la lampe avec ton doigt.','Il y a trois marques cachées dans la pièce.','L’autre lampe peut détourner une partie des ailes.'],
    19:['Observe d’abord, puis ferme les yeux.','Une seule chose change à chaque tour.','La chaise, le cadre, la lampe, la porte et… un portrait très officiel.'],
    20:['Le message demande seulement jour + mois.','Premier vrai rendez-vous surprise : plage, sushi, premier baiser.','La réponse attendue est 1105.'],
    22:['Juge chaque dossier séparément.','Les preuves viennent de niveaux que tu as déjà joués.','Le verdict final dépend de tes réponses, pas d’une bonne solution unique.']
  };

  let currentScene=Number(S.current)||0;
  let hintTimer=null;
  let hintLevel=0;
  let audioCtx=null;

  const applyPrefs=()=>{
    document.documentElement.classList.toggle('raphy-motion-reduced',!prefs.motion);
    document.documentElement.classList.toggle('raphy-fear-reduced',prefs.fear==='reduced');
  };
  applyPrefs();

  const audio=()=>{
    if(!prefs.sound)return null;
    try{
      if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
      if(audioCtx.state==='suspended')audioCtx.resume();
      return audioCtx
    }catch{return null}
  };
  const beep=(freq=480,dur=.055,gain=.018)=>{
    const c=audio();if(!c)return;
    const o=c.createOscillator(),g=c.createGain();
    o.type='sine';o.frequency.value=freq;
    g.gain.setValueAtTime(.0001,c.currentTime);
    g.gain.exponentialRampToValueAtTime(gain,c.currentTime+.01);
    g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);
    o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur+.02)
  };

  const makeControls=()=>{
    if(document.querySelector('.v24-controls'))return;
    const box=document.createElement('div');
    box.className='v24-controls';
    box.innerHTML='<button class="v24-round" id="v24Pause" aria-label="Pause">Ⅱ</button><button class="v24-round" id="v24Sound" aria-label="Son">♪</button><button class="v24-round" id="v24Settings" aria-label="Réglages">⚙</button>';
    document.body.append(box);
    $('#v24Pause').onclick=openPause;
    $('#v24Sound').onclick=()=>{prefs.sound=!prefs.sound;savePrefs();syncControls();if(prefs.sound)beep(660,.08,.02)};
    $('#v24Settings').onclick=openSettings;
    syncControls()
  };

  const syncControls=()=>{
    const box=document.querySelector('.v24-controls');
    if(box)box.style.display=S.unlocked?'flex':'none';
    const snd=$('#v24Sound');
    if(snd)snd.textContent=prefs.sound?'♪':'∅'
  };

  function openPause(){
    modal.hidden=false;
    modal.innerHTML='<div class="modal-card v24-modal"><div class="eyebrow">PAUSE</div><h2>La maison attend.</h2><p class="storyline">Même Hamoud a arrêté de toucher aux trucs. Enfin, normalement.</p><div class="actions"><button class="btn" id="v24Resume">Reprendre</button><button class="btn secondary" id="v24Restart">Recommencer cette trace</button><button class="btn secondary" id="v24Replay">Traces débloquées</button><button class="btn secondary" id="v24SetFromPause">Réglages</button></div></div>';
    $('#v24Resume').onclick=()=>{modal.hidden=true;modal.innerHTML=''};
    $('#v24Restart').onclick=()=>{modal.hidden=true;modal.innerHTML='';route(currentScene)};
    $('#v24Replay').onclick=()=>{modal.hidden=true;modal.innerHTML='';replay()};
    $('#v24SetFromPause').onclick=openSettings
  }

  function openSettings(){
    modal.hidden=false;
    modal.innerHTML='<div class="modal-card v24-modal"><div class="eyebrow">RÉGLAGES</div><h2>À ta façon.</h2><div class="v24-setting"><div><b>Son</b><small>Effets discrets générés par le navigateur.</small></div><button class="btn small secondary" id="setSound">'+(prefs.sound?'Activé':'Coupé')+'</button></div><div class="v24-setting"><div><b>Animations</b><small>Réduire les mouvements si tu préfères.</small></div><button class="btn small secondary" id="setMotion">'+(prefs.motion?'Normales':'Réduites')+'</button></div><div class="v24-setting"><div><b>Horreur</b><small>Réduit insectes, ombre et effets soudains.</small></div><button class="btn small secondary" id="setFear">'+(prefs.fear==='reduced'?'Réduite':'Normale')+'</button></div><button class="btn" id="setClose" style="margin-top:14px">Fermer</button></div>';
    $('#setSound').onclick=()=>{prefs.sound=!prefs.sound;savePrefs();openSettings();syncControls()};
    $('#setMotion').onclick=()=>{prefs.motion=!prefs.motion;savePrefs();applyPrefs();openSettings()};
    $('#setFear').onclick=()=>{prefs.fear=prefs.fear==='reduced'?'normal':'reduced';savePrefs();applyPrefs();openSettings()};
    $('#setClose').onclick=()=>{modal.hidden=true;modal.innerHTML=''}
  }

  function showAct(i,def,continueFn){
    screen('<div class="v24-act"><div class="v24-act-symbol">'+def[3]+'</div><div class="eyebrow">'+def[0]+'</div><h1>'+def[1]+'</h1><div class="v24-rule"></div><p>'+def[2]+'</p><button class="btn secondary" id="v24ActGo">Continuer</button></div>','centered');
    let gone=false;
    const go=()=>{if(gone)return;gone=true;continueFn()};
    $('#v24ActGo').onclick=go;
    setTimeout(go,i>=18?2900:2200)
  }

  function scheduleHint(i){
    clearTimeout(hintTimer);hintLevel=0;
    document.querySelector('.v24-hint')?.remove();
    if(!hintMap[i]||[21,23,24,25].includes(i))return;
    hintTimer=setTimeout(()=>{
      if(Number(S.current)!==i)return;
      const b=document.createElement('button');
      b.className='v24-hint';
      b.textContent='Un indice ?';
      document.body.append(b);
      b.onclick=()=>{
        const hints=hintMap[i];
        toast(hints[Math.min(hintLevel,hints.length-1)],3600);
        hintLevel++;
        b.textContent=hintLevel>=3?'Indice max':'Encore un indice ?';
        beep(620,.05,.014)
      }
    },20000)
  }

  const baseRoute=route;
  route=function(i){
    currentScene=Math.max(0,Math.min(25,Number(i)||0));
    document.body.dataset.scene=String(currentScene);
    document.documentElement.style.setProperty('--v24-progress',((currentScene+1)/26*100)+'%');
    syncControls();
    scheduleHint(currentScene);
    const def=actMap[currentScene],key='raphy-v24-act-'+currentScene;
    if(def&&!sessionStorage.getItem(key)){
      sessionStorage.setItem(key,'1');
      return showAct(currentScene,def,()=>baseRoute(currentScene))
    }
    return baseRoute(currentScene)
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
    screen(hero('APRÈS LE GÉNÉRIQUE','Rejouer une trace','Pas besoin de recommencer toute l’histoire.')+
      '<div class="v24-replay-progress"><b>'+doneCount+'</b><span>/26 traces débloquées</span><div class="meter"><i style="width:'+(doneCount/26*100)+'%"></i></div></div>'+
      groups.map(g=>'<section class="v24-replay-act"><div class="eyebrow">'+g[0]+'</div><div class="v24-replay-grid">'+g[1].map(i=>'<button class="v24-replay-card" data-v24r="'+i+'" '+(S.done[i]?'':'disabled')+'><span>'+String(i+1).padStart(2,'0')+'</span><b>'+NAMES[i]+'</b><small>'+(S.done[i]?'rejouer':'verrouillé')+'</small></button>').join('')+'</div></section>').join('')+
      '<div class="card soft"><div class="eyebrow">CHAPITRE +1</div><h3>Pas encore écrit.</h3><p class="caption">Il faut bien laisser une place à ce qui n’est pas encore arrivé.</p></div>');
    $$('[data-v24r]').forEach(b=>b.onclick=()=>route(+b.dataset.v24r))
  };

  // Subtle global sounds only after a real user gesture.
  document.addEventListener('pointerdown',e=>{
    if(!prefs.sound)return;
    if(e.target.closest('.btn,.choice,.item,.v24-round,.v24-replay-card,.v24-hint'))beep(500,.04,.012)
  },{capture:true});

  makeControls();
  const uiObserver=new MutationObserver(()=>syncControls());
  uiObserver.observe(app,{childList:true,subtree:true});
})();


/* ===== V25 DEEP FINALE ===== */
(()=>{
  const V25_sleep=ms=>new Promise(r=>setTimeout(r,ms));

  escapeGame = function(){
    let stage=0,started=Date.now(),hintTimer=null,hintLevel=0;
    const tokens=[];
    const hints=[
      ['Regarde d’abord le tableau, pas le clavier.','Les quatre cartes racontent des scènes déjà jouées.','Commence par toucher chaque carte du dossier.'],
      ['Ce symbole a déjà été associé à ce qui comptait, pas à une forme géométrique.','Parmi ○ △ ♥ □, un seul revient dans toute l’histoire.','Choisis ♥.'],
      ['Le lavabo avait inversé deux choses très simples.','Pense froid / chaud, puis recommence par froid.','Séquence : bleu → rouge → bleu.'],
      ['Ce n’est pas le jour de votre rencontre.','Plage, sushi, premier baiser. Jour + mois uniquement.','1105.'],
      ['Regarde le trajet avant de jouer. Tu peux le revoir.','La trace traverse la grille en diagonale puis remonte à droite.','0 → 4 → 8 → 5 → 2.'],
      ['Classe les souvenirs par date réelle.','Cristaline avant Salon, Salon avant plage, plage avant Marseille.','💧 → 🌙 → 🌊 → ⛪.'],
      ['Le détail vient du tout premier jour, au magasin de lunettes.','Ce n’est ni les cheveux ni le sourire. C’est un tatouage.','New York.'],
      ['Le titre du jeu donne presque toute la réponse.','La maison ne collectionne pas des objets : elle suit quelque chose que Raphy laisse.','Les traces que Raphy laisse dans les lieux et les moments.']
    ];

    screen(
      top(21)+hero('Trace 22','Le grand escape game','Le verrou central mélange maintenant toute l’histoire. Compte plutôt 8 épreuves que 8 clics.')+
      '<div class="v25-escape-shell">'+
        '<div class="v25-escape-top"><span>VERROU CENTRAL</span><span id="v25Stage">1/8</span><span id="v25Time">00:00</span></div>'+
        '<div class="v25-board-mini" id="v25BoardMini">'+
          '<button data-board="0"><b>IRM</b><small>symbole reconstruit</small></button>'+
          '<button data-board="1"><b>LAVABO</b><small>chaud / froid</small></button>'+
          '<button data-board="2"><b>11/05</b><small>plage</small></button>'+
          '<button data-board="3"><b>HAMOUD</b><small>trajet impossible</small></button>'+
        '</div>'+
        '<div id="v25EscapeBody"></div>'+
        '<div id="v25EscapeHint"></div>'+
      '</div>'+skip(21)
    );
    wireSkip(21);

    const ticker=setInterval(()=>{
      const el=$('#v25Time'); if(!el){clearInterval(ticker);return}
      const s=Math.floor((Date.now()-started)/1000);
      el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')
    },1000);

    let boardSeen=new Set();
    $$('[data-board]').forEach(b=>b.onclick=()=>{
      boardSeen.add(+b.dataset.board);b.classList.add('seen');
      toast(['IRM : quelque chose a été mal reconstruit.','Lavabo : deux repères ne disaient pas la vérité.','11/05 : plage, sushi, premier baiser.','Hamoud : il traverse toujours les problèmes au mauvais moment.'][+b.dataset.board],2400);
      if(boardSeen.size===4&&stage===0)setTimeout(()=>advance('DOSSIER','Le tableau est complet. Le premier verrou s’allume.'),450)
    });

    function setHint(){
      clearTimeout(hintTimer);hintLevel=0;
      const box=$('#v25EscapeHint'); if(box)box.innerHTML='';
      hintTimer=setTimeout(()=>{
        const box=$('#v25EscapeHint'); if(!box)return;
        box.innerHTML='<button class="btn secondary small" id="v25Hint">Tu veux un indice ?</button>';
        $('#v25Hint').onclick=()=>{
          const hs=hints[Math.min(stage,hints.length-1)];
          toast(hs[Math.min(hintLevel,2)],3800);
          hintLevel++;
          $('#v25Hint').textContent=hintLevel===1?'Encore ? 😏':hintLevel===2?'Tu abuses un peu 😌':'Indice maximum';
        }
      },18000)
    }

    function advance(token,msg){
      clearTimeout(hintTimer);tokens.push(token);stage++;
      const st=$('#v25Stage');if(st)st.textContent=Math.min(stage+1,8)+'/8';
      toast(msg,3000);vib([8,18]);
      setTimeout(draw,600)
    }

    function draw(){
      const body=$('#v25EscapeBody'); if(!body)return;
      if(stage>0)$('#v25BoardMini')?.classList.add('collapsed');
      body.innerHTML='';
      if(stage===0){
        body.innerHTML='<div class="v25-lock-intro"><div class="v25-lock-icon">⌁</div><h3>Commence par examiner les quatre cartes.</h3><p>Le verrou refuse d’accepter une réponse tant que le dossier n’a pas été lu.</p></div>';
      }else if(stage===1){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 2 · SCANNER</div><h3>Quel symbole le dossier associe à ce qui comptait vraiment ?</h3><div class="escape-symbols">'+['○','△','♥','□'].map(x=>'<button class="escape-symbol" data-v25sym="'+x+'">'+x+'</button>').join('')+'</div>';
        $$('[data-v25sym]').forEach(b=>b.onclick=()=>b.dataset.v25sym==='♥'?advance('♥','Oui. Ce symbole était là bien avant le dernier écran.'):toast('Le verrou refuse cette forme.'));
      }else if(stage===2){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 3 · PLOMBERIE</div><h3>Reproduis la correction du lavabo.</h3><div class="valve-board"><button class="valve blue" data-v25v="B">FROID</button><button class="valve red" data-v25v="R">CHAUD</button></div><div class="code-strip" id="v25ValveStrip"></div>';
        let seq=[];const goal='BRB';
        $$('[data-v25v]').forEach(b=>b.onclick=()=>{
          seq.push(b.dataset.v25v);$('#v25ValveStrip').textContent=seq.map(x=>x==='B'?'🔵':'🔴').join(' ');
          if(seq.length===3){if(seq.join('')===goal)advance('↔','Exact. Même la plomberie finit par devenir un indice.');else{toast('Ça fuit conceptuellement. Recommence.');seq=[];$('#v25ValveStrip').textContent=''}}
        });
      }else if(stage===3){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 4 · DATE</div><h3>Premier vrai rendez-vous surprise : jour + mois.</h3><div class="input-row"><input id="v25Date" class="code-input" maxlength="4" inputmode="numeric" placeholder="JJMM"><button class="btn" id="v25DateGo">Valider</button></div><p class="caption">Pas la rencontre au magasin de lunettes.</p>';
        $('#v25DateGo').onclick=()=>$('#v25Date').value==='1105'?advance('1105','11/05. Plage, sushi, premier baiser. Validé.'):toast('Non. Le sushi refuse encore de témoigner.');
      }else if(stage===4){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 5 · HAMOUD</div><h3>Observe son trajet. Puis répète-le sans erreur.</h3><div class="paw-grid">'+Array.from({length:9},(_,i)=>'<button class="paw-cell" data-v25paw="'+i+'"></button>').join('')+'</div><button class="btn secondary" id="v25ShowPaw" style="margin-top:12px">Voir le trajet</button>';
        const goal=[0,4,8,5,2],input=[];let showing=false;
        $('#v25ShowPaw').onclick=async()=>{
          if(showing)return;showing=true;input.length=0;
          for(const n of goal){const el=$('[data-v25paw="'+n+'"]');el.classList.add('flash');await V25_sleep(360);el.classList.remove('flash');await V25_sleep(120)}
          showing=false;toast('À toi. Hamoud affirme que son trajet était parfaitement normal.')
        };
        $$('[data-v25paw]').forEach(b=>b.onclick=()=>{
          if(showing)return;
          const n=+b.dataset.v25paw,k=input.length;input.push(n);b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),180);
          if(n!==goal[k]){input.length=0;toast('Raté. Hamoud te regarde comme si le problème venait de toi.');return}
          if(input.length===goal.length)advance('🐈','Trajet reproduit. Le chat connaît encore une porte que personne n’a construite.')
        });
      }else if(stage===5){
        const mem=[['💧','Cristaline'],['🌙','Salon-de-Provence'],['🌊','Plage'],['⛪','Bonne Mère']];
        body.innerHTML='<div class="eyebrow">ÉPREUVE 6 · CHRONOLOGIE</div><h3>Remets ces quatre souvenirs dans l’ordre.</h3><div class="memory-order">'+mem.map((x,i)=>'<button class="memory-chip" data-v25m="'+i+'">'+x[0]+' '+x[1]+'</button>').join('')+'</div><div class="code-strip" id="v25Chrono"></div>';
        const arr=[],goal='0123';
        $$('[data-v25m]').forEach(b=>b.onclick=()=>{
          const n=+b.dataset.v25m;if(arr.includes(n))return;arr.push(n);b.classList.add('selected');$('#v25Chrono').textContent=arr.map(i=>mem[i][0]).join(' → ');
          if(arr.length===4){if(arr.join('')===goal)advance('CHRONO','Oui. Le dossier ne garde pas seulement des objets : il garde l’ordre dans lequel ils deviennent importants.');else{toast('Presque. La chronologie rembobine.');arr.length=0;$$('[data-v25m]').forEach(x=>x.classList.remove('selected'));$('#v25Chrono').textContent=''}}
        });
      }else if(stage===6){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 7 · PREMIER JOUR</div><h3>Quel détail Mehdi remarque aussi lors de votre rencontre au magasin de lunettes ?</h3><div class="choices"><button class="choice" data-v25detail="0">Un tatouage New York</button><button class="choice" data-v25detail="1">Une bague verte</button><button class="choice" data-v25detail="2">Un sac avec des étoiles</button></div>';
        $$('[data-v25detail]').forEach(b=>b.onclick=()=>+b.dataset.v25detail===0?advance('NY','Exact. Le premier jour était déjà rempli de détails inutiles… jusqu’à ce qu’ils ne le soient plus.'):toast('Ce détail-là appartient à une autre histoire.'));
      }else if(stage===7){
        body.innerHTML='<div class="eyebrow">ÉPREUVE 8 · VERROU CENTRAL</div><div class="v25-token-line">'+tokens.map(x=>'<span>'+x+'</span>').join('')+'</div><h3>Qu’est-ce que la maison essayait réellement de reconstruire ?</h3><div class="choices"><button class="choice" data-v25final="0">Un objet perdu</button><button class="choice" data-v25final="1">Des preuves contre Mehdi</button><button class="choice" data-v25final="2">Les traces que Raphy laisse dans les lieux et les moments</button></div>';
        $$('[data-v25final]').forEach(b=>b.onclick=()=>{
          if(+b.dataset.v25final!==2)return toast(+b.dataset.v25final===1?'Très tentant. Mais le procès de Mehdi est juste après.':'Non. Rien n’a réellement été volé.');
          clearInterval(ticker);clearTimeout(hintTimer);
          body.innerHTML='<div class="v25-escape-win"><div class="v25-unlock">⌁</div><div class="eyebrow">VERROU OUVERT</div><h2>Elle a appris à te reconnaître.</h2><p>Pas avec un score. Pas avec des fragments. Avec les détails qui reviennent partout où tu passes.</p><button class="btn" id="v25EscapeEnd">Ouvrir la porte suivante</button></div>';
          $('#v25Stage').textContent='8/8';$('#v25EscapeHint').innerHTML='';
          $('#v25EscapeEnd').onclick=()=>complete(21)
        });
      }
      if(stage<8)setHint()
    }
    draw()
  };

  trial = function(){
    let p=0,score=0;
    const dossiers=[
      ['Récupération de mérite en cave','Pièce A : Raphy trie huit objets. Pièce B : Mehdi apparaît à la fin.','« J’ai apporté une présence structurante. »'],
      ['Conduite émotionnellement sportive','Plusieurs dos-d’âne ont été détectés par le dos avant le conducteur.','« La route était agressive. »'],
      ['Plomberie avec confiance aggravante','Les repères chaud/froid ont été inversés avant d’être corrigés.','« Je testais sa capacité d’adaptation. »'],
      ['Projet Algérie vendu comme offre premium','Deux pièces, cinq enfants, Raphy à la maison et Mehdi incroyablement détendu.','« Il y avait une terrasse. »'],
      ['Déformation répétée de la notion de “5 minutes”','Plusieurs durées annoncées comme courtes ont développé leur propre fuseau horaire.','« Le temps est relatif. Einstein est avec moi. »'],
      ['Nomination illégale d’Hamoud au poste de chef de projet','Le chat a eu accès aux outils, aux joints, aux masques et aux décisions.','« Il avait de l’expérience terrain. »']
    ];
    screen(top(22)+hero('Trace 23','Le dossier Mehdi','Cette fois, chaque accusation vient avec sa pièce à conviction.')+'<div class="v25-trial card" id="v25Trial"></div>'+skip(22));
    wireSkip(22);

    const draw=()=>{
      if(p>=dossiers.length)return sanction();
      const d=dossiers[p];
      $('#v25Trial').innerHTML=dots(dossiers.length,p)+'<div class="v25-case-no">DOSSIER '+String(p+1).padStart(2,'0')+'</div><h2>'+d[0]+'</h2><div class="v25-evidence"><b>Pièce à conviction</b><p>'+d[1]+'</p></div><div class="v25-defense"><b>Défense de Mehdi</b><p>'+d[2]+'</p></div><div class="choices"><button class="choice" data-v25verdict="0">Non coupable 😇</button><button class="choice" data-v25verdict="1">Coupable 😌</button><button class="choice" data-v25verdict="2">Très coupable, qu’il arrête de parler 🔨</button></div>';
      $$('[data-v25verdict]').forEach(b=>b.onclick=()=>{
        const v=+b.dataset.v25verdict;score+=v;
        toast(v===0?'Mehdi sourit beaucoup trop vite.':v===1?'Il murmure « sorti de son contexte ».':'Le marteau a parlé. Mehdi aussi, mais personne n’écoute.');
        p++;setTimeout(draw,450)
      })
    };

    function sanction(){
      const verdict=score>=9?'COUPABLE AVEC OPTION RÉCIDIVE':score>=5?'COUPABLE, MAIS PRÉSENTABLE':'LIBÉRÉ SOUS SURVEILLANCE DE RAPHY';
      $('#v25Trial').innerHTML='<div class="eyebrow">VERDICT</div><h2>'+verdict+'</h2><p>La peine doit rester symbolique. Le tribunal a déjà assez de travail.</p><div class="choices"><button class="choice" data-v25sanction="0">Préparer le petit-déjeuner sans demander où sont les choses</button><button class="choice" data-v25sanction="1">Organiser une soirée complète sans dire « on verra »</button><button class="choice" data-v25sanction="2">Reconnaître une fois que Raphy avait raison sans ajouter « mais »</button></div>';
      $$('[data-v25sanction]').forEach(b=>b.onclick=()=>{
        const labels=['petit-déjeuner autonome','soirée sans “on verra”','reconnaissance sans “mais”'];
        S.choices.v25sanction=+b.dataset.v25sanction;save();
        $('#v25Trial').innerHTML='<div class="eyebrow">SANCTION RETENUE</div><h2>'+labels[+b.dataset.v25sanction]+'</h2><div class="v25-appeal"><p>Mehdi souhaite faire appel.</p><button class="btn secondary" id="v25Appeal">Déposer l’appel — 46 pages × 3 exemplaires</button></div>';
        $('#v25Appeal').onclick=()=>{$('#v25Appeal').disabled=true;$('#v25Appeal').textContent='Calcul en cours…';setTimeout(()=>{$('#v25Trial').insertAdjacentHTML('beforeend','<div class="card soft" style="margin-top:12px"><b>APPEL RETIRÉ</b><br>Mehdi vient de découvrir le nombre de pages.</div><button class="btn" id="v25TrialEnd" style="margin-top:12px">Classer le dossier</button>');$('#v25TrialEnd').onclick=()=>complete(22)},1000)}
      })
    }
    draw()
  };

  calm = function(){
    const beats=[
      ['HÔPITAL','Le dos décide que la journée avait besoin d’un détour. Rien de glamour. Juste être là.','🏥'],
      ['RETOUR','Puis la maison. Repos. Pas besoin de transformer chaque moment en événement.','🏠'],
      ['LE FILM','Qu’est-ce qu’on a fait au Bon Dieu ? passe à l’écran. Et toi, tu ris vraiment.','🎬'],
      ['48 HEURES','Ce souvenir n’a ni vue incroyable, ni grand discours. C’est exactement pour ça qu’il compte.','🤍']
    ];
    let i=0;
    screen(top(23)+hero('Trace 24','Les 48 heures','Aucune énigme. Touchez simplement les moments quand vous êtes prête.')+'<div class="v25-calm-stage" id="v25Calm"></div><div class="v25-calm-dots" id="v25CalmDots">'+beats.map((_,j)=>'<i class="'+(j===0?'on':'')+'"></i>').join('')+'</div>');
    const draw=()=>{
      const b=beats[i];
      $('#v25Calm').innerHTML='<button class="v25-calm-card" id="v25CalmCard"><span>'+b[2]+'</span><small>'+b[0]+'</small><h2>'+b[1]+'</h2><p>Touche pour continuer.</p></button>';
      $('#v25CalmCard').onclick=()=>{i++;if(i>=beats.length){$('#v25Calm').innerHTML='<div class="v25-calm-end"><div>☁</div><h2>Les souvenirs tranquilles ont aussi une place ici.</h2><button class="btn" id="v25CalmEnd">Continuer</button></div>';$('#v25CalmDots').innerHTML='';$('#v25CalmEnd').onclick=()=>complete(23);return}$$('#v25CalmDots i').forEach((x,j)=>x.classList.toggle('on',j===i));draw()}
    };draw()
  };

  unsaid = function(){
    const notes=[
      ['TA FORCE','Je vois à quel point tu continues, même quand ce serait plus simple de dire que c’est trop.','✦'],
      ['TON COURAGE','Pas le spectaculaire. Celui du quotidien. Celui qui ne demande pas qu’on le remarque.','◌'],
      ['TA PLACE','Tu es importante dans ma vie comme une réalité, pas comme une jolie phrase à mettre à la fin d’un jeu.','⌂'],
      ['TOI','Je te trouve belle. J’aime ton sourire, ta répartie, ta façon d’être là. Je ne te le dis probablement pas assez.','♡'],
      ['NOUS','Au milieu des travaux, des rendez-vous, des fous rires, des moments simples et de tout le reste : je nous choisis encore.','∞']
    ];
    let opened=new Set();
    screen(top(24)+hero('Trace 25','Ce qu’on ne dit pas assez','Cinq enveloppes. Aucun score. Ouvre-les dans l’ordre que tu veux.')+'<div class="v25-note-grid">'+notes.map((n,i)=>'<button class="v25-envelope" data-v25note="'+i+'"><span>'+n[2]+'</span><b>'+n[0]+'</b><small>ouvrir</small></button>').join('')+'</div><div id="v25NoteReader"></div>');

    $$('[data-v25note]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.v25note,n=notes[i];opened.add(i);b.classList.add('opened');b.querySelector('small').textContent='lu';
      $('#v25NoteReader').innerHTML='<div class="v25-note-open card glow"><div class="eyebrow">'+n[0]+'</div><p class="storyline">'+n[1]+'</p>'+(opened.size===notes.length?'<button class="btn" id="v25AllNotes">Il reste une porte</button>':'<p class="caption">'+opened.size+'/5 enveloppes ouvertes</p>')+'</div>';
      if(opened.size===notes.length)$('#v25AllNotes').onclick=()=>complete(24)
    })
  };
})();


/* ===== V27 CINEMATIC OPENING ===== */
(()=>{
  const V27_SCENES=[
    {kind:'optique',badge:'25 AVRIL 2026',ambient:'magasin de lunettes',detail:'New York'},
    {kind:'cigarettes',badge:'30 AVRIL · 18:00',ambient:'deux cigarettes',detail:'2'},
    {kind:'water',badge:'30 AVRIL · 19:00',ambient:'retour inattendu',detail:'Cristaline'},
    {kind:'phone',badge:'2 MAI',ambient:'appel après le travail',detail:'Snapchat'},
    {kind:'salon',badge:'4 MAI',ambient:'Salon-de-Provence',detail:'balançoire'},
    {kind:'police',badge:'PLUS TARD',ambient:'soirée normale : refusée',detail:'🚓'},
    {kind:'beach',badge:'11 MAI',ambient:'plage · sushi · premier baiser',detail:'1105'},
    {kind:'parking',badge:'LES SOIRS D’APRÈS',ambient:'parler sans regarder l’heure',detail:'🛒'},
    {kind:'jacuzzi',badge:'JUIN',ambient:'juste vous deux',detail:'LED'},
    {kind:'marseille',badge:'JUIN',ambient:'surprise Marseille',detail:'Bonne Mère'},
    {kind:'everyday',badge:'PUIS LE QUOTIDIEN',ambient:'les détails deviennent un langage',detail:'traces'}
  ];

  const art=(i)=>{
    const s=V27_SCENES[i]||V27_SCENES[0];
    const arts={
      optique:'<div class="v27-shop"><div class="v27-sign">OPTIQUE</div><div class="v27-counter"></div><div class="v27-glasses g1">◉—◉</div><div class="v27-glasses g2">◉—◉</div><div class="v27-raphy-silhouette"><span>✦</span></div><button class="v27-detail" data-v27-detail>NEW YORK</button></div>',
      cigarettes:'<div class="v27-evening"><div class="v27-shopdoor"></div><div class="v27-cig c1">▯</div><div class="v27-cig c2">▯</div><div class="v27-clock">18:00</div><button class="v27-detail" data-v27-detail>exactement deux</button></div>',
      water:'<div class="v27-evening water"><div class="v27-clock">19:00</div><div class="v27-bottle b1">💧</div><div class="v27-bottle b2">💧</div><div class="v27-return-arrow">↩</div><button class="v27-detail" data-v27-detail>elle est revenue</button></div>',
      phone:'<div class="v27-phone-scene"><div class="v27-phone-shell"><div class="v27-callbar">appel magasin</div><div class="v27-chat"><i></i><i></i><i></i></div><div class="v27-snap">👻</div></div><button class="v27-detail" data-v27-detail>après le travail</button></div>',
      salon:'<div class="v27-salon"><div class="v27-restaurant">🍽️</div><div class="v27-sky-stars">✦ · ✧ · ✦</div><div class="v27-swing"><span>◯</span><i></i></div><button class="v27-detail" data-v27-detail>regarder le ciel</button></div>',
      police:'<div class="v27-police"><div class="v27-road"></div><div class="v27-car">🚗</div><div class="v27-lights"><i></i><i></i></div><div class="v27-policecar">🚓</div><button class="v27-detail" data-v27-detail>évidemment</button></div>',
      beach:'<div class="v27-beach"><div class="v27-moon">☾</div><div class="v27-sea"></div><div class="v27-blanket"></div><div class="v27-sushi">🍣 🍱</div><div class="v27-heart-pulse">♥</div><button class="v27-detail" data-v27-detail>1105</button></div>',
      parking:'<div class="v27-parking"><div class="v27-market">SUPERMARCHÉ</div><div class="v27-car parked">🚗</div><div class="v27-talk">… … …</div><button class="v27-detail" data-v27-detail>encore cinq minutes</button></div>',
      jacuzzi:'<div class="v27-jacuzzi"><div class="v27-leds"><i></i><i></i><i></i><i></i></div><div class="v27-water-ring">◌</div><div class="v27-two">●　●</div><button class="v27-detail" data-v27-detail>monde sur silencieux</button></div>',
      marseille:'<div class="v27-marseille"><div class="v27-sun">☀</div><div class="v27-train">🚂</div><div class="v27-hill"></div><div class="v27-basilica">⛪</div><button class="v27-detail" data-v27-detail>Bonne Mère</button></div>',
      everyday:'<div class="v27-everyday"><div class="v27-grid-mem"><span>🏥</span><span>🪛</span><span>🚗</span><span>🚰</span><span>🎬</span><span>🐈</span></div><div class="v27-thread"></div><button class="v27-detail" data-v27-detail>tout devient une trace</button></div>'
    };
    return '<div class="v27-film"><div class="v27-film-grain"></div><div class="v27-film-badge">'+s.badge+'</div>'+arts[s.kind]+'<div class="v27-film-caption">'+s.ambient+'</div></div>'
  };

  opening = function(){
    screen(
      '<div class="v27-opening v37-opening">'+
        '<div class="v27-envelope" id="v27Envelope" role="button" tabindex="0" aria-label="Ouvrir l’enveloppe">'+
          '<div class="v27-envelope-back"></div>'+
          '<div class="v27-envelope-flap"></div>'+
          '<div class="v27-envelope-paper"><span>POUR RAPHY</span><small>ouvrir seulement si tu assumes les conséquences</small></div>'+
          '<button class="v27-seal" id="v27Seal" type="button" aria-label="Ouvrir l’enveloppe">R</button>'+
        '</div>'+
        '<div class="v37-opening-cta" id="v37OpeningCta" hidden>'+
          '<button class="btn gold v37-open-dossier" id="v27OpenDossier" type="button">Ouvrir le dossier</button>'+
          '<small>La première trace t’attend.</small>'+
        '</div>'+
        '<div class="v27-opening-copy"><p>J’avais prévu quelque chose de simple.</p><p>Puis Hamoud a touché un truc.</p></div>'+
        '<div class="mystery-line">« Suis les traces. Certaines sont à toi. D’autres… se souviennent de toi. »</div>'+
      '</div>',
      'centered cinema-screen'
    );

    let opened=false;
    const envelope=$('#v27Envelope'),seal=$('#v27Seal'),cta=$('#v37OpeningCta'),openBtn=$('#v27OpenDossier');

    const revealCTA=()=>{
      if(!cta)return;
      cta.hidden=false;
      requestAnimationFrame(()=>cta.classList.add('show'));
      setTimeout(()=>openBtn?.focus({preventScroll:true}),120)
    };

    const openEnvelope=()=>{
      if(opened)return;
      opened=true;
      envelope?.classList.add('open','v37-opened');
      if(seal){seal.disabled=true;seal.classList.add('used')}
      vib([8,20,8]);
      setTimeout(revealCTA,520);
      // fail-safe: the button must always appear even if an animation event is lost
      setTimeout(revealCTA,1200)
    };

    seal.onclick=e=>{e.stopPropagation();openEnvelope()};
    envelope.onclick=e=>{if(!e.target.closest('#v27OpenDossier'))openEnvelope()};
    envelope.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope()}};
    openBtn.onclick=()=>cinematicStory(0);

    // If this screen is restored in an odd visual state, keep it actionable.
    setTimeout(()=>{
      if(envelope?.classList.contains('open'))revealCTA()
    },900)
  };

  cinematicStory = function(i){
    if(i>=CINEMA_STORY.length){
      S.storyDone=true;save();return cinematicReveal()
    }
    const s=CINEMA_STORY[i];
    screen(
      '<div class="v27-memory-progress"><span>'+String(i+1).padStart(2,'0')+'</span><div><i style="width:'+((i+1)/CINEMA_STORY.length*100)+'%"></i></div><small>'+CINEMA_STORY.length+'</small></div>'+
      art(i)+
      '<div class="v27-memory-copy"><div class="eyebrow">'+s.tag+'</div><h2>'+s.title+'</h2><p>'+s.text+'</p></div>'+
      '<div class="memory-lines">'+s.lines.map((x,j)=>'<div class="memory-line" style="animation-delay:'+(j*.14)+'s">'+x+'</div>').join('')+'</div>'+
      '<div class="card v27-choice-card"><div class="eyebrow">Raphy répond</div><div class="choices" style="margin-top:12px">'+s.choices.map((x,j)=>'<button class="choice" data-cstory="'+j+'">'+x+'</button>').join('')+'</div></div>'
    );
    $('[data-v27-detail]')?.addEventListener('click',e=>{
      e.currentTarget.classList.add('revealed');
      const msg=[
        'Oui. Mehdi avait remarqué ça aussi. Les lunettes, elles, attendaient toujours.',
        'Deux. Le nombre officiel du prétexte.',
        'Le détail important n’est pas l’eau. C’est qu’elle est revenue.',
        'Il fallait bien changer de canal pour continuer à parler.',
        'Une balançoire en pneu finit officiellement dans une chronologie romantique.',
        'La police : figurant non prévu, présence remarquée.',
        '1105. Cette date reviendra. Garde-la quelque part.',
        'Un parking peut devenir important quand on oublie de regarder l’heure.',
        'Pas besoin d’un grand décor quand tout le reste s’éteint un peu.',
        'Le trajet comptait presque autant que la destination.',
        'C’est là que les “grands souvenirs” arrêtent d’être les seuls importants.'
      ][i];
      toast(msg,3200)
    });
    $$('[data-cstory]').forEach(b=>b.onclick=()=>{
      const j=+b.dataset.cstory;
      S.choices['cinema_'+i]=j;if(i===0)S.choices.story0=j;save();
      const generic=[
        'Choix enregistré. Le dossier sourit beaucoup trop.',
        'La maison note ce détail sans demander l’autorisation.',
        'Hamoud n’a rien dit. Ce qui est déjà suspect.'
      ];
      toast(generic[j]||generic[0],2200);
      document.querySelector('.v27-film')?.classList.add('leaving');
      setTimeout(()=>cinematicStory(i+1),620)
    })
  };

  cinematicReveal = function(){
    screen(
      '<div class="v27-title-reveal">'+
        '<div class="v27-title-traces">'+Array.from({length:9},(_,i)=>'<i style="--n:'+i+'"></i>').join('')+'</div>'+
        '<div class="eyebrow">LE DOSSIER A UN NOM</div>'+
        '<h1>Sur les traces<br><em>de Raphy</em></h1>'+
        '<p>Une maison. Des souvenirs. Des détails beaucoup trop précis.</p>'+
        '<div class="v27-title-objects"><span>👓</span><span>💧</span><span>🛞</span><span>🌊</span><span>🚂</span><span>🐈</span></div>'+
        '<button class="btn gold" id="v27Enter">Entrer dans la première trace</button>'+
      '</div>',
      'centered title-screen'
    );
    $('#v27Enter').onclick=()=>route(0)
  };
})();


/* ===== V28 FAMILY & TRAVEL POLISH ===== */
(()=>{
  mojito = function(){
    let phase=0,muddle=0,step=0,stirs=0;
    const order=['ice','sweet','water','stir'];
    screen(
      top(14)+hero('Trace 15','Virgin mojito : deuxième chance','Cette fois, on écrase vraiment la menthe. Oui, ce détail comptait probablement.')+
      '<div class="v28-mojito-stage">'+
        '<div class="v28-bar-glow"></div>'+
        '<div class="v28-mojito-glass" id="v28Glass"><div class="v28-mojito-bottom" id="v28Bottom"><span class="lime">🍋‍🟩</span><span class="mint">🌿</span></div><div id="v28DrinkLayers"></div><div class="v28-straw">╱</div></div>'+
        '<button class="v28-muddler" id="v28Muddle">▮</button>'+
        '<div class="v28-bar-label">BAR DE RAPHY</div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v28MojitoPhase">1/3 · écraser</span><span id="v28MojitoStat">0/8</span></div><div class="meter"><i id="v28MojitoBar"></i></div><p class="caption" id="v28MojitoCopy">Tape sur le pilon pour écraser citron vert + menthe.</p><div id="v28MojitoActions"></div></div>'+skip(14)
    );
    wireSkip(14);

    $('#v28Muddle').onclick=()=>{
      if(phase!==0)return;
      muddle++;vib(6);
      $('#v28MojitoStat').textContent=Math.min(muddle,8)+'/8';
      $('#v28MojitoBar').style.width=Math.min(100,muddle/8*100)+'%';
      $('#v28Bottom').animate([{transform:'translateY(0)'},{transform:'translateY(6px) scale(.97)'},{transform:'translateY(0)'}],{duration:180});
      if(muddle===4)toast('Voilà. La menthe est enfin au courant qu’elle participe au mojito.');
      if(muddle>=8){phase=1;setTimeout(build,350)}
    };

    function build(){
      $('#v28Muddle').style.display='none';
      $('#v28MojitoPhase').textContent='2/3 · construire';
      $('#v28MojitoStat').textContent='0/4';
      $('#v28MojitoBar').style.width='0%';
      $('#v28MojitoCopy').textContent='Ajoute les éléments dans le bon ordre.';
      $('#v28MojitoActions').innerHTML=
        '<div class="item-grid">'+
          '<button class="item big" data-v28drink="sweet">🍯 Douceur</button>'+
          '<button class="item big" data-v28drink="water">💧 Eau gazeuse</button>'+
          '<button class="item big" data-v28drink="ice">🧊 Glace</button>'+
          '<button class="item big" data-v28drink="stir">🥄 Mélanger</button>'+
        '</div>';
      $$('[data-v28drink]').forEach(b=>b.onclick=()=>{
        const k=b.dataset.v28drink;
        if(k!==order[step])return toast(step===0?'La glace d’abord. Sinon le bar imaginaire retire une étoile.':'Pas encore. Le verre demande un minimum d’organisation.');
        b.disabled=true;b.classList.add('selected');
        if(k==='ice')addLayer('v28-ice','◆ ◆ ◆');
        if(k==='sweet')addLayer('v28-sweet','');
        if(k==='water')addLayer('v28-water','');
        if(k==='stir'){phase=2;startStir();return}
        step++;
        $('#v28MojitoStat').textContent=step+'/4';
        $('#v28MojitoBar').style.width=(step/4*100)+'%'
      })
    }

    function addLayer(cls,txt){
      const d=document.createElement('div');d.className='v28-drink-layer '+cls;d.textContent=txt;$('#v28DrinkLayers').append(d);
      d.animate([{transform:'scaleY(0)',opacity:.3},{transform:'scaleY(1)',opacity:1}],{duration:380,fill:'both'})
    }

    function startStir(){
      $('#v28MojitoPhase').textContent='3/3 · mélanger';
      $('#v28MojitoStat').textContent='0/5 tours';
      $('#v28MojitoCopy').textContent='Fais cinq petits tours. Pas une centrifugeuse.';
      $('#v28MojitoActions').innerHTML='<button class="btn" id="v28Stir">Faire un tour 🥄</button>';
      $('#v28Stir').onclick=()=>{
        stirs++;vib(5);
        $('#v28Glass').animate([{transform:'rotate(0)'},{transform:'rotate(2deg)'},{transform:'rotate(-2deg)'},{transform:'rotate(0)'}],{duration:260});
        $('#v28MojitoStat').textContent=stirs+'/5 tours';$('#v28MojitoBar').style.width=(stirs/5*100)+'%';
        if(stirs>=5){
          $('#v28Stir').disabled=true;
          toast('Cette fois : menthe écrasée, ordre respecté. Le Thermomix est officiellement innocent.');
          setTimeout(()=>complete(14),900)
        }
      }
    }
  };

  customsGame = function(){
    const items=[
      ['Passeport ❤️',1,'ok'],['Pâtes non cassées 🇮🇹',2,'ok'],['Poêle à paella 🇪🇸',4,'ok'],
      ['Brochure Mehdi Immobilier 🇩🇿',7,'sus'],['Hamoud dans la valise 🐈',6,'sus'],
      ['Doudou cochon 🐷',2,'ok'],['Trois kilos de “au cas où”',5,'sus'],['Chargeur oublié',1,'ok']
    ];
    let selected=[],phase=0,q=0,stampHits=0;
    const questions=[
      ['Vous cassez les pâtes avant cuisson ?',['Oui, pour gagner du temps.','Non. Même Hamoud sait que non.','Uniquement sous ordre écrit.'],1],
      ['La paella italienne, concept ou erreur de frontière ?',['Concept visionnaire.','Erreur de frontière.','Je rends mon passeport.'],1],
      ['Cette brochure immobilière est-elle équilibrée pour Raphy ?',['Parfaitement.','Absolument pas. Mehdi est le seul gagnant.','Il manque juste un jacuzzi.'],1]
    ];

    screen(
      top(16)+hero('Trace 17','Douanes de l’amour','Prépare la valise, passe le contrôle, puis récupère le tampon. Aucun pays n’est la blague. Le dossier de Mehdi, oui.')+
      '<div class="v28-airport"><div class="v28-departures">DÉPARTS <span>ITALIE · ESPAGNE · ALGÉRIE</span></div><div class="suitcase-stage"><div class="suitcase"><div id="packed" class="packed"></div></div><div class="v28-scale"><b id="weight">0</b><span>/12 kg</span></div></div></div>'+
      '<div class="item-grid" id="v28PackItems">'+items.map((x,i)=>'<button class="item big" data-pack="'+i+'">'+x[0]+'<br><small>'+x[1]+' kg</small></button>').join('')+'</div>'+
      '<div class="card"><div class="hud"><span id="packCount">0 objet</span><span id="v28CustomPhase">VALISE</span></div><button class="btn" id="customNext">Passer au contrôle</button><div id="customQ"></div></div>'+skip(16)
    );
    wireSkip(16);

    $$('[data-pack]').forEach(b=>b.onclick=()=>{
      if(phase!==0)return;
      const n=+b.dataset.pack;
      if(selected.includes(n)){selected=selected.filter(x=>x!==n);b.classList.remove('selected')}
      else{selected.push(n);b.classList.add('selected')}
      const w=selected.reduce((s,x)=>s+items[x][1],0);
      $('#weight').textContent=w;$('#packCount').textContent=selected.length+' objet'+(selected.length>1?'s':'');
      $('#packed').innerHTML=selected.map(x=>'<span>'+items[x][0].split(' ')[0]+'</span>').join('');
      $('.v28-scale')?.classList.toggle('over',w>12)
    });

    $('#customNext').onclick=()=>{
      const w=selected.reduce((s,x)=>s+items[x][1],0);
      if(w>12)return toast('Valise en surcharge. Même l’amour respecte 12 kg fictifs.');
      if(selected.length<4)return toast('Il manque trop de choses. Même Hamoud trouve cette valise optimiste.');
      phase=1;$('#customNext').style.display='none';$$('[data-pack]').forEach(x=>x.disabled=true);$('#v28CustomPhase').textContent='CONTRÔLE';drawQ()
    };

    function drawQ(){
      if(q>=questions.length)return passport();
      const z=questions[q];
      $('#customQ').innerHTML='<div class="dialogue" style="margin-top:14px"><div class="avatar">🛂</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-v28cq="'+j+'">'+x+'</button>').join('')+'</div>';
      $$('[data-v28cq]').forEach(b=>b.onclick=()=>{
        const j=+b.dataset.v28cq;
        toast(j===z[2]?['L’agent approuve. Les pâtes aussi.','Frontière culinaire rétablie.','Enfin une réponse juridiquement saine.'][q]:'L’agent écrit quelque chose. Ça n’a pas l’air flatteur.');
        q++;setTimeout(drawQ,480)
      })
    }

    function passport(){
      phase=2;$('#v28CustomPhase').textContent='TAMPON';
      $('#customQ').innerHTML='<div class="v28-passport"><div class="v28-passport-head"><span>♥</span><b>PASSEPORT DES SOUVENIRS</b></div><div class="v28-passport-page"><small>DESTINATION</small><h3>À deux</h3><button class="v28-stamp-target" id="v28StampTarget">TAMPONNER ICI</button><div id="v28Stamped"></div></div></div><p class="caption">Tape trois fois sur le tampon. Le douanier est très procédurier.</p>';
      $('#v28StampTarget').onclick=()=>{
        stampHits++;vib(8);
        $('#v28StampTarget').animate([{transform:'scale(1)'},{transform:'scale(.92) rotate(-3deg)'},{transform:'scale(1)'}],{duration:180});
        if(stampHits===1)toast('Un tampon. Il en manque deux parce que l’administration aime les répétitions.');
        if(stampHits===2)toast('Deux. Encore un et vous êtes officiellement beaucoup trop tamponnés.');
        if(stampHits>=3){
          $('#v28Stamped').innerHTML='<div class="v28-stamp-mark">VALIDÉ<br><small>avec réserves sur Mehdi</small></div>';
          $('#v28StampTarget').disabled=true;
          setTimeout(()=>complete(16),1000)
        }
      }
    }
  };

  algeria = function(){
    let found=0;
    const flags=[
      ['kids','Cinq enfants',22,23,'Raphy vient de transmettre l’intégralité du service parental à Mehdi.'],
      ['home','Raphy reste à la maison',62,24,'Clause refusée. Les sorties et les amis ne nécessitent pas l’autorisation de Mehdi.'],
      ['friends','Pas d’amis sauf Mehdi',18,62,'Refusé avec une force administrative remarquable.'],
      ['mehdi','Mehdi très détendu',62,64,'Le principal bénéficiaire du contrat est curieusement détendu. Étonnant.']
    ];
    screen(
      top(17)+hero('Trace 18','Mehdi Immobilier™','Inspecte cette offre totalement objective écrite par son principal bénéficiaire. Le but : trouver les quatre clauses absurdes.')+
      '<div class="v28-brochure">'+
        '<div class="v28-brochure-top"><span>OFFRE EXCLUSIVE</span><b>Appartement 2 pièces · Algérie</b></div>'+
        '<div class="v28-brochure-photo"><div class="v28-balcony">TERRASSE ✦</div><div class="v28-flat">⌂</div></div>'+
        '<div class="v28-brochure-copy"><h3>La vie idéale selon Mehdi*</h3><p>*étude réalisée par Mehdi, relue par Mehdi, validée provisoirement par Mehdi.</p></div>'+
        flags.map((x,i)=>'<button class="v28-redflag" data-v28flag="'+i+'" style="left:'+x[2]+'%;top:'+x[3]+'%"><span>?</span></button>').join('')+
        '<div id="v28Refusals"></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v28Flags">0/4 clauses repérées</span><span>inspectrice : Raphy</span></div><p class="caption">Touche les quatre zones suspectes de la brochure.</p><div id="v28ContractEnd"></div></div>'+skip(17)
    );
    wireSkip(17);

    $$('[data-v28flag]').forEach(b=>b.onclick=()=>{
      if(b.disabled)return;b.disabled=true;const i=+b.dataset.v28flag;found++;b.classList.add('caught');b.innerHTML='✕';
      const f=flags[i];
      $('#v28Refusals').insertAdjacentHTML('beforeend','<div class="v28-refusal" style="left:'+f[2]+'%;top:'+f[3]+'%">REFUSÉ</div>');
      $('#v28Flags').textContent=found+'/4 clauses repérées';
      toast(f[4],3200);
      if(found===4)setTimeout(contract,650)
    });

    function contract(){
      $('#v28ContractEnd').innerHTML='<div class="eyebrow">CONTRE-PROPOSITION DE RAPHY</div><div class="choices" style="margin-top:10px"><button class="choice" data-v28contract="0">Mehdi gère les cinq enfants pendant 18 ans.</button><button class="choice" data-v28contract="1">Raphy garde sa liberté et Mehdi garde sa brochure.</button><button class="choice" data-v28contract="2">Hamoud devient agent immobilier. Au point où on en est.</button></div>';
      $$('[data-v28contract]').forEach(b=>b.onclick=()=>{
        const v=+b.dataset.v28contract;S.choices.algeria=v;save();
        toast(['L’offre vient de perdre absolument toute rentabilité pour Mehdi.','Contrat équilibré. La brochure se désintègre émotionnellement.','Hamoud exige 12 % de commission en croquettes.'][v],3000);
        setTimeout(()=>complete(17),850)
      })
    }
  };
})();


/* ===== V29 SCHOOL & COFFEE POLISH ===== */
(()=>{
  school = function(){
    let found=0,chat=0,phase=0,escapeMeter=0,direction=1,runner=null;
    const objects=[
      ['🎒','sac',8,24],['🧥','veste',70,25],['🥤','gourde',36,42],
      ['🧸','doudou',12,61],['🎨','dessin',70,61],['🥿','chaussure',41,72]
    ];
    screen(
      top(11)+hero('Trace 12','Sortie d’école','Récupère les six affaires, évite les conversations-pièges, puis trouve une fenêtre de sortie.')+
      '<div class="v29-school" id="v29School">'+
        '<div class="v29-school-sign">MATERNELLE</div>'+
        '<div class="v29-school-gate"></div>'+
        objects.map((x,i)=>'<button class="v29-school-object" data-v29obj="'+i+'" style="left:'+x[2]+'%;top:'+x[3]+'%"><span>'+x[0]+'</span><small>'+x[1]+'</small></button>').join('')+
        '<button class="v29-school-npc n1" data-v29npc="0">👩<span>« juste deux minutes… »</span></button>'+
        '<button class="v29-school-npc n2" data-v29npc="1">👩‍🦱<span>« tu sais pour la kermesse ? »</span></button>'+
        '<button class="v29-school-npc n3" data-v29npc="2">👨<span>« et le groupe WhatsApp ? »</span></button>'+
        '<div class="v29-child-shadow">👧🏻　👦🏻</div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v29Found">0/6 affaires</span><span id="v29Chat">0 piège</span></div><div id="v29SchoolTask"><p class="caption">Les adultes sont fictifs. Le pouvoir du « juste deux minutes » ne l’est pas.</p></div></div>'+skip(11)
    );
    wireSkip(11);

    $$('[data-v29obj]').forEach(b=>b.onclick=()=>{
      if(phase!==0||b.disabled)return;
      b.disabled=true;b.classList.add('picked');found++;vib(6);
      $('#v29Found').textContent=found+'/6 affaires';
      toast(found===1?'Une affaire sauvée du triangle des Bermudes scolaire.':found===5?'Il en reste UNE. Parce qu’il en reste toujours une.':found===6?'Tout est là. Maintenant, sortir du portail sans réunion improvisée.':'Récupéré.');
      if(found===6){phase=1;setTimeout(startEscape,650)}
    });

    $$('[data-v29npc]').forEach(b=>b.onclick=()=>{
      if(phase!==0)return;
      chat++;$('#v29Chat').textContent=chat+' piège'+(chat>1?'s':'');
      const lines=[
        '« Juste deux minutes » vient de demander une rallonge de huit minutes.',
        'Kermesse, gâteaux, tombola : la conversation vient de débloquer une extension.',
        'Le groupe WhatsApp avait déjà 63 messages. Personne ne sait pourquoi.'
      ];
      toast(lines[+b.dataset.v29npc],3000);
      b.animate([{transform:'scale(1)'},{transform:'scale(1.07)'},{transform:'scale(1)'}],{duration:350})
    });

    function startEscape(){
      $('#v29SchoolTask').innerHTML=
        '<div class="eyebrow">PHASE 2 · FUITE DU PORTAIL</div>'+
        '<p class="caption">Le halo vert se déplace. Clique quand il est aligné avec Raphy.</p>'+
        '<div class="v29-escape-track"><div class="v29-safe-zone"></div><div class="v29-runner" id="v29Runner">👩🏻</div></div>'+
        '<button class="btn" id="v29ExitNow">Sortir maintenant</button>';
      let pos=0,dir=1,last=performance.now();
      const track=$('.v29-escape-track'),safe=$('.v29-safe-zone');
      const loop=t=>{
        if(!track?.isConnected||phase!==1)return;
        const dt=Math.min(40,t-last)/16;last=t;pos+=dir*1.5*dt;
        if(pos>92){pos=92;dir=-1}if(pos<0){pos=0;dir=1}
        safe.style.left=pos+'%';requestAnimationFrame(loop)
      };requestAnimationFrame(loop);
      $('#v29ExitNow').onclick=()=>{
        const p=parseFloat(safe.style.left||'0');
        const target=46;
        if(Math.abs(p-target)<11){
          phase=2;toast(chat===0?'Sortie parfaite. Aucun échange de numéro, aucun comité créé.':'Sortie réussie. Quelques minutes ont été perdues au combat.');
          $('#v29Runner').classList.add('escape');setTimeout(()=>complete(11),850)
        }else{
          chat++;$('#v29Chat').textContent=chat+' piège'+(chat>1?'s':'');
          toast('Mauvais timing. Quelqu’un vient de commencer par « tant que je te tiens… »');
        }
      }
    }
  };

  coffee = function(){
    let step=0,shotReady=false,customersDone=false;
    const ingredients=[
      ['Vanille','🍦','vanilla'],['Lait','🥛','milk'],['Glace','🧊','ice'],['Espresso','☕','coffee'],['Caramel','🍯','caramel']
    ];
    screen(
      top(15)+hero('Trace 16','Iced caramel macchiato','Construis la boisson, calibre l’espresso, puis affronte trois clients fictifs extrêmement confiants.')+
      '<div class="v29-coffee-stage">'+
        '<div class="v29-machine"><div class="v29-machine-top">RAPHY BAR</div><div class="v29-grouphead"></div><div class="v29-shot-stream" id="v29ShotStream"></div></div>'+
        '<div class="v29-coffee-cup"><div id="v29CupLayers"></div><div class="v29-cup-r">R</div></div>'+
        '<div class="v29-coffee-ticket" id="v29Ticket">ICED CARAMEL<br>MACCHIATO</div>'+
      '</div>'+
      '<div class="item-grid" id="v29CoffeeItems">'+ingredients.map((x,i)=>'<button class="item big" data-v29c="'+i+'"><span style="font-size:30px">'+x[1]+'</span><br>'+x[0]+'</button>').join('')+'</div>'+
      '<div id="v29CoffeeExtra"></div>'+skip(15)
    );
    wireSkip(15);

    $$('[data-v29c]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.v29c;
      if(i!==step)return toast(['Le ticket vient de tousser très fort.','Le caramel te regarde. Il sait que ce n’est pas son tour.','On respecte les couches. Même dans un jeu.'][Math.floor(Math.random()*3)]);
      if(i===3&&!shotReady){espressoGame(b);return}
      commit(i,b)
    });

    function commit(i,b){
      b.disabled=true;b.classList.add('selected');
      const info=ingredients[i];
      const d=document.createElement('div');
      d.className='v29-coffee-layer '+info[2];
      d.innerHTML=i===2?'<span>◆ ◆ ◆</span>':'';
      $('#v29CupLayers').append(d);
      d.animate([{transform:'scaleY(0)',opacity:.35},{transform:'scaleY(1)',opacity:1}],{duration:420,fill:'both'});
      step++;vib(6);
      if(step===5){toast('Boisson terminée. Malheureusement, les clients ont aussi été débloqués.');setTimeout(customers,650)}
    }

    function espressoGame(button){
      $('#v29CoffeeItems').style.display='none';
      $('#v29CoffeeExtra').innerHTML=
        '<div class="card v29-shot-card"><div class="eyebrow">EXTRACTION ESPRESSO</div><div class="v29-shot-meter"><div class="v29-shot-good"></div><i id="v29ShotNeedle"></i></div><p class="caption">Arrête l’extraction quand l’aiguille passe dans la zone dorée.</p><button class="btn" id="v29StopShot">Lancer l’extraction</button></div>';
      let running=false,pos=0,dir=1,last=performance.now(),raf=0;
      $('#v29StopShot').onclick=()=>{
        if(!running){
          running=true;$('#v29StopShot').textContent='Arrêter';
          $('#v29ShotStream').classList.add('on');
          const loop=t=>{
            if(!running)return;
            const dt=Math.min(40,t-last)/16;last=t;pos+=dir*1.35*dt;
            if(pos>100){pos=100;dir=-1}if(pos<0){pos=0;dir=1}
            $('#v29ShotNeedle').style.left=pos+'%';raf=requestAnimationFrame(loop)
          };raf=requestAnimationFrame(loop)
        }else{
          running=false;cancelAnimationFrame(raf);$('#v29ShotStream').classList.remove('on');
          if(pos>=43&&pos<=61){
            shotReady=true;toast('Extraction propre. Le barista imaginaire arrête enfin de juger.');
            $('#v29CoffeeExtra').innerHTML='';$('#v29CoffeeItems').style.display='grid';commit(3,button)
          }else{
            toast(pos<43?'Trop court. L’espresso a encore des choses à dire.':'Trop long. L’espresso vient d’écrire ses mémoires.');
            pos=0;$('#v29ShotNeedle').style.left='0%';$('#v29StopShot').textContent='Relancer'
          }
        }
      }
    }

    function customers(){
      $('#v29CoffeeItems').style.display='none';
      let n=0;
      const orders=[
        ['Bonjour, je veux le même… sans café.',['Donc un lait caramel.','Je vais faire semblant de ne pas avoir entendu.','Hamoud prend la commande.']],
        ['Avec 2 glaçons et demi exactement.',['Je coupe le troisième.','Vous avez un pied à coulisse ?','Je vous offre un glaçon moral.']],
        ['Et très très chaud, mais glacé.',['Physique : désactivée.','Bien sûr, dans un univers parallèle.','Choisissez une température disponible sur Terre.']]
      ];
      const draw=()=>{
        if(n>=orders.length){
          customersDone=true;
          $('#v29CoffeeExtra').innerHTML='<div class="card glow"><div class="eyebrow">SERVICE TERMINÉ</div><h3>Raphy garde la boisson.</h3><p class="caption">Les clients gardent leurs problèmes.</p><button class="btn" id="v29CoffeeEnd">Continuer</button></div>';
          $('#v29CoffeeEnd').onclick=()=>complete(15);return
        }
        const o=orders[n];
        $('#v29CoffeeExtra').innerHTML='<div class="v29-customer card"><div class="dialogue"><div class="avatar">'+['🙂','🧐','😌'][n]+'</div><div class="bubble">'+o[0]+'</div></div><div class="choices" style="margin-top:12px">'+o[1].map((x,j)=>'<button class="choice" data-v29co="'+j+'">'+x+'</button>').join('')+'</div></div>';
        $$('[data-v29co]').forEach(b=>b.onclick=()=>{
          const j=+b.dataset.v29co;
          toast(j===0?'Réponse professionnellement défendable.':j===1?'Le service client vient de quitter mentalement la pièce.':'C’est enregistré. Juridiquement fascinant.');
          n++;setTimeout(draw,450)
        })
      };draw()
    }
  };
})();


/* ===== V30 HOSPITAL & KIDS IMMERSION ===== */
(()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  departure = function(){
    let support=50,walk=0,holding=false,phase='walk',last=performance.now(),warn=0;
    screen(
      top(0)+hero('Trace 01','Le départ','La première mission n’a rien d’héroïque : avancer doucement, puis survivre au trajet jusqu’à l’hôpital.')+
      '<div class="v30-hall" id="v30Hall">'+
        '<div class="v30-hall-lines"></div><div class="v30-door d1"></div><div class="v30-door d2"></div>'+
        '<div class="v30-walker" id="v30Walker"><span>👩🏻</span><i id="v30SupportArm"></i></div>'+
        '<button class="v30-cat-door" id="v30HallCat">🐈</button>'+
        '<div class="v30-comfort"><span>trop peu</span><b>ZONE CONFORT</b><span>trop</span></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span>Soutien <b id="v30Support">50%</b></span><span>Sortie <b id="v30Walk">0%</b></span></div><div class="meter"><i id="v30SupportBar" style="width:50%"></i></div><div class="meter cold" style="margin-top:10px"><i id="v30WalkBar"></i></div><p class="caption">Maintiens la zone de marche pour soutenir davantage. Relâche pour alléger.</p></div>'+skip(0)
    );
    wireSkip(0);
    const hall=$('#v30Hall'),sb=$('#v30SupportBar'),wb=$('#v30WalkBar'),walker=$('#v30Walker');
    $('#v30HallCat').onclick=()=>toast('Hamoud observe la scène comme s’il avait personnellement organisé le rendez-vous.');
    hall.onpointerdown=e=>{if(e.target.closest('button'))return;e.preventDefault();holding=true};
    hall.onpointerup=()=>holding=false;hall.onpointercancel=()=>holding=false;hall.onpointerleave=()=>holding=false;

    const loop=t=>{
      if(!hall.isConnected||phase!=='walk')return;
      const dt=Math.min(40,t-last)/16;last=t;
      support+=holding?1.05*dt:-.66*dt;support=Math.max(4,Math.min(96,support));
      const good=support>=39&&support<=67;
      sb.style.width=support+'%';sb.classList.toggle('good',good);
      $('#v30Support').textContent=Math.round(support)+'%';
      $('#v30SupportArm').style.opacity=good?'.9':'.35';
      if(good){walk+=.31*dt;wb.style.width=Math.min(100,walk)+'%';$('#v30Walk').textContent=Math.floor(Math.min(100,walk))+'%';walker.style.left=(7+Math.min(78,walk*.76))+'%'}
      else if(t-warn>1700){warn=t;toast(support<39?'Un peu plus de soutien. Elle fait la forte, évidemment.':'Doucement. On aide Raphy, on ne la transporte pas comme un meuble.')}
      if(walk>=100){phase='drive';vib([8,18]);toast('Couloir terminé. Hamoud considère l’abandon du domicile comme une décision discutable.');setTimeout(drive,650);return}
      requestAnimationFrame(loop)
    };
    requestAnimationFrame(loop);

    function drive(){
      screen(
        top(0)+hero('Trace 01 · partie 2','Trajet vers l’hôpital','Trois voies, quelques bosses et un conducteur beaucoup trop confiant.')+
        '<div class="v30-road" id="v30Road"><div class="v30-road-sky"><span>HÔPITAL ↑</span></div><div class="v30-road-lines"></div><div class="v30-car" id="v30Car">🚗</div><div id="v30Obs"></div></div>'+
        '<div class="card"><div class="hud"><span>Trajet <b id="v30Dist">0%</b></span><span>Bosses <b id="v30Hits">0</b></span></div><div class="meter cold"><i id="v30DriveBar"></i></div><div class="actions two" style="margin-top:12px"><button class="btn secondary" id="v30Left">← Gauche</button><button class="btn secondary" id="v30Right">Droite →</button></div></div>'+skip(0)
      );
      wireSkip(0);
      let lane=1,d=0,hits=0,obs=[],spawnTick=0,lastT=performance.now();
      const road=$('#v30Road'),car=$('#v30Car'),layer=$('#v30Obs');
      const setLane=()=>{car.style.left=(16+lane*34)+'%'};
      setLane();
      $('#v30Left').onclick=()=>{lane=Math.max(0,lane-1);setLane();vib(6)};
      $('#v30Right').onclick=()=>{lane=Math.min(2,lane+1);setLane();vib(6)};

      const spawn=()=>{
        const el=document.createElement('div'),ln=Math.floor(Math.random()*3);
        el.className='v30-bump';el.style.left=(12+ln*34)+'%';el.style.top='-46px';el.textContent=Math.random()>.72?'🕳️':'▰';
        layer.append(el);obs.push({el,lane:ln,y:-46,hit:false})
      };
      const run=t=>{
        if(!road.isConnected)return;
        const dt=Math.min(40,t-lastT)/16;lastT=t;spawnTick+=dt;
        if(spawnTick>40){spawnTick=0;spawn()}
        d+=.23*dt;$('#v30DriveBar').style.width=Math.min(100,d)+'%';$('#v30Dist').textContent=Math.floor(Math.min(100,d))+'%';
        obs.forEach(o=>{
          o.y+=4.2*dt;o.el.style.top=o.y+'px';
          if(!o.hit&&o.y>road.clientHeight-130&&o.y<road.clientHeight-65&&o.lane===lane){
            o.hit=true;hits++;d=Math.max(0,d-4.5);$('#v30Hits').textContent=hits;vib([14,22,14]);
            toast(hits===1?'Dos-d’âne détecté par le dos avant le conducteur. C’est incroyable.':'La suspension vient de demander à changer de famille.')
          }
        });
        obs=obs.filter(o=>{if(o.y>road.clientHeight+60){o.el.remove();return false}return true});
        if(d>=100){toast(hits<2?'Arrivée propre. Même Raphy est légèrement surprise.':'Hôpital atteint. Mehdi et la route ne se parlent plus.');setTimeout(()=>complete(0),850);return}
        requestAnimationFrame(run)
      };
      requestAnimationFrame(run)
    }
  };

  mri = function(){
    let scan=0,stability=88,breaths=0,windowOpen=false,finished=false,last=performance.now(),start=performance.now(),revealed=false;
    screen(
      top(1)+hero('Trace 02','IRM : mission immobilité','Bruits étranges, envie de bouger et un logiciel qui reconstruit absolument n’importe quoi.')+
      '<div class="v30-mri" id="v30MRI">'+
        '<div class="v30-mri-tunnel"><div class="v30-mri-bed">😐</div><div class="v30-scan-line"></div><div id="v30ScanGhost" class="v30-scan-ghost">NEW YORK ?</div></div>'+
        '<div class="v30-breath-ring" id="v30BreathRing"></div>'+
        '<button class="v30-tempt nose" id="v30Nose">🤧<span>toucher le nez</span></button>'+
        '<button class="v30-tempt itch" id="v30Itch">✦<span>ça gratte ici</span></button>'+
        '<div class="v30-mri-noise">KRRR · TUM · TUM · KRRR</div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span>Stabilité <b id="v30Stab">88%</b></span><span>Respiration <b id="v30Breaths">0/5</b></span></div><div class="meter cold"><i id="v30ScanBar"></i></div><button class="btn secondary" id="v30Breathe" style="margin-top:12px">Caler la respiration</button><p class="caption" id="v30MRICopy">Tape quand l’anneau devient doré.</p></div>'+skip(1)
    );
    wireSkip(1);
    $('#v30Nose').onclick=()=>{stability-=12;vib(10);toast('Le nez gagne. Le scanner ajoute “mouvement artistique”.')};
    $('#v30Itch').onclick=()=>{stability-=15;vib(10);toast('Très mauvaise idée. Le logiciel transforme le tatouage en “NEW… YOR?”.')};
    $('#v30Breathe').onclick=()=>{
      if(windowOpen){breaths++;stability=Math.min(100,stability+4);vib(7);toast(breaths===5?'Cinquième respiration. Le scanner rend les armes.':'Timing propre.')}
      else{stability-=7;toast('Pas maintenant. Le bip vient de lever un sourcil imaginaire.')}
      $('#v30Breaths').textContent=breaths+'/5';$('#v30Stab').textContent=Math.max(0,Math.round(stability))+'%'
    };
    const loop=t=>{
      const ring=$('#v30BreathRing');if(!ring?.isConnected||finished)return;
      const ph=((t-start)%2100)/2100,scale=.73+Math.sin(ph*Math.PI)*.55;
      ring.style.transform='translate(-50%,-50%) scale('+scale+')';
      windowOpen=scale>1.08&&scale<1.2;ring.classList.toggle('gold',windowOpen);
      const dt=Math.min(40,t-last)/16;last=t;scan+=.12*dt;stability-=.01*dt;
      $('#v30ScanBar').style.width=Math.min(100,scan)+'%';$('#v30Stab').textContent=Math.max(0,Math.round(stability))+'%';
      if(scan>47&&!revealed){revealed=true;$('#v30ScanGhost').classList.add('show');$('#v30MRICopy').textContent='Le logiciel vient de “reconstruire” un détail du premier jour.';toast('NEW YORK ? Le scanner vient de fouiller dans le dossier.')}
      if(scan>=100||breaths>=5){finished=true;toast(stability>65?'IRM terminé. Immobilité franchement suspecte.':'IRM terminé. Le tatouage demande un second avis graphique.');setTimeout(()=>complete(1),850);return}
      requestAnimationFrame(loop)
    };
    requestAnimationFrame(loop)
  };

  physioGame = function(){
    let round=0,score=0,holding=false,start=0,target=0,steady=50;
    const moves=[
      ['Flamant administratif','🦩',950,1350,'Garde la pose sans transformer ton genou en formulaire administratif.'],
      ['Chaise invisible de la CAF','🪑',1050,1500,'La chaise n’existe pas. La brûlure dans les cuisses, conceptuellement, si.'],
      ['Pont très optimiste','🌉',800,1250,'Le pont tient avec du gainage et une confiance probablement excessive.'],
      ['Chat qui regrette ses choix','🐈',900,1350,'Hamoud refuse l’exercice mais participe au jugement.'],
      ['Respiration « je vais bien »','😮‍💨',1150,1650,'Inspire. Expire. Dire “ça va” reste facultatif.']
    ];
    screen(
      top(2)+hero('Trace 03','Kiné : protocole très officiel','Tiens chaque pose dans la bonne fenêtre tout en gardant l’équilibre.')+
      '<div class="v30-physio"><div class="v30-physio-grid"></div><div id="v30Pose" class="v30-pose">🦩</div><div class="v30-mirror"></div><div class="v30-balance"><span>gauche</span><div><i id="v30Needle"></i></div><span>droite</span></div><button class="v30-physio-cat" id="v30PhysioCat">🐈</button></div>'+
      '<div class="card"><div class="hud"><span>Exercice <b id="v30PR">1/5</b></span><span>Validés <b id="v30PS">0</b></span></div><h3 id="v30PName"></h3><p class="caption" id="v30PText"></p><button class="btn" id="v30Hold">Maintenir la pose</button><div class="meter" style="margin-top:12px"><i id="v30PoseBar"></i></div></div>'+skip(2)
    );
    wireSkip(2);
    $('#v30PhysioCat').onclick=()=>toast('Hamoud donne 3/10 à la posture. Aucun diplôme fourni.');
    const btn=$('#v30Hold'),bar=$('#v30PoseBar'),needle=$('#v30Needle');
    const draw=()=>{
      if(round>=moves.length){toast(score>=4?'Le kiné imaginaire est obligé d’admettre que c’était propre.':'Séance terminée. La dignité a fait ce qu’elle a pu.');setTimeout(()=>complete(2),850);return}
      const m=moves[round];target=m[2]+Math.random()*(m[3]-m[2]);steady=50;
      $('#v30PR').textContent=(round+1)+'/5';$('#v30PS').textContent=score;$('#v30PName').textContent=m[0];$('#v30PText').textContent=m[4];$('#v30Pose').textContent=m[1];bar.style.width='0%';needle.style.left='50%';btn.disabled=false;btn.textContent='Maintenir la pose'
    };
    btn.onpointerdown=e=>{
      e.preventDefault();if(holding)return;holding=true;start=performance.now();btn.textContent='Tiens…';
      const anim=()=>{
        if(!holding||!btn.isConnected)return;
        const elapsed=performance.now()-start;
        steady=50+Math.sin(elapsed/125)*16+Math.sin(elapsed/260)*5;
        needle.style.left=steady+'%';bar.style.width=Math.min(100,elapsed/target*100)+'%';
        requestAnimationFrame(anim)
      };anim()
    };
    const release=()=>{
      if(!holding)return;holding=false;
      const elapsed=performance.now()-start,ratio=elapsed/target,balance=Math.abs(steady-50);
      const good=ratio>.82&&ratio<1.2&&balance<20;
      if(good){score++;vib(7);toast(['Timing propre.','Équilibre validé. Hamoud retire une objection.','Exercice homologué sans formulaire.'][round%3])}
      else toast(ratio<.82?'Trop court. La pose n’avait même pas fini de se plaindre.':ratio>1.2?'Trop long. On était sur un exercice, pas un bail.':'Le timing était bon, mais l’équilibre a déposé une réclamation.');
      round++;setTimeout(draw,500)
    };
    btn.onpointerup=release;btn.onpointercancel=release;btn.onpointerleave=release;draw()
  };

  operationGame = function(){
    let phase=0,alignment=50,monitor=72,toolFound=false,pattern=[],closed=false;
    const stitchGoal=[1,3,2,4];
    screen(
      top(3)+hero('Trace 04','Bloc fictif : dos neuf','Puzzle volontairement absurde. Aucun geste médical réel à reproduire.')+
      '<div class="v30-op"><div class="v30-op-lights"></div><div class="v30-op-monitor"><span>♥</span><b id="v30Pulse">72</b><small id="v30Wave">⌁⌁⌁⌁</small></div><div class="v30-spine"><div>L4</div><i id="v30Disc">●</i><div>L5</div></div><button class="v30-op-cat" id="v30OpCat">🐈</button><div id="v30OpTool" class="v30-op-tool">🔧</div></div>'+
      '<div class="card"><div class="hud"><span id="v30OpPhase">1/4 · ALIGNER</span><span>Moniteur <b id="v30Monitor">72</b></span></div><div id="v30OpControls"><input id="v30Align" type="range" min="0" max="100" value="50" style="width:100%"><div class="actions two" style="margin-top:12px"><button class="btn secondary" id="v30OpAction">Valider</button><button class="btn secondary" id="v30OpCalm">Respiration guidée</button></div></div><p class="caption" id="v30OpCopy">Centre le disque dans la zone stable.</p></div>'+skip(3)
    );
    wireSkip(3);
    const range=$('#v30Align');
    const refresh=()=>{$('#v30Monitor').textContent=Math.round(monitor);$('#v30Pulse').textContent=Math.round(monitor);$('#v30Wave').textContent=monitor>=78&&monitor<=86?'⌁⌁⌁⌁':'⌁╲⌁╱'};
    range.oninput=()=>{alignment=+range.value;$('#v30Disc').style.transform='translateX('+(alignment-50)*1.65+'px)'};
    $('#v30OpCat').onclick=()=>{
      if(phase===1&&!toolFound){toolFound=true;$('#v30OpTool').classList.add('visible');toast('Hamoud avait l’outil. Sous lui. Depuis le début.');vib(8)}
      else toast('Consultant félin : non certifié, très sûr de lui.')
    };
    $('#v30OpCalm').onclick=()=>{
      if(phase!==2)return toast('Pas encore. Le moniteur n’a pas commencé son drame.');
      if(monitor<80)monitor+=4;else if(monitor>84)monitor-=4;else monitor+=(Math.random()>.5?1:-1);
      refresh();toast(monitor>=78&&monitor<=86?'Zone stable. Le bip redevient fréquentable.':'Ça se rapproche.')
    };
    $('#v30OpAction').onclick=()=>{
      if(closed)return;
      if(phase===0){
        if(Math.abs(alignment-50)>8){monitor=Math.max(60,monitor-4);refresh();return toast('Trop décalé. Le chirurgien accuse déjà le matériel.')}
        phase=1;range.disabled=true;$('#v30OpPhase').textContent='2/4 · OUTIL MANQUANT';$('#v30OpCopy').textContent='Quelqu’un de poilu est assis sur quelque chose.';toast('Alignement validé.')
      }else if(phase===1){
        if(!toolFound)return toast('L’outil manque toujours. Le chat évite le contact visuel.');
        phase=2;monitor=70;refresh();$('#v30OpPhase').textContent='3/4 · STABILISER';$('#v30OpCopy').textContent='Ramène le moniteur entre 78 et 86.';$('#v30OpAction').textContent='Tester la stabilité'
      }else if(phase===2){
        if(monitor<78||monitor>86)return toast('Pas encore. Vise 78–86.');
        phase=3;$('#v30OpPhase').textContent='4/4 · FERMETURE';$('#v30OpCopy').textContent='Mémorise puis reproduis la séquence de fermeture fictive.';$('#v30OpAction').style.display='none';$('#v30OpCalm').style.display='none';range.style.display='none';
        const box=document.createElement('div');box.className='v30-stitch-grid';box.innerHTML=[1,2,3,4].map(n=>'<button data-v30stitch="'+n+'">'+n+'</button>').join('')+'<button class="btn secondary" id="v30ShowStitch">Voir la séquence</button>';$('#v30OpControls').append(box);
        $('#v30ShowStitch').onclick=async()=>{
          pattern=[];for(const n of stitchGoal){const b=$('[data-v30stitch="'+n+'"]');b.classList.add('flash');await sleep(330);b.classList.remove('flash');await sleep(100)}toast('À toi.')
        };
        $$('[data-v30stitch]').forEach(b=>b.onclick=()=>{
          const n=+b.dataset.v30stitch,k=pattern.length;pattern.push(n);b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),180);
          if(n!==stitchGoal[k]){pattern=[];toast('Séquence refusée. Même le bloc fictif a des standards.');return}
          if(pattern.length===stitchGoal.length){closed=true;toast('Bloc fictif terminé. Le chirurgien rend enfin l’outil à quelqu’un de qualifié.');setTimeout(()=>complete(3),900)}
        })
      }
    }
  };

  bedtimeGame = function(){
    let q=0,sleepiness=18,requests=0;
    const reactions=[
      ['Mini verre accordé. Paix mondiale pour 11 secondes.','Elle te regarde comme si tu venais d’inventer la sécheresse.','Mehdi est officiellement incompétent en diplomatie hydrique.'],
      ['Bonne décision. Elle avait en fait envie à 97%.','Attendre les 38% restants : stratégie statistiquement audacieuse.','Le calcul est refusé par la Cour du coucher.'],
      ['Pied gauche libéré. Le droit demande les mêmes avantages.','Échange de pieds : l’anatomie refuse de signer.','Réunion des pieds reportée.'],
      ['Doudou rassuré. Il réclame maintenant un verre d’eau.','Plainte du doudou pour management toxique.','Hamoud accepte le poste puis quitte son service.'],
      ['Contrôle rapide : rien. Donc évidemment c’était terrifiant.','L’imitation du bruit ne clarifie absolument rien.','La maison entend qu’on parle d’elle. Mauvaise idée.'],
      ['Réponse raisonnable. Le poisson attendra demain.','Cours d’osmose à cette heure : décision ambitieuse.','Mehdi consulté. Erreur stratégique immédiate.'],
      ['Expérience lancée : dormir très fort.','Le temps refuse la négociation.','La sieste espagnole demande des droits d’auteur.']
    ];
    screen(
      top(12)+hero('Trace 13','Opération dodo','Sept questions, une jauge de sommeil et un parquet qui attend ton erreur.')+
      '<div class="v30-bedroom" id="v30Bedroom"><div class="v30-night-window"><div class="v30-moon">☾</div><div id="v30Stars"></div></div><div class="v30-bed">🛏️<span id="v30Girl">👧🏻</span><span class="v30-plush">🐷</span></div><div class="v30-door">🚪</div><button class="v30-bed-cat" id="v30BedCat">🐈</button></div>'+
      '<div class="card"><div class="hud"><span>Sommeil <b id="v30Sleep">18%</b></span><span>Demandes <b id="v30Req">0</b></span></div><div class="meter"><i id="v30SleepBar" style="width:18%"></i></div><div id="v30BedQ" style="margin-top:14px"></div></div>'+skip(12)
    );
    wireSkip(12);
    $('#v30BedCat').onclick=()=>toast('Hamoud a accepté le rôle de veilleur de nuit. Il dort déjà.');

    const draw=()=>{
      $('#v30Sleep').textContent=Math.min(100,sleepiness)+'%';$('#v30SleepBar').style.width=Math.min(100,sleepiness)+'%';$('#v30Req').textContent=requests;
      $('#v30Bedroom').style.filter='brightness('+(1-Math.min(.34,sleepiness/300))+')';
      if(q>=QGIRL.length)return prepStealth();
      const z=QGIRL[q];
      $('#v30BedQ').innerHTML='<div class="dialogue"><div class="avatar">👧🏻</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-v30bq="'+j+'">'+x+'</button>').join('')+'</div>';
      $$('[data-v30bq]').forEach(b=>b.onclick=()=>{
        const j=+b.dataset.v30bq;requests++;sleepiness+=j===0?13:j===1?8:5;vib(5);toast(reactions[q][j],2800);
        if(q%2===0){const star=document.createElement('i');star.style.left=(15+Math.random()*70)+'%';star.style.top=(12+Math.random()*55)+'%';$('#v30Stars').append(star)}
        $('#v30Girl').animate([{transform:'translateY(0)'},{transform:'translateY(-10px)'},{transform:'translateY(0)'}],{duration:380});
        q++;setTimeout(draw,560)
      })
    };

    function prepStealth(){
      $('#v30BedQ').innerHTML='<div class="eyebrow">PHASE 2 · SORTIE FURTIVE</div><p>Elle dort. Maintenant, évite le doudou au sol, la latte qui grince et Hamoud.</p><div class="v30-stealth"><div class="v30-stealth-path"></div><div class="v30-stealth-foot" id="v30Foot">🦶</div><div class="v30-danger z1">🧸</div><div class="v30-danger z2">▦</div><div class="v30-danger z3">🐈</div></div><button class="btn secondary" id="v30Step" style="margin-top:12px">Faire un petit pas</button><p class="caption">Le bouton respire. Tape quand il est petit.</p>';
      let pos=0,noise=0,safe=false,t0=performance.now();
      const btn=$('#v30Step');
      const pulse=()=>{
        if(!btn?.isConnected)return;
        const ph=((performance.now()-t0)%1500)/1500,scale=.74+Math.sin(ph*Math.PI)*.66;
        btn.style.transform='scale('+scale+')';safe=scale<.94;requestAnimationFrame(pulse)
      };pulse();
      btn.onclick=()=>{
        if(safe){pos+=19;toast('Silence parfait. Même le parquet est vexé.')}
        else{noise++;pos+=9;vib(14);toast(noise===1?'CRAC. Tout le monde reste immobile.':'Hamoud ouvre un œil. Situation diplomatique critique.')}
        $('#v30Foot').style.left=Math.min(90,pos)+'%';
        if(pos>=90){toast('Sortie réussie. Puis une petite voix : « Maman… les poissons ils ont soif ? »');setTimeout(()=>complete(12),1000)}
      }
    }
    draw()
  };

  heroKidGame = function(){
    let q=0,power=20,got=0;
    const gear=['🦸 Cape','🥷 Masque','📡 Gadget','🍎 Snack','⭐ Badge','🧸 Doudou secret défense'];
    screen(
      top(13)+hero('Trace 14','Mission super-héros','Sept questions philosophiques, six équipements et un mini combat final absolument essentiel.')+
      '<div class="v30-hero-room"><div class="v30-city">▥ ▦ ▥</div><div class="v30-hero-beam"></div><div id="v30HeroBoy" class="v30-hero-boy">🦸🏻‍♂️</div><button id="v30HeroCat" class="v30-hero-cat">🐈‍⬛</button><div class="v30-villain" id="v30Villain">☁</div></div>'+
      '<div class="card"><div class="hud"><span>Puissance <b id="v30Power">20%</b></span><span>Questions <b id="v30HQ">0/7</b></span></div><div class="meter cold"><i id="v30PowerBar" style="width:20%"></i></div><div id="v30HeroQ" style="margin-top:14px"></div></div>'+skip(13)
    );
    wireSkip(13);
    const comments=[
      ['Pyjama officiellement compatible avec l’héroïsme.','Doublement habillé, donc impossible à coucher.','Réponse diplomatique parfaite.'],
      ['Même les héros mangent les légumes. Tragédie validée.','Le ministère des brocolis ouvre une enquête.','Carotte héroïque homologuée.'],
      ['Exact. Maman sait. Ne demande pas comment.','Google Maps demande un crédit au générique.','Secret défense accepté.'],
      ['Le doudou reçoit son habilitation confidentiel-défense.','La Ligue des Super-Doudous fait appel.','Cape ajoutée : promotion immédiate.'],
      ['Hamoud devient identité secrète. Il refuse le costume.','Réponse juridique féline mais correcte.','Clause “la nuit uniquement” enregistrée.'],
      ['La Terre remercie de ne pas tester ça dans le salon.','Demain refuse toujours d’accélérer.','Responsabilité transférée à une planète.'],
      ['Le dinosaure invisible proteste.','Le robot savait. C’est déjà beaucoup.','Enfin une réponse honnête.']
    ];

    const draw=()=>{
      $('#v30Power').textContent=Math.min(100,power)+'%';$('#v30PowerBar').style.width=Math.min(100,power)+'%';$('#v30HQ').textContent=q+'/7';
      if(q>=QBOY.length)return inventory();
      const z=QBOY[q];
      $('#v30HeroQ').innerHTML='<div class="dialogue"><div class="avatar">🦸🏻‍♂️</div><div class="bubble">'+z[0]+'</div></div><div class="choices" style="margin-top:12px">'+z[1].map((x,j)=>'<button class="choice" data-v30hq="'+j+'">'+x+'</button>').join('')+'</div>';
      $$('[data-v30hq]').forEach(b=>b.onclick=()=>{
        const j=+b.dataset.v30hq;power+=j===2?12:9;vib(5);toast(comments[q][j],2600);q++;setTimeout(draw,520)
      })
    };

    function inventory(){
      $('#v30HeroQ').innerHTML='<div class="eyebrow">ÉQUIPEMENT AVANT DÉPART</div><div class="item-grid">'+gear.map((x,i)=>'<button class="item big" data-v30gear="'+i+'">'+x+'</button>').join('')+'</div><p class="caption">Le masque n’est pas vraiment perdu. Regarde le chat.</p>';
      $$('[data-v30gear]').forEach(b=>b.onclick=()=>{
        const n=+b.dataset.v30gear;
        if(n===1&&!$('#v30HeroCat').classList.contains('caught'))return toast('Masque introuvable. Le chat évite soigneusement ton regard.');
        if(b.disabled)return;b.disabled=true;b.classList.add('selected');got++;power=Math.min(100,power+4);$('#v30Power').textContent=power+'%';$('#v30PowerBar').style.width=power+'%';
        toast(got===gear.length?'Équipement complet. Le méchant fictif regrette déjà sa journée.':'Objet sécurisé.');
        if(got===gear.length)setTimeout(finalFight,600)
      });
      $('#v30HeroCat').onclick=()=>{$('#v30HeroCat').classList.add('caught');$('#v30HeroCat').textContent='🐈';toast('Masque récupéré. Hamoud affirme qu’il “le gardait”.')}
    }

    function finalFight(){
      let step=0;const goal=['shield','jump','beam'];
      $('#v30Villain').classList.add('active');
      $('#v30HeroQ').innerHTML='<div class="eyebrow">COMBAT FINAL</div><p class="caption">Le nuage-méchant attaque. Trois actions dans le bon ordre.</p><div class="choices"><button class="choice" data-v30fight="beam">⚡ Rayon</button><button class="choice" data-v30fight="shield">🛡️ Bouclier</button><button class="choice" data-v30fight="jump">🦘 Super-saut</button></div>';
      $$('[data-v30fight]').forEach(b=>b.onclick=()=>{
        const k=b.dataset.v30fight;
        if(k!==goal[step]){step=0;toast('Le méchant profite de cette stratégie très créative. Recommence.');return}
        step++;b.classList.add('good');vib(7);
        toast(['Bouclier levé.','Super-saut validé.','Rayon final. Beaucoup trop dramatique.'][step-1]);
        if(step===goal.length){$('#v30Villain').classList.add('defeated');$('#v30HeroBoy').classList.add('victory');setTimeout(()=>complete(13),900)}
      })
    }
    draw()
  };
})();


/* ===== V31 WORKS & CAR IMMERSION ===== */
(()=>{
  const wait=ms=>new Promise(r=>setTimeout(r,ms));

  cellarGame = function(){
    const items=[
      ['Câbles “au cas où”','cables','🔌','GARAGE'],
      ['Décorations','deco','🎄','DÉCO'],
      ['Pot de peinture suspect','paint','🎨','TRAVAUX'],
      ['Objet dont personne ne connaît la fonction','mystery','🧩','MYSTÈRE'],
      ['Outils','tools','🪛','TRAVAUX'],
      ['Carton vide qu’on garde quand même','box','📦','GARAGE'],
      ['Encore des câbles','cables','🔌','GARAGE'],
      ['Hamoud dans un carton','cat','🐈','MYSTÈRE']
    ];
    let selected=null,done=0,streak=0,bonus=25,timer=null;
    screen(
      top(5)+hero('Trace 06','La cave de l’enfer','Éclaire, sélectionne, range. Le vrai danger : entendre Mehdi dire « on a bien géré » à la fin.')+
      '<div class="v31-cellar" id="v31Cellar">'+
        '<div class="v31-cellar-light" id="v31CellarLight"></div>'+
        '<div class="v31-shelves"></div>'+
        '<div class="v31-cellar-items">'+items.map((x,i)=>'<button class="v31-cellar-item" data-v31ci="'+i+'" style="--x:'+(8+(i%4)*23)+'%;--y:'+(24+Math.floor(i/4)*38)+'%"><span>'+x[2]+'</span><b>'+x[0]+'</b></button>').join('')+'</div>'+
        '<div class="v31-cellar-mehdi">MEHDI<br><small>arrive à 98%</small></div>'+
      '</div>'+
      '<div class="v31-bins">'+['GARAGE','DÉCO','TRAVAUX','MYSTÈRE'].map(x=>'<button data-v31bin="'+x+'">'+x+'</button>').join('')+'</div>'+
      '<div class="card"><div class="hud"><span id="v31CellDone">0/8 rangés</span><span id="v31Streak">série 0</span><span id="v31Bonus">bonus 25s</span></div><p class="caption">Bouge le pointeur dans la cave pour déplacer la lampe. Puis touche un objet et son bac.</p></div>'+skip(5)
    );
    wireSkip(5);
    const room=$('#v31Cellar'),light=$('#v31CellarLight');
    room.onpointermove=e=>{
      const r=room.getBoundingClientRect();
      light.style.setProperty('--lx',((e.clientX-r.left)/r.width*100)+'%');
      light.style.setProperty('--ly',((e.clientY-r.top)/r.height*100)+'%')
    };
    timer=setInterval(()=>{
      if(!$('#v31Bonus'))return clearInterval(timer);
      bonus=Math.max(0,bonus-1);$('#v31Bonus').textContent=bonus?'bonus '+bonus+'s':'bonus expiré'
    },1000);

    $$('[data-v31ci]').forEach(b=>b.onclick=()=>{
      if(b.disabled)return;
      $$('[data-v31ci]').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');selected=+b.dataset.v31ci;
      if(items[selected][1]==='cat')toast('Hamoud vient de s’auto-déclarer “objet de direction”.')
    });
    $$('[data-v31bin]').forEach(bin=>bin.onclick=()=>{
      if(selected===null)return toast('Choisis d’abord un objet. Sinon tu ranges le concept, pas la cave.');
      const item=items[selected],ok=bin.dataset.v31bin===item[3];
      if(!ok){streak=0;$('#v31Streak').textContent='série 0';return toast(item[1]==='cat'?'Hamoud refuse. Il souhaite “MYSTÈRE” pour des raisons fiscales.':'Non. La cave vient de faire un petit bruit de désapprobation.')}
      const b=$('[data-v31ci="'+selected+'"]');b.disabled=true;b.classList.remove('selected');b.classList.add('sorted');
      done++;streak++;$('#v31CellDone').textContent=done+'/8 rangés';$('#v31Streak').textContent='série '+streak;
      bin.classList.add('hit');setTimeout(()=>bin.classList.remove('hit'),220);
      selected=null;vib(6);
      toast(done===8?(bonus>0?'Cave rangée avec bonus. Mehdi apparaît exactement à temps pour dire « nickel ».':'Cave rangée. Mehdi arrive après l’effort avec une confiance intacte.'):'Rangé. La cave récupère un mètre carré de dignité.');
      if(done===8){
        clearInterval(timer);S.choices.v31_cellar={bonus:bonus>0,streak};save();
        setTimeout(()=>complete(5),1000)
      }
    })
  };

  architectGame = function(){
    let round=0,sat=50,budget=100;
    const reqs=[
      ['Cuisine ouverte, mais intime.',['Tout ouvrir','Demi-cloison','Tout fermer'],1,'wall'],
      ['Beaucoup de lumière, peu de nouvelles fenêtres.',['Percer partout','Miroirs + tons clairs','Éteindre le soleil'],1,'light'],
      ['Méditerranéen, mais pas “vacances”.',['Terre cuite partout','Bois clair + minéral','Palmier gonflable'],1,'material'],
      ['Beaucoup de rangement, rien de visible.',['Placards intégrés','Tout en cave','Ne rien posséder'],0,'storage'],
      ['Finalement… on remet un mur ?',['Mur partiel structurant','On ignore le client','Démission immédiate'],0,'return']
    ];
    screen(
      top(6)+hero('Trace 07','Architecte catastrophe','Le plan évolue en direct. Le client aussi, malheureusement.')+
      '<div class="v31-architect">'+
        '<div class="v31-blueprint" id="v31Blueprint">'+
          '<div class="v31-room-label kitchen">CUISINE</div><div class="v31-room-label living">SÉJOUR</div>'+
          '<div class="v31-plan-wall" id="v31Wall"></div><div class="v31-plan-window" id="v31Window"></div>'+
          '<div class="v31-plan-storage" id="v31Storage">RANGEMENT</div><div class="v31-plan-table">TABLE</div>'+
          '<div class="v31-material-swatch" id="v31Material"></div>'+
        '</div>'+
        '<div class="v31-client"><span>🙂</span><small id="v31ClientMood">« intéressant… »</small></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span>Satisfaction <b id="v31Sat">50%</b></span><span>Budget fictif <b id="v31Budget">100</b></span><span id="v31ArchRound">1/5</span></div><div class="meter"><i id="v31SatBar" style="width:50%"></i></div><div id="v31ArchQ" style="margin-top:14px"></div></div>'+skip(6)
    );
    wireSkip(6);

    const draw=()=>{
      if(round>=reqs.length){
        S.choices.v31_architect={sat,budget};save();
        $('#v31ClientMood').textContent=sat>=75?'« c’est exactement ça… pour aujourd’hui. »':'« j’avais imaginé autre chose… mais quoi ? »';
        toast(sat>=70?'Plan validé. Le client veut le modifier demain à 8h12.':'Plan terminé. Le client demande un moodboard du contraire.');
        return setTimeout(()=>complete(6),950)
      }
      const r=reqs[round];$('#v31ArchRound').textContent=(round+1)+'/5';
      $('#v31ArchQ').innerHTML='<div class="eyebrow">DEMANDE '+(round+1)+'</div><h3>'+r[0]+'</h3><div class="choices">'+r[1].map((x,j)=>'<button class="choice" data-v31ar="'+j+'">'+x+'</button>').join('')+'</div>';
      $$('[data-v31ar]').forEach(b=>b.onclick=()=>{
        const j=+b.dataset.v31ar,correct=j===r[2];
        sat=Math.max(5,Math.min(98,sat+(correct?11:-7)));budget=Math.max(15,budget-(j===0?14:j===1?9:4));
        $('#v31Sat').textContent=sat+'%';$('#v31SatBar').style.width=sat+'%';$('#v31Budget').textContent=budget;
        $('#v31ClientMood').textContent=correct?'« oui… exactement. »':'« hmm… pas tout à fait. »';
        if(r[3]==='wall')$('#v31Wall').className='v31-plan-wall '+(['open','half','closed'][j]);
        if(r[3]==='light')$('#v31Window').classList.toggle('bright',j===1);
        if(r[3]==='material')$('#v31Material').className='v31-material-swatch '+(['terracotta','mineral','palm'][j]);
        if(r[3]==='storage')$('#v31Storage').classList.toggle('integrated',j===0);
        if(r[3]==='return')$('#v31Wall').classList.add(j===0?'returned':'confused');
        toast(correct?'Le plan respire. Le client aussi, temporairement.':'Le client vient de dire « je pensais à autre chose » sans savoir quoi.');
        round++;setTimeout(draw,500)
      })
    };
    draw()
  };

  paintingGame = function(){
    let coverage=0,drips=0,paws=0,pawsSpawned=false,phase='mask',down=false,masked=0,lastX=0,lastY=0,lastT=0,done=false;
    screen(
      top(7)+hero('Trace 08','Peinture fraîche','Prépare les bords, peins le mur, nettoie Hamoud, puis passe l’inspection finale.')+
      '<div class="v31-paint-room">'+
        '<div class="v31-paint-edge top"></div><div class="v31-paint-edge left"></div><div class="v31-paint-edge right"></div><div class="v31-paint-edge bottom"></div>'+
        '<canvas id="v31Paint" width="700" height="520"></canvas><div id="v31Paws"></div>'+
        '<div class="v31-paint-cat">🐈</div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v31PaintPhase">1/3 · protéger</span><span>Couverture <b id="v31Cov">0%</b></span><span>Coulures <b id="v31Drips">0</b></span></div><div class="meter"><i id="v31PaintBar"></i></div><div id="v31PaintControls"><p class="caption">Touche les quatre bords pour poser le ruban de masquage.</p></div></div>'+skip(7)
    );
    wireSkip(7);
    const cv=$('#v31Paint'),ctx=cv.getContext('2d');ctx.fillStyle='#d8d2ca';ctx.fillRect(0,0,700,520);

    $$('.v31-paint-edge').forEach(edge=>edge.onclick=()=>{
      if(phase!=='mask'||edge.classList.contains('masked'))return;
      edge.classList.add('masked');masked++;vib(4);
      if(masked===4){phase='paint';$('#v31PaintPhase').textContent='2/3 · peindre';$('#v31PaintControls').innerHTML='<p class="caption">Peins au doigt. Va trop lentement au même endroit et ça coule.</p>';toast('Bords protégés. Hamoud étudie déjà une violation du chantier.')}
    });

    const maybeFinish=()=>{
      if(done||coverage<100||paws>0||phase!=='paint')return;
      phase='inspect';$('#v31PaintPhase').textContent='3/3 · inspection';
      $('#v31PaintControls').innerHTML='<p class="caption">Le mur est couvert. Trouve les trois petites zones à retoucher.</p><div class="v31-inspection"><button data-v31spot="0"></button><button data-v31spot="1"></button><button data-v31spot="2"></button></div>';
      let spots=0;$$('[data-v31spot]').forEach(b=>b.onclick=()=>{if(b.disabled)return;b.disabled=true;b.classList.add('fixed');spots++;toast(spots===3?'Inspection validée. Aucun défaut officiellement visible.':'Retouche faite.');if(spots===3){done=true;S.choices.v31_paint={drips};save();setTimeout(()=>complete(7),900)}})
    };

    const paint=e=>{
      if(!down||done||phase!=='paint')return;
      const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*700/r.width,y=(e.clientY-r.top)*520/r.height,now=performance.now(),dist=Math.hypot(x-lastX,y-lastY);
      ctx.strokeStyle='#8d6d78';ctx.lineWidth=44;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(lastX||x,lastY||y);ctx.lineTo(x,y);ctx.stroke();
      coverage=Math.min(100,coverage+.34+dist/245);
      if(now-lastT<48&&dist<9&&Math.random()>.87){drips++;ctx.fillStyle='#765762';ctx.fillRect(x-3,y,6,36+Math.random()*52);$('#v31Drips').textContent=drips}
      lastX=x;lastY=y;lastT=now;$('#v31Cov').textContent=Math.floor(coverage)+'%';$('#v31PaintBar').style.width=coverage+'%';
      if(coverage>50&&!pawsSpawned)spawnPaws();maybeFinish()
    };
    cv.onpointerdown=e=>{down=true;lastX=0;lastY=0;paint(e)};cv.onpointermove=paint;cv.onpointerup=()=>down=false;cv.onpointercancel=()=>down=false;

    function spawnPaws(){
      pawsSpawned=true;paws=4;toast('Hamoud vient de traverser la peinture. Il appelle ça une collaboration.');
      $('#v31Paws').innerHTML=[[22,34],[42,47],[62,55],[78,38]].map((p,i)=>'<button data-v31paw="'+i+'" style="left:'+p[0]+'%;top:'+p[1]+'%">🐾</button>').join('');
      $$('[data-v31paw]').forEach(b=>b.onclick=()=>{if(b.disabled)return;b.disabled=true;b.classList.add('cleaned');paws--;toast(paws?'Une patte de moins. L’artiste proteste.':'Pattes nettoyées. Hamoud quitte le chantier sans facture.');maybeFinish()})
    }
  };

  sinkGame = function(){
    let step=0,washerFound=false,pressure=50;
    const sequence=['basin','tap','washer','trap','pipes'];
    screen(
      top(8)+hero('Trace 09','Le lavabo','Monte vraiment les éléments, retrouve le joint volé, puis diagnostique le grand mensonge rouge/bleu.')+
      '<div class="v31-sink">'+
        '<div class="v31-sink-wall"></div><div class="v31-sink-basin" id="v31Basin">◡</div>'+
        '<div class="v31-faucet-slot" id="v31TapSlot"></div><div class="v31-drain-slot" id="v31DrainSlot"></div><div class="v31-pipe-slot" id="v31PipeSlot"></div>'+
        '<button class="v31-sink-cat" id="v31SinkCat">🐈</button><div class="v31-water" id="v31Water"></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v31SinkPhase">1/3 · montage</span><span>Pression <b id="v31Pressure">50%</b></span></div><div class="v31-parts">'+
        '<button data-v31part="basin">🛁<small>vasque</small></button><button data-v31part="tap">🚰<small>robinet</small></button><button data-v31part="washer">⭕<small>joint</small></button><button data-v31part="trap">〰️<small>siphon</small></button><button data-v31part="pipes">🔴🔵<small>raccords</small></button>'+
      '</div><div id="v31SinkExtra"></div></div>'+skip(8)
    );
    wireSkip(8);
    $('#v31SinkCat').onclick=()=>{
      if(step>=2&&!washerFound){washerFound=true;$('#v31SinkCat').classList.add('moved');toast('Sous Hamoud : le joint. Évidemment.');$('[data-v31part="washer"]').classList.add('found')}
      else toast('Hamoud refuse de commenter les pièces qu’il possède éventuellement.')
    };
    $$('[data-v31part]').forEach(b=>b.onclick=()=>{
      const p=b.dataset.v31part,expected=sequence[step];
      if(p!==expected)return toast('Pas encore. Mehdi propose de “tester quand même”. Proposition refusée.');
      if(p==='washer'&&!washerFound)return toast('Le joint manque. Le chat est beaucoup trop immobile.');
      b.disabled=true;b.classList.add('installed');step++;vib(5);
      if(p==='tap')$('#v31TapSlot').textContent='🚰';
      if(p==='washer')$('#v31DrainSlot').textContent='⭕';
      if(p==='trap')$('#v31PipeSlot').textContent='〰️';
      if(step===sequence.length)pressureTest();
      else toast('Pièce posée. Pour l’instant, personne ne fuit.')
    });

    function pressureTest(){
      $('#v31SinkPhase').textContent='2/3 · pression';
      $('#v31SinkExtra').innerHTML='<p class="caption">Monte la pression dans la zone verte sans dépasser.</p><input id="v31PressureRange" type="range" min="0" max="100" value="50" style="width:100%"><button class="btn" id="v31PressureGo" style="margin-top:10px">Tester</button>';
      const r=$('#v31PressureRange');r.oninput=()=>{pressure=+r.value;$('#v31Pressure').textContent=pressure+'%';$('#v31Water').style.height=(pressure*.75)+'%'};
      $('#v31PressureGo').onclick=()=>{
        if(pressure<62)return toast('Pas assez. Même le filet d’eau manque de conviction.');
        if(pressure>78){$('#v31Water').classList.add('leak');return toast('Trop. Petite fuite fictive. Mehdi regarde ailleurs.')}
        $('#v31Water').classList.remove('leak');finalTest()
      }
    }
    function finalTest(){
      $('#v31SinkPhase').textContent='3/3 · chaud/froid';
      $('#v31SinkExtra').innerHTML='<div class="v31-temp-test"><button data-v31temp="red">🔴 ROUGE</button><button data-v31temp="blue">🔵 BLEU</button></div><p class="caption" id="v31TempCopy">Teste les deux commandes.</p><div id="v31TempFix"></div>';
      let tested=new Set();
      $$('[data-v31temp]').forEach(b=>b.onclick=()=>{
        tested.add(b.dataset.v31temp);
        toast(b.dataset.v31temp==='red'?'Le rouge sort… froid. Très bonne ambiance.':'Le bleu sort… chaud. Le lavabo ment avec assurance.');
        if(tested.size===2){
          $('#v31TempFix').innerHTML='<div class="choices"><button class="choice" data-v31fix="0">Appeler ça “thermique inversé premium”</button><button class="choice" data-v31fix="1">Inverser les deux repères</button><button class="choice" data-v31fix="2">Accuser la gravité</button></div>';
          $$('[data-v31fix]').forEach(x=>x.onclick=()=>{
            if(+x.dataset.v31fix!==1)return toast(+x.dataset.v31fix===0?'Marketing audacieux. Refusé.':'La gravité demande à quitter le groupe.');
            S.choices.v31_sink='reversed';save();toast('Corrigé. Mehdi annonce qu’il avait “justement un doute”.');setTimeout(()=>complete(8),850)
          })
        }
      })
    }
  };

  batteryGame = function(){
    let round=0,input=[],showing=false,mistakes=0;
    const patterns=[[0,2,1],[3,1,0,2],[1,3,2,0,1]];
    screen(
      top(9)+hero('Trace 10','Batterie : diagnostic abstrait','Aucune manipulation mécanique réelle : observe seulement la séquence lumineuse et reproduis-la.')+
      '<div class="v31-battery">'+
        '<div class="v31-battery-display"><span id="v31BatteryText">DIAGNOSTIC</span><b id="v31BatteryPct">34%</b></div>'+
        '<div class="v31-battery-core">⚡</div>'+
        '<div class="v31-battery-nodes">'+['A','B','C','D'].map((x,i)=>'<button data-v31bn="'+i+'" class="n'+i+'"><span>'+x+'</span></button>').join('')+'</div>'+
        '<div class="v31-battery-wave" id="v31BatteryWave"></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span>Manche <b id="v31BatRound">1/3</b></span><span id="v31BatState">mémoire</span><span>Erreurs <b id="v31BatErr">0</b></span></div><button class="btn" id="v31ShowBat">Afficher la séquence</button><p class="caption">Regarde. Attends. Reproduis. Rien de plus réel que ça.</p></div>'+skip(9)
    );
    wireSkip(9);
    const nodes=$('[data-v31bn]');
    const show=async()=>{
      if(showing)return;showing=true;input=[];$('#v31BatState').textContent='observe';$('#v31ShowBat').disabled=true;
      for(const n of patterns[round]){nodes[n].classList.add('flash');$('#v31BatteryWave').className='v31-battery-wave pulse';await wait(380);nodes[n].classList.remove('flash');$('#v31BatteryWave').className='v31-battery-wave';await wait(150)}
      showing=false;$('#v31BatState').textContent='à toi';$('#v31ShowBat').disabled=false
    };
    $('#v31ShowBat').onclick=show;
    nodes.forEach(b=>b.onclick=()=>{
      if(showing)return;
      const n=+b.dataset.v31bn,k=input.length;input.push(n);b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),160);
      if(n!==patterns[round][k]){mistakes++;$('#v31BatErr').textContent=mistakes;$('#v31BatteryText').textContent='ERREUR MÉMOIRE';toast('La voiture allume un voyant imaginaire uniquement pour être désagréable.');input=[];return}
      if(input.length===patterns[round].length){
        round++;$('#v31BatteryPct').textContent=(34+round*22)+'%';$('#v31BatteryText').textContent='SÉQUENCE OK';
        if(round>=patterns.length){S.choices.v31_battery={mistakes};save();toast('Diagnostic terminé. Démarrage fictif autorisé.');setTimeout(()=>complete(9),850)}
        else{$('#v31BatRound').textContent=(round+1)+'/3';$('#v31BatState').textContent='mémoire';toast('Manche suivante. La voiture augmente inutilement le niveau de difficulté.');setTimeout(show,600)}
      }
    });
    setTimeout(show,600)
  };

  cleanCarGame = function(){
    let phase=0,washed=0,interior=0,finalFound=false,down=false,vacuumed=0;
    const dirt=[];
    screen(
      top(10)+hero('Trace 11','Nettoyage voiture extrême','Lavage, intérieur, aspirateur, puis le fameux dernier 1 %.')+
      '<div class="v31-carwash" id="v31CarWash"><div class="v31-car-sky"></div><div class="v31-car-shell">🚙</div><canvas id="v31WashCanvas" width="700" height="430"></canvas></div>'+
      '<div class="card"><div class="hud"><span id="v31CleanPhase">1/4 · extérieur</span><span id="v31CleanPct">0%</span></div><div class="meter cold"><i id="v31CleanBar"></i></div><p class="caption" id="v31CleanCopy">Frotte la carrosserie.</p></div>'+skip(10)
    );
    wireSkip(10);
    const cv=$('#v31WashCanvas'),ctx=cv.getContext('2d');
    for(let i=0;i<120;i++){const x=75+Math.random()*550,y=105+Math.random()*245,r=5+Math.random()*17;dirt.push({x,y,r,alive:true})}
    const redraw=()=>{ctx.clearRect(0,0,700,430);for(const d of dirt){if(!d.alive)continue;ctx.fillStyle='rgba(76,58,44,.58)';ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()}};
    redraw();
    const clean=e=>{
      if(!down||phase!==0)return;
      const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*700/r.width,y=(e.clientY-r.top)*430/r.height;let hit=0;
      for(const d of dirt){if(d.alive&&Math.hypot(d.x-x,d.y-y)<46){d.alive=false;hit++}}
      if(hit){redraw();washed=dirt.filter(d=>!d.alive).length/dirt.length*100;$('#v31CleanPct').textContent=Math.min(99,Math.floor(washed))+'%';$('#v31CleanBar').style.width=Math.min(99,washed)+'%';if(washed>94)setTimeout(interiorPhase,400)}
    };
    cv.onpointerdown=e=>{down=true;clean(e)};cv.onpointermove=clean;cv.onpointerup=()=>down=false;cv.onpointercancel=()=>down=false;

    function interiorPhase(){
      if(phase!==0)return;phase=1;
      $('#v31CleanPhase').textContent='2/4 · intérieur';$('#v31CleanPct').textContent='0/7 objets';$('#v31CleanBar').style.width='0%';$('#v31CleanCopy').textContent='Ramasse tout ce qui n’a plus aucune défense crédible.';
      $('#v31CarWash').innerHTML='<div class="v31-car-interior"><div class="v31-dashboard">TABLEAU DE BORD</div>'+
        [['🧾','ticket',12,62],['🧦','chaussette',72,73],['🥤','gobelet',30,58],['🧻','lingette',83,42],['🍪','miette',48,80],['🧸','jouet',20,36],['🐈','poils Hamoud',62,34]].map((x,i)=>'<button data-v31trash="'+i+'" style="left:'+x[2]+'%;top:'+x[3]+'%"><span>'+x[0]+'</span><small>'+x[1]+'</small></button>').join('')+
      '</div>';
      $$('[data-v31trash]').forEach(b=>b.onclick=()=>{
        if(b.disabled)return;b.disabled=true;b.classList.add('gone');interior++;$('#v31CleanPct').textContent=interior+'/7 objets';$('#v31CleanBar').style.width=(interior/7*100)+'%';
        toast(interior===7?'Intérieur débarrassé. Maintenant, les miettes microscopiques veulent négocier.':'Retiré.');
        if(interior===7)setTimeout(vacuumPhase,500)
      })
    }

    function vacuumPhase(){
      phase=2;$('#v31CleanPhase').textContent='3/4 · aspirateur';$('#v31CleanPct').textContent='0/5 zones';$('#v31CleanBar').style.width='0%';$('#v31CleanCopy').textContent='Passe l’aspirateur sur les cinq zones.';
      $('#v31CarWash').innerHTML='<div class="v31-vacuum-scene"><div class="v31-seat s1"></div><div class="v31-seat s2"></div><div class="v31-floor"></div>'+
        [[16,66],[38,78],[59,68],[78,80],[54,48]].map((p,i)=>'<button data-v31vac="'+i+'" style="left:'+p[0]+'%;top:'+p[1]+'%">✦</button>').join('')+
        '<div class="v31-vacuum-head">▰</div></div>';
      $$('[data-v31vac]').forEach(b=>b.onclick=()=>{
        if(b.disabled)return;b.disabled=true;b.classList.add('clean');vacuumed++;vib(4);$('#v31CleanPct').textContent=vacuumed+'/5 zones';$('#v31CleanBar').style.width=(vacuumed/5*100)+'%';
        if(vacuumed===5)setTimeout(finalSpot,500)
      })
    }

    function finalSpot(){
      phase=3;$('#v31CleanPhase').textContent='4/4 · le fameux 99%';$('#v31CleanPct').textContent='99%';$('#v31CleanBar').style.width='99%';$('#v31CleanCopy').textContent='Il reste UNE tache. Minuscule. Évidemment.';
      $('#v31CarWash').innerHTML='<div class="v31-final-car"><div>🚙</div><button id="v31MicroSpot"></button><span>✦ ✧ ✦</span></div>';
      $('#v31MicroSpot').onclick=()=>{
        if(finalFound)return;finalFound=true;$('#v31MicroSpot').classList.add('found');$('#v31CleanPct').textContent='100%';$('#v31CleanBar').style.width='100%';
        toast('100 %. Silence. Respect. ... Hamoud approche.');
        setTimeout(()=>{$('#v31CarWash').insertAdjacentHTML('beforeend','<div class="v31-cat-signature">🐈 <b>🐾</b></div>');S.choices.v31_car='100+1paw';save();toast('Une patte. Signature officielle du directeur qualité.');setTimeout(()=>complete(10),1000)},800)
      }
    }
  };
})();


/* ===== V32 HORROR & CALLBACKS ===== */
(()=>{
  const delay=ms=>new Promise(r=>setTimeout(r,ms));
  const fearReduced=()=>document.documentElement.classList.contains('raphy-fear-reduced');

  horror = function(){
    let phase=0,clues=0,marks=new Set(),ended=false,calmed=false,heartbeat=0;
    const callbackLines=[];
    if(S.choices.v31_sink==='reversed')callbackLines.push('🔴/🔵');
    if(S.choices.v31_car)callbackLines.push('🐾');
    if(S.choices.v31_paint)callbackLines.push('🎨');
    if(S.choices.v31_cellar)callbackLines.push('📦');

    screen(
      top(18)+hero('Trace 19','La pièce qui bourdonne','La lumière ne révèle pas seulement ce qui est dans la pièce. Elle révèle ce que la maison a retenu.')+
      '<div class="v32-horror" id="v32Horror">'+
        '<div class="v32-wall-texture"></div>'+
        '<div id="v32Moths" class="v32-moths"></div>'+
        '<button class="v32-mark m1" data-v32mark="triangle">△</button>'+
        '<button class="v32-mark m2" data-v32mark="date">1105</button>'+
        '<button class="v32-mark m3" data-v32mark="heart">♥</button>'+
        '<button class="v32-mark m4" data-v32mark="paw">🐾</button>'+
        '<div class="v32-flashlight" id="v32Flash"></div>'+
        '<div class="v32-shadow-person" id="v32Shadow"></div>'+
        '<div class="v32-door-shape" id="v32Door"></div>'+
        '<button class="v32-hamoud" id="v32Hamoud">🐈</button>'+
        '<button class="btn small secondary v32-altlamp" id="v32AltLamp">Autre lampe</button>'+
        '<div class="v32-heartbeat" id="v32Heartbeat"></div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v32HorrorPhase">1/2 · marques</span><span id="v32HorrorCount">0/4</span><span id="v32HorrorNoise">bruit : faible</span></div><p class="caption" id="v32HorrorCopy">Déplace la lumière. Trouve les quatre marques. Tu peux passer la scène à tout moment.</p><div id="v32CallbackStrip" class="v32-callback-strip">'+callbackLines.map(x=>'<span>'+x+'</span>').join('')+'</div></div>'+skip(18),
      'horror'
    );
    wireSkip(18);

    const mothCount=fearReduced()?5:18;
    for(let i=0;i<mothCount;i++){
      const m=document.createElement('i');
      m.className='v32-moth';
      m.style.left=(4+Math.random()*92)+'%';
      m.style.top=(10+Math.random()*72)+'%';
      m.style.setProperty('--dx',(-60+Math.random()*120)+'px');
      m.style.setProperty('--dy',(-40+Math.random()*90)+'px');
      m.style.setProperty('--dur',(2.4+Math.random()*3.8)+'s');
      $('#v32Moths').append(m)
    }

    const stage=$('#v32Horror'),flash=$('#v32Flash');
    const move=e=>{
      const r=stage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
      flash.style.setProperty('--x',x+'%');flash.style.setProperty('--y',y+'%');
      stage.style.setProperty('--mx',x+'%');stage.style.setProperty('--my',y+'%')
    };
    stage.onpointermove=move;stage.onpointerdown=move;

    $('#v32Hamoud').onclick=()=>{
      toast(phase===0?'Hamoud fixe le mur. Pas la porte. Le mur. Très rassurant.':'Hamoud refuse d’entrer dans le couloir. Pour une fois, écoute peut-être le chat.')
    };

    $('#v32AltLamp').onclick=()=>{
      calmed=true;$('#v32Moths').classList.add('lured');$('#v32HorrorNoise').textContent='bruit : déplacé';
      toast('Les ailes changent de cible. Pas toutes. La maison garde un petit budget malaise.')
    };

    $$('[data-v32mark]').forEach(el=>el.onclick=()=>{
      if(el.classList.contains('found'))return;
      el.classList.add('found');marks.add(el.dataset.v32mark);clues=marks.size;vib(8);
      $('#v32HorrorCount').textContent=clues+'/4';
      const map={
        triangle:'Un triangle. Le scanner avait déjà commencé à mélanger les symboles.',
        date:'1105. La maison connaît la date, elle aussi.',
        heart:'Le cœur revient encore. Pas comme décoration.',
        paw:S.choices.v31_car?'Une patte. Exactement comme celle laissée sur la voiture.':'Une patte. Hamoud refuse toute responsabilité.'
      };
      toast(map[el.dataset.v32mark],2900);
      if(clues===4)setTimeout(startCorridor,700)
    });

    const scare1=setTimeout(()=>{
      if(!stage?.isConnected||ended||fearReduced())return;
      heartbeat++;$('#v32Shadow').classList.add('show');$('#v32HorrorNoise').textContent='bruit : derrière';
      vib([12,34,12]);toast('Quelque chose passe derrière la lumière. Hamoud est pourtant devant.');
      setTimeout(()=>$('#v32Shadow')?.classList.remove('show'),800)
    },4200);

    const scare2=setTimeout(()=>{
      if(!stage?.isConnected||ended||fearReduced())return;
      const bug=document.createElement('div');bug.className='v32-screen-bug';bug.textContent='•';
      stage.append(bug);bug.animate([{transform:'translate(0,0) scale(.5)',opacity:.25},{transform:'translate(-62vw,58vh) scale(3)',opacity:.95}],{duration:1500,fill:'forwards'});
      setTimeout(()=>bug.remove(),1700)
    },6800);

    async function startCorridor(){
      if(phase!==0)return;phase=1;clearTimeout(scare1);clearTimeout(scare2);
      $('#v32HorrorPhase').textContent='2/2 · couloir';
      $('#v32HorrorCount').textContent='porte ?';
      $('#v32HorrorCopy').textContent='La porte est apparue. Traverse le couloir sans regarder directement l’ombre.';
      $('#v32Door').classList.add('visible');
      $('#v32Horror').classList.add('corridor');
      await delay(400);
      $('#v32Horror').insertAdjacentHTML('beforeend',
        '<div class="v32-corridor-game" id="v32Corridor"><div class="v32-gaze-zone"></div><div class="v32-corridor-runner" id="v32Runner">●</div><div class="v32-corridor-shadow" id="v32CorridorShadow"></div></div>'+
        '<button class="btn v32-walk-btn" id="v32Walk">Avancer</button>'
      );
      let pos=0,shadow=78,safe=true,start=performance.now();
      const loop=t=>{
        if(!$('#v32Walk')?.isConnected||ended)return;
        const ph=((t-start)%2400)/2400;
        shadow=50+Math.sin(ph*Math.PI*2)*34;
        $('#v32CorridorShadow').style.left=shadow+'%';
        safe=Math.abs(shadow-pos)>23||fearReduced();
        $('#v32Walk').classList.toggle('danger',!safe);
        requestAnimationFrame(loop)
      };requestAnimationFrame(loop);

      $('#v32Walk').onclick=()=>{
        if(!safe){
          pos=Math.max(0,pos-7);vib([18,28,18]);toast('Tu as regardé au mauvais moment. Le couloir paraît plus long.');
        }else{
          pos+=18;toast(pos>=90?'La poignée est juste là.':'Un pas. Le bruit reste derrière.');
        }
        $('#v32Runner').style.left=Math.min(90,pos)+'%';
        if(pos>=90)finish()
      }
    }

    function finish(){
      if(ended)return;ended=true;
      S.choices.v32_horror={calmed,callbacks:callbackLines.length,fearReduced:fearReduced()};save();
      $('#v32Horror').classList.add('exit');
      toast(calmed?'La porte s’ouvre. L’autre lampe reste allumée toute seule.':'La porte s’ouvre. Les ailes restent derrière. Presque.');
      setTimeout(()=>complete(18),900)
    }
  };

  houseGame = function(){
    let round=0,found=0,eyesClosed=false,wrong=0;
    const callbacks={
      paint:!!S.choices.v31_paint,
      sink:S.choices.v31_sink==='reversed',
      car:!!S.choices.v31_car,
      cellar:!!S.choices.v31_cellar
    };
    const rounds=[
      {change:'chair',label:'La chaise a avancé. Rien de spectaculaire. C’est pire comme ça.'},
      {change:'frame',label:'Le cadre s’est retourné. Il n’y a rien derrière. Évidemment.'},
      {change:'lamp',label:'La lampe reste allumée alors que son interrupteur est éteint.'},
      {change:'door',label:'Cette porte n’existait pas il y a dix secondes.'},
      {change:'paint',label:callbacks.paint?'Une trace de peinture identique au chantier vient d’apparaître.':'Une trace de peinture apparaît sans explication.'},
      {change:'cat',label:callbacks.car?'Le portrait d’Hamoud porte exactement la même patte que la voiture.':'Pourquoi Hamoud est-il dans un portrait officiel ?'}
    ];

    screen(
      top(19)+hero('Trace 20','La maison impossible','Observe la pièce. Ferme les yeux. Rouvre. Un seul détail change à la fois… jusqu’à ce que la maison commence à tricher.')+
      '<div class="v32-house" id="v32House">'+
        '<div class="v32-room-back"></div>'+
        '<button class="v32-room-object chair" data-v32room="chair">🪑</button>'+
        '<button class="v32-room-object frame" data-v32room="frame">🖼️</button>'+
        '<button class="v32-room-object lamp" data-v32room="lamp">💡</button>'+
        '<button class="v32-room-object door" data-v32room="door">🚪</button>'+
        '<button class="v32-room-object paint" data-v32room="paint">•</button>'+
        '<button class="v32-room-object cat" data-v32room="cat">🐈</button>'+
        '<div class="v32-sink-callback '+(callbacks.sink?'on':'')+'">🔴　🔵</div>'+
        '<div class="v32-box-callback '+(callbacks.cellar?'on':'')+'">📦</div>'+
        '<div class="v32-blackout" id="v32Blackout"></div>'+
        '<div class="v32-room-whisper" id="v32Whisper">tu as déjà vu ça</div>'+
      '</div>'+
      '<div class="card"><div class="hud"><span id="v32HouseRound">0/6 anomalies</span><span id="v32HouseStatus">observe</span><span>erreurs <b id="v32HouseWrong">0</b></span></div><button class="btn" id="v32CloseEyes">Fermer les yeux</button><p class="caption" id="v32HouseCopy">Regarde bien avant de fermer les yeux. La maison adore les clics au hasard.</p></div>'+skip(19)
    );
    wireSkip(19);

    $$('[data-v32room]').forEach(b=>b.onclick=()=>{
      if(eyesClosed||round===0)return toast('Ferme d’abord les yeux. Pour une fois, c’est réellement la consigne.');
      const target=rounds[round-1].change;
      if(b.dataset.v32room===target&&!b.classList.contains('found')){
        b.classList.add('found');found++;$('#v32HouseRound').textContent=found+'/6 anomalies';$('#v32HouseStatus').textContent='trouvée';vib(6);
        toast(rounds[round-1].label,3000);
        if(found===3)$('#v32Whisper').classList.add('show');
        if(found===6)return finale()
      }else{
        wrong++;$('#v32HouseWrong').textContent=wrong;vib(5);
        toast(wrong===1?'Non. Ce détail était déjà bizarre avant.':'La maison note tes accusations sans fondement.')
      }
    });

    $('#v32CloseEyes').onclick=async()=>{
      if(round>=rounds.length)return toast('Tu as déjà vu assez de choses bouger pour ce soir.');
      if(round>0&&!$('[data-v32room="'+rounds[round-1].change+'"]').classList.contains('found'))return toast('Trouve d’abord ce qui a changé.');
      eyesClosed=true;$('#v32HouseStatus').textContent='yeux fermés';$('#v32Blackout').classList.add('on');vib(4);
      await delay(650);
      apply(rounds[round].change);round++;
      if(round===4&&!fearReduced()){$('#v32House').classList.add('breathing');setTimeout(()=>$('#v32House')?.classList.remove('breathing'),1400)}
      $('#v32Blackout').classList.remove('on');eyesClosed=false;$('#v32HouseStatus').textContent='quelque chose a changé'
    };

    function apply(type){
      const el=$('[data-v32room="'+type+'"]');el.classList.add('changed');
      if(type==='chair')el.classList.add('moved');
      if(type==='frame')el.classList.add('turned');
      if(type==='lamp')el.classList.add('haunted');
      if(type==='door')el.classList.add('wrong-door');
      if(type==='paint')el.classList.add('painted');
      if(type==='cat'){el.innerHTML='🖼️<span>🐈</span>';el.classList.add('official')}
    }

    function finale(){
      S.choices.v32_house={wrong,callbacks:Object.values(callbacks).filter(Boolean).length};save();
      $('#v32CloseEyes').disabled=true;$('#v32HouseStatus').textContent='…';
      $('#v32HouseCopy').textContent='La pièce remet presque tout à sa place. Presque.';
      setTimeout(()=>{
        $('#v32Blackout').classList.add('on');
        setTimeout(()=>{
          $$('[data-v32room]').forEach(x=>x.classList.remove('changed','moved','turned','haunted','wrong-door','painted'));
          $('#v32Blackout').classList.remove('on');
          $('#v32Whisper').textContent='elle ne copie pas les pièces. elle copie les traces.';
          $('#v32Whisper').classList.add('final');
          toast('Tout est revenu. Sauf le portrait d’Hamoud. Le portrait refuse.');
          setTimeout(()=>complete(19),1300)
        },650)
      },500)
    }
  };

  unknown = function(){
    const firstChoice=['tu l’as clashé','tu as fait comme si tu n’avais rien remarqué','tu lui as laissé croire qu’il avait le dernier mot'][S.choices.story0??0];
    const alg=S.choices.algeria;
    const remembered=[];
    if(S.choices.v31_sink==='reversed')remembered.push('le rouge et le bleu');
    if(S.choices.v31_car)remembered.push('la patte laissée sur la voiture');
    if(S.choices.v31_paint)remembered.push('les retouches du mur');
    if(S.choices.v32_horror)remembered.push('le couloir');
    if(S.choices.v32_house)remembered.push('la pièce qui changeait');

    screen(
      top(20)+hero('Trace 21','Numéro masqué','Pas de vrai appel. Mais l’écran vient de récupérer beaucoup trop de détails.')+
      '<div class="incoming-call" id="callScreen"><div class="call-static"></div><div class="caller-orb">?</div><div class="caller-name">NUMÉRO MASQUÉ</div><div class="caller-sub">appel entrant · source inconnue</div><div class="call-actions"><button class="call-decline" id="decline">✕</button><button class="call-accept" id="accept">✓</button></div></div><div id="afterCall"></div>'+skip(20)
    );
    wireSkip(20);
    $('#accept').onclick=()=>openThread(false);
    $('#decline').onclick=()=>{vib([18,28,18]);toast('Tu peux refuser l’appel. Le message, lui, était déjà là.');setTimeout(()=>openThread(true),700)};

    function openThread(refused){
      $('#callScreen').outerHTML='<div class="phone phone-dark"><div class="phone-top"><span>19:47</span><span>MASQUÉ</span></div><div id="msgs"><div class="msg in">'+(refused?'Refuser était logique.':'Tu as décroché.')+'</div><div class="typing" id="typing"><i></i><i></i><i></i></div></div><div id="phoneAction"></div></div>';
      const messages=[
        'Je me souviens du magasin de lunettes.',
        'Dans ta version, '+firstChoice+'.',
        'Je me souviens des deux bouteilles. Du pneu. De la plage.',
        remembered.length?'Je me souviens aussi de '+remembered.slice(0,3).join(', ')+'.':'Je me souviens des détails que tu pensais inutiles.',
        alg===1?'Et de cette offre immobilière où Mehdi devait finalement gérer cinq enfants.':alg===0?'Et tu as refusé la brochure Algérie sans négocier les frais de dossier.':'Et la brochure immobilière reste juridiquement discutable.',
        'Mais il manque une vérification.'
      ];
      let k=0;
      const sendNext=()=>{
        if(k>=messages.length)return askDate();
        const t=$('#typing');if(!t)return;
        t.insertAdjacentHTML('beforebegin','<div class="msg in reveal-msg">'+messages[k]+'</div>');
        k++;setTimeout(sendNext,620+Math.random()*320)
      };
      setTimeout(sendNext,650)
    }

    function askDate(){
      $('#typing')?.remove();
      $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in">Premier vrai rendez-vous surprise. Jour + mois. Seulement ce que vous savez vraiment.</div>');
      $('#phoneAction').innerHTML='<div class="input-row" style="margin-top:12px"><input id="maskedDate" class="code-input" maxlength="4" inputmode="numeric" placeholder="JJMM"><button class="btn" id="maskedSend">Envoyer</button></div>';
      const send=()=>{
        if($('#maskedDate').value!=='1105')return toast('Non. Le sushi refuse de confirmer cette chronologie.');
        $('#msgs').insertAdjacentHTML('beforeend','<div class="msg out">1105</div>');$('#phoneAction').innerHTML='';
        setTimeout(()=>{
          $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in reveal-msg">Bien.</div><div class="msg in reveal-msg">Tu pensais chercher ce que la maison avait caché.</div>');
          setTimeout(()=>{
            $('#msgs').insertAdjacentHTML('beforeend','<div class="msg in reveal-msg">Elle n’a rien caché.</div><div class="msg in reveal-msg">Elle a appris à te reconnaître à travers ce que tu laisses derrière toi.</div><div class="msg in reveal-msg final-mask-msg">Des traces.</div>');
            $('#phoneAction').innerHTML='<button class="btn danger" id="hangMasked">Raccrocher</button>';vib([20,60,20]);
            $('#hangMasked').onclick=()=>{screen('<div class="black-transition"><div class="glitch-word">TRACE</div><p>Une serrure vient de s’ouvrir quelque part dans la maison.</p><button class="btn secondary" id="toEscape">Trouver laquelle</button></div>','centered horror');$('#toEscape').onclick=()=>complete(20)}
          },1100)
        },800)
      };
      $('#maskedSend').onclick=send;
      $('#maskedDate').onkeydown=e=>{if(e.key==='Enter')send()}
    }
  };
})();


/* ===== V33 QA, SAVE RECOVERY & HIDDEN MEHDI ZONE ===== */
(()=>{
  const BUILD='33';
  const SNAPSHOT_KEY='raphy-v8-backup';
  const RESUME_KEY='raphy-v33-resume-handled';
  let devTapCount=0,devTapTimer=null;

  const normalizeState=x=>({
    ...D,
    ...(x&&typeof x==='object'?x:{}),
    done:(x&&x.done&&typeof x.done==='object'?x.done:{}),
    choices:(x&&x.choices&&typeof x.choices==='object'?x.choices:{})
  });

  function snapshot(reason='checkpoint'){
    try{
      const existing=localStorage.getItem(KEY);
      if(existing) localStorage.setItem(SNAPSHOT_KEY,existing);
      S.meta={...(S.meta||{}),build:BUILD,lastCheckpoint:new Date().toISOString(),reason};
      localStorage.setItem(KEY,JSON.stringify(S));
      return true
    }catch(e){
      console.warn('Raphy snapshot failed',e);
      return false
    }
  }

  function restoreBackup(){
    try{
      const raw=localStorage.getItem(SNAPSHOT_KEY);
      if(!raw) return false;
      S=normalizeState(JSON.parse(raw));
      localStorage.setItem(KEY,JSON.stringify(S));
      return true
    }catch{return false}
  }

  // Scene-level checkpoints: closing Safari mid-game restarts the current trace cleanly.
  const routeV33=route;
  route=function(i){
    const n=Math.max(0,Math.min(25,Number(i)||0));
    S.current=n;
    snapshot('enter-scene-'+n);
    return routeV33(n)
  };

  const completeV33=complete;
  complete=function(i,sk=false){
    snapshot('before-complete-'+i);
    const r=completeV33(i,sk);
    setTimeout(()=>snapshot('after-complete-'+i),40);
    return r
  };

  addEventListener('pagehide',()=>snapshot('pagehide'));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')snapshot('hidden')});

  // Upgrade public test API.
  window.RaphyApp={
    version:BUILD,
    getState:()=>JSON.parse(JSON.stringify(S)),
    go:i=>route(Math.max(0,Math.min(25,Number(i)||0))),
    replay:()=>replay(),
    snapshot:()=>snapshot('manual-api'),
    restoreBackup:()=>{const ok=restoreBackup();if(ok)location.reload();return ok},
    reset:()=>{localStorage.removeItem(KEY);localStorage.removeItem(SNAPSHOT_KEY);location.reload()}
  };

  function closeModal(){
    modal.hidden=true;modal.innerHTML=''
  }

  function devGate(){
    modal.hidden=false;
    modal.innerHTML=
      '<div class="modal-card v33-dev-gate">'+
        '<div class="eyebrow">ZONE MEHDI · V'+BUILD+'</div>'+
        '<h2>Accès test</h2><p class="caption">Zone cachée pour contrôler les 26 traces et la sauvegarde locale.</p>'+
        '<input id="v33DevPin" class="code-input" inputmode="numeric" maxlength="6" placeholder="Code">'+
        '<div class="actions two" style="margin-top:12px"><button class="btn" id="v33DevEnter">Entrer</button><button class="btn secondary" id="v33DevClose">Fermer</button></div>'+
        '<p class="caption" id="v33DevErr"></p>'+
      '</div>';
    const input=$('#v33DevPin');
    const enter=()=>{if(input.value===CODE){sessionStorage.setItem('raphy-dev-ok','1');dev()}else{$('#v33DevErr').textContent='Code incorrect.';vib(8)}};
    $('#v33DevEnter').onclick=enter;$('#v33DevClose').onclick=closeModal;
    input.onkeydown=e=>{if(e.key==='Enter')enter()};
    setTimeout(()=>input.focus(),180)
  }

  dev = function(){
    if(sessionStorage.getItem('raphy-dev-ok')!=='1')return devGate();
    const doneCount=Object.keys(S.done||{}).filter(k=>S.done[k]).length;
    const choicesCount=Object.keys(S.choices||{}).length;
    let bytes=0;try{bytes=(localStorage.getItem(KEY)||'').length}catch{}
    modal.hidden=false;
    modal.innerHTML=
      '<div class="modal-card v33-dev">'+
        '<div class="v33-dev-head"><div><div class="eyebrow">ZONE MEHDI · BUILD '+BUILD+'</div><h2>Contrôle du jeu</h2></div><button class="v33-dev-x" id="v33DevX">×</button></div>'+
        '<div class="v33-dev-stats">'+
          '<div><b>'+String(S.current+1).padStart(2,'0')+'</b><small>trace actuelle</small></div>'+
          '<div><b>'+doneCount+'/26</b><small>terminées</small></div>'+
          '<div><b>'+choicesCount+'</b><small>choix</small></div>'+
          '<div><b>'+Math.max(1,Math.round(bytes/1024))+' ko</b><small>sauvegarde</small></div>'+
        '</div>'+
        '<div class="v33-dev-actions">'+
          '<button class="btn secondary" id="v33Replay">Menu des traces</button>'+
          '<button class="btn secondary" id="v33Restart">Rejouer la trace actuelle</button>'+
          '<button class="btn secondary" id="v33Unlock">Tout débloquer</button>'+
          '<button class="btn secondary" id="v33Backup">Créer une sauvegarde</button>'+
          '<button class="btn secondary" id="v33Restore">Restaurer la sauvegarde</button>'+
          '<button class="btn secondary" id="v33Export">Copier la sauvegarde</button>'+
          '<button class="btn secondary" id="v33Import">Importer une sauvegarde</button>'+
          '<button class="btn secondary" id="v33Acts">Revoir les écrans d’actes</button>'+
        '</div>'+
        '<div class="eyebrow" style="margin-top:18px">ACCÈS DIRECT AUX 26 TRACES</div>'+
        '<div class="v33-scene-grid">'+NAMES.map((n,i)=>'<button data-v33jump="'+i+'" class="'+(S.done[i]?'done':'')+(i===S.current?' current':'')+'"><span>'+String(i+1).padStart(2,'0')+'</span><b>'+n+'</b><small>'+(S.done[i]?'✓ terminée':'à tester')+'</small></button>').join('')+'</div>'+
        '<div class="v33-danger-zone"><div><b>Réinitialisation</b><small>Efface progression + sauvegarde de secours.</small></div><button class="btn danger" id="v33Reset">Tout effacer</button></div>'+
        '<div id="v33DevPanel"></div>'+
      '</div>';

    $('#v33DevX').onclick=closeModal;
    $('#v33Replay').onclick=()=>{closeModal();replay()};
    $('#v33Restart').onclick=()=>{const n=S.current;closeModal();route(n)};
    $('#v33Unlock').onclick=()=>{for(let i=0;i<26;i++)S.done[i]=true;snapshot('qa-unlock-all');toast('Les 26 traces sont débloquées.');dev()};
    $('#v33Backup').onclick=()=>{snapshot('manual-backup');toast('Sauvegarde locale créée.');dev()};
    $('#v33Restore').onclick=()=>{
      $('#v33DevPanel').innerHTML='<div class="card soft v33-confirm"><b>Restaurer le dernier backup ?</b><p class="caption">La progression actuelle sera remplacée.</p><div class="actions two"><button class="btn" id="v33RestoreYes">Restaurer</button><button class="btn secondary" id="v33RestoreNo">Annuler</button></div></div>';
      $('#v33RestoreYes').onclick=()=>{if(restoreBackup())location.reload();else toast('Aucune sauvegarde de secours disponible.')};
      $('#v33RestoreNo').onclick=()=>{$('#v33DevPanel').innerHTML=''}
    };
    $('#v33Export').onclick=async()=>{
      const text=JSON.stringify({build:BUILD,state:S},null,2);
      try{await navigator.clipboard.writeText(text);toast('Sauvegarde copiée dans le presse-papiers.')}
      catch{
        $('#v33DevPanel').innerHTML='<textarea class="v33-save-text" id="v33ExportText"></textarea>';
        $('#v33ExportText').value=text;$('#v33ExportText').select();toast('Copie le texte affiché.')
      }
    };
    $('#v33Import').onclick=()=>{
      $('#v33DevPanel').innerHTML='<div class="card soft"><b>Importer une sauvegarde</b><textarea class="v33-save-text" id="v33ImportText" placeholder="Colle ici le JSON exporté"></textarea><div class="actions two"><button class="btn" id="v33ImportGo">Importer</button><button class="btn secondary" id="v33ImportCancel">Annuler</button></div></div>';
      $('#v33ImportGo').onclick=()=>{
        try{
          const parsed=JSON.parse($('#v33ImportText').value);
          const incoming=normalizeState(parsed.state||parsed);
          localStorage.setItem(SNAPSHOT_KEY,localStorage.getItem(KEY)||JSON.stringify(S));
          S=incoming;snapshot('import');location.reload()
        }catch{$('#v33ImportText').classList.add('bad');toast('JSON invalide. Rien n’a été modifié.')}
      };
      $('#v33ImportCancel').onclick=()=>{$('#v33DevPanel').innerHTML=''}
    };
    $('#v33Acts').onclick=()=>{Object.keys(sessionStorage).filter(k=>k.startsWith('raphy-v24-act-')).forEach(k=>sessionStorage.removeItem(k));toast('Les séparateurs d’actes réapparaîtront.');};
    $$('[data-v33jump]').forEach(b=>b.onclick=()=>{const n=+b.dataset.v33jump;S.current=n;snapshot('qa-jump-'+n);closeModal();route(n)});
    $('#v33Reset').onclick=()=>{
      $('#v33DevPanel').innerHTML='<div class="card soft v33-confirm"><b>Vraiment tout effacer ?</b><p class="caption">Cette action supprime la progression et le backup local.</p><div class="actions two"><button class="btn danger" id="v33ResetYes">Oui, tout effacer</button><button class="btn secondary" id="v33ResetNo">Non</button></div></div>';
      $('#v33ResetYes').onclick=()=>{localStorage.removeItem(KEY);localStorage.removeItem(SNAPSHOT_KEY);sessionStorage.clear();location.reload()};
      $('#v33ResetNo').onclick=()=>{$('#v33DevPanel').innerHTML=''}
    }
  };

  // Five taps on the tiny brand dot reveal the hidden QA entrance.
  document.addEventListener('click',e=>{
    if(!e.target.closest('.brand-dot'))return;
    clearTimeout(devTapTimer);devTapCount++;
    devTapTimer=setTimeout(()=>{devTapCount=0},2500);
    if(devTapCount>=5){devTapCount=0;devGate()}
  },true);

  // Hide the visible old credits QA button: QA remains available via the secret 5-tap gesture.
  const uiObserverV33=new MutationObserver(()=>{
    const old=$('#creditsDev');if(old)old.style.display='none';
  });
  uiObserverV33.observe(app,{childList:true,subtree:true});

  function resumePrompt(){
    if(sessionStorage.getItem(RESUME_KEY)==='1')return;
    if(!S.unlocked||!S.storyDone||!(S.current>0&&S.current<25))return;
    sessionStorage.setItem(RESUME_KEY,'1');
    const scene=S.current;
    const completed=Object.keys(S.done||{}).filter(k=>S.done[k]).length;
    modal.hidden=false;
    modal.innerHTML=
      '<div class="modal-card v33-resume">'+
        '<div class="eyebrow">PROGRESSION RETROUVÉE</div>'+
        '<div class="v33-resume-number">'+String(scene+1).padStart(2,'0')+'</div>'+
        '<h2>'+NAMES[scene]+'</h2>'+
        '<p>Ta progression est bien là. Le jeu reprend au début de cette trace pour éviter une scène à moitié cassée après fermeture du navigateur.</p>'+
        '<div class="v33-resume-meta"><span>'+completed+'/26 terminées</span><span>build '+BUILD+'</span></div>'+
        '<div class="actions"><button class="btn" id="v33Resume">Reprendre ici</button><button class="btn secondary" id="v33ResumeReplay">Voir les traces débloquées</button><button class="btn secondary" id="v33ResumeStart">Revenir au début du jeu</button></div>'+
      '</div>';
    $('#v33Resume').onclick=()=>{closeModal();route(scene)};
    $('#v33ResumeReplay').onclick=()=>{closeModal();replay()};
    $('#v33ResumeStart').onclick=()=>{S.current=0;snapshot('resume-start-over');closeModal();route(0)}
  }

  snapshot('boot-v33');
  setTimeout(resumePrompt,500);
})();


/* ===== V34 PWA, MOBILE & UPDATE POLISH ===== */
(()=>{
  const BUILD='34';
  const INSTALL_KEY='raphy-v34-install-dismissed';
  let deferredInstall=null;
  let installCardShown=false;
  const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent||'');
  const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;

  const closeModalV34=()=>{modal.hidden=true;modal.innerHTML=''};

  function showInstallHelp(){
    modal.hidden=false;
    const installed=isStandalone();
    modal.innerHTML=
      '<div class="modal-card v34-install-modal">'+
        '<div class="eyebrow">APPLICATION</div>'+
        '<h2>'+(installed?'Déjà installée.':'Garder Raphy sur l’écran d’accueil')+'</h2>'+
        (installed
          ?'<p class="storyline">L’application est déjà lancée comme une app. Aucun navigateur à ouvrir.</p>'
          :(deferredInstall
            ?'<p class="storyline">Ton navigateur peut installer directement le jeu comme une application.</p><button class="btn" id="v34NativeInstall">Installer maintenant</button>'
            :isiOS
              ?'<div class="v34-install-steps"><div><b>1</b><span>Ouvre le jeu dans Safari.</span></div><div><b>2</b><span>Touche le bouton Partager ⤴︎.</span></div><div><b>3</b><span>Choisis « Sur l’écran d’accueil » puis « Ajouter ».</span></div></div>'
              :'<div class="v34-install-steps"><div><b>1</b><span>Ouvre le menu du navigateur.</span></div><div><b>2</b><span>Choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».</span></div></div>'))+
        '<div class="card soft v34-offline-card"><b>Après installation</b><p class="caption">Le jeu principal reste disponible même si la connexion disparaît après un premier chargement complet.</p></div>'+
        '<button class="btn secondary" id="v34InstallClose">Fermer</button>'+
      '</div>';
    $('#v34InstallClose').onclick=closeModalV34;
    const native=$('#v34NativeInstall');
    if(native)native.onclick=async()=>{
      const p=deferredInstall;if(!p)return;
      p.prompt();
      try{await p.userChoice}catch{}
      deferredInstall=null;localStorage.setItem(INSTALL_KEY,'1');closeModalV34();syncInstallButton()
    }
  }

  function syncInstallButton(){
    const controls=document.querySelector('.v24-controls');
    if(!controls||!S.unlocked)return;
    let b=$('#v34InstallBtn');
    if(!b){
      b=document.createElement('button');
      b.className='v24-round v34-install-btn';
      b.id='v34InstallBtn';
      b.setAttribute('aria-label','Installer l’application');
      b.textContent=isStandalone()?'✓':'＋';
      b.onclick=showInstallHelp;
      controls.append(b)
    }
    const txt=isStandalone()?'✓':'＋';
    const title=isStandalone()?'Application installée':'Installer sur l’écran d’accueil';
    if(b.textContent!==txt)b.textContent=txt;
    if(b.title!==title)b.title=title
  }

  addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();deferredInstall=e;syncInstallButton()
  });
  addEventListener('appinstalled',()=>{
    deferredInstall=null;localStorage.setItem(INSTALL_KEY,'1');toast('Installée. Raphy a maintenant sa propre place sur l’écran d’accueil.');syncInstallButton()
  });

  function maybeShowInstallCard(){
    if(installCardShown||!S.unlocked||isStandalone())return;
    if(localStorage.getItem(INSTALL_KEY)==='1')return;
    const completed=Object.keys(S.done||{}).filter(k=>S.done[k]).length;
    if(completed<1)return;
    installCardShown=true;
    const card=document.createElement('div');
    card.className='v34-install-toast';
    card.innerHTML='<div><b>Garder le jeu comme une app ?</b><small>Écran d’accueil · plein écran · reprise locale</small></div><button id="v34InstallOpen">Voir</button><button id="v34InstallDismiss" aria-label="Fermer">×</button>';
    document.body.append(card);
    $('#v34InstallOpen').onclick=()=>{card.remove();localStorage.setItem(INSTALL_KEY,'1');showInstallHelp()};
    $('#v34InstallDismiss').onclick=()=>{card.remove();localStorage.setItem(INSTALL_KEY,'1')}
  }

  function netBanner(online){
    document.querySelector('.v34-net-banner')?.remove();
    if(online){toast('Connexion revenue. La maison a retrouvé le réseau.',1800);return}
    const b=document.createElement('div');b.className='v34-net-banner';b.innerHTML='<span>Hors connexion</span><small>La progression reste enregistrée sur cet appareil.</small>';document.body.append(b)
  }
  addEventListener('offline',()=>netBanner(false));
  addEventListener('online',()=>netBanner(true));
  if(!navigator.onLine)setTimeout(()=>netBanner(false),400);

  // Service-worker update handling. Existing game state is saved before any reload.
  if('serviceWorker'in navigator){
    navigator.serviceWorker.ready.then(reg=>{
      const check=()=>reg.update().catch(()=>{});
      setTimeout(check,5000);
      setInterval(check,10*60*1000);
      reg.addEventListener('updatefound',()=>{
        const nw=reg.installing;if(!nw)return;
        nw.addEventListener('statechange',()=>{
          if(nw.state==='installed'&&navigator.serviceWorker.controller)showUpdate()
        })
      })
    }).catch(()=>{});
  }
  let updateShown=false;
  function showUpdate(){
    if(updateShown)return;updateShown=true;
    const b=document.createElement('div');b.className='v34-update-banner';
    b.innerHTML='<div><b>Une mise à jour est prête</b><small>La progression sera conservée.</small></div><button id="v34UpdateNow">Actualiser</button><button id="v34UpdateLater">Plus tard</button>';
    document.body.append(b);
    $('#v34UpdateNow').onclick=()=>{try{window.RaphyApp?.snapshot?.()}catch{}location.reload()};
    $('#v34UpdateLater').onclick=()=>b.remove()
  }

  // Avoid iOS viewport jumps when the software keyboard opens/closes.
  if(window.visualViewport){
    const vv=visualViewport;
    const applyViewport=()=>{
      document.documentElement.style.setProperty('--v34-vh',vv.height+'px');
      document.documentElement.style.setProperty('--v34-keyboard',Math.max(0,innerHeight-vv.height-vv.offsetTop)+'px')
    };
    vv.addEventListener('resize',applyViewport);vv.addEventListener('scroll',applyViewport);applyViewport()
  }

  // Add install control whenever the scene UI changes.
  const obs=new MutationObserver(()=>{
    syncInstallButton();
    if(S.unlocked)setTimeout(maybeShowInstallCard,700)
  });
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>{syncInstallButton();maybeShowInstallCard()},1200);

  // Small build marker only inside hidden QA console.
  window.RaphyBuild=BUILD;
})();


/* ===== V35 RUNTIME QA & RECOVERY ===== */
(()=>{
  const BUILD='35';
  let recoveryShown=false;

  function safeStateCheck(){
    const issues=[];
    if(!S||typeof S!=='object')issues.push('état absent');
    if(!Number.isInteger(Number(S.current))||Number(S.current)<0||Number(S.current)>25)issues.push('trace actuelle invalide');
    if(!S.done||typeof S.done!=='object')issues.push('progression invalide');
    if(!S.choices||typeof S.choices!=='object')issues.push('choix invalides');
    try{JSON.stringify(S)}catch{issues.push('sauvegarde non sérialisable')}
    return issues
  }

  function showRecovery(err){
    if(recoveryShown||!S?.unlocked)return;
    recoveryShown=true;
    const scene=Math.max(0,Math.min(25,Number(S.current)||0));
    const message=String(err&&err.message||err||'Erreur inconnue');
    modal.hidden=false;
    modal.innerHTML=
      '<div class="modal-card v35-recovery">'+
        '<div class="eyebrow">MODE RÉCUPÉRATION</div>'+
        '<div class="v35-recovery-icon">↻</div>'+
        '<h2>Cette trace a trébuché.</h2>'+
        '<p>Ta progression est conservée. Tu peux simplement relancer cette trace.</p>'+
        '<div class="actions"><button class="btn" id="v35Retry">Rejouer la trace</button><button class="btn secondary" id="v35Skip">Passer cette trace</button><button class="btn secondary" id="v35Details">Détails techniques</button></div>'+
        '<div id="v35ErrorDetail"></div>'+
      '</div>';
    $('#v35Retry').onclick=()=>{recoveryShown=false;modal.hidden=true;modal.innerHTML='';route(scene)};
    $('#v35Skip').onclick=()=>{recoveryShown=false;modal.hidden=true;modal.innerHTML='';complete(scene,true)};
    $('#v35Details').onclick=()=>{
      $('#v35ErrorDetail').innerHTML='<div class="card soft v35-error-box"><b>Build '+BUILD+' · trace '+(scene+1)+'</b><p>'+message.replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))+'</p></div>'
    }
  }

  addEventListener('error',e=>{
    const src=String(e.filename||'');
    if(src&&src.includes('app.runtime.js'))showRecovery(e.error||e.message)
  });
  addEventListener('unhandledrejection',e=>showRecovery(e.reason||'Promise rejetée'));

  // Final route guard catches synchronous scene-init failures before they become a blank screen.
  const routeV35=route;
  route=function(i){
    try{
      return routeV35(i)
    }catch(err){
      console.error('V35 route recovery',err);
      showRecovery(err);
      return null
    }
  };

  // Enhance hidden Mehdi console with a device/state diagnostic.
  const devV35=dev;
  dev=function(){
    const result=devV35();
    setTimeout(()=>{
      if(sessionStorage.getItem('raphy-dev-ok')!=='1')return;
      const actions=document.querySelector('.v33-dev-actions');
      if(!actions||$('#v35Diag'))return;
      const b=document.createElement('button');
      b.className='btn secondary';b.id='v35Diag';b.textContent='Diagnostic appareil';
      actions.append(b);
      b.onclick=()=>{
        let storage=false;
        try{localStorage.setItem('__raphy_test','1');storage=localStorage.getItem('__raphy_test')==='1';localStorage.removeItem('__raphy_test')}catch{}
        const stateIssues=safeStateCheck();
        const rows=[
          ['JavaScript',true,'runtime chargé'],
          ['Sauvegarde locale',storage,storage?'lecture/écriture OK':'indisponible'],
          ['Service Worker','serviceWorker'in navigator,'serviceWorker'in navigator?'compatible':'non disponible'],
          ['Cache hors ligne','caches'in window,'caches'in window?'compatible':'non disponible'],
          ['Canvas',!!document.createElement('canvas').getContext,'canvas disponible'],
          ['Audio',!!(window.AudioContext||window.webkitAudioContext),(window.AudioContext||window.webkitAudioContext)?'compatible':'limité'],
          ['Visual Viewport',!!window.visualViewport,window.visualViewport?'optimisation clavier active':'fallback CSS'],
          ['Mode standalone',matchMedia('(display-mode: standalone)').matches||navigator.standalone===true,'état actuel'],
          ['Connexion',navigator.onLine,navigator.onLine?'en ligne':'hors connexion'],
          ['État du jeu',stateIssues.length===0,stateIssues.length?stateIssues.join(', '):'cohérent']
        ];
        $('#v33DevPanel').innerHTML=
          '<div class="card soft v35-diag-card"><div class="eyebrow">DIAGNOSTIC V'+BUILD+'</div><h3>Appareil + sauvegarde</h3>'+
          '<div class="v35-diag-list">'+rows.map(r=>'<div><span class="'+(r[1]?'ok':'warn')+'">'+(r[1]?'✓':'!')+'</span><b>'+r[0]+'</b><small>'+r[2]+'</small></div>').join('')+'</div>'+
          '<p class="caption">Ce test vérifie les fonctions techniques disponibles. Il ne remplace pas une partie complète sur téléphone.</p></div>'
      }
    },0);
    return result
  };

  // Keep the public internal API aligned with the real build.
  if(window.RaphyApp)window.RaphyApp.version=BUILD;
  window.RaphyBuild=BUILD;
})();


/* ===== V36 CLINIC & FINAL POLISH ===== */
(()=>{
  const BUILD='36';

  gyno = function(){
    let q=0,answered=0,glitches=0,selected=[];
    const doctor=[
      ['Parfait. Le logiciel, lui, fuit clairement.','Je note : « patiente coopérative, logiciel à surveiller ».','Très bien. J’ajoute « plomberie émotionnelle stable ».'],
      ['Réponse recevable. La paperasse, moins.','Je peux prescrire trois jours sans formulaire. Malheureusement c’est un formulaire.','Votre patience est donc en phase terminale administrative.'],
      ['Merci de confirmer. J’avais peur que ce rendez-vous parte très loin.','Le lavabo est donc officiellement le patient secondaire.','Je vais entourer « TOUJOURS LE LAVABO » en rouge.'],
      ['Je vois. Exposition chronique à la confiance masculine non homologuée.','Je recommande de conserver la notice à distance de Mehdi.','Le terme « optimisation » vient d’être interdit dans ce cabinet.'],
      ['Excellent. Nous sauvons la dignité du service.','Vous aviez révisé ? Je suis presque inquiète.','Le siphon peut attendre en salle d’attente.'],
      ['Décision courageuse. Très courageuse.','Je peux inscrire Hamoud en contact secondaire, mais il ne répond jamais.','Je note : Mehdi, sous réserve de conduite acceptable.'],
      ['Je m’en doutais. Le « ça va » familial est très résistant.','Secret défense accepté.','Très bien. Je traduis médicalement par : « elle fait la forte ».']
    ];

    screen(
      top(4)+hero('Trace 05','Consultation gynéco','Consultation fictive, non graphique : sept questions et un logiciel qui mélange obstinément médecine et plomberie.')+
      '<div class="v36-clinic">'+
        '<div class="v36-clinic-top"><span>CABINET · DOSSIER RAPHY</span><b id="v36System">SYSTÈME OK</b></div>'+
        '<div class="v36-clinic-room">'+
          '<div class="v36-clinic-screen">'+
            '<div class="v36-file-tabs"><span class="on">PATIENTE</span><span>ANTÉCÉDENTS</span><span>???</span></div>'+
            '<div class="v36-file-body" id="v36FileBody"><small>QUESTIONNAIRE EN COURS</small><div class="v36-file-lines"><i></i><i></i><i></i><i></i></div></div>'+
          '</div>'+
          '<div class="v36-doctor"><span>👩‍⚕️</span><div class="v36-doctor-badge">Dr. Patience<br><small>spécialité : survivre au logiciel</small></div></div>'+
          '<button class="v36-clinic-printer" id="v36Printer">🖨️</button>'+
          '<div class="v36-clinic-plant">🪴</div>'+
        '</div>'+
      '</div>'+
      '<div class="card v36-clinic-card">'+
        '<div class="hud"><span>Question <b id="v36GQCount">1/7</b></span><span>Bug logiciel <b id="v36BugCount">0</b></span></div>'+
        '<div class="dialogue" style="margin-top:14px"><div class="avatar">👩‍⚕️</div><div class="bubble" id="v36GQ"></div></div>'+
        '<div id="v36GOpts" class="choices" style="margin-top:14px"></div>'+
        '<div id="v36GReply"></div>'+
      '</div>'+skip(4)
    );
    wireSkip(4);

    $('#v36Printer').onclick=()=>{
      glitches++;
      $('#v36BugCount').textContent=glitches;
      const papers=['ORDONNANCE : 1 siphon','RÉSULTAT : vasque double','CONTACT : Hamoud','ALERTE : Mehdi a touché aux réglages'];
      toast(papers[(glitches-1)%papers.length],2400);
      $('#v36Printer').animate([{transform:'translateY(0)'},{transform:'translateY(5px)'},{transform:'translateY(0)'}],{duration:220})
    };

    const glitchScreen=()=>{
      const bug=q%2===1||q===4;
      $('#v36System').textContent=bug?['ERREUR #VASQUE','ERREUR #SIPHON','ERREUR #MEHDI'][q%3]:'SYSTÈME OK';
      $('#v36System').classList.toggle('bad',bug);
      if(bug){
        glitches++;$('#v36BugCount').textContent=glitches;
        $('#v36FileBody').classList.add('glitch');
        setTimeout(()=>$('#v36FileBody')?.classList.remove('glitch'),380)
      }
    };

    const draw=()=>{
      if(q>=QG.length)return report();
      $('#v36GQCount').textContent=(q+1)+'/7';
      $('#v36GQ').textContent=QG[q][0];
      $('#v36GOpts').innerHTML=QG[q][1].map((x,j)=>'<button class="choice" data-v36g="'+j+'">'+x+'</button>').join('');
      $('#v36GReply').innerHTML='';
      $('#v36FileBody').innerHTML='<small>QUESTION '+String(q+1).padStart(2,'0')+'</small><div class="v36-file-lines"><i></i><i></i><i></i><i></i></div>';
      glitchScreen();
      $$('[data-v36g]').forEach(b=>b.onclick=()=>{
        const j=+b.dataset.v36g;
        selected[q]=j;answered++;vib(6);
        $('#v36GOpts').innerHTML='';
        $('#v36GReply').innerHTML=
          '<div class="dialogue v36-doc-reply" style="margin-top:14px"><div class="avatar">🩺</div><div class="bubble me">'+doctor[q][j]+'</div></div>'+
          '<button class="btn secondary" id="v36GNext" style="margin-top:12px">Question suivante</button>';
        $('#v36FileBody').innerHTML='<small>RÉPONSE ENREGISTRÉE</small><div class="v36-file-answer">'+['A','B','C'][j]+' · validée par un logiciel juridiquement douteux</div>';
        $('#v36GNext').onclick=()=>{q++;draw()}
      })
    };

    function report(){
      const mehdiRisk=selected.filter(x=>x===2).length;
      S.choices.v36_gyno={answers:selected,glitches};save();
      $('#v36System').textContent='COMPTE RENDU';$('#v36System').classList.remove('bad');
      $('#v36GQCount').textContent='7/7';$('#v36GQ').textContent='Consultation terminée. Le logiciel souhaite néanmoins revoir le lavabo.';
      $('#v36GOpts').innerHTML='';
      $('#v36FileBody').innerHTML='<small>DOSSIER CLÔTURÉ</small><div class="v36-file-stamp">VALIDÉ</div>';
      $('#v36GReply').innerHTML=
        '<div class="v36-med-report">'+
          '<div class="eyebrow">COMPTE RENDU FICTIF</div>'+
          '<div><span>Patiente</span><b>Raphy</b></div>'+
          '<div><span>Consultation</span><b>Terminée avec dignité</b></div>'+
          '<div><span>Lavabo</span><b>À revoir ailleurs</b></div>'+
          '<div><span>Hamoud</span><b>Non joignable</b></div>'+
          '<div><span>Mehdi</span><b>'+(mehdiRisk>=3?'Surveillance renforcée':'Surveillance standard')+'</b></div>'+
          '<div><span>Bugs du logiciel</span><b>'+glitches+'</b></div>'+
        '</div>'+
        '<button class="btn" id="v36GEnd" style="margin-top:12px">Quitter le cabinet</button>';
      $('#v36GEnd').onclick=()=>complete(4)
    }
    draw()
  };

  final = function(){
    S.done[25]=true;save();
    const remembered=[];
    if(S.choices.v31_cellar)remembered.push(['📦','La cave']);
    if(S.choices.v31_paint)remembered.push(['🎨','La peinture']);
    if(S.choices.v31_sink)remembered.push(['🚰','Le lavabo']);
    if(S.choices.v31_car)remembered.push(['🐾','La voiture']);
    if(S.choices.v32_horror)remembered.push(['◌','Le couloir']);
    if(S.choices.v32_house)remembered.push(['🚪','La maison']);
    const base=[
      ['👓','Le magasin de lunettes'],['💧','Deux Cristaline'],['🛞','La balançoire'],['🌊','Le 11/05'],
      ['🚂','Marseille'],['☕','Les cafés'],['🐈','Hamoud']
    ];
    const constellation=[...base,...remembered].slice(0,12);

    screen(
      '<div class="v36-final">'+
        '<div class="v36-final-sky">'+constellation.map((x,i)=>'<button class="v36-memory-star" data-v36mem="'+i+'" style="--i:'+i+';--x:'+(10+(i*37)%78)+'%;--y:'+(9+(i*29)%68)+'%"><span>'+x[0]+'</span></button>').join('')+'</div>'+
        '<div class="v36-final-copy">'+
          '<div class="eyebrow">DERNIÈRE PORTE</div>'+
          '<h2>Tout était déjà là.</h2>'+
          '<p id="v36FinalLine">Touche quelques traces. Puis garde le cœur appuyé.</p>'+
          '<div class="v36-final-seen" id="v36FinalSeen">0 souvenir touché</div>'+
        '</div>'+
        '<button class="v36-hold-heart" id="v36Heart" aria-label="Maintenir le cœur"><span>♥</span><i id="v36HeartProgress"></i></button>'+
        '<p class="v36-hold-caption" id="v36HeartCaption">Maintiens le cœur.</p>'+
      '</div>',
      'centered v36-final-screen'
    );

    let touched=new Set(),down=false,start=0,raf=0,revealed=false,pointerId=null;
    $$('[data-v36mem]').forEach(b=>b.onclick=()=>{
      const n=+b.dataset.v36mem;
      touched.add(n);b.classList.add('seen');vib(4);
      $('#v36FinalSeen').textContent=touched.size+' souvenir'+(touched.size>1?'s':'')+' touché'+(touched.size>1?'s':'');
      $('#v36FinalLine').textContent=constellation[n][1]+'. Un détail parmi d’autres, devenu important parce que c’était vous.';
      if(touched.size===Math.min(5,constellation.length))toast('Tu peux continuer à les toucher… ou garder le cœur appuyé.')
    });

    const heart=$('#v36Heart'),progress=$('#v36HeartProgress');
    const loop=()=>{
      if(!down||revealed)return;
      const p=Math.min(1,(performance.now()-start)/1900);
      progress.style.setProperty('--p',(p*360)+'deg');
      heart.style.transform='scale('+(1+p*.09)+')';
      $('#v36HeartCaption').textContent=p<.35?'Maintiens…':p<.7?'Encore un peu…':'Presque…';
      if(p>=1){revealed=true;down=false;vib([24,36,80]);return reveal()}
      raf=requestAnimationFrame(loop)
    };
    const begin=e=>{
      e.preventDefault();if(revealed)return;
      pointerId=e.pointerId;
      try{heart.setPointerCapture(pointerId)}catch{}
      down=true;start=performance.now();loop()
    };
    const cancel=e=>{
      if(revealed)return;
      if(e&&pointerId!==null&&e.pointerId!==pointerId)return;
      down=false;cancelAnimationFrame(raf);
      try{if(pointerId!==null)heart.releasePointerCapture(pointerId)}catch{}
      pointerId=null;progress.style.setProperty('--p','0deg');heart.style.transform='';$('#v36HeartCaption').textContent='Maintiens le cœur.'
    };
    heart.onpointerdown=begin;heart.onpointerup=cancel;heart.onpointercancel=cancel;
    setTimeout(()=>{
      if(revealed||!heart?.isConnected)return;
      const fallback=document.createElement('button');
      fallback.className='btn secondary v40-final-fallback';
      fallback.id='v40FinalFallback';
      fallback.textContent='Ouvrir la lettre';
      fallback.onclick=()=>{if(revealed)return;revealed=true;down=false;cancelAnimationFrame(raf);reveal()};
      heart.parentElement?.append(fallback)
    },4500);

    function reveal(){
      const callback=[];
      if(S.choices.v31_cellar?.bonus)callback.push('même les caves finissent par devenir un souvenir');
      if(S.choices.v31_sink==='reversed')callback.push('même un lavabo monté à l’envers finit dans votre histoire');
      if(S.choices.v32_horror)callback.push('même les pièces les plus étranges n’ont fait que répéter vos traces');
      const extra=callback.length?'<p class="v36-callback-letter">'+callback.slice(0,2).join(' ; ')+'.</p>':'';
      screen(
        '<div class="v36-letter-scene">'+
          '<div class="v36-letter-glow"></div>'+
          '<div class="v36-final-letter">'+
            '<div class="eyebrow">POUR RAPHY</div>'+
            '<p>Ce jeu regarde beaucoup en arrière, mais pas pour rester dans le passé.</p>'+
            '<p>Il regarde tous ces détails parce qu’ils racontent quelque chose que les grandes déclarations racontent moins bien : une histoire se construit aussi avec deux bouteilles d’eau, un parking, un fou rire, une journée compliquée, des travaux, un trajet et tous les moments auxquels personne n’aurait pensé donner un titre.</p>'+
            extra+
            '<p>J’aime ta force, ton courage, ton sourire, ta répartie et la place que tu as prise dans ma vie.</p>'+
            '<p>Je ne sais pas exactement quelles seront les prochaines traces. Et c’est très bien comme ça.</p>'+
            '<h1>Je t’aime ❤️</h1>'+
            '<div class="actions"><button class="btn" id="v36Credits">Voir le générique</button><button class="btn secondary" id="v36Replay">Rejouer une trace</button></div>'+
          '</div>'+
        '</div>',
        'centered v36-letter-screen'
      );
      $('#v36Credits').onclick=credits;$('#v36Replay').onclick=replay
    }
  };

  credits = function(){
    const choicesCount=Object.keys(S.choices||{}).length;
    const doneCount=Object.keys(S.done||{}).filter(k=>S.done[k]).length;
    const callbacks=[
      S.choices.v31_cellar?'Cave : officiellement rangée':'Cave : dossier classé',
      S.choices.v31_car?'Voiture : 100 % + 1 patte':'Voiture : propre en théorie',
      S.choices.v32_house?'Maison : toujours suspecte':'Maison : non interrogée'
    ];
    screen(
      '<div class="v36-credits">'+
        '<div class="v36-credit-roll">'+
          '<section><div class="eyebrow">SUR LES TRACES DE RAPHY</div><h1>Générique</h1><p>Une production excessivement personnelle.</p></section>'+
          '<section><small>AVEC</small><h2>Raphy</h2><p>Héroïne principale · répartie · courage · spécialiste du « ça va ».</p></section>'+
          '<section><small>CRÉÉ PAR</small><h2>Mehdi</h2><p>Scénario · souvenirs · confiance parfois injustifiée.</p></section>'+
          '<section><small>DIRECTION DU CHAOS</small><h2>Hamoud</h2><p>Vol de joint · traces de pattes · surveillance de chantier · aucune déclaration officielle.</p></section>'+
          '<section><small>MEILLEUR SECOND RÔLE LIQUIDE</small><h2>Deux Cristaline</h2><p>30 avril · retour inattendu · carrière fulgurante.</p></section>'+
          '<section><small>ACCESSOIRES MÉMORABLES</small><p>Une balançoire en pneu · une nappe de plage · des sushi · un petit train · un lavabo trop sûr de lui.</p></section>'+
          '<section><small>ÉTAT DU DOSSIER</small><div class="v36-credit-stats"><span><b>'+doneCount+'</b>/26 traces</span><span><b>'+choicesCount+'</b> choix mémorisés</span></div></section>'+
          '<section><small>APRÈS ENQUÊTE</small><p>'+callbacks.join(' · ')+'</p></section>'+
          '<section class="v36-credit-tender"><small>ET POUR LA SUITE</small><h2>À nous.</h2><p>Le prochain chapitre n’est pas encore écrit.</p></section>'+
          '<section class="v36-credit-end"><h1>❤️</h1><p>fin de cette version<br>pas de l’histoire</p></section>'+
        '</div>'+
        '<div class="v36-credit-controls"><button class="btn" id="v36CreditReplay">Rejouer</button><button class="btn secondary" id="v36CreditFast">Accélérer</button></div>'+
      '</div>',
      'v36-credits-screen'
    );
    $('#v36CreditReplay').onclick=replay;
    $('#v36CreditFast').onclick=()=>document.querySelector('.v36-credit-roll')?.classList.add('fast')
  };

  if(window.RaphyApp)window.RaphyApp.version=BUILD;
  window.RaphyBuild=BUILD;
})();

window.RaphyBuild='37';
if(window.RaphyApp)window.RaphyApp.version='37';

/* ===== V38 SLOWER IMMERSIVE PACING ===== */
(()=>{
  const BUILD='38';
  const PACE_KEY='raphy-v38-pace';
  let pace=localStorage.getItem(PACE_KEY)||'immersive';
  let sceneStartedAt=performance.now();

  const routeV38=route;
  route=function(i){
    sceneStartedAt=performance.now();
    return routeV38(i)
  };

  const pacingNotes=[
    'Prends une seconde. La prochaine trace peut attendre.',
    'Le dossier ne se ferme pas tout seul. Pas cette fois.',
    'Une trace de plus. Laisse-la rester un peu avant la suivante.',
    'Pas besoin de courir. Ce jeu n’est pas un chrono.',
    'Hamoud a demandé une pause administrative. Pour une fois, il a raison.',
    'La maison garde ce détail. Toi, tu peux garder quelques secondes.'
  ];

  chapterCurtain=function(fromIndex,nextIndex,skipped){
    const ominous=[3,8,17,18,19,20,21,22,24].includes(fromIndex);
    const elapsed=Math.max(0,Math.round((performance.now()-sceneStartedAt)/1000));
    const minHold=pace==='immersive'?4500:1200;
    const note=pacingNotes[fromIndex%pacingNotes.length];

    screen(
      '<div class="v38-curtain '+(ominous?'ominous':'')+'">'+
        '<div class="v38-curtain-orbit"><span>'+(ominous?'◌':'✦')+'</span></div>'+
        '<div class="eyebrow">'+(skipped?'TRACE PASSÉE':'TRACE CLASSÉE')+'</div>'+
        '<h2>'+NAMES[fromIndex]+'</h2>'+
        '<div class="v38-curtain-rule"></div>'+
        '<p class="v38-curtain-note">'+note+'</p>'+
        '<div class="v38-curtain-meta"><span>'+Math.max(1,elapsed)+' s dans cette trace</span><span>'+(fromIndex+1)+'/26</span></div>'+
        '<div class="v38-next-preview"><small>PROCHAINE TRACE</small><h3>'+NAMES[nextIndex]+'</h3></div>'+
        '<button class="btn secondary v38-next-btn" id="v38CurtainNext" disabled>Continue quand tu veux</button>'+
        '<div class="v38-wait" id="v38Wait"><i></i><span>On laisse respirer l’histoire…</span></div>'+
      '</div>',
      'centered'
    );

    let ready=false,fired=false;
    const btn=$('#v38CurtainNext'),wait=$('#v38Wait');
    setTimeout(()=>{
      if(!btn?.isConnected)return;
      ready=true;btn.disabled=false;
      btn.textContent='Continuer vers « '+NAMES[nextIndex]+' »';
      wait?.classList.add('ready');
      if(wait)wait.querySelector('span').textContent='À toi de décider quand continuer.';
      vib(5)
    },minHold);

    btn.onclick=()=>{
      if(!ready||fired)return;
      fired=true;btn.disabled=true;
      route(nextIndex)
    }
  };

  // Replace the old settings UI so pace can be controlled explicitly.
  openSettings=function(){
    modal.hidden=false;
    modal.innerHTML=
      '<div class="modal-card v24-modal">'+
        '<div class="eyebrow">RÉGLAGES</div><h2>À ta façon.</h2>'+
        '<div class="v24-setting"><div><b>Rythme</b><small>Immersif = pauses entre les traces. Rapide = transitions plus courtes.</small></div><button class="btn small secondary" id="setPace">'+(pace==='immersive'?'Immersif':'Rapide')+'</button></div>'+
        '<div class="v24-setting"><div><b>Son</b><small>Effets discrets générés par le navigateur.</small></div><button class="btn small secondary" id="setSound">'+(prefs.sound?'Activé':'Coupé')+'</button></div>'+
        '<div class="v24-setting"><div><b>Animations</b><small>Réduire les mouvements si tu préfères.</small></div><button class="btn small secondary" id="setMotion">'+(prefs.motion?'Normales':'Réduites')+'</button></div>'+
        '<div class="v24-setting"><div><b>Horreur</b><small>Réduit insectes, ombre et effets soudains.</small></div><button class="btn small secondary" id="setFear">'+(prefs.fear==='reduced'?'Réduite':'Normale')+'</button></div>'+
        '<button class="btn" id="setClose" style="margin-top:14px">Fermer</button>'+
      '</div>';
    $('#setPace').onclick=()=>{
      pace=pace==='immersive'?'fast':'immersive';
      localStorage.setItem(PACE_KEY,pace);
      toast(pace==='immersive'?'Rythme immersif activé : plus de pauses, aucun enchaînement automatique.':'Rythme rapide activé.');
      openSettings()
    };
    $('#setSound').onclick=()=>{prefs.sound=!prefs.sound;savePrefs();openSettings();syncControls()};
    $('#setMotion').onclick=()=>{prefs.motion=!prefs.motion;savePrefs();applyPrefs();openSettings()};
    $('#setFear').onclick=()=>{prefs.fear=prefs.fear==='reduced'?'normal':'reduced';savePrefs();applyPrefs();openSettings()};
    $('#setClose').onclick=()=>{modal.hidden=true;modal.innerHTML=''}
  };

  // Make act separators manual too in immersive mode.
  showAct=function(i,def,continueFn){
    screen(
      '<div class="v38-act">'+
        '<div class="v24-act-symbol">'+def[3]+'</div>'+
        '<div class="eyebrow">'+def[0]+'</div>'+
        '<h1>'+def[1]+'</h1>'+
        '<div class="v24-rule"></div>'+
        '<p>'+def[2]+'</p>'+
        '<button class="btn secondary" id="v38ActGo">'+(pace==='immersive'?'Entrer dans cet acte':'Continuer')+'</button>'+
      '</div>',
      'centered'
    );
    let gone=false;
    const go=()=>{if(gone)return;gone=true;continueFn()};
    $('#v38ActGo').onclick=go;
    if(pace!=='immersive')setTimeout(go,i>=18?2600:1800)
  };

  // A brief "result beat" before certain short multi-question scenes advance internally.
  document.addEventListener('click',e=>{
    const next=e.target.closest('#gnext,#v36GNext');
    if(!next||pace!=='immersive')return;
    next.disabled=true;
    const old=next.textContent;
    next.textContent='Un instant…';
    setTimeout(()=>{if(next.isConnected){next.disabled=false;next.textContent=old}},700)
  },true);

  if(window.RaphyApp)window.RaphyApp.version=BUILD;
  window.RaphyBuild=BUILD;
})();


/* ===== V39 MASKED NUMBER REBUILD ===== */
(()=>{
  const BUILD='39';

  unknown = function(){
    const firstChoice=['tu l’as clashé','tu as fait comme si tu n’avais rien remarqué','tu lui as laissé croire qu’il avait le dernier mot'][S.choices.story0??0];
    const alg=S.choices.algeria;
    const remembered=[];
    if(S.choices.v31_sink==='reversed')remembered.push('le rouge et le bleu');
    if(S.choices.v31_car)remembered.push('la patte laissée sur la voiture');
    if(S.choices.v31_paint)remembered.push('les retouches du mur');
    if(S.choices.v32_horror)remembered.push('le couloir');
    if(S.choices.v32_house)remembered.push('la pièce qui changeait');

    let phase='ring';
    let msgIndex=0;
    let entered='';
    const messages=[
      'Je me souviens du magasin de lunettes.',
      'Dans ta version, '+firstChoice+'.',
      'Je me souviens des deux bouteilles. Du pneu. De la plage.',
      remembered.length
        ?'Je me souviens aussi de '+remembered.slice(0,3).join(', ')+'.'
        :'Je me souviens des détails que tu pensais inutiles.',
      alg===1
        ?'Et de cette offre immobilière où Mehdi devait finalement gérer cinq enfants.'
        :alg===0
          ?'Et tu as refusé la brochure Algérie sans négocier les frais de dossier.'
          :'Et la brochure immobilière reste juridiquement discutable.',
      'Mais il manque une vérification.'
    ];

    const renderRing=()=>{
      phase='ring';
      screen(
        top(20)+hero('Trace 21','Numéro masqué','Cette fois, rien ne s’enchaîne tout seul. Chaque étape attend ton action.')+
        '<div class="v39-call" id="v39Call">'+
          '<div class="v39-call-static"></div>'+
          '<div class="v39-call-orb">?</div>'+
          '<div class="v39-call-label">NUMÉRO MASQUÉ</div>'+
          '<div class="v39-call-sub">appel entrant · source inconnue</div>'+
          '<div class="v39-call-actions">'+
            '<button type="button" class="v39-call-btn decline" id="v39Decline" aria-label="Refuser">✕</button>'+
            '<button type="button" class="v39-call-btn accept" id="v39Accept" aria-label="Décrocher">✓</button>'+
          '</div>'+
          '<div class="v39-call-hint">Choisis : décrocher ou refuser.</div>'+
        '</div>'+
        skip(20)
      );
      wireSkip(20);
      $('#v39Accept').onclick=()=>startConversation(false);
      $('#v39Decline').onclick=()=>startConversation(true);
    };

    const startConversation=(refused)=>{
      phase='messages';msgIndex=0;
      screen(
        top(20)+hero('Trace 21','Numéro masqué',refused?'Tu as refusé. Pourtant, le message est déjà là.':'Tu as décroché. Il n’y a aucune voix.')+
        '<div class="v39-phone">'+
          '<div class="v39-phone-top"><span>19:47</span><b>MASQUÉ</b><span>•••</span></div>'+
          '<div class="v39-thread" id="v39Thread">'+
            '<div class="v39-msg in">'+(refused?'Refuser était logique.':'Tu as décroché.')+'</div>'+
          '</div>'+
          '<div class="v39-phone-controls" id="v39PhoneControls">'+
            '<button class="btn" id="v39NextMsg">Lire le message suivant</button>'+
          '</div>'+
        '</div>'+
        skip(20)
      );
      wireSkip(20);
      $('#v39NextMsg').onclick=showNextMessage;
    };

    const scrollThread=()=>{
      const t=$('#v39Thread');
      if(t)t.scrollTop=t.scrollHeight
    };

    const showNextMessage=()=>{
      if(phase!=='messages')return;
      const thread=$('#v39Thread'),btn=$('#v39NextMsg');
      if(!thread||!btn)return;
      if(msgIndex>=messages.length){return askDate()}
      const text=messages[msgIndex++];
      const m=document.createElement('div');
      m.className='v39-msg in reveal';
      m.textContent=text;
      thread.append(m);
      vib(4);
      scrollThread();
      btn.textContent=msgIndex<messages.length?'Lire la suite':'Répondre à la vérification';
      if(msgIndex===messages.length){
        btn.onclick=askDate;
      }
    };

    const askDate=()=>{
      if(phase==='date')return;
      phase='date';entered='';
      const thread=$('#v39Thread');
      if(!thread)return;
      const q=document.createElement('div');
      q.className='v39-msg in reveal important';
      q.textContent='Premier vrai rendez-vous surprise. Jour + mois.';
      thread.append(q);
      scrollThread();

      $('#v39PhoneControls').innerHTML=
        '<div class="v39-date-box">'+
          '<div class="eyebrow">RÉPONSE · JJMM</div>'+
          '<div class="v39-date-display" id="v39DateDisplay"><i></i><i></i><i></i><i></i></div>'+
          '<input id="v39DateInput" class="v39-date-input" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" aria-label="Date au format JJMM">'+
          '<div class="v39-date-keypad">'+
            [1,2,3,4,5,6,7,8,9].map(n=>'<button type="button" data-v39key="'+n+'">'+n+'</button>').join('')+
            '<button type="button" data-v39key="clear">C</button>'+
            '<button type="button" data-v39key="0">0</button>'+
            '<button type="button" data-v39key="back">⌫</button>'+
          '</div>'+
          '<button class="btn" id="v39SendDate" disabled>Envoyer</button>'+
          '<div class="v39-date-error" id="v39DateError"></div>'+
        '</div>';

      const input=$('#v39DateInput'),send=$('#v39SendDate');
      const paint=()=>{
        entered=(input.value||entered).replace(/\D/g,'').slice(0,4);
        input.value=entered;
        $$('#v39DateDisplay i').forEach((d,i)=>d.classList.toggle('filled',i<entered.length));
        send.disabled=entered.length!==4;
        $('#v39DateError').textContent=''
      };
      input.addEventListener('input',paint);
      input.addEventListener('keydown',e=>{if(e.key==='Enter'&&entered.length===4)validateDate()});
      $$('[data-v39key]').forEach(b=>b.onclick=()=>{
        const k=b.dataset.v39key;
        if(k==='clear')entered='';
        else if(k==='back')entered=entered.slice(0,-1);
        else if(entered.length<4)entered+=k;
        input.value=entered;paint();vib(3)
      });
      send.onclick=validateDate;
      paint()
    };

    const validateDate=()=>{
      if(phase!=='date')return;
      entered=($('#v39DateInput')?.value||entered).replace(/\D/g,'').slice(0,4);
      if(entered!=='1105'){
        const err=$('#v39DateError');
        if(err)err.textContent='Ce n’est pas cette date. Indice : la plage, les sushi, le premier baiser.';
        vib([8,18,8]);
        return
      }
      phase='reveal';
      const thread=$('#v39Thread');
      thread.insertAdjacentHTML('beforeend','<div class="v39-msg out reveal">1105</div>');
      $('#v39PhoneControls').innerHTML='<button class="btn secondary" id="v39Reveal1">Lire la réponse</button>';
      scrollThread();
      $('#v39Reveal1').onclick=()=>revealStep(0)
    };

    const revealLines=[
      'Bien.',
      'Tu pensais chercher ce que la maison avait caché.',
      'Elle n’a rien caché.',
      'Elle a appris à te reconnaître à travers ce que tu laisses derrière toi.',
      'Des traces.'
    ];

    const revealStep=(i)=>{
      if(phase!=='reveal')return;
      const thread=$('#v39Thread');
      if(!thread)return;
      const m=document.createElement('div');
      m.className='v39-msg in reveal '+(i===revealLines.length-1?'final':'');
      m.textContent=revealLines[i];
      thread.append(m);scrollThread();vib(i===revealLines.length-1?[12,24,36]:4);
      if(i<revealLines.length-1){
        $('#v39PhoneControls').innerHTML='<button class="btn secondary" id="v39RevealNext">Continuer</button>';
        $('#v39RevealNext').onclick=()=>revealStep(i+1)
      }else{
        phase='hangup';
        $('#v39PhoneControls').innerHTML='<button class="btn danger" id="v39Hangup">Raccrocher</button>';
        $('#v39Hangup').onclick=renderAfterCall
      }
    };

    const renderAfterCall=()=>{
      phase='after';
      screen(
        '<div class="v39-after-call">'+
          '<div class="v39-glitch-word">TRACE</div>'+
          '<p>Une serrure vient de s’ouvrir quelque part dans la maison.</p>'+
          '<p class="caption">L’appel est terminé. La suite n’avancera pas sans toi.</p>'+
          '<button class="btn secondary" id="v39FindLock">Trouver laquelle</button>'+
        '</div>',
        'centered horror'
      );
      $('#v39FindLock').onclick=()=>{
        $('#v39FindLock').disabled=true;
        complete(20)
      }
    };

    renderRing()
  };

  if(window.RaphyApp)window.RaphyApp.version=BUILD;
  window.RaphyBuild=BUILD;
})();

window.RaphyBuild='41';
if(window.RaphyApp)window.RaphyApp.version='41';
window.__raphyRuntimePhase='booted';
}catch(e){
window.__raphyRuntimePhase='runtime-error';
window.__raphyRuntimeError=String(e&&e.stack||e);
throw e;
}
})();