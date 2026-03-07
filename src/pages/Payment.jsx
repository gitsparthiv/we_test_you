import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.background = "#000";
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
    (key) => form[key].trim() !== "" && validators[key](form[key]),
  );

  return (
    <div className="payment-page">
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
                  setForm((prev) => ({ ...prev, [name]: value }));

                  if (validators[name] && !validators[name](value)) {
                    setErrors((prev) => ({
                      ...prev,
                      [name]: `Invalid ${name}`,
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, [name]: "" }));
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
                <div className="excel-row">VENUE : {venue}</div>

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

                <div className="excel-row grand-total">
                  <span className="grandtotal">TOTAL</span>
                  <span className="cost">₹ {total}</span>
                </div>
              </>
            )}
          </div>

          <div className="action-buttons">

            <button
              className="pay-btn"
              disabled={!isFormValid || isPaying}
              onClick={async () => {
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
                  selectedSubjects.map((s) => s.name).join(", "),
                );
                formData.append(
                  "className",
                  selectedSubjects[0]?.className || "",
                );
                formData.append("packageName", cohortBatch);
                formData.append("total", String(total));
                formData.append("venue", venue);

                try {
                  const response = await fetch(
                    "https://script.google.com/macros/s/AKfycbz31cEuHappzjPsxfJrjntM9Ul8wHUsBJ1IT4NhcM4vyXGt38q7JJnmN3qfstms9yWy/exec",
                    { method: "POST", body: formData },
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
                        reason:
                          result?.message || "Server rejected the request",
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
              }}
            >
              {isPaying ? "Processing..." : `Pay ₹ ${total}`}
            </button>
          </div>
        </div>
         <button
          type="button"
          className="back-btn back-btn-bottom-left"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Payment;
