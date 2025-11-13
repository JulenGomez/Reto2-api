const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  codigo: String,
  nombre: String,
  precio: Number,
  oferta: { type: Number, default: 0 } // porcentaje
}, { _id: false });

const TarifaSchema = new Schema({
  local_id: { type: Schema.Types.ObjectId, ref: 'Discoteca' },
  version: String,
  vigenteDesde: Date,
  activo: { type: Boolean, default: true },
  moneda: String,
  items: [ItemSchema],
  notas: String,
  creadoEn: { type: Date, default: Date.now }
});

module.exports = model('Tarifa', TarifaSchema);
