import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import BookYourSeat from "./pages/BookYourSeat";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";               // OLD footer (Landing page only)
import Small_Footer from "./components/Small_Footer";  // NEW footer (other pages)
import ScrollToTop from "./pages/ScrollToTop";

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-seat" element={<BookYourSeat />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>

      {isLanding ? <Footer /> : <Small_Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;