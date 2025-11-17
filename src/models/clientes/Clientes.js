// src/models/discotecas/Discoteca.js
const mongoose = require('mongoose');

const DiscotecaSchema = new mongoose.Schema(
  {
    cif: { type: String, required: true },
    nombre: { type: String, required: true },
    nombreCorto: { type: String },

    direccion: {
      calle: String,
      ciudad: String,
      provincia: String,
      codigoPostal: String,
      pais: String
    },

    telefono: String,
    email: String,
    web: String,
    imagen: String,

    encargado: String,
    notas: String,

    creadoEn: { type: Date, default: Date.now },

    metadatos: {
      horarioApertura: String,
      capacidad: Number,
      tags: [String]
    }
  },
  { collection: 'Discotecas' }
);

module.exports = mongoose.models.Discoteca || mongoose.model('Discoteca', DiscotecaSchema);

