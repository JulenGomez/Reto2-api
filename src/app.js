require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Discoteca = require('./models/Discoteca');
const FacturaMensual = require('./models/FacturaMensual');
const Tarifa = require('./models/Tarifa');
const Gasto = require('./models/Gasto');

const app = express();
app.use(express.json());
app.use(cors()); // si necesitas limitar orígenes, cámbialo aquí

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/erp_demo';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo conectado'))
  .catch(err => { console.error('Error Mongo:', err); process.exit(1); });

// RUTAS GET públicas básicas
app.get('/api/discotecas', async (req, res) => {
  const docs = await Discoteca.find().lean();
  res.json(docs);
});

app.get('/api/facturasMensuales', async (req, res) => {
  const docs = await FacturaMensual.find().lean();
  res.json(docs);
});

app.get('/api/tarifas', async (req, res) => {
  const docs = await Tarifa.find().lean();
  res.json(docs);
});

app.get('/api/gastos', async (req, res) => {
  const docs = await Gasto.find().lean();
  res.json(docs);
});

// Endpoint detalle discoteca con relaciones
app.get('/api/discotecas/:id', async (req, res) => {
  try {
    const disc = await Discoteca.findById(req.params.id).lean();
    if (!disc) return res.status(404).json({ error: 'No encontrado' });
    const tarifas = await Tarifa.find({ local_id: disc._id }).lean();
    const gastos = await Gasto.find({ local_id: disc._id }).lean();
    const facturas = await FacturaMensual.find({ local_id: disc._id }).lean();
    res.json({ ...disc, tarifas, gastos, facturas });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
