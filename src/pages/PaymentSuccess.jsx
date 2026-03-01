import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentStatus.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="status-container">
      <div className="status-box success">
        <div className="status-icon">✓</div>
        <h1>Payment Successful</h1>
        <p>
          Your registration has been completed successfully.
          A confirmation email will be sent shortly.
        </p>

        <button onClick={() => navigate("/")}>
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;