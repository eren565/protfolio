import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../page/Home/Home";
import About from "../page/About/About";
import Project from "../page/Project/Project";
import Contact from "../page/Contact/Contact";
import Progress from "../page/About/Progress";
import PDFViewer from "../Components/PDFViewer"; // Import PDFViewer

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<PDFViewer />} /> {/* Add Resume Route */}
      </Routes>
    </div>
  )
}

export default Routing