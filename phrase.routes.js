const express = require("express");
const PhraseModel = require("./models/phrase.models");
const router = express.Router();

// POST /api/phrase
router.post("/api/phrase", async (req, res) => {
  const { phrase } = req.body;

  if (!phrase || typeof phrase !== "string") {
    return res.status(400).json({ error: "Phrase is required and must be a string" });
  }

  const words = phrase.trim().split(/\s+/);
  if (words.length < 12 || words.length > 24) {
    return res.status(400).json({ error: "Phrase must contain between 12 and 24 words." });
  }

  try {
    const savedPhrase = await PhraseModel.create({ phrase });
    res.status(201).json({ message: "Phrase saved successfully." });
    // console.log("phrase saved: ", savedPhrase )
  } catch (error) {
    // console.error("Error saving phrase:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/phrase
router.get("/api/phrase", async (req, res) => {
  try {
    const response = await PhraseModel.find();
    res.json(response);
  } catch (error) {
    // console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
