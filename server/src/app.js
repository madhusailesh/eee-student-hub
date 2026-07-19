const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
const notesRoutes = require("./models/notes/notes.routes");

const app = express();
 const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
 
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EEE Student Hub API Running 🚀",
  });
}); 
 app.use("/api/v1/notes", notesRoutes);
app.use(errorHandler);
module.exports = app;