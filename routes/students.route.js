const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/students.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', StudentController.createStudent)
router.get('/', StudentController.getStudents)
router.get('/:id', StudentController.getStudentById)
router.delete('/:id', StudentController.removeStudent)

module.exports = router;



