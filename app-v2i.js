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
