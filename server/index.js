const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const bugRoutes = require("./routes/bugs");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // VERY IMPORTANT

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

app.get("/", (req, res) => {
  res.send("Bug Tracker API is running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
