'use strict';
/**
 * @constructor
 * @classdesc Some model
 * @param {Object} sourceObj- a source objects
 */
function myCustom(obj) {
 if (obj) {
    this.ID = obj.ID;
    this.value = obj.value;
    this.quantity = obj.quantity;
    this.getID = function() {return this.ID;};
    this.getValue = function() {return this.value;};
    this.getQuantity = function() {return this.quantity;};
    this.isValid = function() {return this.ID && this.value && this.quantity ? true : false;}
 }
}
module.exports = myCustom;
