// REQUIREMENTS
// ==========================================
// Require all models
var db = require('../models');
// Import burger model script
// var burger = require('../models/burger.js');

var express = require('express');
var router = express.Router();
var path = require("path");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ROUTES
// ==========================================
// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {

  // this "selectAll" is defined in burger.js (THE MODEL)~from ORM burger project
  // this DATA is null.................
  db.Article.find({}, function (error, data) {

    if (error) {
      console.log(error);
    } else {
      // for (let i = 0; i < data.length; i++) {
      //   let articleElement = data[i];

      //   var hbsObject = {
      //     // collectionName as property?
      //     // articles: {
      //     //   title: value
      //     // }
      //     articles: articleElement.title.value

      //   };
      //   console.log('api-routes, ln 24');
      //   console.log(hbsObject);
      //   res.render('index', hbsObject);
      //   // res.render('index');

      console.log(data);
      // ^^Does grab title & link, in array, each as object........
    }
  });
});
// });

// EXPORTS
// ==========================================
// Export routes for server.js
module.exports = router;