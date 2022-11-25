const {Schema, model} = require("mongoose")

const comentarioSchema = new Schema({
    clase:{
        type:Schema.Types.ObjectId,
        ref:'Clase'
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    descripcion: String,
    bloqueado: String,
})

comentarioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Comentario = model("Comentario", comentarioSchema)

module.exports = Comentario