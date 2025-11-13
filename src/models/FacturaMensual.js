const { Schema, model } = require('mongoose');

const FacturaSchema = new Schema({
  local_id: { type: Schema.Types.ObjectId, ref: 'Discoteca' },
  numeroFactura: String,
  mes: String,
  fechaVencimiento: Date,
  importeNeto: Number,
  impuestoPercent: Number,
  importeImpuesto: Number,
  importeBruto: Number,
  estado: { type: String, enum: ['pagada','pendiente','vencida'], default: 'pendiente' },
  metodoPago: String,
  fechaPago: Date,
  notas: String,
  adjuntos: [String],
  creadoEn: { type: Date, default: Date.now }
});

module.exports = model('FacturaMensual', FacturaSchema);
