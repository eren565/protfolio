import React, { useEffect, useRef, useState } from "react";
import RightA from "../../assets/Image/RightA.png";
import { useNavigate } from "react-router-dom";

const skills = [
  { name: "React JS",       percent: 80, from: "#FFFFFF", to: "#FFFFFF" },
  { name: "Node JS",        percent: 70, from: "#A8F5D8", to: "#A8F5D8" },
  { name: "Tailwind CSS",   percent: 77, from: "#42E6A4", to: "#42E6A4" },
  { name: "HTML",           percent: 90, from: "#00C896", to: "#00a63d" },
  { name: "CSS",            percent: 89, from: "#7DF527", to: "#58D100" },
  { name: "React Native",   percent: 60, from: "#76FF38", to: "#53D618" },
  { name: "WordPress",      percent: 60, from: "#3BE61C", to: "#2C9917" },
  { name: "Figma",          percent: 55, from: "#22E533", to: "#8AFF93" },
  { name: "Bootstrap",      percent: 92, from: "#05700B", to: "#25C268" },
];

function CircularBar({ name, percent, from, to, animate, delay }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = null;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(ease * percent));
      if (p < 1) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(t);
  }, [animate, percent, delay]);

  const offset = C - (current / 100) * C;
  const gradId = `g-${name.replace(/\s/g, "")}`;

  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="relative w-32 h-32 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          {/* track */}
          <circle
            cx="60" cy="60" r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="9"
          />
          {/* fill */}
          <circle
            cx="60" cy="60" r={R}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        {/* center % */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold"
            style={{ color: from }}
          >
            {current}%
          </span>
        </div>
      </div>
      <span className="text-white text-sm sm:text-xs md:text-sm lg:text-base font-semibold tracking-wide text-center px-1">
        {name}
      </span>
    </div>
  );
}

function Progress() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const backnavigate = useNavigate();

  const goBack = () => {
    backnavigate(-1);
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-y-auto sm:overflow-hidden items-center justify-start sm:justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-4 relative">
      {/* heading */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="text-center mb-10 mt-30 sm:mb-2 flex-shrink-0"
      >
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          My <span style={{ color: "#42E6A4" }}>Skills</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-sm md:text-base">
          Technologies I work with
        </p>
      </div>

      {/* grid */}
      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-5xl sm:flex-1 items-center justify-items-center sm:content-center pb-24 sm:pb-20"
      >
        {skills.map((s, i) => (
          <CircularBar
            key={s.name}
            {...s}
            animate={visible}
            delay={i * 100}
          />
        ))}
      </div>

      {/* back button */}
      <button
        onClick={goBack}
        className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 md:bottom-10 bg-[#00a63d] p-2 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:rotate-20 z-50"
      >
        <img src={RightA} className="h-8 sm:h-7 md:h-8 lg:h-10 rotate-180" alt="back" />
      </button>
    </div>
  );
}

export default Progress;