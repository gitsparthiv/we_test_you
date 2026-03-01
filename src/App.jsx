
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import BookYourSeat from "./pages/BookYourSeat"; // 👈 change path if different
import Header from "./components/Header"
import Footer from "./components/Footer" // 👈 change path if different
import Payment from "./pages/Payment"; // 👈 change path if different
import ScrollToTop from "./pages/ScrollToTop"; // 👈 change path if different
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-seat" element={<BookYourSeat/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
