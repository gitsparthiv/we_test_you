import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = "#000";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);

  const {
    selectedSubjects = [],
    total = 0,
    cohortBatch = "",
    venue = "",
  } = state || {};

  const [form, setForm] = useState({
    StudentName: "",
    StudentEmail: "",
    StudentPhone: "",
    ParentName: "",
    ParentPhone: "",
    ParentEmail: "",
  });

  const validators = {
    StudentName: (v) => v.trim().length >= 3 && /^[A-Za-z ]+$/.test(v),
    ParentName: (v) => v.trim().length >= 3 && /^[A-Za-z ]+$/.test(v),
    StudentEmail: (v) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(v),
    ParentEmail: (v) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(v),
    StudentPhone: (v) => /^[6-9]\d{9}$/.test(v),
    ParentPhone: (v) => /^[6-9]\d{9}$/.test(v),
  };

  const isFormValid = Object.keys(form).every(
    (key) => form[key].trim() !== "" && validators[key]?.(form[key])
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (validators[name] && !validators[name](value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Invalid ${name.replace(/([A-Z])/g, " $1").trim()}`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePay = async () => {
    if (isPaying) return;
    setIsPaying(true);

    const formData = new URLSearchParams();
    formData.append("studentName", form.StudentName);
    formData.append("studentEmail", form.StudentEmail);
    formData.append("studentPhone", form.StudentPhone);
    formData.append("parentName", form.ParentName);
    formData.append("parentPhone", form.ParentPhone);
    formData.append("parentEmail", form.ParentEmail);
    formData.append(
      "subjects",
      selectedSubjects.map((s) => s.name).join(", ")
    );
    formData.append("className", selectedSubjects[0]?.className || "");
    formData.append("packageName", cohortBatch);
    formData.append("total", String(total));
    formData.append("venue", venue);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz31cEuHappzjPsxfJrjntM9Ul8wHUsBJ1IT4NhcM4vyXGt38q7JJnmN3qfstms9yWy/exec",
        { method: "POST", body: formData }
      );

      const result = await response.json();

      if (result?.result === "success") {
        navigate("/payment-success", {
          replace: true,
          state: {
            studentName: form.StudentName,
            studentEmail: form.StudentEmail,
            studentPhone: form.StudentPhone,
            selectedSubjects,
            total,
            cohortBatch,
            venue,
          },
        });
      } else {
        navigate("/payment-failed", {
          replace: true,
          state: {
            reason: result?.message || "Server rejected the request",
          },
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/payment-failed", {
        replace: true,
        state: { reason: "Network or Script Error" },
      });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="booking-container">
        {/* LEFT SIDE: FORM */}
        <div className="form-section">
          <h2 className="section-title">REGISTRATION DETAILS</h2>
          
          <div className="form-grid">
            {Object.keys(form).map((key) => (
              <div className="form-group" key={key}>
                <label>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  className={errors[key] ? "input-error" : ""}
                  type={key.includes("Email") ? "email" : key.includes("Phone") ? "tel" : "text"}
                  name={key}
                  value={form[key]}
                  placeholder={`ENTER ${key.replace(/([A-Z])/g, " $1").toUpperCase()}`}
                  onChange={handleInputChange}
                  required
                />
                {errors[key] && <span className="error-text">{errors[key]}</span>}
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← EXIT SELECTION
          </button>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="summary-box">
          <div className="summary-header">
            <h3>ORDER SUMMARY</h3>
          </div>

          <div className="summary-content">
            {selectedSubjects.length > 0 && (
              <>
                <div className="excel-row detail-main">CLASS: {selectedSubjects[0].className}</div>
                <div className="excel-row detail-main">PACKAGE: {cohortBatch.toUpperCase()}</div>
                <div className="excel-row detail-main">VENUE: {venue.toUpperCase()}</div>

                <div className="excel-header excel-row">
                  <span>SUBJECT</span>
                  <span>PRICE</span>
                </div>

                {selectedSubjects.map((item, index) => (
                  <div className="excel-row" key={index}>
                    <span className="subject-name">
                      {item.name.replace(" Full Package", "").replace(" Mock Package", "")}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                ))}

                <div className="excel-space"></div>

                <div className="excel-row grand-total">
                  <span>TOTAL</span>
                  <span>₹{total}</span>
                </div>
              </>
            )}
          </div>

          <div className="action-buttons">
            <button
              className="pay-btn"
              disabled={!isFormValid || isPaying}
              onClick={handlePay}
            >
              {isPaying ? "PROCESSING..." : `PAY ₹${total}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
