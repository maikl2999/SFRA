'use strict';

var base = module.superModule;

/**
 * Searches for stores and creates a plain object of the stores returned by the search
 * @param {string} radius - selected radius
 * @param {string} postalCode - postal code for search
 * @param {string} lat - latitude for search by latitude
 * @param {string} long - longitude for search by longitude
 * @param {Object} geolocation - geolocation object with latitude and longitude
 * @param {boolean} showMap - boolean to show map
 * @param {dw.web.URL} url - a relative url
 * @param {[Object]} products - an array of product ids to quantities that needs to be filtered by.
 * @returns {Object} a plain object containing the results of the search
 */
function getStores(radius, postalCode, lat, long, geolocation, showMap, url, products) {
    var ProductInventoryMgr = require('dw/catalog/ProductInventoryMgr');
    var BaseStoresModel = require('*/cartridge/models/stores');
    var StoreMgr = require('dw/catalog/StoreMgr');
    var Site = require('dw/system/Site');
    var URLUtils = require('dw/web/URLUtils');

    var countryCode = geolocation.countryCode;
    var distanceUnit = countryCode === 'US' ? 'mi' : 'km';
    var resolvedRadius = radius ? parseInt(radius, 10) : 15;

    var searchKey = {};
    var storeMgrResult = null;
    var location = {};

    if (postalCode && postalCode !== '') {
        // find by postal code
        searchKey = postalCode;
        storeMgrResult = StoreMgr.searchStoresByPostalCode(
            countryCode,
            searchKey,
            distanceUnit,
            resolvedRadius
        );
        searchKey = { postalCode: searchKey };
    } else {
        // find by coordinates (detect location)
        location.lat = lat && long ? parseFloat(lat) : geolocation.latitude;
        location.long = long && lat ? parseFloat(long) : geolocation.longitude;

        storeMgrResult = StoreMgr.searchStoresByCoordinates(location.lat, location.long, distanceUnit, resolvedRadius);
        searchKey = { lat: location.lat, long: location.long };
    }

    var actionUrl = url || URLUtils.url('Stores-FindStores', 'showMap', showMap).toString();
    var apiKey = Site.getCurrent().getCustomPreferenceValue('mapAPI');

    var storesModel = new BaseStoresModel(storeMgrResult.keySet(), searchKey, resolvedRadius, actionUrl, apiKey);
    var storesEntry = storeMgrResult.entrySet().toArray();

    if (products) {
        storesModel.stores = storesModel.stores.filter(function (store) {
            var storeInventoryListId = store.inventoryListId;
            if (storeInventoryListId) {
                var storeInventory = ProductInventoryMgr.getInventoryList(storeInventoryListId);
                return products.every(function (product) {
                    var inventoryRecord = storeInventory.getRecord(product.id);
                    return inventoryRecord && inventoryRecord.ATS.value >= product.quantity;
                });
            }
            return false;
        });
    }

    storesModel.stores.forEach(function (store, index) {
        var distance = null;

        storesEntry.forEach(function (entry) {
            if (entry.getKey().ID === store.ID) {
                distance = entry.getValue();
            }
        })

        store.distanceVal = distance;
        store.distanceUnit = distanceUnit;
    })

    storesModel.stores.sort(function (storeA, storeB) {
        var a = storeA.distanceVal;
        var b = storeB.distanceVal
        return a - b;
    })

    return storesModel;
}

module.exports = {
    getStores: getStores
};
Object.keys(base).forEach(function (prop) {
    // eslint-disable-next-line no-prototype-builtins
    if (!module.exports.hasOwnProperty(prop)) {
        module.exports[prop] = base[prop];
    }
});
