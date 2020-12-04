'use strict';

var server = require('server');

server.extend(module.superModule);

server.post('AddressVerification', function (req, res, next) {
    var addressService = require('*/cartridge/scripts/services/initAddressService.js').addressService;
    var URLUtils = require('dw/web/URLUtils');
    var authId = require('dw/system/Site').getCurrent().getCustomPreferenceValue('Address_API_RefArch_ID');
    var authToken = require('dw/system/Site').getCurrent().getCustomPreferenceValue('Address_API_RefArch_KEY');

    var ContentMgr = require('dw/content/ContentMgr');
    var ContentModel = require('*/cartridge/models/content');

    var apiContentModal = ContentMgr.getContent("addressBookModal");
    var contentModal = new ContentModel(apiContentModal);
    var htmlModal = contentModal.body.markup;

    var apiContentRadioElem = ContentMgr.getContent("addressBookRadioElem");
    var contentRadioElem = new ContentModel(apiContentRadioElem);
    var htmlRadioElem = contentRadioElem.body.markup;

    var responseObj;
    var params = {
        'auth-id': authId,
        'auth-token': authToken,
        'candidates': 10,
        'match': 'invalid',
        'street': req.form.street || '',
        'street2': req.form.street2  || '',
        'city': req.form.city  || '',
        'state': req.form.state  || '',
        'zipcode': req.form.zipcode  || ''
    };

    var result = addressService.call(params);
    if (result.status === 'OK') {
        res.json({
            success: true,
            htmlModal: htmlModal,
            htmlRadioElem: htmlRadioElem,
            addresses: JSON.parse(result.object.text),
            redirectUrl: URLUtils.url('Address-List').toString()
        });
    } else {
        res.json({
            success: false
        });
    }

    return next();
});


module.exports = server.exports();
