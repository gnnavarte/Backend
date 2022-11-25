const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const UserController = require('../controllers/users.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de usuarios');
  });
router.post('/', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.removeUser)
router.get('/email/:email', UserController.getUserByEmail)
router.put('/update',Authorization ,UserController.updateUser)
router.post('/login', UserController.loginUser)
module.exports = router;



