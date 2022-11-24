const Calificacion = require('../models/Calificacion.model')
const Clase = require('../models/Clase.model');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createQualification = async function (req, res) {
    try {
    const claseCalificada = await Clase.findOne(req.body.claseId)
    const nuevaCalificacion = new Calificacion({
        clase: claseCalificada.id,
        usuario: req.user_identifier,
        valor: req.body.valor
    })
    const createdQualification = await nuevaCalificacion.save();
    claseCalificada.calificaciones = claseCalificada.calificaciones.concat(createdQualification._id)
    await claseCalificada.save()
    return res.status(201).json({createdQualification, message: "Qualification successfully created"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Qualification creation was not successful"})
    }
}

exports.getQualifications = async function (req, res) {
    try {
    const Qualifications = await Calificacion.find({}
        ).populate('clase'
        ).populate('usuario')
    return res.status(200).json({status: 200, data: Qualifications, message: "Qualifications successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getQualificationById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const Qualification = await Calificacion.findOne(identifier
        ).populate('clase'
        ).populate('usuario')
    return res.status(200).json({status: 200, data: Qualification, message: "Qualification successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeQualification = async function (req, res) {
    try {
    const identifier= {_id: ObjectId(req.params.id)}
    const qualificationToDelete = await findOne(identifier)
    const claseCalificada = await Clase.findOne(qualificationToDelete.clase)
    const indexToDelete = claseCalificada.calificaciones.indexOf(req.params.id)
    claseCalificada.calificaciones = claseCalificada.calificaciones.splice(indexToDelete, 1)
    await claseCalificada.save()
    const qualificationDeleted = await Calificacion.remove(identifier)
    return res.status(200).json({status: 200, data: qualificationDeleted, message: "Qualification successfully deleted"})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}