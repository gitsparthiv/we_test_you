import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookYourSeat.css";
import { useLayoutEffect } from "react";
import Papa from "papaparse";

const CACHE_KEY = "bys_data_v3"; // Bumped version for new design

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
                Class,
                Subject,
                Track,
                Tests,
                Frequency,
                Price,
                StrikeThroughPrice,
                Discount,
              } = row;

              if (!Class || !Subject) return;

              if (!parsedData[Class]) parsedData[Class] = [];
              let subjectObj = parsedData[Class].find((s) => s.name === Subject);

              if (!subjectObj) {
                subjectObj = {
                  name: Subject,
                  tracks: [],
                };
                parsedData[Class].push(subjectObj);
              }

              subjectObj.tracks.push({
                track: Track,
                tests: Tests,
                frequency: Frequency,
                price: Number(Price ?? 0),
                oldPrice: Number(StrikeThroughPrice ?? 0),
                discount: Discount,
              });
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
  const discount = selectedSubjects.length > 1 ? Math.round(subtotal * 0.19355) : 0;
  const total = subtotal - discount;

  /* =========================
     FUNCTIONS
  ========================= */
  const addItem = (name, price, type, forcedKey) => {
    const key = forcedKey || (name + "-" + currentClass);
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
          <p className="academic-res-tagline">ACADEMIC RESERVATION</p>
          <h1>SELECT YOUR EVALUATION TRACKS</h1>
          <div className="class-line-new">
            CLASS {currentClass} • ADMISSIONS OPEN
          </div>
        </div>

        <div className="section-header-bys">
          <span className="section-num">01.</span> CHOOSE TEST VENUE
        </div>
        <div className="filter-section">
          <div className="venue-glass-container">
            <div className="filter-row">
              {[
                { name: "Newtown", active: true },
                { name: "Garia", active: false },
                { name: "Dumdum", active: false },
                { name: "Howrah", active: false },
              ].map((venue) => (
                <button
                  key={venue.name}
                  className={`venue-text-btn-new ${currentVenue === venue.name ? "active" : ""} ${
                    !venue.active ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (!venue.active) {
                      showToast(`${venue.name.toUpperCase()} IS COMING SOON`);
                      return;
                    }
                    setCurrentVenue(venue.name);
                  }}
                >
                  <div className="venue-btn-content">
                    <span className="venue-name-new">{venue.name === "Newtown" ? "New Town" : venue.name}</span>
                    <span className="venue-status-new">{venue.active ? "ACTIVE" : "COMING SOON"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="section-header-bys">
          <span className="section-num">02.</span> SELECT TRACKS
        </div>

        <div className="tracks-container">
          {!loading &&
            !loadError &&
            classSubjects.map((subject, sIdx) => (
              <div key={sIdx} className="subject-block">
                <div className="subject-header-new">{subject.name}</div>
                <div className="tracks-list-new">
                  {subject.tracks.map((trackInfo, tIdx) => {
                    const uniqueKey = `${subject.name}-${trackInfo.track}-${currentClass}`;
                    const isAdded = selectedSubjects.some((it) => it.key === uniqueKey);

                    return (
                      <div
                        key={tIdx}
                        className={`track-card-new ${isAdded ? "is-added" : ""}`}
                      >
                        <div className="track-info-new">
                          <div className="track-name-new">{trackInfo.track}</div>
                          <div className="track-subtext-new">
                            {trackInfo.tests} Tests • {trackInfo.frequency}
                          </div>
                        </div>
                        <div className="track-actions-new">
                          <div className="track-prices-new">
                            <span className="old-price-new">₹{trackInfo.oldPrice}</span>
                            <span className="new-price-new">₹{trackInfo.price}</span>
                          </div>
                          <button
                            className={`track-add-btn-new ${isAdded ? "is-added" : ""}`}
                            onClick={() => {
                              if (isAdded) {
                                removeItem(uniqueKey);
                              } else {
                                addItem(
                                  `${subject.name} (${trackInfo.track})`,
                                  trackInfo.price,
                                  "Package",
                                  uniqueKey
                                );
                              }
                            }}
                          >
                            {isAdded ? "✓" : "+"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {hasItems && (
        <div className="cart-panel">
          <div className="cart-header">
            <h2>SELECTION SUMMARY</h2>
          </div>
          <div className="cart-items">
            {selectedSubjects.map((item) => {
              // Extract original track name if stored in name
              const trackPart = item.name.includes("(") ? item.name.split("(")[1].replace(")", "") : "";
              const subjectPart = item.name.split(" (")[0];

              return (
                <div className="cart-item" key={item.key}>
                  <div className="cart-item-info-new">
                    <div className="cart-item-name">{subjectPart.toUpperCase()}</div>
                    <div className="cart-item-track-new">{trackPart}</div>
                  </div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <button className="remove-btn" onClick={() => removeItem(item.key)}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Subtotal</span>
              <span className="total-value">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="cart-total discount-row-new">
                <span className="total-label">Multi-Track Discount (20%)</span>
                <span className="total-value">-₹{discount}</span>
              </div>
            )}
            <div className="cart-total final-total-new">
              <span className="total-label">Total Amount</span>
              <span className="total-value">₹{total}</span>
            </div>
            <button
              className="checkout-btn-new"
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
              PROCEED TO ADMISSION
            </button>
            <p className="secure-checkout-tag">
              <span className="lock-icon">🔒</span> SECURE ENCRYPTED CHECKOUT
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookYourSeat;
