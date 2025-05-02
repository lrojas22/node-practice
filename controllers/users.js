const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res, next) => {
  const result = await mongodb.getDb().db('Learning').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getUserById = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Learning').collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
/*
const getContactsById = async (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido. Debe ser un ObjectId de 24 caracteres hexadecimales.' });
  }

  const userId = new ObjectId(id);
  const result = await mongodb.getDb().db('Learning').collection('contacts').find({ _id: userId });

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
*/

const createUser = async(req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response =  await mongodb.getDb().db('Learning').collection('users').insertOne(contact);
  if(response.acknowledged) {
    res.status(201).json(response);
    }else{
    res.status(500).json(response.error || 'Some error ocurred while creating the contact')
  }

};


const updateUser = async(req,res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('Learning').collection('users').replaceOne({_id:userId},contact);
  console.log(response);
   if (response.modifiedCount > 0) {
    res.status(200).send();
   }else{
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
   }
};

const deleteUser = async(req,res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Learning').collection('users').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};


module.exports = { getUsers, getUserById, createUser,updateUser,deleteUser};
