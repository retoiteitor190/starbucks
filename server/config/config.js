// PUERTO 
process.env.PORT = process.env.PORT || 3000;

// ENTORNO 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// FIRMA SECRETA DE JWT 
process.env.FIRMA = process.env.FIRMA || 'firma-super-secreta';

// CONEXION A LA BASE DE DATOS 
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://admin:ruizmoreno@cluster0-hy7of.mongodb.net/biblioteca?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;