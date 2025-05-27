const mongoose = require("mongoose");
const WalletModel = require("./models/wallet.models");
require("dotenv").config();

const rebuildIndexes = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);

    // console.log("Connected to MongoDB. Dropping indexes...");
    await WalletModel.collection.dropIndexes();

    // console.log("Indexes dropped. Rebuilding...");
    await WalletModel.init(); // Rebuild indexes as defined in schema

    // console.log("✅ Indexes rebuilt successfully.");
    process.exit(0);
  } catch (err) {
    // console.error("❌ Error during index rebuild:", err.message);
    process.exit(1);
  }
};

rebuildIndexes();
