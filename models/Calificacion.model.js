const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

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

calificacionSchema.plugin(mongoosePaginate);

calificacionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Calificacion = model("Calificacion", calificacionSchema)

module.exports = Calificacion