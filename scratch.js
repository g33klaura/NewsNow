// =================================
// Scratch sheet for NewsNow
/*
Steps to complete:
[] Update readme
[x] MVC directory/file structure 
  [x] Need "controller" instead of "routes"?
[x] Handlebars templates

Routes needed 
[] scrape new articles
[] display scraped articles
[] save article (and delete from scraped list?)
[] save note to article
[] delete article from saved
[]

=================================
Who/What/Where

server.js ~ 

app/public/assets/js/scrape.js ~
  on-click for new articles button

app/public/assets/js/nav.js ~ script for collapsing navbar

controller/api-routes.js ~ 
controller/html-routes.js ~ *NOT ACTUALLY SURE I NEED...

*/

// index route loads view.html    ***worked except couldn't load js scripts
// From 15-Sequelized>Sat>15-Post-Author_joins
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "app/public/index.html"));
// });