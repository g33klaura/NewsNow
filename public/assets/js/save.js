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

  // Perform Mongoose findOneAndUpdate()
  // $.getJSON('/saveArticle', function (currentId) {

  //   // None of these things print, but needs $.getJSON...
  //   console.log(currentId);
  //   console.log('Article saved');
  //   console.log('testing 1, 2, 3');

  //   // Modal message "article saved"
  // });
}



// MAIN PROCESS
// ==========================================
// Saving articles when rendered

$(document).on('click', 'a.save-article', saveArticle);



// Adding a note


// Deleting an article from saved


// Viewing all saved articles! **** this is a ROUTE tho