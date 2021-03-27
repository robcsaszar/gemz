//# sourceMappingURL=scripts.min.js.map
$(document).ready(function() {
    // #region mobile menu
    "use strict";
    $('.container > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    $('.container > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    $(".container > ul").after("<a class=\"menu-mobile\"></a>");
    $(".container > ul").after("<a href='/shops#search-box' class='mobile-search'><i class='fas fa-search'></i></a>");
    $(".container > ul > li").hover(function(e) {
        if ($(window).width() > 943) {
            $(this).children("ul").stop(true, false).fadeToggle(150);
            e.preventDefault();
        }
    });
    $(".container > ul > li").click(function() {
        if ($(window).width() <= 943) {
            $(this).children("ul").fadeToggle(150);
        }
    });
    $(".menu-mobile").click(function(e) {
        $(".container > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });
    $(window).resize(function() {
        $(".menu > ul > li").children("ul").hide();
        $(".menu > ul").removeClass('show-on-mobile');
    });
    if (!window.matchMedia)
        return;

    // #endregion

    // #region favicon
    var current = $('head > link[rel="icon"][media]');
    $.each(current, function(i, icon) {
        var match = window.matchMedia(icon.media);

        function swap() {
            if (match.matches) {
                current.remove();
                current = $(icon).appendTo('head');
            }
        }
        match.addEventListener('change', swap);
        swap();
    });
    // #endregion
});

$('#search-box').focus(function() {
    var $htmlOrBody = $('html, body');
    $htmlOrBody.animate({
        scrollTop: ($('#search-box').offset().top - 10)
    }, 500);
    return false;
})

var progressPath = document.querySelector('.progress-wrap path');
var pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
var updateProgress = function() {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
}
updateProgress();
$(window).scroll(updateProgress);
var offset = 50;
var duration = 550;
jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
    } else {
        jQuery('.progress-wrap').removeClass('active-progress');
    }
});
jQuery('.progress-wrap').on('click', function(event) {
    event.preventDefault();
    jQuery('html, body').animate({
        scrollTop: 0
    }, duration);
    return false;
});

function enableSearch() {
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
}

function validateForm(id) {
    $(id).validate({
        ignore: ".ignore",
        errorElement: "span",
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertBefore(element);
            }
        },
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: "required",
            contactperson: "required",
            telephone: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            message: "required",
            terms: "required"
        },
        // Specify validation error messages
        messages: {
            name: "Te rugăm să introduci un nume valid.",
            contactperson: "Te rugăm să introduci un nume valid.",
            telephone: "Te rugăm să introduci un număr valid.",
            email: "Te rugăm să introduci o adresă validă.",
            message: "Te rugăm să introduci minimum 30 de litere.",
            terms: ""
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

    function phoneMask() {
        var num = $(this).val().replace(/\D/g, '');
        $(this).val(
            '+40 ' + '(' + num.substring(2, 5) +
            (num.length > 4 ? ')' : '') +
            (num.length > 4 ? ' ' + num.substring(5, 8) : '') +
            (num.length > 7 ? ' ' + num.substring(8, 11) : '') +
            (num.length > 9 ? '' + num.substring(11, 14) : '')
        );
    }
    $('[type="tel"]').keyup(phoneMask);
}

function enableFilters() {
    var qsRegex;
    var buttonFilter;
    var filterValue;
    var filters = {};
    var $empty = $('#empty');
    var $filterCount = $('.filter-count');
    var $selects = $('.select-filters select');
    var $checkboxes = $('.checkbox-filters input');
    var $buttons = $('.filters .filter-button');
    var $sorts = $('.checkbox-sorts input');
    var $quicksearch = $('#quicksearch');

    var $container = $('.shops').isotope({
        itemSelector: '.shop',
        getSortData: {
            name: '.card-title',
            featured: function(item) {
                return $(item).hasClass('featured') ? 0 : 1;
            }
        },
        transitionDuration: 500,
        stagger: 30,
        resizeContainer: true,
        layoutMode: 'fitRows',
        // fade in from bottom
        visibleStyle: {
            opacity: 1,
            transform: 'translateY(0)',
        },
        hiddenStyle: {
            opacity: 0,
            transform: 'translateY(100px)',
        },
        filter: function() {
            var $this = $(this);
            var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
            var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
            var filterResult = filterValue ? $this.is(filterValue) : true;
            return searchResult && buttonResult && filterResult;
        }
    });

    var iso = $container.data('isotope');

    updateFilterCount();

    $selects.add($checkboxes).change(function() {
        // map input values to an array
        var exclusives = [];
        var inclusives = [];
        // exclusive filters from selects
        $selects.each(function(i, elem) {
            if (elem.value) {
                exclusives.push(elem.value);
            }
        });
        // inclusive filters from checkboxes
        $checkboxes.each(function(i, elem) {
            // if checkbox, use value if checked
            if (elem.checked) {
                inclusives.push(elem.value);
            }
        });

        // combine exclusive and inclusive filters

        // first combine exclusives
        exclusives = exclusives.join('');

        if (inclusives.length) {
            // map inclusives with exclusives for
            filterValue = $.map(inclusives, function(value) {
                return value + exclusives;
            });
            filterValue = filterValue.join(', ');
        } else {
            filterValue = exclusives;
        }

        // console.log('Filtered on:', filterValue); //for testing/debugging

        $container.isotope();
        updateFilterCount();
    });

    $sorts.change(function() {
        var inclusives = [];
        var isChecked = $(this).prop('checked');
        $sorts.prop('checked', false);
        $(this).prop('checked', isChecked);

        $sorts.each(function(i, elem) {
            if (elem.checked) {
                inclusives.push(elem.value);
            }

            var sortedValue;

            if (inclusives.length) {
                sortedValue = inclusives;
            } else {
                sortedValue = 'original-order';
            }

            // console.log('Sorted on:', sortedValue); //for testing/debugging
            $container.isotope({
                sortBy: sortedValue
            });
        });
    });

    $buttons.click(function() {
        var filterFns = {
            greaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            even: function() {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) % 2 === 0;
            }
        };
        // buttonFilter = $(this).attr('data-filter');
        var $this = $(this);
        // get group key
        var $buttonGroup = $this.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[filterGroup] = $this.attr('data-filter');
        // arrange, and use filter fn

        buttonFilter = function() {

            var isMatched = true;
            var $this = $(this);

            for (var prop in filters) {
                var filter = filters[prop];
                // use function if it matches
                filter = filterFns[filter] || filter;
                // test each filter
                if (filter) {
                    isMatched = isMatched && $this.is(filter);
                }
                // break if not matched
                if (!isMatched) {
                    break;
                }
            }
            return isMatched;
        }

        // console.log('Filtered on:', buttonFilter); //for testing/debugging
        $container.isotope();
    });

    $quicksearch.keyup(debounce(function() {
        qsRegex = new RegExp($quicksearch.val(), 'gi');

        // console.log('Searched for:', qsRegex); //for testing/debugging
        $container.isotope();
    }));

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;

            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }

    function updateFilterCount() {
        var $items = iso.filteredItems;
        if ($items.length) {
            $empty.css('display', '');
            if ($items.length == 1) {
                $filterCount.text($items.length + ' rezultat');
            } else {
                $filterCount.text($items.length + ' rezultate');
            }
        } else {
            $empty.css('display', 'flex');
            $filterCount.text('');
        }
    }

    // set active class on clicked button
    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.filter-button', function() {
            $buttonGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });
}