import { useState } from "react";
// import HighlightSection from "../components/HighlightSection";
import Cohort from "../components/Cohort";
import FrontPage from "../components/FrontPage";
import OurSpace from "../components/OurSpace";
import FreeClass from "../components/FreeClass";


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
          <Cohort />
          <OurSpace/>
          <FreeClass />
        </>
      )}

      
    </>
  );
}

export default LandingPage;
