const Usuario = require('../models/Usuario.model');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

_this = this;

exports.createUser = async function (req, res) {
    console.log("llegue al controller",req.body)
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
    try {
    const createdUser = await nuevoUsuario.save();
    console.log(createdUser)
    return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
    console.log(e)
    return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.getUsers = async function (req, res) {

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    var options = {
        page,
        limit
    }
    try {
    const Users = await Usuario.paginate({}, options)
    return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUserById = async function (req, res) {
    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier);
    try {
    const User = await Usuario.findOne(identifier);
    return res.status(200).json({status: 200, data: User, message: "Succesfully User Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUserByEmail = async function (req, res) {
    const user_email= {email: req.params.email}
    console.log(email);
    try {
    const User = await Usuario.findOne(user_email);
    return res.status(200).json({status: 200, data: User, message: "Succesfully Users Recieved"});
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateUser = async function (req, res) {

    const identifier= {_id: ObjectId(req.params.id)}
    console.log(identifier)
    try {
        var oldUser = await Usuario.findOne(identifier);
        console.log(oldUser)
        // return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

    //Edit the User Object
    oldUser.nombre = req.body.nombre,
    oldUser.apellido = req.body.apellido,
    oldUser.avatar = req.body.avatar,
    oldUser.telofono = req.body.telofono,
    oldUser.rol = req.body.rol
    
    try {
    const updatedUser = await oldUser.save()
    return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
    return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {
    const identifier= {_id: ObjectId(req.params.id)}
    try {
    const userDeleted = await Usuario.remove(identifier)
    return res.status(200).json({status: 200, data: userDeleted, message: "Succesfully Deleted... "})
    } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginUser = async function (req, res) {
    const user_email= {email: req.body.email}
    const user_password= {password: req.body.password}
    try {
        const User = await Usuario.findOne(user_email);
        const passwordIsValid = bcrypt.compareSync(user_password, User.password);
        if (!passwordIsValid)
            return res.status(400).json({message: "Error en la contraseña"})
        else {
            // const token = jwt.sign({
            //     id: _details._id
            // }, process.env.SECRET, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            // const loginUser = {token:token, user:User};
            return res.status(201).json({User, message: "Succesfully login"})
        }

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}
