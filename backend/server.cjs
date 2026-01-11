require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const { createPaymentIntent } = require("./controllers/paymentController.cjs");

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(express.json());

app.post("/create-payment-intent", createPaymentIntent);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
