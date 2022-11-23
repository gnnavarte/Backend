const Calificacion = require('../models/Calificacion.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createQualification = async function (req, res) {
    const nuevaCalificacion = new Calificacion({
        clase: req.body.clase,
        estudiante: req.user_identifier,
        valor: req.body.valor
    })
    try {
    const createdQualification = await nuevaCalificacion.save();
    return res.status(201).json({createdQualification, message: "Qualification successfully created"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Qualification creation was not successful"})
    }
}

exports.getQualifications = async function (req, res) {
    try {
    const Qualifications = await Calificacion.find({}
        ).populate('clases',{
            _id: 0,
            nombre: 1
        }).populate('estudiantes',{
            _id: 0
        })
    return res.status(200).json({status: 200, data: Qualifications, message: "Qualifications successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getQualificationById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Qualification = await Calificacion.findOne(identifier);
    return res.status(200).json({status: 200, data: Qualification, message: "Qualification successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeQualification = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const qualificationDeleted = await Calificacion.remove(identifier)
    return res.status(200).json({status: 200, data: qualificationDeleted, message: "Qualification successfully deleted"})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}