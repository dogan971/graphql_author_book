const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model("Books", BooksSchema);
