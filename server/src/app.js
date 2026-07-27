const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const notesRoutes = require("./models/notes/notes.routes");
const pyqRoutes = require("./models/pyqs/pyq.route");
const facultyRoutes = require("./models/faculty/faculty.route");
const resourceRoutes = require("./models/resource/resource.route");

const app = express();

// Required for Render / Reverse proxy deployments
app.set("trust proxy", 1);

// Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman / Mobile Apps / Server Requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Uploads Folder Serving
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Main Routes
app.use("/api/v1", routes);

// Extra Specific Routes
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/pyqs", pyqRoutes);
app.use("/api/v1/faculty", facultyRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EEE Student Hub API Running 🚀",
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;