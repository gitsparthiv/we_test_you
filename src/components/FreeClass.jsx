import React, { useEffect, useRef } from "react";
import "./FreeClass.css";

const FreeClass = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("active");
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect(); // cleaner than unobserve
    };
  }, []);

  const scrollToCohorts = () => {
    const section = document.getElementById("cohorts");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="freeclass-page">
      <div className="freeclass-section">
        <div className="middle-box" ref={boxRef}>
          <h1>TOTAL PACKAGE CONTAINS ONE FREE SUBJECT EXAM</h1>

          <p>Register today to claim your free exam. No commitment!</p>

          <button className="claim-btn" onClick={scrollToCohorts}>
            Claim Your Free Exam <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreeClass;