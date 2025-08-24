import mongoose from "mongoose";

const GoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  region: String,
  channel: String,
  srp: Number,
  actual: Number,
  diff: Number,
  pct: Number,
});

const Good = mongoose.model("Good", GoodSchema);

export default Good;
