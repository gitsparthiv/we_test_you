import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentStatus.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="status-container">
      <div className="status-box failed">
        <div className="status-icon">✕</div>
        <h1>Payment Failed</h1>
        <p>
          We were unable to process your payment.
          No amount has been deducted.
        </p>

        <div className="button-row">
          <button onClick={() => navigate(-1)}>
            Try Again
          </button>

          <button onClick={() => navigate("/")}>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;