import express from "express";

const summaryData = [
  {
    good: "Rice",
    category: "Grains",
    region: "North Luzon",
    channel: "Supermarket",
    srp: 40,
    actual: 45,
    diff: 5,
    pct: 12.5,
  },
  {
    good: "Sugar",
    category: "Sweeteners",
    region: "South Luzon",
    channel: "Supermarket",
    srp: 50,
    actual: 55,
    diff: 5,
    pct: 10,
  },
  {
    good: "Sardines",
    category: "Canned Goods",
    region: "Northern Mindanao",
    channel: "Supermarket",
    srp: 20,
    actual: 18,
    diff: -2,
    pct: -10,
  },
];

const router = express.Router();

router.get("/", (req, res) => {
  let results = [...summaryData];
  const { search, regions, channels } = req.query;

  if (search) {
    const term = search.toLowerCase();
    results = results.filter((item) => item.good.toLowerCase().includes(term));
  }

  const regionList = Array.isArray(regions) ? regions : [regions];
  results = results.filter((item) => regionList.includes(item.region));

  const channelList = Array.isArray(channels) ? channels : [channels];
  results = results.filter((item) => channelList.includes(item.channel));

  res.json(results);
});

router.get("/kpi", (req, res) => {
  const totalGoods = summaryData.length;

  const avgPct =
    totalGoods > 0
      ? summaryData.reduce((sum, item) => sum + item.pct, 0) / totalGoods
      : 0;

  const atOrBelowSRP = summaryData.filter((item) => item.pct <= 0).length;

  const aboveSRP = summaryData.filter((item) => item.pct > 0).length;

  res.json({
    totalGoods,
    avgPct,
    atOrBelowSRP,
    aboveSRP,
  });
});

router.get("/top-alerts", (req, res) => {
  let results = [...summaryData];
  const { search, regions, channels } = req.query;

  // --- Apply filters ---
  if (search) {
    const term = search.toLowerCase();
    results = results.filter((item) =>
      item.good.toLowerCase().includes(term)
    );
  }
  if (regions) {
    const regionList = Array.isArray(regions) ? regions : [regions];
    if (regionList.length > 0) {
      results = results.filter((item) => regionList.includes(item.region));
    }
  }
  if (channels) {
    const channelList = Array.isArray(channels) ? channels : [channels];
    if (channelList.length > 0) {
      results = results.filter((item) => channelList.includes(item.channel));
    }
  }

  // --- Top Alerts Logic ---
  let aboveSRP = results.filter((item) => item.pct > 0);

  aboveSRP.sort((a, b) => b.pct - a.pct);

  let topAlerts = aboveSRP.slice(0, 5).map((item, idx) => ({
    rank: idx + 1,
    ...item,
  }));

  res.json({
    totalAbove: aboveSRP.length,
    topAlerts
  });
});

export default router;
