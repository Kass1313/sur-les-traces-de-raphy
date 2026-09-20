const CACHE='raphy-v44-desktop-safari-call';
const CORE=['./','./index.html','./styles.bundle.css','./app.runtime.js','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
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
  const u=new URL(e.request.url);
  const critical=e.request.mode==='navigate'||/\/(index\.html|app\.runtime\.js|styles\.bundle\.css|manifest\.json)$/.test(u.pathname);
  e.respondWith(critical?networkFirst(e.request):caches.match(e.request).then(hit=>hit||fetch(e.request)))
})