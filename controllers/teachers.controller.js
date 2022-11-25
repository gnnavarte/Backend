const Profesor = require('../models/Profesor.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createTeacher = async function (req, res) {
    // #swagger.tags = ['Profesores'];
    // #swagger.description = 'Crea un profesor nuevo'
    try {
        const nuevoProfesor = new Profesor({
            usuario: req.user_identifier,
            titulo: req.body.titulo,
            contrataciones: [],
            experiencia: req.body.experiencia
            })
        const createdTeacher = await nuevoProfesor.save();
        return res.status(201).json({createdTeacher, message: "Successfully created teacher"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Teacher creation was unsuccessful"})
    }
}

exports.getTeachers = async function (req, res) {
    // #swagger.tags = ['Profesores'];
    // #swagger.description = 'Consulta todos los profesores'
    try {
        const Teachers = await Profesor.find({})
        // .populate('usuario')
        return res.status(200).json({status: 200, data: Teachers, message: "Successfully received teachers"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeacherById = async function (req, res) {
    // #swagger.tags = ['Profesores'];
    // #swagger.description = 'Consulta un profesor por su id'
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Teacher = await Profesor.findOne(identifier);
        return res.status(200).json({status: 200, data: Teacher, message: "Teacher successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeachersByExp = async function (req, res) {
    // #swagger.tags = ['Profesores'];
    // #swagger.description = ''
    try {
        const teacher_experience= {experiencia: req.params.exp}
        const Teachers = await Profesor.find(teacher_experience).populate('usuarios')
        return res.status(200).json({status: 200, data: Teachers, message: "Successfully received teachers"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTeacher = async function (req, res) {
    // #swagger.tags = ['Profesores'];
    // #swagger.description = 'Elimina un profesor'
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const teacherDeleted = await Usuario.remove(identifier)
        return res.status(200).json({status: 200, data: teacherDeleted, message: "Successfully deleted teacher"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

