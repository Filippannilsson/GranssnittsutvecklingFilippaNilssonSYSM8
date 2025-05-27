import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    //Funktionalitet senare
  };

  return (
    <main className="main">
      <section className="register-section">
        <h1 className="register-titel">Register</h1>
        <div className="register-line"></div>

        <form onSubmit={handleRegister}>
          <div className="register-name-section">
            <label htmlFor="name" className="register-name-label">
              Name
            </label>
            <div className="name-input">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </div>
          </div>

          <div className="register-email-section">
            <label htmlFor="email" className="register-email-label">
              Email
            </label>
            <div className="register-email-input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="register-password-section">
            <label htmlFor="password" className="register-password-label">
              Password
            </label>
            <div className="register-password-input">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="register-btns">
            <button type="submit" className="register-btn">
              Register
            </button>
            <button
              type="button"
              className="back-to-login-btn"
              onClick={() => navigate("/login")}
            >
              Back to Log In
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
