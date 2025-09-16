import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/layout/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import AdminProducts from "./admin/Products";
import AdminDashboard from "./admin/Dashboard";
import AdminUsers from "./admin/Users";
import AdminLayout from "./admin/AdminLayout";
import Categories from "./admin/Categories";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function AppRoutes({ searchTerm, setSearchTerm }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
