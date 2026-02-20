import React, { useState, useEffect } from "react";
import ribbon from "../assets/ribbon.png";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";

 const words = [
    "Exam-Ready.",
    "Board-Prepared.",
    "Mentally Strong.",
    "Performance Confident."
  ];

const FrontPage = () => {
  const navigate = useNavigate();

 
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

      {/* TOP SECTION */}
      <div className="top-section">
        <div className="left">
          <div className="hero-content">
            <h2>
              Tuition Teaches You.<br/>
              Offline Mock Tests Make You<br />
              <span className="typing">{displayText}</span>
            </h2>

            <p>
              Structured offline mock examinations for CBSE Classes 10, 11 & 12
              in a real board-style environment.
            </p>
          </div>
        </div>
      </div>

      <div className="floating-box">
        <p>
          Step into structured offline mock exams  
          designed to boost your board confidence.
        </p>

        <button
          className="floating-btn"
          onClick={() => navigate("/book-seat")}
        >
          <span>Book Your Seat</span>
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="ribbon-wrapper">
        <img
          src={ribbon}
          alt="features ribbon"
          className="bottom-left-ribbon"
        />
      </div>

    </div>
  );
};

export default FrontPage;