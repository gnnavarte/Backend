const Clase = require('../models/Clase.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''
    console.log("llegue al controller",req.body)
    const nuevaClase = new Clase({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo,
    categoria: req.body.categoria,
    frecuencia: req.body.frecuencia,
    duracion: req.body.duracion,
    costo: req.body.costo,
    imagen: req.body.imagen,
    calificaciones: req.body.calificaciones,
    comentarios: req.body.comentarios
    })
    try {
    const createdClass = await nuevaClase.save();
    return res.status(201).json({createdClass, message: "Succesfully Created Class"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Class Creation was Unsuccesfull"})
    }
}

exports.getClasses = async function (req, res) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Classes = await Clase.paginate({}, options)
    return res.status(200).json({status: 200, data: Classes, message: "Succesfully Classes Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = async function (req, res) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Class = await Clase.findOne(identifier);
    return res.status(200).json({status: 200, data: Class, message: "Succesfully Class Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassByCategory = async function (req, res) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''
    const user_email= {email: req.params.email}
    console.log(email);
    try {
    const Class = await Clase.findOne(user_email);
    return res.status(200).json({status: 200, data: Class, message: "Succesfully Class Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''    
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier)
    try {
        var oldClass = await Clase.findOne(identifier);
        console.log(oldClass)
        // return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

    //Edit the User Object
    // nombre: String,
    // apellido: String,
    // avatar: String,
    // telofono: String,
    // email: String,
    // password: String,
    // preguntaVerificacion: String,
    // respuestaVerificacion: String,
    // rol: String,

    oldClass.nombre = "String"
    oldClass.apellido = "String"
    
    try {
    const updatedClass = await oldClass.save()
    return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated User"})
    } catch (e) {
    return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClass = async function (req, res, next) {
    // #swagger.tags = ['Clases'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const classDeleted = await Clase.remove(identifier)
    return res.status(200).json({status: 200, data: classDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}
