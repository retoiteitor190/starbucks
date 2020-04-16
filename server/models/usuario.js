const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    google: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: rolesValidos,
        default: 'USER_ROLE'
    },

    img: {
        type: String
    },

    estado: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);