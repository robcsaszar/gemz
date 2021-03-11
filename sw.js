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

/**
 * Check if cached API data is still valid
 * @param  {Object}  response The response object
 * @return {Boolean}          If true, cached data is valid
 */
 var isValid = function (response) {
	if (!response) return false;
	var fetched = response.headers.get('sw-fetched-on');
	if (fetched && (parseFloat(fetched) + (1000 * 60 * 60 * 2)) > new Date().getTime()) return true;
	return false;
};

// On install, cache some stuff
addEventListener('install', function (event) {
    self.skipWaiting();
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('/offline.html'));
		return;
	}));
});


// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {

				// Save the response to cache
				if (response.type !== 'opaque') {
					var copy = response.clone();
					event.waitUntil(caches.open('pages').then(function (cache) {
						return cache.put(request, copy);
					}));
				}

				// Then return it
				return response;

			}).catch(async function (error) {
				const response = await caches.match(request);
                return response || caches.match('/offline.html');
			})
		);
	}

    // Images & Fonts
    // Offline-first
    if (request.headers.get('Accept').includes('image') || request.url.includes('inter-v3') || request.url.includes('fraunces-v7') || request.url.includes('/assets/css/fonts.css')) {
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request).then(function (response) {

                    // If an image, stash a copy of this image in the images cache
                    if (request.headers.get('Accept').includes('image')) {
                        var copy = response.clone();
                        event.waitUntil(caches.open('images').then(function (cache) {
                            return cache.put(request, copy);
                        }));
                    }

                    // Return the requested file
                    return response;

                });
            })
        );
    }

});