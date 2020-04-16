const express = require('express');
const app = express();
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { verificaToken }= require('../middleware/autenticacion');


app.get('/usuario', [verificaToken], function(req, res ){
   // res.json('get Usuario Local');
  let desde = req.query.desde || 0;
  let limite = req.query.limite || 0;
  
  desde = Number(desde);
  limite = Number(limite);

   Usuario.find({})
   .skip(desde)
   .limit(limite)
   .exec((err, usuarios)=>{
      if(err){
        return res.status(400).json({
          ok: false,
          mensaje: `Ocurrio un error al momento de consultar ${err}`
        });
      }

      res.json({
          ok: false,
          mensaje: 'Consulta realizada con exito',
          usuarios
      });
   });

});


app.post('/usuario', [verificaToken], function (req, res){
    let body = req.body;

    let usuario = new Usuario({   
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
});

  usuario.save((err, usuarioDB) => {
    if(err){
      return res.status(400).json({
        ok: false,
        mensaje: `Ocurrio un error al momento de guardar ${err}`
      })
    }
    
    res.json({
      ok: true,
      mensaje: 'El usuario ha sido insertado con exito',
      usuario: usuarioDB
    })

  }); 
    
  
  });

  app.put('/usuario/:id', function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','estado', 'role','email']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, usrDB) => {
      if(err){
        return res.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al momento de actualizar ${err}`
        });
      }
      return res.json({
        ok: true,
        mensaje: 'Cambios guardados con exito',
        usuario: usrDB 
      });
    });
  });




  app.delete('/usuario/:id', function (req, res){
   let id = req.params.id;

//    Usuario.deleteOne({ _id: id},(err, resp) => {
//     if (err){
//       return res.status(400).json({
//         ok: false,
//         mensaje: `Ocurrio un error al eliminar el registro ${err}`
//       });
//     }
   
//     if(resp.deleteCount --- 0){
//       return res.status(400).json({ 
//         ok: false,
//         mensaje: `El usuario con el id: ${id}, no se a encontrado`
//       });
//     }
    
//   return res.json({
//     ok:true,
//     mensaje: 'Registro borrado con exito',
//     resp
//   });
// });

Usuario.findByIdAndUpdate(id, { estado: false}, {new: true, runValidators: true, context: 'query' }, (err, resp)=>{
  if(err){
    return res.status(400).json({
      ok: false,
      mensaje: `Ocurrio un error al momento de eliminar un usuario ${err}`
});
  }
  return res.json({
    ok: true,
    mensaje: 'Registro borrado con exito',
    resp
  });
});
});

module.exports = app;