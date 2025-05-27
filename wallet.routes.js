const express = require("express");
const WalletModel = require("./models/wallet.models");
const router = express.Router();

// POST /api/wallets
router.post("/api/wallets", async (req, res) => {
  const { address, chain } = req.body;
  if (!address || !chain) return res.status(400).send("Both address and chain are required.");

  try {
    const saved = await WalletModel.create({
      address,
      chain,
      connectedAt: new Date(),
    });
    // console.log("Wallet saved:", saved);
    res.status(200).send("Wallet saved");
  } catch (err) {
    // Handle duplicate key error for compound index (address + chain)
    if (err.code === 11000) {
      return res.status(409).json({ error: "This wallet already exists for the selected chain." });
    }
  }
});

// GET /api/address
router.get("/api/address", async (req, res) => {
  try {
    const response = await WalletModel.find();
    res.json(response);
  } catch (error) {
    // console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
