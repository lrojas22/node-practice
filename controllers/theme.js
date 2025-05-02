const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getThemes = async (req, res, next) => {
  const result = await mongodb.getDb().db('Learning').collection('themes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
/*
const getUserById = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Learning').collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};*/

const getThemeById = async (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido. Debe ser un ObjectId de 24 caracteres hexadecimales.' });
  }

  const userId = new ObjectId(id);
  const result = await mongodb.getDb().db('Learning').collection('themes').find({ _id: userId });

  result.toArray().then((lists) => {
    if (!lists.length) {
      return res.status(404).json({ error: 'Contacto no encontrado.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  }).catch((err) => {
    res.status(500).json({ error: 'Error al obtener el contacto.' });
  });
};


const createTheme = async(req, res) => {
  const theme = {
    themeName : req.body.themeName,
    fontSize : req.body.fonstSize,
    fontFamily : req.body.fontFamily,
    inspiration : req.body.inspiration,
    colors : req.body.colors
  };
  const response =  await mongodb.getDb().db('Learning').collection('themes').insertOne(theme);
  if(response.acknowledged) {
    res.status(201).json(response);
    }else{
    res.status(500).json(response.error || 'Some error ocurred while creating the contact')
  }

};


const updateTheme = async(req,res) => {
  const userId = new ObjectId(req.params.id);
  const theme = {
    themeName : req.body.themeName,
    fontSize : req.body.fonstSize,
    fontFamily : req.body.fontFamily,
    inspiration : req.body.inspiration,
    colors : req.body.colors
  };
  const response = await mongodb.getDb().db('Learning').collection('themes').replaceOne({_id:userId},theme);
  console.log(response);
   if (response.modifiedCount > 0) {
    res.status(200).send();
   }else{
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
   }
};

const deleteTheme = async(req,res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Learning').collection('themes').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};


module.exports = { getThemes, getThemeById, createTheme,updateTheme,deleteTheme};
