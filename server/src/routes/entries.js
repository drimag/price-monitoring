import express from "express";
import Good from "../models/Good.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { barcode, region, channel, actual } = req.body;

    if (!barcode || !region || !channel || !actual) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let good = await Good.findOne({ barcode });
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

export default router;
