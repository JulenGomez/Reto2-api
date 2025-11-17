// src/pages/usuarios.js
const express = require('express');
const router = express.Router();

const Usuario = require('../models/usuarios/Usuario');

// =============================
//    OBTENER TODOS LOS USUARIOS
// =============================
router.get('/usuarios', async (req, res) => {
  try {
    const docs = await Usuario.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    CREAR NUEVO USUARIO
// =============================
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    BORRAR UN USUARIO POR ID
// =============================
router.delete('/usuarios/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// =============================
//    ACTUALIZAR USUARIO POR ID
// =============================
router.put('/usuarios/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
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
