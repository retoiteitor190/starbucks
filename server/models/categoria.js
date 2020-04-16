const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema ({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico y diferente' 
});

module.exports = mongoose.model('Categoria', categoriaSchema);