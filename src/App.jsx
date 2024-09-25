import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Student from "./Component/Student";
import Teacher from "./Component/Teacher";
import Result from "./Component/Result";
import Contact from "./Component/Contact";

import "./App.css";

function App() {
  return (
  
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
