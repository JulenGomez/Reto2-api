const { Schema, model } = require('mongoose');

const GastoSchema = new Schema({
  ambito: { type: String, enum: ['empresa','local'], default: 'local' },
  local_id: { type: Schema.Types.ObjectId, ref: 'Discoteca' },
  titulo: String,
  proveedor: String,
  importe: Number,
  moneda: { type: String, default: 'EUR' },
  fecha: Date,
  categoria: String,
  pagado: { type: Boolean, default: false },
  metodoPago: String,
  notas: String,
  creadoEn: { type: Date, default: Date.now }
});

module.exports = model('Gasto', GastoSchema);
