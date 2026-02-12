import { useEffect, useState } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        {/* <span className="logo-main">WE</span> */}
        <span className="logo-highlight">WTESTYOU</span>
        {/* <span className="logo-main">YOU</span> */}
      </div>

      <nav className="nav-links">
        <a href="#why">Why Offline</a>
        <a href="#pattern">Pattern</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
