'use strict';

let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  id: Number,
  name: String,
  supplier: String,
  price: String,
  units_on_order: Number,
  units_in_stock: Number,
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;
