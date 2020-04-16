//Importamos
require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
//Declarando constante app
const app = express();
const bodyParser = require('body-parser');
app.ude((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader(
        'Acces-Control-Allow-Header',
        'Origin, X-Request.With,Contac'
    );
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 3000');
});