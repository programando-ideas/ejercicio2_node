var express = require('express');
var morgan = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
const rfs = require("rotating-file-stream");
var dotenv = require('dotenv');
var path = require('path')

dotenv.config();

const port = process.env.PORT || 3000;

var usersController = require('./controllers/usersCtrl');

var app = express();

//Parser de datos recibidos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Crea el logger
const streamLog = rfs.createStream("log.txt", {
    size: "10M",
    interval: "1d",
    compress: "gzip",
    path: path.join(__dirname, 'log')
});
app.use(morgan('combined', { stream: streamLog }))

//Politica de Cors
app.use(cors({
    origin: `http://localhost:${port}`
}));

//Cabeceras - Seguridad
app.use(helmet());

//Definicion de rutas
app.use('/api/users', usersController);

app.listen(port, function() {
    console.log(`El sitio de APIs inició correctamente en el puerto ${port}`);
});