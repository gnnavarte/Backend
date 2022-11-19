const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const contratacionSchema = new Schema({
    clase:{
      type:Schema.Types.ObjectId,
      ref:'Clase'
    },
    usuario:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'
    },
    motivo: String,
    estado: String,
    horarioReferencia: String,
})

contratacionSchema.plugin(mongoosePaginate);

contratacionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Contratacion = model("Contratacion", contratacionSchema)

module.exports = Contratacion