const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

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

comentarioSchema.plugin(mongoosePaginate);

comentarioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Comentario = model("Comentario", comentarioSchema)

module.exports = Comentario