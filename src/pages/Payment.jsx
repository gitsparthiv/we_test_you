import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();

  const {
    selectedSubjects = [],
    subtotal = 0,
    discount = 0,
    finalTotal = 0
  } = state || {};

  const [form, setForm] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    parentName: "",
    parentPhone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    Object.values(form).every(value => value.trim() !== "");

  return (
    <div className="booking-container">

      {/* LEFT SIDE */}
      <div>
        <div className="section-title">Personal Details</div>

        {Object.keys(form).map(key => (
          <div className="form-group" key={key}>
            <label>{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="summary-box">
        <div className="section-title">Selected Cohort Details</div>

        <table className="summary-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th className="right">Cost</th>
            </tr>
          </thead>

          <tbody>
            {selectedSubjects.map((item, index) => (
              <tr key={index}>
                <td>Class {item.class}</td>
                <td>{item.name}</td>
                <td className="right">₹ {item.price}</td>
              </tr>
            ))}

            <tr className="total-row">
              <td colSpan="2">Subtotal</td>
              <td className="right">₹ {subtotal}</td>
            </tr>

            <tr>
              <td colSpan="2">Discount</td>
              <td className="right">₹ {discount}</td>
            </tr>

            <tr className="grand-total">
              <td colSpan="2">Grand Total</td>
              <td className="right">₹ {finalTotal}</td>
            </tr>
          </tbody>
        </table>

        <button
          className="pay-btn"
          disabled={!isFormValid}
          onClick={async () => {
            const payload = {
              studentName: form.studentName,
              studentEmail: form.studentEmail,
              studentPhone: form.studentPhone,
              parentName: form.parentName,
              parentPhone: form.parentPhone,
              subjects: selectedSubjects.map(s => s.name).join(", "),
              subtotal,
              discount,
              finalTotal
            };
          
            try {
              await fetch("https://script.google.com/macros/s/AKfycbxsOpLFCj2thj9VwVd4OluwZQWsCNL76Fqvo_6Uj21mY_Zu2eK3agROk8KcmNy9rcSY/exec", {
                method: "POST",
                body: JSON.stringify(payload)
              });
          
              alert("Payment Successful & Data Saved!");
            } catch (error) {
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