import React, { useState, useEffect } from "react";
import "./Small_Footer.css";
import { WhatsAppIcon, GmailIcon } from "./Icons";

const Small_Footer = () => {
  const [modalType, setModalType] = useState(null);
  // modalType: "terms" | "refund" | null

  const closeModal = () => setModalType(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <footer className="small-footer">

      {/* Top Section */}
      <div className="sf-top">

        <div className="sf-contact">
          <div className="sf-contact-item">
            +91 98747 95959
          </div>
          <div className="sf-contact-item">
            foranything@algo2trade.com
          </div>
        </div>

        <div className="sf-big-brand">WETESTU</div>

        <div className="sf-social">
          <a 
            href="https://wa.me/919874795959" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </a>

          <a href="mailto:foranything@algo2trade.com">
            <GmailIcon />
          </a>
        </div>

      </div>

      <div className="sf-divider"></div>

      {/* Bottom Section */}
      <div className="sf-bottom">

        <div className="sf-links">

          <button className="sf-link-btn" onClick={() => setModalType("terms")}>
            Terms and Conditions
          </button>

          <button className="sf-link-btn" onClick={() => setModalType("refund")}>
            Refund Policy
          </button>

        </div>

        <div className="sf-cif">
          WETESTU is a division of Hubristic Purveyors Pvt. Ltd, bearing CIN:
          U74999WB2018PTC228083
        </div>

        <div className="sf-addr">
          Sunrise Greens, Canal Bank Rd, Newtown, Ghuni, West Bengal 700162
        </div>

      </div>

      {/* ===== Modal ===== */}
      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <h2>
              {modalType === "terms"
                ? "Terms & Conditions"
                : "Refund Policy"}
            </h2>

            <div className="modal-content">

              {/* ===== TERMS ===== */}
              {modalType === "terms" && (
                <div className="terms-wrapper">
                  <h3 className="terms-title">Terms & Conditions</h3>
                  <p className="effective-date">Effective Date: [Insert Date]</p>

                  <p className="intro-text">
                    Welcome to <strong>WeTestYou</strong>. By registering for any mock
                    examination or using our website, you agree to comply with
                    the following Terms & Conditions.
                  </p>

                  <div className="terms-section">
                    <h4>1. Eligibility</h4>
                    <p>Registration is open to students of CBSE Classes 10, 11, and 12.</p>
                    <p>Accurate personal details must be provided.</p>
                  </div>

                  <div className="terms-section">
                    <h4>2. Nature of Service</h4>
                    <ul>
                      <li>Offline mock examinations</li>
                      <li>Chapter-wise and full-syllabus tests</li>
                      <li>Performance reports</li>
                      <li>Board-style exam simulation</li>
                    </ul>
                    <p>We are not affiliated with CBSE.</p>
                  </div>

                  <div className="terms-section">
                    <h4>3. Registration & Payment</h4>
                    <p>Registration is confirmed after successful payment.</p>
                  </div>

                  <div className="terms-section">
                    <h4>4. Exam Conduct</h4>
                    <p>Failure to follow instructions may lead to disqualification without refund.</p>
                  </div>
                </div>
              )}

              {/* ===== REFUND ===== */}
              {modalType === "refund" && (
                <div className="refund-wrapper">

                  <h3 className="refund-title">Refund Policy</h3>
                  <p className="effective-date">Effective Date: [Insert Date]</p>

                  <p className="intro-text">
                    At <strong>WeTestYou</strong>, we strive to maintain transparency
                    and fairness regarding payments and refunds.
                  </p>

                  <div className="refund-section">
                    <h4>1. Registration Cancellation by Student</h4>
                    <p>Cancellation must be made 72 hours before test date.</p>
                    <p>Partial refund after admin charges.</p>
                  </div>

                  <div className="refund-section">
                    <h4>2. No-Show Policy</h4>
                    <p>No refund for absence without prior cancellation.</p>
                  </div>

                  <div className="refund-section">
                    <h4>3. Rescheduling</h4>
                    <p>Allowed 48 hours before exam (subject to availability).</p>
                  </div>

                  <div className="refund-section">
                    <h4>4. Cancellation by WeTestYou</h4>
                    <ul>
                      <li>Natural disasters</li>
                      <li>Government restrictions</li>
                      <li>Technical/venue issues</li>
                    </ul>
                    <p>Full refund OR free rescheduling.</p>
                  </div>

                  <div className="refund-section">
                    <h4>5. Refund Processing</h4>
                    <p>Processed within 7–10 business days.</p>
                  </div>

                  <div className="refund-section">
                    <h4>6. Non-Refundable Situations</h4>
                    <ul>
                      <li>Violation of rules</li>
                      <li>Incorrect details</li>
                      <li>Last-minute absence</li>
                    </ul>
                  </div>

                </div>
              )}

            </div>

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>

          </div>
        </div>
      )}

    </footer>
  );
};

export default Small_Footer;