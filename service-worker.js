const CACHE_NAME = 'pwa-cache-v2'; // Change version number when files update.
const urlsToCache = [
    'index.html',
    'main.css',
    'mechanics.html',
    'startGame.html',
    'styles.css',
    'script.js',
    'app.js',
    'assets/favicon.ico',
    'assets/192x192.png',
    'assets/512x512.png',
    'assets/mechanics.png',
    'assets/Numerazzle.png',
    'assets/numerazzleBrain.png',
    'assets/numerazzleHeader.png',
    'images/math1.png',
    'images/math2.png',
    'images/math3.png',
    'images/math4.png',
    'images/math5.png',
    'images/math6.png',
];

// Install Event
self.addEventListener('install', (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker activated...");
});


// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If the file is in the cache, return it
            if (response) {
                return response;
            }

            // Else, fetch from the network
            return fetch(event.request).then((networkResponse) => {
                // Optionally add new files to cache here
                return caches.open(CACHE_NAME).then((cache) => {
                    // Only cache certain types of responses
                    if (event.request.url.includes('.html') || event.request.url.includes('.css') || event.request.url.includes('.js')) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        })
    );
});

