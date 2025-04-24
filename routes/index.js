const router = require('express').Router();

const studentRoute = require('../controllers/contacts.js');


router.get('/contacts', studentRoute.getAllContacts);

router.get('/contacts/:id',studentRoute.getContactsById);



module.exports = router;