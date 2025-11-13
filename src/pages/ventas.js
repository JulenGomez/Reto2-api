// src/pages/ventas.js
const express = require('express');
const router = express.Router();

const Discoteca = require('../models/ventas/Discoteca');
const FacturaMensual = require('../models/ventas/FacturaMensual');
const Tarifa = require('../models/ventas/Tarifa');
const Gasto = require('../models/ventas/Gasto');

// =============================
//    DISCOTECAS
// =============================
router.get('/discotecas', async (req, res) => {
  try {
    const docs = await Discoteca.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    FACTURAS MENSUALES
// =============================
router.get('/facturasMensuales', async (req, res) => {
  try {
    const docs = await FacturaMensual.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    TARIFAS
// =============================
router.get('/tarifas', async (req, res) => {
  try {
    const docs = await Tarifa.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    GASTOS
// =============================
router.get('/gastos', async (req, res) => {
  try {
    const docs = await Gasto.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
