import React from "react";
import { useNavigate } from "react-router-dom";

const Message: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Pages/productListPage");
    } else {
      navigate("/Pages/loginPage");
    }
  };

  return (
  <div className="hero-wrapper">
      {/* 🔹 tile pattern lives ONLY on the homepage hero */}
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>

      <div className="hero-section text-white mt-5">
        <h1>Your One-Stop Shop For Movies.</h1>
        <p className="hero-subtitle">Discover your next film adventure...</p>

        <h2 className="cta-title">Ready to watch?</h2>

        <div className="cta-center-wrapper mt-4">
          <button
            className="get-started-button"
            type="button"
            onClick={handleGetStarted}
          >
            Get Started &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;