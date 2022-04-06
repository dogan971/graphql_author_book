const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorsSchema = new Schema({
  name: String,
  age: Number,
  ownBooks: { type: Array, default: [] },
});

module.exports = mongoose.model("Authors", AuthorsSchema);
