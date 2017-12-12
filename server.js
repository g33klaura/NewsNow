// From 18-mongodb>Thursday>11-Scraping-into-db
// may also need Thursday>10-mongojs-and-front-end

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

// Scraping tools
var axios = require('axios'); //Not required for project; says to use request
var cheerio = require('cheerio');

var PORT = 3000; //Will need env port once deployed?************

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

// Mongoose setup
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/newNewsNow', {
  useMongoClient: true
});


// VARIABLES
// ==========================================
// Add the time when scrape is completed
var scrapeTime = new Date(Date.now()).toLocaleString();


// ROUTING
// ==========================================
// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// Main route, renders Handlebars index
var routes = require('./controller/api-routes.js');
app.use('/', routes);


// ==========================================
// Route for scraping new articles, using Mongoose
// Triggers on "New Articles" button click
app.get('/scrape', function (req, res) {

  // Make a request for the news section of goodnewsnetwork
  request('https://www.goodnewsnetwork.org/', function (error, response, html) {

    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

    // For each element that contains article elements
    $('.thumb-wrap').each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children().attr('title');
      result.link = $(this).children().attr('href');
      result.image = $(this).children().children('img').attr('src');

      // If this found element had both a title and a link
      if (result.title && result.link) {

        // Create a new Article using the `result` object built from scraping
        // (Article is set in models)
        db.Article.create({
            title: result.title,
            link: result.link,
            image: result.image
          },
          function (err, scraped) {
            if (err) {
              console.log(err);
            } else {
              console.log(scraped);
            }
          });
      }
      //^^if statement closes
    });
  });
  // If successful, send a message to the client
  res.send('Scrape Complete at ' + scrapeTime);
});
// ==========================================


// ##########################################
// Route for scraping new articles  ****MongoJS way, not Mongoose****
// Scrape data from one site and place it into the mongodb db
// app.get('/scrape', function(req, res) {
//   // Make a request for the news section of goodnewsnetwork
//   request('https://www.goodnewsnetwork.org/', function(error, response, html) {
//     // Load the html body from request into cheerio
//     var $ = cheerio.load(html);
//     // For each element with a "title" class
//     $('.thumb-wrap').each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children().attr('title');
//       var link = $(element).children().attr('href');

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedNews db
//         db.scrapedNews.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });
//   // Send a "Scrape Complete" message with current time to the browser
//   res.send('Scrape Complete at ' + scrapeTime);
// });
// ##########################################


// ==========================================
// Retrieve data from the db (all currently-scraped articles)  *******MAKE IT mongoose*******
app.get('/all', function (req, res) {
  // Find all results from the scrapedNews collection in the db
  db.Article.find({}, function (error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});
// ==========================================


// ##########################################
// // Retrieve data from the db (all currently-scraped articles)  *******WITH MONGOJS*******
// app.get('/all', function(req, res) {
//   // Find all results from the scrapedNews collection in the db
//   db.scrapedNews.find({}, function(error, found) {
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
// ##########################################


// Route for retrieving saved articles
app.get('/saved', function (req, res) {

});


// Listen on port set in variable above (depending on environment)
app.listen(PORT, function () {
  console.log('App running on port ' + PORT);
});