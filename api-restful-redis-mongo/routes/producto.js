'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var api = express.Router();

api.get('/producto/:id',      ProductoController.getProducto);
api.get('/productos/',        ProductoController.getProductos);
api.post('/producto',         ProductoController.saveProducto);
api.put('/producto/:id',      ProductoController.updateProducto);
api.delete('/producto/:id',   ProductoController.deleteProducto);

module.exports = api;
