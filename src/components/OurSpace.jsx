import React, { useEffect, useRef } from "react";
import "./OurSpace.css";

const OurSpace = () => {
  const bgRef = useRef(null);

  /* ✅ JS-based parallax — works on ALL devices */
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const speed = 0.4; // 0 = no effect, 1 = full scroll speed
      const yOffset = rect.top * speed;
      bgRef.current.style.backgroundPositionY = `${yOffset}px`;
    };

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