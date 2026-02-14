import React from "react";
import "./FrontPage.css";

const FrontPage = () => {
  return (
    <div className="main-container">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">WeTestYou</div>
        <div className="nav-right">
          <a href="#" className="book-btn">Book Your Seat</a>
          <div>Log In</div>
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="top-section">

        <div className="left">
          <div className="hero-text">
            Tuitions Teach You.<br />
            <span>We Test You.</span>
          </div>
        </div>

        <div className="right">
          <form>
            <input type="text" placeholder="Student Name" required />
            <input type="tel" placeholder="Mobile Number" required />
            <input type="email" placeholder="Email Address" required />
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom-section">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>

    </div>
  );
};

export default FrontPage;
