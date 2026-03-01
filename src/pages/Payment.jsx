import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);
  const {
    selectedSubjects = [],
    subtotal = 0,
    discount = 0,
    finalTotal = 0,
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

    StudentPhone: (v) => /^[6-9]\d{9}$/.test(v), // Indian mobile rule

    ParentPhone: (v) => /^[6-9]\d{9}$/.test(v),
  };

  const isFormValid = Object.keys(form).every(
    (key) => form[key].trim() !== "" && validators[key](form[key]),
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

            {errors[key] && <div className="error-text">{errors[key]}</div>}
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
              <div className="excel-row">
  VENUE : {venue}
</div>
              <div className="excel-space"></div>

              <div className="excel-row excel-header">
                <span className="subject">SUBJECT</span>
                <span className="cost">COST</span>
              </div>

              {selectedSubjects.map((item, index) => (
                <div className="excel-row" key={index}>
                  <span className="subject-name">
                    {item.name
                      .replace(" Full Package", "")
                      .replace(" Mock Package", "")}
                  </span>

                  <span className="cost">₹ {item.price}</span>
                </div>
              ))}

              <div className="excel-space"></div>

              <div className="excel-row total-row">
                <span className="subtotal">SUBTOTAL</span>
                <span className="cost">₹ {subtotal}</span>
              </div>

              <div className="excel-row">
                <span className="discount">DISCOUNT</span>
                <span className="cost">₹ {discount}</span>
              </div>

              <div className="excel-row grand-total">
                <span className="grandtotal">GRAND TOTAL</span>
                <span className="cost">₹ {finalTotal}</span>
              </div>
            </>
          )}
        </div>

        <button
  className="pay-btn"
  disabled={!isFormValid || isPaying}
  onClick={async () => {
    if (isPaying) return; // extra safety (double-click guard)

    setIsPaying(true);

    const formData = new URLSearchParams();
    formData.append("studentName", form.StudentName);
    formData.append("studentEmail", form.StudentEmail);
    formData.append("studentPhone", form.StudentPhone);
    formData.append("parentName", form.ParentName);
    formData.append("parentPhone", form.ParentPhone);
    formData.append("parentEmail", form.ParentEmail);
    formData.append("subjects", selectedSubjects.map((s) => s.name).join(", "));
    formData.append("packageName", cohortBatch);
    formData.append("subtotal", subtotal);
    formData.append("discount", discount);
    formData.append("finalTotal", finalTotal);
    formData.append("venue", venue); // optional but useful

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyBoYWN83RJFPZbOpj354_npqrsFJn2Hnip_A-m8o4JovaFz8OsrgsR3ZAff0jxmI3r/exec",
        { method: "POST", body: formData }
      );

      const result = await response.json();
      console.log(result);

      if (result.result === "success") {
        alert("Payment Successful & Data Saved!");
      } else {
        alert("Server Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Network or Script Error. Check console.");
    } finally {
      setIsPaying(false);
    }
  }}
>
  {isPaying ? "Processing..." : `Pay ₹ ${finalTotal}`}
</button>
      </div>
    </div>
  );
};

export default Payment;
