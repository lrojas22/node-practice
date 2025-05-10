const { body } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../util/passwordComplexityCheck')

const getUsers = async (req, res, next) => {
  const result = await mongodb.getDb().db('Learning').collection('users').find();
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

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido. Debe ser un ObjectId de 24 caracteres hexadecimales.' });
  }

  const userId = new ObjectId(id);
  const result = await mongodb.getDb().db('Learning').collection('users').find({ _id: userId });

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


const createUser = async(req, res) => {
  const {password} = req.body;
  //validar password antes de continuar
  const validationResult = passwordUtil.passwordPass(password)
  if (validationResult.error) {
    return res.status(400).json({
      message: 'Password does not meet complexity requirements',
       details:validationResult.error.details
      
      });
  }

  const user = {
    username: req.body.username,
    password: password,
    displayName: req.body.displayName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    currentLocation: req.body.currentLocation,
    openToNewOpportunities: req.body.openToNewOpportunities,
    profileIsPublic: req.body.profileIsPublic,
    theme_name: req.body.theme_name,
    profile: {
      experience: req.body.profile?.experience || [],
      education: req.body.profile?.education || [],
      projects: req.body.profile?.projects || [],
      skills: req.body.profile?.skills || [],
      references: req.body.profile?.references || []
    }};
  
  try{  
    const response =  await mongodb.getDb().db('Learning').collection('users').insertOne(user);
  if(response.acknowledged) {
    res.status(201).json(response);
    }else{
    res.status(500).json(response.error || 'Some error ocurred while creating the contact')
  }
  }catch (error){
    res.status(500).json(response.error || 'Unexpected error')
  }
};


const updateUser = async(req,res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    currentLocation: req.body.currentLocation,
    openToNewOpportunities: req.body.openToNewOpportunities,
    profileIsPublic: req.body.profileIsPublic,
    theme_name: req.body.theme_name,
    profile: {
      experience: req.body.profile?.experience || [],
      education: req.body.profile?.education || [],
      projects: req.body.profile?.projects || [],
      skills: req.body.profile?.skills || [],
      references: req.body.profile?.references || []
    }};

  try{  
    const response = await mongodb.getDb().db('Learning').collection('users').replaceOne({_id:userId},user);
    console.log(response);
      if (response.modifiedCount > 0) {
        res.status(200).send();
      }else{
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
  }catch(error){
    res.status(500).json(response.error || 'Unexpected error');
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
