const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.get('/userByEmail/:email', UserController.getUserByEmail)
router.put('/updateUser/:id', UserController.updateUser)
router.delete('/:id', UserController.removeUser)
router.post('/login', UserController.loginUser)

module.exports = router;



