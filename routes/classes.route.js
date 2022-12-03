const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const ClassController = require('../controllers/classes.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de clases');
  });
router.post('/',Authorization , ClassController.createClass)
router.get('/', ClassController.getClasses)
router.get('/:id', ClassController.getClassById)
router.get('/category/:category', ClassController.getClassByCategory)
router.put('/:id',Authorization , ClassController.updateClass)
router.delete('/:id',Authorization , ClassController.removeClass)
router.put('/unrollStudent/:id',Authorization , ClassController.unrollStudent)

module.exports = router;