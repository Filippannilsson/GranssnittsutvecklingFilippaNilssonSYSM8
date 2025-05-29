import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import "../styles/Register.css";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const { registerUser, isLoggedIn } = useUser();

  //Om redan inloggad, skicka till profile
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const errors = {};

    //Validera namn
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    //Validera mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    //Validera lösenord
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    //Om inga fel, return true, annars return false
    return Object.keys(errors).length === 0;
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const result = await registerUser(formData);

      if (result.success) {
        console.log("Registration successfull");
        navigate("/profile");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong, try again");
    }
  }

  return (
    <main className="main">
      <section className="register-section">
        <h1 className="register-titel">Register</h1>
        <div className="register-line"></div>

        <form onSubmit={handleRegister} noValidate>
          <div className="register-name-section">
            <label htmlFor="name" className="register-name-label">
              Name
            </label>
            <div className="name-input">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              {validationErrors.name && (
                <span className="field-error">{validationErrors.name}</span>
              )}
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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              {validationErrors.email && (
                <span className="field-error">{validationErrors.email}</span>
              )}
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
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              {validationErrors.password && (
                <span className="field-error">{validationErrors.password}</span>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

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
