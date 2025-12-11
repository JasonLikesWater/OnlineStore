import React from "react";
import { useNavigate } from "react-router-dom";

const Message: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/Pages/loginPage");
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

// function Message() {
  
//   return (
//     <div>
//       {" "}
//       <div className="tile-pattern">
//         <div className="tile-3"></div>{" "}
//       </div>{" "}
//       <div className="hero-content">
//         {/* 1. Bigger Quote/Heading */}{" "}
//         <h1 className="hero-title">Your One-Stop Shop For Movies.</h1>{" "}
//         <p className="hero-subtitle">Discover your next film adventure...</p>
//         {/* 2. Big Sign-up Bar */}{" "}
//         <div className="signup-container">
//           <h2>Ready to watch? Enter your email to begin.</h2>{" "}
//           {/* The form is now the Flex container */}{" "}
//           <form className="email-signup-form ">
//             {" "}
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               aria-label="Email address for sign up"
//               className="signup-input"
//               required
//             />
//             {/* Button is moved inside the form */}{" "}
//             <button type="submit" className="signup-button get-started-button">
//               Get Started &gt;{" "}
//             </button>{" "}
//           </form>{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// }

// export default Message;
