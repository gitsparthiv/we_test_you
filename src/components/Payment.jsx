import "./Payment.css";

function Payment({ selectedData }) {

  // If no data received yet
  if (!selectedData) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <h2>No Registration Found</h2>
          <p>Please complete the registration form first.</p>
        </div>
      </div>
    );
  }

  const { cohort, amount, venue } = selectedData;

  return (
    <div className="payment-container" id="payment-section">
      <div className="payment-card">

        <h2 className="payment-title">
          Mock Test Registration Payment
        </h2>

        <div className="payment-details">
          <p><strong>Selected Cohort:</strong> {cohort}</p>
          <p><strong>Test Venue:</strong> {venue}</p>
        </div>

        <div className="amount-box">
          <h3>Total Amount Payable</h3>
          <p className="amount">₹ {amount}</p>
        </div>

        <button
          className="pay-btn"
          onClick={() => alert("Payment Gateway Integration Pending")}
        >
          Proceed to Secure Payment
        </button>

      </div>
    </div>
  );
}

export default Payment;
