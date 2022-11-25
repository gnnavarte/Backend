const {Schema, model} = require("mongoose")

const profesorSchema = new Schema({
    usuario:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'
    },
    contrataciones:[{
      type:Schema.Types.ObjectId,
      ref:'Contratacion'
    }],
    titulo: String,
    experiencia: String,
})

profesorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Profesor = model("Profesor", profesorSchema)

module.exports = Profesor