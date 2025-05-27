import { useNavigate } from "react-router-dom";
import "../styles/LogIn.css";
import "../App.css";

function LogIn() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //Funktionalitet senare
  };

  return (
    <main className="main-page">
      <section className="login-section">
        <h1 className="log-in-titel">Log In</h1>
        <div className="log-in-line"></div>

        <form onSubmit={handleLogin}>
          <div className="login-email-section">
            <label htmlFor="email" className="login-email-label">
              Email
            </label>
            <div className="login-email-input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="login-password-section">
            <label htmlFor="password" className="login-password-label">
              Password
            </label>
            <div className="login-password-input">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="login-btns">
            <button type="submit" className="login-btn">
              Log in
            </button>
            <button
              type="button"
              className="to-register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LogIn;
