const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const TeacherController = require('../controllers/teachers.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de profesores');
  });
router.post('/', TeacherController.createTeacher)
router.get('/', TeacherController.getTeachers)
router.get('/:id', TeacherController.getTeacherById)
router.get('/experience/:experience', TeacherController.getTeachersByExp)
router.delete('/:id',Authorization , TeacherController.removeTeacher)

module.exports = router;



