// FUNCTIONS
// ==========================================

// function renderModal() {
//   // Target some empty div in index.handlebars
//   // var articleModal = 
//   // Save modal html to variable
//   // Then append that variable to the empty modal div?

//   $('.modal').html('<a class="waves-effect waves-light btn modal-trigger" href="#modal-articles">I is a Modal</a>');

//   if (numberArticles != 0) {
//     console.log('Currently ' + numberArticles + ' articles in the database.');
    
//   } else {
//     console.log('No scraped articles in database.');
//   }
// }

function scrapeArticles() {
  // Function needs to display number of articles scraped or message that none new(?)
  $.getJSON('/scrape', function (data) {
    console.log(data);

    // Display current date & time here for testing
    var scrapeTime = new Date(Date.now()).toLocaleString();
    console.log('Scrape completed at: ' + scrapeTime);
    // scrape for new, then display
    // displayAllArticles();

    var numberArticles = data.length;
    // renderModal();
  });
  location.reload(true);
  // ^^Until modal works, have page reload to show articles
}


// MAIN PROCESS
// ==========================================
$(document).ready(function () {

  // On-click for "New Articles" button
  $('.scrape-new').on('click', function () {
    // event.preventDefault();
    console.log('New articles clicked');

    // Call function to render number of articles have been scraped OR "no new articles" message***
    scrapeArticles();

    $('#modal-articles').modal('open');
    // // Display current date & time here for testing
    // var scrapeTime = new Date(Date.now()).toLocaleString();
    // console.log(scrapeTime);
  });


})