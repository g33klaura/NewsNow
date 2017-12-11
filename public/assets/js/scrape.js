// FUNCTIONS
// ==========================================
// Need functions to:
// scrapeArticles
// saveArticle  **save in new script?
  // ^^May need "setActive" example from Activity 10/Thurs
// renderArticles (on the page)
// renderHandlebarsTemplate
// noNewArticles
// displayAllArticles


function scrapeArticles() {
  // Function needs to display number of articles scraped or message that none new(?)
  $.getJSON('/scrape', function(data) {
    console.log(data);

    // Need to render handlebars template
    // renderHandlebarsTemplate()
  });
}


// MAIN PROCESS
// ==========================================
$(document).ready(function() {
  
  // On-click for "New Articles" button
  $(".scrape-new").on("click", function() {
    // event.preventDefault();
    console.log("New articles clicked");
 
    // Call function to render number of articles have been scraped OR "no new articles" message***
    scrapeArticles();

    // Display current date & time here for testing
    var scrapeTime = new Date(Date.now()).toLocaleString();
    console.log(scrapeTime);
  });

})