const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    avatar: String,
    telofono: String,
    email: String,
    password: String,
    preguntaVerificacion: String,
    respuestaVerificacion: String,
    rol: String,
    clases:{
      type: [Schema.Types.ObjectId],
      ref:'Clase',
      default: void 0
    },
})

usuarioSchema.plugin(mongoosePaginate);

usuarioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.password
      delete returnedObject.preguntaVerificacion
      delete returnedObject.respuestaVerificacion
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Usuario = model("Usuario", usuarioSchema)

module.exports = Usuario