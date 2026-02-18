// import React from "react";
// import "./OurSpace.css";
// import bgImage from "../assets/our_class2-modified.jpg";

// const OurSpace = () => {
//   return (
//     <section className="hero-section">

//       <div
//         className="hero-bg"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="content-box">
//           <h1>
//             PROCTORED<br />EXAMINATION CENTRE
//           </h1>

//         </div>
//       </div>

//       <div className="ticker">
//   <div className="ticker-track">
//     <div className="ticker-content">
//       <span>/ Proctored Exam </span>
//       <span>/ Online / Offline Exam</span>
//       <span>/ Near Your Location</span>
//       <span>/ You Can Choose Subject</span>
//       <span>/ Discount on Individual Subject</span>
//     </div>

//     <div className="ticker-content">
//       <span>/ Proctored Exam </span>
//       <span>/ Online / Offline Exam</span>
//       <span>/ Near Your Location</span>
//       <span>/ You Can Choose Subject</span>
//       <span>/ Discount on Individual Subject</span>
//     </div>
//   </div>
// </div>
//     </section>
//   );
// };

// export default OurSpace;
import React, { useEffect, useRef } from "react";
import "./OurSpace.css";
import bgImage from "../assets/our_class2-modified.jpg";

const OurSpace = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;

    // clone first content block
    const firstBlock = ticker.children[0];
    const clone = firstBlock.cloneNode(true);
    ticker.appendChild(clone);

    let position = 0;
    const speed = 0.7;
    let animationFrame;

    const animate = () => {
      position -= speed;

      // when first block completely moves out
      if (Math.abs(position) >= firstBlock.offsetWidth) {
        position = 0;
      }

      ticker.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="content-box">
          <h1>
            PROCTORED<br />EXAMINATION CENTRE
          </h1>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track" ref={tickerRef}>
          <div className="ticker-content">
            <span>/ Proctored Exam </span>
            <span>/ Online / Offline Exam</span>
            <span>/ Near Your Location</span>
            <span>/ You Can Choose Subject</span>
            <span>/ Discount on Individual Subject</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSpace;
