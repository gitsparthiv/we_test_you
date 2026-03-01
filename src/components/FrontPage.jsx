import React from "react";
import "./FrontPage.css";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleRegister = (selectedClass, selectedBatch) => {
    navigate("/book-seat", {
      state: { selectedClass, selectedBatch },
    });
  };

  return (
    <div className="main-container">

      {/* ================= HERO SECTION ================= */}
      <div className="top-section">
        <div className="hero-content">
          <h1 className="top-text">
            Master Your Boards with <br /> Smart Testing
          </h1>
          <p>
            Structured mock tests, performance tracking, and exam strategy
            guidance for Classes 10, 11 & 12.
          </p>
        </div>
      </div>

      {/* ================= PROGRAM GRID ================= */}
      <div className="program-grid">

        {/* CLASS 10 Fastrack */}
        <div
          className="program-card yellow"
          onClick={() => handleRegister("10", "Fastrack")}
        >
          <div className="program-content">
            <h3>Class 10 Fastrack</h3>
            <p>Chapter-wise Tests + Full Mocks</p>
          </div>
        </div>

        {/* CLASS 10 Concrete */}
        <div
          className="program-card black"
          onClick={() => handleRegister("10", "Concrete")}
        >
          <div className="program-content">
            <h3>Class 10 Concrete</h3>
            <p>Full Mock Practice Only</p>
          </div>
        </div>

        {/* CLASS 11 Fastrack */}
        <div
          className="program-card yellow"
          onClick={() => handleRegister("11", "Fastrack")}
        >
          <div className="program-content">
            <h3>Class 11 Fastrack</h3>
            <p>Subject Deep Testing + Analytics</p>
          </div>
        </div>

        {/* CLASS 11 Concrete */}
        <div
          className="program-card black"
          onClick={() => handleRegister("11", "Concrete")}
        >
          <div className="program-content">
            <h3>Class 11 Concrete</h3>
            <p>Board Pattern Simulations</p>
          </div>
        </div>

        {/* CLASS 12 Fastrack */}
        <div
          className="program-card yellow"
          onClick={() => handleRegister("12", "Fastrack")}
        >
          <div className="program-content">
            <h3>Class 12 Fastrack</h3>
            <p>Advanced + Competitive Focus</p>
          </div>
        </div>

        {/* CLASS 12 Concrete */}
        <div
          className="program-card black"
          onClick={() => handleRegister("12", "Concrete")}
        >
          <div className="program-content">
            <h3>Class 12 Concrete</h3>
            <p>Strict Exam Hall Simulation</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FrontPage;