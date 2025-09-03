import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import goodsRoutes from "./routes/goods.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/goods", goodsRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
