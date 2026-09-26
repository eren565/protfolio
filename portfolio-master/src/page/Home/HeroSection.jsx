import React from "react";
import { ReactTyped } from "react-typed";
import rohit from "../../assets/img/rohit.jpg";
import AnimatedDotsBG from "../../Components/AnimatedDotsBG";

function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-screen px-6 md:px-16 overflow-hidden transition-all duration-500 bg-gray-50 dark:bg-gray-900">
            <AnimatedDotsBG />

      
      {/* --- 💻 Desktop / Laptop Layout --- */}
      <div className="hidden md:flex flex-row items-center justify-between w-full">
        {/* Left Side (Text) */}
        <div className="flex-1 z-10 text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-green-600 dark:text-green-400 mb-4">
            Rohit Nanaware
          </h1>

          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200">
            I'm a{" "}
            <span className="text-green-500 font-semibold">
              <ReactTyped
                strings={[
                  "React Developer",
                  "WordPress Developer",
                  "Figma Designer",
                  "React Native Developer",
                  "JavaScript Coder",
                ]}
                typeSpeed={60}
                backSpeed={40}
                loop
              />
            </span>
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            Passionate about building beautiful, fast, and modern web & mobile
            experiences with creativity and precision.
          </p>

          <button className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all duration-300">
            View My Work
          </button>
        </div>

        {/* --- Profile Image --- */}
        <div className="absolute left-240">
          <img className="rounded-full w-80 h-80" src={rohit} alt="" />
        </div>

        {/* --- Right Side (Animation + Radar) --- */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* 🔥 Added Radar Section */}
          <div className="radar-wrapper">
            <div className="radar">
              <div className="radar-center" />
              <div className="radar-sweep" />
              <div className="radar-ring ring1" />
              <div className="radar-ring ring2" />
              <div className="radar-ring ring3" />
              <div className="radar-grid" />
            </div>
          </div>

          {/* Your Original Spinning Border Effect */}
          <div className="relative w-[320px] h-[320px] rounded-full border-2 border-green-400/30 animate-spin-slow">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.25)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="absolute inset-[-30px] rounded-full border border-green-400/40 animate-pulse opacity-60"></div>
          </div>
        </div>
      </div>

      {/* --- 📱 Mobile Layout --- */}
      <div className="flex md:hidden relative top-9 flex-col items-center justify-center text-center w-full py-10">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">
          Rohit Nanaware
        </h1>

        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
          I'm a{" "}
          <span className="text-green-500 font-semibold">
            <ReactTyped
              strings={[
                "React Developer",
                "WordPress Developer",
                "Figma Designer",
                "React Native Developer",
                "JavaScript Coder",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed mb-6">
          Passionate about creating modern and creative web & mobile experiences.
        </p>

        <button className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all duration-300 mb-8">
          View My Work
        </button>

        <div className="absolute bottom-10">
          <img className="rounded-full w-55 h-55" src={rohit} alt="" />
        </div>

        {/* Animation below text for mobile */}
        <div className="relative w-[220px] h-[220px] rounded-full border-2 border-green-400/30 animate-spin-slow">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.25)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          <div className="absolute inset-[-20px] rounded-full border border-green-400/40 animate-pulse opacity-60"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
