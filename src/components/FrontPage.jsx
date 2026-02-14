import React, { useState, useEffect } from "react";
import "./FrontPage.css";

const FrontPage = () => {
  const words = [
    "Exam-Ready.",
    "Board-Prepared.",
    "Mentally Strong.",
    "Performance Confident."
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));

        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <div className="main-container">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">WeTestU</div>
        <div className="nav-right">
          <a href="#" className="book-btn">Book Your Seat</a>
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="top-section">

        <div className="left">
          <div className="hero-content">
            <h2>
              Tuition Teaches You.
              Offline Mock Tests Make You<br />
              <span className="typing">{displayText}</span>
            </h2>

            <p>
              Structured offline mock examinations for CBSE Classes 10, 11 & 12
              in a real board-style environment.
            </p>

            <button className="hero-btn">
              Register for Upcoming Mock Test
            </button>
          </div>
        </div>

        <div className="right">
  <div className="form-card">
    <h2>Register</h2>

    <form>
      <div className="input-group">
        <label>Student Name</label>
        <input type="text" placeholder="Enter your name" required />
      </div>

      <div className="input-group">
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" required />
      </div>

      <div className="input-group">
        <label>Mobile Number</label>
        <input type="tel" placeholder="Enter your mobile number" required />
      </div>

      <button type="submit" className="submit-btn">
        Register Now
      </button>
    </form>
  </div>
</div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom-section">
        <div className="box"><p>Proctored Exam</p></div>
        <div className="box"><p>Online / Offline Exam</p></div>
        <div className="box"><p>Near Your Location</p></div>
        <div className="box"><p>You Can Choose Subject</p></div>
        <div className="box"><p>Discount on Individual Subject</p></div>
      </div>

    </div>
  );
};

export default FrontPage;
