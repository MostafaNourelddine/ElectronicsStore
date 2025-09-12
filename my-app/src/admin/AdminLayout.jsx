// src/admin/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaHome } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04369a] text-white flex flex-col shadow-xl">
        <div className="text-2xl font-bold p-6 border-b border-white/20">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-[#04369a] font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-[#04369a] font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <FaBox /> Products
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-[#04369a] font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <FaUsers /> Users
          </NavLink>
        </nav>

        {/* Bottom button */}
        <div className="p-4 border-t border-white/20 text-sm text-gray-200">
          <NavLink
            to="/"
            className="flex items-center justify-center gap-2 py-2 px-4 bg-white text-[#04369a] rounded-lg hover:bg-gray-100 transition"
          >
            <FaHome /> Go to Homepage
          </NavLink>
          <div className="mt-2 text-center">© 2025 Admin</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
