import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NextButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    if (location.pathname === "/") navigate("/about");
    else if (location.pathname === "/about") navigate("/project");
    else if (location.pathname === "/project") navigate("/contact");
    else navigate("/");
  };

  const handleBack = () => {
    if (location.pathname === "/contact") navigate("/project");
    else if (location.pathname === "/project") navigate("/about");
    else if (location.pathname === "/about") navigate("/");
  };

  const getNextLabel = () => {
    switch (location.pathname) {
      case "/":
        return "Next → About";
      case "/about":
        return "Next → Project";
      case "/project":
        return "Next → Contact";
      default:
        return "Go Home";
    }
  };

  const getBackLabel = () => {
    switch (location.pathname) {
      case "/about":
        return "← Back to Home";
      case "/project":
        return "← Back to About";
      case "/contact":
        return "← Back to Project";
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {getBackLabel() && (
        <button
          onClick={handleBack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {getBackLabel()}
        </button>
      )}
      <button
        onClick={handleNext}
        style={{
          padding: "10px 20px",
          backgroundColor: "#22c55e",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
        }}
      >
        {getNextLabel()}
      </button>
    </div>
  );
}

export default NextButton;
