import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useCheckout } from "../context/CheckoutProvider";
import Button from "../components/controls/Button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { clientSecret } = useCheckout();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zip,
            },
          },
        },
      }
    );

    setProcessing(false);

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setSucceeded(true);
      clearCart();
      setTimeout(() => navigate("/completion"), 2000);
    }
  };

  if (succeeded) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-empty-state">
          <DotLottieReact
            src="https://lottie.host/6bea3a1b-64cb-4080-b7b1-94853cecf6ef/Wf4YfXiiym.lottie"
            loop
            autoplay
          />
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="checkout-form">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Secure Checkout
        </h2>

        <div style={{ marginBottom: "20px", fontSize: "1.2rem" }}>
          <strong>Total: R{total}</strong>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Custom Fields */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleInputChange}
              required
              style={{
                width: "100px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
              backgroundColor: "#fafafa",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "18px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                },
              }}
            />
          </div>

          {error && (
            <div
              className="checkout-error-state"
              style={{
                padding: "10px",
                fontSize: "1rem",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <Button
            text={processing ? "Processing..." : `Pay R${total}`}
            type="submit"
            disabled={!stripe || processing}
            style={{ width: "100%", padding: "14px" }}
          />
        </form>

        <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
          <strong>Test Card:</strong> 4242 4242 4242 4242
          <br />
          Any future date • Any 3-digit CVC • Any ZIP
        </div>
      </div>
    </>
  );
}
