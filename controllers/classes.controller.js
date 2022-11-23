const Clase = require('../models/Clase.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createClass = async function (req, res) {
    if (req.user_rol == "profesor") {
        const nuevaClase = new Clase({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            categoria: req.body.categoria,
            frecuencia: req.body.frecuencia,
            duracion: req.body.duracion,
            costo: req.body.costo,
            imagen: req.body.imagen,
            calificaciones: [],
            comentarios: [],
            profesor: req._id
            })
        try {
        const createdClass = await nuevaClase.save();
        return res.status(201).json({createdClass, message: "Successfully created class"})
        } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Class creation was unsuccessful"})
        }
    } else {
        return res.status(400).json({status: 400, message: "User does not have the required role"})
    }

}

exports.getClasses = async function (req, res) {
    try {
    const Classes = await Clase.find({}
        ).populate('calificaciones', {
            _id: 0,
            valor: 1
        }
        ).populate('comentarios', {
            _id: 0,
            descripcion: 1
        }
        ).populate('profesores', {
            _id: 0,
            titulo: 1,
            experiencia: 1
        })
    return res.status(200).json({status: 200, data: Classes, message: "Classes successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Class = await Clase.findOne(identifier);
    return res.status(200).json({status: 200, data: Class, message: "Class successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassByCategory = async function (req, res) {
    const class_category= {category: req.params.category}
    try {
    const Class = await Clase.findOne(class_category);
    return res.status(200).json({status: 200, data: Class, message: "Class successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateClass = async function (req, res) {
    if (req.user_rol == "profesor") {
        try {
            const identifier= {_id: ObjectId(req.user_identifier)}
            var oldClass = await Clase.findOne(identifier);
            //Edit the User Object
            oldClass.nombre = req.body.nombre,
            oldClass.descripcion = req.body.descripcion,
            oldClass.tipo = req.body.tipo,
            oldClass.categoria = req.body.categoria,
            oldClass.frecuencia = req.body.frecuencia,
            oldClass.duracion = req.body.duracion,
            oldClass.costo = req.body.costo,
            oldClass.imagen = req.body.imagen
            const updatedClass = await oldClass.save()
            return res.status(200).json({status: 200, data: updatedClass, message: "Class successfully updated"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    } else {
        return res.status(400).json({status: 400, message: "User does not have the required role"})
    }
}

exports.removeClass = async function (req, res, next) {
    if (req.user_rol == "profesor") {
        const identifier= {_id: ObjectId(req.params.id)}
        try {
        const classDeleted = await Clase.remove(identifier)
        return res.status(200).json({status: 200, data: classDeleted, message: "Class successfully deleted"})
        } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
        }
    } else {
        return res.status(400).json({status: 400, message: "User does not have the required role"})
    }
}
