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

  if (regions) {
    const regionList = Array.isArray(regions) ? regions : [regions];
    results = results.filter((item) => regionList.includes(item.region));
  }

  if (channels) {
    const channelList = Array.isArray(channels) ? channels : [channels];
    results = results.filter((item) => channelList.includes(item.channel));
  }

  res.json(results);
});

export default router;
