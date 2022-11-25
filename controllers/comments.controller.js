const Comentario = require('../models/Comentario.model')
const Clase = require('../models/Clase.model');
const { findOne } = require('../models/Comentario.model');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createComment = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Comentarios'];
	// #swagger.description = ''
    const nuevoComentario = new Comentario({
    usuario: req.body.usuario,
    fechaNacimiento: req.body.fechaNacimiento,
    mayorEstudioCursado: req.body.mayorEstudioCursado,
    mayorEstudioFinalizado: req.body.mayorEstudioCursado,
    })
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
    try {
        const claseComentada = await Clase.findOne(req.body.claseId)
        const nuevoComentario = new Comentario({
        clase: claseComentada._id,
        usuario: req.user_identifier,
        descripcion: req.body.descripcion,
        bloqueado: false
        })
        const createdComment = await nuevoComentario.save();
        claseComentada.comentarios = claseComentada.comentarios.concat(createdComment._id)
        await claseComentada.save()
        return res.status(201).json({createdComment, message: "Comment successfully created"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Comment creation was unsuccessful"})
    }
}

exports.blockComment = async function (req, res) {
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Comment = await Comentario.findOne(identifier);
        Comment.bloqueado = true
        await Comment.save()
        return res.status(200).json({status: 200, data: Comments, message: "Comments successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getComments = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Comentarios'];
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
        const Comments = await Comentario.find({}
            ).populate('clase'
            ).populate('usuario')
        return res.status(200).json({status: 200, data: Comments, message: "Comments successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentById = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Comentarios'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Comment = await Comentario.findOne(identifier
            ).populate('clase'
            ).populate('usuario')
        return res.status(200).json({status: 200, data: Comment, message: "Comment successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeComment = async function (req, res) {
<<<<<<< HEAD
    // #swagger.tags = ['Comentarios'];
	// #swagger.description = ''
    const identifier= {_id: ObjectId(req.params.id)}
=======
>>>>>>> 66285bbd7ad875069001a82de8b4fb3e9232035b
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const commentToDelete = await findOne(identifier)
        const claseComentada = await Clase.findOne(commentToDelete.clase)
        const indexToDelete = claseComentada.comentarios.indexOf(req.params.id)
        claseComentada.comentarios = claseComentada.comentarios.splice(indexToDelete, 1)
        await claseComentada.save()
        const commentDeleted = await Comentario.remove(identifier)
        return res.status(200).json({status: 200, data: commentDeleted, message: "Comment successfully deleted"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}