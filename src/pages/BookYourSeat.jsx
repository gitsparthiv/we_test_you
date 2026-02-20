import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookYourSeat.css";
import { FaShoppingCart } from "react-icons/fa";

const BookYourSeat = () => {
  const navigate = useNavigate();

  const data = {
    "10": [
      {
        name: "Science",
        price: 3000,
        sessions: [
          { chapter: "Matter", date: "10 Jan 2026" },
          { chapter: "Light", date: "15 Jan 2026" },
          { chapter: "Electricity", date: "20 Jan 2026" },
          { chapter: "Magnetism", date: "25 Jan 2026" },
          { chapter: "Sources of Energy", date: "30 Jan 2026" },
          { chapter: "Environment", date: "5 Feb 2026" }
        ]
      },
      {
        name: "Mathematics",
        price: 3200,
        sessions: [
          { chapter: "Algebra", date: "12 Jan 2026" },
          { chapter: "Trigonometry", date: "18 Jan 2026" },
          { chapter: "Statistics", date: "22 Jan 2026" },
          { chapter: "Probability", date: "28 Jan 2026" },
          { chapter: "Geometry", date: "2 Feb 2026" },
          { chapter: "Mensuration", date: "7 Feb 2026" }
        ]
      },
      {
        name: "English",
        price: 2500,
        sessions: [
          { chapter: "Grammar", date: "8 Jan 2026" },
          { chapter: "Essay Writing", date: "14 Jan 2026" },
          { chapter: "Letter Writing", date: "19 Jan 2026" },
          { chapter: "Poetry", date: "24 Jan 2026" },
          { chapter: "Drama", date: "29 Jan 2026" },
          { chapter: "Comprehension", date: "4 Feb 2026" }
        ]
      }
    ],
    "11": [
      {
        name: "Physics",
        price: 4000,
        sessions: [
          { chapter: "Kinematics", date: "5 Mar 2026" },
          { chapter: "Laws of Motion", date: "10 Mar 2026" },
          { chapter: "Work & Energy", date: "15 Mar 2026" },
          { chapter: "Magnetism", date: "25 Jan 2026" },
          { chapter: "Sources of Energy", date: "30 Jan 2026" },
          { chapter: "Environment", date: "5 Feb 2026" }
        ]
      },
      {
        name: "Chemistry",
        price: 3800,
        sessions: [
          { chapter: "Atomic Structure", date: "6 Mar 2026" },
          { chapter: "Chemical Bonding", date: "11 Mar 2026" }
        ]
      }
    ],
    "12": [
      {
        name: "Physics",
        price: 4500,
        sessions: [
          { chapter: "Electrostatics", date: "10 Apr 2026" },
          { chapter: "Current Electricity", date: "15 Apr 2026" }
        ]
      },
      {
        name: "Biology",
        price: 4000,
        sessions: [
          { chapter: "Genetics", date: "12 Apr 2026" },
          { chapter: "Evolution", date: "22 Apr 2026" }
        ]
      }
    ]
  };

  const getInitialLoadCount = (cls) => {
    const init = {};
    data[cls]?.forEach((_, index) => {
      init[index] = 3;
    });
    return init;
  };

  const [currentClass, setCurrentClass] = useState("10");
  const [currentVenue, setCurrentVenue] = useState("South");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loadedCount, setLoadedCount] = useState(getInitialLoadCount("10"));

  /* =========================
     UPDATED CART CALCULATION
  ========================= */

  const subtotal = selectedSubjects.reduce(
    (sum, item) => sum + item.price,
    0
  );

  let discount = 0;

  const classGroups = {};

  selectedSubjects.forEach(item => {
    if (!classGroups[item.class]) {
      classGroups[item.class] = [];
    }
    classGroups[item.class].push(item);
  });

  Object.keys(classGroups).forEach(cls => {
    const totalSubjectsInClass = data[cls]?.length || 0;
    const selectedInClass = classGroups[cls].length;

    if (
      selectedInClass === totalSubjectsInClass &&
      totalSubjectsInClass > 0
    ) {
      const lowestPrice = Math.min(
        ...classGroups[cls].map(item => item.price)
      );
      discount += lowestPrice;
    }
  });

  const finalTotal = subtotal - discount;

  /* ========================= */

  const changeClassHandler = (cls) => {
    setCurrentClass(cls);
    setLoadedCount(getInitialLoadCount(cls));
  };

  const addSubject = (name, price) => {
    const key = name + "-Class" + currentClass;

    if (selectedSubjects.some(item => item.key === key)) {
      alert("Subject already added.");
      return;
    }

    setSelectedSubjects([
      ...selectedSubjects,
      { key, name, price, class: currentClass, venue: currentVenue }
    ]);
  };

  const removeItem = (key) => {
    setSelectedSubjects(
      selectedSubjects.filter(item => item.key !== key)
    );
  };

  const loadMore = (index) => {
    setLoadedCount(prev => ({
      ...prev,
      [index]: prev[index] + 3
    }));
  };

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
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <span>Cohort</span>
            {['10', '11', '12'].map(cls => (
              <button
                key={cls}
                className={`filter-btn ${currentClass === cls ? "active" : ""}`}
                onClick={() => changeClassHandler(cls)}
              >
                Class {cls}
              </button>
            ))}
          </div>

          <div className="filter-row">
            <span>Venue</span>
            {["South","North","East","West"].map(venue => (
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
              {data[currentClass]?.map((subject, index) => (
                <React.Fragment key={index}>
                  <tr className="subject-row">
                    <td><strong>{subject.name}</strong></td>
                    <td>{currentClass}</td>
                    <td>{currentVenue}</td>
                    <td>—</td>
                    <td>—</td>
                    <td>
                      <button
                        className="add-subject-btn"
                        onClick={() => addSubject(subject.name, subject.price)}
                      >
                        Add (₹{subject.price})
                      </button>
                    </td>
                  </tr>

                  {subject.sessions
                    .slice(0, loadedCount[index])
                    .map((session, i) => (
                      <tr key={i}>
                        <td></td>
                        <td>{currentClass}</td>
                        <td>{currentVenue}</td>
                        <td>{session.chapter}</td>
                        <td>{session.date}</td>
                        <td></td>
                      </tr>
                  ))}

                  {loadedCount[index] < subject.sessions.length && (
                    <tr>
                      <td colSpan="6" className="load-more-cell">
                        <button
                          className="filter-btn"
                          onClick={() => loadMore(index)}
                        >
                          Load More Sessions
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cart-panel">
        <h2>Your Cart</h2>

        <div className="cart-items">
          {selectedSubjects.map(item => (
            <div className="cart-item" key={item.key}>
              <span>
                {item.name} (Class {item.class} - {item.venue})
              </span>
              <span>
                ₹{item.price}
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
  onClick={() =>
    navigate("/payment", {
      state: {
        selectedSubjects,
        subtotal,
        discount,
        finalTotal
      }
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
