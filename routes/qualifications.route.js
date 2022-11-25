const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const QualificationController = require('../controllers/qualifications.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de calificaciones');
  });
router.post('/',Authorization , QualificationController.createQualification)
router.get('/', QualificationController.getQualifications)
router.get('/:id', QualificationController.getQualificationById)
router.delete('/:id',Authorization , QualificationController.removeQualification)

module.exports = router;



