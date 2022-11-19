const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const claseSchema = new Schema({
    nombre: String,
    descripcion: String,
    tipo: String,
    categoria: String,
    frecuencia: String,
    duracion: String,
    costo: String,
    imagen: String,
    calificaciones:[{
      type:Schema.Types.ObjectId,
      ref:'Calificacion'
    }],
    comentarios:[{
      type:Schema.Types.ObjectId,
      ref:'Comentario'
    }],
    profesor:{
      type:Schema.Types.ObjectId,
      ref:'Profesor'
    },
})

claseSchema.plugin(mongoosePaginate);

claseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Clase = model("Clase", claseSchema)

module.exports = Clase