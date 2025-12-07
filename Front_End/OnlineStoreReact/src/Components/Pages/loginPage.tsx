// function LoginPage() {
//   return (
//     <>
//       {" "}
//       <figure className="text-center">
//         <blockquote className="blockquote">
//           <p>This is the Login page</p>
//         </blockquote>
//       </figure>
//     </>
//   );
// }

// export default LoginPage;


// src/Components/Pages/loginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Fake auth for now – replace with real API later
    if (email === "demo@moviehub.com" && password === "password123") {
      // store a simple “logged in” flag
      localStorage.setItem(
        "moviehubUser",
        JSON.stringify({ email, loggedInAt: new Date().toISOString() })
      );

      navigate("/"); // send them back to home
    } else {
      setError("Invalid email or password. Try demo@moviehub.com / password123.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
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
