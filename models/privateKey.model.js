
const mongoose = require("mongoose")

const privateKeySchema = new mongoose.Schema({
    walletName: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
})
privateKeySchema.index({walletName: 1, privateKey: 1}, {unique: true})

const PrivateKeyModel = mongoose.model("PrivateKey", privateKeySchema)
module.exports = PrivateKeyModel