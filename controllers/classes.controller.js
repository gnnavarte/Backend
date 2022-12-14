const Clase = require('../models/Clase.model');
const Usuario = require('../models/Usuario.model');
const Profesor = require('../models/Profesor.model')
const Estudiante = require('../models/Estudiante.model')
const Comentario = require('../models/Comentario.model')
const Calificacion = require('../models/Calificacion.model');
const { filter } = require('bluebird');
const ObjectId = require('mongodb').ObjectId;

_this = this;

exports.createClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Crear una nueva clase'
    try {
        if (req.user_role == "profesor") {
            const teacher = await Profesor.findOne({usuario: req.user_identifier})
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
                profesor: teacher.id,
                publicada: true
            })
            const createdClass = await nuevaClase.save();

            const identifier= {_id: ObjectId(req.user_identifier)}
            const User = await Usuario.findOne(identifier);
            User.clases = User.clases.concat(createdClass._id)
            await User.save()

            return res.status(201).json({createdClass, message: "Successfully created class"})
        } else {
            return res.status(400).json({status: 400, message: "User does not have the required role"})
        }
    } catch (e) {
        return res.status(400).json({status: 400, message: "Class creation was unsuccessful"})
}


}

exports.unrollStudent = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Saca a un alumno de una clase'
    try {
            //Borra la clase de la lista de clases del alumno.
            const user_identifier= {_id: ObjectId(req.params.id)}
            const student_user = await Usuario.findOne(user_identifier)
            const indexToDelete = student_user.clases.indexOf(req.body.classId)
            if (indexToDelete != -1) {
                student_user.clases.splice(indexToDelete, 1)
                await student_user.save()
            } 
            //Borra al alumno de la lista de alumnos activos de la clase.
            const class_identifier= {_id: ObjectId(req.body.classId)}
            const target_class = await Clase.findOne(class_identifier)
            const index = target_class.estudiantes.indexOf(student_user.id)
            if (index != -1) {
            target_class.estudiantes.splice(index, 1)
            await target_class.save()
            }
            return res.status(200).json({status: 200, data: target_class, message: "Student successfully unrolled"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasses = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Consulta todas las clases'
    try {
        let Classes = await Clase.find({}
        ).populate({path: 'profesor', populate: {path: 'usuario'}}
        ).populate('calificaciones'
        ).populate('comentarios')
        
        for (let index = 0; index < Classes.length; index++) {
            let total = 0
            let contador = 0
            if (!Classes[index].calificaciones.length == 0) {
                Classes[index].calificaciones.forEach(element => {
                    total = total + element.valor
                    contador = contador + 1
                });
                promedio = total/contador
                promedio = promedio.toFixed(2)
                Classes[index]._doc = {
                    ...Classes[index]._doc, 
                    calificacionPromedio: {
                        sumCalificaciones : total, 
                        cantCalificaciones: contador,
                        promedioCalculado: promedio
                }};
            } else {
                Classes[index]._doc = {
                    ...Classes[index]._doc, 
                    calificacionPromedio: {
                        sumCalificaciones : 0, 
                        cantCalificaciones: 0,
                        promedioCalculado: 0
                }};
            }
        }     
        return res.status(200).json({status: 200, data: Classes, message: "Classes successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassById = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Consulta una clase ingresando su id'
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const Class = await Clase.findOne(identifier
        ).populate({path: 'profesor', populate: {path: 'usuario'}}
        ).populate('calificaciones'
        ).populate('comentarios')

        if (!Class.calificaciones.length == 0) {
            let total = 0
            let contador = 0
            Class.calificaciones.forEach(element => {
                total = total + element.valor
                contador = contador + 1
            });
            promedio = total/contador
            promedio = promedio.toFixed(2)
            Class._doc = {
                ...Class._doc, 
                calificacionPromedio: {
                    sumCalificaciones : total, 
                    cantCalificaciones: contador,
                    promedioCalculado: promedio
                }};
        } else {
            Class._doc = {
                ...Class._doc, 
                calificacionPromedio: {
                    sumCalificaciones : 0, 
                    cantCalificaciones: 0,
                    promedioCalculado: 0
            }};
        }
        return res.status(200).json({status: 200, data: Class, message: "Class successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClassByCategory = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Consulta las clases de una determinada categoria'
    try {
        const class_category= {category: req.params.category}
        const Class = await Clase.findOne(class_category
        ).populate({path: 'profesor', populate: {path: 'usuario'}}
        ).populate('calificaciones'
        ).populate('comentarios')
        return res.status(200).json({status: 200, data: Class, message: "Class successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Actualiza una clase existente'
    try {
        /*if (req.user_role == "profesor") {*/
            const identifier= {_id: ObjectId(req.params.id)}
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
        /*} else {
            return res.status(400).json({status: 400, message: "User does not have the required role"})
        }*/
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.hideClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Actualiza una clase existente'
    try {
        /*if (req.user_role == "profesor") {*/
            const identifier= {_id: ObjectId(req.params.id)}
            var oldClass = await Clase.findOne(identifier);
            //Edit the User Object
            oldClass.publicada = !oldClass.publicada
            const updatedClass = await oldClass.save()
            return res.status(200).json({status: 200, data: updatedClass, message: "Class successfully updated"})
        /*} else {
            return res.status(400).json({status: 400, message: "User does not have the required role"})
        }*/
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.removeClass = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Elimina una clase'
    try {
        // if (req.user_role == "profesor") {
            const identifier= {_id: ObjectId(req.params.id)}
            const classToDelete = await Clase.findOne(identifier)

            //Borra la clase del listado de clases del profesor
            const teacher = await Profesor.findOne(classToDelete.profesor)
            const teacher_user = await Usuario.findOne(teacher.usuario)
            const indexToDelete = teacher_user.clases.indexOf(classToDelete.id)
            teacher_user.clases.splice(indexToDelete, 1)
            await teacher_user.save()

            //Borra la clase del listado de clases de cada alumno inscripto
            classToDelete.estudiantes.forEach(element => {
                const student_user = Usuario.findOne(element)
                const indexToDelete = student_user.clases.indexOf(classToDelete._id)
                student_user.clases.splice(indexToDelete, 1)
                student_user.save()
            });

            //Borra el comentario de la coleccion
            classToDelete.comentarios.forEach(element => {
                Comentario.remove(element)
            });

            //Borra la calificacion de la coleccion
            classToDelete.calificaciones.forEach(element => {
                Calificacion.remove(element)
            });

            const classDeleted = await Clase.remove(identifier)
            return res.status(200).json({status: 200, data: classDeleted, message: "Class successfully deleted"})
        // } else {
        //     return res.status(400).json({status: 400, message: "User does not have the required role"})
        // }
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getUserClasses = async function (req, res) {
    // #swagger.tags = ['Clases'];
    // #swagger.description = 'Consulta todas las clases'
    try {
        const identifier= {_id: ObjectId(req.params.id)}
        const User = await Usuario.findOne(identifier)
        let Classes = await Clase.find({
            '_id': {$in: User.clases}
        }
        ).populate({path: 'profesor', populate: {path: 'usuario'}}
        ).populate('calificaciones'
        ).populate('comentarios')
        console.log(Classes)
        
        for (let index = 0; index < Classes.length; index++) {
            let total = 0
            let contador = 0
            if (!Classes[index].calificaciones.length == 0) {
                Classes[index].calificaciones.forEach(element => {
                    total = total + element.valor
                    contador = contador + 1
                });
                promedio = total/contador
                promedio = promedio.toFixed(2)
                Classes[index]._doc = {
                    ...Classes[index]._doc, 
                    calificacionPromedio: {
                        sumCalificaciones : total, 
                        cantCalificaciones: contador,
                        promedioCalculado: promedio
                }};
            } else {
                Classes[index]._doc = {
                    ...Classes[index]._doc, 
                    calificacionPromedio: {
                        sumCalificaciones : 0, 
                        cantCalificaciones: 0,
                        promedioCalculado: 0
                }};
            }
        }     
        return res.status(200).json({status: 200, data: Classes, message: "Classes successfully received"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
