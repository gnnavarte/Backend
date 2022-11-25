const Estudiante = require('../models/Estudiante.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createStudent = async function (req, res) {
    // #swagger.tags = ['Estudiantes'];
    // #swagger.description = ''
    try {
        const nuevoEstudiante = new Estudiante({
            usuario: req.user_identifier,
            fechaNacimiento: req.body.fechaNacimiento,
            mayorEstudioCursado: req.body.mayorEstudioCursado,
            mayorEstudioFinalizado: req.body.mayorEstudioFinalizado,
            })
        const createdStudent = await nuevoEstudiante.save();
        return res.status(201).json({createdStudent, message: "Student successfully created"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Student creation was not successful"})
    }
}

exports.getStudents = async function (req, res) {
    // #swagger.tags = ['Estudiantes'];
    // #swagger.description = ''
    try {
        const Students = await Estudiante.find({}).populate('usuario')
        return res.status(200).json({status: 200, data: Students, message: "Students successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getStudentById = async function (req, res) {
    // #swagger.tags = ['Estudiantes'];
    // #swagger.description = ''
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Student = await Estudiante.findOne(identifier).populate('usuario');
        return res.status(200).json({status: 200, data: Student, message: "Student successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeStudent = async function (req, res) {
    // #swagger.tags = ['Estudiantes'];
    // #swagger.description = ''
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const studentDeleted = await Estudiante.remove(identifier)
        return res.status(200).json({status: 200, data: studentDeleted, message: "Student successfully deleted"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}