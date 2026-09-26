import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const openPDF = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    nav("/resume");
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Project", path: "/project" },
    { name: "Hire Me", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-gray-900 border-b border-gray-200 shadow-md backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <b><span className="text-3xl tracking-wide text-green-600">
          Rohit Nanaware
        </span></b>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-medium items-center justify-center flex-grow">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-white"
                  } hover:text-green-600`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Resume Button */}
          <li>
            <button
              onClick={openPDF}
              className="ml-6 bg-green-600 relative left-80 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
            >
              Resume
            </button>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl text-green-600">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-900 border-t border-gray-200">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `w-full text-center py-2 text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-white"
                } hover:text-green-600`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Resume Button (Mobile) */}
          <button
            onClick={(e) => {
              openPDF(e);
              setMenuOpen(false);
            }}
            className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            Resume
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;