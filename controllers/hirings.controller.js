const Contratacion = require('../models/Contratacion.model');
const Usuario = require('../models/Usuario.model');
const Profesor = require('../models/Profesor.model')
const Clase = require('../models/Clase.model');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createHiring = async function (req, res) {
    // #swagger.tags = ['Contrataciones'];
    // #swagger.description = ''
    try {
        if (req.user_role == "alumno") {
            const identifier= {_id: ObjectId(req.body.claseId)}
            const Class = await Clase.findOne(identifier)

            const nuevaContratacion = new Contratacion({
            clase: Class._id,
            usuario: req.user_identifier,
            motivo: req.body.motivo,
            estado: "pendiente",
            horarioReferencia: req.body.horarioReferencia
            })
    
            const createdHiring = await nuevaContratacion.save();
    
            const Teacher = await Profesor.findOne(Class.profesor);
            console.log(Teacher)
            Teacher.contrataciones = Teacher.contrataciones.concat(createdHiring._id)
            await Teacher.save()
            return res.status(201).json({createdHiring, message: "Hiring successfully created"})
        } else {
            return res.status(400).json({status: 400, message: "User does not have the required role"})
        }
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Hiring creation was unsuccessful"})
    }
}

exports.getHirings = async function (req, res) {
    // #swagger.tags = ['Contrataciones'];
    // #swagger.description = ''
    try {
        const Users = await Contratacion.find({}
        ).populate('clase'
        ).populate('usuario')
        return res.status(200).json({status: 200, data: Users, message: "Successfully received hirings"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getHiringById = async function (req, res) {
    // #swagger.tags = ['Contrataciones'];
    // #swagger.description = ''
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const User = await Contratacion.findOne(identifier
        ).populate('clase'
        ).populate('usuario')
        return res.status(200).json({status: 200, data: User, message: "Hiring successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.approveHiring = async function (req, res) {
    // #swagger.tags = ['Contrataciones'];
    // #swagger.description = ''
    try {
        if (req.user_role == "profesor") {
            const identifier= {_id: ObjectId(req.body.contratacionId)}
            const oldHiring = await Contratacion.findOne(identifier);
            oldHiring.estado = "aceptada"
            await oldHiring.save()
    
            //Agrega la clase a la lista de clases del alumno.
            console.log(oldHiring.usuario)
            const User = await Usuario.findOne(oldHiring.usuario)
            console.log("Esta serian las clases del usuario")
            console.log(User.clases)
            console.log("el de arriba")
            if (User.clases.indexOf(oldHiring.clase) == -1) {
                User.clases = User.clases.concat(oldHiring.clase)
            await User.save()
    
            //Agrega al alumno a la lista de alumnos activos de la clase.
            const target_class = await Clase.findOne(oldHiring.clase)
            target_class.estudiantes = target_class.estudiantes.concat(student_user.id)
            await target_class.save()
    
            } 
            return res.status(200).json({status: 200, data: oldHiring, message: "Hiring accepted, student successfully enrolled"});
        } else {
            return res.status(400).json({status: 400, message: "User does not have the required role"})
        }
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHiring = async function (req, res, next) {
    // #swagger.tags = ['Contrataciones'];
    // #swagger.description = ''
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const hiringDeleted = await Contratacion.remove(identifier)
        return res.status(200).json({status: 200, data: hiringDeleted, message: "Hiring successfully deleted"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
