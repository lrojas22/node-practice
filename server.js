//express web server
const express = require('express');
const app = express();
const port = 3000

app.get('/', (req,res) =>{
    res.send('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO '+ port);
});

app.get('/LUIS', (req,res) =>{
    res.send('HOLA SOY LUIS y tambien uso el puerto:  '+ port);
});


app.listen(process.env.port || port);
console.log('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO ' + (process.env.port || port))