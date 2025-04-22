//express web server
const express = require('express');
const app = express();
const port = 3000
const lesson1Controller = require('./controllers/lesson1')

app.get('/', (req,res) =>{
    res.send('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO '+ port);
});
app.get('./luis',lesson1Controller.luis);
app.get('./sandra',lesson1Controller.sandra);




app.listen(process.env.port || port);
console.log('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO ' + (process.env.port || port))