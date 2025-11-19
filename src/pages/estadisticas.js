// src/pages/estadisticas.js
const express = require("express");
const router = express.Router();

const Factura = require("../models/ventas/FacturaMensual");
const Gasto = require("../models/ventas/Gasto");

/* ============================
      KPIS GENERALES
   ============================ */
router.get("/estadisticas/kpis", async (req, res) => {
  try {
    // Ingresos totales
    const ingresos = await Factura.aggregate([
      { $group: { _id: null, total: { $sum: "$importeBruto" } } }
    ]);

    const ingresosTotales = ingresos[0]?.total || 0;

    const numFacturas = await Factura.countDocuments();
    const ticketMedio = numFacturas > 0 
      ? Math.round(ingresosTotales / numFacturas)
      : 0;

    // De momento mock
    const cubatasSemana = 1098;
    const lootboxesSemana = 150;

    res.json({
      ingresosTotales,
      ticketMedio,
      cubatasSemana,
      lootboxesSemana,
    });

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});


/* ============================
      INGRESOS MENSUALES
   ============================ */
router.get("/estadisticas/ingresos", async (req, res) => {
  try {
    const ingresosMensuales = await Factura.aggregate([
      {
        $group: {
          _id: "$mes",
          total: { $sum: "$importeBruto" }
        }
      },
      {
        $project: {
          mes: "$_id",
          total: 1,
          _id: 0
        }
      },
      { $sort: { mes: 1 } }
    ]);

    res.json(ingresosMensuales);

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});


/* ============================
      GASTOS MENSAULES + CATEGORIAS
   ============================ */
router.get("/estadisticas/gastos", async (req, res) => {
  try {
    const gastosMensuales = await Gasto.aggregate([
      {
        $group: {
          _id: { $substr: ["$fecha", 0, 7] }, // "2025-10"
          total: { $sum: "$importe" }
        }
      },
      {
        $project: {
          mes: "$_id",
          total: 1,
          _id: 0
        }
      },
      { $sort: { mes: 1 } }
    ]);

    const gastosPorCategoria = await Gasto.aggregate([
      {
        $group: {
          _id: "$categoria",
          total: { $sum: "$importe" }
        }
      },
      {
        $project: {
          categoria: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      gastosMensuales,
      gastosPorCategoria
    });

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});


/* ============================
      COMPARATIVA (MOCK)
   ============================ */
router.get("/estadisticas/comparativa", (req, res) => {
  const comparativa = [
    { day: "Lun", cubatas: 120, lootboxes: 18 },
    { day: "Mar", cubatas: 98, lootboxes: 22 },
    { day: "Mié", cubatas: 140, lootboxes: 9 },
    { day: "Jue", cubatas: 160, lootboxes: 12 },
    { day: "Vie", cubatas: 210, lootboxes: 31 },
    { day: "Sáb", cubatas: 280, lootboxes: 44 },
    { day: "Dom", cubatas: 95, lootboxes: 8 }
  ];

  res.json(comparativa);
});

module.exports = router;
