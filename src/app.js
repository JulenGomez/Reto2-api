// src/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ventasRoutes = require('./pages/ventas'); // ← cargamos tu módulo de ventas

const app = express();
app.use(express.json());
app.use(cors());

const MONGO = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log("Error Mongo:", err));

// ------- USAR TU ARCHIVO DE VENTAS COMO RUTA -------
app.use('/api', ventasRoutes);
// Esto significa:
// GET /api/discotecas
// GET /api/facturasMensuales
// GET /api/tarifas
// GET /api/gastos

app.get('/', (req, res) => {
  res.send('API del ERP funcionando');
});

app.listen(PORT, () => console.log(`Servidor API en http://localhost:${PORT}`));

app.get('/api/debug', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();
    const names = collections.map(c => c.name);
    const counts = {};
    for (const n of names) {
      counts[n] = await db.collection(n).countDocuments();
    }
    res.json({ dbName, collections: names, counts });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

