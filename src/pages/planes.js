const express = require("express");
const router = express.Router();
const Plan = require("../models/planes/Plan");

// GET /api/planes
router.get("/", async (req, res) => {
  try {
    const planes = await Plan.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo planes" });
  }
});

// GET /api/planes/:id
router.get("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan no encontrado" });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: "Error obteniendo plan" });
  }
});

// POST /api/planes
router.post("/", async (req, res) => {
  try {
    const plan = new Plan(req.body);
    const saved = await plan.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creando plan" });
  }
});

// PUT /api/planes/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Plan no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error actualizando plan" });
  }
});

// DELETE /api/planes/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Plan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Plan no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error eliminando plan" });
  }
});

module.exports = router;
