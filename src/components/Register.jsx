import { useState } from "react";
import "./Register.css";

function Register({ selectedData, onRegister }) {

  const [selectedCohort, setSelectedCohort] = useState(
    selectedData?.cohort || ""
  );
  const [selectedVenue, setSelectedVenue] = useState("");

  const cohortPrices = {
    "Class 10": 2999,
    "Class 11": 3999,
    "Class 12": 4999
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCohort || !selectedVenue) {
      alert("Please select Cohort and Venue");
      return;
    }

    const price = cohortPrices[selectedCohort];

    const registrationData = {
      cohort: selectedCohort,
      venue: selectedVenue,
      amount: price
    };

    // Send data to parent (LandingPage)
    if (onRegister) {
      onRegister(registrationData);
    }

    // Scroll to payment section
    const paymentSection = document.getElementById("payment-section");
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="form-section" id="register-section">
      <form onSubmit={handleSubmit}>
        <h3>Mock Test Registration Form</h3>

        <input type="text" placeholder="Student Full Name" required />
        <input type="email" placeholder="Student Email Address" required />
        <input type="tel" placeholder="Student Mobile Number" required />

        <input type="text" placeholder="Parent Full Name" required />
        <input type="email" placeholder="Parent Email Address" required />
        <input type="tel" placeholder="Parent Mobile Number" required />

        {/* Cohort Selection */}
        <select
          required
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
        >
          <option value="">Select Cohort</option>
          <option value="Class 10">Class 10 – ₹2999</option>
          <option value="Class 11">Class 11 – ₹3999</option>
          <option value="Class 12">Class 12 – ₹4999</option>
        </select>

        {/* Venue Selection */}
        <select
          required
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          <option value="">Select Preferred Test Location</option>
          <option value="City Center Campus">City Center Campus</option>
          <option value="North Zone Center">North Zone Center</option>
          <option value="South Zone Center">South Zone Center</option>
        </select>

        {/* Show Price */}
        {selectedCohort && (
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total Fee: ₹ {cohortPrices[selectedCohort]}
          </p>
        )}

        <button type="submit">Proceed to Payment</button>
      </form>
    </section>
  );
}

export default Register; 