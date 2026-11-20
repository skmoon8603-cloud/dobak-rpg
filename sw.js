// 도박 RPG 서비스 워커: 앱 설치(플레이스토어 TWA)용. 항상 최신 게임을 받아오고, 오프라인일 때만 저장해 둔 화면을 보여준다.
const C = 'dobakrpg-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then((c) => c.addAll(['./', './icon-192.png', './icon-512.png']).catch(() => {}))); });
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin || r.url.includes('/api/') || r.url.includes('socket.io')) return;
  if (r.mode === 'navigate') e.respondWith(fetch(r).then((res) => { const cp = res.clone(); caches.open(C).then((c) => c.put('./', cp)); return res; }).catch(() => caches.match('./')));
});
