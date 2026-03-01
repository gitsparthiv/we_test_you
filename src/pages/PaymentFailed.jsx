import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentStatus.css";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="status-container">
      <div className="status-box failed">
        <div className="status-icon">✕</div>
        <h1>Payment Failed</h1>
        <p>We were unable to process your payment. No amount has been deducted.</p>

        {state?.reason && (
          <p style={{ marginTop: 10, opacity: 0.9 }}>
            Reason: <b>{state.reason}</b>
          </p>
        )}

        <div className="button-row">
          <button onClick={() => navigate(-1)}>Try Again</button>
          <button onClick={() => navigate("/")}>Back To Home</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;