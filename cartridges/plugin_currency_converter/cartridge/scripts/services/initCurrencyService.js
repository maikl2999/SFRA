/** API Includes */
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var accessKey = require('dw/system/Site').getCurrent().getCustomPreferenceValue('Currency_API_RefArch_KEY');

/** Service to get current currency rates */
var currencyService = LocalServiceRegistry.createService('int_currency_refArch.https', {
    /**
     * Creates a request object to be used when calling the service.
     *
     * @param {dw.svc.Service} svc - Service being executed.
     * @param {Object} params - Parameters given to the call method.
     * @returns {Object} requestObject - Request object to give to the execute method.
     */
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.setURL(svc.URL);

    /**  base param restricted in free version */
        var combineParams = {
            'access_key': accessKey,
            // 'base': params.base, 
            'symbols': params.symbols
        };

        for (var key in combineParams) {
            svc.addParam(key, combineParams[key]);
        }

        return params;
    },

    /**
     * Creates a communication log message for the given request.
     * @param {Object} params - Parameters given to the call method.
     * @returns {string} string
     */
    getRequestLogMessage: function (params) {
        return JSON.stringify(params);
    },

    /**
     * Creates a communication log message for the given response.
     * @param {Object} params - Parameters given to the call method.
     * @returns {string} string
     */
    getResponseLogMessage: function (params) {
        return params.text;
    },

    /**
     * Creates a response object from a successful service call.
     * This response object will be the output object of the call method's Result.
     *
     * @param {dw.svc.Service} svc - Service being executed.
     * @param {Object} response - Service-specific response object.
     * @returns {Object} response
     */
    parseResponse: function (svc, response) {
        return response;
    }
});

/** Exports */
exports.currencyService = currencyService;