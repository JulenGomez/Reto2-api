// src/pages/discotecas.js
const express = require('express');
const router = express.Router();

const Discoteca = require('../models/clientes/Clientes');

// =============================
//     OBTENER TODAS LAS DISCOTECAS
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
//       CREAR NUEVA DISCOTECA
// =============================
router.post('/discotecas', async (req, res) => {
  try {
    const nuevaDiscoteca = new Discoteca(req.body);
    await nuevaDiscoteca.save();
    res.json(nuevaDiscoteca);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//     BORRAR UNA DISCOTECA POR ID
// =============================
router.delete('/discotecas/:id', async (req, res) => {
  try {
    await Discoteca.findByIdAndDelete(req.params.id);
    res.json({ message: "Discoteca eliminada" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//     ACTUALIZAR DISCOTECA POR ID
// =============================
router.put('/discotecas/:id', async (req, res) => {
  try {
    const actualizado = await Discoteca.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
