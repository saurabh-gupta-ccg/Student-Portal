import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Student from "./Component/Student";
import Teacher from "./Component/Teacher";
import Result from "./Component/Result";
import Login from "./Component/login";
import { ToastProvider } from "./context/ToastContext"; // Import ToastProvider
import "./App.css";

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  return (
    <BrowserRouter>
    <ToastProvider>
      <>
        {isAuthenticate && <Navbar setIsAuthenticate={setIsAuthenticate} />}
        <Routes>
          {isAuthenticate ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<Student />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {/* If not authenticated, redirect all routes to Login */}
              <Route path="*" element={<Login setIsAuthenticate={setIsAuthenticate} />} />
            </>
          )}
        </Routes>
      </>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
