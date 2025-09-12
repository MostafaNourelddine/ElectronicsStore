import { createSlice, createSelector } from "@reduxjs/toolkit";
import mockProducts from "../Products";

const savedProducts = JSON.parse(localStorage.getItem("products"));

const initialState = {
  list:
    savedProducts && savedProducts.length ? savedProducts : [...mockProducts],
  search: "",
  page: 1,
  perPage: 6,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
      localStorage.setItem("products", JSON.stringify(state.list));
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addProduct: (state, action) => {
      const exists = state.list.find((p) => p.name === action.payload.name);
      if (!exists) {
        // Generate incremental numeric ID
        const numericIds = state.list
          .map((p) => Number(p.id))
          .filter((n) => !isNaN(n));
        const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

        state.list.push({ ...action.payload, id: nextId });
        localStorage.setItem("products", JSON.stringify(state.list));
      }
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state.list[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.list));
      }
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.list));
    },
  },
});

// --- Selectors ---
export const selectSelf = (state) => state.products;

export const selectFilteredProducts = createSelector(
  [selectSelf],
  ({ list, search }) => {
    const term = search.trim().toLowerCase();
    if (!term) return list;
    return list.filter((p) =>
      [p.name, p.description, p.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }
);

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectSelf],
  (filtered, { page, perPage }) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filtered.slice(start, end);
  }
);

// --- Actions & Reducer ---
export const {
  setProducts,
  setSearch,
  setPage,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
