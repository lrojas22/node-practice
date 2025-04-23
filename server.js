//express web server
const express = require('express');
const app = express();
const port = 3000

app.use('/', require('./routes'));


app.listen(process.env.PORT || port);
console.log('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO ' + (process.env.PORT || port))