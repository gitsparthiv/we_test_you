import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { useLayoutEffect } from "react";
import Papa from "papaparse"; // ✅ Import at top

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
      "https://docs.google.com/spreadsheets/d/12MzE06sluUJV2UJon_q9Q5n6H5X6INqeiy0-KhwpnkA/export?format=csv",
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
                (s) => s.name === subject,
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
  const subtotal = selectedSubjects.reduce((sum, item) => sum + item.price, 0);
  // OLD total (without discount, business logic)
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
      cohortBatch === "Fastrack" ? "Fastrack Package" : "Concrete Package";

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

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <div className="registration-wrapper">
      <div className="main-content">
        <div className="title-box">
          <h1>REGISTRATION 2026–27</h1>

          <p className="class-line">
            CLASS {currentClass} • {cohortBatch?.toUpperCase()}
          </p>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>Venue</span>
            {["South", "North", "East", "West"].map((venue) => (
              <button
                key={venue}
                className={`filter-btn ${currentVenue === venue ? "active" : ""} ${venue !== "East" ? "disabled" : ""}`}
                onClick={() => {
                  // If user already added something, don't allow changing venue
                  if (
                    selectedSubjects.length > 0 &&
                    currentVenue &&
                    venue !== currentVenue
                  ) {
                    alert(
                      `You have already selected ${currentVenue} venue. Remove all items from cart to change venue.`,
                    );
                    return;
                  }

                  // Only EAST is available
                  if (venue !== "East") {
                    alert(
                      `${venue} venue is coming soon. Currently only East is available.`,
                    );
                    return;
                  }

                  setCurrentVenue(venue);
                }}
              >
                {venue}
              </button>
            ))}
          </div>
        </div>

        <div className="table-box">
          <table className="custom-table">
            <colgroup>
              <col style={{ width: "18%" }} /> {/* Subject */}
              <col style={{ width: "10%" }} /> {/* Class */}
              <col style={{ width: "12%" }} /> {/* Venue */}
              <col style={{ width: "34%" }} /> {/* Chapter */}
              <col style={{ width: "16%" }} /> {/* Schedule */}
              <col style={{ width: "10%" }} /> {/* Action */}
            </colgroup>
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
                const totalFastrackPrice = subject.price + subject.mockPrice;

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
                            if (cohortBatch === "Fastrack") {
                              addItem(
                                subject.name + " Mock Package",
                                subject.mockPrice,
                              );
                            } else {
                              addItem(
                                subject.name + " Full Package",
                                totalFastrackPrice,
                              );
                            }
                          }}
                        >
                          <div className="price-box">
                            <span className="old-price-bys">
                              ₹
                              {(cohortBatch === "Fastrack"
                                ? subject.mockPrice
                                : totalFastrackPrice) + 1000}
                            </span>

                            <span className="new-price-bys">
                              ₹
                              {cohortBatch === "Fastrack"
                                ? subject.mockPrice
                                : totalFastrackPrice}
                            </span>
                          </div>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="6" style={{ padding: 0 }}>
                        <div className="chapter-scroll-container">
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <colgroup>
                              <col style={{ width: "18%" }} /> {/* Subject */}
                              <col style={{ width: "10%" }} /> {/* Class */}
                              <col style={{ width: "12%" }} /> {/* Venue */}
                              <col style={{ width: "34%" }} /> {/* Chapter */}
                              <col style={{ width: "16%" }} /> {/* Schedule */}
                              <col style={{ width: "10%" }} /> {/* Action */}
                            </colgroup>
                            <tbody>
                              {(cohortBatch !== "Fastrack"
                                ? (subject.sessions || []).concat(
                                    subject.mockTests || [],
                                  )
                                : subject.mockTests || []
                              ).map((item, i) => (
                                <tr key={i} className="chapter-row">
                                  <td className="ghost-cell">—</td>
                                  <td>{currentClass}</td>
                                  <td>{currentVenue}</td>
                                  <td className="chapter-cell">
                                    {item.chapter ? item.chapter : item.name}
                                  </td>
                                  <td>{item.date}</td>
                                  <td className="ghost-cell">—</td>
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
                PACKAGE : {selectedSubjects[0].packageType.toUpperCase()}
              </div>
              <div className="excel-row">
                VENUE : {currentVenue || "NOT SELECTED"}
              </div>
              <div className="excel-space"></div>

              <div className="excel-row excel-header">
                <span className="subject-head">SUBJECT</span>
                <span className="cost-head">COST</span>
              </div>

              {selectedSubjects.map((item) => (
                <div className="excel-row" key={item.key}>
                  <span className="subject-name">
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
                venue: currentVenue,
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
