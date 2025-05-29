const mongoose = require("mongoose")

const PhraseSchema = new mongoose.Schema({
  phrase: { type: String, required: true, trim: true },
  walletName: {type: String, required: true, trim: true},
  createdAt: { type: Date, default: Date.now }
});
PhraseSchema.index({ phrase: 1, walletName: 1 }, { unique: true });

const PhraseModel = mongoose.model('Phrase', PhraseSchema);
module.exports = PhraseModel