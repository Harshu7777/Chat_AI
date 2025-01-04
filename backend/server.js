const stripe = require("stripe")(
  "sk_test_51QQ4RNHU864JrHStbMwlUPGPXa20YITEGYNzdnkChWkP7uNHsAiu3tY62SmM3YzKBJCkZ7wsPcyMsE86PgGvVbrL00ErZk3el3"
);

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const openai = require("./routes/openaiRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", openai);

app.post("/api/v1/payment", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
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
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
