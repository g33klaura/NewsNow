// FUNCTIONS
// ==========================================

function saveArticle() {
  console.log('Save Article clicked');
  let currentPost = $(this).parent().parent().parent();
  console.log(currentPost);
  let currentId = currentPost.attr('data-id');
  console.log(currentId);

  let currentState = currentPost.attr('data-state');
  console.log(currentState);

  switch (currentState) {
    case 'unsaved':
      $(currentPost).attr('data-state', 'saved');
      console.log('Article switched to saved');
      break;
  
    default:
      console.log('Article not saved');
      break;
  }

  // Need AJAX call to connect with app.get('/saveArticle') route in server.js

  $.ajax({
    url: '/saveArticle/' + currentId,
    // id: currentId,
    method: 'GET'
  }).done(function(response) {
    console.log(response);
    // See what happens here...
    // ^Nothing logged
    location.reload();
    // ^^Will this make the saved article dissapear from the main page, b/c handlebars??
  })

}



// MAIN PROCESS
// ==========================================
// Saving articles when rendered

$(document).on('click', 'a.save-article', saveArticle);



// Adding a note


// Deleting an article from saved


// Viewing all saved articles! **** this is a ROUTE tho