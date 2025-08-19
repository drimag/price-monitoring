import express from "express";

const summaryData = [
  {
    good: "Rice",
    category: "Grains",
    region: "NCR",
    channel: "Retail",
    srp: 40,
    actual: 45,
    diff: 5,
    pct: 12.5,
  },
  {
    good: "Sugar",
    category: "Sweeteners",
    region: "Region IV-A",
    channel: "Wholesale",
    srp: 50,
    actual: 55,
    diff: 5,
    pct: 10,
  },
  {
    good: "Sardines",
    category: "Canned Goods",
    region: "NCR",
    channel: "Retail",
    srp: 20,
    actual: 18,
    diff: -2,
    pct: -10,
  },
];

const router = express.Router();

router.get("/", (req, res) => {
  res.json(summaryData);
});

export default router;
