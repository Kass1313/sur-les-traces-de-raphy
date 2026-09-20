'use strict';

(()=>{
  const AUDIO_KEY='raphy-sound-v1';
  let enabled=localStorage.getItem(AUDIO_KEY)!=='off';
  let ctx=null,ringTimer=null,heartTimer=null,lastClick=0;

  const ensure=()=>{
    if(!enabled)return null;
    try{
      if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state==='suspended')ctx.resume();
      return ctx
    }catch{return null}
  };

  const tone=(freq=440,dur=.08,type='sine',gain=.025,delay=0)=>{
    const c=ensure();if(!c)return;
    const o=c.createOscillator(),g=c.createGain();
    o.type=type;o.frequency.setValueAtTime(freq,c.currentTime+delay);
    g.gain.setValueAtTime(0.0001,c.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),c.currentTime+delay+.01);
    g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+delay+dur);
    o.connect(g);g.connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+dur+.02)
  };

  const sfx={
    tap:()=>tone(520,.045,'sine',.018),
    soft:()=>{tone(360,.07,'sine',.016);tone(540,.08,'sine',.012,.045)},
    success:()=>{tone(440,.08,'sine',.024);tone(660,.10,'sine',.022,.08);tone(880,.14,'sine',.018,.17)},
    wrong:()=>{tone(210,.09,'triangle',.018);tone(165,.12,'triangle',.014,.07)},
    transition:()=>{tone(260,.20,'sine',.012);tone(390,.24,'sine',.009,.08)},
    glitch:()=>{tone(95,.12,'sawtooth',.012);tone(72,.18,'square',.008,.08)},
    beat:()=>{tone(78,.08,'sine',.036);tone(55,.12,'sine',.018,.05)}
  };

  const dock=document.createElement('button');
  dock.id='soundDock';dock.className='sound-dock';dock.type='button';
  const renderDock=()=>{dock.textContent=enabled?'♪':'∅';dock.setAttribute('aria-label',enabled?'Couper le son':'Activer le son');dock.title=enabled?'Son activé':'Son coupé'};
  renderDock();document.body.append(dock);
  dock.onclick=e=>{e.stopPropagation();enabled=!enabled;localStorage.setItem(AUDIO_KEY,enabled?'on':'off');renderDock();if(!enabled){stopRing();stopHeart()}else{sfx.success();scanScene()}};

  document.addEventListener('pointerdown',e=>{
    ensure();
    const now=performance.now();
    if(now-lastClick<55)return;lastClick=now;
    if(e.target.closest('#soundDock'))return;
    if(e.target.closest('.call-accept')){sfx.success();stopRing();return}
    if(e.target.closest('.call-decline')){sfx.wrong();stopRing();return}
    if(e.target.closest('.hold-heart')){startHeart();return}
    if(e.target.closest('.btn,.choice,.item,.escape-symbol,.valve,.paw-cell,.battery-node,.school-item,.memory-chip,.bin,.cellar-box'))sfx.tap()
  },{capture:true});

  document.addEventListener('pointerup',e=>{if(e.target.closest('.hold-heart'))stopHeart()},{capture:true});
  document.addEventListener('pointercancel',stopHeart,{capture:true});

  function startRing(){
    if(ringTimer||!enabled)return;
    const ring=()=>{if(!document.querySelector('.incoming-call'))return stopRing();tone(740,.12,'sine',.025);tone(920,.12,'sine',.02,.16);tone(740,.12,'sine',.018,.34)};
    ring();ringTimer=setInterval(ring,1450)
  }
  function stopRing(){if(ringTimer){clearInterval(ringTimer);ringTimer=null}}

  function startHeart(){
    if(heartTimer||!enabled)return;
    sfx.beat();heartTimer=setInterval(()=>{if(!document.querySelector('.hold-heart'))return stopHeart();sfx.beat()},760)
  }
  function stopHeart(){if(heartTimer){clearInterval(heartTimer);heartTimer=null}}

  function scanScene(){
    if(!enabled)return;
    if(document.querySelector('.incoming-call'))startRing();else stopRing();
    if(document.querySelector('.chapter-curtain'))sfx.transition();
    if(document.querySelector('.glitch-word'))sfx.glitch()
  }

  const observer=new MutationObserver(muts=>{
    let relevant=false;
    for(const m of muts){if(m.type==='childList'&&m.addedNodes.length){relevant=true;break}}
    if(relevant)setTimeout(scanScene,30)
  });
  observer.observe(document.body,{childList:true,subtree:true});

  const toastObserver=new MutationObserver(()=>{
    if(!toastBox?.classList.contains('show')||!enabled)return;
    const t=(toastBox.textContent||'').toLowerCase();
    if(t.includes('non.')||t.includes('refus')||t.includes('trop tôt')||t.includes('rat'))sfx.wrong();
    else if(t.includes('termin')||t.includes('réussi')||t.includes('parfait')||t.includes('exact'))sfx.soft()
  });
  if(typeof toastBox!=='undefined')toastObserver.observe(toastBox,{attributes:true,attributeFilter:['class']});

  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopRing();stopHeart()}else scanScene()});
})();
