'use strict';

var baseAddressBook = require('base/addressBook/addressBook');
var formValidation = require('base/components/formValidation');

function showModal(data) {
    $("body").prepend(data.htmlModal);

    for (var i = 0; i < data.addresses.length; i++) {
        $('#radioArea').append(data.htmlRadioElem);
        var $formCheck = $('#radioArea .form-check:last-child')
        $formCheck.find('input').attr('id', 'gridRadios' + (i + 1)).attr('value', 'option' + (i + 1));
        var label = createLabel(data.addresses[i]);
        $formCheck.find('label').attr('for', 'gridRadios' + (i + 1)).text(label);

        setDataAttr($formCheck.find('input'), data.addresses[i]);

        if (i === 0) {
            $formCheck.find('input').prop("checked", true)
        }
    }

    $('#addressBookModal').modal();
    
    $('#addressBookModal').on('hide.bs.modal', function (e) {
        $('#addressBookModal').remove();
        saveAddresss();
    })

    $('#confirmAddress').on('click', function (e) {
        e.preventDefault();
        var inputElem = $('input[name="addressVariant"]:checked')[0];
        var address = inputElem.dataset.address;
        var city = inputElem.dataset.city;
        var zipCode = inputElem.dataset.zipCode;
        var $form = $('form.address-form-complete-address');

        $form.find('input#address1').val(address);
        $form.find('input#city').val(city);
        $form.find('input#zipCode').val(zipCode);

        saveAddresss();
    })
}

function createLabel(address) {
    var components = address.components;
    return components.city_name + " city " + components.primary_number + " " + components.street_name + " " + components.street_suffix;
}

function setDataAttr($input, address) {
    var components = address.components;

    $input.attr('data-address', components.primary_number + " " + components.street_name + " " + components.street_suffix);
    $input.attr('data-city', components.city_name);
    $input.attr('data-zip-code', components.zipcode);
}

function createSearhParam($form) {
    var params = new URLSearchParams();
    params.set('street', $form.find('#address1').val());
    params.set('street2', $form.find('#address2').val());
    params.set('city', $form.find('#city').val());
    params.set('state', $form.find('#state').val());
    params.set('zipcode', $form.find('#zipCode').val());

    return params.toString();
}

function saveAddresss() {
    var $form = $('form.address-form-complete-address');
    var url = $form.attr('action');
    $form.spinner().start();
    $('form.address-form-complete-address').trigger('address:submit', new Event('address:submit'));
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

function verificationAddress() {
    $('form.address-form-complete-address').submit(function (e) {
        var $form = $(this);
        e.preventDefault();
        var url = $form.attr('data-save-url');
        $form.spinner().start();
        var data1 = createSearhParam($form);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data1,
            success: function (data) {
                $form.spinner().stop();
                if (data.success) {
                    showModal(data);
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
    });
}

var addressBook = $.extend({}, baseAddressBook, {
    verificationAddress: verificationAddress,
});

module.exports = addressBook;