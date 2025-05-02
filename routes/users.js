const router = require('express').Router();

const UsersRoute = require('../controllers/users.js');


router.get('/users', UsersRoute.getUsers);

router.get('/users/:id',UsersRoute.getUserById);

router.post('/users', UsersRoute.createUser);

router.put('/users/:id', UsersRoute.updateUser);

router.delete('/users/:id', UsersRoute.deleteUser);

module.exports = router;