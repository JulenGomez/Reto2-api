// src/models/usuarios/Usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  DNI: String,
  foto: String
}, { collection: 'Usuarios' });  // <-- Notar la U mayúscula

module.exports = mongoose.model('Usuario', UsuarioSchema);
