const CACHE_NAME = 'pwa-cache-v2'; // Change version number when files update.
const urlsToCache = [
    '/',
    '/index.html',
    '/main.css',
    '/mechanics.html',
    '/startGame.html',
    '/styles.css',
    '/script.js',
    '/app.js',
    '/assets/192x192.png',
    '/assets/512x512.png',
    '/assets/mechanics.png',
    '/assets/Numerazzle.png',
    '/assets/numerazzleBrain.png',
    '/assets/numerazzleHeader.png',
    '/images/math1.png',
    '/images/math2.png',
    '/images/math3.png',
    '/images/math4.png',
    '/images/math5.png',
    '/images/math6.png',
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
