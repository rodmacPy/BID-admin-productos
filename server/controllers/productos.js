const { response, request } = require('express');
const { validationResult } = require('express-validator');
// crear contrase;a segura
const Producto = require('../models/Producto');


const productosGet = async (req = request, res = response) => {
    try {
        const product = await Producto.find({});
        res.json({
            ok: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los productos de la base de datos.'
        });
    }
}

const productosPost = async (req = request, res = response) => {
    console.log(req.body)
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, price } = req.body;
        const producto = new Producto({ title, description, price })
        producto.save()
        res.json({
            msg: 'post API - usuariosPost',
            producto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener la mascota de la Base de Datos'
        });
    }
}
const productosOneGet = async (req, res = response) => {
    try {
        const { id } = req.params;
        const product = await Producto.findById(id);
        if (!product) {
            return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
        }
        res.json({
            ok: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener el producto de la base de datos.'
        });
    }
}


const productosPut = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const existingProducto = await Producto.findOne({ title });

        if (existingProducto && existingProducto.id !== id) {
            return res.status(400).json({ message: 'El nombre ya está en uso' });
        }

        const updatedProducto = await Producto.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

const productosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


const productosDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'producto not found'
            });
        }
        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar la broma de la Base de datos.'
        })
    }
}


module.exports = {
    productosGet,
    productosPost,
    productosPut,
    productosPatch,
    productosDelete,
    productosOneGet
}