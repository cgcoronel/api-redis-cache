'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductoSchema = Schema(
	{
		title: String,
		description: String,
		stock: String
	}
);

module.exports = mongoose.model('Producto', ProductoSchema);
