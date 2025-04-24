const router = require('express').Router();

const studentRoute = require('../controllers/contacts.js');


router.get('/contacts', studentRoute.getData);

router.get('/contacts/:id',studentRoute.getData_Single);



module.exports = router;