'use strict';

module.exports = function (oApp) {

  let Product = require('../../db/models/product.js');

  oApp.get('/api/product', function (req, res) {
    Product.find(function (err, products) {
      if (err) {
        return res.status(500).send('Error occurred: database error');
      }

      res.json(products.map(function (product) {
        return {
          id: product.id,
          name: product.name,
          supplier: product.supplier,
          price: product.price,
          units_on_order: product.units_on_order,
          units_in_stock: product.units_in_stock,
        };
      }));
    });
  });

  oApp.get('/api/product/:id', function (req, res) {
    Product.findOne({ id: req.params.id }, function (err, product) {
      if (err || product === null) {
        return res.status(500).send('Error occurred: database error');
      }

      res.json({
        id: product.id,
        name: product.name,
        supplier: product.supplier,
        price: product.price,
        units_on_order: product.units_on_order,
        units_in_stock: product.units_in_stock,
      });
    });
  });

  oApp.post('/api/product', function (req, res) {
    new Product({
      id: req.body.id,
      name: req.body.name,
      supplier: req.body.supplier,
      price: req.body.price,
      units_on_order: req.body.units_on_order,
      units_in_stock: req.body.units_in_stock,
    }).save(function (err, product) {
      if (err) {
        return res.status(500).send('Error occurred: database error');
      }
      res.json({
        id: product.id,
        name: product.name,
        supplier: product.supplier,
        price: product.price,
        units_on_order: product.units_on_order,
        units_in_stock: product.units_in_stock,
      });
    });

  });

  oApp.delete('/api/product/:id', function (req, res) {
    Product.remove({ id: req.params.id }, function (err) {
      if (err) {
        return res.status(500).send('Error occurred: database error');
      }

      return res.send();
    });
  });

  oApp.put('/api/product/:id', function(req,res){
    Product.update({
      id: req.params.id
    }, {
      name: req.body.name,
      supplier: req.body.supplier,
      price: req.body.price,
      units_on_order: req.body.units_on_order,
      units_in_stock: req.body.units_in_stock,
    }, function(err){
      if(err){
        return res.status(500).send('Error occurred: database error');
      }
      res.send();
    });
  });

};