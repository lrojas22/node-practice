const routes = require('express').Router();

const lesson1Controller = require('../controllers/lesson1')

app.get('/', (req,res) =>{
    res.send('HOLA ESTOY RECORDANDO NODE.JS USANDO EL PUERTO '+ port);
});
app.get('/luis',lesson1Controller.luis);
app.get('/sandra',lesson1Controller.sandra);

module.exports = routes;