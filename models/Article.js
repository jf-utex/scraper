//file for how the article sill be stored

var mongoose = require("mongoose");
// create schema class
var Schema = mongoose.Schema;

// create article schema
var ArticleSchema = new Schema({
    // title for the deal - required
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
