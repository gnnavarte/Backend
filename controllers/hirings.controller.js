const Contratacion = require('../models/Contratacion.model');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createHiring = async function (req, res) {
    const nuevaContratacion = new Contratacion({
    clase: '',
    usuario: '',
    motivo: req.body.motivo,
    estado: req.body.estado,
    horarioReferencia: req.body.horarioReferencia
    })
    try {
    const createdHiring = await nuevaContratacion.save();
    return res.status(201).json({createdHiring, message: "Hiring successfully created"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Hiring creation was unsuccessful"})
    }
}

exports.getHirings = async function (req, res) {
    try {
    const Users = await Contratacion.find({}).populate('clases').populate('usuarios')
    return res.status(200).json({status: 200, data: Users, message: "Successfully received hirings"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getHiringById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const User = await Contratacion.findOne(identifier);
    return res.status(200).json({status: 200, data: User, message: "Hiring successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateHiring = async function (req, res) {
    try {
        const identifier= {_id: ObjectId(req.user_identifier)}
        var oldHiring = await Contratacion.findOne(identifier);
        //Edit the User Object
        oldHiring.motivo = req.body.motivo,
        oldHiring.estado = req.body.estado,
        oldHiring.horarioReferencia = req.body.horarioReferencia
        const updatedHiring = await oldHiring.save()
        return res.status(200).json({status: 200, data: updatedHiring, message: "Successfully updated hiring"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHiring = async function (req, res, next) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const hiringDeleted = await Contratacion.remove(identifier)
    return res.status(200).json({status: 200, data: hiringDeleted, message: "Hiring successfully deleted"})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}
