import express from "express";
import Good from "../models/Good.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, regions, channels } = req.query;
    let query = {};

    if (search) {
      query.good = { $regex: search, $options: "i" };
    }
    if (regions) {
      query.region = { $in: Array.isArray(regions) ? regions : [regions] };
    }
    if (channels) {
      query.channel = { $in: Array.isArray(channels) ? channels : [channels] };
    }

    console.log("Mongo query:", query);


    const results = await Good.find(query).lean();
    res.json(results);
  } catch (err) {
    console.error("Error fetching goods:", err);
    res.status(500).json({ error: "Failed to fetch goods" });
  }
});

router.get("/kpi", async (req, res) => {
  try {
    const goods = await Good.find();
    const totalGoods = goods.length;

    const avgPct =
      totalGoods > 0
        ? goods.reduce((sum, item) => sum + item.pct, 0) / totalGoods
        : 0;

    const atOrBelowSRP = goods.filter((item) => item.pct <= 0).length;
    const aboveSRP = goods.filter((item) => item.pct > 0).length;

    res.json({
      totalGoods,
      avgPct,
      atOrBelowSRP,
      aboveSRP,
    });
  } catch (err) {
    console.error("Error fetching KPI:", err);
    res.status(500).json({ error: "Failed to fetch KPI" });
  }
});

router.get("/top-alerts", async (req, res) => {
  try {
    const { search, regions, channels } = req.query;
    const query = {};

    // filters
    if (search && search.trim() !== "") {
      query.name = { $regex: search, $options: "i" }; 
    }
    if (regions) {
      const regionList = Array.isArray(regions) ? regions : [regions];
      query.region = { $in: regionList.filter(Boolean) }; // remove undefined
    }
    if (channels) {
      const channelList = Array.isArray(channels) ? channels : [channels];
      query.channel = { $in: channelList.filter(Boolean) };
    }

    // find top 5 above srp
    let aboveSRP = await Good.find({ ...query, pct: { $gt: 0 } })
      .sort({ pct: -1 })
      .limit(5);

    // rank number
    const topAlerts = aboveSRP.map((item, idx) => ({
      rank: idx + 1,
      ...item.toObject(),
    }));

    res.json({
      totalAbove: await Good.countDocuments({ ...query, pct: { $gt: 0 } }),
      topAlerts,
    });
  } catch (err) {
    console.error("Error fetching top alerts:", err);
    res.status(500).json({ error: "Failed to fetch top alerts" });
  }
});


export default router;
