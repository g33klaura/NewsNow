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
// Route to display all currently-scraped articles, stored in db
router.get('/', function (req, res) {

  db.Article.find({}, {}, function (error, data) {

    // Checking if there are articles currently in the db
    var numberArticles = data.length;

    if (numberArticles != 0) {
      console.log('Currently ' + numberArticles + ' articles in the database.');
    } else {
      console.log('No scraped articles in database.');
    }

    if (error) {
      console.log(error);
    } else {

      var hbsObject = {
        // HAS TO BE MODEL NAME (breaks otherwise!)
        Article: data,
        // title: data.value
        // ^^Undefined... might not be needed
      }

      // console.log(data);
      console.log(hbsObject);

      res.render('index', hbsObject);
    }
  }).sort({_id:-1});

}); //Closes router.get


// EXPORTS
// ==========================================
// Export routes for server.js
module.exports = router;