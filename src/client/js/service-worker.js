// service-worker.js

const CACHE_NAME = 'travel-app-cache-v1';
const urlsToCache = [
  '/', // Ensure your index.html is cached
  '/index.html',
  '/bundle.js',
  // If you have extracted CSS, add its path here (e.g., '/styles/style.css')
];

// During installation, open the cache and pre-cache our assets.
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and respond with cached resources if available.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached resource if found, else fetch from network.
        return response || fetch(event.request);
      })
  );
});

// Optional: Activate event to clean up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
