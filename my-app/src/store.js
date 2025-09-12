// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/ProductsSlice.js";
import cartReducer from "./slices/CartSlice.js";
import authReducer from "./slices/AuthSlice.js";
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
