import "./Payment.css";

const Payment = ({ cohort, price }) => {

  const handlePayment = () => {
    alert("Redirecting to Payment Gateway...");
    // Integrate Razorpay / Stripe here later
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Summary</h2>

        <div className="summary-row">
          <span>Cohort:</span>
          <strong>{cohort}</strong>
        </div>

        <div className="summary-row">
          <span>Amount:</span>
          <strong>₹ {price}</strong>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
