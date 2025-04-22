const luis = (req,res) =>{
    res.send('Hola soy LUIS y tambien uso el puerto:  '+ port);
}

const sandra = (req,res) =>{
    res.send('Hola soy SANDRA y tambien uso el puerto:  '+ port);
}


module.exports = {
    luis,
    sandra
}