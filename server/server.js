// require("dotenv").config();

// const express = require("express");
// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const resumeRoutes = require("./routes/resumeRoutes");
// const jobRoutes = require("./routes/jobRoutes");
// const app = express();

// app.use(express.json());

// connectDB();
// const path = require("path");

// app.use(
//   "/uploads",
//   express.static(
//     path.join(__dirname, "uploads")
//   )
// );
// app.use(
//   "/api/jobs",
//   jobRoutes
// );
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use(
//   "/api/profile",
//   profileRoutes
// );
// app.use(
//   "/api/resume",
//   resumeRoutes
// );
// app.get("/", (req,res)=>{
//     res.send("CareerForge Backend Connected Successfully 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const aiRoutes = require("./routes/aiRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Static Folder
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
    "/uploads",
    express.static("uploads")
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);
app.use(
  "/api/saved-jobs",
  savedJobRoutes
);
// Test Route
app.get("/", (req, res) => {
  res.send(
    "CareerForge Backend Connected Successfully 🚀"
  );
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});