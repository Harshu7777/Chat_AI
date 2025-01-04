const express = require("express");
const {
  summaryController,
  paragraphController,
} = require("../controllers/openaiController");

const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51QQ4RNHU864JrHStbMwlUPGPXa20YITEGYNzdnkChWkP7uNHsAiu3tY62SmM3YzKBJCkZ7wsPcyMsE86PgGvVbrL00ErZk3el3"
);

// Define routes
router.post("/summary", summaryController);
router.post("/generate", paragraphController);
router.post("/payment", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Export the router
module.exports = router;
