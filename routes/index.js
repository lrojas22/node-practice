const router = require('express').Router();

const studentRoute = require('../controllers/contacts.js');


router.get('/', studentRoute.getAllContacts);

router.get('/:id',studentRoute.getContactsById);

router.post('/', studentRoute.createContact);

router.put('/:id', studentRoute.updateContact);

router.delete('/:id', studentRoute.deleteContact);


module.exports = router;