import "./Cohort.css";
function Cohort({ onSelect }) {

  const handleSelect = (cohort, price) => {
    // send selected cohort + price to parent
    if (onSelect) {
      onSelect({ cohort, price });
    }

    // scroll to register section
    const registerSection = document.getElementById("register-section");
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pricing-section">
      <h2>Choose Your Testing Cohort</h2>
      <p className="pricing-sub">
        Admissions Open Now – Limited Seats Per Batch
      </p>

      <div className="pricing-grid">

        {/* Class 10 */}
        <div className="pricing-card">
          <h3>Class 10</h3>
          <p className="tagline">Foundation Board Mastery</p>

          <p className="old-price">₹4999</p>
          <h1 className="price">₹2999</h1>
          <p className="per">Complete Chapter Test Series</p>

          <button
            className="choose-btn"
            onClick={() => handleSelect("Class 10", 2999)}
          >
            Register Now
          </button>

          <ul>
            <li>✔ Science, Maths, English</li>
            <li>✔ 15+ Chapter-wise Tests</li>
            <li>✔ 5 Full Syllabus Mock Exams</li>
            <li>✔ Detailed Written Feedback</li>
            <li>✔ Parent Progress Updates</li>
          </ul>
        </div>

        {/* Class 11 */}
        <div className="pricing-card popular">
          <div className="badge">Most Enrolled</div>
          <h3>Class 11</h3>
          <p className="tagline">Strong Concept Reinforcement</p>

          <p className="old-price">₹5999</p>
          <h1 className="price">₹3999</h1>
          <p className="per">Complete Chapter Test Series</p>

          <button
            className="choose-btn dark"
            onClick={() => handleSelect("Class 11", 3999)}
          >
            Register Now
          </button>

          <ul>
            <li>✔ Physics, Chemistry, Maths</li>
            <li>✔ 20+ Chapter-wise Tests</li>
            <li>✔ Monthly Combined Mock</li>
            <li>✔ Performance Analytics Sheet</li>
            <li>✔ Exam Writing Strategy Session</li>
          </ul>
        </div>

        {/* Class 12 */}
        <div className="pricing-card">
          <h3>Class 12</h3>
          <p className="tagline">Board + Competitive Focus</p>

          <p className="old-price">₹6999</p>
          <h1 className="price">₹4999</h1>
          <p className="per">Complete Chapter Test Series</p>

          <button
            className="choose-btn"
            onClick={() => handleSelect("Class 12", 4999)}
          >
            Register Now
          </button>

          <ul>
            <li>✔ Physics, Chemistry, Maths</li>
            <li>✔ 25+ Chapter-wise Tests</li>
            <li>✔ 8 Full Board Pattern Exams</li>
            <li>✔ Rank Prediction & Analysis</li>
            <li>✔ Personal Review Meeting</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default Cohort;
