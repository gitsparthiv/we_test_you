import React, { useState } from "react";
import "./FrontPage.css";

const FrontPage = ({ pricing, onRegister }) => {

  const [selectedCohort, setSelectedCohort] = useState("");
  const [price, setPrice] = useState(null);

  const handleCohortChange = (e) => {
    const cohort = e.target.value;
    setSelectedCohort(cohort);
    setPrice(pricing[cohort] || null);
  };

  const handleSubmit = (e) => {
  e.preventDefault(); // VERY IMPORTANT

  const inputs = document.querySelectorAll(
    ".form-card input, .form-card select"
  );

  for (let input of inputs) {
    if (!input.value) {
      alert("Please fill all fields before registering.");
      return;
    }
  }

  onRegister({
    cohort: selectedCohort,
    price,
  });
};


  return (
    <div className="landing-page" id="register-section">

      <header className="navbar">
        <div className="logo">WeTestYou</div>
        <button className="admission-btn">Register Now</button>
      </header>

      <section className="hero-section">

        <div className="hero-left">
          <h1>
            Tuitions Teach You.<br />
            <span>We Test You.</span>
          </h1>

          <p>
            Structured offline mock examinations designed to simulate
            real board exam experience for Classes 10, 11 & 12.
          </p>

          <div className="features">
            <span>✔ Real Exam Simulation</span>
            <span>✔ Manual Evaluation</span>
            <span>✔ Performance Analytics</span>
          </div>

          {/* Cohort Description Section Restored */}
          <div className="cohorts">
            <div className="cohort-card">
              <h3>Class 10</h3>
              <ul>
                <li>✔ Science, Maths, English</li>
                <li>✔ 15+ Chapter-wise Tests</li>
                <li>✔ 5 Full Syllabus Mock Exams</li>
              </ul>
              <button type="button">Read More</button>
            </div>

            <div className="cohort-card highlight">
              <h3>Class 11</h3>
              <ul>
                <li>✔ Physics, Chemistry, Maths</li>
                <li>✔ 20+ Chapter-wise Tests</li>
                <li>✔ Monthly Combined Mock</li>
              </ul>
              <button type="button">Read More</button>
            </div>

            <div className="cohort-card">
              <h3>Class 12</h3>
              <ul>
                <li>✔ Physics, Chemistry, Maths</li>
                <li>✔ 25+ Chapter-wise Tests</li>
                <li>✔ 8 Full Board Pattern Exams</li>
              </ul>
              <button type="button">Read More</button>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="form-card">
  <h2>Register Now</h2>

  <form onSubmit={handleSubmit}>


            <input type="text" placeholder="Student Full Name" required/>
            <input type="email" placeholder="Email Address" required/>
            <input type="text" placeholder="Mobile Number" required/>
            <input type="text" placeholder="Guardian Contact Number" required/>

            <div className="select-wrapper">
              <select value={selectedCohort} onChange={handleCohortChange}>
                <option value="">Select Cohort</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
              <span className="arrow">⌄</span>
            </div>

            <div className="select-wrapper">
              <select>
                <option>Select Preferred Venue</option>
                <option>City Center Campus</option>
                <option>North Zone Center</option>
                <option>South Zone Center</option>
              </select>
              <span className="arrow">⌄</span>
            </div>

            {price && (
              <div className="price-display">
                Registration Fee: ₹ {price}
              </div>
            )}

            <button type="submit" className="submit-btn">
  Complete Registration
</button>
          </form>

          </div>
        </div>

      </section>
    </div>
  );
};

export default FrontPage;
