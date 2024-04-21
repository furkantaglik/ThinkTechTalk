import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Notfound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { PrivateRoutes } from "./components/auth/PrivateRoutes";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/global/Navbar";

export default function App() {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <div className="max-w-screen-2xl mx-auto px-1">
      {!["/login", "/register"].includes(location.pathname) && <Navbar />}
      <Toaster />
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* Oturum gereken rotalar buraya */}
        </Route>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
}
