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

if(S.unlocked&&!S.storyDone)opening();
