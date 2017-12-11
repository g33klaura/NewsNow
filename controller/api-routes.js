// REQUIREMENTS
// ==========================================
var express = require('express');
var router = express.Router();
var path = require("path");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require all models
var db = require('../models');

// ROUTES
// ==========================================
// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {

  // this "selectAll" is defined in burger.js (THE MODEL)~from ORM burger project
  // this DATA is null.................

  // var collection = req.db.get(articles);

  db.Article.find({}, {}, function (error, data) {

    if (error) {
      console.log(error);
    } else {

      var hbsObject = {
        Article: data,
        title: data.value
        //     // collectionName as property?
        //     // articles: {
        //     //   title: value
        //     // }
        //     articles: articleElement.title.value

      }
      //   console.log('api-routes, ln 24');
      //   console.log(hbsObject);
      //   res.render('index', hbsObject);
      //   // res.render('index');

      // console.log(data);
      // ^^Does grab title & link, in array, each as object........
      console.log('ln 48 api-routes');
      console.log(hbsObject);
      res.render('index', hbsObject);
    }
  });

}); //Closes router.get
// });

// EXPORTS
// ==========================================
// Export routes for server.js
module.exports = router;