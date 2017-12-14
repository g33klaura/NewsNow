var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        Article.find({title: v}, function(err, docs) {
          cb(docs.length == 0);
        });
      },
      message: 'Title already exists in database.'
    }
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        Article.find({link: v}, function(err, docs) {
          cb(docs.length == 0);
        });
      },
      message: 'Link already exists in database.'
    }
  },
  // `summary` is not required and type of String
  summary: {
    type: String
  },
  // `image` is not required and of type String
  image: {
    type: String
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;