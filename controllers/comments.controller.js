const Comentario = require('../models/Comentario.model')
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createComment = async function (req, res) {
    const nuevoComentario = new Comentario({
    usuario: req.body.usuario,
    fechaNacimiento: req.body.fechaNacimiento,
    mayorEstudioCursado: req.body.mayorEstudioCursado,
    mayorEstudioFinalizado: req.body.mayorEstudioCursado,
    })
    try {
    const createdComment = await nuevoComentario.save();
    return res.status(201).json({createdComment, message: "Comment successfully created"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Comment creation was unsuccessful"})
    }
}

exports.getComments = async function (req, res) {
    try {
    const Comments = await Comentario.find({}).populate('clases').populate('usuarios')
    return res.status(200).json({status: 200, data: Comments, message: "Comments successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Comment = await Comentario.findOne(identifier);
    return res.status(200).json({status: 200, data: Comment, message: "Comment successfully received"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeComment = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const commentDeleted = await Comentario.remove(identifier)
    return res.status(200).json({status: 200, data: commentDeleted, message: "Comment successfully deleted"})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}