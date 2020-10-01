/**
 * _preferences.properties helper module
 * @module pref
 */
const Resource = require('dw/web/Resource');
module.exports = {
 /**
 * @description get preference from resource bundle defined in _preference.properties file
 * @param {string} key Key from properties file
 * @param {string} defaultValue Default value will be returned if there is no such key
 * @returns {string} Preference value
 */
 get: function (key, defaultValue) {
 return Resource.msg(key, '_preferences', (typeof defaultValue !== 'undefined') ? defaultValue :
'');
 }
};