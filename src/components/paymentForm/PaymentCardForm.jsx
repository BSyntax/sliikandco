import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CVVIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M2 7H22V10H2V7Z" fill="#393e41" />
    <rect
      x="2"
      y="14"
      width="20"
      height="3"
      rx="1"
      fill="#393e41"
      opacity="0.3"
    />
    <path d="M16 14H20V17H16V14Z" fill="#393e41" />
  </svg>
);

const PaymentCardForm = () => {
  const [cardError, setCardError] = useState(null);

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
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
          onChange={handleCardChange}
        />
      </div>

      {cardError && <div className="error-message">{cardError}</div>}

      <div className="row card-cv-expiry">
        <div className="column">
          <div className="card-input-box">
            <CardExpiryElement
              options={cardElementOptions}
              onChange={handleCardChange}
            />
          </div>
        </div>

        <div className="column">
          <div className="card-input-box cvc-with-icon">
            <CardCvcElement
              options={cardElementOptions}
              onChange={handleCardChange}
            />
            <div className="cvc-icon">
              <CVVIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;
