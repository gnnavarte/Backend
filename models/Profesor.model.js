const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const profesorSchema = new Schema({
    usuario:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'
    },
    titulo: String,
    experiencia: String,
})

profesorSchema.plugin(mongoosePaginate);

profesorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Profesor = model("Profesor", profesorSchema)

module.exports = Profesor