'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var currencyApiEnable = require('dw/system/Site').getCurrent().getCustomPreferenceValue('Currency_API_RefArch_Enabled');

    var data = res.getViewData();
    data.currencyApiEnable = currencyApiEnable;
    res.setViewData(data);

    next();
});

server.get('CurrencyRates', function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');

    var currentRatesIter = CustomObjectMgr.getAllCustomObjects('CurrencyRate');
    var currencyNamesList = ['EUR', 'GBP', 'SEK']; // can move to MT;
    var context = {};

    if (currentRatesIter.getCount() > 0) {
        while (currentRatesIter !== null && currentRatesIter.hasNext()) {
            var rate = currentRatesIter.next();
            context[rate.getCustom().currencyName] = +rate.getCustom().currencyRate;
        }
    } else {
        var currencyService = require('*/cartridge/scripts/services/initCurrencyService').currencyService;
        var result = currencyService.call({base: 'USD', symbols: currencyNamesList.join(',')});

        context = JSON.parse(result.object.text).rates;

        currencyNamesList.forEach(function(currencyName) {
            var newCurrencyRate = null;
            Transaction.wrap(function() {
                newCurrencyRate = CustomObjectMgr.createCustomObject('CurrencyRate', currencyName);
                newCurrencyRate.custom.currencyRate = context[currencyName].toString();
            });
        })
    }

    if ((result && result.status === 'OK') || currentRatesIter.getCount() > 0) { 
        res.json({
            success: true,
            renderTemplate: renderTemplateHelper.getRenderedHtml(context, 'product/currencyList'),
        });
    } else if (result && result.status !== 'OK') {
        res.json({
            success: false,
            message: 'Currency Service not available'
        });
    } else {
        res.json({
            success: false,
            message: 'Something went wrong'
        });
    }

    next();
});

module.exports = server.exports();
