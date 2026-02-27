import React from "react";
import "./Cohort.css";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import img1 from "../assets/class10new.png";
import img2 from "../assets/11.png";
import img3 from "../assets/class_12.png";

/* =========================
   PRICE COMPONENT (FIXED)
========================= */
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

  const handleRegister = (selectedClass, selectedBatch) => {
    navigate("/book-seat", {
      state: {
        selectedClass,
        selectedBatch,
      },
    });
  };

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/12MzE06sluUJV2UJon_q9Q5n6H5X6INqeiy0-KhwpnkA/export?format=csv"
    )
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const classMap = {};

            result.data.forEach((row) => {
              const className = row.class;
              const subject = row.subject;
              const price = Number(row.price);
              const mockPrice = Number(row.mockPrice);

              if (!classMap[className]) {
                classMap[className] = {};
              }

              // Store only once per subject
              if (!classMap[className][subject]) {
                classMap[className][subject] = {
                  fastrack: price + mockPrice,
                  concrete: mockPrice
                };
              }
            });

            const finalPrices = {};

            Object.keys(classMap).forEach((className) => {
              const subjects = Object.values(classMap[className]);

              let totalFastrack = 0;
              let totalConcrete = 0;

              let minFastrack = Infinity;
              let minConcrete = Infinity;

              subjects.forEach((sub) => {
                totalFastrack += sub.fastrack;
                totalConcrete += sub.concrete;

                if (sub.fastrack < minFastrack)
                  minFastrack = sub.fastrack;

                if (sub.concrete < minConcrete)
                  minConcrete = sub.concrete;
              });

 // number of subjects in this class
const subjectCount = subjects.length;

// Store OLD totals (before discount + ₹1000 per subject inflation)
const oldFastrack = totalFastrack + (subjectCount * 1000);
const oldConcrete = totalConcrete + (subjectCount * 1000);

              // Apply discount (1 subject free)
              totalFastrack -= minFastrack;
              totalConcrete -= minConcrete;

              finalPrices[className] = {
                fastrack: totalFastrack,
                concrete: totalConcrete,
                oldFastrack,
                oldConcrete
              };
            });

            setPrices(finalPrices);
          }
        });
      });
  }, []);

  return (
    <div className="cohort-container" id="cohorts">
      <div className="title">
        <h1>OUR AVAILABLE COHORTS</h1>
      </div>

      <div className="grid">

        {/* CLASS 10 */}
        <div className="card">
          <img src={img1} alt="Class 10" />
          <div className="overlay">
            <h2>CLASS 10</h2>
            <div className="division-row">

              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Chapter-wise Testing</li>
                  <li>✔ Full-Length Mock Exams</li>
                  <li>✔ Performance Analytics</li>
                  <li>✔ Exam Strategy Guidance</li>
                </ul>
                <Price
                  actual={prices["10"]?.fastrack || 0}
                  old={prices["10"]?.oldFastrack || 0}
                />
                <button onClick={() => handleRegister("10", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Full Mock Practice</li>
                  <li>✔ Board Pattern Simulation</li>
                  <li>✔ Time Management Focus</li>
                  <li>✔ Detailed Report Card</li>
                </ul>
                <Price
                  actual={prices["10"]?.concrete || 0}
                  old={prices["10"]?.oldConcrete || 0}
                />
                <button onClick={() => handleRegister("10", "Concrete")}>
                  Register Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* CLASS 11 */}
        <div className="card">
          <img src={img2} alt="Class 11" />
          <div className="overlay">
            <h2>CLASS 11</h2>
            <div className="division-row">

              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Subject-wise Deep Testing</li>
                  <li>✔ Monthly Full Mock Exams</li>
                  <li>✔ Concept Reinforcement Focus</li>
                  <li>✔ Performance Tracking Dashboard</li>
                </ul>
                <Price
                  actual={prices["11"]?.fastrack || 0}
                  old={prices["11"]?.oldFastrack || 0}
                />
                <button onClick={() => handleRegister("11", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Only Full Mock Practice</li>
                  <li>✔ Board-Level Question Patterns</li>
                  <li>✔ Time-bound Simulation Tests</li>
                  <li>✔ Detailed Evaluation Report</li>
                </ul>
                <Price
                  actual={prices["11"]?.concrete || 0}
                  old={prices["11"]?.oldConcrete || 0}
                />
                <button onClick={() => handleRegister("11", "Concrete")}>
                  Register Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* CLASS 12 */}
        <div className="card">
          <img src={img3} alt="Class 12" />
          <div className="overlay">
            <h2>CLASS 12</h2>
            <div className="division-row">

              <div className="division-half">
                <h3>Fastrack Division</h3>
                <ul className="feature-list">
                  <li>✔ Advanced Chapter-wise Tests</li>
                  <li>✔ Competitive + Board Pattern</li>
                  <li>✔ Rank Prediction Analysis</li>
                  <li>✔ Strategic Exam Mentorship</li>
                </ul>
                <Price
                  actual={prices["12"]?.fastrack || 0}
                  old={prices["12"]?.oldFastrack || 0}
                />
                <button onClick={() => handleRegister("12", "Fastrack")}>
                  Register Now
                </button>
              </div>

              <div className="division-half">
                <h3>Concrete Division</h3>
                <ul className="feature-list">
                  <li>✔ Full-Length Board Mocks</li>
                  <li>✔ Strict Exam Hall Simulation</li>
                  <li>✔ Time Optimization Strategy</li>
                  <li>✔ Comprehensive Performance Report</li>
                </ul>
                <Price
                  actual={prices["12"]?.concrete || 0}
                  old={prices["12"]?.oldConcrete || 0}
                />
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