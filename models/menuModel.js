const mongoose = require('mongoose');

const subcategorylistSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   link: {
      type: String,
      required: true,
   }
});

const subcategorySchema = new mongoose.Schema({
   name: {
      type: String,
   },
   image: {
      type: String,
   },
   subcategorylist: [subcategorylistSchema]
});

const menuSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   subcategories: [subcategorySchema]
});

module.exports = mongoose.model('Menu', menuSchema);