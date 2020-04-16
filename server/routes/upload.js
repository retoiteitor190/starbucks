const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();


const Usuario = require('../models/usuario');

const Producto = require('../models/producto');


app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se a encontrado el archivo'
        });

    }

    let validExtensions = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if(!validExtensions.includes(archivo.mimetype)){
        return res.status(400).json({
            ok: false,
            mensaje: 'Solo las extensiones <jpg, gif, jpeg> son validas, por favor suba otro archivo'
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => { //mv = move
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: `Ocurrio un error en el servidor al tratar de subir la imagen: ${err}`
            });
        }
    });

    switch (ruta) {
        case 'producto':
            imagenProducto(id, res, nombre);
            break;
        case 'usuario':
            imagenUsuario(id, res, nombre);
            break;
        default:
            console.log('ruta no valida');
            break;
    }
});

function imagenUsuario(id, res, nombreImagen){
    Usuario.findById(id, (err, usr) => {   //usr variable MongoDB
        if(err){
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de subir la imagen ${err}`
            });
        }

        if(!usr){
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario especificado'
            });
        }

        usr.img = nombreImagen;

        usr.save((err, usrDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(500).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de relacionar el archivo con el registro: ${err}`
                });
            }

            return res.json({
                ok: true,
                mensaje: 'La imagen a sido subida con exito',
                usuario: usrDB
            });

        });

    });

}

function imagenProducto(id, res, nombreImagen){
    Producto.findById(id, (err, prod) => {   
        if(err){
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de subir la imagen ${err}`
            });
        }

        if(!prod){
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario especificado'
            });
        }

        prod.img = nombreImagen;

        prod.save((err, productosDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'producto');
                return res.status(500).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de relacionar el archivo con el registro: ${err}`
                });
            }

            return res.json({
                ok: true,
                mensaje: 'La imagen a sido subida con exito',
                productos: productosDB
            });

        });

    });

}


    function borrarArchivo(nombreImagen, ruta){
        let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);

        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);

        }
           console.log('Imagen borrada');
    }

    module.exports = app;