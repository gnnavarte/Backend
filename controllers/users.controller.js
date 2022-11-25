const Usuario = require('../models/Usuario.model');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
_this = this;

exports.createUser = async function (req, res) {
    try {
        const user_email= {email: req.body.email}
        const User = await Usuario.findOne(user_email);
        if (!User){
            const nuevoUsuario = new Usuario({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                avatar: req.body.avatar,
                telofono: req.body.telofono,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                preguntaVerificacion: req.body.preguntaVerificacion,
                respuestaVerificacion: bcrypt.hashSync(req.body.respuestaVerificacion, 8),
                rol: req.body.rol,
                clases: []
                })
            const createdUser = await nuevoUsuario.save();
            return res.status(201).json({createdUser, message: "User successfully created"})
        } else {
            return res.status(400).json({status: 400, message: "User creation was unsuccessful, the entered email already exists"})
        }
    } catch (e) {
        return res.status(400).json({status: 400, message: "User creation was unsuccessful"})
    }
}

exports.getUsers = async function (req, res) {
    try {
        const Users = await Usuario.find({}).populate('clases')
        return res.status(200).json({status: 200, data: Users, message: "Successfully received users"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUserById = async function (req, res) {
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        console.log(identifier);
        const User = await Usuario.findOne(identifier).populate('clases');
        return res.status(200).json({status: 200, data: User, message: "User successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUserByEmail = async function (req, res) {
    try {
        const user_email= {email: req.params.email}
        const User = await Usuario.findOne(user_email).populate('clases');
        return res.status(200).json({status: 200, data: User, message: "User successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateUser = async function (req, res) {
    try {
        const identifier= {_id: ObjectId(req.user_identifier)}
        var oldUser = await Usuario.findOne(identifier);
        //Edit the User Object
        oldUser.nombre = req.body.nombre,
        oldUser.apellido = req.body.apellido,
        oldUser.avatar = req.body.avatar,
        oldUser.telofono = req.body.telofono,
        oldUser.rol = req.body.rol
        const updatedUser = await oldUser.save()
        return res.status(200).json({status: 200, data: updatedUser, message: "Successfully updated user"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const userDeleted = await Usuario.remove(identifier)
        return res.status(200).json({status: 200, data: userDeleted, message: "User successfully deleted"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginUser = async function (req, res) {
    const {body}=req
    const {email,password}=body

    const user = await Usuario.findOne({email})
    
    console.log(password,user.password)
    //indica si password es correcto
    const passwordCorrect = user ===null
    ? false
    : await bcrypt.compare(password,user.password)

    if(!(user && passwordCorrect)){
        response.status(401).json({
            error:'Invalid user or password'
        })
    }

    const userForToken={
        id:user._id,
        rol: user.rol,
        email:user.email
    }

    const token = jwt.sign(userForToken,process.env.SECRET)

    res.send({
        id:user.id,
        rol: user.rol,
        token
    })
}
