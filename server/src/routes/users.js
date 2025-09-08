import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Dummy/default user for now
let defaultUser = {
  _id: "default-id",
  name: "Juan Dela Cruz",
  mobile: "0917-123-4567",
  region: "Metro Manila",
  role: "user",
  points: 100,
  pointsUsed: 0,
};

// GET current user
router.get("/me", async (req, res) => {
  try {
    res.json(defaultUser);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// POST redeem points
router.post("/redeem", async (req, res) => {
  try {
    const { cost } = req.body;

    if (!cost || cost <= 0) {
      return res.status(400).json({ error: "Invalid redemption cost" });
    }

    let points = defaultUser.points;
    let pointsUsed = defaultUser.pointsUsed;

    if ((points - pointsUsed) < cost) {
      return res.status(400).json({ error: "Not enough points" });
    }

    defaultUser.pointsUsed += cost;

    res.json({
      message: `Redeemed ${cost} points successfully`,
      user: defaultUser,
    });
  } catch (err) {
    console.error("Error redeeming points:", err);
    res.status(500).json({ error: "Failed to redeem points" });
  }
});

export default router;
