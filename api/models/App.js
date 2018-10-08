const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appSchema = new Schema({
  name: String,
  image: String,
  link: String,
  category: String,
  rank: Number
});

module.exports = mongoose.model('App', appSchema);
