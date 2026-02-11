import { useState, useEffect } from "react";
import examImage from "../assets/exam-hall.webp";

function Hero() {
  const words = [
    "Exam-Ready.",
    "Board-Prepared.",
    "Mentally Strong.",
    "Performance Confident."
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingSpeed = isDeleting ? 50 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));

        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${examImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h2>
            Tuition Teaches You.<br />
            Offline Mock Tests Make You
            <br />
            <span className="typing">{displayText}</span>
          </h2>

          <p>
            Structured offline mock examinations for CBSE Classes 10, 11 & 12
            in real board-style environment.
          </p>

          <a href="#register" className="hero-btn">
            Register for Upcoming Mock Test
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
