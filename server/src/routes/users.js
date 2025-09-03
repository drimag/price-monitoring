import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    // dummy/default user
    const defaultUser = {
      _id: "default-id",
      name: "Juan Dela Cruz",
      mobile: "0917-123-4567",
      region: "Metro Manila",
      role: "user",
      points: 100,
      pointsUsed: 20,
    };

    // implement taking from db when registering is implemented
    // const user = await User.findOne() || defaultUser;

    res.json(defaultUser);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
export default router;
