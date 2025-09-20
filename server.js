const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch(err => console.error("❌ DB connection error:", err));

// Routes
const dashboardRoute = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoute);

app.get("/api/reports", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reports ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Database error:",err);
    res.status(500).send("Error fetching reports");
  }
});
app.get("/", (req, res) => {
  res.send("✅ API is working. Try /api/dashboard/reports");
});

app.post("/api/submit", async (req, res) => {
  const { projectId, researcherName, physicalProgress, financialProgress, milestones, challenges, nextSteps } = req.body;
  try {
    await pool.query(
      `INSERT INTO reports 
      (project_id, researcher_name, physical_progress, financial_progress, milestones, challenges, next_steps) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [projectId, researcherName, physicalProgress, financialProgress, milestones, challenges, nextSteps]
    );
    res.json({ message: "Report submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving report");
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});