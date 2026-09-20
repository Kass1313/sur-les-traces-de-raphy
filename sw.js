const CACHE='raphy-v19-20260920';
const CORE=['./','./index.html','./styles.bundle.css','./app.bundle.js','./boot-safe.js','./manifest.json','./icon.svg'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))
});

self.addEventListener('activate',e=>{
  e.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
    self.clients.claim()
  ]))
});

async function networkFirst(req){
  const cache=await caches.open(CACHE);
  try{
    const res=await fetch(req,{cache:'no-store'});
    if(res&&res.ok)cache.put(req,res.clone());
    return res
  }catch{
    return (await caches.match(req))||(req.mode==='navigate'?await caches.match('./index.html'):Response.error())
  }
}

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const critical=e.request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/app.bundle.js')||url.pathname.endsWith('/boot-safe.js')||url.pathname.endsWith('/styles.bundle.css');
  if(critical){e.respondWith(networkFirst(e.request));return}
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return res})))
});