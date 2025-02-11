require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const weatherRoutes = require("./routes/weather");

app.use(cors());
app.use(express.json());
app.use("/api", weatherRoutes);

app.get("/", (request, response) => {
  response.send("server IS working, '/' was requested");
});

module.exports = app;