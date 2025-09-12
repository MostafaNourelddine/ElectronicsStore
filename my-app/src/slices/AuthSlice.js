import { createSlice } from "@reduxjs/toolkit";
import users from "../users";
const initialUsers = JSON.parse(localStorage.getItem("users")) || [...users];

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("user"),
  role: localStorage.getItem("user")?.role || null,
  users: initialUsers,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
      localStorage.removeItem("user");
    },

    addUser: (state, action) => {
      const exists = state.users.find(
        (u) => u.username === action.payload.username
      );
      if (!exists) {
        const numericIds = state.users
          .map((u) => Number(u.id))
          .filter((n) => !isNaN(n));
        const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

        state.users.push({ ...action.payload, id: nextId });
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    updateUserRole: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) {
        user.role = action.payload.role;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    updatePassword: (state, action) => {
      const { newPassword } = action.payload;
      if (state.user) {
        state.user.password = newPassword;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
      const userInList = state.users.find(
        (u) => u.username === state.user?.username
      );
      if (userInList) {
        userInList.password = newPassword;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    loginAsGuest: (state) => {
      state.user = { username: "guest", role: "guest" };
      state.isLoggedIn = true;
      state.role = "guest";
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const {
  login,
  logout,
  addUser,
  removeUser,
  updateUserRole,
  loginAsGuest,
  updatePassword,
} = AuthSlice.actions;

export default AuthSlice.reducer;
