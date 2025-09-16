// src/slices/CategorySlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";
import products from "../Products";

// Load saved categories from localStorage
const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];

// Generate categories dynamically from mock products
const mockCategories = [
  ...new Set(products.map((p) => p.category).filter(Boolean)),
].map((cat, index) => ({
  id: index + 1,
  name: cat,
  description: `${cat} category`,
}));

// Merge mockCategories + savedCategories, remove duplicates by name
const mergedCategoriesMap = new Map();
mockCategories.forEach((cat) => mergedCategoriesMap.set(cat.name, cat));
savedCategories.forEach((cat) => mergedCategoriesMap.set(cat.name, cat));
const mergedCategories = Array.from(mergedCategoriesMap.values());

// Initial state
const initialState = {
  list: mergedCategories,
  search: "",
  page: 1,
  perPage: 6,
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
      localStorage.setItem("categories", JSON.stringify(state.list));
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addCategory: (state, action) => {
      const exists = state.list.find((c) => c.name === action.payload.name);
      if (!exists) {
        const nextId =
          state.list.length > 0
            ? Math.max(...state.list.map((c) => c.id)) + 1
            : 1;
        state.list.push({ ...action.payload, id: nextId });
        localStorage.setItem("categories", JSON.stringify(state.list));
      }
    },
    updateCategory: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index >= 0) {
        state.list[index] = action.payload;
        localStorage.setItem("categories", JSON.stringify(state.list));
      }
    },
    deleteCategory: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
      localStorage.setItem("categories", JSON.stringify(state.list));
    },
  },
});

// Selectors
export const selectSelf = (state) => state.categories;

export const selectFilteredCategories = createSelector(
  [selectSelf],
  ({ list, search }) => {
    const term = search.trim().toLowerCase();
    if (!term) return list;
    return list.filter((c) =>
      [c.name, c.description].some((field) =>
        field.toLowerCase().includes(term)
      )
    );
  }
);

export const selectPaginatedCategories = createSelector(
  [selectFilteredCategories, selectSelf],
  (filtered, { page, perPage }) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filtered.slice(start, end);
  }
);

// Actions & reducer
export const {
  setCategories,
  setSearch,
  setPage,
  addCategory,
  updateCategory,
  deleteCategory,
} = CategorySlice.actions;

export default CategorySlice.reducer;
