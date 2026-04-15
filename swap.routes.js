const express = require("express");
const router = express.Router();
const axios = require("axios");

const CHAIN_ID = 1; // Ethereum

// QUOTE
router.get("/api/quotes", async (req, res) => {
  const { fromTokenAddress, toTokenAddress, amount } = req.query;

  if (!fromTokenAddress || !toTokenAddress || !amount) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const response = await axios.get(`https://api.1inch.io/v5.0/${CHAIN_ID}/quote`, {
      params: {
        fromTokenAddress,
        toTokenAddress,
        amount: amount.toString(),
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("1inch quote error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get quote" });
  }
});

// SWAP
router.post("/api/swap", async (req, res) => {
  const { fromTokenAddress, toTokenAddress, amount, walletAddress, slippage } = req.body;

  if (!fromTokenAddress || !toTokenAddress || !amount || !walletAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.get(`https://api.1inch.io/v5.0/${CHAIN_ID}/swap`, {
      params: {
        fromTokenAddress,
        toTokenAddress,
        amount: amount.toString(),
        fromAddress: walletAddress,
        slippage: (slippage || 1).toString(),
        disableEstimate: "false",
        allowPartialFill: "false",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Swap error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch Swap data" });
  }
});

module.exports = router;
