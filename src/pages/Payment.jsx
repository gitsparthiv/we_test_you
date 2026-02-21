import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
const [errors, setErrors] = useState({});
  const {
    selectedSubjects = [],
    subtotal = 0,
    discount = 0,
    finalTotal = 0,
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
  StudentName: (v) =>
    v.trim().length >= 3 && /^[A-Za-z ]+$/.test(v),

  ParentName: (v) =>
    v.trim().length >= 3 && /^[A-Za-z ]+$/.test(v),

  StudentEmail: (v) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(v),

  ParentEmail: (v) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(v),

  StudentPhone: (v) =>
    /^[6-9]\d{9}$/.test(v),   // Indian mobile rule

  ParentPhone: (v) =>
    /^[6-9]\d{9}$/.test(v),
};

const isFormValid =
  Object.keys(form).every(
    (key) =>
      form[key].trim() !== "" &&
      validators[key](form[key])
  );
  return (
    <div className="booking-container">
      {/* LEFT SIDE */}
      <div>
        <div className="section-title">Personal Details</div>

        {Object.keys(form).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/([A-Z])/g, " $1")}</label>
<input
  className={errors[key] ? "input-error" : ""}
  type={
    key.includes("Email")
      ? "email"
      : key.includes("Phone")
      ? "tel"
      : "text"
  }
  name={key}
  value={form[key]}
  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
  onChange={(e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Optional: live validation
    if (validators[name] && !validators[name](value)) {
      setErrors({ ...errors, [name]: `Invalid ${name}` });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  }}
/>

{errors[key] && (
  <div className="error-text">{errors[key]}</div>
)}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="summary-box">
        <div className="section-title">Selected Cohort Details</div>

        <div className="summary-excel">
          {selectedSubjects.length > 0 && (
            <>
              <div className="excel-row">
                CLASS : {selectedSubjects[0].className}
              </div>

              <div className="excel-row">
                PACKAGE : {selectedSubjects[0].packageType.toUpperCase()}
              </div>

              <div className="excel-space"></div>

              <div className="excel-row excel-header">
                <span>SUBJECT</span>
                <span className="cost">COST</span>
              </div>

              {selectedSubjects.map((item, index) => (
                <div className="excel-row" key={index}>
                  <span>
                    {item.name
                      .replace(" Full Package", "")
                      .replace(" Mock Package", "")}
                  </span>

                  <span className="cost">₹ {item.price}</span>
                </div>
              ))}

              <div className="excel-space"></div>

              <div className="excel-row total-row">
                <span>SUBTOTAL</span>
                <span className="cost">₹ {subtotal}</span>
              </div>

              <div className="excel-row">
                <span>DISCOUNT</span>
                <span className="cost">₹ {discount}</span>
              </div>

              <div className="excel-row grand-total">
                <span>GRAND TOTAL</span>
                <span className="cost">₹ {finalTotal}</span>
              </div>
            </>
          )}
        </div>

        <button
          className="pay-btn"
          disabled={!isFormValid}
          onClick={async () => {
            const payload = {
              studentName: form.StudentName,
              studentEmail: form.StudentEmail,
              studentPhone: form.StudentPhone,
              parentName: form.ParentName,
              parentPhone: form.ParentPhone,
              parentEmail: form.ParentEmail,
              subjects: selectedSubjects.map((s) => s.name).join(", "),
              subtotal,
              discount,
              finalTotal,
            };

            try {
              await fetch(
                "https://script.google.com/macros/s/AKfycbxsOpLFCj2thj9VwVd4OluwZQWsCNL76Fqvo_6Uj21mY_Zu2eK3agROk8KcmNy9rcSY/exec",
                {
                  method: "POST",
                  body: JSON.stringify(payload),
                },
              );

              alert("Payment Successful & Data Saved!");
            } catch (error) {
              console.error(error);
              alert("Error saving data");
            }
          }}
        >
          Pay ₹ {finalTotal}
        </button>
      </div>
    </div>
  );
};

export default Payment;
