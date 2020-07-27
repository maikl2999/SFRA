'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');

server.get('GetProduct111', server.middleware.https, function (req, res, next) {
    var Product = ProductMgr.getProduct(req.querystring.pid);
    var ProductVariationModel = Product.getVariationModel();
    var variants = ProductVariationModel.getVariants().toArray();
    var productsVariants = [];

    for (var i = 0; i < variants.length; i++) {
        productsVariants.push({ name: variants[i].getName(), image: variants[i].ID });
    }

    res.render('02ProductType.isml', {
        name: 'List of variants id',
        products: productsVariants
    });

    next();
});

module.exports = server.exports();
