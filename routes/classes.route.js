const express = require('express')
const router = express.Router()
const ClassController = require('../controllers/classes.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/add', ClassController.createClass)
router.get('/', ClassController.getClasses)
router.get('/:id', ClassController.getClassById)
router.get('/userByEmail/:email', ClassController.getClassByCategory)
router.put('/updateUser/:id', ClassController.updateClass)
router.delete('/:id', ClassController.removeClass)

module.exports = router;



