'use strict';
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.extend(module.superModule);
/**
* Any customization on this endpoint, also requires update for Default-Start endpoint
*/
// server.append('Show', function (req, res, next) {
// // Get page scope
// var viewData = res.getViewData();
// // Extend scope object with my data
// viewData.customMsg = 'Custom Text Here';
// // Update page scope
// res.setViewData(viewData);
// next();
// });

server.replace('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    // var amProgressing = require('dw/system/Site').getCurrent().getCustomPreferenceValue('amProgressing');
    // var currentLabName = require('dw/system/Site').getCurrent().getCustomPreferenceValue('currentLabName');
     var Site = require('dw/system/Site');
     var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
 
     pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
     res.render('/home/customHome');
     next();
 }, pageMetaData.computedPageMetaData);

module.exports = server.exports();
