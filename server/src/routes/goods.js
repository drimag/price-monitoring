import express from "express";
import Good from "../models/Good.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, regions, channels } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const goods = await Good.find(query);
    let results = aggregateEntries(goods);

    if (regions) {
      const regionList = Array.isArray(regions) ? regions : [regions];
      results = results.filter((item) => regionList.includes(item.region));
    }
    if (channels) {
      const channelList = Array.isArray(channels) ? channels : [channels];
      results = results.filter((item) => channelList.includes(item.channel));
    }

    res.json(results);
  } catch (err) {
    console.error("Error fetching goods:", err);
    res.status(500).json({ error: "Failed to fetch goods" });
  }
});


router.get("/kpi", async (req, res) => {
  try {
    const goods = await Good.find();
    const aggregated = aggregateEntries(goods);

    const totalGoods = aggregated.length;
    const avgPct = totalGoods > 0 ? aggregated.reduce((sum, i) => sum + i.pct, 0) / totalGoods : 0;
    const atOrBelowSRP = aggregated.filter((i) => i.pct <= 0).length;
    const aboveSRP = aggregated.filter((i) => i.pct > 0).length;

    res.json({ totalGoods, avgPct, atOrBelowSRP, aboveSRP });
  } catch (err) {
    console.error("Error computing KPI:", err);
    res.status(500).json({ error: "Failed to compute KPI" });
  }
});


router.get("/top-alerts", async (req, res) => {
  try {
    const { search, regions, channels } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const goods = await Good.find(query);
    let results = aggregateEntries(goods);

    if (regions) {
      const regionList = Array.isArray(regions) ? regions : [regions];
      results = results.filter((item) => regionList.includes(item.region));
    }
    if (channels) {
      const channelList = Array.isArray(channels) ? channels : [channels];
      results = results.filter((item) => channelList.includes(item.channel));
    }

    const aboveSRP = results.filter((i) => i.pct > 0).sort((a, b) => b.pct - a.pct);
    const topAlerts = aboveSRP.slice(0, 5).map((item, idx) => ({ rank: idx + 1, ...item }));

    res.json({ totalAbove: aboveSRP.length, topAlerts });
  } catch (err) {
    console.error("Error fetching top alerts:", err);
    res.status(500).json({ error: "Failed to fetch top alerts" });
  }
});


function aggregateEntries(goods) {
  const results = [];

  goods.forEach((good) => {
    const groups = new Map();

    good.priceEntries.forEach((entry) => {
      const key = `${entry.region}-${entry.channel}`;
      if (!groups.has(key)) {
        groups.set(key, {
          sum: 0,
          count: 0,
          region: entry.region,
          channel: entry.channel,
          prices: [],
        });
      }
      const g = groups.get(key);
      g.sum += entry.actual;
      g.count += 1;
      g.prices.push(entry.actual);
    });

    // Compute averages for each (region, channel)
    groups.forEach((g) => {
      if (g.count > 0) {
        const avgActual = g.sum / g.count;
        const diff = avgActual - good.srp;
        const pct = (diff / good.srp) * 100;

        const minPrice = Math.min(...g.prices);
        const maxPrice = Math.max(...g.prices);

        const minDiffPCT = ((minPrice - avgActual) / avgActual) * 100;
        const maxDiffPCT = ((maxPrice - avgActual) / avgActual) * 100;

        results.push({
          name: good.name,
          category: good.category,
          region: g.region,
          channel: g.channel,
          srp: good.srp,
          actual: avgActual,
          diff,
          pct,
          minPrice,
          minDiffPCT,
          maxPrice,
          maxDiffPCT,
        });
      }
    });
  });
  return results;
}

export default router;
