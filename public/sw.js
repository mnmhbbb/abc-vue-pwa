self.addEventListener('install', (event) => {
  console.log('Service worker Installing!');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker Activating!');
  return self.clients.claim();
});
