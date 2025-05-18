
const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  chain: { type: String, required: true },
  connectedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wallet", walletSchema);
