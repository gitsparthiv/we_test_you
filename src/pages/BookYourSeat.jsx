import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { useLayoutEffect } from "react";
import Papa from "papaparse";
import { createPortal } from "react-dom";

const CACHE_KEY = "bys_data_v1";

const BookYourSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cohortClass = location.state?.selectedClass;
  const cohortBatch = location.state?.selectedBatch;

  const currentClass = cohortClass || "10";

  /* =========================
     STATE
  ========================= */
  const [data, setData] = useState(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  const [currentVenue, setCurrentVenue] = useState("East");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [loading, setLoading] = useState(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      return !cached;
    } catch {
      return true;
    }
  });

  const [loadError, setLoadError] = useState("");

  // toast + cart pulse
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  const [cartPulse, setCartPulse] = useState(false);
  const cartPulseTimerRef = useRef(null);

  // cart ref for scroll
  const cartRef = useRef(null);

  const hasItems = selectedSubjects.length > 0;

  const showToast = (message) => {
    setToast({ show: true, message });

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 1800);
  };

  const pulseCart = () => {
    setCartPulse(true);
    if (cartPulseTimerRef.current) clearTimeout(cartPulseTimerRef.current);
    cartPulseTimerRef.current = setTimeout(() => setCartPulse(false), 600);
  };

  const scrollToCart = () => {
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* =========================
     Cleanup timers
  ========================= */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (cartPulseTimerRef.current) clearTimeout(cartPulseTimerRef.current);
    };
  }, []);

  /* =========================
     Redirect Safety
  ========================= */
  useEffect(() => {
    if (!cohortClass) {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("cohorts")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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

              if (!parsedData[className]) parsedData[className] = [];

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
                subjectObj.sessions.push({ chapter: title, date });
              } else if (type === "mock") {
                subjectObj.mockTests.push({ name: title, date });
              }
            });

            setData(parsedData);
            setLoading(false);
            setLoadError("");

            try {
              sessionStorage.setItem(CACHE_KEY, JSON.stringify(parsedData));
            } catch {
              // ignore
            }
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching Google Sheet:", error);
        setLoadError("Could not load subjects. Please try again.");
        setLoading(false);
      });
  }, []);

  const classSubjects = data[currentClass] || [];

  /* =========================
     CART CALCULATION
  ========================= */
  const subtotal = selectedSubjects.reduce((sum, item) => sum + item.price, 0);

  let discount = 0;
  if (
    hasItems &&
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

    setSelectedSubjects((prev) => [
      ...prev,
      { key, name, price, className: currentClass, packageType },
    ]);

    showToast("Added to cart");
    pulseCart();
  };

  const removeItem = (key) => {
    setSelectedSubjects((prev) => prev.filter((item) => item.key !== key));
    showToast("Removed from cart");
    pulseCart();
  };

  const canCheckout = hasItems && currentVenue !== "";

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* =========================
     UI
  ========================= */
  return (
    <div className="registration-wrapper">
      {toast.show && <div className="bys-toast">{toast.message}</div>}

      <div className="main-content">
        <div className="title-box">
          <h1>REGISTRATION 2026–27</h1>
          <p className="class-line">
            CLASS {currentClass} • {cohortBatch?.toUpperCase()}
          </p>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span style={{fontFamily:"Bebas Neue" , fontSize:"25px"}}>Venue</span>
            {["South", "North", "East", "West"].map((venue) => (
              <button style={{fontFamily:"Bebas Neue"}}
                key={venue}
                className={`filter-btn ${
                  currentVenue === venue ? "active" : ""
                } ${venue !== "East" ? "disabled" : ""}`}
                onClick={() => {
                  if (
                    selectedSubjects.length > 0 &&
                    currentVenue &&
                    venue !== currentVenue
                  ) {
                    alert(
                      `You have already selected ${currentVenue} venue. Remove all items from cart to change venue.`
                    );
                    return;
                  }

                  if (venue !== "East") {
                    alert(
                      `${venue} venue is coming soon. Currently only East is available.`
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
          {loading && (
            <div className="bys-loading-overlay">
              <div className="bys-spinner" />
              <div className="bys-loading-text">Loading subjects…</div>
            </div>
          )}

          {!loading && loadError && (
            <div className="bys-error">
              <div>{loadError}</div>
              <button
                className="bys-retry"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          <table className="custom-table">
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "34%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "10%" }} />
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
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`sk-${i}`} className="bys-skeleton-row">
                    <td colSpan="6">
                      <div className="bys-skeleton-line" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                !loadError &&
                classSubjects.map((subject, index) => {
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
                                <col style={{ width: "18%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "12%" }} />
                                <col style={{ width: "34%" }} />
                                <col style={{ width: "16%" }} />
                                <col style={{ width: "10%" }} />
                              </colgroup>

                              <tbody>
                                {(cohortBatch !== "Fastrack"
                                  ? (subject.sessions || []).concat(
                                      subject.mockTests || []
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

      {/* CART PANEL */}
      <div
        className={`cart-panel ${cartPulse ? "cart-pulse" : ""}`}
        ref={cartRef}
      >
        <h2 className={cartPulse ? "cart-title-glow" : ""}>Your Cart</h2>

        <div className="cart-items">
          {hasItems && (
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
                    <span className="remove" onClick={() => removeItem(item.key)}>
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
                cohortBatch,
                venue: currentVenue,
              },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>

      {/* ✅ Floating cart icon (PORTAL) - shows immediately after first add */}
      {hasItems &&
        createPortal(
          <button
            className={`bys-float-cart ${cartPulse ? "bys-float-pulse" : ""}`}
            onClick={scrollToCart}
            aria-label="View cart"
            type="button"
          >
            🛒
            <span className="bys-float-badge">{selectedSubjects.length}</span>
          </button>,
          document.body
        )}
    </div>
  );
};

export default BookYourSeat;