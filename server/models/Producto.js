const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
    title: {
        type: String,
        require: [true, 'El titulo es obligatorio']
    },
    price: {
        type: Number,
        require: [true, 'El precio es obligatorio']
    },
    description: {
        type: String,
        require: [true, 'La descripcion es obligatorio']
    }
});

module.exports = model('Producto', ProductoSchema)