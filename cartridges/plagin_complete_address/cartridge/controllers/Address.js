'use strict';

var server = require('server');

server.extend(module.superModule);

server.prepend('SaveAddress', function (req, res, next) {
    var addressApiEnable = require('dw/system/Site').getCurrent().getCustomPreferenceValue('Address_API_RefArch_Enable');
    
    if (addressApiEnable && req.form.isVerificationAddress === "true") {
        var addressService = require('*/cartridge/scripts/services/initAddressService').addressService;
        var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');

        var result = addressService.call(req.form);
        var context = { addresses: JSON.parse(result.object.text) };
        
        if (result.status === 'OK') {
            res.json({
                isVerificationAddress: true,
                success: true,
                renderTemplate: renderTemplateHelper.getRenderedHtml(context, 'addressBook/addressBookPopupElem'),
            });
        } else {
            res.json({
                isVerificationAddress: true,
                success: false
            });
        }
    
        this.emit('route:Complete', req, res);
    } else {
        next();
    }
});

module.exports = server.exports();
