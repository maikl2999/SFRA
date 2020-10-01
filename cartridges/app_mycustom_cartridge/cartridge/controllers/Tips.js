'use strict';

var server = require('server');
var prefUtil = require('util/pref');

server.get('Show', function (req, res, next) {
   
    //**** lab 01 ****/ (Preferences)
    // get Preference Value from Merchant Tools
    var amProgressing = require('dw/system/Site').getCurrent().getCustomPreferenceValue('amProgressing');
    var currentLabName = require('dw/system/Site').getCurrent().getCustomPreferenceValue('currentLabName');
    // get Preference Value from file ".../templates/resources"
    var value1 = prefUtil.get('refinements.size.attr.id');
    var value2 = prefUtil.get('lol.work');


    //**** lab 02 ****/ (Product)
    // In order to get product data, you can use the class 'ProductMgr'
    var ProductMgr = require('dw/catalog/ProductMgr');
    var Product = ProductMgr.getProduct(req.querystring.pid)
    var Category = Product.getPrimaryCategory();
    var categoryID = Category.getID();
    // or
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var product = ProductFactory.get(req.querystring);


    //**** lab 03 ****/ (Product types)
    // In order to get product variations
    var variations = Product.getVariationModel().getVariants();
    variations[i].getID()  // get ID (loop)
    variations[i].getName()  // get name (loop)
    

    //**** lab 04 ****/ (Categories)
    // In order to get Categories
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var categoryData =  CatalogMgr.getCategory(req.querystring.cgid);
    var SubCategorie = categoryData.getOnlineSubCategories();
    SubCategorie[i].getID() // get ID (loop)


    //**** lab 05 ****/ (Catalog)
    // In order to get Categories
    var siteCatalog = CatalogMgr.getSiteCatalog();
    var catalogId = siteCatalog.getID();
    var catalogName = siteCatalog.getDisplayName();


    //**** lab 06 ****/ (route-append-override)
    // In order to extended or replaced some route
    server.extend(module.superModule); // first
    server.append('Show', function (req, res, next) { // or server.prepend or server.replace
        // Get page scope
        var viewData = res.getViewData();
        // Extend scope object with my data
        viewData.customMsg = 'Custom Text Here';
        // Update page scope
        res.setViewData(viewData);
        next();
       });
       

    //**** lab 07 ****/ (text-resources)
    // In order to get text-resources ONLY IN TEMPLATE
    ${Resource.msg('my.test.message', 'homePage', null)}
    // In order to get text-resources and pass variables ONLY IN TEMPLATE
    ${Resource.msgf('my.test.message', 'homePage', null, "lol", "pol")} // my.test.message=Its {0} from english {1}
    // In order to get text-resources/pass IN CONTROLLERS
    var Resource = require('dw/web/Resource');
    var viewData = res.getViewData();
    viewData.customMsg = Resource.msgf('my.test.message', 'homePage', null, "one", "two"); 
    res.setViewData(viewData);

    
    //**** lab 08 ****/ (content-assets)
    // In order to get and show content-assets with server side
    var ContentMgr = require('dw/content/ContentMgr');
    var ContentModel = require('*/cartridge/models/content');
    var apiContent = ContentMgr.getContent(req.querystring.cid); // cid - content asset ID
    var content = new ContentModel(apiContent, 'components/content/contentAssetInc');
    res.render(content.template, { content: content });
    // or just with custom tag in templates
    <iscontentasset aid="my-asset-id" /> // aid - content asset ID, how it work - in file modules.isml

    
    //**** lab 08.1 ****/ (content-slots)
    // In order to get and show content-assets add to template
    <isslot id="test-slot-my" description="Demo slot" context="global" />
    // and other in slots setting in site


    //**** lab 09 ****/ (template-decorators)
    // In order to create a decorator you must create template with teg inside
    <isreplace/>
    // In order to use decorator just add to othet template
    <isdecorate template="common/layout/page">...content</isdecorate> // template it's decorators url


    //**** lab 10 ****/ (forms)
    // In order to get current customer in controllers (without declaration session, is already available!)
    var Customer = session.getCustomer();
    var isAuth = Customer.isAuthenticated();
    // or just
    var isAuth = session.customer.registered 


    //**** lab 11 ****/ (local-remote-includes, templates)
    // In order to include other template
    <isinclude template="includeTemplate"/>
    // or
    <isinclude url="${URLUtils.url('Custom-IncludeUrl')}"/> // 'Custom-IncludeUrl' - controllers endpoint
    

    //**** lab 12 ****/ (custom-objects)
    // In order to get custom objects and its property (can create in business manager)
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var myReview = CustomObjectMgr.getCustomObject('LabReview', 'customObjectsLab'); // ‘customObjectsLab’ is an ID of an object, and ‘LabReview’ is custom object type
    var rating = myReview.getCustom().labRating; // different properties
    var reviewerName = myReview.getCustom().labReviewerName;  // different properties
    // In order to create custom object in code
    var Transaction = require('dw/system/Transaction');
    var newLabReview = null;
    Transaction.wrap(function() {
            // Transaction.wrap wraps callback provided as parameter into special context
            // that allows safely create new custom objects and write into custom objects’ properties,
            // and in case of failure it rolls back operation by itself and throws an exception
     newLabReview = CustomObjectMgr.createCustomObject('LabReview', 'formsLab'); 
     newLabReview.custom.labRating = 4;
     newLabReview.custom.labReviewerName = 'Vasia';
    });


    //**** lab 13 ****/ (campaigns-and-promotions)
    // In order to get promotions
    var PromotionMgr = require('dw/campaign/PromotionMgr');
    var promotions = PromotionMgr.getActiveCustomerPromotions().getPromotions().toArray();


    //**** lab 14 ****/ (aliases-and-url-rules)
    // In order to change "Enable Storefront URLs": Merchant Tools >  Site Preferences >  Storefront URL


    //**** lab 15 ****/ (coupons)
    // All in Merchant Tools


    //**** lab 16 ****/ (model-scripts)
    // In order to create model-scripts
    'use strict';
    /**
     * @constructor
     * @classdesc myCustom
     * @param {Object} obj- a source objects
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
     // In order to get model-scripts
     var MyCustom = require('*/cartridge/models/myCustom')


    //**** lab 17 ****/ (modules-custom-tags)
    // In order to create
    // in directory "templates/default/components/modules.isml"
        <ismodule template="myCustomModule"
            name="mycustommodule"
            attribute="product"
        />
    // In order to usage
    <isinclude template="/components/modules" />
    <ismycustommodule product="${pdict.product}"/>


    //**** lab 18 ****/ (csrf-protection)
    // In order to create
<form action="${URLUtils.url('Custom-Show')}" class="registration" method="POST" name="myform">    
    <input type="text" class="form-control" id="name" value="Enter name" name="name" encoding="off" />
    <input type="text" class="form-control" id="surname" name="Enter surname" value="surname" encoding="off" />
 <input type="hidden" name="${pdict.csrf.tokenName}" value="${pdict.csrf.token}"/> 
    <button type="submit" class="btn btn-block btn-primary">
        ${Resource.msg('button.createaccount.registration', 'registration', null)}
    </button>
</form>
// ***
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.get('MyForm', csrfProtection.generateToken, function (req, res, next) {***}
server.post('Show', csrfProtection.validateRequest, function (req, res, next) {
        var name = req.form.name;
        var surname = req.form.surname;
***}


    //**** lab 19 ****/ (custom-cache-storage)
    // In order to create
    // package.json
    {
        "caches": "./caches.json"
    }
    // caches.json
    {
        "caches": [
          {
            "id": "myCustomCache1"
          },
          {
            "id": "myCustomCache2",
            "expireAfterSeconds": 10000
          }
        ]
      }
      // in order to set
      var CacheMgr = require('dw/system/CacheMgr');
      var cache = CacheMgr.getCache( 'myCustomCache1' );
      cache.put('key1', {name: "Vania", age: 17})
      // in order to get
      var vania = cache.get('key1')


    //**** lab 20 ****/ (script-decorators)
    // bad task


    //**** lab 21 ****/ (script-factories)
    // no task, just example


    //**** lab 22 ****/ (script-modules-cartridge)
    // ...


    //**** lab 23 ****/ (ACDC-EnvironmentSetup)
    // ...


    //**** lab 24 ****/ (hooks)
    // In order to create
    // package.json
    {
        "hooks": "./hooks.json"
    }
    // hooks.json
    {
        "hooks": [
            {
                "name": "my.hook.custom",
                "script": "./cartridge/scripts/hooks/custom.js"
            }
        ]
    }
    // custom.js
    'use strict';
    function newOption (dataObj) {
        dataObj.updated = true;
        dataObj.lol = 12554;
        return dataObj;
    }
    module.exports = {
        newOption: newOption
    };
    // usage
    res.setViewData(dw.system.HookMgr.callHook( "my.hook.custom", "newOption", res.getViewData()))


    //**** lab 25 ****/ (organization-preferences)
    // In order to get
    var systemPreferences = require('dw/system/System').getPreferences();
    var orderShippedDays = systemPreferences.getCustom()['orderShippedDays']; // preferences ID


    //**** lab 26 ****/ (page-caching)
    // In order to get
    var cache = require('*/cartridge/scripts/middleware/cache');
    server.get('Show', cache.applyDefaultCache,  function (req, res, next) {***}













    res.render("myTemplate", {
        val1: value1,
        val2: value2
    });
    next();
});


module.exports = server.exports();
