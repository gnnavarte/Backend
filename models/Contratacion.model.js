const {Schema, model} = require("mongoose")

const contratacionSchema = new Schema({
    clase:{
      type:Schema.Types.ObjectId,
      ref:'Clase'
    },
    usuario:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'
    },
    profesor:{
      type:Schema.Types.ObjectId,
      ref:'Profesor'
    },
    motivo: String,
    estado: String,
    horarioReferencia: String
})

contratacionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Contratacion = model("Contratacion", contratacionSchema)

module.exports = Contratacion