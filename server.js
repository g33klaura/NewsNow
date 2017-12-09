// From 18-mongodb>Thursday>11-Scraping-into-db
    // may also need Thursday>10-mongojs-and-front-end
    
// DEPENDENCIES
// ==========================================
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "newsNow";
var collections = ["scrapedNews"];


// SETUP
// ==========================================
// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Handlebars setup
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Set default handlebars template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', path.join(__dirname, 'app/views'), 'handlebars');
app.set('view engine', 'handlebars');

// VARIABLES
// ==========================================
// Add the time the scrape was completed
var scrapeTime = new Date(Date.now()).toLocaleString();

// ROUTING
// ==========================================
// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

var routes = require('./app/controller/api-routes.js');
app.use("/", routes);

// index route loads view.html    ***worked except couldn't load js scripts
// From 15-Sequelized>Sat>15-Post-Author_joins
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "app/public/index.html"));
// });

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedNews collection in the db
  db.scrapedNews.find({}, function(error, found) {
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

// Route for scraping new articles
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("https://www.goodnewsnetwork.org/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".thumb-wrap").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children().attr("title");
      var link = $(element).children().attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedNews db
        db.scrapedNews.insert({
          title: title,
          link: link
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message with current time to the browser
  res.send("Scrape Complete at " + scrapeTime);
});


// Route for retrieving saved articles
app.get("/saved", function(req, res) {

});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
