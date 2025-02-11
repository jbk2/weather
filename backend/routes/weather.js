const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/weather", async (req, res) => {
  try {
    const dateToday = new Date(Date.now()).toISOString().split("T")[0];
    const dateIn5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const { location } = req.query;
    const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/` +
    `services/timeline/${location}/${dateToday}/${dateIn5Days}` +
    `?key=${process.env.WEATHER_API_KEY}&iconSet=icons1`
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`External API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "API request failed", details: error.message });
  }
});

module.exports = router;
