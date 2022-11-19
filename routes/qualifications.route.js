const express = require('express')
const router = express.Router()
const QualificationController = require('../controllers/qualifications.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', QualificationController.createQualification)
router.get('/', QualificationController.getQualifications)
router.get('/:id', QualificationController.getQualificationById)
router.delete('/:id', QualificationController.removeQualification)

module.exports = router;



