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
import feature6 from "../assets/6_ribbon.png";

const words = [
  "Exam-Ready.",
  "Board-Prepared.",
  "Mentally Strong.",
  "Confident.",
];

/* PROGRAM DATA */
const programs = [
  { classValue: "10", label: "Class 10", theme: "yellow", icon: <FaLayerGroup /> },
  { classValue: "11", label: "Class 11", theme: "yellow", icon: <FaLayerGroup /> },
  { classValue: "12", label: "Class 12", theme: "yellow", icon: <FaLayerGroup /> },
];

/* FEATURE TEXT DATA */
const featureTexts = [
  "SUBJECT-WISE MOCK EXAMS",
  "REAL BOARD ATMOSPHERE",
  "EXPERT EVALUATION",
  "PERSONALIZED FEEDBACK",
  "DETAILED ANALYTICS",
  "CBSE CLASSES 10, 11 & 12",
  "MINDSET COACHING"
];

const FrontPage = () => {
  const navigate = useNavigate();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [showHero, setShowHero] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);

  /* Navigation */
  const handleBadgeClick = (selectedClass) => {
    scrollToCohorts(selectedClass);
  };

  /* ✅ Scroll to Cohorts and specific class */
  const scrollToCohorts = (classId) => {
    const section = document.getElementById("cohorts");
    if (section) {
      if (typeof classId === "string") {
        window.location.hash = classId;
        // Dispatch custom event in case hash hasn't changed
        window.dispatchEvent(new CustomEvent("cohort-navigate"));
      }
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Sequential Loading */
  useEffect(() => {
    setTimeout(() => setShowHero(true), 300);
    setTimeout(() => setShowPrograms(true), 1200);
    setTimeout(() => setShowFeatures(true), 1500);
  }, []);

  /* Banner Toggle */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
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
    <div className="main-container boutique-theme">
      {/* Dynamic Background Elements */}
      <div className="mesh-gradient"></div>
      <div className="grain-overlay"></div>
      <div className="glass-blob-1"></div>
      <div className="glass-blob-2"></div>

      {/* ================= BOUTIQUE HERO ================= */}
      <div className={`boutique-hero fade-section ${showHero ? "visible" : ""}`}>
        
        {/* Background Decorative Outline Text */}
        <div className="bg-outline-text">TEST PREP</div>

        <div className="boutique-wrapper">
          
          {/* LEFT — MASSIVE ARCHITECTURAL TEXT */}
          <div className="boutique-content">
            <div className="title-group">
              <h1 className="main-title solid">TUITION TEACHES YOU.</h1>
              <h1 className="main-title outline">MOCK TESTS MAKE YOU</h1>
            </div>
            
            <div className="typing-monolith">
              <span className="typing">{displayText}</span>
            </div>

            <div className="hero-description">
              <p>
                A high-performance offline subject-wise mock examination system 
                engineered for CBSE Classes 10, 11 & 12.
              </p>
            </div>

            {/* INTEGRATED PROGRAM BADGES (Repositioned) */}
            <div className={`program-badges ${showPrograms ? "visible" : ""}`}>
              {programs.map((item, index) => (
                <div
                  key={index}
                  className="badge-card"
                  onClick={() => handleBadgeClick(item.classValue)}
                >
                  <span className="badge-label">{item.label}</span>
                  <span className="badge-arrow">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — THE GLASS MONOLITH (BANNERS) */}
          <div className="monolith-banners">
            <div className="monolith-track">
              <div
                className={`monolith-banner ${activeBanner === 0 ? "active" : ""}`}
                onClick={scrollToCohorts}
              >
                <div className="m-tag">OFFER</div>
                <div className="m-title">STARTS AT</div>
                
                <div className="m-details">
                  <span>• ALL CHAPTERS INCLUDED</span>
                  <span>• FOR ANY ONE SUBJECT</span>
                  <span>• EXPERT FEEDBACK</span>
                </div>

                <div className="m-price">₹2000</div>
                <div className="m-cta">EXPLORE NOW</div>
              </div>

              <div
                className={`monolith-banner ${activeBanner === 1 ? "active" : ""}`}
                onClick={scrollToCohorts}
              >
                <div className="m-tag">BOARDS</div>
                <div className="m-title">CBSE FOCUSED</div>
                
                <div className="m-details">
                  <span>• SYLLABUS-ALIGNED</span>
                  <span>• LATEST PATTERNS</span>
                  <span>• EVALUATION READY</span>
                </div>

                <div className="m-classes">10 • 11 • 12</div>
                <div className="m-cta">JOIN THE COHORT</div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= INTEGRATED CINEMATIC TEXT TICKER ================= */}
        <div className={`boutique-strip fade-section ${showFeatures ? "visible" : ""}`}>
          <div className="ticker-container">
            <div className="ticker-track">
              {[...featureTexts, ...featureTexts].map((text, index) => (
                <div key={index} className="ticker-item">
                  <span className="dot">•</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FrontPage;