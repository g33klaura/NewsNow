// REQUIREMENTS
// ==========================================
// Import burger model script
// var burger = require('../models/burger.js');

var express = require('express');
var router = express.Router();
var path = require("path");

// ROUTES
// ==========================================
// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  
  // this "selectAll" is defined in burger.js (THE MODEL)
  // burger.selectAll(function(data) {

  // 	// ...probably 'handlebars Object'
  //   var hbsObject = {
  //   	// tableName as property
  //     burgers: data
  //   };
  //   console.log(hbsObject);
    // res.render('index', hbsObject);
    res.render('index');
  });
// });

// EXPORTS
// ==========================================
// Export routes for server.js
module.exports = router;