const {Schema, model} = require("mongoose")

const calificacionSchema = new Schema({
    clase:{
        type:Schema.Types.ObjectId,
        ref:'Clase'
    },
    estudiante:{
        type:Schema.Types.ObjectId,
        ref:'Estudiante'
    },
    valor: Number,
})

calificacionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Calificacion = model("Calificacion", calificacionSchema)

module.exports = Calificacion