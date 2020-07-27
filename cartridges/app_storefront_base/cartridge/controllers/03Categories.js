'use strict';

var server = require('server');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.get('GetCategory111', server.middleware.https, function (req, res, next) {
    var categoryData = CatalogMgr.getCategory(req.querystring.cgid);
    var subCategories = null;
    var ids = null;

    if (categoryData) {
        var isRoot = categoryData.isRoot();
        var hasSubCategories = categoryData.hasOnlineSubCategories();

        if (hasSubCategories) {
            subCategories = categoryData.getOnlineSubCategories().toArray();
        }
    }

    if (subCategories) {
        ids = subCategories.map(function (category) {
            return category.getID();
        });
    }

    res.render('03Categories.isml', {
        name: 'List of subCategories id',
        ids: ids
    });

    next();
});

module.exports = server.exports();
