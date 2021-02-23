(function () {
// Make sure sw are supported
if (!('serviceWorker' in navigator)) {
    return 0;
}

console.log('Service worker Supported');

// listen to load event
window.addEventListener('load', ()=> {
    navigator.serviceWorker
    .register('../sw_cached_site.js')
    .then (reg=> console.log('Service Worker: Registered'))
    .catch (err=> console.log (`Error ${err } Service Loader `))
})
})();