import express from "express";
import Good from "../models/Good.js";
import PriceEntry from "../models/PriceEntry.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
        const { search, regions, channels } = req.query;
    const query = {};

    if (regions) {
      const regionList = Array.isArray(regions) ? regions : [regions];
      query.region = { $in: regionList };
    }
    if (channels) {
      const channelList = Array.isArray(channels) ? channels : [channels];
      query.channel = { $in: channelList };
    }

    let entries = await PriceEntry.find(query).populate("good");

    if (search) {
      const term = search.toLowerCase();
      entries = entries.filter(e =>
        e.good.name.toLowerCase().includes(term)
      );
    }

    const result = entries.map(e => ({
      id: e._id,
      name: e.good.name,
      category: e.good.category,
      region: e.region,
      channel: e.channel,
      srp: e.good.srp,
      actual: e.actual,
      diff: e.actual - e.good.srp,
      pct: ((e.actual - e.good.srp) / e.good.srp) * 100,
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching goods:", err);
    res.status(500).json({ error: "Failed to fetch goods" });
  }
});

router.get("/kpi", async (req, res) => {
  try {
    const entries = await PriceEntry.find().populate("good");
    const totalGoods = entries.length;

    const pcts = entries.map(e => ((e.actual - e.good.srp) / e.good.srp) * 100);

    const avgPct = totalGoods > 0
      ? pcts.reduce((sum, val) => sum + val, 0) / totalGoods
      : 0;

    const atOrBelowSRP = pcts.filter(p => p <= 0).length;
    const aboveSRP = pcts.filter(p => p > 0).length;

    res.json({
      totalGoods,
      avgPct,
      atOrBelowSRP,
      aboveSRP,
    });
  } catch (err) {
    console.error("Error in /kpi:", err);
    res.status(500).json({ error: "Failed to fetch KPI data" });
  }
});

router.get("/top-alerts", async (req, res) => {
  try {
    const { search, regions, channels } = req.query;
    const query = {};

    if (regions) {
      const regionList = Array.isArray(regions) ? regions : [regions];
      query.region = { $in: regionList };
    }
    if (channels) {
      const channelList = Array.isArray(channels) ? channels : [channels];
      query.channel = { $in: channelList };
    }

    let entries = await PriceEntry.find(query).populate("good");

    // --- Apply search filter ---
    if (search) {
      const term = search.toLowerCase();
      entries = entries.filter(e =>
        e.good.name.toLowerCase().includes(term)
      );
    }

    // --- Compute pct and filter ---
    const aboveSRP = entries
      .map(e => ({
        ...e.toObject(),
        pct: ((e.actual - e.good.srp) / e.good.srp) * 100,
        diff: e.actual - e.good.srp,
      }))
      .filter(e => e.pct > 0);

    // Sort and take top 5
    aboveSRP.sort((a, b) => b.pct - a.pct);
    const topAlerts = aboveSRP.slice(0, 5).map((item, idx) => ({
      rank: idx + 1,
      ...item,
    }));

    res.json({
      totalAbove: aboveSRP.length,
      topAlerts,
    });
  } catch (err) {
    console.error("Error fetching top alerts:", err);
    res.status(500).json({ error: "Failed to fetch top alerts" });
  }
});


export default router;
