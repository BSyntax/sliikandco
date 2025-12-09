import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, createContext, useContext } from "react";
import { useCart } from "./CartProvider";
import BreadCrumb from "../components/wishitem/BreadCrumb";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51SGJRHLl6DRXnOadGlUZXYUokqQvDnMOhOGL4cdRcGzRPQXbO3AUvhRuXMUjMEvLb4zBcWjhiOakmNosnxu8tTiG00uvZ5LVBz"
);

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export default function StripeCheckoutProvider({ children }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      setClientSecret("");
      return;
    }

    fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          selectedColor: item.selectedColor,
        })),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => {
        console.error("PaymentIntent failed:", err);
        setError("Failed to initialize payment. Please try again.");
      });
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-empty-state">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before checking out.</p>
        </div>
      </div>
    );
  }

  if (cart.length > 0 && !clientSecret && !error) {
    return (
      <div className="checkout-page-wrapper">
        <p className="checkout-loading-state">Loading secure payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-page-wrapper">
        <p className="checkout-error-state">{error}</p>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb from={{ label: "Shop", path: "/shop" }} current="Checkout" />
      <CheckoutContext.Provider value={{ clientSecret }}>
        <div className="checkout-page-wrapper container">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            {children}
          </Elements>
        </div>
      </CheckoutContext.Provider>
    </>
  );
}
