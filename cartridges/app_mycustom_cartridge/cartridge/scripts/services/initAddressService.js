/** API Includes */
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/** Service to get inventory , shipping info */
var addressService = LocalServiceRegistry.createService('int_address_refArch.https', {
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

        for (var key in params) {
            svc.addParam(key, params[key]);
        }

        var test = params;
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
exports.addressService = addressService;
