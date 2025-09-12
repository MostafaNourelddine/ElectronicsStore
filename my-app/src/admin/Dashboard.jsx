import React from "react";
import { useSelector } from "react-redux";
import mockUsers from "../users";
import mockProducts from "../products";

const Dashboard = () => {
  const usersFromSlice = useSelector((state) => state.auth.users || []);
  const users = [
    ...mockUsers,
    ...usersFromSlice.filter(
      (u) => !mockUsers.find((mu) => mu.username === u.username)
    ),
  ];

  const totalUsers = users.length;
  const roles = [...new Set(users.map((u) => u.role))];
  const usersPerRole = roles.map((role) => ({
    role,
    count: users.filter((u) => u.role === role).length,
  }));

  const productsFromSlice = useSelector((state) => state.products.list || []);
  const products = [
    ...mockProducts,
    ...productsFromSlice.filter(
      (p) => !mockProducts.find((mp) => mp.id === p.id)
    ),
  ];

  const totalProducts = products.length;
  const categories = [...new Set(products.map((p) => p.category))];
  const productsPerCategory = categories.map((cat) => ({
    category: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#04369a]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Categories</h2>
          <p className="text-3xl font-bold mt-2">{categories.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Products per Category</h2>
        <ul className="space-y-2">
          {productsPerCategory.map((cat) => (
            <li
              key={cat.category}
              className="flex justify-between px-4 py-2 bg-gray-100 rounded"
            >
              <span>{cat.category}</span>
              <span className="font-bold">{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Roles</h2>
          <p className="text-3xl font-bold mt-2">{roles.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Users per Role</h2>
        <ul className="space-y-2">
          {usersPerRole.map((r) => (
            <li
              key={r.role}
              className="flex justify-between px-4 py-2 bg-gray-100 rounded"
            >
              <span>{r.role}</span>
              <span className="font-bold">{r.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
