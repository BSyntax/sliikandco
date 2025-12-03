import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51Sa8lMGrev5vTc2q2akJXVwPPA5nnoYfaTvVkCE5ofjY7Am8ZnRxApOgyp0cgCnrfjRM78eKaFbtZVbJLz43jkEz00njLf6srl"
);

export default function StripeCheckoutProvider({ children }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          {children}
        </Elements>
      )}
    </>
  );
}
