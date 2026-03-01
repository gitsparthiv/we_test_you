import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentStatus.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="status-container">
      <div className="status-box success">
        <div className="status-icon">✓</div>
        <h1>Payment Successful</h1>
        <p>
          Your registration has been completed successfully.
          A confirmation email will be sent shortly.
        </p>

        {state?.finalTotal != null && (
          <p style={{ marginTop: 10 }}>
            Amount Paid: <b>₹ {state.finalTotal}</b>
          </p>
        )}

        <button onClick={() => navigate("/")}>Go To Home</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;