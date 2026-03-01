// import React from "react";
import React, { useState } from "react";

import "./Footer.css";
import { WhatsAppIcon, GmailIcon } from "./Icons";

const Footer = () => {
  const [modalType, setModalType] = useState(null);
  // modalType can be: "refund", "terms", or null

  const closeModal = () => {
    setModalType(null);
  };
  return (
    <div className="footer-container">

      {/* Top Contact Bar */}
      <div className="top-bar">
        <div>Sunrise Greens, Canal Bank Rd, Newtown, Ghuni, West Bengal 700162</div>
        <div>foranything@algo2trade.com </div>
        <div>+91 98747 95959</div>
      </div>

      {/* Main Gradient Section */}
      <div className="footer-hero">
        <div className="big-text">WE TEST U</div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-links">
        <span onClick={() => setModalType("terms")}>
  Terms & Conditions
</span>

<span onClick={() => setModalType("refund")}>
  Refund Policy
</span>
        
        </div>

        <div className="social-icons">
  <a 
    href="https://wa.me/919874795959" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <WhatsAppIcon />
  </a>

  <a 
    href="mailto:foranything@algo2trade.com"
  >
    <GmailIcon />
  </a>
</div>

        <div className="copyright">
         WETESTU is a division of Hubristic Purveyors Pvt. Ltd, bearing CIN: U74999WB2018PTC228083 
        </div>
      </div>
      {modalType && (
  <div className="modal-overlay">
    <div className="modal-box">

      <h2>
        {modalType === "refund" ? "Refund Policy" : "Terms & Conditions"}
      </h2>

      <div className="modal-content">
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
      <p>Cancellation requests must be made at least 72 hours before the scheduled test date.</p>
      <p>Approved cancellations may be eligible for a partial refund (after deducting administrative charges).</p>
    </div>

    <div className="refund-section">
      <h4>2. No-Show Policy</h4>
      <p>If a student fails to attend the exam without prior cancellation, no refund will be provided.</p>
    </div>

    <div className="refund-section">
      <h4>3. Rescheduling</h4>
      <p>Students may request a test reschedule (subject to seat availability).</p>
      <p>Rescheduling must be requested at least 48 hours before the exam.</p>
    </div>

    <div className="refund-section">
      <h4>4. Cancellation by WeTestYou</h4>
      <p>In case of cancellation due to:</p>
      <ul>
        <li>Natural disasters</li>
        <li>Government restrictions</li>
        <li>Technical or venue-related issues</li>
      </ul>
      <p>Students will be offered:</p>
      <ul>
        <li>Full refund</li>
        <li>OR Free rescheduling option</li>
      </ul>
    </div>

    <div className="refund-section">
      <h4>5. Refund Processing</h4>
      <p>Approved refunds will be processed within 7–10 business days.</p>
      <p>Refunds will be made to the original payment method.</p>
    </div>

    <div className="refund-section">
      <h4>6. Non-Refundable Situations</h4>
      <ul>
        <li>Violation of exam conduct rules</li>
        <li>Submission of incorrect registration details</li>
        <li>Last-minute absence without notice</li>
      </ul>
    </div>

    <div className="refund-section">
      <h4>7. Contact for Refund Requests</h4>
      <p>Email: [Insert Email]</p>
      <p>Subject Line: “Refund Request – [Student Name]”</p>
    </div>

  </div>
)}


{modalType === "terms" && (
  <div className="terms-wrapper">

    <h3 className="terms-title">Terms & Conditions</h3>
    <p className="effective-date">Effective Date: [Insert Date]</p>

    <p className="intro-text">
      Welcome to <strong>WeTestYou</strong>. By registering for any mock
      examination or using our website, you agree to comply with the
      following Terms & Conditions.
    </p>

    <div className="terms-section">
      <h4>1. Eligibility</h4>
      <p>Registration is open to students of CBSE Classes 10, 11, and 12.</p>
      <p>Accurate personal and contact details must be provided during registration.</p>
      <p>Parents/guardians may register on behalf of students.</p>
    </div>

    <div className="terms-section">
      <h4>2. Nature of Service</h4>
      <p>WeTestYou provides:</p>
      <ul>
        <li>Offline mock examinations</li>
        <li>Chapter-wise and full-syllabus tests</li>
        <li>Structured evaluation and performance reports</li>
        <li>Board-style exam simulation environment</li>
      </ul>
      <p>We are not affiliated with CBSE or any official board authority.</p>
    </div>

    <div className="terms-section">
      <h4>3. Registration & Payment</h4>
      <p>Registration is confirmed only after successful payment (if applicable).</p>
      <p>Seats are limited and allocated on a first-come, first-served basis.</p>
      <p>Confirmation details will be shared via email/SMS.</p>
    </div>

    <div className="terms-section">
      <h4>4. Exam Conduct Rules</h4>
      <p>Students must report on time, carry valid ID (if required), and follow instructions.</p>
      <p>Failure to comply may result in disqualification without refund.</p>
    </div>

    <div className="terms-section">
      <h4>5. Test Evaluation & Results</h4>
      <p>All answer sheets are evaluated internally.</p>
      <p>Performance reports are for academic improvement purposes only.</p>
      <p>Results do not represent official board scores.</p>
    </div>

    <div className="terms-section">
      <h4>6. Use of Website</h4>
      <p>Users agree not to misuse the registration system or provide false information.</p>
    </div>

    <div className="terms-section">
      <h4>7. Limitation of Liability</h4>
      <p>WeTestYou shall not be liable for loss of belongings, delays, or technical issues.</p>
    </div>

    <div className="terms-section">
      <h4>8. Modifications</h4>
      <p>We reserve the right to update these Terms at any time.</p>
    </div>

    <div className="terms-section">
      <h4>9. Contact Information</h4>
      <p>Email: [Insert Email]</p>
      <p>Phone: [Insert Phone Number]</p>
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

    </div>
  );
};

export default Footer;
