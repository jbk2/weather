require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather"); // Import API route
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api", weatherRoutes);

app.get("/", (request, response) => {
  response.send("server IS working, '/' was requested");
});

app.listen(port, () => {
  console.log(`server is up and running on http://localhost::${port}`);
});
