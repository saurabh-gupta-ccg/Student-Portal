import React from 'react'
import Navbar from "./Navbar";
import Home from "./Home";
import Student from "./Student";
import Teacher from "./Teacher";
import Result from "./Result";
import Login from "./login";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
function MainRoute() {
    const { isAuthenticated } = useAuth(); // Access authentication state from context

    return (
      <>
        {isAuthenticated && <Navbar />}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<Student />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </>
    );
}

export default MainRoute;
