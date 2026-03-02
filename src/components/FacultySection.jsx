// FacultySection.jsx
import React from "react";
import "./FacultySection.css";

const facultyData = [
  {
    name: "Dr. Arvind Sharma",
    subject: "Physics Faculty",
    experience: "12+ Years Experience",
    image: "https://source.unsplash.com/300x400/?man,teacher"
  },
  {
    name: "Ms. Riya Verma",
    subject: "Mathematics Faculty",
    experience: "9+ Years Experience",
    image: "https://source.unsplash.com/300x400/?woman,teacher"
  },
  {
    name: "Mr. Sandeep Roy",
    subject: "Chemistry Faculty",
    experience: "10+ Years Experience",
    image: "https://source.unsplash.com/300x400/?professor,man"
  },
  {
    name: "Ms. Priya Iyer",
    subject: "Biology Faculty",
    experience: "8+ Years Experience",
    image: "https://source.unsplash.com/300x400/?woman,professor"
  },
  {
    name: "Mr. Kunal Singh",
    subject: "Accountancy Faculty",
    experience: "11+ Years Experience",
    image: "https://source.unsplash.com/300x400/?indian,teacher"
  }
];

const FacultySection = () => {
  return (
    <div className="faculty-section">
      <h2 className="faculty-title">OUR FACULTY</h2>

      <div className="faculty-slider">
        <div className="faculty-track">
          {[...facultyData, ...facultyData].map((faculty, index) => (
            <div className="faculty-card" key={index}>
              <div className="faculty-image">
                <img src={faculty.image} alt={faculty.name} />
              </div>

              <div className="faculty-info">
                <h3>{faculty.name}</h3>
                <p>{faculty.subject}</p>
                <span>{faculty.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultySection;