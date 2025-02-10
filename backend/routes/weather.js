const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/weather", async (req, res) => {
  try {
    const dateToday = new Date(Date.now()).toISOString().split("T")[0];
    const dateIn5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const { location } = req.query;
    if (!location)
      return res.status(400).json({ error: "Location is required" });

    const weatherApiKey = process.env.WEATHER_API_KEY;
    if (!weatherApiKey) {
      console.error("Missing WEATHER_API_KEY in environment variables");
      return res.status(500).json({ error: "Internal configuration error" });
    }
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${dateToday}/${dateIn5Days}?key=${weatherApiKey}&iconSet=icons1`;
    console.log("API URL ===>", apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      console.error(`External API error: ${response.status} - ${text}`);
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("HERES THE RESPONSE DATA FROM BACKEND", data);

    res.json(data);
  } catch (error) {
    console.error("Error in /weather route:", error);
    res
      .status(500)
      .json({ error: "API request failed", details: error.message });
  }
});

module.exports = router;
