import { BrowserRouter} from "react-router-dom";
import MainRoutes from "./Component/MainRoute";
import { ToastProvider } from "./context/ToastContext";
import { StudentProvider } from "./context/StudentContext";
import { AuthProvider} from "./context/authContext"; // Import AuthProvider
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

export default App;
