'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');

server.get('GetProduct111', server.middleware.https, function (req, res, next) {
    var Product = ProductMgr.getProduct(req.querystring.pid);
    var PrimaryCategory = Product.getPrimaryCategory();
    var id = PrimaryCategory.getID();

    res.render('01Product.isml', {
        myOwnId: 'myOwnId !!!',
        id: id
    });

    next();
});

module.exports = server.exports();
