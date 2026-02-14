import React, { useEffect, useRef } from "react";
import "./FreeClass.css";

const FreeClass = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            box.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (box) {
      observer.observe(box);
    }

    return () => {
      if (box) observer.unobserve(box);
    };
  }, []);

  return (
    <div className="freeclass-section">
      <div className="middle-box" ref={boxRef}>
        <h1>
        TOTAL PACKAGE CONTAINS ONE FREE SUBJECT EXAM
        </h1>
        <p>
        Register today to claim your free exam. No commitment!
        </p>

        <button className="claim-btn">
          Claim Your Free Exam <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default FreeClass;
