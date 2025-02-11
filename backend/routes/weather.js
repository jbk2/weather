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
    const contentType = response.headers.get("content-type");
    const rawData = await response.text();

    let data
    if(contentType && contentType.includes("application/json")) {
      try {
        data = JSON.parse(rawData);
      } catch (jsonError) {
        return res.status(500).json({ error: rawData });
      }
    } else {
      data = rawData;
    }
    
    if(response.status === 400) {
      return res.status(400).json({error: "Invalid location", details: data });
    }
    
    if (!response.ok) {
      return res.status(response.status).json({error: "External API error", details: data });
    }
    
    return res.json(data);

  } catch (error) {
    res.status(500).json({ error: "API request failed", details: error.message });
  }
});

module.exports = router;
