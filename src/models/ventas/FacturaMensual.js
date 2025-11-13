const mongoose = require('mongoose');

const FacturaMensualSchema = new mongoose.Schema({
  local_id: String,
  mes: String,
  importe: Number,
  pagada: Boolean
}, { collection: 'FacturasMensuales' });  // <-- EXACTO

module.exports = mongoose.model('FacturaMensual', FacturaMensualSchema);
