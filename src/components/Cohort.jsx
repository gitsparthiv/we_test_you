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
            <h2>CLASS 10</h2>
            <div className="class-starting-price">
              Starts as low as <span>₹{prices["10"]?.singleActual || 0}</span>
            </div>

            <div className="division-row">
              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Full Mock Practice</li>
                  <li>✔ Board Pattern Simulation</li>
                  <li>✔ Time Management Focus</li>
                  <li>✔ Detailed Report Card</li>
                </ul>

                <Price
                  actual={prices["10"]?.fastrackActual || 0}
                  old={prices["10"]?.fastrackOld || 0}
                />

                <button onClick={() => handleRegister("10", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Chapter-wise Testing</li>
                  <li>✔ Full-Length Mock Exams</li>
                  <li>✔ Performance Analytics</li>
                  <li>✔ Exam Strategy Guidance</li>
                </ul>

                <div className="price-group">
                  <div className="price-label">Single Subject</div>
                  <Price
                    actual={prices["10"]?.singleActual || 0}
                    old={prices["10"]?.singleOld || 0}
                  />
                </div>

                <div className="price-group bundle-group">
                  <div className="price-label">All Subjects</div>
                  <Price
                    actual={prices["10"]?.allActual || 0}
                    old={prices["10"]?.allOld || 0}
                  />
                </div>

                <button onClick={() => handleRegister("10", "Concrete")}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CLASS 11 ================= */}
        <div className="card">
          <img src={img2} alt="Class 11" />
          <div className="overlay">
            <h2>CLASS 11</h2>
            <div className="class-starting-price">
              Starts as low as <span>₹{prices["11"]?.singleActual || 0}</span>
            </div>

            <div className="division-row">
              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Only Full Mock Practice</li>
                  <li>✔ Board-Level Question Patterns</li>
                  <li>✔ Time-bound Simulation Tests</li>
                  <li>✔ Detailed Evaluation Report</li>
                </ul>

                <Price
                  actual={prices["11"]?.fastrackActual || 0}
                  old={prices["11"]?.fastrackOld || 0}
                />

                <button onClick={() => handleRegister("11", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Subject-wise Deep Testing</li>
                  <li>✔ Monthly Full Mock Exams</li>
                  <li>✔ Concept Reinforcement Focus</li>
                  <li>✔ Performance Tracking Dashboard</li>
                </ul>

                <div className="price-group">
                  <div className="price-label">Single Subject</div>
                  <Price
                    actual={prices["11"]?.singleActual || 0}
                    old={prices["11"]?.singleOld || 0}
                  />
                </div>

                <div className="price-group bundle-group">
                  <div className="price-label">All Subjects</div>
                  <Price
                    actual={prices["11"]?.allActual || 0}
                    old={prices["11"]?.allOld || 0}
                  />
                </div>

                <button onClick={() => handleRegister("11", "Concrete")}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CLASS 12 ================= */}
        <div className="card">
          <img src={img3} alt="Class 12" />
          <div className="overlay">
            <h2>CLASS 12</h2>
            <div className="class-starting-price">
              Starts as low as <span>₹{prices["12"]?.singleActual || 0}</span>
            </div>

            <div className="division-row">
              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Full-Length Board Mocks</li>
                  <li>✔ Strict Exam Hall Simulation</li>
                  <li>✔ Time Optimization Strategy</li>
                  <li>✔ Comprehensive Performance Report</li>
                </ul>

                <Price
                  actual={prices["12"]?.fastrackActual || 0}
                  old={prices["12"]?.fastrackOld || 0}
                />

                <button onClick={() => handleRegister("12", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Advanced Chapter-wise Tests</li>
                  <li>✔ Competitive + Board Pattern</li>
                  <li>✔ Rank Prediction Analysis</li>
                  <li>✔ Strategic Exam Mentorship</li>
                </ul>

                <div className="price-group">
                  <div className="price-label">Single Subject</div>
                  <Price
                    actual={prices["12"]?.singleActual || 0}
                    old={prices["12"]?.singleOld || 0}
                  />
                </div>

                <div className="price-group bundle-group">
                  <div className="price-label">All Subjects</div>
                  <Price
                    actual={prices["12"]?.allActual || 0}
                    old={prices["12"]?.allOld || 0}
                  />
                </div>

                <button onClick={() => handleRegister("12", "Concrete")}>
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cohort;