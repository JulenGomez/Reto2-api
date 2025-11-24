require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ventasRoutes = require('./pages/ventas');
const usuariosRoutes = require('./pages/usuarios');
const planesRoutes = require('./pages/planes');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log("Error Mongo:", err));

app.use('/api', ventasRoutes);
app.use('/api', usuariosRoutes);
app.use('/api/planes', planesRoutes);

app.get('/', (req, res) => {
  res.send('API del ERP funcionando');
});

app.listen(PORT, () =>
  console.log(`Servidor API en http://localhost:${PORT}`)
);

mongoose.connection.once("open", () => {
  console.log("Conectado a la BD:", mongoose.connection.db.databaseName);
});
