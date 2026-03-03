import React, { useEffect, useRef, useState } from "react";
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

                // ✅ NEW: package prices directly from sheet
                actual_fastrack,
                old_fastrack,
                actual_concrete,
                old_concrete,

                type,
                title,
                date,
              } = row;

              if (!parsedData[className]) parsedData[className] = [];

              let subjectObj = parsedData[className].find(
                (s) => s.name === subject,
              );

              if (!subjectObj) {
                subjectObj = {
                  name: subject,

                  // ✅ save both package prices
                  fastrackActual: Number(actual_fastrack ?? 0),
                  fastrackOld: Number(old_fastrack ?? 0),
                  concreteActual: Number(actual_concrete ?? 0),
                  concreteOld: Number(old_concrete ?? 0),

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
const total = selectedSubjects.reduce((sum, item) => sum + item.price, 0);

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
      // no alert, feels smoother with your new "ADDED ✓" UX

      showToast("Already in cart");
      pulseCart();
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
          <h2 className="class-line">
            CLASS {currentClass} • {cohortBatch?.toUpperCase()}
          </h2>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>Venue</span>

            {["South", "North", "East", "West"].map((venue) => (
              <button
                style={{ fontFamily: "Bebas Neue" }}
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
                      `You have already selected ${currentVenue} venue. Remove all items from cart to change venue.`,
                    );
                    return;
                  }

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
              <col style={{ width: "22%" }} />
              <col style={{ width: "56%" }} />
              <col style={{ width: "22%" }} />
            </colgroup>

            <thead>
              <tr>
                <th>Subject</th>
                <th>Chapter</th>
                <th>Schedule</th>
              </tr>
            </thead>

            <tbody>
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`sk-${i}`} className="bys-skeleton-row">
                    <td colSpan="3">
                      <div className="bys-skeleton-line" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                !loadError &&
                classSubjects.map((subject, index) => {
                  const displayOldPrice =
                    cohortBatch === "Fastrack"
                      ? subject.fastrackOld
                      : subject.concreteOld;

                  const displayNewPrice =
                    cohortBatch === "Fastrack"
                      ? subject.fastrackActual
                      : subject.concreteActual;

                  const addName =
                    cohortBatch === "Fastrack"
                      ? subject.name + " Mock Package"
                      : subject.name + " Full Package";

                  const addPrice =
                    cohortBatch === "Fastrack"
                      ? subject.fastrackActual
                      : subject.concreteActual;

                  const key = addName + "-" + currentClass;
                  const isAdded = selectedSubjects.some((it) => it.key === key);

                  return (
                    <React.Fragment key={index}>
                      <tr className="subject-row">
                        <td>
                          {/* ✅ Subject left + button right (for mobile/ipad via CSS) */}
                          <div className="subject-head-row">
                            <h3 className="subject-title">{subject.name}</h3>

                            <button
                              className={`add-subject-btn ${isAdded ? "is-added" : ""}`}
                              onClick={() => addItem(addName, addPrice)}
                              type="button"
                              aria-label={`${isAdded ? "Added" : "Add"} ${subject.name} to cart`}
                              disabled={isAdded}
                            >
                              <div className="price-box">
                                <span className="add-chip">
                                  {isAdded ? "ADDED ✓" : "ADD +"}
                                </span>
                                <span className="old-price-bys">
                                  ₹{displayOldPrice}
                                </span>
                                <span className="new-price-bys">
                                  ₹{displayNewPrice}
                                </span>
                              </div>
                            </button>
                          </div>
                        </td>

                        <td>—</td>
                        <td>—</td>
                      </tr>

                      <tr>
                        <td colSpan="3" style={{ padding: 0 }}>
                          {/* ✅ fixed header + scroll only content (needs CSS) */}
                          <div className="chapter-wrap">
                            <div className="mobile-chapter-head">
                              <span>Chapter</span>
                              <span>Schedule</span>
                            </div>

                            <div className="chapter-scroll-container">
                              <table
                                style={{
                                  width: "100%",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <colgroup>
                                  <col style={{ width: "22%" }} />
                                  <col style={{ width: "56%" }} />
                                  <col style={{ width: "22%" }} />
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
                                      <td className="chapter-cell">
                                        {item.chapter
                                          ? item.chapter
                                          : item.name}
                                      </td>
                                      <td className="date-cell">{item.date}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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
  <div style={{ fontWeight: "bold" }}>Total: ₹ {total}</div>
</div>

        <button
          className="checkout"
          disabled={!canCheckout}
          onClick={() =>
            navigate("/payment", {
              state: {
                selectedSubjects,
                total,
                cohortBatch,
                venue: currentVenue,
              },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Floating cart icon */}
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
          document.body,
        )}
    </div>
  );
};

export default BookYourSeat;
