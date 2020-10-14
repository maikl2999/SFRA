'use strict';

var baseSearch = require('base/search/search');

/**
 * Update sort option URLs from Ajax response
 *
 * @param {string} response - Ajax response HTML code
 * @return {undefined}
 */
function updateSortOptions(response) {
    var $tempDom = $('<div>').append($(response));
    var sortOptions = $tempDom.find('.grid-footer').data('sort-options').options;
    sortOptions.forEach(function (option) {
        $('option.' + option.id).val(option.url);
    });
}

function showMoreWithScroll () {
    // Show more products with infinite scroll
    var observableElem = $('.show-more')[0];
    if (isInfiniteScroll && observableElem) {
        $('.show-more .btn').css('display', 'none');

        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    if (!observableElem || !isInfiniteScroll) {
                        return;
                    };
                    var showMoreUrl = $('.show-more .btn').data('url');
                    $.spinner().start();
                    $(observableElem).trigger('search:showMore', new Event('search:showMore'));
                    $.ajax({
                        url: showMoreUrl,
                        data: { selectedUrl: showMoreUrl },
                        method: 'GET',
                        success: function (response) {
                            $('.grid-footer').replaceWith(response);
                            updateSortOptions(response);
                            $.spinner().stop();
                            observableElem = $('.show-more')[0];
                            if (observableElem) {
                                $('.show-more .btn').css('display', 'none');
                                observer.observe(observableElem);
                            }
                        },
                        error: function () {
                            $.spinner().stop();
                        }
                    });
                }
            });
        }, {
            threshold: 1
        });
        
        observer.observe(observableElem);
    }
}

function scrollSavePosition () {
    window.addEventListener('scroll', function() {
        var scrollPos = window.pageYOffset;
        debugger
        sessionStorage.setItem('scrollPos', scrollPos + 'px');
      });
}

function scrollSetPosition () {
    var scrollPos = sessionStorage.getItem('scrollPos')
    
    if (scrollPos) {
        setTimeout(function() {
            window.scrollTo(0, parseInt(scrollPos))
        }, 400);
    }
}

var exportSearch = $.extend({}, baseSearch, {
    showMoreWithScroll: showMoreWithScroll,
    scrollSavePosition: scrollSavePosition,
    scrollSetPosition: scrollSetPosition
});

module.exports = exportSearch;