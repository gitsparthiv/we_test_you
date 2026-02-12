import { useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import HighlightSection from "../components/HighlightSection";
import Footer from "../components/Footer";
import Cohort from "../components/Cohort";
import Register from "../components/Register";
import Payment from "../components/Payment";

function LandingPage() {

  // 1️⃣ Cohort selected
  const [selectedCohortData, setSelectedCohortData] = useState(null);

  // 2️⃣ Registration completed
  const [registeredData, setRegisteredData] = useState(null);

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

      {/* STEP 1: Cohort Selection */}
      <Cohort onSelect={setSelectedCohortData} />

      {/* STEP 2: Registration Form */}
      <Register
        selectedData={selectedCohortData}
        onRegister={setRegisteredData}
      />

      {/* STEP 3: Payment (Show Only After Register) */}
      {registeredData && (
        <Payment selectedData={registeredData} />
      )}

      <Footer />
    </>
  );
}

export default LandingPage;
