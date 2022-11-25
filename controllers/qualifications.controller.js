const Calificacion = require('../models/Calificacion.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createQualification = async function (req, res) {
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const nuevaCalificacion = new Calificacion({
    usuario: req.body.usuario,
    fechaNacimiento: req.body.fechaNacimiento,
    mayorEstudioCursado: req.body.mayorEstudioCursado,
    mayorEstudioFinalizado: req.body.mayorEstudioCursado,
    })
    try {
    const createdQualification = await nuevaCalificacion.save();
    return res.status(201).json({createdQualification, message: "Succesfully Created Qualification"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Qualification Creation was Unsuccesfull"})
    }
}

exports.getQualifications = async function (req, res) {
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Qualifications = await Calificacion.paginate({}, options)
    return res.status(200).json({status: 200, data: Qualifications, message: "Succesfully Qualifications Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getQualificationById = async function (req, res) {
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Qualification = await Calificacion.findOne(identifier);
    return res.status(200).json({status: 200, data: Qualification, message: "Succesfully Qualification Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeQualification = async function (req, res) {
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const qualificationDeleted = await Calificacion.remove(identifier)
    return res.status(200).json({status: 200, data: qualificationDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}