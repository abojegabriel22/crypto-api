
const express = require("express");
const EvolveModel = require("./models/evolve.models");
const router = express.Router();

// evolve endpoint
router.post("/api/evolve", async (req, res) => {
  const { walletAddress, chain, evolveAmount, amountDollars } = req.body;
  if (!walletAddress) return res.status(400).send("No wallet address provided");
  if (!chain) return res.status(400).send("No chain provided");
  // if (!evolveAmount) return res.status(400).send("No evolve amount provided");

  try {
    // 1. Convert address to lowercase to ensure consistency
    const normalizedAddress = walletAddress.toLowerCase();

    // 2. findOneAndUpdate(filter, update, options)
    const saved = await EvolveModel.findOneAndUpdate(
      { walletAddress: normalizedAddress }, // Search by wallet address
      { 
        chain, 
        evolveAmount, 
        amountDollars 
      }, // Data to update
      { 
        new: true,      // Return the updated document
        upsert: true,   // Create it if it doesn't exist
        runValidators: true // Ensure schema rules are followed
      }
    );

    console.log("Evolve Sync Successful:", saved);
    res.status(200).json({ message: "Sync successful", data: saved });
  } catch (err) {
    console.error("Error saving evolve:", err);
    res.status(500).send("Server error");
  }
});

// get all evolve data for all wallets based on the highest evolve amount
router.get("/api/evolve", async (req, res) => {
  try {
    const evolveData = await EvolveModel.find().sort({ evolveAmount: -1 });
    if (!evolveData) return res.status(404).send("No evolve data found");

    res.status(200).json({ message: "Evolve data fetched successfully", data: evolveData });
  } catch (err) {
    console.error("Error fetching evolve data:", err);
    res.status(500).send("Server error");
  }
});

// get top 10 evolve data for all wallets based on the highest evolve amount
router.get("/api/evolve/top10", async (req, res) => {
  try {
    const evolveData = await EvolveModel.find().sort({ evolveAmount: -1 }).limit(15);
    if (!evolveData) return res.status(404).send("No evolve data found");

    res.status(200).json({ message: "Top 10 evolve data fetched successfully", data: evolveData });
  } catch (err) {
    console.error("Error fetching top 10 evolve data:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;