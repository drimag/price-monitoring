import mongoose from "mongoose";
import Good from "./models/Good.js"

const MONGO_URI = "mongodb://127.0.0.1:27017/price_monitor";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    await Good.deleteMany({});
    console.log("Cleared existing goods");

    await Good.insertMany([
      {
        name: "Rice",
        category: "Grains",
        region: "Metro Manila",
        channel: "Supermarket",
        srp: 40,
        actual: 45,
        diff: 5,
        pct: 12.5,
      },
      {
        name: "Sugar",
        category: "Sweeteners",
        region: "South Luzon",
        channel: "Wet Market",
        srp: 50,
        actual: 55,
        diff: 5,
        pct: 10,
      },
      {
        name: "Sardines",
        category: "Canned Goods",
        region: "Metro Manila",
        channel: "Convenience Store",
        srp: 20,
        actual: 18,
        diff: -2,
        pct: -10,
      },
    ]);

    console.log("Seed data inserted ✅");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.disconnect();
  }
}

seed();