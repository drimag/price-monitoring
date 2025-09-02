import mongoose from "mongoose";
import Good from "./models/Good.js";
import PriceEntry from "./models/PriceEntry.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/price_monitor"; // adjust if needed

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear existing collections
    await Good.deleteMany({});
    await PriceEntry.deleteMany({});

    console.log("Cleared existing data ✅");

    // Insert Goods (catalog with SRP)
    const goods = await Good.insertMany([
      { name: "Rice", category: "Grains", srp: 40 },
      { name: "Sugar", category: "Sweeteners", srp: 50 },
      { name: "Sardines", category: "Canned Goods", srp: 20 },
    ]);

    console.log("Inserted Goods ✅");

    // Insert Price Entries (actual market data)
    await PriceEntry.insertMany([
      {
        good: goods[0]._id, // Rice
        region: "Metro Manila",
        channel: "Supermarket",
        actual: 45,
      },
      {
        good: goods[1]._id, // Sugar
        region: "South Luzon",
        channel: "Wet Market",
        actual: 55,
      },
      {
        good: goods[2]._id, // Sardines
        region: "Metro Manila",
        channel: "Convenience Store",
        actual: 18,
      },
    ]);

    console.log("Inserted PriceEntries ✅");

    process.exit(0);
  } catch (err) {
    console.error("Seed error ❌:", err);
    process.exit(1);
  }
}

seed();
