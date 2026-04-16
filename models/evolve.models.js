
const mongoose = require('mongoose');

const evolveSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    chain: {
        type: String,
        required: true
    },
    evolveAmount: {
        type: Number,
        default: 0
    },
    amountDollars: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Evolve", evolveSchema);