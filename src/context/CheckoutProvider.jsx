import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { useCart } from "./CartProvider";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import Button from "../components/controls/Button";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51SGJRHLl6DRXnOadGlUZXYUokqQvDnMOhOGL4cdRcGzRPQXbO3AUvhRuXMUjMEvLb4zBcWjhiOakmNosnxu8tTiG00uvZ5LVBz",
);

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export default function StripeCheckoutProvider({ children }) {
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      setClientSecret("");
      return;
    }

    api
      .post("/payment/create-payment-intent", {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          selectedColor: item.selectedColor,
        })),
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("PaymentIntent failed:", err);
        setError("Failed to initialize payment. Please try again.");
      });
  }, [cart]);

  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  if (cart.length === 0 && !succeeded) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-empty-state">
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before checking out.</p>
          <Button
            className="empty-cart-btn"
            variant="primary"
            text="Continue Shopping"
            onClick={() => navigate("/shop")}
          />
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
      <CheckoutContext.Provider
        value={{ clientSecret, succeeded, setSucceeded }}
      >
        <div className="checkout-page-wrapper">
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              {children}
            </Elements>
          )}
        </div>
      </CheckoutContext.Provider>
    </>
  );
}
