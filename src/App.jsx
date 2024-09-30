// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./Component/Navbar";
// import Home from "./Component/Home";
// import Student from "./Component/Student";
// import Teacher from "./Component/Teacher";
// import Result from "./Component/Result";
// import Login from "./Component/login";
// import { ToastProvider } from "./context/ToastContext"; // Import ToastProvider
// import { StudentProvider } from './context/StudentContext';
// import "./App.css";

// function App() {
//   const [isAuthenticate, setIsAuthenticate] = useState(false);

//   return (
//     <BrowserRouter>
//     <ToastProvider>
//       <StudentProvider>
//       <>
//         {isAuthenticate && <Navbar setIsAuthenticate={setIsAuthenticate} />}
//         <Routes>
//           {isAuthenticate ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/student" element={<Student />} />
//               <Route path="/teacher" element={<Teacher />} />
//               <Route path="/result" element={<Result />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </>
//           ) : (
//             <>
//               {/* If not authenticated, redirect all routes to Login */}
//               <Route path="*" element={<Login setIsAuthenticate={setIsAuthenticate} isAuthenticate= {isAuthenticate} />} />
//             </>
//           )}
//         </Routes>
//       </>
//       </StudentProvider>
//       </ToastProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter} from "react-router-dom";
import MainRoutes from "./Component/MainRoute";
// import Navbar from "./Component/Navbar";
// import Home from "./Component/Home";
// import Student from "./Component/Student";
// import Teacher from "./Component/Teacher";
// import Result from "./Component/Result";
// import Login from "./Component/login";
import { ToastProvider } from "./context/ToastContext";
import { StudentProvider } from "./context/StudentContext";
import { AuthProvider} from "./context/AuthContext"; // Import AuthProvider
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <StudentProvider>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </StudentProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

// const MainRoutes = () => {
//   const { isAuthenticated } = useAuth(); // Access authentication state from context

//   return (
//     <>
//       {isAuthenticated && <Navbar />}
//       <Routes>
//         {isAuthenticated ? (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/student" element={<Student />} />
//             <Route path="/teacher" element={<Teacher />} />
//             <Route path="/result" element={<Result />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </>
//         ) : (
//           <Route path="*" element={<Login />} />
//         )}
//       </Routes>
//     </>
//   );
// };

export default App;
