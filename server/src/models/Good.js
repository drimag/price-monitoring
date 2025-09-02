import mongoose from "mongoose";

const GoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  srp: Number, 
});

const Good = mongoose.model("Good", GoodSchema);
export default Good;