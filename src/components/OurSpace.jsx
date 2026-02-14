import React from "react";
import "./OurSpace.css";
import bgImage from "../assets/our_class2.jpg";

const OurSpace = () => {
  return (
    <section className="hero-section">

      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="content-box">
          <h1>
            EXPLORE OUR<br />NEW SPACE
          </h1>

          {/* <p>
            We are a trusted fitness community with an energetic, urban soul,
            led by elite trainers who are as invested in your journey as you are.
            We believe in training with purpose.
          </p> */}
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track">
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>

          {/* duplicate for smooth infinite scroll */}
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
          <span>/ CHECK OUT OUR NEW SPACE</span>
        </div>
      </div>

    </section>
  );
};

export default OurSpace;
