'use strict';

(()=>{
  const previousRoute=route;
  const firstRun=!sessionStorage.getItem('raphy-session-started');
  sessionStorage.setItem('raphy-session-started','1');

  route=function(i,opts={}){
    document.documentElement.style.setProperty('--scene-progress',((i+1)/26*100)+'%');
    if(firstRun&&S.unlocked&&S.storyDone&&S.current>0&&!sessionStorage.getItem('raphy-resume-shown')){
      sessionStorage.setItem('raphy-resume-shown','1');
      return resumeScreen(i,opts)
    }
    return previousRoute(i,opts)
  };

  function resumeScreen(i,opts){
    screen(
      '<div class="resume-shell">'+
        '<div class="resume-ring"><span>'+String(i+1).padStart(2,'0')+'</span></div>'+
        '<div class="eyebrow">PROGRESSION RETROUVÉE</div>'+
        '<h1>Tu t’étais arrêtée ici.</h1>'+
        '<p>'+NAMES[i]+'</p>'+
        '<div class="resume-meter"><i style="width:'+((i+1)/26*100)+'%"></i></div>'+
        '<div class="actions"><button class="btn" id="resumeNow">Reprendre</button><button class="btn secondary" id="resumeMenu">Voir les traces débloquées</button></div>'+
        '<small>La progression est enregistrée uniquement sur cet appareil.</small>'+
      '</div>',
      'centered resume-screen'
    );
    $('#resumeNow').onclick=()=>previousRoute(i,opts);
    $('#resumeMenu').onclick=replay
  }

  document.addEventListener('pointermove',e=>{
    const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
    document.documentElement.style.setProperty('--parallax-x',(x*10).toFixed(2)+'px');
    document.documentElement.style.setProperty('--parallax-y',(y*8).toFixed(2)+'px')
  },{passive:true});

  const standalone=window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches;
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;

  const modalObserver=new MutationObserver(()=>{
    if(modal.hidden||!modal.querySelector('.pause-card')||modal.querySelector('#installHelp'))return;
    if(standalone)return;
    const btn=document.createElement('button');
    btn.className='btn secondary';
    btn.id='installHelp';
    btn.textContent=isIOS?'Installer sur l’iPhone':'Installer comme application';
    const actions=modal.querySelector('.pause-card .actions');
    actions&&actions.append(btn);
    btn.onclick=()=>{
      const text=isIOS
        ?'<div class="install-sheet"><div class="install-icon">↥</div><h3>Installer sur l’iPhone</h3><p>Dans Safari : touche <b>Partager</b>, puis <b>Sur l’écran d’accueil</b>, puis <b>Ajouter</b>.</p><p class="caption">Après ça, le jeu s’ouvrira comme une app plein écran.</p></div>'
        :'<div class="install-sheet"><h3>Installer l’application</h3><p>Utilise l’option <b>Installer l’application</b> ou <b>Ajouter à l’écran d’accueil</b> dans le menu de ton navigateur.</p></div>';
      const sheet=document.createElement('div');
      sheet.innerHTML=text;
      modal.querySelector('.pause-card').prepend(sheet.firstElementChild)
    }
  });
  modalObserver.observe(modal,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});

  if('serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(()=>{
      document.body.classList.add('offline-ready');
      if(!sessionStorage.getItem('raphy-offline-notice')){
        sessionStorage.setItem('raphy-offline-notice','1');
        setTimeout(()=>{if(S.unlocked)toast('App prête hors ligne après cette première visite.',2200)},1800)
      }
    }).catch(()=>{})
  }
})();
