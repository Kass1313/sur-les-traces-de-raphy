'use strict';

(()=>{
  const root=document.getElementById('app');

  function fallback(err){
    if(!root)return;
    root.innerHTML='<main class="screen centered"><div class="lock-mark">⚠️</div><section class="hero"><div class="eyebrow">RÉCUPÉRATION</div><h1>Le jeu a trébuché.</h1><p>Pas toi. Le code. Hamoud est déjà suspect.</p></section><div class="card glow"><p class="caption">Recharge la version la plus récente. Si ça persiste, efface uniquement la progression locale puis recommence.</p><div class="actions"><button class="btn" id="safeReload">Recharger</button><button class="btn secondary" id="safeReset">Réinitialiser la progression</button></div></div></main>';
    document.getElementById('safeReload').onclick=()=>location.reload();
    document.getElementById('safeReset').onclick=()=>{try{localStorage.removeItem('raphy-v8')}catch{}location.reload()};
    console.error('Raphy recovery:',err);
  }

  function bootSafe(){
    if(!root||root.children.length)return;
    try{
      if(typeof S!=='undefined'&&S.unlocked){
        if(S.storyDone&&typeof route==='function')route(S.current||0);
        else if(typeof opening==='function')opening();
        else fallback('opening unavailable')
      }else if(typeof lock==='function'){
        lock()
      }else{
        fallback('lock unavailable')
      }
    }catch(e){
      fallback(e)
    }
  }

  window.addEventListener('error',e=>{
    setTimeout(()=>{if(root&&!root.children.length)fallback(e.error||e.message||'runtime error')},0)
  });

  window.addEventListener('unhandledrejection',e=>{
    setTimeout(()=>{if(root&&!root.children.length)fallback(e.reason||'promise rejection')},0)
  });

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(bootSafe,80));
  else setTimeout(bootSafe,80);

  setTimeout(bootSafe,600);
})();
