import Layout from "./components/layout/Layout";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import AdminProducts from "./admin/Products";
import AdminDashboard from "./admin/Dashboard";
import AdminUsers from "./admin/Users";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AdminLayout from "./admin/AdminLayout";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

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
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
