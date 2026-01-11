const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let totalInCents = 0;
    const cleanItems = [];

    for (const item of items) {
      if (!item.id || !item.price || !item.quantity) {
        return res.status(400).json({ error: "Invalid item data" });
      }
      totalInCents += Math.round(item.price * 100) * item.quantity;

      cleanItems.push({
        id: item.id,
        name: item.name || `Product ${item.id}`,
        quantity: item.quantity,
        price: item.price,
        size: item.size || "",
        color: item.selectedColor || "",
      });
    }

    if (totalInCents === 0) {
      return res.status(400).json({ error: "Total is zero" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
      currency: "zar",
      automatic_payment_methods: { enabled: true },
      metadata: { cart_items: JSON.stringify(cleanItems) },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
