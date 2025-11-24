require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas
const ventasRoutes = require('./pages/ventas');
const usuariosRoutes = require('./pages/usuarios');
const planesRoutes = require('./pages/planes');
const estadisticasRoutes = require('./pages/estadisticas');  // 🔥 ESTA ES LA QUE FALTABA

const app = express();
app.use(express.json());
app.use(cors());

// ==== CONEXIÓN A MONGO ====
const MONGO = process.env.MONGO_URI || 
  "mongodb+srv://Cortesitos:CortesHDP@cortes-y-los-cortesitos.uomis1z.mongodb.net/BaseDatos?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log("🔥 MongoDB conectado"))
  .catch(err => console.error("❌ Error Mongo:", err));

// ==== RUTAS ====
app.use('/api', ventasRoutes);
app.use('/api', usuariosRoutes);
app.use('/api/planes', planesRoutes);
app.use('/api/estadisticas', estadisticasRoutes); // 🔥 AHORA SÍ EXISTE

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API del ERP funcionando');
});

// ==== ESCUCHAR SERVIDOR ====
app.listen(PORT, () =>
  console.log(`🚀 Servidor API en http://localhost:${PORT}`)
);

// Verificación de conexión
mongoose.connection.once("open", () => {
  console.log("📦 Conectado a la BD:", mongoose.connection.db.databaseName);
});
