'use strict';

var baseAddressBook = require('base/addressBook/addressBook');
var formValidation = require('base/components/formValidation');

function showModal(data) {
    var $popup = $(".address-popup_js");
    $popup.prepend(data.renderTemplate).removeClass('invisible');    
    
    $popup.find('.cancelAddress').on('click', function (e) {
        saveAddresss();
    })

    $popup.find('.confirmAddress').on('click', function (e) {
        e.preventDefault();
        var addressVariant = $('.address-popup_js .addressVariant:checked')[0];
        var address = addressVariant.dataset.address;
        var city = addressVariant.dataset.city;
        var zipCode = addressVariant.dataset.zipCode;
        var $form = $('form.address-form');

        $form.find('input#address1').val(address);
        $form.find('input#city').val(city);
        $form.find('input#zipCode').val(zipCode);

        saveAddresss();
    })
}

function createSearchParam($form) {
    var params = new URLSearchParams();
    params.set('street', $form.find('#address1').val());
    params.set('street2', $form.find('#address2').val());
    params.set('city', $form.find('#city').val());
    params.set('state', $form.find('#state').val());
    params.set('zipcode', $form.find('#zipCode').val());
    params.set('isVerificationAddress', "true");

    return params.toString();
}

function saveAddresss() {
    $(".address-popup_js").remove();
    var $form = $('form.address-form');
    var url = $form.attr('action');
    $form.spinner().start();
    $('form.address-form').trigger('address:submit', new Event('address:submit'));
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: $form.serialize(),
        success: function (data) {
            $form.spinner().stop();
            if (!data.success) {
                formValidation($form, data);
            } else {
                location.href = data.redirectUrl;
            }
        },
        error: function (err) {
            if (err.responseJSON.redirectUrl) {
                window.location.href = err.responseJSON.redirectUrl;
            }
            $form.spinner().stop();
        }
    });
    return false;
}

function submitAddress() {
    $('form.address-form').submit(function (e) {
        var $form = $(this);
        e.preventDefault();
        // var url = $form.attr('data-save-url');
        var url = $form.attr('action');
        $form.spinner().start();
        var data = createSearchParam($form);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    $form.spinner().stop();
                    showModal(data);
                } else {
                    saveAddresss();
                }
            },
            error: function (err) {
                if (err.responseJSON.redirectUrl) {
                    window.location.href = err.responseJSON.redirectUrl;
                }
                $form.spinner().stop();
            }
        });
        return false;
    });
}

var addressBook = $.extend({}, baseAddressBook, {
    submitAddress: submitAddress
});

module.exports = addressBook;