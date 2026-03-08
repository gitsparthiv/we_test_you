import React, { useEffect, useState, useRef } from "react";
import "./Cohort.css";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import img1 from "../assets/class10new.png";
import img2 from "../assets/11.png";
import img3 from "../assets/class_12.png";

/* ================= PRICE COMPONENT ================= */
const Price = ({ actual, old }) => {
  return (
    <div className="price">
      <span className="old-price">₹{old}</span>
      <span className="new-price">₹{actual}</span>
    </div>
  );
};

const Cohort = () => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState({});
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleRegister = (selectedClass, selectedBatch) => {
    navigate("/book-seat", {
      state: { selectedClass, selectedBatch },
    });
  };

  /* ================= SCROLL ANIMATION ================= */
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
    return () => observer.disconnect();
  }, []);

  /* ================= FETCH PRICES FROM NEW SHEET ================= */
  useEffect(() => {

    /* 🔵 PASTE YOUR NEW SPREADSHEET CSV LINK HERE */
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
              const subject = row.subject;

              const fastrackActual = Number(row.actualFastrackPrice || 0);
              const fastrackOld = Number(row.oldfastrackPrice || 0);

              const concreteActual = Number(row.actualConcrete || 0);
              const concreteOld = Number(row.oldConcretePrice || 0);

              if (!parsed[className]) {
                parsed[className] = {
                  fastrackActual: fastrackActual,
                  fastrackOld: fastrackOld,
                  singleActual: concreteActual,
                  singleOld: concreteOld,
                  allActual: 0,
                  allOld: 0,
                  subjectCount: 0,
                };
              }

              parsed[className].allActual += concreteActual;
              parsed[className].allOld += concreteOld;

              parsed[className].subjectCount += 1;
            });

            setPrices(parsed);
          },
        });
      })
      .catch((err) => console.error("Sheet fetch error:", err));

  }, []);

  return (
    <div className="cohort-container" id="cohorts" ref={sectionRef}>
      <div className={`title fade-up ${visible ? "visible" : ""}`}>
        <h1>OUR AVAILABLE COHORTS</h1>
      </div>

      <div className={`grid fade-up ${visible ? "visible" : ""}`}>

        {/* ================= CLASS 10 ================= */}
        <div className="card">
          <img src={img1} alt="Class 10" />
          <div className="overlay">
            <div className="card-header">
              <h2>CLASS 10 (For 2027)</h2>
              <div className="class-starting-price">
                <span className="starting-text">Starts as low as</span> 
                <span className="starting-price">₹{prices["10"]?.singleActual || 0}</span>
              </div>
            </div>

            <div className="subject-pills">
              <span>Science</span>
              <span>Mathematics</span>
              <span>English</span>
            </div>

            <div className="unified-content">
              <div className="points-grid">
                <ul className="feature-list">
                  <li>✔ <strong>Chapter-wise Fortnightly</strong> Concept Sprint Tests</li>
                  <li>✔ <strong>16 Full Syllabus</strong> "Test Drive" Mock Tests (Dec 2026)</li>
                  <li>✔ <strong>3 Hour Board Pattern</strong> Proctored Evaluation</li>
                  <li>✔ <strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & <strong>Answer Keys</strong></li>
                  <li>✔ <strong>Easy repeat schedule</strong> for Defaulters</li>
                  <li>✔ <strong>Tips and Traps Counselling</strong> & <strong>Performance Analysis</strong></li>
                </ul>
              </div>

              <div className="card-footer">
                <div className="pricing-container">
                  <div className="price-item">
                    <span className="price-label">Single Subject</span>
                    <Price
                      actual={prices["10"]?.singleActual || 0}
                      old={prices["10"]?.singleOld || 0}
                    />
                  </div>
                  <div className="price-item">
                    <span className="price-label">Full Package</span>
                    <Price
                      actual={prices["10"]?.allActual || 0}
                      old={prices["10"]?.allOld || 0}
                    />
                  </div>
                </div>
                <button className="register-btn" onClick={() => handleRegister("10")}>
                  Register Now
                </button>
              </div>
              <div className="card-disclaimer">
                * These are just test conduction charges and not tutorial classes
              </div>
            </div>
          </div>
        </div>

        {/* ================= CLASS 11 ================= */}
        <div className="card">
          <img src={img2} alt="Class 11" />
          <div className="overlay">
            <div className="card-header">
              <h2>CLASS 11 (For 2027)</h2>
              <div className="class-starting-price">
                <span className="starting-text">Starts as low as</span> 
                <span className="starting-price">₹{prices["11"]?.singleActual || 0}</span>
              </div>
            </div>

            <div className="subject-pills">
              <span>Physics</span>
              <span>Chemistry</span>
              <span>Mathematics</span>
              <span>English</span>
            </div>

            <div className="unified-content">
              <div className="points-grid">
                <ul className="feature-list">
                  <li>✔ Comprehensive <strong>Chapter-wise Fortnightly</strong> Tests</li>
                  <li>✔ <strong>24 Full Syllabus</strong> "Test Drive" Mock Tests (Dec 2026)</li>
                  <li>✔ <strong>3 Hour Board Pattern</strong> Proctored Evaluation</li>
                  <li>✔ <strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & <strong>Answer Keys</strong></li>
                  <li>✔ <strong>Easy repeat schedule</strong> for Defaulters</li>
                  <li>✔ <strong>Multiple Dates</strong> for Same Chapter & <strong>Performance Tracking</strong></li>
                </ul>
              </div>

              <div className="card-footer">
                <div className="pricing-container">
                  <div className="price-item">
                    <span className="price-label">Single Subject</span>
                    <Price
                      actual={prices["11"]?.singleActual || 0}
                      old={prices["11"]?.singleOld || 0}
                    />
                  </div>
                  <div className="price-item">
                    <span className="price-label">Full Package</span>
                    <Price
                      actual={prices["11"]?.allActual || 0}
                      old={prices["11"]?.allOld || 0}
                    />
                  </div>
                </div>
                <button className="register-btn" onClick={() => handleRegister("11")}>
                  Register Now
                </button>
              </div>
              <div className="card-disclaimer">
                * These are just test conduction charges and not tutorial classes
              </div>
            </div>
          </div>
        </div>

        {/* ================= CLASS 12 ================= */}
        <div className="card">
          <img src={img3} alt="Class 12" />
          <div className="overlay">
            <div className="card-header">
              <h2>CLASS 12 (For 2027)</h2>
              <div className="class-starting-price">
                <span className="starting-text">Starts as low as</span> 
                <span className="starting-price">₹{prices["12"]?.singleActual || 0}</span>
              </div>
            </div>

            <div className="subject-pills">
              <span>Physics</span>
              <span>Chemistry</span>
              <span>Mathematics</span>
              <span>English</span>
            </div>

            <div className="unified-content">
              <div className="points-grid">
                <ul className="feature-list">
                  <li>✔ <strong>Advanced Chapter-wise</strong> Competitive + Board Tests</li>
                  <li>✔ <strong>24 Full Syllabus</strong> "Test Drive" Mock Tests (Dec 2026)</li>
                  <li>✔ <strong>3 Hour Board Pattern</strong> Proctored Evaluation</li>
                  <li>✔ <strong>Strategic Exam Mentorship</strong> & <strong>Time Optimization</strong></li>
                  <li>✔ Comprehensive <strong>Performance & Rank Prediction</strong> Analysis</li>
                  <li>✔ <strong>Quick Evaluation</strong> with <strong>Live Explanation</strong> & Tips/Traps</li>
                </ul>
              </div>

              <div className="card-footer">
                <div className="pricing-container">
                  <div className="price-item">
                    <span className="price-label">Single Subject</span>
                    <Price
                      actual={prices["12"]?.singleActual || 0}
                      old={prices["12"]?.singleOld || 0}
                    />
                  </div>
                  <div className="price-item">
                    <span className="price-label">Full Package</span>
                    <Price
                      actual={prices["12"]?.allActual || 0}
                      old={prices["12"]?.allOld || 0}
                    />
                  </div>
                </div>
                <button className="register-btn" onClick={() => handleRegister("12")}>
                  Register Now
                </button>
              </div>
              <div className="card-disclaimer">
                * These are just test conduction charges and not tutorial classes
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cohort;