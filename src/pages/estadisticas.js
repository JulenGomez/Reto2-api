const express = require("express");
const router = express.Router();

const Factura = require("../models/ventas/FacturaMensual");
const Gasto = require("../models/ventas/Gasto");
const Tarifa = require("../models/ventas/Tarifa");

// KPI GENERALES

router.get("/kpis", async (req, res) => {
  try {
    const ingresos = await Factura.aggregate([
      { $group: { _id: null, total: { $sum: "$importeBruto" } } }
    ]);

    const ingresosTotales = ingresos[0]?.total || 0;
    const numFacturas = await Factura.countDocuments();
    const ticketMedio = numFacturas ? Math.round(ingresosTotales / numFacturas) : 0;

    const tarifas = await Tarifa.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          cubatas: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$items.nombre", regex: /copa|gin|vodka|ron/i } },
                1, 0
              ]
            }
          },
          lootboxes: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$items.nombre", regex: /entrada|vip/i } },
                1, 0
              ]
            }
          }
        }
      }
    ]);

    res.json({
      ingresosTotales,
      ticketMedio,
      cubatasSemana: tarifas[0]?.cubatas || 0,
      lootboxesSemana: tarifas[0]?.lootboxes || 0
    });

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});



// INGRESOS MENSUALES

router.get("/ingresos", async (req, res) => {
  try {
    const ingresosMensuales = await Factura.aggregate([
      { $group: { _id: "$mes", total: { $sum: "$importeBruto" } } },
      { $project: { mes: "$_id", total: 1, _id: 0 } },
      { $sort: { mes: 1 } }
    ]);

    res.json(ingresosMensuales);

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});



// GASTOS MENSUALES + CATEGORÍA

router.get("/gastos", async (req, res) => {
  try {
    const gastosMensuales = await Gasto.aggregate([
      { $group: { _id: { $substr: ["$fecha", 0, 7] }, total: { $sum: "$importe" } } },
      { $project: { mes: "$_id", total: 1, _id: 0 } },
      { $sort: { mes: 1 } }
    ]);

    const gastosPorCategoria = await Gasto.aggregate([
      { $group: { _id: "$categoria", total: { $sum: "$importe" } } },
      { $project: { categoria: "$_id", total: 1, _id: 0 } }
    ]);

    res.json({ gastosMensuales, gastosPorCategoria });

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});



// COMPARATIVA

router.get("/comparativa", async (req, res) => {
  try {
    // GASTOS por día de la semana
    const gastos = await Gasto.aggregate([
      { $match: { fecha: { $ne: null } } },
      {
        $group: {
          _id: { $dayOfWeek: "$fecha" },
          total: { $sum: "$importe" }
        }
      }
    ]);

    // INGRESOS por día de la semana
    const ingresos = await Factura.aggregate([
      { $match: { fechaPago: { $ne: null } } },
      {
        $group: {
          _id: { $dayOfWeek: "$fechaPago" },
          total: { $sum: "$importeBruto" }
        }
      }
    ]);

    const dias = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

    const map = {};
    dias.forEach((dia, idx) => {
      map[idx + 1] = { day: dia, gastos: 0, ingresos: 0 };
    });

    gastos.forEach(g => {
      if (map[g._id]) map[g._id].gastos = g.total;
    });

    ingresos.forEach(i => {
      if (map[i._id]) map[i._id].ingresos = i.total;
    });

    res.json(Object.values(map));

  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});


module.exports = router;
