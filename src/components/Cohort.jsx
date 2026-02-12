import "./Cohort.css";
function Cohort() {
  return (
    <>
      {/* HERO SECTION
      <section className="testing-hero">
        <div className="hero-content">
          <h1>
            Tuitions Teach You. <br />
            <span>We Test You.</span>
          </h1>

          <p className="hero-sub">
            Introducing the missing link to your board success.
            India’s first institute focused 100% on chapter-wise offline testing
            & rigorous feedback.
          </p>

          <div className="hero-target">
            <p><strong>Target:</strong> CBSE Boards</p>
            <p><strong>Classes:</strong> 10 | 11 | 12</p>
            <p><strong>Subjects:</strong> Physics • Chemistry • Maths • Science • English</p>
          </div>
        </div>
      </section>

      METHOD SECTION */}
      <section className="method-section">
        <h2>Our “Drill to Perfection” Method</h2>

        <div className="method-grid">
          <div className="method-card">
            <h4>Every Single Chapter</h4>
            <p>
              We conduct offline mock tests for every chapter.
              Single Chapter Tests + Combined Unit Tests.
            </p>
          </div>

          <div className="method-card">
            <h4>Real Feedback</h4>
            <p>
              Every paper manually evaluated. We don’t just give marks —
              we show where and why you lost them.
            </p>
          </div>

          <div className="method-card">
            <h4>Exam Temperament</h4>
            <p>
              Time management training, writing speed improvement,
              and confidence building before boards.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING COHORT SECTION */}
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

            <button className="choose-btn">Register Now</button>

            <ul>
              <li>✔ Science, Maths, English</li>
              <li>✔ 15+ Chapter-wise Tests</li>
              <li>✔ 5 Full Syllabus Mock Exams</li>
              <li>✔ Detailed Written Feedback</li>
              <li>✔ Parent Progress Updates</li>
            </ul>
          </div>

          {/* Class 11 - Highlighted */}
          <div className="pricing-card popular">
            <div className="badge">Most Enrolled</div>
            <h3>Class 11</h3>
            <p className="tagline">Strong Concept Reinforcement</p>

            <p className="old-price">₹5999</p>
            <h1 className="price">₹3999</h1>
            <p className="per">Complete Chapter Test Series</p>

            <button className="choose-btn dark">Register Now</button>

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

            <button className="choose-btn">Register Now</button>

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
    </>
  );
}

export default Cohort;
