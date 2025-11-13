const { Schema, model } = require('mongoose');

const DiscotecaSchema = new Schema({
  cif: String,
  nombre: String,
  nombreCorto: String,
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String,
    pais: String
  },
  telefono: String,
  email: String,
  encargado: String,
  notas: String,
  creadoEn: { type: Date, default: Date.now },
  metadatos: Schema.Types.Mixed
});

module.exports = model('Discoteca', DiscotecaSchema);
