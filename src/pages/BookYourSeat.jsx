import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { useLayoutEffect } from "react";
import Papa from "papaparse";
import gariaImg from "../assets/garia.png";
import dumdumImg from "../assets/dumdum.png";
import newtownImg from "../assets/newtown.png";
import howrahImg from "../assets/howrah.png";

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
  const subtotal = selectedSubjects.reduce((sum, item) => sum + item.price, 0);
  const discount = selectedSubjects.length > 1 ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - discount;

  /* =========================
     FUNCTIONS
  ========================= */
  const addItem = (name, price, type) => {
    const key = name + "-" + currentClass;
    if (selectedSubjects.some((item) => item.key === key)) {
      showToast("ALREADY IN CART");
      return;
    }

    const packageType = type || "Package";
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
          <h1>TEST DETAILS</h1>
          <div className="class-line">
            CLASS {currentClass}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>VENUE :</span>
            {[
              { name: "Garia", img: gariaImg },
              { name: "Dumdum", img: dumdumImg },
              { name: "Newtown", img: newtownImg },
              { name: "Howrah", img: howrahImg },
            ].map((venue) => (
              <button
                key={venue.name}
                className={`venue-img-btn ${currentVenue === venue.name ? "active" : ""} ${
                  venue.name !== "Newtown" ? "disabled" : ""
                }`}
                onClick={() => {
                  if (venue.name !== "Newtown") {
                    alert(`${venue.name} is coming soon. Newtown is currently active.`);
                    return;
                  }
                  setCurrentVenue(venue.name);
                }}
              >
                <img src={venue.img} alt={venue.name} />
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
                  const chapterAddName = subject.name + " Chapters";
                  const chapterKey = chapterAddName + "-" + currentClass;
                  const chapterIsAdded = selectedSubjects.some((it) => it.key === chapterKey);

                  const mockAddName = subject.name + " Mocks";
                  const mockKey = mockAddName + "-" + currentClass;
                  const mockIsAdded = selectedSubjects.some((it) => it.key === mockKey);

                  return (
                    <React.Fragment key={index}>
                      <tr className="subject-row">
                        <td>
                          <div className="subject-item-container">
                            <div className="subject-info">
                              <h3>{subject.name}</h3>
                            </div>
                            
                            <div className="subject-actions">
                              {/* CHAPTERS ACTION */}
                              <div className="action-item">
                                <div className="action-price-info">
                                  <span className="action-label">ALL CHAPTERS</span>
                                  <div className="prices">
                                    <span className="old-price-bys">₹{subject.concreteOld}</span>
                                    <span className="new-price-bys">₹{subject.concreteActual}</span>
                                  </div>
                                </div>
                                <button
                                  className={`add-subject-btn ${chapterIsAdded ? "is-added" : ""}`}
                                  onClick={() => addItem(chapterAddName, subject.concreteActual, "Package")}
                                  disabled={chapterIsAdded}
                                >
                                  {chapterIsAdded ? "ADDED ✓" : "ADD TO CART"}
                                </button>
                              </div>

                              {/* MOCK TESTS ACTION */}
                              <div className="action-item">
                                <div className="action-price-info">
                                  <span className="action-label">MOCK TESTS</span>
                                  <div className="prices">
                                    <span className="old-price-bys">₹{subject.fastrackOld}</span>
                                    <span className="new-price-bys">₹{subject.fastrackActual}</span>
                                  </div>
                                </div>
                                <button
                                  className={`add-subject-btn ${mockIsAdded ? "is-added" : ""}`}
                                  onClick={() => addItem(mockAddName, subject.fastrackActual, "Package")}
                                  disabled={mockIsAdded}
                                >
                                  {mockIsAdded ? "ADDED ✓" : "ADD TO CART"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="chapter-details-row">
                        <td>
                          <div className="chapter-wrap">
                            <div className="chapter-scroll-container">
                              <div className="chapter-list">
                                {(subject.sessions || []).concat(subject.mockTests || []).map((item, i) => (
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
              <span className="total-label">SUBTOTAL:</span>
              <span className="total-value">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="cart-total discount-row">
                <span className="total-label">DISCOUNT (20%):</span>
                <span className="total-value">-₹{discount}</span>
              </div>
            )}
            <div className="cart-total final-total">
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
                    subtotal,
                    discount,
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
