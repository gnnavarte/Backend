const Estudiante = require('../models/Estudiante.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createStudent = async function (req, res) {
    const nuevoEstudiante = new Estudiante({
    usuario: req.body.usuario,
    fechaNacimiento: req.body.fechaNacimiento,
    mayorEstudioCursado: req.body.mayorEstudioCursado,
    mayorEstudioFinalizado: req.body.mayorEstudioCursado,
    })
    try {
    const createdStudent = await nuevoEstudiante.save();
    return res.status(201).json({createdStudent, message: "Succesfully Created Student"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Student Creation was Unsuccesfull"})
    }
}

exports.getStudents = async function (req, res) {

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Students = await Estudiante.paginate({}, options)
    return res.status(200).json({status: 200, data: Students, message: "Succesfully Students Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getStudentById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Student = await Estudiante.findOne(identifier);
    return res.status(200).json({status: 200, data: Student, message: "Succesfully Students Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeStudent = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const studentDeleted = await Estudiante.remove(identifier)
    return res.status(200).json({status: 200, data: studentDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}