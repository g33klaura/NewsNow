// DEPENDENCIES
// ==========================================
var express = require('express');
var mongojs = require('mongojs');
var request = require('request');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
// var Materialize = require('materialize-css');

// Scraping tools
var axios = require('axios'); //Not required for project; says to use request
var cheerio = require('cheerio');

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Database configuration ~ old MongoJS way
// var databaseUrl = 'newsNow';
// var collections = ['scrapedNews'];


// SETUP
// ==========================================
// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Use morgan logger for logging requests
app.use(logger('dev'));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

// Require all models
var db = require('./models');

// Handlebars setup
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static('public'));

// Set default handlebars template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
// app.set('view engine', path.join(__dirname, 'app/views'), 'handlebars');
app.set('view engine', 'handlebars');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database    
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newNewsNow";

// Mongoose setup
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// mongoose.connect('mongodb://localhost/newNewsNow', {
//   useMongoClient: true
// });


// VARIABLES
// ==========================================
// Add the time when scrape is completed
var scrapeTime = new Date(Date.now()).toLocaleString();


// ROUTING
// ==========================================

// Main route, renders Handlebars index
var routes = require('./controller/api-routes.js');
app.use('/', routes);

// Trying to get saved articles rendering in saved.handlebars template
// const savedGet = express.Router();
// app.use('/saved', savedGet);


// ==========================================
// Route for scraping new articles, using Mongoose
// Triggers on "New Articles" button click
app.get('/scrape', function (req, res) {

  // Make a request for the news section of goodnewsnetwork
  // request('https://www.goodnewsnetwork.org/', function (error, response, html) {
  request('https://earther.com/c/conservation', function (error, response, html) {

    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

    // For each element that contains article elements
    // $('.thumb-wrap').each(function (i, element) {
    $('article').each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      // GoodNewsNetwork
      // result.title = $(this).children().attr('title');
      // result.link = $(this).children().attr('href');
      // result.image = $(this).children().children('img').attr('src');

      // Earther
      result.title = $(this).children().children().children().children(".entry-title a").text();
      result.link = $(this).children().children().children().children("a").attr("href");
      result.summary = $(this).children().children().children().children(".entry-summary p").text();
      result.image = $(this).children().children().children().children().children().children("source").attr("data-srcset");

      // If this found element had both a title and a link
      // These each have requirements of "unique", so will they check for articles already in db?.....
      if (result.title && result.link) {

        // Check for duplicates here*****
        // if no duplicates, THEN create...
        if (db.Article.validate === true) {

        // Create a new Article using the `result` object built from scraping
        // (Article is set in models)
        db.Article.create({
            title: result.title,
            link: result.link,
            summary: result.summary,
            image: result.image
          },
          function (err, scraped) {
            if (err) {
              console.log(err);
            } else {
              // console.log(scraped);
              // res.json(scraped);
              // console.log('Scrape successful.');
            }
          });
        } else {
          console.log('No new articles to scrape. Ln 146');
          // Materialize.toast('No new articles!', 4000);
        }
      }
      //^^if statement closes
      else {
        console.log('No new articles to scrape.');
        // res.redirect('/');
      }
    });
  });
  // If successful, send a message to the client
  // res.send('Scrape Complete at ' + scrapeTime);
  // ^^This doesn't ever show b/c not going to localhose:3000/scrape..........

  // Need to refresh & load '/' somehow......
  res.redirect('/');
});
// ==========================================



// ==========================================
// Retrieve data from the db (all currently-scraped articles)  *******MAKE IT mongoose*******
// app.get('/all', function (req, res) {
//   // Find all results from the scrapedNews collection in the db
//   db.Article.find({}, function (error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });
// ==========================================

// *****Make ajax call in Save.js!!!!! Connect to this
// Route to mark article as saved
app.get('/saveArticle/:id', function (req, res) {
  
  db.Article.findOneAndUpdate({_id: req.params.id}, 
    { $set: { saved: true }}, function (error, data) {
    
    console.log('Article marked saved');
    console.log(req.params.id);  //id prints!!!
        
  });
});


// Route for retrieving saved articles
// savedGet.get('/saved', function (req, res) {
app.get('/saved', function (req, res) {  
  db.Article.find({saved: true}, function (error, data) {
    var numberSaved = data.length;

    if (numberSaved === 0) {
      console.log('No articles currently saved.');
    } else {
      var hbsObject = {
        Article: data
      }
      console.log('Saved articles:');
      console.log(hbsObject);
      // Which page renders?? How to use other partial?...
      res.render('index', hbsObject);
    }
  });
});

// Route for deleting saved articles
app.get('/removeArticle/:id', function (req, res) {
  
  db.Article.findOneAndUpdate({_id: req.params.id}, 
    { $set: { saved: false }}, function (error, data) {
    
    console.log('Removed article from saved');
    console.log(req.params.id);
        
  });
});


// Listen on port set in variable above (depending on environment)
app.listen(PORT, function () {
  console.log('App running on port ' + PORT);
});