
const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();

// Load environment config
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Allow frontend origin
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://your-frontend.vercel.app" // Vercel domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// Middleware to parse JSON
app.use(express.json());

// Routes
const todoRoutes = require("./routes/todos");
app.use("/api/v1", todoRoutes);

// Connect to DB
const dbConnect = require("./config/database");
dbConnect();

// Default route
app.get("/", (req, res) => {
  res.send("<h1>This is HOMEPAGE</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

