const cacheName = 'v2';


console.log("sadsadsad");
// call install event
self.addEventListener ('install', (e)=> {
    console.log('Service Worker: Installed');
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
    console.log('Service Worker: Fetching 2');

    e.respondWith (
        fetch (e.request)
        .then(res=> 
            {
                // make copy clone of the response
                const resClone = res.clone();
                //open cache
                caches
                .open(cacheName)
                .then (cache=> {
                    console.log('Service Worker: Fetching Got an error , loading caching');

                    // Add response to cache
                    cache.put(e.request, resClone);

                });
                return res;
            }).catch(err=> caches.match(e.request).then (res=>res))
    );
});

