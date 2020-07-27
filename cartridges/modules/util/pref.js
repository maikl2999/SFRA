var Resource = require('dw/web/Resource');

module.exports = {
    get: function (key, defaultValue) {
        return Resource.msg(key, '_preferences', (typeof defaultValue !== 'undefined') ? defaultValue : '');
    }
};
