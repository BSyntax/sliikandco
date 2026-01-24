import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import api from "../utils/axios";
import { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useCheckout } from "../context/CheckoutProvider";
import { useAuth } from "../context/AuthProvider";

import Button from "../components/controls/Button";
import InputControl from "../components/controls/InputControl";
import CountryControl from "../components/controls/CountryControl";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PaymentCardForm from "../components/paymentForm/PaymentCardForm";
import ShippingAddressSelector from "../components/checkout/ShippingAddressSelector";

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
  const location = useLocation();

  const { cart, clearCart } = useCart();
  const { clientSecret } = useCheckout();
  const { user, addAddress } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    phone: "",
  });

  useEffect(() => {
    if (user && user.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setIsAddingNewAddress(true);
    } else {
      setIsAddingNewAddress(false);
    }
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );
  const vatAmount = subtotal * (VAT / 100);
  const totalAmount =
    subtotal + vatAmount >= 500
      ? subtotal + vatAmount
      : subtotal + vatAmount + DELIVERY_FEE;
  const formatPrice = (amount) => `R${(amount ?? 0).toFixed(2)}`;

  useEffect(() => {
    if (succeeded) {
      const timer = setTimeout(() => navigate("/"), 15000);
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

  const handleAddressSelect = useCallback((address) => {
    const countryMap = {
      "South Africa": "ZA",
      "United States": "US",
      Poland: "PL",
    };
    const normalizedCountry = countryMap[address.country] || address.country;

    setFormData((prev) => ({
      ...prev,
      name: address.name || prev.name || "",
      address: address.street || prev.address || "", // Mapping street -> address field name
      city: address.city || prev.city || "",
      country: normalizedCountry || prev.country || "ZA", // Default/Fallback to ZA
      zip: address.postalCode || address.zip || prev.zip || "", // Handle variety
      phone: address.phone || prev.phone || "",
    }));
    // Clear errors as we assume saved addresses are valid
    setErrors({});
  }, []);

  const handleAddNewAddressClick = useCallback(() => {
    setIsAddingNewAddress(true);
    // Clear form except email if user exists
    setFormData({
      name: "",
      email: user?.email || "",
      address: "",
      city: "",
      country: "",
      zip: "",
      phone: "",
    });
  }, [user]);

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
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!stripe || !elements || !clientSecret) return;
    if (!validateForm()) return;

    setProcessing(true);
    setError(null);

    // Save address if requested and user is logged in and we are in "Add New" mode
    if (user && isAddingNewAddress && saveAddress) {
      addAddress({
        name: formData.name,
        street: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.zip,
        phone: formData.phone,
        isDefault: false, // By default, don't force it to default unless we want to
      });
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone?.trim() || null,
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
      setProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      try {
        const orderItems = cart.map((item) => ({
          ...item,
          product: item.id || item._id, // Ensure we pass product ID
          _id: undefined, // Clear any existing _id to avoid conflicts if needed, or keeping it is fine if backend ignores
        }));

        const orderData = {
          orderItems,
          shippingAddress: {
            name: formData.name,
            street: formData.address,
            city: formData.city,
            postalCode: formData.zip,
            country: formData.country,
            phone: formData.phone,
          },
          paymentMethod: "Card",
          itemsPrice: subtotal,
          taxPrice: vatAmount,
          shippingPrice: totalAmount > 500 ? 0 : DELIVERY_FEE,
          totalPrice: totalAmount,
          isPaid: true,
          paidAt: Date.now(),
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: String(paymentIntent.created),
            email_address: formData.email,
          },
        };

        console.log("Order creation response:", orderData);
        await api.post("/orders", orderData);

        console.log("Setting succeeded to true");
        clearCart();
        setSucceeded(true);
      } catch (err) {
        console.error("Order creation failed:", err);
        setError(
          "Payment succeeded but order creation failed. Please contact support.",
        );
      } finally {
        setProcessing(false);
      }
    }
  };

  if (succeeded) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-empty-state">
          <DotLottieReact
            className="lottie-small"
            src="https://lottie.host/6d24bf4a-9000-41a9-af6c-95d340585af4/IttqWa2743.lottie"
            autoplay={true}
            loop={false}
          />

          <h2 className="success-payment">You're all set!</h2>
          <p className="success-message">
            A confirmation email has been sent to you.
          </p>

          <div className="success-actions">
            <Button
              text="Track Your Order"
              onClick={() => navigate("/account/orders")}
              variant="primary"
            />
            <Button
              text="Continue Shopping"
              onClick={() => navigate("/shop")}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    );
  }

  const renderFormFields = () => (
    <>
      <InputControl
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Full Name*"
        error={errors.name}
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
        placeholder="Address (Street, House No.)*"
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

      <InputControl
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone Number (Optional)"
        error={errors.phone}
      />
    </>
  );

  return (
    <div className="checkout-page">
      <div className="checkout-left login">
        <div className="company-logo">
          <NavLink to="/" className="logo-link">
            Sliik & Co.
          </NavLink>
        </div>

        <div className="checkout-header">
          <h2>Shipping Address</h2>
          {user == null ? (
            <div className="login-account">
              <span>Already have an account? </span>
              <Link to="/login" className="login-link">
                Login
              </Link>
            </div>
          ) : (
            isAddingNewAddress && (
              <button
                type="button"
                className="text-btn cancel-add-btn"
                onClick={() => setIsAddingNewAddress(false)}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
              >
                Cancel
              </button>
            )
          )}
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-fields">
          {user && !isAddingNewAddress && (
            <ShippingAddressSelector
              onAddressSelect={handleAddressSelect}
              onAddNew={handleAddNewAddressClick}
            />
          )}

          {isAddingNewAddress && (
            <div className="address-form-section">
              {renderFormFields()}

              {user && (
                <label
                  htmlFor="save-details"
                  className="save-details-label"
                  style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}
                >
                  <input
                    type="checkbox"
                    id="save-details"
                    name="saveDetails"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  Save this address for future purchases
                </label>
              )}
            </div>
          )}

          <h2 className="payment-details-info" style={{ marginTop: "1rem" }}>
            Payment Details
          </h2>

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

          <div className="btn-container">
            <Button
              text="Continue shopping"
              onClick={() => navigate(-1)}
              variant="secondary"
              className="back-to-cart-btn"
              type="button"
            />
            <Button
              text={
                !user
                  ? "Login to Continue"
                  : processing
                    ? "Processing..."
                    : `Confirm Payment ${formatPrice(totalAmount)}`
              }
              type="submit"
              variant="primary"
              disabled={user && (!stripe || processing || !clientSecret)}
              className="pay-btn proceed-to-pay-btn"
            />
          </div>
        </form>
      </div>
      <div className="checkout-right">
        <div className="summary-items">
          {cart.map((item, index) => (
            <div key={item.id || item._id || index} className="summary-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <div className="item-details">
                  <NavLink
                    to={`/product/${item.id || item._id}`}
                    className="item-name"
                  >
                    {item.name}
                  </NavLink>
                  <span className="item-color">
                    Color: {item.selectedColor}
                  </span>
                  <span className="item-qty">Quantity: {item.quantity}</span>
                </div>
                <div className="item-price">
                  {formatPrice((item.price ?? 0) * (item.quantity ?? 1))}
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
