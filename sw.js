/* FieldCast Pro v2 — Service Worker
   Strategy: stale-while-revalidate for app shell,
   network-first for API calls (always fresh weather data) */
const CACHE_NAME = 'fieldcast-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: stale-while-revalidate for app shell, network-first for APIs
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API requests: always network-first (fresh weather data)
  if (url.hostname.includes('open-meteo.com') ||
      url.hostname.includes('environment.data.gov.uk') ||
      url.hostname.includes('api.postcodes.io') ||
      url.hostname.includes('nominatim.openstreetmap.org') ||
      url.hostname.includes('api.rss2json.com') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // App shell: stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});