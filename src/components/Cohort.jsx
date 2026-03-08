import React, { useEffect, useState, useRef } from "react";
import "./Cohort.css";
import { useNavigate, useLocation } from "react-router-dom";
import Papa from "papaparse";
import img1 from "../assets/class10pic.jpeg";
import img2 from "../assets/11.png";
import img3 from "../assets/class_12mew.png";

const Price = ({ actual, old }) => {
  return (
    <div className="price-box">
      <div className="price-row">
        <span className="price-amount">₹{actual}</span>
        {old > 0 && <span className="price-old">₹{old}</span>}
      </div>
    </div>
  );
};

const Cohort = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prices, setPrices] = useState({});
  const [visible, setVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sectionRef = useRef(null);

  const cohortData = [
    {
      id: "10",
      title: "CLASS 10",
      target: "Academic Year 2027",
      image: img1,
      subjects: ["Science", "Mathematics", "English"],
      features: [
        "Chapter-wise Fortnightly <strong>Concept Sprint Tests</strong>",
        "<strong>16 Full Syllabus</strong> \"Test Drive\" Mock Tests (Dec 2026)",
        "<strong>3 Hour Board Pattern</strong> Proctored Evaluation",
        "<strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & Answer Keys",
        "<strong>Easy repeat schedule</strong> for Defaulters",
        "<strong>Tips and Traps Counselling</strong> & Performance Analysis",
      ],
    },
    {
      id: "11",
      title: "CLASS 11",
      target: "Academic Year 2027",
      image: img2,
      subjects: ["Physics", "Chemistry", "Mathematics", "English"],
      features: [
        "Comprehensive <strong>Chapter-wise Fortnightly</strong> Tests",
        "<strong>24 Full Syllabus</strong> \"Test Drive\" Mock Tests (Dec 2026)",
        "<strong>3 Hour Board Pattern</strong> Proctored Evaluation",
        "<strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & Answer Keys",
        "<strong>Easy repeat schedule</strong> for Defaulters",
        "<strong>Multiple Dates</strong> for Same Chapter & Performance Tracking",
      ],
    },
    {
      id: "12",
      title: "CLASS 12",
      target: "Academic Year 2027",
      image: img3,
      subjects: ["Physics", "Chemistry", "Mathematics", "English"],
      features: [
        "<strong>Advanced Chapter-wise</strong> Competitive + Board Tests",
        "<strong>24 Full Syllabus</strong> \"Test Drive\" Mock Tests (Dec 2026)",
        "<strong>3 Hour Board Pattern</strong> Proctored Evaluation",
        "<strong>Strategic Exam Mentorship</strong> & Time Optimization",
        "Comprehensive <strong>Performance & Rank Prediction</strong> Analysis",
        "<strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & Tips/Traps",
      ],
    },
  ];

  const handleRegister = (selectedClass) => {
    navigate("/book-seat", {
      state: { selectedClass },
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    
    const handleHashChange = () => {
      const classId = window.location.hash.replace("#", "");
      if (classId) {
        const index = cohortData.findIndex(item => item.id === classId);
        if (index !== -1) {
          setActiveCardIndex(index);
          // Small delay to ensure state update before scroll if needed
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("cohort-navigate", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("cohort-navigate", handleHashChange);
    };
  }, [location.hash]);

  useEffect(() => {
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/15SpbmC9rnJUTLFUFZk9VhUqfBUvH9B1bgAdYhUdCirs/export?format=csv";

    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsed = {};
            result.data.forEach((row) => {
              const className = row.Class;
              const concreteActual = Number(row.actualConcrete || 0);
              const concreteOld = Number(row.oldConcretePrice || 0);

              if (!parsed[className]) {
                parsed[className] = {
                  singleActual: concreteActual,
                  singleOld: concreteOld,
                  allActual: 0,
                  allOld: 0,
                };
              }
              parsed[className].allActual += concreteActual;
              parsed[className].allOld += concreteOld;
            });
            setPrices(parsed);
          },
        });
      })
      .catch((err) => console.error("Sheet fetch error:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cohortData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cohortData.length]);

  const prevSlide = () => {
    setActiveCardIndex((prev) => (prev - 1 + cohortData.length) % cohortData.length);
  };

  const nextSlide = () => {
    setActiveCardIndex((prev) => (prev + 1) % cohortData.length);
  };

  const currentCohort = cohortData[activeCardIndex];

  return (
    <section className="cohort-section" id="cohorts" ref={sectionRef}>
      <div className={`cohort-wrapper fade-up ${visible ? "visible" : ""}`}>
        
        {/* Navigation Arrows */}
        <div className="slider-nav">
          <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="nav-btn next" onClick={nextSlide} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="cohort-card-monolith">
          <div className="card-bg-visual">
            <img src={currentCohort.image} alt={currentCohort.title} />
            <div className="card-gradient-overlay"></div>
          </div>

          <div className="card-glass-content">
            <div className="card-top-header">
              <div className="class-badge">CLASS {currentCohort.id}</div>
              <div className="target-text">FOR {currentCohort.target}</div>
            </div>

            <div className="card-main-body">
              <div className="left-panel">
                <h2 className="cohort-card-title">{currentCohort.title} PROGRAM</h2>
                <div className="cohort-subject-row">
                  {currentCohort.subjects.map(sub => (
                    <span key={sub} className="subject-item">{sub}</span>
                  ))}
                </div>
                <div className="price-monolith">
                   <div className="price-item">
                      <span className="price-tag">SINGLE SUBJECT</span>
                      <Price 
                        actual={prices[currentCohort.id]?.singleActual || 0} 
                        old={prices[currentCohort.id]?.singleOld || 0} 
                      />
                   </div>
                   <div className="price-separator"></div>
                   <div className="price-item">
                      <span className="price-tag">FULL COHORT</span>
                      <Price 
                        actual={prices[currentCohort.id]?.allActual || 0} 
                        old={prices[currentCohort.id]?.allOld || 0} 
                      />
                   </div>
                </div>
              </div>

              <div className="right-panel">
                <div className="features-container">
                  <h3 className="features-title">CURRICULUM HIGHLIGHTS</h3>
                  <ul className="features-grid">
                    {currentCohort.features.map((feature, i) => (
                      <li key={i}>
                        <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d7ff45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span dangerouslySetInnerHTML={{ __html: feature }}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-action-bar">
               <div className="disclaimer-note">
                  * INDICATIVE EVALUATION CHARGES ONLY. TUTORIALS NOT INCLUDED.
               </div>
               <button className="cohort-cta-btn" onClick={() => handleRegister(currentCohort.id)}>
                 RESERVE YOUR SLOT <span className="btn-arrow">→</span>
               </button>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="slider-indicators">
          {cohortData.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${index === activeCardIndex ? "active" : ""}`}
              onClick={() => setActiveCardIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Cohort;
