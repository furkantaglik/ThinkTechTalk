import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Notfound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { PrivateRoutes } from "./components/auth/PrivateRoutes";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/home/Navbar";
import BlogPage from "./pages/blog/BlogPage";
import PostPage from "./pages/post/PostPage";
import BlogNewPage from "./pages/blog/BlogNewPage";
import Footer from "./components/home/Footer";

export default function App() {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <main className="max-w-screen-2xl mx-auto px-1 mb-auto">
      {!["/login", "/register"].includes(location.pathname) && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/detail/:id" />
        <Route path="/blog/edit/:id" />
        <Route path="/blog/new" element={<BlogNewPage />} />

        <Route path="/post" element={<PostPage />} />
        <Route path="/post/detail/:id" />
        <Route path="/post/edit/:id" />
        <Route path="/post/new" />

        <Route element={<PrivateRoutes />}>
          {/* Oturum gereken rotalar buraya */}
        </Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <RegisterPage />}
        />
      </Routes>
      {!["/login", "/register"].includes(location.pathname) && <Footer />}
    </main>
  );
}
