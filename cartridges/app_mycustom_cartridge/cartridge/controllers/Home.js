'use strict';

var server = require('server');
var Resource = require('dw/web/Resource');


server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var OrderMgr = require('dw/order/OrderMgr');
    var customerOrders = OrderMgr.searchOrders(
        'createdBy={0}',
        'creationDate desc',
        'storefront'
    );


var arr = [];
var arr2 = [];

while (customerOrders.hasNext()) {
    customerOrder = customerOrders.next();
    arr.push(customerOrder);
    var custom = customerOrder.getCustom();
    arr2.push(custom['userAgent']);


    Transaction.wrap(function() {
        custom['userAgent'] = "Mikhailo";
        // newLabReview.custom.labReviewerName = 'Vasia';
    });




    custom['userAgent'] = "Mikhailo";
}



    
 var viewData = res.getViewData();
 viewData.customMsg = Resource.msgf('my.test.message', 'homePage', null, "one", "two"); 
 res.setViewData(viewData);

 
 next();
});

module.exports = server.exports();