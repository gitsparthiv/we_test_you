import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { FaShoppingCart } from "react-icons/fa";
// import Papa from "papaparse";   // ✅ Import at top

const BookYourSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cohortClass = location.state?.selectedClass;
  const cohortBatch = location.state?.selectedBatch;

  const currentClass = cohortClass || "10";

  /* =========================
     STATE
  ========================= */
  const [data, setData] = useState({});
  const [currentVenue, setCurrentVenue] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  /* =========================
     Redirect Safety
  ========================= */
  useEffect(() => {
    if (!cohortClass) {
      navigate("/cohort");
    }
  }, [cohortClass, navigate]);

  /* =========================
     FETCH CSV DATA
  ========================= */
useEffect(() => {
  fetch(
    "https://docs.google.com/spreadsheets/d/12MzE06sluUJV2UJon_q9Q5n6H5X6INqeiy0-KhwpnkA/export?format=csv"
  )
    .then((response) => response.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = {};

          result.data.forEach((row) => {
            const {
              class: className,
              subject,
              price,
              mockPrice,
              type,
              title,
              date,
            } = row;

            if (!parsedData[className]) {
              parsedData[className] = [];
            }

            let subjectObj = parsedData[className].find(
              (s) => s.name === subject
            );

            if (!subjectObj) {
              subjectObj = {
                name: subject,
                price: Number(price),
                mockPrice: Number(mockPrice),
                sessions: [],
                mockTests: [],
              };
              parsedData[className].push(subjectObj);
            }

            if (type === "session") {
              subjectObj.sessions.push({
                chapter: title,
                date,
              });
            } else if (type === "mock") {
              subjectObj.mockTests.push({
                name: title,
                date,
              });
            }
          });

          setData(parsedData);
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching Google Sheet:", error);
    });
}, []);

  const classSubjects = data[currentClass] || [];

  /* =========================
     CART CALCULATION
  ========================= */
  const subtotal = selectedSubjects.reduce(
    (sum, item) => sum + item.price,
    0
  );

  let discount = 0;

  if (
    selectedSubjects.length === classSubjects.length &&
    classSubjects.length > 0
  ) {
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
      cohortBatch === "Concrete"
        ? "Concrete Package"
        : "Fastrack Package";

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
    setSelectedSubjects((prev) =>
      prev.filter((item) => item.key !== key)
    );
  };

  const canCheckout =
    selectedSubjects.length > 0 && currentVenue !== "";

  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <div className="registration-wrapper">
      <div className="cart-icon-top">
        <FaShoppingCart size={24} />
        {selectedSubjects.length > 0 && (
          <span className="cart-badge">
            {selectedSubjects.length}
          </span>
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
            {["South", "North", "East", "West"].map(
              (venue) => (
                <button
                  key={venue}
                  className={`filter-btn ${
                    currentVenue === venue ? "active" : ""
                  }`}
                  onClick={() => setCurrentVenue(venue)}
                >
                  {venue}
                </button>
              )
            )}
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
                    <tr className="subject-row">
                      <td>
                        <strong>{subject.name}</strong>
                      </td>
                      <td>{currentClass}</td>
                      <td>{currentVenue}</td>
                      <td>—</td>
                      <td>—</td>
                      <td>
                        <button
                          className="add-subject-btn"
                          onClick={() => {
                            if (
                              cohortBatch === "Concrete"
                            ) {
                              addItem(
                                subject.name +
                                  " Mock Package",
                                subject.mockPrice
                              );
                            } else {
                              addItem(
                                subject.name +
                                  " Full Package",
                                totalFastrackPrice
                              );
                            }
                          }}
                        >
                          Add (₹
                          {cohortBatch === "Concrete"
                            ? subject.mockPrice
                            : totalFastrackPrice}
                          )
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan="6"
                        style={{ padding: 0 }}
                      >
                        <div className="chapter-scroll-container">
                          <table
                            style={{
                              width: "100%",
                              borderCollapse:
                                "collapse",
                            }}
                          >
                            <tbody>
                              {(cohortBatch !==
                              "Concrete"
                                ? (subject.sessions ||
                                    []).concat(
                                    subject.mockTests ||
                                      []
                                  )
                                : subject.mockTests ||
                                  []
                              ).map((item, i) => (
                                <tr key={i}>
                                  <td></td>
                                  <td>
                                    {currentClass}
                                  </td>
                                  <td>
                                    {currentVenue}
                                  </td>
                                  <td>
                                    {item.chapter
                                      ? item.chapter
                                      : item.name}
                                  </td>
                                  <td>
                                    {item.date}
                                  </td>
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

      {/* CART PANEL REMAINS SAME (UNCHANGED) */}

      <div className="cart-panel">
        <h2>Your Cart</h2>

        <div className="cart-items">
          {selectedSubjects.length > 0 && (
            <div className="cart-excel">
              <div className="excel-row">
                CLASS : {selectedSubjects[0].className}
              </div>

              <div className="excel-row">
                PACKAGE :{" "}
                {selectedSubjects[0].packageType.toUpperCase()}
              </div>

              <div className="excel-space"></div>

              <div className="excel-row excel-header">
                <span>SUBJECT</span>
                <span className="cost-head">
                  COST
                </span>
              </div>

              {selectedSubjects.map((item) => (
                <div
                  className="excel-row"
                  key={item.key}
                >
                  <span>
                    {item.name
                      .replace(
                        " Full Package",
                        ""
                      )
                      .replace(
                        " Mock Package",
                        ""
                      )}
                  </span>

                  <span className="cost">
                    {item.price}
                    <span
                      className="remove"
                      onClick={() =>
                        removeItem(item.key)
                      }
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
            <div
              style={{
                color: "#d9ff00",
                marginTop: "5px",
              }}
            >
              Bundle Discount: - ₹ {discount}
            </div>
          )}

          <div
            style={{
              marginTop: "8px",
              fontWeight: "bold",
            }}
          >
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
                cohortBatch,
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