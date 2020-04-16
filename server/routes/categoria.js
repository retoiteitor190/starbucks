const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../models/categoria');

app.get('/categoria', function (req, res) {
    Categoria.find({})
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de consultar ${err}`
                });
            }
            return res.json({
                ok: true,
                mensaje: 'Consulta realizada con exito',
                count: categorias.length,
                categorias
            });
        });
});


app.post('/categoria', function (req, res){
    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: body.usuario

    });

    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            })
        }
         res.json({
            ok: true,
            mensaje: 'La categoria ha sido insertada con exito',
            categoria: catDB
        })

    });

});


app.put('/categoria/:id', function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`

            });
        }
        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            categoria: catDB
        });
    });
});


app.delete('/categoria/:id', function (req, res){
    let id = req.params.id;
    // Usuario.deleteOne({ _id: id }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (resp.deletedCount === 0) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 id,
    //                 msg: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });

    // });
    Categoria.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de eliminar una categoria ${err}`

            });
        }
        return res.json({
            ok: true,
            mensaje: 'Categoria borrada con exito',
            resp
        });
    });
});
module.exports = app;