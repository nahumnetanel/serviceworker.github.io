const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    '/js/main.js',
    '/css/style.css'
];

console.log("sadsadsad");
// call install event
self.addEventListener ('install', (e)=> {
    console.log('Service Worker: Installed');

    e.waitUntil (
        caches.open(cacheName)
        .then(cache=> {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        }
    )
    .then(()=> self.skipWaiting())
    );
});


// call install event
self.addEventListener ('activate', (e)=> {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    e.waitUntil (
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        caches.delete(cache)
                    }
                })
            )
        })
    )
});

// call Fetch Event
self.addEventListener('fetch', e=> {
    console.log('Service Worker: Fetching');

    e.respondWith (
        fetch (e.request)
        .catch (()=> {console.log (`${e.request}`);caches.match(e.request)})
    );
});

