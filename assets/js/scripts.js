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
        var hasFacebook;
        var hasInstagram;
        var hasWebsite;

        randomIndex = Math.floor(Math.random() * featuredShops.length);

        if (randomIndexUsed.indexOf(randomIndex) == "-1") {
            shopUrl = featuredShops[randomIndex]["url"]; 
            shopName = featuredShops[randomIndex]["name"];
            shopFacebook = featuredShops[randomIndex]["facebook"];
            shopInstagram = featuredShops[randomIndex]["instagram"];
            shopWebsite = featuredShops[randomIndex]["website"];
            shopImage = featuredShops[randomIndex]["image"];

            hasFacebook = shopFacebook.length === 0 ? '' : "<a aria-label='Facebook' class='card-link facebook' href='" + shopFacebook + "'></a>";

            hasInstagram = shopInstagram.length === 0 ? '' : "<a aria-label='Instagram' class='card-link instagram' href='" + shopInstagram + "'></a>";
            
            hasWebsite = shopWebsite.length === 0 ? '' : "<a aria-label='Website' class='card-link website' href='" + shopWebsite + "'></a>";

           

            var featuredShop = $('<div class="featured-shop col-12 col-md-4 mb-1"><div class="card-shop"><span class="card-featured"></span><div class="card-social">' + hasFacebook + hasInstagram + hasWebsite +'</div><a class="card-title" href="' + shopUrl + '">' + shopName + '</a><div class="card-overlay"></div><a class="card-url" href="' + shopUrl + '"><img class="shop-image" src="/images/shops' + shopImage + '" alt="' + shopName + '" loading="eager"></a></div></div>');

            if (counter == (numberOfShops - 1)) {
                $('#featured-shops').append(featuredShop);
            } else {
                $('#featured-shops').append(featuredShop);
            }

            randomIndexUsed.push(randomIndex);

            counter++;
        }
    }
});

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
var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
}
updateProgress();
$(window).scroll(updateProgress);
var offset = 50;
var duration = 550;
jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
    } else {
        jQuery('.progress-wrap').removeClass('active-progress');
    }
});
jQuery('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    jQuery('html, body').animate({
        scrollTop: 0
    }, duration);
    return false;
});