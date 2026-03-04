// FacultySection.jsx
import React from "react";
import "./FacultySection.css";

const facultyData = [
  {
    name: "Dr. Arvind Sharma",
    subject: "Physics Faculty",
    experience: "12+ Years Experience",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
  },
  {
    name: "Ms. Riya Verma",
    subject: "Mathematics Faculty",
    experience: "9+ Years Experience",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
  },
  {
    name: "Mr. Sandeep Roy",
    subject: "Chemistry Faculty",
    experience: "10+ Years Experience",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
  },
  {
    name: "Ms. Priya Iyer",
    subject: "Biology Faculty",
    experience: "8+ Years Experience",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
  },
  {
    name: "Mr. Kunal Singh",
    subject: "Accountancy Faculty",
    experience: "11+ Years Experience",
    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
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