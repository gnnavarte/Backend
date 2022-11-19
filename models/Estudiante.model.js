const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const estudianteSchema = new Schema({
    usuario:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'
    },
    fechaNacimiento: Date,
    mayorEstudioCursado: String,
    mayorEstudioFinalizado: String,
})

estudianteSchema.plugin(mongoosePaginate);

estudianteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Estudiante = model("Estudiante", estudianteSchema)

module.exports = Estudiante