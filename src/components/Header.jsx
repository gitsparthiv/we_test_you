import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBookSeat = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("cohorts")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("cohorts")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        WeTestU
      </div>

      <div className="nav-right">
        <button className="book-btn" onClick={handleBookSeat}>
          Book Your Seat <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Header;