<h1 align="center">NewsNow: Conservation Edition</h1>

<div align="center">Web application that scrapes articles from the environmental news site "Earther."  Users will be able to view articles, choose to save certain ones, and leave comments on saved articles.</div>

## Deployed Application

[Heroku] <https://pure-stream-21176.herokuapp.com/>

<!-- ## Inspiration/ Concept/ Motivation -->

## Technologies Used

MongoDB, Mongoose, Express, Node, Handlebars, Materialize CSS

## Key Features

* Scraping new articles does not produce duplicates
* Dynamically rendered articles with Handlebars template

### Application Process

1. On page load, articles currently stored in database will render
1. Clicking "New Articles" will scrape for any new entries
1. Currently the user needs to refresh the page to view any newly scraped articles**
1. Articles will mark as "saved" on Save Article button click
1. Saving notes function is in process**

### Screenshots

![Index View](/screenshots/articles_screen.png) <br />
*Initial view of articles*

![Saved Articles](/screenshots/saved_rendering.png) <br />
*Articles saved on click, can render on index*