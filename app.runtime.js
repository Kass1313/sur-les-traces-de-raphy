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
let S=(()=>{try{return {...D,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...D}}})();
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
screen('<div class="lock-mark">🔒</div>'+hero('Accès restreint','Une personne seulement.','Si tu n’es pas Raphy, pose ce téléphone avec beaucoup de dignité.')+'<div class="card glow"><input id="pin" class="code-input" inputmode="numeric" maxlength="6" placeholder="••••••"><div class="actions" style="margin-top:12px"><button class="btn" id="go">Entrer</button><button class="btn secondary" id="hint">Tu veux un indice ?</button></div><div id="hz" class="hint-zone"></div></div>','centered');
let tries=0,h=0,dodge=0;const attempt=()=>{tries++;if($('#pin').value===CODE){S.unlocked=true;save();vib([30,30,60]);toast('Bon. C’était bien toi. J’avais un doute extrêmement injustifié.');setTimeout(opening,500)}else{$('#pin').value='';toast(['Non. Mais la confiance était magnifique.','Le code demande un avocat.','Six chiffres ont bien été saisis. C’est déjà quelque chose.','Raphy a choisi la confiance. Le clavier recommande la prudence.'][Math.min(tries-1,3)])}};
$('#go').onclick=attempt;$('#pin').onkeydown=e=>e.key==='Enter'&&attempt();
$('#hint').onclick=()=>{h++;if(h===1){$('#hz').innerHTML='<div class="card soft"><b>Haha…</b><br>Tu peux pas te passer de moi deux minutes ? Tu veux VRAIMENT un indice ?<div class="actions two" style="margin-top:12px"><button class="btn small" id="yes">Oui 🙄</button><button class="btn small secondary runaway" id="no">Non</button></div></div>';let no=$('#no'),z=$('#hz');const run=()=>{dodge++;no.style.left=Math.random()*Math.max(20,z.clientWidth-no.offsetWidth-20)+'px';no.style.top=(35+Math.random()*25)+'px';if(dodge>2){no.textContent='Très courageuse.';setTimeout(()=>no.remove(),500)}};no.onpointerenter=run;no.onclick=run;$('#yes').onclick=()=>$('#hz').innerHTML='<div class="card soft"><b>Indice 1 :</b> une date commune. Six chiffres. Non, 123456 n’est pas romantique.</div>'}else if(h===2)$('#hz').innerHTML='<div class="card soft"><b>Indice 2 :</b> ça commence par <b>06</b>. Là je t’aide beaucoup trop.</div>';else $('#hz').innerHTML='<div class="card soft"><b>Bon :</b> 06 • 03 • 61. Si tu rates encore, le clavier demande une pause.</div>'};
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
    $('[data-v24r]').forEach(b=>b.onclick=()=>route(+b.dataset.v24r))
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

window.__raphyRuntimePhase='booted';
}catch(e){
window.__raphyRuntimePhase='runtime-error';
window.__raphyRuntimeError=String(e&&e.stack||e);
throw e;
}
})();