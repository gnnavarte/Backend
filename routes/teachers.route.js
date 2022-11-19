const express = require('express')
const router = express.Router()
const TeacherController = require('../controllers/teachers.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', TeacherController.createTeacher)
router.get('/', TeacherController.getTeachers)
router.get('/:id', TeacherController.getTeacherById)
router.get('/userByEmail/:email', TeacherController.getTeachersByExp)
router.delete('/:id', TeacherController.removeTeacher)

module.exports = router;



