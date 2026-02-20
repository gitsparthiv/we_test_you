
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import BookYourSeat from "./pages/BookYourSeat"; // 👈 change path if different
import Header from "./pages/Header"
import Footer from "./pages/Footer" // 👈 change path if different
import Payment from "./pages/Payment";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-seat" element={<BookYourSeat/>} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
