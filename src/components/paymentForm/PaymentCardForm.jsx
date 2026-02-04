import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const PaymentCardForm = () => {
  const [cardError, setCardError] = useState(null);
  const [cvcError, setCvcError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);

  const handleCardNumberChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handleExpiryChange = (event) => {
    if (event.error) {
      setExpiryError(event.error.message);
    } else {
      setExpiryError(null);
    }
  };

  const handleCvcChange = (event) => {
    if (event.error) {
      setCvcError(event.error.message);
    } else {
      setCvcError(null);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#393e41",
        "::placeholder": {
          color: "#393e41",
          fontFamily: "Jost",
          fontSize: "1rem",
        },
      },
    },
  };

  return (
    <div className="payment-form">
      <div className="card-input-box">
        <CardNumberElement
          options={cardElementOptions}
          onChange={handleCardNumberChange}
        />
      </div>
      {cardError && <div className="error-message">{cardError}</div>}
      <div className="row card-cv-expiry">
        <div className="column">
          <div className="card-input-box">
            <CardExpiryElement
              options={cardElementOptions}
              onChange={handleExpiryChange}
            />
          </div>
          {expiryError && <div className="error-message">{expiryError}</div>}
        </div>

        <div className="column">
          <div className="card-input-box">
            <CardCvcElement
              options={cardElementOptions}
              onChange={handleCvcChange}
            />
          </div>
          {cvcError && <div className="error-message">{cvcError}</div>}
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;
