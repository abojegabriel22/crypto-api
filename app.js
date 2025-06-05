const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./controller/dbController");

dotenv.config();

const app = express();
const port = process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const walletRoutes = require("./wallet.routes");
const phraseRoutes = require("./phrase.routes");
const swapRoute = require("./swap.routes")

app.use(walletRoutes);
app.use(phraseRoutes);
app.use(swapRoute)

app.get("/", (req, res) => {
  res.send("hello aboje");
});

// Start server
app.listen(port, async () => {
  await dbConnect();
  console.log(`Server is running on port ${port}`);
});
