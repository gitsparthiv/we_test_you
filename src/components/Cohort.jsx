import React from "react";
import "./Cohort.css";

import img1 from "../assets/3gin9vh8_cbse-_625x300_19_December_24.webp";
import img2 from "../assets/creating-mock-test-scenarios-ar-generative-ai_1198295-118233.jpg";
import img3 from "../assets/exam-hall.webp";

const Cohort = () => {
  return (
    <div className="main">

      <div className="title">
        <h1>THE R/NESS DIFFERENCE</h1>
      </div>

      <div className="grid">

        <div className="card">
          <img src={img1} alt="Elite Trainers" />
          <div className="text">
            ELITE TRAINERS<br />YOU CAN TRUST
          </div>
        </div>

        <div className="card">
          <img src={img2} alt="Workouts" />
          <div className="text">
            WORKOUTS THAT<br />DELIVER RESULTS
          </div>
        </div>

        <div className="card">
          <img src={img3} alt="Urban Energy" />
          <div className="text">
            AN UNMATCHED<br />URBAN ENERGY
          </div>
        </div>

        <div className="card">
          <img src={img1} alt="Community" />
          <div className="text">
            A COMMUNITY THAT<br />INSPIRES
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cohort;
