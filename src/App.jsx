
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import BookYourSeat from "./pages/BookYourSeat"; // 👈 change path if different

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-seat" element={<BookYourSeat/>} />
      </Routes>
    </Router>
  );
}

export default App;
