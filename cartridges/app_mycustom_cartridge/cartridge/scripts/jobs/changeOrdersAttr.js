'use strict';


/**
 * This function change attribute 'walla_order_created'.
 * @returns {Object} Status
 */
function execute() {
    var Transaction = require('dw/system/Transaction');
    var OrderMgr = require('dw/order/OrderMgr');
    var customerOrders = OrderMgr.searchOrders(
        'createdBy={0}',
        'creationDate desc',
        'storefront'
    );

    while (customerOrders.hasNext()) {
        customerOrder = customerOrders.next();
        var custom = customerOrder.getCustom();


        Transaction.wrap(function() {
            custom['walla_order_created'] = true;
        });
    }
}

/* Module Exports */
exports.execute = execute;
