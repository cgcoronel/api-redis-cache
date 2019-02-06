'use strict'


var Producto = require('../models/producto');

function getProducto(req, res){
    var productoId = req.params.id;

		Producto.findById(productoId, function(err, producto){
			if (err) {
				res.status(500).send({message: 'Error al devolver el Producto'});
			} else {
				if(!producto){
					res.status(404).send({message: 'El Producto no existe'});
				} else {
					res.status(200).send({producto});
				}
			}
		});
}

function getProductos(req, res){    
  var find = Producto.find();

  find.exec({}, (err, productos) => {
			if (err) {
				res.status(500).send({message: 'Error al devolver los Productos'});
			} else {
				if (!productos) {
					res.status(404).send({message: 'No hay Productos'});
				} else {
					res.status(200).send({productos});
				}
			}
	});
}

function saveProducto(req, res){
	var producto = new Producto();
  var params = req.body;
	producto.title = params.title;
	producto.description = params.description;

  if (params.stock != '')
    producto.stock = params.stock;
  else
    producto.stock = 0;

	producto.save((err, productoStored) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Producto'});
		} else {
			res.status(200).send({producto: productoStored});
		}


	});
}

function updateProducto(req, res){
	var productoId = req.params.id;
  var update = req.body;

	Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Producto'});
		} else {
			res.status(200).send({producto: productoUpdated});
		}
	});
}

function deleteProducto(req, res){
  var productoId = req.params.id;

	Producto.findById(productoId, function(err, producto){
		if (err) {
			res.status(500).send({message: 'Error al devolver el Producto'});
		}

		if(!producto){
			res.status(404).send({message: 'El Producto no existe'});
		} else {
			producto.remove(err => {
				if (err) {
					res.status(500).send({message: 'Error al borrar el Producto'});
				} else {
					res.status(200).send({message: 'El Producto se ha eliminado'});
				}
			});
		}
	});
}

module.exports = {
  getProducto,
  getProductos,
  saveProducto,
  updateProducto,
  deleteProducto
}
