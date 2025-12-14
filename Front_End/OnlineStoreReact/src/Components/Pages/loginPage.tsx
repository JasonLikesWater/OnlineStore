import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try{
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if(!response.ok){
      const err = await response.json();
      setError(err.error || "Login failed.");
      return;
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  } catch (err) {
    setError("Unable to reach server.");
  }
};
  return (
    // outer wrapper controls stacking context for tile + content
    <div style={{ position: "relative", minHeight: "100vh" }} className="login-page-wrapper">
      {/* Tile: absolute and behind content */}
      <div className="tile-pattern" style={{zIndex: 0}}>
        <div className="tile-3" />
      </div>

      {/* Content: above tile */}
      <div className="login-card" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="login-title">Sign In</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        <p className="login-secondary-text">
          New to MovieHub? <span className="login-link">Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;