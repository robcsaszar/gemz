(function() {
   
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchForm = document.querySelector('#search-form')
    searchForm.addEventListener('reset', function() {
        window.location = window.location.href.split("?")[0];
    });

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
        var idx = lunr(function() {
            this.field('id');
            this.field('title', {
                boost: 10
            });
            this.field('county');
            this.field('category');
            this.field('keywords', {
                boost: 5
            });
        });

        for (var key in searchJSON) {
            idx.add({
                'id': key,
                'title': searchJSON[key].title,
                'county': searchJSON[key].county,
                'category': searchJSON[key].category,
                'keywords': searchJSON[key].keywords
            });

            var results = idx.search(searchTerm);
            displaySearchResults(results, searchJSON);
        }
    }

    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search');
        var element = document.getElementById("empty");

        if (results.length) {
            var appendString = '';

            for (var i = 0; i < results.length; i++) {
                var item = store[results[i].ref];
                var isFeatured = item.featured ? '<span class="card-featured"></span>' : '';
                var featuredClass = item.featured ? 'featured ' : '';
                var isOnline = item.online ? '<span class="card-online">ONLINE</span>' : '';
                var isNew = item.new ? '<span class="card-badge">NOU</span>' : '';
                var hasFacebook = item.facebook.length === 0 ? '' : "<a aria-label='Facebook' target='_blank' class='card-link facebook' href='https://facebook.com/" + item.facebook + "'></a>";
                var hasInstagram = item.instagram.length === 0 ? '' : "<a aria-label='Instagram' target='_blank' class='card-link instagram' href='https://instagram.com/" + item.instagram + "'></a>";
                var hasWebsite = item.website.length === 0 ? '' : "<a aria-label='Website' target='_blank' class='card-link website' href='http://" + item.website + "'></a>";


                appendString += '<div class="shop col-12 col-md-4 mb-1 ' + featuredClass + item.categories.join(' ') + '' + '">' +
                    '<div class="card-shop ' + '' + '">' +
                    isFeatured +
                    '<div class="badges">' +
                    isOnline +
                    isNew +
                    '</div>' +
                    '<div class="card-social">' +
                    hasFacebook +
                    hasInstagram +
                    hasWebsite +
                    '</div>' +
                    '<a class="card-title" href="' + item.url + '">' + item.title + '</a>' +
                    '<div class="card-overlay"></div>' +
                    '<a href="' + item.url + '">' +
                    '<img class="shop-image" src="' + item.image + '" alt="' + item.title + '" loading="eager">' +
                    '</a>' +
                    '</div>' +
                    '</div>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '';
            element.style.display = "flex";
            searchResults.appendChild(element);
        }
    }
})();