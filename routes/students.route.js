const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/students.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de estudiantes');
  });
router.post('/', StudentController.createStudent)
router.get('/', StudentController.getStudents)
router.get('/:id', StudentController.getStudentById)
router.delete('/:id', StudentController.removeStudent)

module.exports = router;



