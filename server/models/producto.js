const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del producto']
    },
    precioUni: {
        type: Number,
        required: [true, 'Por favor ingresa el precio del producto']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Por favor ingresa la categoria del producto']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: [false, 'Por favor ingresa la imagen']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    }
});

productoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Producto', productoSchema);