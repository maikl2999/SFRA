'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

    
    res.render("showmainpage");

    next();
});


server.get('NonCachedBlock', function (req, res, next) {

    
    res.render("showdate");

    next();
});







server.post('Show1', function (req, res, next) {

    var name = req.form.name;
    var surname = req.form.surname;
    
    var form = req.form;

    var lab = 123;

    res.render("myTemplate", {
        name: name,
        surname: surname
    });

    next();
});

module.exports = server.exports();
