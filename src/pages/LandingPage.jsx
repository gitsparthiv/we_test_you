import Header from "../components/Header";
import Hero from "../components/Hero";
import HighlightSection from "../components/HighlightSection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />

      <HighlightSection
        id="why"
        title="Why Offline Mock Tests?"
        text="Coaching builds knowledge. But only real-time, pen-and-paper mock examinations under strict supervision prepare students for the actual board exam atmosphere."
      />

      <HighlightSection
        id="pattern"
        title="Test Location & Pattern"
        text="Registered students will receive detailed venue address, reporting time, hall ticket, and examination guidelines via email and SMS."
      />

      <Footer />
    </>
  );
}

export default LandingPage;
