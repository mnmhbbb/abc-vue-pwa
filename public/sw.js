const CACHE_NAME = 'v1.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index-BX34O8qC.css',
  '/assets/index-DOXXdNF3.js',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-256x256.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files');
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

self.addEventListener('fetch', (event) => {
  const { url } = event.request;

  // 특정 URL에 대한 커스텀 응답 처리
  if (url === 'https://jsonplaceholder.typicode.com/users/1') {
    event.respondWith(
      new Response(
        JSON.stringify({
          message: 'this message is re-written by service-worker',
        }),
      ),
    );
  }
  // 나머지 요청에 대한 캐시 처리
  else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
        .catch(() => {
          return caches.match('/index.html');
        }),
    );
  }
});
