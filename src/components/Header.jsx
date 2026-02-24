import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo">WeTestU</div>

      <div className="nav-right">
        <button
          className="book-btn"
          onClick={() => {
            if (window.location.pathname !== "/") {
              navigate("/");
              setTimeout(() => {
                document.getElementById("cohorts")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            } else {
              document.getElementById("cohorts")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Book Your Seat <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Header;