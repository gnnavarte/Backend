const express = require('express')
const router = express.Router()
const ClassController = require('../controllers/classes.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de clases');
  });
router.post('/', ClassController.createClass)
router.get('/', ClassController.getClasses)
router.get('/:id', ClassController.getClassById)
router.get('/category/:category', ClassController.getClassByCategory)
router.put('/:id', ClassController.updateClass)
router.delete('/:id', ClassController.removeClass)

module.exports = router;



