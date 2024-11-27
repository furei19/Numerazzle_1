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

            // Check if the request comes from the same origin as the service worker
            if (event.request.url.startsWith(self.location.origin)) {
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        // Only cache HTML, CSS, JS, and images
                        if (event.request.url.includes('.html') || 
                            event.request.url.includes('.css') || 
                            event.request.url.includes('.js') || 
                            event.request.url.includes('.png')) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            }

            // If the request is not from the same origin, don't cache it
            return fetch(event.request);
        })
    );
});


