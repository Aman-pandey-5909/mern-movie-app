import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth/authContext";
import {
  ProtectedRoute,
  AdminRoute,
  PublicRoute,
} from "./context/auth/ProtectedRoute";
import Login from "./pages/Auth/Loginpage";
import Signup from "./pages/Auth/Signuppage";
import Movies from "./pages/Home/Moviepage";
import AdminDashboard from "./pages/Admin/Adminpage";
import AdminLogin from "./pages/Auth/AdminLogin";
import CreateMovie from "./pages/Admin/Createmovie";
import EditMovie from "./pages/Admin/EditMovie";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/adminlogin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminRoute>
              <CreateMovie />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminRoute>
              <EditMovie />
            </AdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
