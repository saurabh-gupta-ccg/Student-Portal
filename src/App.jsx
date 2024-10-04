import { useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import MainRoutes from "./Component/MainRoute";
import { ToastProvider } from "./context/ToastContext";
import { StudentProvider } from "./context/StudentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { AuthProvider} from "./context/authContext"; // Import AuthProvider
import "./App.css";

function App() {
  useEffect(() => {
 
    const Dept = localStorage.getItem('dept');
   
    if (!Dept) {
      const defaultDept = [
        {
          id: 1,
          deptName: "Computer Science",
          branches: [
            {
              id: 101,
              branchname: "Software Engineering",
            },
           
            {
              id: 102,
              branchname: "Data Science",
            }
           
          ]
        },
        {
          id: 2,
          deptName: "Electrical Engineering",
          branches: [
            {
              id: 201,
              branchname: "Power Systems",
            },
            {
              id: 202,
              branchname: "Control Engineering",
            }
          ]
        },
        {
          id: 3,
          deptName: "Mechanical engineering",
          branches: [
            {
              id: 301,
              branchname: "Thermal Engineering",
            },
            {
              id: 302,
              branchname: "Manufacturing Engineering",
            }
          ]
        },
      ];
     
 
      localStorage.setItem('dept', JSON.stringify(defaultDept));
      console.log('Department key not found, ');
    } else {
      console.log('Department key found:', JSON.parse(Dept));
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <TeacherProvider>
        <StudentProvider>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </StudentProvider>
        </TeacherProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
