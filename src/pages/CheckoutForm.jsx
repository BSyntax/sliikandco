import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useCheckout } from "../context/CheckoutProvider";

import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";
import CountryControl from "../components/controls/CountryControl";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PaymentCardForm from "../components/paymentForm/PaymentCardForm";

import Card1 from "../assets/cards/card-1.webp";
import Card3 from "../assets/cards/card-3.webp";
import Card4 from "../assets/cards/card-4.webp";

const cards = [Card3, Card4, Card1];
const VAT = 15;
const DELIVERY_FEE = 50;

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { cart } = useCart();
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vatAmount = subtotal * (VAT / 100);
  const totalAmount =
    subtotal + vatAmount >= 500
      ? subtotal + vatAmount
      : subtotal + vatAmount + DELIVERY_FEE;
  const formatPrice = (amount) => `R${amount.toFixed(2)}`;

  useEffect(() => {
    if (succeeded) {
      const timer = setTimeout(() => navigate("/"), 20000);
      return () => clearTimeout(timer);
    }
  }, [succeeded, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
    setErrors((prev) => ({ ...prev, country: "" }));
  };

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

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            address: {
              line1: formData.address.trim(),
              city: formData.city.trim(),
              country: formData.country,
              postal_code: formData.zip.trim(),
            },
          },
        },
      });

    setProcessing(false);

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent?.status === "succeeded") {
      cart.length = 0;
      setSucceeded(true);
    }
  };

  if (succeeded) {
    cart.length = 0;
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-empty-state">
          <DotLottieReact
            className="lottie-small"
            src="https://lottie.host/6d24bf4a-9000-41a9-af6c-95d340585af4/IttqWa2743.lottie"
            autoplay={true}
            loop={false}
          />
          <h2 className="success-payment">Payment Successful!</h2>
          <p className="success-message">
            Payment successful! Redirecting home…
          </p>
          <Button
            text="Return Home"
            onClick={() => navigate("/")}
            variant="primary"
          />
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
          <h2>Billing Details</h2>
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name*"
            error={errors.name}
            autoFocus
          />

          <InputControl
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email*"
            error={errors.email}
          />

          <InputControl
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address*"
            error={errors.address}
          />

          <div className="row">
            <div className="column">
              <InputControl
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City*"
                error={errors.city}
              />
            </div>

            <div className="column">
              <CountryControl
                value={formData.country}
                onChange={handleCountryChange}
                error={errors.country}
              />
            </div>

            <div className="column">
              <InputControl
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="ZIP Code*"
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

          <label htmlFor="save-details" className="save-details-label">
            <input type="checkbox" id="save-details" name="saveDetails" />
            Save my details for future purchases
          </label>

          <div className="btn-container">
            <Button
              text="Continue shopping"
              onClick={() => navigate(-1)}
              variant="secondary"
              className="back-to-cart-btn"
            />
            <Button
              text={
                processing
                  ? "Processing..."
                  : `Confirm Payment ${formatPrice(totalAmount)}`
              }
              type="submit"
              variant="primary"
              disabled={!stripe || processing || !clientSecret}
              className="pay-btn proceed-to-pay-btn"
            />
          </div>
        </form>
      </div>

      <div className="checkout-right">
        <div className="summary-items">
          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <div className="item-details">
                  <NavLink to={`/product/${item.id}`} className="item-name">
                    {item.name}
                  </NavLink>
                  <span className="item-color">
                    Color: {item.selectedColor}
                  </span>
                  <span className="item-qty">Quantity: {item.quantity}</span>
                </div>
                <div className="item-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-breakdown">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>VAT ({VAT}%)</span>
            <span>{formatPrice(vatAmount)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>
              {totalAmount > 500 ? "Free" : `R${DELIVERY_FEE.toFixed(2)}`}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
