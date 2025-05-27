const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  chain: { type: String, required: true },
  connectedAt: { type: Date, default: Date.now },
});

// 👇 This creates a unique compound index on (address + chain)
walletSchema.index({ address: 1, chain: 1 }, { unique: true });

module.exports = mongoose.model("Wallet", walletSchema);
