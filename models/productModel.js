const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
   },
   description: {
      type: String,
      required: true,
   },
   badge: {
      type: String,
      default: '',
   },
   type:{
      type: String,
      required: true,
   },
   size: {
      type: [String],
      required: true
   },
   brand: {
      type: String,
      required: true,
   },
   tags:{
      type: [String],
      default: []
   },
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Product', productSchema);
