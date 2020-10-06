'use strict';

var base = module.superModule;

/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} currentCustomer - Current customer
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */
function account(currentCustomer, addressModel, orderModel) {
    base.call(this, currentCustomer, addressModel, orderModel);
    var profile = currentCustomer.raw.profile;

    if (profile) {
        this.profile.city = profile.custom && profile.custom.city;
    }
}

account.getCustomerPaymentInstruments = base.getCustomerPaymentInstruments;

module.exports = account;