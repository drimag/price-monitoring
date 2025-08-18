// server/src/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend 👋" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.get("/api/prices", (req, res) => {
  const sampleData = [
    { name: "Product A", price: "$20", updatedAt: "2025-08-19" },
    { name: "Product B", price: "$35", updatedAt: "2025-08-18" },
    { name: "Product C", price: "$15", updatedAt: "2025-08-17" }
  ];
  res.json(sampleData);
});
