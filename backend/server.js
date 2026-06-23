require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodStockRoutes = require("./routes/bloodStockRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const campRoutes = require("./routes/campRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/blood-stock", bloodStockRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/camps", campRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Blood Bank Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});