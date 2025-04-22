const luis = (req,res) =>{
    res.send('Hola soy LUIS y tambien uso el puerto: 3000');
}

const sandra = (req,res) =>{
    res.send('Hola soy SANDRA y tambien uso el puerto:  3000');
}


module.exports = {
    luis,
    sandra
}