const Calificacion = require('../models/Calificacion.model')
const Clase = require('../models/Clase.model');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createQualification = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const nuevaCalificacion = new Calificacion({
    usuario: req.body.usuario,
    fechaNacimiento: req.body.fechaNacimiento,
    mayorEstudioCursado: req.body.mayorEstudioCursado,
    mayorEstudioFinalizado: req.body.mayorEstudioCursado,
    })
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
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
        return res.status(400).json({status: 400, message: "Qualification creation was not successful"})
    }
}

exports.getQualifications = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
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
<<<<<<< HEAD
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Qualification = await Calificacion.findOne(identifier
        ).populate('clase'
        ).populate('usuario')
        return res.status(200).json({status: 200, data: Qualification, message: "Qualification successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeQualification = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Calificaciones'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
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