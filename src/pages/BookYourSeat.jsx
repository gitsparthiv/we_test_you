import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { FaShoppingCart } from "react-icons/fa";

const BookYourSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cohortClass = location.state?.selectedClass;
  const cohortBatch = location.state?.selectedBatch;

  /* =========================
     Redirect Safety
  ========================= */
  useEffect(() => {
    if (!cohortClass) {
      navigate("/cohort");
    }
  }, [cohortClass, navigate]);

  const currentClass = cohortClass || "10";

  /* =========================
     DATA STRUCTURE (UPDATED)
  ========================= */
  const data = {
    10: [
      {
        name: "Science",
        price: 3000,
        sessions: [
          { chapter: "Matter", date: "10 Jan 2026" },
          { chapter: "Light", date: "15 Jan 2026" },
          { chapter: "Sound", date: "20 Jan 2026" },
          { chapter: "Electricity", date: "25 Jan 2026" },
          { chapter: "Magnetism", date: "30 Jan 2026" },
          { chapter: "Chemical Reactions", date: "2 Feb 2026" },
          { chapter: "Metals & Non-Metals", date: "5 Feb 2026" },
          { chapter: "Life Processes", date: "8 Feb 2026" },
          { chapter: "Control & Coordination", date: "12 Feb 2026" },
          { chapter: "Environment", date: "15 Feb 2026" },
        ],
        mockTests: [
          { name: "Mock Test 1", date: "20 Feb 2026" },
          { name: "Mock Test 2", date: "25 Feb 2026" },
          { name: "Mock Test 3", date: "1 Mar 2026" },
          { name: "Mock Test 4", date: "5 Mar 2026" },
          { name: "Mock Test 5", date: "10 Mar 2026" },
        ],
        mockPrice: 2000,
      },
      {
        name: "Mathematics",
        price: 3200,
        sessions: [
          { chapter: "Algebra", date: "12 Jan 2026" },
          { chapter: "Trigonometry", date: "18 Jan 2026" },
          { chapter: "Coordinate Geometry", date: "22 Jan 2026" },
          { chapter: "Statistics", date: "28 Jan 2026" },
          { chapter: "Probability", date: "1 Feb 2026" },
          { chapter: "Surface Areas", date: "6 Feb 2026" },
          { chapter: "Polynomials", date: "9 Feb 2026" },
          { chapter: "Triangles", date: "12 Feb 2026" },
          { chapter: "Circles", date: "15 Feb 2026" },
          { chapter: "Heights & Distances", date: "18 Feb 2026" },
        ],
        mockTests: [
          { name: "Mock Test 1", date: "25 Feb 2026" },
          { name: "Mock Test 2", date: "1 Mar 2026" },
          { name: "Mock Test 3", date: "5 Mar 2026" },
          { name: "Mock Test 4", date: "8 Mar 2026" },
          { name: "Mock Test 5", date: "12 Mar 2026" },
        ],
        mockPrice: 2000,
      },
    ],

    11: [
  {
    name: "Physics",
    price: 4000,
    sessions: [
      { chapter: "Kinematics", date: "5 Mar 2026" },
      { chapter: "Laws of Motion", date: "8 Mar 2026" },
      { chapter: "Work & Energy", date: "12 Mar 2026" },
      { chapter: "Rotational Motion", date: "15 Mar 2026" },
      { chapter: "Gravitation", date: "18 Mar 2026" },
      { chapter: "Thermodynamics", date: "22 Mar 2026" },
      { chapter: "Waves", date: "25 Mar 2026" },
      { chapter: "Oscillations", date: "28 Mar 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "2 Apr 2026" },
      { name: "Mock Test 2", date: "5 Apr 2026" },
      { name: "Mock Test 3", date: "8 Apr 2026" },
      { name: "Mock Test 4", date: "12 Apr 2026" },
      { name: "Mock Test 5", date: "15 Apr 2026" },
    ],
    mockPrice: 2500,
  },
  {
    name: "Chemistry",
    price: 3800,
    sessions: [
      { chapter: "Atomic Structure", date: "6 Mar 2026" },
      { chapter: "Chemical Bonding", date: "10 Mar 2026" },
      { chapter: "Thermochemistry", date: "14 Mar 2026" },
      { chapter: "Equilibrium", date: "18 Mar 2026" },
      { chapter: "Redox Reactions", date: "21 Mar 2026" },
      { chapter: "Organic Basics", date: "24 Mar 2026" },
      { chapter: "Hydrocarbons", date: "27 Mar 2026" },
      { chapter: "States of Matter", date: "30 Mar 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "3 Apr 2026" },
      { name: "Mock Test 2", date: "7 Apr 2026" },
      { name: "Mock Test 3", date: "10 Apr 2026" },
      { name: "Mock Test 4", date: "14 Apr 2026" },
      { name: "Mock Test 5", date: "18 Apr 2026" },
    ],
    mockPrice: 2300,
  },
  {
    name: "Mathematics",
    price: 4200,
    sessions: [
      { chapter: "Sets & Functions", date: "7 Mar 2026" },
      { chapter: "Trigonometric Functions", date: "11 Mar 2026" },
      { chapter: "Complex Numbers", date: "15 Mar 2026" },
      { chapter: "Quadratic Equations", date: "19 Mar 2026" },
      { chapter: "Permutations & Combinations", date: "23 Mar 2026" },
      { chapter: "Binomial Theorem", date: "26 Mar 2026" },
      { chapter: "Sequences & Series", date: "29 Mar 2026" },
      { chapter: "Straight Lines", date: "2 Apr 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "6 Apr 2026" },
      { name: "Mock Test 2", date: "9 Apr 2026" },
      { name: "Mock Test 3", date: "13 Apr 2026" },
      { name: "Mock Test 4", date: "16 Apr 2026" },
      { name: "Mock Test 5", date: "20 Apr 2026" },
    ],
    mockPrice: 2500,
  },
],
12: [
  {
    name: "Physics",
    price: 4500,
    sessions: [
      { chapter: "Electrostatics", date: "5 May 2026" },
      { chapter: "Current Electricity", date: "8 May 2026" },
      { chapter: "Magnetism", date: "12 May 2026" },
      { chapter: "Electromagnetic Induction", date: "15 May 2026" },
      { chapter: "Alternating Current", date: "18 May 2026" },
      { chapter: "Optics", date: "22 May 2026" },
      { chapter: "Dual Nature of Matter", date: "25 May 2026" },
      { chapter: "Atoms & Nuclei", date: "28 May 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "2 Jun 2026" },
      { name: "Mock Test 2", date: "6 Jun 2026" },
      { name: "Mock Test 3", date: "10 Jun 2026" },
      { name: "Mock Test 4", date: "14 Jun 2026" },
      { name: "Mock Test 5", date: "18 Jun 2026" },
    ],
    mockPrice: 3000,
  },
  {
    name: "Chemistry",
    price: 4300,
    sessions: [
      { chapter: "Solutions", date: "6 May 2026" },
      { chapter: "Electrochemistry", date: "10 May 2026" },
      { chapter: "Chemical Kinetics", date: "14 May 2026" },
      { chapter: "Surface Chemistry", date: "17 May 2026" },
      { chapter: "Haloalkanes", date: "20 May 2026" },
      { chapter: "Alcohols & Ethers", date: "24 May 2026" },
      { chapter: "Biomolecules", date: "27 May 2026" },
      { chapter: "Polymers", date: "30 May 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "3 Jun 2026" },
      { name: "Mock Test 2", date: "7 Jun 2026" },
      { name: "Mock Test 3", date: "11 Jun 2026" },
      { name: "Mock Test 4", date: "15 Jun 2026" },
      { name: "Mock Test 5", date: "19 Jun 2026" },
    ],
    mockPrice: 2800,
  },
  {
    name: "Mathematics",
    price: 4700,
    sessions: [
      { chapter: "Relations & Functions", date: "7 May 2026" },
      { chapter: "Inverse Trigonometry", date: "11 May 2026" },
      { chapter: "Matrices", date: "15 May 2026" },
      { chapter: "Determinants", date: "19 May 2026" },
      { chapter: "Continuity & Differentiability", date: "22 May 2026" },
      { chapter: "Applications of Derivatives", date: "25 May 2026" },
      { chapter: "Integrals", date: "29 May 2026" },
      { chapter: "Differential Equations", date: "1 Jun 2026" },
    ],
    mockTests: [
      { name: "Mock Test 1", date: "5 Jun 2026" },
      { name: "Mock Test 2", date: "9 Jun 2026" },
      { name: "Mock Test 3", date: "13 Jun 2026" },
      { name: "Mock Test 4", date: "17 Jun 2026" },
      { name: "Mock Test 5", date: "21 Jun 2026" },
    ],
    mockPrice: 3000,
  },
],
  };

  const classSubjects = data[currentClass] || [];

  /* =========================
     STATE
  ========================= */
  const [currentVenue, setCurrentVenue] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  /* =========================
     CART CALCULATION
  ========================= */
  const subtotal = selectedSubjects.reduce((sum, item) => sum + item.price, 0);

  let discount = 0;

if (selectedSubjects.length === classSubjects.length && classSubjects.length > 0) {
  const lowest = Math.min(...selectedSubjects.map((s) => s.price));
  discount = lowest;
}

  const finalTotal = subtotal - discount;

  /* =========================
     FUNCTIONS
  ========================= */
  const addItem = (name, price) => {
    if (!currentVenue) {
      alert("Please select a venue first.");
      return;
    }

    const key = name + "-" + currentClass;

    if (selectedSubjects.some((item) => item.key === key)) {
      alert("Already added.");
      return;
    }
    const packageType =
    cohortBatch === "Concrete" ? "Concrete Package" : "Fastrack Package";

    setSelectedSubjects([
    ...selectedSubjects,
    {
      key,
      name,
      price,
      className: currentClass,
      packageType,
    },
  ]);
};

  const removeItem = (key) => {
    setSelectedSubjects((prev) => prev.filter((item) => item.key !== key));
  };

  const canCheckout = selectedSubjects.length > 0 && currentVenue !== "";

  /* =========================
     UI
  ========================= */
  return (
    <div className="registration-wrapper">
      <div className="cart-icon-top">
        <FaShoppingCart size={24} />
        {selectedSubjects.length > 0 && (
          <span className="cart-badge">{selectedSubjects.length}</span>
        )}
      </div>

      <div className="main-content">
        <div className="title-box">
          <h1>Registration for 2026-27 Session</h1>
          <p>
            Class {currentClass} - {cohortBatch}
          </p>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>Venue</span>
            {["South", "North", "East", "West"].map((venue) => (
              <button
                key={venue}
                className={`filter-btn ${currentVenue === venue ? "active" : ""}`}
                onClick={() => setCurrentVenue(venue)}
              >
                {venue}
              </button>
            ))}
          </div>
        </div>

        <div className="table-box">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class</th>
                <th>Venue</th>
                <th>Chapter</th>
                <th>Schedule</th>
                <th>Action</th>
              </tr>
            </thead>

<tbody>
  {classSubjects.map((subject, index) => {

    const totalFastrackPrice =
      subject.price + subject.mockPrice;

    return (
      <React.Fragment key={index}>

        {/* SUBJECT MAIN ROW */}
        <tr className="subject-row">
          <td><strong>{subject.name}</strong></td>
          <td>{currentClass}</td>
          <td>{currentVenue}</td>
          <td>—</td>
          <td>—</td>
          <td>
            <button
              className="add-subject-btn"
              onClick={() => {
                if (cohortBatch === "Concrete") {
                  addItem(
                    subject.name + " Mock Package",
                    subject.mockPrice
                  );
                } else {
                  addItem(
                    subject.name + " Full Package",
                    totalFastrackPrice
                  );
                }
              }}
            >
              Add (₹
              {cohortBatch === "Concrete"
                ? subject.mockPrice
                : totalFastrackPrice})
            </button>
          </td>
        </tr>

        {/* SCROLLABLE CHAPTER ROWS */}
 <tr>
  <td colSpan="6" style={{ padding: 0 }}>
    <div className="chapter-scroll-container">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {(
           cohortBatch !== "Concrete"
  ? (subject.sessions || []).concat(subject.mockTests || [])
  : (subject.mockTests || [])
          ).map((item, i) => (
            <tr key={i}>
              <td></td>
              <td>{currentClass}</td>
              <td>{currentVenue}</td>
              <td>
                {item.chapter ? item.chapter : item.name}
              </td>
              <td>{item.date}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </td>
</tr>

      </React.Fragment>
    );
  })}
</tbody>
          </table>
        </div>
      </div>

      {/* ================= CART PANEL ================= */}

      <div className="cart-panel">
        <h2>Your Cart</h2>

<div className="cart-items">
  {selectedSubjects.length > 0 && (
    <div className="cart-excel">

      <div className="excel-row">
        CLASS : {selectedSubjects[0].className}
      </div>

      <div className="excel-row">
        PACKAGE : {selectedSubjects[0].packageType.toUpperCase()}
      </div>

      <div className="excel-space"></div>

      <div className="excel-row excel-header">
        <span>SUBJECT</span>
        <span className="cost-head">COST</span>
      </div>

      {selectedSubjects.map((item) => (
        <div className="excel-row" key={item.key}>
          <span>
            {item.name
              .replace(" Full Package", "")
              .replace(" Mock Package", "")}
          </span>

          <span className="cost">
            {item.price}
            <span
              className="remove"
              onClick={() => removeItem(item.key)}
            >
              ✕
            </span>
          </span>
        </div>
      ))}

    </div>
  )}
</div>

        <div className="total">
          <div>Subtotal: ₹ {subtotal}</div>

          {discount > 0 && (
            <div style={{ color: "#d9ff00", marginTop: "5px" }}>
              Bundle Discount: - ₹ {discount}
            </div>
          )}

          <div style={{ marginTop: "8px", fontWeight: "bold" }}>
            Final Total: ₹ {finalTotal}
          </div>
        </div>

        <button
          className="checkout"
          disabled={!canCheckout}
          onClick={() =>
            navigate("/payment", {
              state: {
                selectedSubjects,
                subtotal,
                discount,
                finalTotal,
              },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default BookYourSeat;
