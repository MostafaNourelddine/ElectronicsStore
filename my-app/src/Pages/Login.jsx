import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginAsGuest } from "../slices/AuthSlice";
import users from "../users";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliceUsers = useSelector((state) => state.auth.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authUsers = useSelector((state) => state.auth.users);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = sliceUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      dispatch(
        login({
          username: foundUser.username,
          role: foundUser.role,
          password: foundUser.password,
        })
      );
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md py-28 px-8 bg-white rounded-lg shadow-xl">
      <div>
        <div className="bg-gradient-to-r from-[#0a2e76] to-[#2f77be] bg-clip-text text-transparent text-4xl font-bold text-center">
          Welcome <span>Back</span>
        </div>
        <div className="text-gray-600 text-center mt-2 mb-8">
          Sign in to continue your journey with us
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#04369a] mb-6 mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#04369a] mb-6 mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-[#0a2e76] text-white rounded hover:bg-[#04369a] transition duration-200"
        >
          LOGIN
        </button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="text-center text-gray-400">
        Don’t have an account?{" "}
        <span
          className="text-[#0a2e76] cursor-pointer font-bold"
          onClick={() => {
            dispatch(loginAsGuest());
            navigate("/");
          }}
        >
          Continue as Guest
        </span>
      </div>
    </div>
  );
};

export default Login;
