import { useState, useRef, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaTools } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, selectSelf } from "../slices/ProductsSlice.js";
import { logout, updatePassword } from "../slices/AuthSlice.js";
import { Dialog } from "primereact/dialog";
import notify from "../utils/notify";

import Cart from "./Cart.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector(selectSelf);
  const user = useSelector((state) => state.auth.user);
  const [showCart, setShowCart] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleResetPassword = () => {
    setShowResetDialog(true);
    setShowProfileMenu(false);
  };

  const handleResetPasswordSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    dispatch(updatePassword({ newPassword }));
    setShowResetDialog(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    notify.success("Password updated successfully!");
  };

  const handleAdminClick = () => {
    if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      notify.error("Access denied. Admins only.");
    }
  };

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      template: () => (
        <Link to="/" className="text-lg px-2">
          Home
        </Link>
      ),
    },
  ];

  const start = (
    <h1 className="text-2xl font-bold p-4 text-[#04369a]">ElectroShop</h1>
  );

  const end = (
    <div className="flex items-center gap-2 relative">
      <div className="relative text-gray-500">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <InputText
          placeholder="Search..."
          className="pl-10 pr-4 py-1.5 border border-gray-500 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04369a]"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      <div
        onClick={() => setShowCart(!showCart)}
        className="flex items-center justify-center w-8 h-8 bg-[#04369a] text-white rounded-lg cursor-pointer"
      >
        <FaShoppingCart className="w-4 h-4" />
      </div>

      <div ref={profileRef} className="relative">
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center justify-center w-8 h-8 bg-[#04369a] text-white rounded-lg cursor-pointer"
        >
          <FaUser className="w-4 h-4" />
        </div>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden animate-fadeIn">
            <button
              className="w-full text-left px-4 py-2 hover:bg-[#04369a] hover:text-white transition"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div
        className="flex items-center justify-center w-8 h-8 bg-[#04369a] text-white rounded-lg cursor-pointer"
        onClick={handleAdminClick}
      >
        <FaTools className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#f8f9fa] border-b-2 border-gray-300 sticky top-0 z-10 px-16">
        <Menubar model={items} start={start} end={end} />
      </div>
      {showCart && <Cart cart={showCart} setCart={setShowCart} />}

      <Dialog
        header="Reset Password"
        visible={showResetDialog}
        style={{ width: "400px" }}
        modal
        onHide={() => setShowResetDialog(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
              onClick={() => setShowResetDialog(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-[#04369a] hover:bg-blue-800 text-white"
              onClick={handleResetPasswordSubmit}
            >
              Update
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#04369a]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#04369a]"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Navbar;
