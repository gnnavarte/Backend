const Profesor = require('../models/Profesor.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createTeacher = async function (req, res) {
    // #swagger.tags = ['Profesores'];
	// #swagger.description = ''
    const nuevoProfesor = new Profesor({
    usuario: req.body.usuario,
    titulo: req.body.titulo,
    experiencia: req.body.experiencia,
    })
    try {
    const createdTeacher = await nuevoProfesor.save();
    return res.status(201).json({createdTeacher, message: "Succesfully Created Teacher"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Teacher Creation was Unsuccesfull"})
    }
}

exports.getTeachers = async function (req, res) {
    // #swagger.tags = ['Profesores'];
	// #swagger.description = ''
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Teachers = await Profesor.paginate({}, options)
    return res.status(200).json({status: 200, data: Teachers, message: "Succesfully Teachers Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeacherById = async function (req, res) {
    // #swagger.tags = ['Profesores'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Teacher = await Profesor.findOne(identifier);
    return res.status(200).json({status: 200, data: Teacher, message: "Succesfully Teacher Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeachersByExp = async function (req, res) {
    // #swagger.tags = ['Profesores'];
	// #swagger.description = ''
    const teacher_experience= {experiencia: req.params.exp}
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Teachers = await Profesor.paginate(teacher_experience, options)
    return res.status(200).json({status: 200, data: Teachers, message: "Succesfully Teachers Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTeacher = async function (req, res) {
    // #swagger.tags = ['Profesores'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const teacherDeleted = await Usuario.remove(identifier)
    return res.status(200).json({status: 200, data: teacherDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}

