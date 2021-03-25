$(document).ready(function() {
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
        resizeContainer: false,
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

        console.log('Filtered on:', filterValue); //for testing/debugging

        $container.isotope();
        updateFilterCount();
    });

    $sorts.change(function() {
        var inclusives = [];
        let x = $(this).prop('checked');
        $sorts.prop('checked', false);
        $(this).prop('checked', x);

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

            console.log('Sorted on:', sortedValue); //for testing/debugging
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

        console.log('Filtered on:', buttonFilter); //for testing/debugging
        $container.isotope();
    });

    $quicksearch.keyup(debounce(function() {
        qsRegex = new RegExp($quicksearch.val(), 'gi');

        console.log('Searched for:', qsRegex); //for testing/debugging
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
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', '.filter-button', function() {
          $buttonGroup.find('.active').removeClass('active');
          $( this ).addClass('active');
        });
      });

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