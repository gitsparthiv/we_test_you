import React from "react";
import "./Footer.css";
import { WhatsAppIcon, GmailIcon } from "./Icons";

const Footer = () => {
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
          <span>Terms & Conditions</span>
          
          <span>Refund Policy</span>
        
        </div>

        <div className="social-icons">
          <span><WhatsAppIcon /></span>
          <span><GmailIcon /></span>
        </div>

        <div className="copyright">
         WETESTU is a division of Hubristic Purveyors Pvt. Ltd, bearing CIN: U74999WB2018PTC228083 
        </div>
      </div>

    </div>
  );
};

export default Footer;
