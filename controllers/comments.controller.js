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
    return res.status(201).json({createdComment, message: "Succesfully Created Comment"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }
}

exports.getComments = async function (req, res) {

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Comments = await Comentario.paginate({}, options)
    return res.status(200).json({status: 200, data: Comments, message: "Succesfully Comments Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getCommentById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const Comment = await Comentario.findOne(identifier);
    return res.status(200).json({status: 200, data: Comment, message: "Succesfully Comment Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeComment = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const commentDeleted = await Comentario.remove(identifier)
    return res.status(200).json({status: 200, data: commentDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}