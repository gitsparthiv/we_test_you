import { useState } from "react";
import HighlightSection from "../components/HighlightSection";
import Footer from "../components/Footer";
import Cohort from "../components/Cohort";
import Payment from "../components/Payment";
import FrontPage from "../components/FrontPage";

function LandingPage() {

  const [selectedData, setSelectedData] = useState(null);

  const handleRegistration = (data) => {
    setSelectedData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!selectedData && (
        <>
          <FrontPage
            onRegister={handleRegistration}
          />

          <HighlightSection
            id="why"
            title="Why Offline Mock Tests?"
            text="Coaching builds knowledge. But only real-time, pen-and-paper mock examinations prepare students for the real board atmosphere."
          />

          <HighlightSection
            id="pattern"
            title="Test Location & Pattern"
            text="Students receive venue address, reporting time, hall ticket and guidelines via email & SMS."
          />

          <Cohort />
          <Footer />
        </>
      )}

      
    </>
  );
}

export default LandingPage;
