import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">

      {/* Top Contact Bar */}
      <div className="top-bar">
        <div>500 Terry Francine Street, SF, CA 94158</div>
        <div>info@mysite.com</div>
        <div>123-456-7890</div>
      </div>

      {/* Main Gradient Section */}
      <div className="footer-hero">
        <div className="big-text">WE TEST U</div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-links">
          <span>Terms & Conditions</span>
          
          <span>Refund Policy</span>
        
        </div>

        <div className="social-icons">
          <span>▶</span>
          <span>📷</span>
        </div>

        <div className="copyright">
         WETESTU is a division of Hubristic Purveyors Pvt. Ltd, bearing CIN: U74999WB2018PTC228083 
        </div>
      </div>

    </div>
  );
};

export default Footer;
