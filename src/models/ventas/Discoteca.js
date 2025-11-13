const mongoose = require('mongoose');

const DiscotecaSchema = new mongoose.Schema({
  nombre: String,
  cif: String,
  direccion: String,
  notas: String
}, { collection: 'Discotecas' });   // <-- EXACTO

module.exports = mongoose.model('Discoteca', DiscotecaSchema);
