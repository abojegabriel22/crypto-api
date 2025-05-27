
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const mongourl = process.env.MongoUrl

const dbConnect = async () => {
    try {
        await mongoose.connect(
            mongourl,
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true 
            }
        );
        // console.log("Database connection successfully done");
    } catch (error) {
        // console.error("Error connecting to Mongoose:", error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;
