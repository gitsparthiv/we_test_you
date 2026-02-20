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
          onClick={() => navigate("/book-seat")}
        >
          Book Your Seat <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Header;