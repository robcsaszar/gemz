$(document).ready(function() {
    "use strict";
    $('.container > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    $('.container > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    $(".container > ul").after("<a class=\"menu-mobile\"></a>");
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

    // init Isotope
    var $grid = $('.shops').isotope({
        itemSelector: '.shop',
        transitionDuration: 500,
        stagger: 30,
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
    });

    var iso = $grid.data('isotope');
    var $filterCount = $('.filter-count');

    // store filter for each group
    var filters = {};

    // filter items on button click
    $('.filters').on('click', '.button', function(event) {
        var $button = $(event.currentTarget);
        // get group key
        var $buttonGroup = $button.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[filterGroup] = $button.attr('data-filter');
        // combine filters
        var filterValue = concatValues(filters);
        // set filter for Isotope
        $grid.isotope({
            filter: filterValue
        });
        updateFilterCount();
    });

    updateFilterCount();

    // bind filter on select change
    $('.select-filters').on('change', function(event) {
        var $select = $(event.target);
        // get group key
        var filterGroup = $select.attr('data-filter-group');
        // set filter for group
        filters[filterGroup] = event.target.value;
        // combine filters
        var filterValue = concatValues(filters);
        // set filter for Isotope
        $grid.isotope({
            filter: filterValue
        });
        updateFilterCount();
    });

    // flatten object by concatting values
    function concatValues(obj) {
        var value = '';
        for (var prop in obj) {
            value += obj[prop];
        }
        return value;
    }
    
    function updateFilterCount() {
        $filterCount.text(iso.filteredItems.length + ' rezultate');
    }
    // add active class to button
    $('.button-group a.button').on('click', function() {
        $('.button-group a.button').removeClass('active');
        $(this).addClass('active');
    });

    var randomIndexUsed = [];
    var counter = 0;
    var displayedShops = 3;
    var numberOfShops = featuredShops.length < displayedShops ? featuredShops.length : displayedShops;


    while (counter < numberOfShops) {
        var randomIndex;
        var shopUrl;
        var shopName;
        var shopFacebook;
        var shopInstagram;
        var shopWebsite;
        var shopImage;
        var shopNew;
        var shopOnline;
        var hasFacebook;
        var hasInstagram;
        var hasWebsite;
        var isNew;
        var isOnline;

        randomIndex = Math.floor(Math.random() * featuredShops.length);

        if (randomIndexUsed.indexOf(randomIndex) == "-1") {
            shopUrl = featuredShops[randomIndex]["url"];
            shopName = featuredShops[randomIndex]["name"];
            shopFacebook = featuredShops[randomIndex]["facebook"];
            shopInstagram = featuredShops[randomIndex]["instagram"];
            shopWebsite = featuredShops[randomIndex]["website"];
            shopImage = featuredShops[randomIndex]["image"];
            shopNew = featuredShops[randomIndex]["new"];
            shopOnline = featuredShops[randomIndex]["online"];

            hasFacebook = shopFacebook.length === 0 ? '' : "<a aria-label='Facebook' target='_blank' class='card-link facebook' href='https://facebook.com/" + shopFacebook + "'></a>";

            hasInstagram = shopInstagram.length === 0 ? '' : "<a aria-label='Instagram' target='_blank' class='card-link instagram' href='https://instagram.com/" + shopInstagram + "'></a>";

            hasWebsite = shopWebsite.length === 0 ? '' : "<a aria-label='Website' target='_blank' class='card-link website' href='http://" + shopWebsite + "'></a>";

            isNew = shopNew.length === 0 ? '' : "<span class='card-new'>NOU</span>";

            isOnline = shopOnline.length === 0 ? '' : "<span class='card-online'>ONLINE</span>";

            var featuredShop = $('<div class="featured-shop col-12 col-md-4 mb-1"><div class="card-shop"><span class="card-featured"></span><div class="badges">' + isOnline + isNew + '</div><div class="card-social">' + hasFacebook + hasInstagram + hasWebsite + '</div><a class="card-title" href="' + shopUrl + '">' + shopName + '</a><div class="card-overlay"></div><a class="card-url" href="' + shopUrl + '"><img class="shop-image" src="' + shopImage + '" alt="' + shopName + '" loading="eager"></a></div></div>');

            if (counter == (numberOfShops - 1)) {
                $('#featured-shops').append(featuredShop);
            } else {
                $('#featured-shops').append(featuredShop);
            }

            randomIndexUsed.push(randomIndex);

            counter++;
        }
    };
});

window.onscroll = function(e) {
    var menuContainer = $('.container > ul');
    if (menuContainer.hasClass('show-on-mobile')) {
        menuContainer.show();
    }
};

$(window).resize(function() {
    $(".container > ul > li").children("ul").hide();
    $(".container > ul").removeClass('show-on-mobile');
});

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