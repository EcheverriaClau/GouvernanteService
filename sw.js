// ===== SERVICE WORKER =====
const CACHE_NAME = 'menage-hotel-v1';
const BASE = '/GouvernanteService/';

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'style.css',
  BASE + 'data.js',
  BASE + 'app.js',
  BASE + 'distribucion.js',
  BASE + 'horario.js',
  BASE + 'pdf.js',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
