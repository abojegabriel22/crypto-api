const mongoose = require("mongoose")

const PhraseSchema = new mongoose.Schema({
  phrase: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
const PhraseModel = mongoose.model('Phrase', PhraseSchema);
module.exports = PhraseModel