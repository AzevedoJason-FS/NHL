const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/nhl-schedule", async (req, res) => {
  try {
    const response = await axios.get("https://api-web.nhle.com/v1/schedule/now");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NHL data" });
  }
});

app.get("/starting-goalies", async (req, res) => {
  try {
    const response = await axios.get("https://www.dailyfaceoff.com/_next/data/HZ5VbscUTkA2QB0O3MCQG/starting-goalies.json");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => console.log("Proxy running on port 5000"));


