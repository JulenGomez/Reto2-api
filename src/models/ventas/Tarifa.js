const mongoose = require('mongoose');

const TarifaSchema = new mongoose.Schema({
  local_id: String,
  nombre: String,
  precio: Number,
  oferta: Number
}, { collection: 'Tarifas' });   // <-- EXACTO

module.exports = mongoose.model('Tarifa', TarifaSchema);
