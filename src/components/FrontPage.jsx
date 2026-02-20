import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaLayerGroup } from "react-icons/fa";
import ribbon from "../assets/ribbon.png";
import "./FrontPage.css";
import class10bg from "../assets/class10.png";
import class11bg from "../assets/class11.png";
import class12bg from "../assets/class12.png";

const words = [
  "Exam-Ready.",
  "Board-Prepared.",
  "Mentally Strong.",
  "Performance Confident."
];

const programs = [
  { className: "Class 10", division: "Fasttrack Division", icon: <FaRocket />, bg: class10bg},
  { className: "Class 11", division: "Fasttrack Division", icon: <FaRocket />, bg: class11bg },
  { className: "Class 12", division: "Fasttrack Division", icon: <FaRocket />, bg: class12bg },
  { className: "Class 10", division: "Concrete Division", icon: <FaLayerGroup />, bg: class10bg },
  { className: "Class 11", division: "Concrete Division", icon: <FaLayerGroup />, bg: class11bg },
  { className: "Class 12", division: "Concrete Division", icon: <FaLayerGroup />, bg: class12bg }
];

const FrontPage = () => {
  const navigate = useNavigate();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
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

      {/* HERO SECTION */}
      <div className="top-section">
        <div className="hero-content">

          <h1 className="top-text">
            Tuition Teaches You.<br />
            Offline Mock Tests Make You
          </h1>

          <div className="typing-line">
            <span className="typing">{displayText}</span>
          </div>

          <p>
            Structured offline mock examinations for CBSE Classes 10, 11 & 12
            in a real board-style environment.
          </p>

        </div>
      </div>

      {/* PROGRAM GRID */}
      {/* PROGRAM GRID */}
<div className="program-grid">
  {programs.map((item, index) => (
    <div
      key={index}
      className={`program-card ${item.highlight ? "highlight-card" : ""}`}
      style={{
        backgroundImage: `url(${item.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onClick={() => navigate("/book-seat")}
    >
      <div className="card-overlay"></div>

      <div className="program-content">
        <div className="program-icon">{item.icon}</div>
        <h3>{item.className}</h3>
        <p>{item.division}</p>
        <span className="cta-text">Explore →</span>
      </div>
    </div>
  ))}
</div>

      {/* FULL WIDTH RIBBON */}
      <div className="ribbon-wrapper">
        <img src={ribbon} alt="features" />
      </div>

    </div>
  );
};

export default FrontPage;