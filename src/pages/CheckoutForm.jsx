import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useCheckout } from "../context/CheckoutProvider";

import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";
import CountryControl from "../components/controls/CountryControl";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PaymentCardForm from "../components/paymentForm/PaymentCardForm";

import Card1 from "../assets/cards/card-1.webp";
import Card2 from "../assets/cards/card-2.webp";
import Card3 from "../assets/cards/card-3.webp";
import Card4 from "../assets/cards/card-4.webp";

const cards = [Card1, Card2, Card3, Card4];

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { clientSecret } = useCheckout();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
      valid = false;
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    if (!validateForm()) return;

    setProcessing(true);
    setError(null);

    // IMPORTANT: Use CardNumberElement for split fields
    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              country: formData.country,
              postal_code: formData.zip,
            },
          },
        },
      });

    setProcessing(false);

    if (stripeError) {
      setError(stripeError.message);
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
            className="lottie-small"
            src="https://lottie.host/6bea3a1b-64cb-4080-b7b1-94853cecf6ef/Wf4YfXiiym.lottie"
            autoplay
            loop
          />
          <h2 className="sucess-payment">Payment Successful!</h2>
          <p className="sucess-message">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-left login">
        <div className="company-logo">
          <NavLink to="/" className="logo-link">
            Sliik & Co.
          </NavLink>
        </div>

        <div className="checkout-header">
          <h2>Contact Information</h2>
          <div className="login-account">
            <span>Already have an account? </span>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-fields">
          <InputControl
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name*"
            name="name"
            error={errors.name}
            autoFocus
          />

          <InputControl
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email*"
            name="email"
            error={errors.email}
          />

          <InputControl
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address*"
            name="address"
            error={errors.address}
          />

          <div className="row">
            <div className="column">
              <InputControl
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City*"
                name="city"
                error={errors.city}
              />
            </div>

            <div className="column">
              <CountryControl
                value={formData.country}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, country: val }))
                }
                error={errors.country}
              />
            </div>

            <div className="column">
              <InputControl
                type="text"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="ZIP Code*"
                name="zip"
                error={errors.zip}
              />
            </div>
          </div>

          <h2 className="payment-details-info">Payment Details</h2>

          <div className="payment-method-card">
            <div className="radio-btn-container">
              <input
                id="payment-method"
                type="radio"
                name="payment-method"
                defaultChecked
              />
              <label htmlFor="payment-method">Credit Card</label>
            </div>

            <div className="card-images">
              {cards.map((card, index) => (
                <div className="card-img" key={index}>
                  <img src={card} alt={`Card ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <PaymentCardForm />
          <Button
            text={processing ? "Processing..." : "Pay Now"}
            type="submit"
            variant="primary"
            disabled={!stripe || processing}
            className="pay-btn"
          />
        </form>
      </div>

      <div className="checkout-right">
        <h3>Checkout Summary</h3>

        <div className="summary-items">
          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <div className="item-image">
                <img src={item.image} alt="" />
              </div>
              <div className="item-info">
                <span>{item.name}</span>
                <p>Qty: {item.quantity}</p>
                <div className="item-price">
                  R{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-total">
          <span>Total:</span>
          <strong>R{total}</strong>
        </div>
      </div>
    </div>
  );
}
