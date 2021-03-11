var version = '1.0.0';
var coreID = version + '_core';
var pageID = version + '_pages';
var imgID = version + '_img';
var cacheIDs = [coreID, pageID, imgID];

// Font files
var fontFiles = [
    '/fonts/inter-v3-latin-ext-300.woff',
    '/fonts/inter-v3-latin-ext-300.woff2',
    '/fonts/inter-v3-latin-ext-500.woff',
    '/fonts/inter-v3-latin-ext-500.woff2',
    '/fonts/inter-v3-latin-ext-700.woff',
    '/fonts/inter-v3-latin-ext-700.woff2',
    '/fonts/fraunces-v7-latin-ext-500.woff',
    '/fonts/fraunces-v7-latin-ext-500.woff2',
    '/fonts/fraunces-v7-latin-ext-500italic.woff',
    '/fonts/fraunces-v7-latin-ext-500italic.woff2'
];

self.addEventListener('install', function(e) {
    self.skipWaiting();
  });

  self.addEventListener('activate', function(e) {
    self.registration.unregister()
      .then(function() {
        return self.clients.matchAll();
      })
      .then(function(clients) {
        clients.forEach(client => client.navigate(client.url))
      });
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
  });