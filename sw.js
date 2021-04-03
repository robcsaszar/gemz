// sw.js
var pre = 'gemz';
var v = 'v1.0';

const FALLBACK_HTML_URL = /(offline)/;

// Force production builds
workbox.setConfig({
    debug: false
});

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: pre,
    suffix: v,
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `NetworkFirst` strategy for html
workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.NetworkFirst()
);

// use `NetworkFirst` strategy for css and js
workbox.routing.registerRoute(
    /\.(?:js|css|json)$/,
    new workbox.strategies.NetworkFirst()
);

// use `CacheFirst` strategy for images
workbox.routing.registerRoute(
    /\.(?:ico|jpg|jpeg|png|svg|webp)$/,
    new workbox.strategies.CacheFirst({
        cacheName: pre + '-images-' + v,
      })
);

// use `CacheFirst` strategy for fonts
workbox.routing.registerRoute(
    /(\/*fonts\/)/,
    new workbox.strategies.CacheFirst({
        cacheName: pre + '-fonts-' + v,
      })
);

// use `StaleWhileRevalidate` third party files
workbox.routing.registerRoute(
    /^https?:\/\/code.jquery.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: pre + '-thirdparty-' + v,
    })
);

workbox.routing.registerRoute(
    /^https?:\/\/cdnjs.cloudflare.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: pre + '-thirdparty-' + v,
    })
);

workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

workbox.routing.setCatchHandler((event) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match(FALLBACK_HTML_URL);
      break;
    default:
      return Response.error();
  }
});