const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");


const app = express();

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

module.exports = app;