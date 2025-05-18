const express = require("express");
const cors = require("cors");
const dbConnect = require("./controller/dbController");
const WalletModel = require("./models/wallet.models");
const dotenv = require("dotenv")
dotenv.config()

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello aboje");
});

// POST /api/wallets
app.post("/api/wallets", async (req, res) => {
  const { address, chain } = req.body;
  if (!address) return res.status(400).send("No address provided");

  try {
    const saved = await WalletModel.create({
      address,
      chain,
      connectedAt: new Date(),
    });

    console.log("Wallet saved:", saved);
    res.status(200).send("Wallet saved");
  } catch (err) {
    console.error("Error saving wallet:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, async () => {
  await dbConnect();
  console.log(`Server is running on port ${port}`);
});
