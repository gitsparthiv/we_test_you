import React, { useEffect, useRef } from "react";
import "./OurSpace.css";

const OurSpace = () => {
  const bgRef = useRef(null);

  /* ✅ JS-based parallax — works on ALL devices */
useEffect(() => {
  const handleScroll = () => {
    if (!bgRef.current) return;

    const rect = bgRef.current.getBoundingClientRect();
    const speed = 0.18;
    let yOffset = rect.top * speed;

    yOffset = Math.max(-60, Math.min(60, yOffset));

    bgRef.current.style.backgroundPosition = `center calc(50% + ${yOffset}px)`;
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <section className="hero-section">

      <div className="hero-bg" ref={bgRef}>
        <div className="content-box">
          <h1>
            PROCTORED<br />EXAMINATION CENTRE
          </h1>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track">

          <div className="ticker-content">
            <span>Proctored Exam</span>
            <span>Online / Offline Exam</span>
            <span>Near Your Location</span>
            <span>You Can Choose Subject</span>
            <span>Discount on Individual Subject</span>
            <span>University backed faculty expertise</span>
          </div>

          <div className="ticker-content">
            <span>Proctored Exam</span>
            <span>Online / Offline Exam</span>
            <span>Near Your Location</span>
            <span>You Can Choose Subject</span>
            <span>Discount on Individual Subject</span>
            <span>University backed faculty expertise</span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default OurSpace;