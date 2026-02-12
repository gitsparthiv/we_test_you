import "./Register.css";
function Register() {
  return (
    <>
      <section className="form-section" id="register">
        <form>
          <h3>Mock Test Registration Form</h3>
          <input type="text" placeholder="Student Full Name" required />
          <input type="email" placeholder="Student Email Address" required />
          <input type="tel" placeholder="Student Mobile Number" required />

          <input type="text" placeholder="Parent Full Name" required />
          <input type="email" placeholder="Parent Email Address" required />
          <input type="tel" placeholder="Parent Mobile Number" required />
          <select required>
            <option value="">Select Cohort</option>
            <option>Cohort A</option>
            <option>Cohort B</option>
            <option>Cohort C</option>
          </select>
          <select required>
            <option value="">Select Preferred Test Location</option>
            <option>City Center Campus</option>
            <option>North Zone Center</option>
            <option>South Zone Center</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default Register;
