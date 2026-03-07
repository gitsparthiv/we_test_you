import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { useLayoutEffect } from "react";
import Papa from "papaparse";

const CACHE_KEY = "bys_data_v2"; // Bumped version for new design

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

  const [currentVenue, setCurrentVenue] = useState("Newtown");
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
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);

  const hasItems = selectedSubjects.length > 0;

  const showToast = (message) => {
    setToast({ show: true, message });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 1800);
  };

  /* =========================
     Cleanup timers
  ========================= */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  /* =========================
     Redirect Safety
  ========================= */
  useEffect(() => {
    if (!cohortClass) {
      navigate("/");
      setTimeout(() => {
        document.getElementById("cohorts")?.scrollIntoView({ behavior: "smooth" });
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
                actual_fastrack,
                old_fastrack,
                actual_concrete,
                old_concrete,
                type,
                title,
                date,
              } = row;

              if (!parsedData[className]) parsedData[className] = [];
              let subjectObj = parsedData[className].find((s) => s.name === subject);

              if (!subjectObj) {
                subjectObj = {
                  name: subject,
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
            try {
              sessionStorage.setItem(CACHE_KEY, JSON.stringify(parsedData));
            } catch (e) {
              console.warn("Could not cache data", e);
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
  const total = selectedSubjects.reduce((sum, item) => sum + item.price, 0);

  /* =========================
     FUNCTIONS
  ========================= */
  const addItem = (name, price) => {
    const key = name + "-" + currentClass;
    if (selectedSubjects.some((item) => item.key === key)) {
      showToast("ALREADY IN CART");
      return;
    }

    const packageType = cohortBatch === "Fastrack" ? "Fastrack Package" : "Concrete Package";
    setSelectedSubjects((prev) => [
      ...prev,
      { key, name, price, className: currentClass, packageType },
    ]);
    showToast("ADDED TO CART");
  };

  const removeItem = (key) => {
    setSelectedSubjects((prev) => prev.filter((item) => item.key !== key));
    showToast("REMOVED FROM CART");
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`registration-wrapper ${!hasItems ? "cart-empty" : ""}`}>
      {toast.show && <div className="bys-toast">{toast.message}</div>}

      <div className="main-content">
        <div className="title-box">
          <h1>REGISTRATION 2026–27</h1>
          <div className="class-line">
            CLASS {currentClass} • {cohortBatch?.toUpperCase()}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>VENUE :</span>
            {["Garia", "Dumdum", "Newtown", "Howrah"].map((venue) => (
              <button
                key={venue}
                className={`filter-btn ${currentVenue === venue ? "active" : ""} ${
                  venue !== "Newtown" ? "disabled" : ""
                }`}
                onClick={() => {
                  if (venue !== "Newtown") {
                    alert(`${venue} is coming soon. Newtown is currently active.`);
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
            <thead>
              <tr>
                <th>AVAILABLE SUBJECTS</th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="subject-row">
                    <td style={{ padding: "40px", color: "var(--text-dim)" }}>LOADING SUBJECTS...</td>
                  </tr>
                ))}
              {!loading && loadError && (
                <tr className="subject-row">
                  <td style={{ padding: "40px", color: "#ff4444" }}>{loadError}</td>
                </tr>
              )}
              {!loading &&
                !loadError &&
                classSubjects.map((subject, index) => {
                  const displayOldPrice =
                    cohortBatch === "Fastrack" ? subject.fastrackOld : subject.concreteOld;
                  const displayNewPrice =
                    cohortBatch === "Fastrack" ? subject.fastrackActual : subject.concreteActual;
                  const addName =
                    cohortBatch === "Fastrack"
                      ? subject.name + " Mock Package"
                      : subject.name + " Full Package";
                  const key = addName + "-" + currentClass;
                  const isAdded = selectedSubjects.some((it) => it.key === key);

                  return (
                    <React.Fragment key={index}>
                      <tr className="subject-row">
                        <td>
                          <div className="subject-item-container">
                            <div className="subject-info">
                              <h3>{subject.name}</h3>
                            </div>
                            <div className="subject-price-info">
                              <span className="old-price-bys">₹{displayOldPrice}</span>
                              <span className="new-price-bys">₹{displayNewPrice}</span>
                            </div>
                            <button
                              className={`add-subject-btn ${isAdded ? "is-added" : ""}`}
                              onClick={() => addItem(addName, displayNewPrice)}
                              disabled={isAdded}
                            >
                              {isAdded ? "ADDED ✓" : "ADD TO CART"}
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="chapter-details-row">
                        <td>
                          <div className="chapter-wrap">
                            <div className="chapter-scroll-container">
                              <div className="chapter-list">
                                {(cohortBatch !== "Fastrack"
                                  ? (subject.sessions || []).concat(subject.mockTests || [])
                                  : subject.mockTests || []
                                ).map((item, i) => (
                                  <div key={i} className="chapter-item">
                                    <span className="chapter-name">
                                      {item.chapter ? item.chapter : item.name}
                                    </span>
                                    <span className="chapter-date">{item.date}</span>
                                  </div>
                                ))}
                              </div>
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

      {hasItems && (
        <div className="cart-panel">
          <div className="cart-header">
            <h2>
              YOUR CART <span className="cart-count">{selectedSubjects.length}</span>
            </h2>
          </div>
          <div className="cart-items">
            {selectedSubjects.map((item) => (
              <div className="cart-item" key={item.key}>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price}</div>
                <button className="remove-btn" onClick={() => removeItem(item.key)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">TOTAL:</span>
              <span className="total-value">₹{total}</span>
            </div>
            <button
              className="checkout-btn"
              disabled={!hasItems}
              onClick={() => {
                navigate("/payment", {
                  state: {
                    selectedSubjects,
                    total,
                    cohortBatch,
                    venue: currentVenue,
                  },
                });
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookYourSeat;
