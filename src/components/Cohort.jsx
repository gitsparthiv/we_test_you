import React from "react";
import "./Cohort.css";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/class10new.png";
import img2 from "../assets/11.png";
import img3 from "../assets/class_12.png";

const Cohort = () => {
  const navigate = useNavigate();

  // ✅ Reusable navigation function
  const handleRegister = (selectedClass, selectedBatch) => {
    navigate("/book-seat", {
      state: {
        selectedClass,
        selectedBatch
      }
    });
  };

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
            <h2>CLASS 10</h2>

            <div className="division-title">Choose Your Division</div>

            <div className="division-box">
              <h3>Fastrack Division</h3>
              <p>Science, Maths, English</p>
              <div className="price">₹1800</div>
              <button onClick={() => handleRegister("10", "Fastrack")}>
                Register Now
              </button>
            </div>

            <div className="division-box">
              <h3>Concrete Division</h3>
              <p>Any 1 Subject</p>
              <div className="price">₹1200</div>
              <button onClick={() => handleRegister("10", "Concrete")}>
                Register Now
              </button>
            </div>

          </div>
        </div>

        {/* CLASS 11 */}
        <div className="card">
          <img src={img2} alt="Class 11" />
          <div className="overlay">
            <h2>CLASS 11</h2>

            <div className="division-title">Choose Your Division</div>

            <div className="division-box">
              <h3>Fastrack Division</h3>
              <p>Physics, Chemistry, Maths</p>
              <div className="price">₹2000</div>
              <button onClick={() => handleRegister("11", "Fastrack")}>
                Register Now
              </button>
            </div>

            <div className="division-box">
              <h3>Concrete Division</h3>
              <p>Physics + Chemistry</p>
              <div className="price">₹1500</div>
              <button onClick={() => handleRegister("11", "Concrete")}>
                Register Now
              </button>
            </div>

          </div>
        </div>

        {/* CLASS 12 */}
        <div className="card">
          <img src={img3} alt="Class 12" />
          <div className="overlay">
            <h2>CLASS 12</h2>

            <div className="division-title">Choose Your Division</div>

            <div className="division-box">
              <h3>Fastrack Division</h3>
              <p>Physics, Chemistry, Maths</p>
              <div className="price">₹2200</div>
              <button onClick={() => handleRegister("12", "Fastrack")}>
                Register Now
              </button>
            </div>

            <div className="division-box">
              <h3>Concrete Division</h3>
              <p>Physics + Chemistry</p>
              <div className="price">₹1500</div>
              <button onClick={() => handleRegister("12", "Concrete")}>
                Register Now
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Cohort;