'use strict';

/**
 * This is the main script called by the Job Schedule to clear cached currency rates every 5 min.
 */
function execute() {
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var currentRatesIter = CustomObjectMgr.getAllCustomObjects('CurrencyRate');

    if (currentRatesIter.getCount() > 0) {
        while (currentRatesIter !== null && currentRatesIter.hasNext()) {
            var rate = currentRatesIter.next();
            
            Transaction.wrap(function() {
                CustomObjectMgr.remove(rate);
            });            
        }
    }
}

/* Module Exports */
exports.execute = execute;