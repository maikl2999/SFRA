'use strict';

var server = require('server');


server.get('ShowAssets', function (req, res, next) {
    var assetID = req.querystring.pid;

    var ContentMgr = require('dw/content/ContentMgr');
    var ContentModel = require('*/cartridge/models/content');
    var apiContent = ContentMgr.getContent(assetID);

    // var content = new ContentModel(apiContent, 'components/content/contentAssetInc'); // only assets
    var content = new ContentModel(apiContent, 'content/contentAsset'); // assets with header and footer
    res.render(content.template, { content: content });

    next();
});

module.exports = server.exports();
