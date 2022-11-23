const Profesor = require('../models/Profesor.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createTeacher = async function (req, res) {
    const nuevoProfesor = new Profesor({
    usuario: req.user_identifier,
    titulo: req.body.titulo,
    experiencia: req.body.experiencia,
    })
    try {
    const createdTeacher = await nuevoProfesor.save();
    return res.status(201).json({createdTeacher, message: "Successfully created teacher"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Teacher creation was unsuccessful"})
    }
}

exports.getTeachers = async function (req, res) {
    try {
    const Teachers = await Profesor.find({}
        ).populate('usuarios',{
            _id: 0,
            nombre: 1,
            apellido: 1
        })
    return res.status(200).json({status: 200, data: Teachers, message: "Successfully received teachers"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeacherById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Teacher = await Profesor.findOne(identifier);
    return res.status(200).json({status: 200, data: Teacher, message: "Teacher successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getTeachersByExp = async function (req, res) {
    const teacher_experience= {experiencia: req.params.exp}
    try {
    const Teachers = await Profesor.find(teacher_experience).populate('usuarios')
    return res.status(200).json({status: 200, data: Teachers, message: "Successfully received teachers"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTeacher = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const teacherDeleted = await Usuario.remove(identifier)
    return res.status(200).json({status: 200, data: teacherDeleted, message: "Successfully deleted teacher"})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}

