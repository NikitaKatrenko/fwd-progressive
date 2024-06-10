const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/blog.js',
    '/css/styles.css',
    '/assets/logo.png',
    'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css',
];

//install service worker
self.addEventListener('install', evt => {
    // console.log('service worker is installed', evt);
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets).then();
        })
    );
});

//activate service worker
self.addEventListener('activate', evt => {
    // console.log('service worker is activated', evt );
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys)
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            ).then(() => {
                console.log('Old caches have been removed.');
            });
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 3);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/pages/fallback.html')
            }
        })
    );
});

//cache size limit
const limitCacheSize = async (name, size) => {
    const cache = await caches.open(name);
    const keys = await cache.keys();

    while (keys.length > size) {
        const keyToRemove = keys.shift();
        await cache.delete(keyToRemove);
    }
};