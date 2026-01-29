import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/controls/Button";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
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
