import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Notfound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { PrivateRoutes } from "./components/auth/PrivateRoutes";

export default function App() {
  const token = localStorage.getItem("token");
  return (
    <main className="max-w-screen-2xl mx-auto md:px-0 px-1">
      <Toaster />

      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* Oturum gereken rotalar buraya */}
        </Route>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <RegisterPage />}
        />
      </Routes>
    </main>
  );
}
