import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaLayerGroup } from "react-icons/fa";
import "./FrontPage.css";

/* FEATURE IMAGES */
import feature1 from "../assets/1_ribbon.png";
import feature2 from "../assets/2_ribbon.png";
import feature3 from "../assets/3_ribbon.png";
import feature4 from "../assets/4_ribbon.png";
import feature5 from "../assets/5_ribbon.png";

const words = [
  "Exam-Ready.",
  "Board-Prepared.",
  "Mentally Strong.",
  "Performance Confident."
];

const programs = [
  { classValue: "10", division: "Fastrack", label: "Fasttrack Division", theme: "yellow", icon: <FaRocket /> },
  { classValue: "10", division: "Concrete", label: "Concrete Division", theme: "yellow", icon: <FaLayerGroup /> },

  { classValue: "11", division: "Fastrack", label: "Fasttrack Division", theme: "black", icon: <FaRocket /> },
  { classValue: "11", division: "Concrete", label: "Concrete Division", theme: "black", icon: <FaLayerGroup /> },

  { classValue: "12", division: "Fastrack", label: "Fasttrack Division", theme: "yellow", icon: <FaRocket /> },
  { classValue: "12", division: "Concrete", label: "Concrete Division", theme: "yellow", icon: <FaLayerGroup /> }
];

const FrontPage = () => {
  const navigate = useNavigate();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [showHero, setShowHero] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  /* Navigate with state */
  const handleRegister = (selectedClass, selectedBatch) => {
    navigate("/book-seat", {
      state: { selectedClass, selectedBatch }
    });
  };

  /* Sequential Loading */
  useEffect(() => {
    setTimeout(() => setShowHero(true), 300);
    setTimeout(() => setShowPrograms(true), 1200);
    setTimeout(() => setShowFeatures(true), 2200);
  }, []);

  /* Typing Effect */
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

      {/* HERO */}
      <div className={`top-section fade-section ${showHero ? "visible" : ""}`}>
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
      <div className={`program-grid fade-section ${showPrograms ? "visible" : ""}`}>
        {programs.map((item, index) => (
          <div
            key={index}
            className={`program-card ${item.theme}`}
            onClick={() => handleRegister(item.classValue, item.division)}
          >
            <div className="program-content">
              <div className="program-icon">{item.icon}</div>
              <h3>Class {item.classValue}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div className={`features-section fade-section ${showFeatures ? "visible" : ""}`}>
        <img src={feature1} alt="" />
        <img src={feature2} alt="" />
        <img src={feature3} alt="" />
        <img src={feature4} alt="" />
        <img src={feature5} alt="" />
      </div>

    </div>
  );
};

export default FrontPage;