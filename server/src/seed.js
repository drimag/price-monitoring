import mongoose from "mongoose";
import Good from "./models/Good.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/price_monitor"; // adjust if needed

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear existing Goods
    await Good.deleteMany({});
    console.log("Cleared existing data ✅");

    // Insert Goods with embedded Price Entries
    const goods = await Good.insertMany([
      {
        name: "Rice",
        category: "Grains",
        srp: 40,
        barcode: "100001",
        priceEntries: [
          { region: "Metro Manila", channel: "Supermarket", actual: 45 },
          { region: "South Luzon", channel: "Wet Market", actual: 42 },
        ],
      },
      {
        name: "Sugar",
        category: "Sweeteners",
        srp: 50,
        barcode: "100002",
        priceEntries: [
          { region: "South Luzon", channel: "Wet Market", actual: 55 },
        ],
      },
      {
        name: "Sardines",
        category: "Canned Goods",
        srp: 20,
        barcode: "100003",
        priceEntries: [
          { region: "Metro Manila", channel: "Convenience Store", actual: 18 },
        ],
      },
      {
        name: "Soy Sauce",
        category: "Sauce",
        srp: 20,
        barcode: "49240290",
        priceEntries: [
        ],
      },
    ]);

    console.log("Inserted Goods with PriceEntries ✅");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
