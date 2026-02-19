import React from "react";
import "./Cohort.css";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/class10new.png";
import img2 from "../assets/11.png";
import img3 from "../assets/class_12.png";

const Cohort = () => {
  const navigate = useNavigate();
  return (
    <div className="cohort-container">

      <div className="title">
        <h1>OUR AVAILABLE COHORTS</h1>
      </div>

      <div className="grid">

        {/* CLASS 10 */}
        <div className="card">
          <img src={img1} alt="Class 10" />
          <div className="overlay">
            <h2>Class 10</h2>
            <h3>Foundation Board Mastery</h3>

            <ul>
              <li>✔ Science, Maths, English</li>
              <li>✔ 15+ Chapter-wise Tests</li>
              <li>✔ 5 Full Syllabus Mock Exams</li>
              <li>✔ Detailed Written Feedback</li>
              <li>✔ Parent Progress Updates</li>
            </ul>

            <button onClick={() => navigate("/book-seat")}>
  Register Now
</button>
          </div>
        </div>

        {/* CLASS 11 */}
        <div className="card">
          <img src={img2} alt="Class 11" />
          <div className="overlay">
            <h2>Class 11</h2>
            <h3>Concept Reinforcement</h3>

            <ul>
              <li>✔ Physics, Chemistry, Maths</li>
              <li>✔ 20+ Chapter-wise Tests</li>
              <li>✔ Monthly Combined Mock</li>
              <li>✔ Performance Analytics Sheet</li>
              <li>✔ Exam Writing Strategy Session</li>
            </ul>

            <button onClick={() => navigate("/book-seat")}>
  Register Now
</button>
          </div>
        </div>

        {/* CLASS 12 */}
        <div className="card">
          <img src={img3} alt="Class 12" />
          <div className="overlay">
            <h2>Class 12</h2>
            <h3>Board + Competitive Focus</h3>

            <ul>
              <li>✔ Physics, Chemistry, Maths</li>
              <li>✔ 25+ Chapter-wise Tests</li>
              <li>✔ 8 Full Board Pattern Exams</li>
              <li>✔ Rank Prediction & Analysis</li>
              <li>✔ Personal Review Meeting</li>
            </ul>

            <button onClick={() => navigate("/book-seat")}>
  Register Now
</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cohort;
