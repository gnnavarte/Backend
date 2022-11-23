const express = require('express')
const router = express.Router()
const HiringController = require('../controllers/hirings.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de contrataciones');
  });
router.post('/', HiringController.createHiring)
router.get('/', HiringController.getHirings)
router.get('/:id', HiringController.getHiringById)
router.put('/update', HiringController.updateHiring)
router.delete('/:id', HiringController.removeHiring)

module.exports = router;