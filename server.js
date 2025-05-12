
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const ZIINA_API_KEY = process.env.ZIINA_API_KEY;

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const response = await axios.post("https://api.ziina.com/payment_intent", {
      amount,
      currency,
      success_url: "https://yourstore.myshopify.com/pages/success?pid={PAYMENT_INTENT_ID}",
      cancel_url: "https://yourstore.myshopify.com/pages/cancel?pid={PAYMENT_INTENT_ID}",
      test: true
    }, {
      headers: {
        Authorization: `Bearer ${ZIINA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.json({ redirect_url: response.data.redirect_url });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).send("Ziina error");
  }
});

app.get("/", (req, res) => {
  res.send("Ziina Shopify backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
