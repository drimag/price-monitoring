import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true, 
    },
    region: {
      type: String,
      required: true,
      enum: [
        "North Luzon",
        "South Luzon",
        "Metro Manila",
        "Eastern Visayas",
        "Western Visayas",
        "Northern Mindanao",
        "Southern Mindanao",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
    },
    pointsUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
