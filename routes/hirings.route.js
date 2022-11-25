const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const HiringController = require('../controllers/hirings.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de contrataciones');
  });
router.post('/',Authorization , HiringController.createHiring)
router.get('/', HiringController.getHirings)
router.get('/:id', HiringController.getHiringById)
router.put('/approve',Authorization , HiringController.approveHiring)
router.delete('/:id',Authorization , HiringController.removeHiring)

module.exports = router;