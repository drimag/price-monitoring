import mongoose from "mongoose";

const PriceEntrySchema = new mongoose.Schema({
  region: String,
  channel: String,
  actual: Number,
  date: { type: Date, default: Date.now },
});

const GoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  barcode: { type: String, unique: true },
  srp: { type: Number, required: true }, // keep SRP at the Good level
  priceEntries: [PriceEntrySchema],
});

const Good = mongoose.model("Good", GoodSchema);
export default Good;
