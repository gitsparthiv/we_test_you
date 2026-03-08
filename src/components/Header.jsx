import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

useEffect(() => {
  const HIDE_THRESHOLD = 140; // scroll down more before hiding
  const SHOW_THRESHOLD = 40;  // show quickly when scrolling up

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY.current;

    if (currentScrollY <= 10) {
      setShowHeader(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    // scroll down more -> hide
    if (diff > HIDE_THRESHOLD) {
      setShowHeader(false);
      lastScrollY.current = currentScrollY;
    }

    // scroll up slightly -> show
    if (diff < -SHOW_THRESHOLD) {
      setShowHeader(true);
      lastScrollY.current = currentScrollY;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleBookSeat = () => {
    if (location.pathname !== "/") {
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
    <div className={`navbar ${showHeader ? "navbar-show" : "navbar-hide"}`}>
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="WeTestU Logo" className="logo-img" />
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