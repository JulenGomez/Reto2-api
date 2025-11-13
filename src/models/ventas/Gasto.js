const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
  local_id: String,
  concepto: String,
  importe: Number,
  fecha: String,
}, { collection: 'Gastos' });   // <--- IMPORTANTE

module.exports = mongoose.model('Gasto', GastoSchema);
