const mongoose = require("mongoose");

const DiscotecaSchema = new mongoose.Schema(
  {
    cif: { type: String, required: true },
    nombre: { type: String, required: true },
    nombreCorto: { type: String, default: "" },

    // OBJETO DIRECCIÓN
    direccion: {
      calle: { type: String, default: "" },
      ciudad: { type: String, default: "" },
      provincia: { type: String, default: "" },
      codigoPostal: { type: String, default: "" },
      pais: { type: String, default: "" },
    },

    telefono: { type: String, default: "" },
    email: { type: String, default: "" },
    web: { type: String, default: "" },
    imagen: { type: String, default: "" },

    encargado: { type: String, default: "" },
    notas: { type: String, default: "" },

    creadoEn: { type: Date, default: Date.now },

    // OBJETO METADATOS
    metadatos: {
      horarioApertura: { type: String, default: "" },
      capacidad: { type: Number, default: 0 },
      tags: { type: [String], default: [] },
    },
  },
  { collection: "Discotecas" }
);

module.exports =
  mongoose.models.Discoteca || mongoose.model("Discoteca", DiscotecaSchema);
