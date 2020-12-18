'use strict';

var baseDetails = require('base/product/detail');

function showRates (data) {
    var $ratesSection = $('.js-rates-section');
    $ratesSection.append(data.renderTemplate);
    $('.js-convertered-price').text('');
    $('.js-convertered-price').addClass('invisible');

    $ratesSection.on('click', '.list-group-item', function (e) {
        var $elem = $(e.target.closest('.list-group-item'));
        var basePrice = +$('.prices .price .sales .value').attr('content');
        var rate = +$elem.data('rate');
        var currency = $elem.data('currency');
        var convertedPrice = (basePrice * rate).toFixed(2);

        $('.js-convertered-price').text(convertedPrice + ' ' + currency);
        $('.js-convertered-price').removeClass('invisible');

        $ratesSection.find('.list-group').remove();
    })
}

function showNotification (data) {
    $('.js-convertered-price').text(data.message);
    $('.js-convertered-price').removeClass('invisible');
}

function selectCurrency () {
    $(document).on('click', '.js-select-currency', function() {
        if ($('.js-rates-section .list-group').length) {
            $('.js-rates-section .list-group').remove();
            return;
        }

        var url = $('.js-select-currency').data('action-url');
        $('#maincontent').spinner().start();
        $.ajax({
            url: url,
            type: 'get',
            success: function (data) {
                $('#maincontent').spinner().stop();
                if (data.success) {
                    showRates(data);
                } else {
                    showNotification(data);
                }
            },
            error: function (err) {
                if (err.responseJSON.redirectUrl) {
                    window.location.href = err.responseJSON.redirectUrl;
                }
                $('#maincontent').spinner().stop();
            }
        });
    })
}

var details = $.extend({}, baseDetails, {
    selectCurrency: selectCurrency
});

module.exports = details; 