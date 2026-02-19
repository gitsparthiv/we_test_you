import React from "react";
import "./OurSpace.css";
import bgImage from "../assets/our_class2-modified.jpg";

const OurSpace = () => {
  return (
    <section className="hero-section">

      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="content-box">
          <h1>
            PROCTORED<br />EXAMINATION CENTRE
          </h1>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track">
          
          <div className="ticker-content">
            <span>/ Proctored Exam </span>
            <span>/ Online / Offline Exam </span>
            <span>/ Near Your Location </span>
            <span>/ You Can Choose Subject </span>
            <span>/ Discount on Individual Subject </span>
          </div>

          <div className="ticker-content">
            <span>/ Proctored Exam </span>
            <span>/ Online / Offline Exam </span>
            <span>/ Near Your Location </span>
            <span>/ You Can Choose Subject </span>
            <span>/ Discount on Individual Subject </span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default OurSpace;
