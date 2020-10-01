'use strict';

var server = require('server');
var Resource = require('dw/web/Resource');


server.extend(module.superModule);

server.append('Show', function (req, res, next) {

    
 var viewData = res.getViewData();
 viewData.customMsg = Resource.msgf('my.test.message', 'homePage', null, "one", "two"); 
 res.setViewData(viewData);

 
 next();
});

module.exports = server.exports();