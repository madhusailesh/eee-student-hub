const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
const notesRoutes = require("./models/notes/notes.routes");
const pyqRoutes = require("./models/pyqs/pyq.route");
const facultyRoutes = require("./models/faculty/faculty.route");
const resourceRoutes = require("./models/resource/resource.route");
const path = require("path");

const app = express();

// Allowed Origins List
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
].filter(Boolean); // removes undefined values if process.env.CLIENT_URL isn't set yet

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.some((o) => origin.startsWith(o.replace(/\/$/, "")))) {
        return callback(null, true);
      } else {
        return callback(null, true); // production me specific domain ke liye allow matching
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EEE Student Hub API Running 🚀",
  });
});

app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/pyqs", pyqRoutes);
app.use("/api/v1/faculty", facultyRoutes);

app.use(errorHandler);

module.exports = app;