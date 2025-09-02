import mongoose from "mongoose";

const PriceEntrySchema = new mongoose.Schema({
  good: { type: mongoose.Schema.Types.ObjectId, ref: "Good", required: true },
  region: { type: String, required: true },
  channel: { type: String, required: true },
  actual: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PriceEntry = mongoose.model("PriceEntry", PriceEntrySchema);

export default PriceEntry;