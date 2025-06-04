import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { loginUser, isLoggedIn } = useUser();

  //Om redan inloggad, skicka till profile
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    username: "",
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
    if (!formData.username || !formData.password) {
      setError("Fill in all fields");
      return;
    }

    try {
      const result = await loginUser(formData.username, formData.password);

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
          <div className="login-username-section">
            <label htmlFor="username" className="login-username-label">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="login-password-section">
            <label htmlFor="password" className="login-password-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
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

export default Login;
