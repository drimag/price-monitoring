import express from "express";
import Good from "../models/Good.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { barcode, name, region, channel, actual } = req.body;

    if ((!barcode && !name) || !region || !channel || !actual) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let good = await Good.findOne(barcode ? { barcode } : { name });

    if (!good) {
      return res.status(404).json({ error: "Good not found." });
    }

    good.priceEntries.push({
      region,
      channel,
      actual,
      date: new Date(),
    });

    await good.save();

    res.status(201).json({ message: "Price entry added", good });
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(500).json({ error: "Failed to save entry" });
  }
});

router.get("/goods", async (req, res) => {
  try {
    const goods = await Good.find();
    console.log ("goods found: " + goods);
    res.json(goods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goods" });
  }
});

export default router;
