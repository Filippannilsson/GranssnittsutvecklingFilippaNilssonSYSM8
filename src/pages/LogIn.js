import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import "../styles/Login.css";
import "../App.css";

function LogIn() {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    //Basic validering
    if (!formData.email || !formData.password) {
      setError("Fill in all fields");
      return;
    }

    try {
      const result = await loginUser(formData.email, formData.password);

      if (result.success) {
        console.log("Login successfull");
        navigate("/profile");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong, try again");
    }
  }

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
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

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
